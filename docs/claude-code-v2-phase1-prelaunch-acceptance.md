# ClaudeCode101 V2 第一阶段上线前验收记录

日期：2026-05-23

## 阶段定位

第一阶段不继续扩散新业务形态，先收敛到一个目标：把已有 ClaudeCode101 的公开流量入口、关键词页面结构和基础权重，稳定迁移到 SaaS 模板上。

当前阶段的重点不是立刻开放登录、支付或会员体系，而是先让公开内容站具备可上线、可索引、可继续扩展教程集群的基础：

- 首页完成品牌和主题改版，站点口径收敛为「Claude Code 中文实战指南」。
- `/tutorial` 教程中心承接原有安装、配置、MCP、工作流等关键词页面。
- `/resources` 承接资源、案例、资料包等未来转化入口。
- `/upgrade` 作为后续课程、资料包、模板交付的商业化预埋入口。
- 保留模板的登录、支付、后台等能力，但第一阶段不把它们暴露为主路径。

## 本轮修复内容

### 1. 生产环境公共页面去 DB 依赖

生产 standalone 预览时，`/zh`、`/en`、`/resources`、`/upgrade` 一度出现 500。根因是公共页面渲染链路间接加载了模板的数据库模块，进而触发 `@libsql/darwin-arm64` 原生依赖缺失。

已处理：

- 公共 layout 默认使用环境变量配置。
- 只有显式开启 `RUNTIME_CONFIG_FROM_DB=true` 时，才动态读取数据库配置。
- ads、analytics、affiliate、customer service 等服务改为按需动态加载 DB 配置。
- 动态内容页改用 DB-free 的本地内容读取模块，避免公开页面被后台文章模型拖进数据库链路。

结论：公开 SEO 页面已经可以在 standalone 生产预览中稳定运行。

### 2. 清理 iCloud 重复文档导致的脏路由

发现 `content/docs` 下存在 iCloud 产生的重复文件：

- `index 2.mdx`
- `index.zh 2.mdx`

它们会被教程系统识别成错误路径，构建中出现类似 `/en/tutorial/index%202` 的脏 URL。

已删除重复文件，重新构建后静态教程页面恢复为 `76/76`，不再生成 `index%202`。同时清理了多语言配置里的 `pages/index 2.json` 重复文件。

### 3. 404 与未知动态页 noindex

未知动态页之前会同时出现 `noindex` 和全局 `index, follow` 的冲突信号。

已处理：

- 默认不再为所有页面强行输出 `index, follow`。
- 仅在明确需要 noindex 时输出 robots。
- 缺失动态页内容或翻译时返回 noindex，避免模板残留页被搜索引擎误收录。
- 未知动态页先判断是否存在对应页面配置，避免上线后反复打印缺失翻译日志。

## 验收结果

生产构建：

- `pnpm build` 通过。
- 静态教程页生成数量：`76/76`。
- 构建仍存在模板原有 lint warning，集中在后台、聊天、支付、表单和 AI 组件，不阻断第一阶段公共页面上线。

生产预览：

- 使用 `.next/standalone/server.js` 在 `http://localhost:3000` 启动通过。
- `/zh`、`/en`、`/zh/tutorial`、`/en/tutorial`、关键教程页、`/resources`、`/upgrade`、`/sitemap.xml`、`/robots.txt` 均返回 200。

sitemap：

- sitemap URL 数量：68。
- 所有 URL 均使用 `https://www.claudecode101.com/` 正式域名。
- 未发现后台、登录、注册、支付、API、旧价格页、旧博客页、旧 showcase 页或 `index%202`。

旧 URL 跳转：

- `/quick-start` -> `/zh/tutorial`
- `/zh/quick-start` -> `/zh/tutorial`
- `/en/quick-start` -> `/en/tutorial`
- `/docs` -> `/zh/tutorial`
- `/zh/docs/getting-started/installation` -> `/zh/tutorial/getting-started/installation`
- `/pricing`、`/zh/pricing` -> `/zh/resources`
- `/zh/showcases`、`/zh/blog` -> `/zh/resources`

SEO 元信息：

- `/zh`、`/en`、`/zh/tutorial`、`/zh/resources` 均输出正确 canonical。
- Googlebot 视角下可看到 zh/en hreflang alternate。
- 404 页面输出 `noindex`。

## 剩余事项

第一阶段可以认为已经接近完成，但正式上线前建议保留以下收尾项：

1. 部署到线上后，用线上域名重新跑一次 sitemap、canonical、hreflang、robots 和旧 URL 跳转验收。
2. 到 Google Search Console 提交新版 sitemap，并观察旧 URL 是否顺利迁移到 `/tutorial` 体系。
3. 私有 SaaS 能力暂时不作为主路径开放，登录、支付、后台、API 的数据库运行链路应在第二阶段商业化前单独验收。
4. 模板原有 lint warning 可以作为后续工程清理任务，不建议在第一阶段上线前扩大范围处理。
5. 下一步内容扩展应继续收敛在 Claude Code 教程、MCP、CLAUDE.md、Plan Mode、团队工作流和可售资料包预埋，不建议同时扩散到过多 AI 工具泛内容。

## 下一阶段推荐

建议第二阶段按「流量页优先，转化入口轻量预埋」推进：

1. 先扩充 `/tutorial` 下的长尾关键词教程页，保证每页有明确搜索意图和内部链接。
2. 再完善 `/resources`，把它做成资料包、模板、清单、案例的集合页。
3. 最后再启动 `/upgrade` 的付费转化实验，不急着大规模做会员系统。

这样可以继续承接现有权重，同时保留 SaaS 模板未来登录、支付、订单、会员资料交付的能力。
