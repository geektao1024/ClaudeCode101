<p style="text-align:center;" align="center"><a href="https://github.com/geektao1024/ClaudeCode101"><picture align="center">
  <source media="(prefers-color-scheme: dark)" srcset="https://i.stardots.io/wisdom/1745917125609.png"  width="100%" align="center" style="margin-bottom:20px;">
  <source media="(prefers-color-scheme: light)" srcset="https://i.stardots.io/wisdom/1745917153483.png" width="100%" align="center" style="margin-bottom:20px;">
  <img alt="color mode" src="https://i.stardots.io/wisdom/1745917153483.png" width="100%" align="center" style="margin-bottom:20px;">
</picture></a><br /><br /></p>

# ClaudeCode101 - Claude Code Tutorial Center

English | [中文](README.md)

[![Deploy](https://img.shields.io/badge/passing-black?style=flat&logo=Vercel&label=Vercel&color=3bb92c&labelColor=black)](https://claudecode101.com)
[![GitHub Workflow Status (branch)](https://img.shields.io/badge/passing-black?style=flat&label=build&color=3bb92c)](https://github.com/geektao1024/ClaudeCode101/deployments)
[![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/geektao1024)
[![License](https://img.shields.io/github/license/geektao1024/ClaudeCode101?color=466fe8)](https://github.com/geektao1024/ClaudeCode101/blob/main/LICENSE)

🤖 **Claude Code Tutorial and Best Practices Guide** - Built with React v19 + Next.js + Nextra (v4) + TypeScript + TailwindCSS (v4) + Shadcn UI

- [🚀 Live Demo](https://claudecode101.com/en)
- [🌐 Official Claude Code](https://claude.ai/code)
- [📚 Claude Code Official Docs](https://docs.anthropic.com/en/docs/claude-code)

## 🛠️ Project Overview

<div align="center">

<table>
  <tr>
    <td><strong>🤖 AI Programming Assistant</strong><br/>Professional Claude Code tutorial resources</td>
    <td><strong>📚 Complete Tutorials</strong><br/>Systematic learning from basics to advanced</td>
  </tr>
  <tr>
    <td><strong>🔧 Practical Tips</strong><br/>Workflow optimization and best practices</td>
    <td><strong>🌏 Bilingual Support</strong><br/>Chinese and English learning resources</td>
  </tr>
</table>

</div>

<div align="center">

<img src="https://media.giphy.com/media/a5viI92PAF89q/giphy.gif" width="400"/>

💝 **If this tutorial helps you, please support us with a ⭐ Star**

</div>

## 🎯 Project Goals

This project aims to provide the most comprehensive Claude Code Chinese learning resources to help developers:

- 💡 **Quick Start** with Claude Code basic features
- 🚀 **Master Advanced** workflows and best practices
- 🔧 **Optimize Configuration** to improve AI programming efficiency
- 🌟 **Real-world Applications** solving actual development scenarios

## 🎉 Key Features

- ⚡️ **Complete Tutorial System**: Systematic tutorials from installation to advanced applications
- 🤖 **Claude Code Specialized**: In-depth focus on Claude Code tool
- 🎨 **Modern Design**: Beautiful interface based on Tailwind CSS v4 and Shadcn UI
- 📚 **Structured Content**: Optimized documentation experience with Nextra v4
- 🌏 **Bilingual Support**: Complete Chinese and English parallel resources
- 📱 **Responsive Design**: Perfect adaptation for desktop and mobile

## 📋 Tutorial Contents

### 🚀 Getting Started

- [Installation & Setup](/en/tutorial/getting-started/installation) - Quick installation and initial configuration
- [Basic Usage](/en/tutorial/getting-started/basic-usage) - First-time user guide

### ⚙️ Configuration

- [CLAUDE.md Setup](/en/tutorial/configuration/claude-md) - Creating and optimizing configuration files
- [Tools Allowlist](/en/tutorial/configuration/tools-allowlist) - Managing allowed tools
- [GitHub CLI Integration](/en/tutorial/configuration/github-cli) - Integrating gh command-line tool

### 🔧 Tools Integration

- [Bash Tools](/en/tutorial/tools-integration/bash-tools) - Working with command-line tools
- [MCP Servers](/en/tutorial/tools-integration/mcp-servers) - Model Context Protocol integration
- [Custom Commands](/en/tutorial/tools-integration/custom-commands) - Creating slash commands

### 💼 Workflows

- [Explore-Plan-Code](/en/tutorial/workflows/explore-plan-code) - Versatile workflow pattern

### 🎯 Workflow Optimization

- [Specific Instructions](/en/tutorial/optimization/specific-instructions) - Writing effective prompts
- [Context Management](/en/tutorial/optimization/context-management) - Keeping context focused
- [Direction Correction](/en/tutorial/optimization/direction-correction) - Timely guidance and correction

### 🚀 Advanced Applications

- [Headless Mode](/en/tutorial/advanced/headless-mode) - Infrastructure automation
- [Multi-Claude Collaboration](/en/tutorial/advanced/multi-claude) - Parallel collaboration workflows

## Prerequisites

- React 19.x
- Node >= 20.x
- Pnpm 9.x
- **VS Code plugin `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**

## Local Development

### Install Dependencies

```bash
pnpm i
```

### Start Development Server

```bash
pnpm dev
```

Then open http://localhost:8000 in your browser to access the site

🎉 **Successfully running?** If you like this tutorial website, don't forget to show some support!

[![Star this repo](https://img.shields.io/badge/⭐-Star%20this%20repo-yellow?style=flat&logo=github)](https://github.com/geektao1024/ClaudeCode101)

## Using Shadcn UI Components

This project has integrated [Shadcn UI](https://ui.shadcn.com). Follow these steps to use components:

### Add New Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

For example, to add the Alert component:

```bash
pnpm dlx shadcn@latest add alert
```

### Using Components

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Home() {
  return (
    <Alert>
      <AlertTitle>Important Notice!</AlertTitle>
      <AlertDescription>
        You are now learning Claude Code best practices.
      </AlertDescription>
    </Alert>
  )
}
```

## 🤝 Contributing

We welcome all forms of contributions:

- 📝 **Improve Documentation**: Fix errors, add content, optimize expression
- 🐛 **Report Issues**: Find bugs or suggest improvements
- 💡 **Add Tutorials**: Share Claude Code usage tips and best practices
- 🌍 **Translation Help**: Help improve Chinese-English parallel content

### Submit Contributions

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-tutorial`
3. Commit changes: `git commit -m 'Add amazing tutorial'`
4. Push branch: `git push origin feature/amazing-tutorial`
5. Submit Pull Request

## 🌟 Related Resources

| Resource Name                | Description                                      | Link                                                                 |
| ---------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| Claude Code Official Website | Anthropic's official Claude Code tool            | [claude.ai/code](https://claude.ai/code)                             |
| Claude Code Official Docs    | English official documentation and API reference | [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code) |
| Anthropic GitHub             | Official GitHub organization                     | [github.com/anthropics](https://github.com/anthropics)               |
| Claude 3.5 Sonnet            | The powerful model behind Claude Code            | [claude.ai](https://claude.ai)                                       |

## 🚨 Disclaimer

This project is an unofficial tutorial resource based on public information and community practices, for learning reference only:

- **Content Source**: Tutorial content is based on official documentation, community practices, and user experience summaries
- **Version Updates**: Claude Code features iterate rapidly, some content may have time sensitivity
- **Usage Risk**: Please verify specific features and best practices according to the latest official documentation
- **Liability Exclusion**: Any issues arising from using this tutorial, users must bear responsibility themselves

It is recommended to learn in conjunction with [Claude Code Official Documentation](https://docs.anthropic.com/en/docs/claude-code).

## 📄 License

[MIT](./LICENSE) License | Copyright © 2024-PRESENT [GeekTao](https://github.com/geektao1024)

---

<div align="center">

**Make AI Your Most Powerful Programming Companion** 🤖✨

[Start Learning](https://claudecode101.com/en) • [GitHub](https://github.com/geektao1024/ClaudeCode101) • [Issue Feedback](https://github.com/geektao1024/ClaudeCode101/issues)

</div>
