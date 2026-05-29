# ClaudeCode101 - Claude Code Tutorial, FAQ, MCP, CLAUDE.md and Plan Mode Knowledge Base

ClaudeCode101 is a practical Claude Code knowledge base for developers who want to install, configure, troubleshoot, and use Claude Code in real projects. The site covers Claude Code tutorials, Claude Code FAQ, MCP servers, `CLAUDE.md`, Plan Mode, usage limits, pricing notes, custom commands, hooks, subagents, headless mode, and troubleshooting guides.

Website: [claudecode101.com](https://claudecode101.com)

> This is an independent community knowledge base for Claude Code users. It is not an official Anthropic or Claude product.

## What This Project Covers

- Claude Code tutorial for beginners and advanced AI coding workflows
- Claude Code installation guide, including Windows, WSL, shell PATH, and first run setup
- Claude Code FAQ for pricing, usage limits, API documentation, headless mode, and common setup questions
- `CLAUDE.md` guide for project memory, coding rules, repository context, and team conventions
- Claude Code Plan Mode guide for safe planning before multi-file edits, migrations, and production changes
- Claude Code MCP directory for GitHub MCP, Context7 MCP, Playwright MCP, transports, scopes, OAuth, and security checks
- Claude Code troubleshooting hub for command not found, invalid API key, login errors, rate limits, permissions, network failures, and MCP connection issues
- Claude Code 4.8 and Opus 4.8 workflow notes, including ultracode, dynamic workflows, context management, and expensive or slow sessions

## Guides By Developer Need

Start with the problem you are trying to solve:

| Developer need       | Helpful guides and questions                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code tutorial | Claude Code tutorial, Claude Code guide, Claude Code best practices, Claude Code for developers                                     |
| Installation         | how to install Claude Code, Claude Code install, Claude Code Windows install, Claude Code WSL setup, Claude command not found       |
| Configuration        | CLAUDE.md, what is CLAUDE.md, Claude Code project memory, Claude Code settings, Claude Code permissions                             |
| Workflow             | Claude Code Plan Mode, Claude Code ultrathink, Claude Code ultracode, Claude Code dynamic workflows, Claude Code context management |
| MCP                  | Claude Code MCP, MCP servers for Claude Code, GitHub MCP, Context7 MCP, Playwright MCP, MCP security checklist                      |
| Automation           | Claude Code custom commands, Claude Code slash commands, Claude Code hooks, Claude Code subagents, Claude Code headless mode        |
| Cost and limits      | Claude Code pricing, Claude Code usage limits, Claude Code rate limit, Claude Code Opus 4.8 slow, Claude Code expensive             |
| Troubleshooting      | Claude Code invalid API key, Claude Code login error, Claude Code unable to connect to API, Claude Code permission errors           |

## Common English Questions

The English guides answer practical questions such as:

- how to install Claude Code
- how to install Claude Code on Windows
- Claude Code command not found
- Claude Code invalid API key
- Claude Code rate limit error
- Claude Code login or authentication error
- Claude Code unable to connect to API
- what is CLAUDE.md in Claude Code
- how to use Claude Code Plan Mode
- Claude Code MCP servers setup
- Claude Code GitHub MCP guide
- Claude Code Context7 MCP guide
- Claude Code Playwright MCP guide
- Claude Code custom commands and slash commands
- Claude Code headless mode API workflow
- Claude Code Opus 4.8 slow or expensive
- Claude Code usage limits and pricing
- Claude Code hooks and subagents
- Claude Code context management best practices

## 常见中文问题

中文内容面向正在查找 Claude Code 安装、配置、排错和工作流说明的开发者：

- Claude Code 中文教程
- Claude Code 安装教程
- Claude Code Windows 安装
- Claude Code WSL 配置
- Claude Code command not found 怎么办
- Claude Code API key 无效
- Claude Code 登录失败
- Claude Code rate limit 报错
- Claude Code 用量限制
- Claude Code 价格
- CLAUDE.md 是什么
- Claude Code Plan Mode 是什么
- Claude Code MCP 配置
- Claude Code GitHub MCP
- Claude Code Context7 MCP
- Claude Code Playwright MCP
- Claude Code 自定义命令
- Claude Code hooks
- Claude Code subagents
- Claude Code headless mode
- Claude Code Opus 4.8 慢或贵

## Site Sections

The site is organized into these sections:

- `/tutorial` - full Claude Code tutorial and best-practice guides
- `/faqs` - short answers for high-intent Claude Code questions
- `/mechanics` - deeper explanations of `CLAUDE.md`, Plan Mode, context management, hooks, subagents, ultracode, and dynamic workflows
- `/mcp` - Claude Code MCP directory and server-specific guides
- `/troubleshooting` - focused fixes for install, auth, network, permission, rate limit, and MCP errors
- `/pricing` - pricing, usage, and cost-control guidance
- `/upgrade` - Claude Code update and version-related notes

## Tech Stack

- Next.js 15
- React 19
- Fumadocs and MDX
- next-intl bilingual routing
- OpenNext for Cloudflare
- Cloudflare Workers and D1
- Google Analytics, Microsoft Clarity, and Google AdSense support

## Development

Install dependencies:

```bash
pnpm install
```

Run the local development server:

```bash
pnpm dev
```

Build the project:

```bash
pnpm build
```

Generate Fumadocs MDX types:

```bash
pnpm exec fumadocs-mdx
```

## Project Goal

The goal of ClaudeCode101 is to help developers quickly answer practical Claude Code questions, then move into deeper tutorials when they need reliable workflows for real codebases. The content is written for developers who need direct answers first: install, configure, debug, control cost, choose MCP tools, and understand how Claude Code mechanisms work together.

## License

See [LICENSE](./LICENSE).
