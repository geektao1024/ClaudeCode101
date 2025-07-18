# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js + Nextra v4 + Tailwind CSS v4 + TypeScript 的多语言文档站点模板，支持中文和英文两种语言。

## 常用命令

### 开发相关

- `pnpm i` - 安装依赖
- `pnpm dev` - 启动开发服务器 (端口: 8000, 使用 Turbopack)
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器 (端口: 7000)
- `pnpm lint` - 运行 ESLint 代码检查和自动修复

### Shadcn UI 组件

- `pnpm dlx shadcn@latest add <组件名>` - 添加新的 Shadcn UI 组件

## 项目架构

### 核心技术栈

- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **文档生成**: Nextra v4 + nextra-theme-docs
- **样式**: Tailwind CSS v4 + Shadcn UI + CSS Modules
- **国际化**: Next.js i18n + 自定义字典系统
- **包管理**: pnpm
- **代码规范**: ESLint (@antfu/eslint-config)

### 目录结构

#### 源码目录 (`src/`)

- `app/[lang]/` - Next.js App Router 结构，支持动态语言路由
  - `layout.tsx` - 根布局，集成 Nextra Layout、主题切换、语言切换
  - `[[...mdxPath]]/page.tsx` - 动态 MDX 页面路由
  - `_components/` - 应用级组件 (ThemeProvider)
  - `styles/` - 全局样式文件
- `content/` - MDX 内容文件
  - `zh/` 和 `en/` - 分语言的内容目录
  - `_meta.tsx` - Nextra 页面元数据配置
- `components/` - 可复用组件
  - `ui/` - Shadcn UI 组件
  - 自定义组件 (HomepageHero, CustomFooter, ThemeSwitcher 等)
- `i18n/` - 国际化字典和工具
- `hooks/` - 自定义 React Hooks
- `lib/` - 工具函数
- `widgets/` - 小组件 (locale-toggle, theme-toggle)

#### 配置文件

- `next.config.ts` - Next.js 配置，集成 Nextra 和 i18n
- `components.json` - Shadcn UI 配置
- `eslint.config.js` - ESLint 配置 (使用 @antfu/eslint-config)
- `middleware.ts` - 使用 Nextra 的本地化中间件

### 国际化架构

- 使用 Next.js 内置 i18n 支持 (`zh`, `en`)
- 自定义字典系统 (`src/i18n/`)
- `useServerLocale` 和 `useLocale` hooks 处理服务端和客户端翻译
- 动态路由结构 `[lang]/[[...mdxPath]]` 支持多语言 URL

### 主题系统

- 集成 `next-themes` 实现暗色/亮色主题切换
- Tailwind CSS v4 原生支持
- 自定义 ThemeProvider 组件

### 内容管理

- 基于 Nextra 的 MDX 文件系统
- `_meta.tsx` 文件控制页面导航和元数据
- 支持 MDX 组件和自定义组件嵌入

## 开发指导

### 添加新页面

1. 在 `src/content/zh/` 和 `src/content/en/` 中创建对应的 `.mdx` 文件
2. 更新相应的 `_meta.tsx` 文件添加页面配置

### 添加新组件

1. 对于 UI 组件，使用 `pnpm dlx shadcn@latest add <组件名>`
2. 自定义组件放在 `src/components/` 目录
3. 小组件放在 `src/widgets/` 目录

### 代码规范

- 使用 `pnpm lint` 检查代码规范
- 遵循 @antfu/eslint-config 规范
- TypeScript 严格模式

### 环境要求

- Node.js >= 20.x
- pnpm >= 9.x

## 部署说明

项目构建后会自动生成搜索索引 (pagefind)，支持静态部署到 Netlify、Vercel 等平台。
