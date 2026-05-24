---
name: supabase-to-d1
description: Migrate data from Supabase PostgreSQL to Cloudflare D1. Use when the user wants to migrate, transfer, copy, or move data from Supabase (or any PostgreSQL database) to Cloudflare D1, or when they mention "supabase to d1", "pg to d1", "postgres to sqlite", or ask about switching database providers from PostgreSQL to D1.
---

# Supabase to D1 Migration

Migrate data from a Supabase PostgreSQL database to Cloudflare D1 in one shot.

## Prerequisites

Before starting, verify:

1. **pg_dump** version matches or exceeds the Supabase PostgreSQL version. Check with `pg_dump --version`. If too old, install a newer version:

   **macOS (Homebrew):**
   ```bash
   brew install postgresql@17
   # Then use: /opt/homebrew/opt/postgresql@17/bin/pg_dump
   ```

   **Ubuntu / Debian:**
   ```bash
   sudo apt-get install -y postgresql-client-17
   # Or if the version isn't in default repos:
   # sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   # wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   # sudo apt-get update && sudo apt-get install -y postgresql-client-17
   # Then use: /usr/lib/postgresql/17/bin/pg_dump
   ```

   **Windows:**
   Download the PostgreSQL 17 installer from https://www.postgresql.org/download/windows/ and install the command-line tools only. Then use the full path, e.g.:
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe"
   ```

   **Docker (any platform):**
   ```bash
   docker run --rm postgres:17 pg_dump --version
   # To export using Docker:
   docker run --rm postgres:17 pg_dump "<CONNECTION_STRING>" --data-only --inserts --no-owner --no-privileges -t user -t config > supabase_data.sql
   ```

2. **D1 database exists** and tables are already created (via `wrangler d1 migrations apply`). If not, guide the user through creating the D1 database and applying the SQLite schema first.

3. **wrangler.toml** (or a variant like `wrangler.d1.toml`) has the D1 binding configured:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "your-db-name"
   database_id = "your-database-id"
   migrations_dir = "src/config/db/migrations_sqlite"
   ```

4. **Python 3** is available (for the conversion script). Check with `python3 --version` or `python --version` on Windows.

## Migration Steps

### Step 1: Export data from Supabase

Ask the user for their Supabase connection string if not already known. Then export:

```bash
pg_dump "<SUPABASE_CONNECTION_STRING>" \
  --data-only \
  --inserts \
  --no-owner \
  --no-privileges \
  -t user -t session -t account -t verification \
  -t config -t taxonomy -t post -t "order" \
  -t subscription -t credit -t apikey \
  -t role -t permission -t role_permission -t user_role \
  -t ai_task -t chat -t chat_message \
  > supabase_data.sql
```

If pg_dump fails with a version mismatch, use the versioned binary:
- **macOS:** `/opt/homebrew/opt/postgresql@17/bin/pg_dump`
- **Linux:** `/usr/lib/postgresql/17/bin/pg_dump`
- **Windows:** `"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe"`

Verify the export:
- macOS/Linux: `wc -l supabase_data.sql`
- Windows (PowerShell): `(Get-Content supabase_data.sql | Measure-Object -Line).Lines`

Should have data rows (typically hundreds to thousands of lines).

### Step 2: Convert PostgreSQL SQL to D1/SQLite format

Run the conversion script bundled with this skill:

```bash
python3 .claude/skills/supabase-to-d1/scripts/pg2d1.py supabase_data.sql > d1_data.sql
```

On Windows (if `python3` is not recognized):
```powershell
python .claude/skills/supabase-to-d1/scripts/pg2d1.py supabase_data.sql > d1_data.sql
```

The script handles:
- **Timestamps**: PostgreSQL `'2025-10-19 10:25:55.046'` → epoch milliseconds `1760869555046` (D1 SQLite schema uses `integer` with `mode: 'timestamp_ms'`)
- **Booleans**: `true/false` → `1/0`
- **Schema prefix**: removes `public.` prefix
- **Type casts**: strips `::character varying`, `::timestamp`, etc.
- **Multi-line values**: data containing newlines inside string values is properly escaped
- **Non-INSERT lines**: SET, SELECT, comments are removed

Verify the output:
```bash
# All lines should be INSERT statements
grep -vc "^INSERT" d1_data.sql  # should output 0
```

### Step 3: Import into D1

```bash
pnpm wrangler d1 execute <database-name> --remote --file=d1_data.sql --config=<wrangler-config>
```

For example:
```bash
pnpm wrangler d1 execute shipany-two --remote --file=d1_data.sql --config=wrangler.d1.toml
```

If the import succeeds, you'll see a summary like:
```
Executed 4673 queries in 0.34 seconds (0 rows read, 20684 rows written)
```

### Step 4: Clean up

macOS/Linux:
```bash
rm supabase_data.sql d1_data.sql
```

Windows (PowerShell):
```powershell
Remove-Item supabase_data.sql, d1_data.sql
```

## Troubleshooting

### pg_dump version mismatch
```
pg_dump: error: server version: 17.6; pg_dump version: 15.x
```
Install the matching PostgreSQL client version (see Prerequisites above).

### SQL syntax error during D1 import
Usually caused by unescaped content in data values (newlines, special characters). The `pg2d1.py` script handles this, but if you still see errors:
1. Find the problematic line: search for the token mentioned in the error message
2. Check if a multi-line string value was split incorrectly
3. Manually fix or re-run the conversion

### UNIQUE constraint violation
Data already exists in D1. Either:
- Clear the D1 tables first: `wrangler d1 execute <db> --remote --command "DELETE FROM <table>;"`
- Or skip duplicate rows (not supported by D1 bulk import — clear first)

### Large datasets (>10MB)
Split the file by table and import each separately:

macOS/Linux:
```bash
for table in user session account config post order; do
  grep "INSERT INTO \"$table\"" d1_data.sql > "d1_${table}.sql"
  pnpm wrangler d1 execute <db> --remote --file="d1_${table}.sql"
done
```

Windows (PowerShell):
```powershell
foreach ($table in @("user","session","account","config","post","order")) {
  Select-String -Pattern "INSERT INTO `"$table`"" d1_data.sql | ForEach-Object { $_.Line } | Set-Content "d1_${table}.sql"
  pnpm wrangler d1 execute <db> --remote --file="d1_${table}.sql"
}
```
