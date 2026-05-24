#!/usr/bin/env python3
"""
Convert PostgreSQL pg_dump (--inserts --data-only) to D1/SQLite compatible SQL.
- Handles multi-line INSERT statements (values containing newlines)
- Converts timestamp strings to epoch milliseconds (integer)
- Converts true/false to 1/0
- Strips schema prefix (public.)
- Removes non-INSERT lines (SET, SELECT, comments, etc.)

Usage:
    python3 pg2d1.py <pg_dump_file.sql> > d1_data.sql
"""

import re
import sys
from datetime import datetime, timezone

TIMESTAMP_RE = re.compile(
    r"'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[+-]\d{2})?(?::?\d{2})?)'"
)


def ts_to_epoch_ms(match):
    """Convert a timestamp string match to epoch milliseconds."""
    ts_str = match.group(1)
    for fmt in (
        "%Y-%m-%d %H:%M:%S.%f",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d %H:%M:%S.%f%z",
        "%Y-%m-%d %H:%M:%S%z",
    ):
        try:
            dt = datetime.strptime(ts_str, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return str(int(dt.timestamp() * 1000))
        except ValueError:
            continue
    # If no format matched, return original (keep as string)
    return match.group(0)


def convert_statement(stmt):
    """Convert a complete INSERT statement to SQLite-compatible SQL."""
    # Remove schema prefix
    stmt = stmt.replace("public.", "")

    # Convert SQL-level booleans (not inside single-quoted strings).
    # PostgreSQL uses unquoted true/false for boolean columns;
    # string values like 'true' inside quotes must be preserved.
    def replace_unquoted_bools(s):
        result = []
        in_quote = False
        i = 0
        while i < len(s):
            if s[i] == "'" and (i == 0 or s[i-1] != "'"):
                in_quote = not in_quote
                result.append(s[i])
                i += 1
            elif not in_quote:
                if s[i:i+4].lower() == 'true' and (i+4 >= len(s) or not s[i+4].isalnum()):
                    if i == 0 or not s[i-1].isalnum():
                        result.append('1')
                        i += 4
                        continue
                if s[i:i+5].lower() == 'false' and (i+5 >= len(s) or not s[i+5].isalnum()):
                    if i == 0 or not s[i-1].isalnum():
                        result.append('0')
                        i += 5
                        continue
                result.append(s[i])
                i += 1
            else:
                result.append(s[i])
                i += 1
        return ''.join(result)
    stmt = replace_unquoted_bools(stmt)

    # Remove type casts like ::character varying, ::timestamp, etc.
    stmt = re.sub(r'::[a-z_ ]+(\[\])?', '', stmt, flags=re.IGNORECASE)

    # Convert timestamp strings to epoch ms
    stmt = TIMESTAMP_RE.sub(ts_to_epoch_ms, stmt)

    # Replace real newlines inside string values with \n escape
    result = []
    in_quote = False
    i = 0
    while i < len(stmt):
        ch = stmt[i]
        if ch == "'" and (i == 0 or stmt[i - 1] != "'"):
            in_quote = not in_quote
            result.append(ch)
        elif ch == '\n' and in_quote:
            result.append('\\n')
        elif ch == '\n' and not in_quote:
            result.append(' ')
        else:
            result.append(ch)
        i += 1

    return ''.join(result).strip()


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 pg2d1.py <pg_dump_file.sql>", file=sys.stderr)
        sys.exit(1)

    input_file = sys.argv[1]
    with open(input_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Join multi-line INSERT statements:
    # A complete INSERT starts with "INSERT INTO" and ends with ");".
    statements = []
    current = None
    for line in content.split('\n'):
        if line.strip().startswith('INSERT INTO'):
            if current is not None:
                statements.append(current)
            current = line
        elif current is not None:
            current += '\n' + line

        if current is not None and current.rstrip().endswith(');'):
            statements.append(current)
            current = None

    if current is not None:
        statements.append(current)

    for stmt in statements:
        converted = convert_statement(stmt)
        if converted:
            print(converted)


if __name__ == "__main__":
    main()
