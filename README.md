<p style="text-align:center;" align="center"><a href="https://github.com/geektao1024/ClaudeCode101"><picture align="center">
  <source media="(prefers-color-scheme: dark)" srcset="https://i.stardots.io/wisdom/1745917125609.png"  width="100%" align="center" style="margin-bottom:20px;">
  <source media="(prefers-color-scheme: light)" srcset="https://i.stardots.io/wisdom/1745917153483.png" width="100%" align="center" style="margin-bottom:20px;">
  <img alt="color mode" src="https://i.stardots.io/wisdom/1745917153483.png" width="100%" align="center" style="margin-bottom:20px;">
</picture></a><br /><br /></p>

# ClaudeCode101 - Claude Code 教程中心

中文 | [English](README-en.md)

[![Deploy](https://img.shields.io/badge/passing-black?style=flat&logo=Vercel&label=Vercel&color=3bb92c&labelColor=black)](https://claudecode101.com)
[![GitHub Workflow Status (branch)](https://img.shields.io/badge/passing-black?style=flat&label=build&color=3bb92c)](https://github.com/geektao1024/ClaudeCode101/deployments)
[![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/geektao1024)
[![License](https://img.shields.io/github/license/geektao1024/ClaudeCode101?color=466fe8)](https://github.com/geektao1024/ClaudeCode101/blob/main/LICENSE)

🤖 **Claude Code 中文教程和最佳实践指南** - 基于 React v19 + Next.js + Nextra (v4) + TypeScript + TailwindCSS (v4) + Shadcn UI 构建

- [🚀 在线访问](https://claudecode101.com/zh)
- [🌐 官方 Claude Code](https://claude.ai/code)
- [📚 Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code)

## 🛠️ 项目介绍

<div align="center">

<table>
  <tr>
    <td><strong>🤖 AI 编程助手</strong><br/>Claude Code 专业教程资源</td>
    <td><strong>📚 完整教程</strong><br/>从入门到高级的系统性学习</td>
  </tr>
  <tr>
    <td><strong>🔧 实用技巧</strong><br/>工作流程优化和最佳实践</td>
    <td><strong>🌏 双语支持</strong><br/>中英文对照学习资源</td>
  </tr>
</table>

</div>

<div align="center">

<img src="https://media.giphy.com/media/a5viI92PAF89q/giphy.gif" width="400"/>

💝 **如果这个教程对你有帮助，请用 Star ⭐ 支持我们**

</div>

## 🎯 项目目标

本项目致力于提供最全面的 Claude Code 中文学习资源，帮助开发者：

- 💡 **快速上手** Claude Code 基础功能
- 🚀 **掌握进阶** 工作流程和最佳实践
- 🔧 **优化配置** 提升 AI 编程效率
- 🌟 **实战应用** 解决真实开发场景

## 🎉 主要特性

- ⚡️ **完整教程体系**: 从安装配置到高级应用的系统性教程
- 🤖 **Claude Code 专精**: 专注于 Claude Code 工具的深度讲解
- 🎨 **现代化设计**: 基于 Tailwind CSS v4 和 Shadcn UI 的精美界面
- 📚 **结构化内容**: 使用 Nextra v4 优化的文档体验
- 🌏 **双语支持**: 完整的中英文对照资源
- 📱 **响应式设计**: 完美适配桌面端和移动端

## 📋 教程内容

### 🚀 快速开始

- [安装与配置](/zh/tutorial/getting-started/installation) - 快速安装和初始配置
- [基础使用](/zh/tutorial/getting-started/basic-usage) - 第一次使用指南

### ⚙️ 自定义设置

- [CLAUDE.md 配置](/zh/tutorial/configuration/claude-md) - 创建和优化配置文件
- [工具权限管理](/zh/tutorial/configuration/tools-allowlist) - 管理允许的工具
- [GitHub CLI 集成](/zh/tutorial/configuration/github-cli) - 集成 gh 命令行工具

### 🔧 工具集成

- [Bash 工具](/zh/tutorial/tools-integration/bash-tools) - 与命令行工具协作
- [MCP 服务器](/zh/tutorial/tools-integration/mcp-servers) - 模型上下文协议集成
- [自定义命令](/zh/tutorial/tools-integration/custom-commands) - 创建斜杠命令

### 💼 工作流程

- [探索-规划-编码](/zh/tutorial/workflows/explore-plan-code) - 多功能工作流程

### 🎯 工作流优化

- [具体指令](/zh/tutorial/optimization/specific-instructions) - 编写有效的提示词
- [上下文管理](/zh/tutorial/optimization/context-management) - 保持上下文聚焦
- [方向修正](/zh/tutorial/optimization/direction-correction) - 及时纠正和指导

### 🚀 高级应用

- [无头模式](/zh/tutorial/advanced/headless-mode) - 自动化基础设施
- [多Claude协作](/zh/tutorial/advanced/multi-claude) - 并行协作工作流

## 前置条件

- React 19.x
- Node >= 20.x
- Pnpm 9.x
- **VS Code 插件 `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**

## 本地开发

### 安装依赖

```bash
pnpm i
```

### 启动开发服务器

```bash
pnpm dev
```

然后在浏览器中打开 http://localhost:8000 即可访问

🎉 **成功运行了？** 如果你喜欢这个教程网站，别忘了鼓励一下：

[![Star this repo](https://img.shields.io/badge/⭐-Star%20this%20repo-yellow?style=flat&logo=github)](https://github.com/geektao1024/ClaudeCode101)

## 使用 Shadcn UI 组件

本项目已集成 [Shadcn UI](https://ui.shadcn.com)，按照以下步骤使用组件：

### 添加新组件

```bash
pnpm dlx shadcn@latest add <组件名>
```

例如添加 Alert 组件：

```bash
pnpm dlx shadcn@latest add alert
```

### 使用组件

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Home() {
  return (
    <Alert>
      <AlertTitle>重要提示!</AlertTitle>
      <AlertDescription>
        你现在正在学习 Claude Code 的最佳实践。
      </AlertDescription>
    </Alert>
  )
}
```

## 🤝 贡献指南

我们欢迎所有形式的贡献：

- 📝 **改进文档**: 修正错误、补充内容、优化表达
- 🐛 **报告问题**: 发现 bug 或提出改进建议
- 💡 **新增教程**: 分享 Claude Code 使用技巧和最佳实践
- 🌍 **翻译协助**: 帮助完善中英文对照内容

### 提交贡献

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/amazing-tutorial`
3. 提交更改: `git commit -m 'Add amazing tutorial'`
4. 推送分支: `git push origin feature/amazing-tutorial`
5. 提交 Pull Request

## 🌟 相关资源

| 资源名称             | 描述                            | 链接                                                                 |
| -------------------- | ------------------------------- | -------------------------------------------------------------------- |
| Claude Code 官方网站 | Anthropic 官方 Claude Code 工具 | [claude.ai/code](https://claude.ai/code)                             |
| Claude Code 官方文档 | 英文官方文档和API参考           | [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code) |
| Anthropic GitHub     | 官方 GitHub 组织                | [github.com/anthropics](https://github.com/anthropics)               |
| Claude 3.5 Sonnet    | Claude Code 背后的强大模型      | [claude.ai](https://claude.ai)                                       |

## 🚨 免责声明

本项目是基于公开信息和社区实践总结的非官方教程资源，仅供学习参考：

- **内容来源**：教程内容基于官方文档、社区实践和用户经验总结
- **版本更新**：Claude Code 功能快速迭代，部分内容可能存在时效性
- **使用风险**：请根据官方最新文档验证具体功能和最佳实践
- **责任免除**：使用本教程产生的任何问题，使用者需自行承担责任

建议配合 [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code) 学习使用。

## 📄 License

[MIT](./LICENSE) License | Copyright © 2024-PRESENT [GeekTao](https://github.com/geektao1024)

---

<div align="center">

**让 AI 成为你最得力的编程伙伴** 🤖✨

[开始学习](https://claudecode101.com/zh) • [GitHub](https://github.com/geektao1024/ClaudeCode101) • [问题反馈](https://github.com/geektao1024/ClaudeCode101/issues)

</div>
