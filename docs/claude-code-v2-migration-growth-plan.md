# ClaudeCode101 V2 迁移与增长架构拆解

> 记录日期：2026-05-22
> 当前目标：把现有 Claude Code 文档站升级为「内容流量站 + 付费资料包/课程转化 + 多语言复制」的一体化商业站。
> 后续执行方式：按目标式线程拆分，每个线程只围绕一个明确目标推进、验证、交付。

## 0. 2026-05-23 收敛后的当前主线

当前阶段只做一件事：**用 SaaS 模板承接现有 ClaudeCode101 品牌和已有 SEO 资产**。

暂时不扩散到课程、资料包、批量 FAQ、Sponsor、状态页、工具站等方向。那些方向仍然成立，但必须排在现有品牌迁移稳定之后。

新的执行顺序调整为：

1. 先把 `shipany-template-cf 5` 改造成 ClaudeCode101 的 SaaS 版主站。
2. 保留当前已上线品牌、域名、Logo、语言结构和核心关键词定位。
3. 把当前站已经存在的关键词页面、教程页面、sitemap 页面迁移到 SaaS 模板。
4. 优先保证旧 URL 不丢权重，必要时保留原路径或做 301。
5. 上线后确认收录、流量、核心页面稳定。
6. 再按 ClaudeLog 的结构扩展 FAQ、MCP、Mechanics、Pricing、Status 等内容矩阵。

当前阶段的判断原则：

- **先迁移，不重做品牌。** ClaudeCode101 继续作为主品牌，不另起新品牌。
- **先保权重，不追求新结构漂亮。** 已经有收录或可能有权重的 URL 优先保留。
- **先内容承接，不急着支付闭环。** SaaS 模板的登录、支付、后台先作为后续能力，不阻塞 SEO 迁移。
- **先小步上线，不做大爆炸。** 先迁移核心页面和首页，再逐步扩内容。
- **先复用已有关键词页面，再参考 ClaudeLog 拓展。** ClaudeLog 是第二阶段内容增长模型，不是第一阶段迁移目标。

## 0.1 当前迁移边界

第一阶段只迁移以下内容：

- 当前首页：`/zh`、`/en`。
- 当前基础页面：`quick-start`、`resources`、`upgrade`。
- 当前教程结构：`tutorial/**`。
- 当前已经在 sitemap 中暴露的页面。
- 当前已有中英文内容。

第一阶段暂不做：

- 100-300 个 FAQ 批量页。
- Sponsor 页面。
- Claude Status / is Claude down 页面。
- 课程销售闭环。
- 资料包支付交付闭环。
- 大规模英文内容重写。
- 全新品牌视觉大改。

## 0.2 第一阶段成功标准

第一阶段完成后，应该达到：

- SaaS 模板首页已经是 ClaudeCode101，不再是 ShipAny 默认站。
- 当前线上 sitemap 中的核心 URL 都能在新模板中找到对应页面。
- 旧 URL 要么保留，要么 301 到新 URL。
- `/zh`、`/en` 语言结构不丢。
- `sitemap.xml`、`robots.txt`、canonical、hreflang 可用。
- 当前已有教程内容可以正常阅读、搜索、跳转。
- 登录、支付、后台可以暂时存在，但不影响公开内容索引和访问。

## 0.3 第一阶段页面迁移优先级

如果暂时没有 Search Console 点击/展现数据，就先按「当前 sitemap 暴露 + 搜索意图 + 商业价值」排序；如果后续能导出 GSC 数据，再用真实 impressions/clicks 替换优先级。

P0：必须优先迁移，尽量保留原 URL 或精确 301。

- `/zh`、`/en`
- `/zh/quick-start`、`/en/quick-start`
- `/zh/tutorial`、`/en/tutorial`
- `/zh/tutorial/getting-started/installation`
- `/zh/tutorial/getting-started/basic-usage`
- `/zh/tutorial/configuration/claude-md`
- `/zh/tutorial/tools-integration/mcp-servers`
- `/zh/tutorial/workflows/plan-mode`
- `/zh/resources`、`/en/resources`
- `/zh/upgrade`、`/en/upgrade`

P1：第二批迁移，保持内容连续性和内部链接。

- `/tutorial/configuration/tools-allowlist`
- `/tutorial/configuration/github-cli`
- `/tutorial/tools-integration/bash-tools`
- `/tutorial/tools-integration/custom-commands`
- `/tutorial/workflows/explore-plan-code`
- `/tutorial/workflows/test-driven`
- `/tutorial/workflows/git-management`
- `/tutorial/optimization/context-management`
- `/tutorial/optimization/specific-instructions`
- `/tutorial/advanced/headless-mode`
- `/tutorial/advanced/multi-claude`

P2：迁移后再评估是否合并、重写或 noindex。

- `/api-reference`
- 过时版本页。
- 泛泛而谈、缺少搜索意图的优化类页面。
- 与官方文档高度重复、但没有中文实践价值的页面。

## 0.4 第一阶段后的 ClaudeLog 扩展方式

只有当第一阶段稳定后，再进入 ClaudeLog 式扩展。

扩展顺序建议：

1. 从现有内容拆 FAQ，而不是凭空生成 FAQ。
2. 从已有 MCP 页面扩展 MCP 子页面。
3. 从已有 Plan Mode、CLAUDE.md、context-management 页面扩 Mechanics。
4. 从 resources/quick-start 页面扩模板下载和资料包入口。
5. 最后再做 status、pricing、comparison 等新入口。

## 1. 背景判断

当前线上站已经上线，主要变现方式是 Google AdSense，但受限于流量规模，广告收入的天花板较低。前期对 ClaudeLog、Claude Code 付费课程、资料包、训练营和提示词包市场的观察说明：Claude Code 相关用户已经具备付费意愿，尤其是对「能直接落地到项目里的流程、模板、CLAUDE.md、MCP 配置、实战工作流、团队规范」有明显需求。

因此下一步不应该只优化广告，而应该把网站改造成以下结构：

- 上层：Claude Code 中文/多语言权威知识库，获取自然搜索流量。
- 中层：FAQ、MCP、工作流、配置、报错、对比页等长尾页面，覆盖大量搜索入口。
- 下层：资料包、课程、咨询、赞助、联盟推广等商业转化。

当前 Nextra 文档站适合承载教程，但不适合长期承载登录、支付、后台、资料包交付、动态落地页和规模化多语言页面。因此建议使用 `shipany-template-cf 5` 作为 V2 主站底座，而不是在当前 Nextra 项目上继续叠加商业能力。

## 2. 现状盘点

### 2.1 当前线上站

当前站点是 Next.js 15 + Nextra v4 + React 19 + Tailwind v4 的文档站结构。

本地内容结构：

- `src/content/zh/**`
- `src/content/en/**`
- 当前 MDX 文件约 64 个。
- 主要页面包括首页、quick-start、resources、upgrade、api-reference、tutorial 下的安装、配置、MCP、Plan Mode、TDD、上下文管理等教程。

当前 sitemap 由 `src/app/sitemap.ts` 手工维护，存在维护成本和遗漏风险。当前内容增长到几十个页面后，后续如果扩展到 100-300 个长尾页面，手工 sitemap 会变成明显瓶颈。

当前商业化能力：

- 已接入 AdSense。
- 已接入 Analytics、Clarity 等统计能力。
- 站内缺少强商业转化路径。
- 资料包尚未形成完整销售/交付闭环。

当前主要问题：

- 文档体验可以，但转化能力弱。
- 首页和教程页的 CTA 不够商业化。
- 部分内容可能过时或可信度不足，需要重写或下线。
- 页面结构更像「教程站」，还不是「搜索流量矩阵」。
- 多语言内容可以存在，但还没有形成可复制生产流程。

### 2.2 ShipAny 模板能力

本地模板目录：`shipany-template-cf 5`

模板具备以下能力：

- Next.js 15、React 19、Tailwind 4。
- `next-intl` 多语言。
- Fumadocs 文档系统。
- JSON 动态页面系统。
- 登录、用户中心、后台、RBAC。
- 支付能力：Stripe、Creem、PayPal。
- 订单、积分、订阅、账单、后台管理。
- Blog、Docs、Pages、Logs 内容集合。
- Analytics、Affiliate、Customer Service 扩展能力。
- Cloudflare/OpenNext 部署支持。

模板中已有两个关键 skill：

- `.claude/skills/shipany-quick-start`
- `.claude/skills/shipany-page-builder`

这两个 skill 对快速起站有价值，但不能原样承担完整增长架构，需要扩展和重定义。

## 3. 两个模板 Skill 的适配判断

### 3.1 `shipany-quick-start`

定位：快速初始化 ShipAny 项目。

适合做：

- 替换应用名、域名、SEO 元信息。
- 改首页、导航、footer。
- 替换主题色、logo、favicon。
- 改隐私政策、服务条款。
- 替换 `public/sitemap.xml` 中的域名。

不适合做：

- 路由重构。
- 内容集合重定义。
- 登录支付深度改造。
- 批量长尾页生成。
- 资料包交付闭环。

判断：适合作为 V2 的「第一轮品牌换皮和基础配置」工具，但不能作为完整迁移方案。

### 3.2 `shipany-page-builder`

定位：基于 JSON 动态页面快速创建多语言落地页。

它会做：

- 新建 `src/config/locale/messages/en/pages/<slug>.json`
- 新建 `src/config/locale/messages/zh/pages/<slug>.json`
- 在 `src/config/locale/index.ts` 的 `localeMessagesPaths` 中注册页面。
- 页面访问路径类似 `/some-page` 和 `/zh/some-page`。

适合做：

- 高转化落地页。
- 对比页。
- 工具页。
- 资料包销售页。
- Sponsor/广告合作页。
- 少量重点 SEO landing page。

不适合直接做：

- 100-300 个 FAQ 问答页。
- 大量深度教程页。
- 程序化 SEO 内容库。
- 内容型页面的 schema、内链、sitemap、canonical、hreflang 全链路。

主要原因：

- JSON landing block 更适合营销页，不适合深度内容。
- 当前脚本生成内容会带 TODO 和 placeholder image，不适合直接上线。
- 页面注册依赖 `localeMessagesPaths`，大量页面会导致配置膨胀。
- 当前模板没有动态 `src/app/sitemap.ts`，只有占位 `public/sitemap.xml`。

判断：它可以作为「重点商业页快速生成器」，但 FAQ、MCP、Mechanics、Templates 等规模化内容应该单独建内容集合，不应全部走 JSON 动态页。

## 4. 是否全迁移的决策

建议：全迁移，但采用 V2 重定义方式，不做机械搬迁。

原因：

- 当前线上站流量不大，迁移风险可控。
- 当前 Nextra 结构更适合教程，不适合商业闭环。
- ShipAny 已经有登录、支付、后台、多语言、动态页面基础，后期扩展成本更低。
- 未来要做资料包、课程、赞助、咨询、会员内容，继续使用文档站会变成补丁式开发。

不建议：

- 在旧站上继续叠加支付和后台。
- 把当前所有内容一次性复制到模板然后直接上线。
- 全站页面都使用 JSON 动态页。
- 先铺大量 AI 生成页面再补 SEO 基础设施。

推荐迁移方式：

1. 先把 ShipAny 改造成 ClaudeCode101 V2 商业站底座。
2. 先做 10-20 个高价值页面验证结构。
3. 补齐动态 sitemap、canonical、hreflang、robots、301 redirect。
4. 再迁移当前优质教程。
5. 最后批量扩展 FAQ、MCP、Mechanics、Templates。

## 5. V2 目标架构

### 5.1 站点定位

建议定位：

ClaudeCode101 是面向中文开发者和 AI 编程实践者的 Claude Code 实战知识库，提供安装配置、MCP、工作流、团队规范、问题排查、模板资料包和实战训练。

英文站可以作为第二增长线，但短期优先中文市场，因为中文 Claude Code 内容仍有明显供给缺口。

### 5.2 推荐 URL 架构

建议保留多语言路径，避免线上已有 `/zh/*`、`/en/*` 资产迁移混乱。

推荐结构：

```text
/zh
/en

/zh/docs/*
/en/docs/*

/zh/faqs/*
/en/faqs/*

/zh/mcp/*
/en/mcp/*

/zh/mechanics/*
/en/mechanics/*

/zh/templates/*
/en/templates/*

/zh/blog/*
/en/blog/*

/zh/pricing
/en/pricing

/zh/resources
/en/resources

/zh/sponsor
/en/sponsor
```

如果 ShipAny 默认 `localePrefix = 'as-needed'`，需要在迁移前统一决策：

- 方案 A：调整为始终带语言前缀，保留 `/zh/*`、`/en/*`。
- 方案 B：默认语言不带前缀，但给旧 `/zh/*` 做完整 301。

建议选择方案 A。原因是当前旧站已经是 `/zh` 和 `/en`，保留路径能降低 SEO 迁移风险，也方便中英文并行复制。

### 5.3 内容分层

#### 首页

作用：建立品牌、解释价值、分流到教程/FAQ/资料包/咨询。

重点模块：

- Claude Code 中文实战知识库定位。
- 新手路径：安装、价格、限制、基础使用。
- 进阶路径：CLAUDE.md、Plan Mode、MCP、团队规范。
- 资料包入口。
- 最新教程/FAQ。
- 邮件或社群订阅。

#### Docs

作用：承载深度教程和体系化指南。

适合内容：

- 安装指南。
- 基础使用。
- 配置指南。
- CLAUDE.md。
- MCP 入门。
- 工作流。
- 团队最佳实践。

#### FAQs

作用：承接大量长尾搜索。

适合内容：

- Claude Code 是什么？
- Claude Code 多少钱？
- Claude Code Pro 和 Max 怎么选？
- Claude Code 为什么提示 usage limit？
- Claude Code 如何查看用量？
- Claude Code Windows 怎么安装？
- Claude Code 支持中文吗？
- Claude Code 和 Cursor 有什么区别？

#### MCP

作用：抓住高意图开发者流量。

适合内容：

- Claude Code MCP 是什么？
- GitHub MCP 配置。
- Context7 MCP 配置。
- Playwright MCP 配置。
- Filesystem MCP 配置。
- 常见 MCP 报错。

#### Mechanics

作用：解释 Claude Code 内部机制和高级用法，建立专业度。

适合内容：

- Plan Mode。
- Compact。
- Context Window。
- Hooks。
- Permissions。
- Allowed tools。
- Memory/CLAUDE.md。

#### Templates

作用：承接付费资料包和免费引流资源。

适合内容：

- CLAUDE.md 模板。
- 项目启动模板。
- 代码审查模板。
- TDD 工作流模板。
- MCP 配置模板。
- 团队规范模板。

#### Blog

作用：承接更新、观点、对比、案例。

适合内容：

- Claude Code 最新版本解读。
- Claude Code vs Cursor。
- Claude Code vs Codex。
- Claude Code 团队使用案例。
- Claude Code 开发 SaaS 的完整流程。

#### Pricing / Paid Pack

作用：直接转化。

建议产品阶梯：

- 免费包：Claude Code 入门检查清单 + 3 个 CLAUDE.md 模板。
- 入门包：49-99 元，适合个人开发者。
- 标准包：199-399 元，适合独立开发者/小团队。
- 高级包：699-999 元，包含工作流、MCP、团队规范、视频/直播答疑。
- 企业培训/咨询：3000 元以上/场。

## 6. 技术架构拆解

### 6.1 必须先补的基础能力

#### 动态 sitemap

ShipAny 当前只有 `public/sitemap.xml` 占位文件，不适合上线。

必须新增 `src/app/sitemap.ts`，动态读取：

- 首页。
- Pricing。
- Blog。
- Docs。
- Posts。
- Pages。
- FAQs。
- MCP。
- Mechanics。
- Templates。
- 多语言 URL。

验收标准：

- `/sitemap.xml` 返回真实域名。
- 不出现 `your-domain.com`。
- 中英文页面都覆盖。
- 不包含登录、后台、设置、API、隐私条款等不该重点索引页面。

#### robots

模板已有 `src/app/robots.ts`，但要根据 V2 调整。

建议：

- 允许公开内容页。
- 禁止 `/admin/*`、`/settings/*`、`/activity/*`、`/api/*`。
- 低价值/重复页面 noindex。

#### canonical 与 hreflang

需要统一：

- 每个页面 self canonical。
- 中英文页面互相 hreflang。
- 旧站 URL 迁移时避免 canonical 指错。

#### 301 redirects

旧站路径必须梳理映射。

示例：

```text
/zh/tutorial/getting-started/installation -> /zh/docs/getting-started/installation
/zh/tutorial/configuration/claude-md -> /zh/docs/configuration/claude-md
/zh/tutorial/workflows/plan-mode -> /zh/mechanics/plan-mode
/zh/tutorial/tools-integration/mcp-servers -> /zh/mcp/overview
```

验收标准：

- 旧 URL 301 到新 URL。
- 不出现 404。
- 不出现重定向链。

### 6.2 内容系统重定义

建议在模板中新增或扩展内容集合：

```text
content/docs
content/posts
content/pages
content/faqs
content/mcp
content/mechanics
content/templates
```

每类内容建议 frontmatter：

```yaml
title:
description:
slug:
lang:
created_at:
updated_at:
category:
tags:
intent:
priority:
canonical:
related:
cta:
```

其中 `intent` 用于区分：

- informational：信息查询。
- commercial：商业比较。
- transactional：购买/下载。
- troubleshooting：报错解决。
- navigational：品牌/入口查询。

### 6.3 JSON 动态页的使用边界

适合 JSON 动态页：

- 首页。
- Pricing。
- Sponsor。
- Download。
- Paid Pack 销售页。
- 对比页。
- 工具页。
- 少量重点营销页。

不适合 JSON 动态页：

- FAQ 长尾库。
- 深度教程。
- 大量 MCP 配置文档。
- 需要 TOC、代码块、内链密度的文章。

### 6.4 支付和交付策略

模板 checkout 当前要求用户登录。对于低价资料包，这会增加转化阻力。

建议阶段化：

第一阶段：先验证需求。

- 可以先使用外部支付/表单/人工交付。
- 或改造模板支持邮箱购买。
- 重点验证哪些资料包有人付费。

第二阶段：模板内支付。

- 登录后购买。
- 用户中心查看订单。
- 支付成功后展示下载入口。
- 后台管理订单和用户。

第三阶段：会员化。

- 资料库会员。
- 高级模板持续更新。
- 团队版授权。
- 课程和直播权限。

## 7. SEO 内容增长策略

### 7.1 核心打法

学习 ClaudeLog 的成功点，但做中文差异化：

- 大量覆盖长尾问题。
- 每个问题有独立 URL。
- 页面结构清晰，直答优先。
- 主题之间互相内链。
- 建立作者/站点可信度。
- 有 sponsor 或商业合作入口。
- 有订阅或留资机制。

ClaudeLog 的启发不是「复制它的页面」，而是复制它的结构逻辑：

- FAQ 长尾入口。
- Mechanics 解释机制。
- MCP 工具生态入口。
- Pricing/Install 等高搜索页。
- Sponsor 商业化页面。

### 7.2 主题集群

#### 集群 1：入门与安装

Pillar：

- Claude Code 中文入门指南

Cluster：

- Claude Code Windows 安装教程
- Claude Code macOS 安装教程
- Claude Code WSL 配置教程
- Claude Code npm 安装失败怎么办
- Claude Code VS Code 里怎么用
- Claude Code 国内网络问题处理

#### 集群 2：价格与限制

Pillar：

- Claude Code 价格、套餐和使用限制完整指南

Cluster：

- Claude Code 多少钱
- Pro、Max、API 怎么选
- Claude Code usage limit 是什么
- 如何查看 Claude Code 用量
- Claude Code 适合个人开发者吗
- Claude Code 团队使用成本怎么算

#### 集群 3：配置与 CLAUDE.md

Pillar：

- CLAUDE.md 中文完整指南

Cluster：

- CLAUDE.md 放在哪里
- CLAUDE.md 应该写什么
- 项目级 CLAUDE.md 模板
- 团队 CLAUDE.md 模板
- Claude Code settings.json 配置
- allowedTools 和 permissions 配置

#### 集群 4：MCP 生态

Pillar：

- Claude Code MCP 中文入门指南

Cluster：

- GitHub MCP 配置
- Context7 MCP 配置
- Playwright MCP 配置
- Filesystem MCP 配置
- MCP server 启动失败
- Claude Code MCP 安全注意事项

#### 集群 5：工作流

Pillar：

- Claude Code 实战工作流指南

Cluster：

- Plan Mode 怎么用
- TDD 工作流
- 代码审查工作流
- 重构工作流
- 调试工作流
- PR 生成工作流

#### 集群 6：对比与替代

Pillar：

- Claude Code vs Cursor vs Codex 选型指南

Cluster：

- Claude Code vs Cursor
- Claude Code vs Codex
- Claude Code vs Gemini CLI
- Claude Code 适合 SaaS 开发吗
- Claude Code 适合前端开发吗
- Claude Code 适合后端重构吗

### 7.3 首批页面优先级

第一批建议 20 个页面：

1. Claude Code Windows 安装教程
2. Claude Code macOS 安装教程
3. Claude Code 多少钱
4. Claude Code Pro / Max / API 怎么选
5. Claude Code 使用限制和用量查看
6. Claude Code usage limit 解决办法
7. CLAUDE.md 完整中文指南
8. CLAUDE.md 模板下载
9. Claude Code settings.json 配置
10. Claude Code Plan Mode 怎么用
11. Claude Code MCP 中文入门
12. GitHub MCP 配置教程
13. Context7 MCP 配置教程
14. Playwright MCP 配置教程
15. Claude Code 常见报错
16. Claude Code vs Cursor
17. Claude Code vs Codex
18. Claude Code 团队使用最佳实践
19. Claude Code 资料包
20. Claude Code 中文教程首页

## 8. 商业转化设计

### 8.1 转化漏斗

```text
搜索流量
  -> FAQ / 安装 / 价格 / 报错 / MCP 页面
  -> 相关文章与模板推荐
  -> 免费资料包领取
  -> 邮件/社群沉淀
  -> 低价资料包购买
  -> 高级资料包/课程/咨询
  -> 团队培训/企业服务
```

### 8.2 页面 CTA 策略

不同页面使用不同 CTA：

- 入门页：领取入门检查清单。
- CLAUDE.md 页面：下载 CLAUDE.md 模板包。
- MCP 页面：下载 MCP 配置模板。
- 报错页：领取常见报错排查表。
- 对比页：查看 Claude Code 实战资料包。
- 团队实践页：预约团队培训/咨询。

### 8.3 资料包内容建议

免费包：

- Claude Code 入门检查清单。
- 3 个 CLAUDE.md 模板。
- 1 个 MCP 配置示例。

付费入门包：

- 新手安装排查手册。
- 常用命令速查。
- 常见报错解决。
- 个人项目 CLAUDE.md 模板。

标准包：

- SaaS 项目 CLAUDE.md。
- 前端项目 CLAUDE.md。
- 后端项目 CLAUDE.md。
- MCP 配置合集。
- Plan Mode 工作流。
- TDD 工作流。
- 代码审查工作流。

高级包：

- 团队规范。
- 多 Agent 协作流程。
- 项目重构流程。
- 生产级 prompt 和 hooks。
- 录屏课程或直播回放。

## 9. 后续目标式线程拆解

### 线程 1：V2 架构定稿

目标：确定 ShipAny V2 的最终 URL、内容集合、语言策略和迁移边界。

输入：

- 当前站内容列表。
- ShipAny 模板结构。
- 本文档。

动作：

- 决定是否始终保留 `/zh`、`/en`。
- 定义内容集合。
- 定义旧 URL 到新 URL 的映射规则。
- 输出迁移路由表。

验收标准：

- 有完整 URL 架构表。
- 有旧站到新站 301 映射。
- 有 sitemap 生成策略。

### 线程 2：ShipAny 基础品牌改造

目标：把模板从 ShipAny 默认站改成 ClaudeCode101 V2。

动作：

- 使用 `shipany-quick-start` 改首页、元信息、导航、footer、logo、主题。
- 去除默认 ShipAny 文案。
- 改隐私政策和服务条款。
- 清理默认 demo 页面。

验收标准：

- 首页不再出现 ShipAny 默认文案。
- 导航符合 ClaudeCode101。
- build 通过。

### 线程 3：SEO 技术基础设施

目标：补齐上线前 SEO 基础能力。

动作：

- 新增动态 `src/app/sitemap.ts`。
- 调整 robots。
- 统一 canonical。
- 增加 hreflang。
- 增加旧 URL redirects。
- 检查 noindex 策略。

验收标准：

- `/sitemap.xml` 真实可用。
- 旧 URL 不 404。
- 中英文页面 canonical/hreflang 正确。
- 登录、后台、API 不进入 sitemap。

### 线程 4：内容集合与页面模型

目标：建立 FAQ、MCP、Mechanics、Templates 的内容系统。

动作：

- 新增内容目录。
- 定义 frontmatter。
- 定义页面模板。
- 定义列表页和详情页。
- 定义 schema。

验收标准：

- 每类内容至少有 1 个示例页面。
- 可自动进入 sitemap。
- 可正常生成标题、描述、canonical。

### 线程 5：首批 20 个高价值页面

目标：先上线能带来搜索和转化的核心页面。

动作：

- 迁移/重写旧站优质内容。
- 新增安装、价格、限制、CLAUDE.md、MCP、对比、资料包页面。
- 每页加入合适 CTA。

验收标准：

- 20 个页面内容完整。
- 每页有内链。
- 每页有转化入口。
- 页面无明显 AI 空话和不可验证宣传。

### 线程 6：资料包 MVP

目标：先验证低价资料包付费需求。

动作：

- 设计资料包结构。
- 整理已有 `Claude Code 必看教程.docx` 可复用内容。
- 制作免费包和入门付费包。
- 设计销售页。
- 先选择外部支付或模板支付之一。

验收标准：

- 有可下载资料包。
- 有销售页。
- 有购买/领取路径。
- 有用户邮箱沉淀。

### 线程 7：支付与交付闭环

目标：把资料包销售迁入模板系统。

动作：

- 配置支付提供商。
- 确认是否需要登录购买。
- 支付成功后展示下载入口。
- 用户中心展示订单。
- 后台可查看订单。

验收标准：

- 测试订单完整走通。
- 支付失败和取消路径可用。
- 下载权限可控。

### 线程 8：多语言复制流程

目标：建立可复制的中英内容生产流程。

动作：

- 定义翻译规则。
- 定义术语表。
- 定义每类页面的生成模板。
- 建立 zh -> en 或 en -> zh 的同步流程。

验收标准：

- 新增一个中文页面后，可以按流程产出英文页。
- hreflang 正确。
- 不出现机器翻译式低质量内容。

### 线程 9：批量长尾页生产

目标：从 20 页扩展到 80-150 页。

动作：

- 建立关键词池。
- 建立 FAQ 问题库。
- 建立页面生成规则。
- 分批发布。
- 低价值页面暂不 index。

验收标准：

- 页面可批量生成但不重复。
- 每页有独特信息和内链。
- sitemap 可分组或可维护。

### 线程 10：上线与监控

目标：安全切换 V2。

动作：

- 本地 build。
- 预览环境检查。
- 旧 URL 抽样测试。
- robots/sitemap 检查。
- Search Console 提交。
- Analytics 事件检查。

验收标准：

- 核心页面 200。
- 旧页面 301。
- sitemap 200。
- robots 正确。
- 支付链路可用。

## 10. 风险清单

### SEO 迁移风险

风险：旧 URL 变更导致已收录页面掉流量。
控制：建立完整 301 映射，保留 `/zh` 和 `/en` 结构。

### 批量内容质量风险

风险：大量 AI 页面内容重复、薄、无价值。
控制：每个页面必须有明确搜索意图、独特信息、相关内链、CTA，不达标先 noindex。

### 支付转化风险

风险：低价资料包强制登录降低转化。
控制：先测试无登录购买或外部支付，再迁入会员系统。

### 模板默认内容风险

风险：上线后残留 ShipAny 默认文案、图片、价格、sitemap。
控制：上线前做全站关键字扫描：`ShipAny`、`YourAppName`、`your-domain.com`。

### 技术债风险

风险：所有页面都走 JSON 动态页，后续维护困难。
控制：JSON 只做营销页，内容页使用 MDX/内容集合。

## 11. 收敛后的推荐执行顺序

当前最推荐的执行路径改为两阶段。

第一阶段：现有品牌和 SEO 资产迁移。

1. 线程 A：现有 URL 与内容资产盘点。
2. 线程 B：ClaudeCode101 品牌迁入 ShipAny 模板。
3. 线程 C：迁移当前 P0 页面，并保留或映射旧 URL。
4. 线程 D：迁移当前 P1 页面，修复内部链接。
5. 线程 E：补齐 sitemap、robots、canonical、hreflang、301。
6. 线程 F：预览环境验证和上线切换。

第二阶段：ClaudeLog 式内容扩展。

1. 从现有页面拆 FAQ。
2. 扩 MCP 内容集群。
3. 扩 Mechanics 内容集群。
4. 增加 Pricing / Comparison / Status 等高搜索意图页面。
5. 再接资料包 MVP、支付交付和会员化。

这个顺序的核心是：**先保住现在已经上线的内容资产，再扩大搜索入口；先让 SaaS 模板成为新主站，再使用它的商业能力。**

## 12. 近期第一步建议

下一次线程建议这样开启：

```text
请你按照 docs/claude-code-v2-migration-growth-plan.md 的 0.x 收敛主线，先执行线程 A：现有 URL 与内容资产盘点。请审查当前站的 src/content、src/app/sitemap.ts、线上品牌结构，以及 shipany-template-cf 5 的路由和内容系统，输出 P0/P1/P2 页面清单、旧 URL 保留或 301 策略、以及第一批迁移到 SaaS 模板的具体文件映射。
```

完成线程 A 后，再进入 ShipAny 品牌迁入和 P0 页面迁移。这样可以避免一开始就做大规模内容扩张，也能最大程度保护现有站点权重。
