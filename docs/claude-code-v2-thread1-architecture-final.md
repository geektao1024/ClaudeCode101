# ClaudeCode101 V2 架构定稿 - 线程 1（收敛版）

日期：2026-05-22
修订口径：2026-05-23 收敛版

范围：确认从当前 Nextra 文档站迁移到 `shipany-template-cf 5` 的 V2 架构。
本版本按“先收敛、先迁移、先保权重”的思路修订：**第一阶段只迁移现有 ClaudeCode101 品牌、现有关键词页面结构和已有 SEO 资产；ClaudeLog 式 FAQ/MCP/Mechanics/Compare/Pricing 扩展放到第二阶段。**

## 0. 收敛后的最终原则

当前不做“大而全”的新站扩张，只做一个明确目标：

> 用 SaaS 模板承接现有 ClaudeCode101 线上品牌和已有页面权重。

第一阶段的原则：

- 先迁移现有品牌，不重做品牌。
- 先保留现有 URL 结构，不急着重命名栏目。
- 先迁移已有 sitemap 和教程页，不批量生成新 FAQ。
- 先让 SaaS 模板成为新主站，不急着上线支付/课程/资料包。
- 先解决 sitemap、canonical、hreflang、301、robots，再扩内容矩阵。

第二阶段才考虑：

- 按 ClaudeLog 结构拆 FAQ。
- 扩 MCP 独立栏目。
- 扩 Mechanics 机制解释栏目。
- 做 pricing、status、compare、sponsor 等新入口。
- 做资料包、课程、会员和支付交付闭环。

## 1. 基线检查

### 1.1 当前站点

当前本地实现：

- 框架：Next.js 15、React 19、Nextra v4、Tailwind v4。
- 主路由：`src/app/[lang]/[[...mdxPath]]/page.tsx`。
- 语言：`zh`、`en`，当前默认中文。
- 内容根目录：`src/content/{zh,en}/**`。
- 实际 MDX 页面：64 个文件，中英文各 32 个。
- 当前 sitemap 来源：`src/app/sitemap.ts` 中手工维护的 routes 数组。
- 当前重定向：`/zh/quick-start -> /zh/tutorial`、`/en/quick-start -> /en/tutorial`。

2026-05-22 线上检查结果：

- `https://www.claudecode101.com/sitemap.xml` 返回 55 个 URL：27 个 route stem × 2 个语言版本，再加根路径。
- `https://www.claudecode101.com/zh/quick-start` 会跳转到 `/zh/tutorial`。
- `https://www.claudecode101.com/zh/tutorial/configuration/global-prompts` 返回 200，但没有进入当前 sitemap。

本地存在、但当前 sitemap 缺失的页面：

- `/tutorial/configuration/global-prompts`
- `/tutorial/optimization/architecture-analysis`
- `/tutorial/optimization/code-quality`
- `/tutorial/optimization/tech-stack`
- `/tutorial/optimization/ultrathink-mode`

线程 1 的结论：

- V2 必须从内容源自动生成 sitemap，不能继续依赖手工 routes 数组。
- 这些“本地存在但 sitemap 缺失”的页面需要重新评估：有价值则纳入新 sitemap；质量低或过时则合并、重写或 noindex。

### 1.2 ShipAny 模板真实情况

模板路径：`shipany-template-cf 5`

当前公开路由族：

| 路由 | 当前渲染方式 | 第一阶段判断 |
| --- | --- | --- |
| `/:locale` | JSON 动态页，`pages/index.json` | 适合做 ClaudeCode101 首页。 |
| `/:locale/pricing` | JSON 动态页 + 支付状态 | 暂不作为第一阶段重点，可保留但不主推。 |
| `/:locale/blog` | 本地 MDX posts + DB posts | 第一阶段可以不启用，后续做文章和更新。 |
| `/:locale/blog/:slug` | 本地 MDX 或 DB post 详情 | 第二阶段使用。 |
| `/:locale/docs/*` | Fumadocs，来源 `content/docs` | 适合承载深度教程，但第一阶段要考虑旧 `/tutorial/*` 权重。 |
| `/:locale/updates` | Fumadocs logs，来源 `content/logs` | 作为站点更新日志即可，不做迁移重点。 |
| `/:locale/showcases` | JSON 动态页 | 非迁移重点。 |
| `/:locale/:slug*` | 静态 page 或 JSON 动态页 | 适合少量平铺页面，不适合承载全部教程。 |

当前私有/系统路由：

- `/:locale/sign-in`
- `/:locale/sign-up`
- `/:locale/verify-email`
- `/:locale/settings/*`
- `/:locale/activity/*`
- `/:locale/admin/*`
- `/:locale/chat/*`
- `/api/*`

当前已配置内容集合：

- `content/docs`
- `content/pages`
- `content/posts`
- `content/logs`

V2 第一阶段必须补的缺口：

- 模板当前没有 `src/app/sitemap.ts`。
- `src/app/robots.ts` 需要按 ClaudeCode101 V2 调整。
- `src/config/locale/index.ts` 当前使用 `localePrefix = 'as-needed'`。
- SEO helper 对默认语言 canonical 的处理倾向无语言前缀。
- 根布局 hreflang 当前假设英文可能无前缀。
- 模板内容仍有 `YourAppName`、ShipAny 默认文案和占位内容。
- 当前 `/:locale/docs/*` 与旧站 `/tutorial/*` 路径不一致，需要专门处理权重保护。

## 2. 最终决策

### 2.1 语言策略

所有公开页面都使用语言前缀。

最终策略：

- `/zh/*` 和 `/en/*` 是规范公开 URL。
- `/` 跳转到 `/zh`。
- 无语言前缀的旧 URL 直接跳转到对应中文 URL。
- `NEXT_PUBLIC_DEFAULT_LOCALE` 使用 `zh`。
- ShipAny 的 `localePrefix` 从 `as-needed` 调整为 `always`。
- `localeDetection` 保持 `false`，避免基于浏览器语言产生 SEO 波动。

原因：

- 当前线上站已经使用 `/zh` 和 `/en`。
- 现有 sitemap 和内部链接都使用语言前缀。
- 可以避免默认语言 canonical 变成无前缀路径。
- 中英文增长线保持对称。

### 2.2 URL 策略：第一阶段优先保留旧结构

英文初版方案曾建议把旧 `/tutorial/*` 重构到 `/docs/*`、`/mcp/*`、`/mechanics/*` 等新栏目。
按当前收敛思路，这个推荐需要调整：

第一阶段不主动大规模改 URL。
第一阶段优先保留当前已有 URL 结构：

```text
/zh
/en
/zh/tutorial
/en/tutorial
/zh/tutorial/getting-started/installation
/zh/tutorial/configuration/claude-md
/zh/tutorial/tools-integration/mcp-servers
/zh/tutorial/workflows/plan-mode
...
```

推荐方式：

- SaaS 模板内部可以使用 Fumadocs/MDX 来渲染教程。
- 但公开 URL 第一阶段尽量继续使用 `/tutorial/*`。
- 如果技术上必须先落到 `/docs/*`，则旧 `/tutorial/*` 必须一跳 301 到新 URL。
- 不允许出现 `/quick-start -> /tutorial -> /docs` 这种多跳链。

第一阶段优先级：

1. 保 URL 权重。
2. 保内容可访问。
3. 保 sitemap 完整。
4. 再考虑栏目重命名和 ClaudeLog 式结构。

### 2.3 渲染边界

不要把所有页面都塞进 JSON 动态页。

第一阶段推荐边界：

| 页面类型 | 渲染方式 | 第一阶段策略 |
| --- | --- | --- |
| 首页 | JSON 动态页 | 改成 ClaudeCode101 品牌首页。 |
| `resources`、`upgrade` 等平铺页 | `content/pages` 或 JSON 动态页 | 保留旧 URL，先迁移内容。 |
| `tutorial/**` 教程 | Fumadocs/MDX | 第一阶段保留 `/tutorial/*` 公开路径。 |
| `quick-start` | redirect | 保留现有跳转逻辑，避免多跳。 |
| `api-reference` | 待评估 | 如果内容泛化或不可信，P2 处理。 |
| pricing、sponsor、paid pack | JSON 动态页 | 第二阶段做，不阻塞迁移。 |
| FAQ、MCP、Mechanics、Compare | 专用内容集合 | 第二阶段再建，不作为第一阶段上线前置条件。 |
| Blog/news | `content/posts` | 第二阶段使用。 |

第二阶段可再扩展：

| 页面类型 | 渲染方式 | 说明 |
| --- | --- | --- |
| FAQ 长尾页 | `content/faqs` | 从现有教程拆解，不凭空批量生成。 |
| MCP 独立页 | `content/mcp` | 从现有 MCP servers 页面扩展。 |
| Mechanics 页 | `content/mechanics` | 从 Plan Mode、context、ultrathink 等内容扩展。 |
| Templates 页 | `content/templates` | 用于免费模板和资料包入口。 |
| Compare 页 | `content/compare` | 用于 Claude Code vs Cursor/Codex 等商业意图页面。 |

## 3. 第一阶段 URL 架构

第一阶段公开 URL 以“保留当前结构”为主。

| URL 家族 | 目的 | 内容来源 | 索引策略 | 示例 |
| --- | --- | --- | --- | --- |
| `/:locale` | 品牌首页和流量分发 | JSON `pages/index` | index | `/zh`、`/en` |
| `/:locale/tutorial` | 当前教程中心入口 | Fumadocs/MDX | index | `/zh/tutorial` |
| `/:locale/tutorial/*` | 当前已有教程页 | Fumadocs/MDX | index 或按质量评估 | `/zh/tutorial/configuration/claude-md` |
| `/:locale/resources` | 当前资源页 | `content/pages` 或 JSON | index | `/zh/resources` |
| `/:locale/upgrade` | 当前升级/版本页 | `content/pages` 或 MDX | index，但需更新过时内容 | `/zh/upgrade` |
| `/:locale/quick-start` | 当前旧入口 | redirect | 不单独 index | `/zh/quick-start` |
| `/:locale/api-reference` | 当前 API 页 | 待评估 | P2：重写、noindex 或移除 | `/zh/api-reference` |
| `/:locale/privacy-policy` | 法律页 | `content/pages` | noindex 或不进主 sitemap | `/zh/privacy-policy` |
| `/:locale/terms-of-service` | 法律页 | `content/pages` | noindex 或不进主 sitemap | `/zh/terms-of-service` |

系统 URL 不进入 sitemap：

- `/api/*`
- `/:locale/admin/*`
- `/:locale/settings/*`
- `/:locale/activity/*`
- `/:locale/chat/*`
- `/:locale/sign-in`
- `/:locale/sign-up`
- `/:locale/verify-email`
- `/:locale/no-permission`
- 模板自带 demo AI generator 页面，除非后续明确产品化

## 4. 内容集合设计

### 4.1 第一阶段集合

第一阶段尽量少改架构，只做必要适配。

建议保留或调整为：

```ts
export const docs = defineDocs({ dir: 'content/docs' });
export const pages = defineDocs({ dir: 'content/pages' });
export const posts = defineDocs({ dir: 'content/posts' });
export const logs = defineDocs({ dir: 'content/logs' });
```

但公开路由上需要解决一个问题：ShipAny 默认 docs 路径是 `/docs`，而当前站权重在 `/tutorial`。

可选实现方案：

| 方案 | 做法 | 判断 |
| --- | --- | --- |
| A：保留 `/tutorial` 路由 | 新增 `/:locale/tutorial/[[...slug]]`，复用 Fumadocs 内容源 | 第一阶段最优，保护旧 URL。 |
| B：迁到 `/docs` | 旧 `/tutorial/*` 一跳 301 到 `/docs/*` | 可接受，但不如保留旧 URL 稳。 |
| C：同时开放 `/tutorial` 和 `/docs` | 两套 URL 都可访问 | 不推荐，容易重复索引。 |

推荐方案 A。

### 4.2 第一阶段 frontmatter

迁移当前教程时，先使用轻量 frontmatter，不要过度设计：

```yaml
title:
description:
created_at:
updated_at:
priority:
status:
noindex:
legacy_path:
canonical_path:
```

字段规则：

| 字段 | 规则 |
| --- | --- |
| `title` | 保留原页面主题，但优化为中文自然标题。 |
| `description` | 用于 SEO 描述，避免空泛。 |
| `priority` | 用于 sitemap，P0 页面 0.8-1.0。 |
| `status` | `published` 才进入 sitemap。 |
| `noindex` | 低价值或待重写页面先不索引。 |
| `legacy_path` | 记录当前旧 URL。 |
| `canonical_path` | 第一阶段优先等于旧路径。 |

### 4.3 第二阶段集合

第二阶段再新增：

```ts
export const faqs = defineDocs({ dir: 'content/faqs' });
export const mcp = defineDocs({ dir: 'content/mcp' });
export const mechanics = defineDocs({ dir: 'content/mechanics' });
export const templates = defineDocs({ dir: 'content/templates' });
export const compare = defineDocs({ dir: 'content/compare' });
```

这些集合不要在第一阶段阻塞迁移。

## 5. Sitemap 策略

新增 `shipany-template-cf 5/src/app/sitemap.ts`。

第一阶段 sitemap 必须覆盖：

- 首页：`/zh`、`/en`
- 当前 sitemap 中已有的教程页
- 当前 sitemap 缺失但线上可访问、且质量合格的本地页面
- `resources`
- `upgrade`
- 必要的中英文对应页

第一阶段 sitemap 不应该包含：

- `quick-start`，因为它是 redirect。
- `api-reference`，如果内容未重写或可信度不足。
- 登录、注册、后台、设置、用户中心。
- ShipAny 默认 demo 页面。
- 仍含 `YourAppName`、`TODO`、`your-domain.com` 的页面。
- 第二阶段尚未完成的 FAQ、MCP、Compare、Pricing、Sponsor 页面。

生成规则：

- sitemap 从内容源生成，而不是手工 routes 数组。
- `status !== published` 不进入 sitemap。
- `noindex: true` 不进入 sitemap。
- 页面 canonical 必须使用 `NEXT_PUBLIC_APP_URL + /:locale + canonical_path`。
- P0 页面 priority 建议 `0.8-1.0`。
- P1 页面 priority 建议 `0.6-0.8`。
- P2 页面在重写前不进入 sitemap 或设 noindex。

## 6. Canonical 与 hreflang

第一阶段最终策略：

- 每个中文页面 self-canonical 到 `/zh/*`。
- 每个英文页面 self-canonical 到 `/en/*`。
- `/zh/*` 与 `/en/*` 互相声明 hreflang。
- 默认语言也必须带 `/zh`，不能 canonical 到无前缀路径。
- `/` 只做跳转，不作为主要 canonical。

需要后续检查的代码区域：

- `src/config/locale/index.ts`
- `src/core/i18n/config.ts`
- `src/shared/lib/seo.ts`
- `src/app/[locale]/layout.tsx`
- 新增 sitemap 和 redirects 配置

## 7. 旧 URL 与 301 策略

### 7.1 总原则

第一阶段优先保留旧 URL。
保不住的 URL，必须一跳 301 到最接近的新 URL。

避免：

- 多跳重定向。
- 中英文错跳。
- `/zh` 页面跳到无前缀 URL。
- 旧 URL 变成 404。

### 7.2 推荐保留的旧 URL

这些页面第一阶段应尽量原路径保留：

| 当前 URL | 第一阶段目标 | 说明 |
| --- | --- | --- |
| `/:locale` | 保留 | 首页。 |
| `/:locale/tutorial` | 保留 | 当前教程中心入口，P0。 |
| `/:locale/tutorial/getting-started/installation` | 保留 | 安装意图强，P0。 |
| `/:locale/tutorial/getting-started/basic-usage` | 保留 | 新手使用，P0。 |
| `/:locale/tutorial/configuration/claude-md` | 保留 | CLAUDE.md 高价值，P0。 |
| `/:locale/tutorial/tools-integration/mcp-servers` | 保留 | MCP 高价值，P0。 |
| `/:locale/tutorial/workflows/plan-mode` | 保留 | Plan Mode 高价值，P0。 |
| `/:locale/resources` | 保留 | 资源页，P0。 |
| `/:locale/upgrade` | 保留但需更新 | 版本信息可能过时。 |

### 7.3 推荐 redirect 的 URL

| 当前 URL | 目标 URL | 说明 |
| --- | --- | --- |
| `/:locale/quick-start` | `/:locale/tutorial` | 保留当前线上逻辑。 |
| `/quick-start` | `/zh/tutorial` | 无语言前缀默认进中文。 |
| `/tutorial/*` | `/zh/tutorial/*` | 无语言前缀默认进中文。 |
| `/resources` | `/zh/resources` | 无语言前缀默认进中文。 |
| `/upgrade` | `/zh/upgrade` | 无语言前缀默认进中文。 |

域名级规则：

- `https://claudecode101.com/*` 继续跳转到 `https://www.claudecode101.com/*`。
- 域名 canonical 后，再做 app 级路径 redirect。

## 8. 第一阶段页面优先级

如果没有 Search Console 点击/展现数据，先用“当前 sitemap + 搜索意图 + 商业潜力”排序。后续拿到 GSC 数据后再修正。

### P0：第一批必须迁移

| 优先级 | URL | 类型 | 迁移动作 | 备注 |
| --- | --- | --- | --- | --- |
| P0 | `/zh`、`/en` | 首页 | 品牌迁入 ShipAny 首页 | 不再出现 ShipAny 默认文案。 |
| P0 | `/zh/tutorial`、`/en/tutorial` | 教程入口 | 保留 URL，迁移到 SaaS 模板 | 当前 quick-start 指向此页。 |
| P0 | `/zh/tutorial/getting-started/installation` | 教程 | 保留 URL，迁移内容 | 安装搜索意图强。 |
| P0 | `/zh/tutorial/getting-started/basic-usage` | 教程 | 保留 URL，迁移内容 | 新手入口。 |
| P0 | `/zh/tutorial/configuration/claude-md` | 教程 | 保留 URL，迁移内容 | 后续可扩模板入口。 |
| P0 | `/zh/tutorial/tools-integration/mcp-servers` | 教程 | 保留 URL，迁移内容 | 后续扩 MCP 集群。 |
| P0 | `/zh/tutorial/workflows/plan-mode` | 教程 | 保留 URL，迁移内容 | 后续扩 Mechanics。 |
| P0 | `/zh/resources`、`/en/resources` | 资源页 | 保留 URL，迁移内容 | 后续承接资料包入口。 |
| P0 | `/zh/upgrade`、`/en/upgrade` | 版本页 | 保留 URL，但必须更新 | 避免过时版本伤害可信度。 |

英文版本处理：

- 如果英文原内容已有且质量可接受，则同步迁移。
- 如果英文内容明显机器化或过时，先迁移但不新增新英文扩展页。
- 不发布英文 placeholder 页面。

### P1：第二批迁移

| URL stem | 处理建议 |
| --- | --- |
| `/tutorial/configuration/tools-allowlist` | 迁移，保留 URL。 |
| `/tutorial/configuration/github-cli` | 迁移，保留 URL。 |
| `/tutorial/configuration/global-prompts` | 本地存在且线上 200，补入 sitemap 前先审内容质量。 |
| `/tutorial/tools-integration/bash-tools` | 迁移，保留 URL。 |
| `/tutorial/tools-integration/custom-commands` | 迁移，保留 URL。 |
| `/tutorial/workflows/explore-plan-code` | 迁移，保留 URL。 |
| `/tutorial/workflows/test-driven` | 迁移，保留 URL。 |
| `/tutorial/workflows/visual-iteration` | 迁移，保留 URL。 |
| `/tutorial/workflows/demo-assets` | 迁移，保留 URL，检查是否仍有价值。 |
| `/tutorial/workflows/codebase-qa` | 迁移，保留 URL。 |
| `/tutorial/workflows/git-management` | 迁移，保留 URL。 |
| `/tutorial/workflows/v0-components` | 迁移，保留 URL，检查是否过时。 |
| `/tutorial/optimization/specific-instructions` | 迁移，保留 URL。 |
| `/tutorial/optimization/context-management` | 迁移，保留 URL，后续可扩 Mechanics。 |
| `/tutorial/optimization/direction-correction` | 迁移，保留 URL。 |
| `/tutorial/advanced/headless-mode` | 迁移，保留 URL。 |
| `/tutorial/advanced/multi-claude` | 迁移，保留 URL。 |

### P2：迁移后再判断

| URL stem | 处理建议 |
| --- | --- |
| `/api-reference` | 先审查真实性；如果泛化或不可信，noindex、重写或移除。 |
| `/tutorial/optimization/architecture-analysis` | 本地存在但 sitemap 缺失，审查后决定是否纳入。 |
| `/tutorial/optimization/code-quality` | 本地存在但 sitemap 缺失，审查后决定是否纳入。 |
| `/tutorial/optimization/tech-stack` | 本地存在但 sitemap 缺失，审查后决定是否纳入。 |
| `/tutorial/optimization/ultrathink-mode` | 本地存在但 sitemap 缺失，审查后决定是否纳入。 |

## 9. 第一阶段不做的内容

明确暂不做：

- 新建 `/faqs/*` 大量问答页。
- 新建 `/mcp/*` 独立 MCP 集群。
- 新建 `/mechanics/*` 机制解释集群。
- 新建 `/compare/*` 对比页。
- 新建 `/pricing` 作为付费资料包销售页。
- 新建 `/sponsor`。
- 新建 Claude status / is Claude down 页面。
- 大规模资料包支付交付闭环。
- 课程页、会员页、训练营页。

这些都放到第二阶段。

## 10. 第二阶段 ClaudeLog 式扩展方向

第一阶段稳定后，再按以下顺序扩展：

1. 从现有教程拆 FAQ：
   - 安装 FAQ。
   - 价格/套餐 FAQ。
   - 使用限制 FAQ。
   - CLAUDE.md FAQ。
   - MCP FAQ。

2. 从现有 MCP 页面扩 MCP 集群：
   - MCP overview。
   - GitHub MCP。
   - Context7 MCP。
   - Playwright MCP。
   - 常见 MCP 报错。

3. 从现有工作流页面扩 Mechanics：
   - Plan Mode。
   - Context management。
   - Headless mode。
   - Multi-Claude。
   - Ultrathink。

4. 从 resources/CLAUDE.md 页面扩 Templates：
   - CLAUDE.md 模板。
   - MCP 配置模板。
   - 工作流模板。
   - 代码审查模板。

5. 再补商业意图页面：
   - Claude Code vs Cursor。
   - Claude Code vs Codex。
   - Claude Code pricing。
   - Claude Code paid pack。

## 11. 验收标准

第一阶段完成后，必须满足：

- 首页已换成 ClaudeCode101 品牌。
- 线上旧 P0 URL 全部可访问或一跳 301。
- `/zh`、`/en` 均保留。
- 当前已有教程内容已迁移到 SaaS 模板。
- sitemap 从内容源生成，不再手工漏页。
- robots 不阻挡公开内容。
- canonical 全部指向带语言前缀的规范 URL。
- hreflang 中英文互相对应。
- 系统页、登录页、后台页不进入 sitemap。
- 模板中不再残留 `YourAppName`、`your-domain.com`、ShipAny 默认首页文案。
- `quick-start` 不形成多跳重定向。
- P2 页面未审查前不强行进入 sitemap。

## 12. 线程 2 建议

线程 2 不应直接开始做 ClaudeLog 内容扩展。
线程 2 应该从 SaaS 模板品牌迁入和 URL 保权开始。

建议线程 2 开场任务：

```text
请按照 docs/claude-code-v2-thread1-architecture-final.md 的收敛版方案，开始线程 2：ClaudeCode101 品牌迁入 ShipAny 模板。第一阶段只迁移现有品牌和 P0 页面，不新增 FAQ/MCP/Compare/Pricing 等第二阶段内容。请先审查 shipany-template-cf 5 的首页、localePrefix、docs 路由、sitemap/robots/canonical/hreflang 能力，然后输出需要修改的文件清单和执行顺序。
```

线程 2 的关键决策：

- 是否新增 `/tutorial/[[...slug]]` 路由来保留旧 URL。
- 是否把 ShipAny 默认 `/docs` 暂时隐藏或 301 到 `/tutorial`。
- 首页是否只做品牌迁入，不引入资料包支付。
- P0 页面内容迁移采用手动迁移还是脚本迁移。
- sitemap 第一版是否只覆盖 P0/P1 已发布页面。

## 13. 最终结论

英文初版架构方向整体正确，但对当前阶段来说扩得太快。
本收敛版的最终建议是：

> 先把现有 ClaudeCode101 站点完整、安全地迁入 SaaS 模板，保住旧 URL、旧内容和已有关键词资产；等新模板稳定上线后，再按照 ClaudeLog 的结构扩 FAQ、MCP、Mechanics、Compare、Pricing 和资料包转化。

这条路径更慢一点，但更稳，也更符合当前站点“已有上线品牌、已有页面但流量还不大”的现实状态。
