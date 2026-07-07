# ClaudeLog 竞品拆解与 ClaudeCode101 全站内容标准

核查日期：2026-07-07

## 本次拆解范围

竞品 `ClaudeLog` 的有效页面不是只有价格页。已抽样拆解这些高意图页面：

| 页面类型  | 竞品样本                         | 有价值的结构                                      | 我们采用的标准                                         |
| --------- | -------------------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| 价格/计划 | `/claude-code-pricing/`          | 首屏推荐表，按用户情况直接给 Pro、Max、API 选择。 | pricing、limits、upgrade 等决策页先给推荐表。          |
| FAQ 快答  | `/faqs/how-much-is-claude-code/` | 直接回答问题，篇幅短，适合搜索意图。              | FAQ 前 80 字给答案，再链到深度页。                     |
| 安装页    | `/install-claude-code/`          | 先列系统要求和安装路径，再给验证方式。            | 安装页必须有「选择路径 -> 命令 -> 验证 -> 失败分支」。 |
| 教程页    | `/claude-code-tutorial/`         | 从项目设置、第一次会话、常用命令进入。            | 教程 Hub 先给学习路径表，不先堆卡片。                  |
| 配置页    | `/configuration/`                | 把 API key、模型、MCP、UI、CLI flags 分区。       | 配置类页面按「做什么 -> 改哪里 -> 如何验证」写。       |
| MCP 目录  | `/claude-code-mcps/`             | 工具目录按用途展开。                              | 目录页按任务场景分组，不只罗列名字。                   |
| 机制页    | `/mechanics/plan-mode/`          | 解释功能前先说明使用场景和限制。                  | 机制页必须区分「适合 / 不适合 / 如何验证」。           |
| 排障页    | `/troubleshooting/`              | 按症状分组，用户能快速定位。                      | 排障页首屏必须是 symptom table。                       |
| 限制页    | `/claude-code-limits/`           | usage、rate、context、plan limits 分开。          | 所有限制页统一四类限制，不混写。                       |

结论：竞品赢在信息组织，不是文案更长。我们要保留自己的可信度和双语结构，但把高意图页面都改成「先决策、再解释、再验证」。

## 全站内容标准

### 1. 首屏必须回答用户意图

所有高意图页开头顺序固定：

1. H1。
2. 一句话说明这页帮用户做什么决定。
3. 第一屏出现表格、步骤列表或明确判断。
4. 再进入解释、背景、细节和来源。

不合格写法：

- 先讲历史背景。
- 先写三段泛泛介绍。
- 只说“取决于你的情况”，不给默认建议。
- 首屏只有装饰卡片，没有可执行信息。

### 2. 按页面类型使用固定结构

| 页面类型                   | 第一模块                                    | 必备内容                                         | 末尾下一步             |
| -------------------------- | ------------------------------------------- | ------------------------------------------------ | ---------------------- |
| Hub / 教程首页             | `Start Here` / `从这里开始`                 | 用户目标、第一篇应读页面、验证标准。             | 学习路径和相关专题。   |
| FAQ                        | `Short Answer` / `短答案`                   | 40-80 字直接回答，小表格，什么时候不用。         | 链到深度页和官方来源。 |
| Pricing / Limits / Upgrade | `Recommendation` / `推荐表`                 | 用户情况、推荐方案、价格/限制/命令信号、注意点。 | 选型检查清单。         |
| Install / How-to           | `Fast Path` / `快速路径`                    | 环境要求、推荐方式、命令、验证、失败分支。       | 下一篇教程。           |
| Troubleshooting            | `Quick Diagnosis` / `快速诊断`              | 症状、可能原因、检查命令、修复动作、验证方式。   | 相关错误页。           |
| Configuration              | `Choose What To Configure` / `先选配置目标` | 配置目标、文件/命令、风险、验证。                | 安全和排障链接。       |
| Directory / MCP            | `Choose by Use Case` / `按场景选择`         | 场景、推荐工具、scope、权限风险。                | 安装和安全检查。       |
| Mechanics                  | `When To Use It` / `什么时候用`             | 适合、不适合、操作方式、限制。                   | 实战 workflow。        |

### 3. 主表格规则

决策型页面必须有一张 5 到 7 行的主表。列名根据页面类型调整，但必须覆盖：

| 信息             | 作用                                           |
| ---------------- | ---------------------------------------------- |
| 用户情况或症状   | 让用户快速自我定位。                           |
| 推荐选择或下一步 | 给明确判断。                                   |
| 事实信号         | 价格、命令、限制、文件、账号路径等可验证信息。 |
| 判断理由         | 解释为什么这样选。                             |
| 注意点           | 提前拦住误解。                                 |

表格过长时拆成第二张表，不要让首屏变成不可扫读的数据库。

### 4. 事实等级必须写清楚

涉及价格、模型名、安装命令、限制、版本、官方功能时，只按下面四级写：

- 已验证事实：来自官方 pricing、docs、support、release notes。
- 基于现有信息的判断：例如“多数个人开发者先从 Pro 开始”。
- 需要用户自查：税费、地区可用性、账号 reset 时间、组织策略、云厂商价格。
- 不能确定：没有官方来源或当前无法验证时，不写成事实。

竞品页面可以作为结构参考，不能作为最终事实来源。

### 5. 双语页面必须保持同构

英文和中文页面不要求逐字翻译，但必须保持：

- 相同的推荐结论。
- 相同的表格结构。
- 相同的官方来源。
- 相同的下一步链接。
- 中文页可以更直接，但不能删掉事实边界。

### 6. 内链标准

每个高意图页至少包含 3 个相关内链：

| 当前页      | 必须链接到                                                        |
| ----------- | ----------------------------------------------------------------- |
| pricing     | how much FAQ、usage limits、rate limit、context management、MCP。 |
| install     | basic usage、troubleshooting install、authentication、pricing。   |
| basic usage | CLAUDE.md、Plan Mode、context management、troubleshooting。       |
| limits      | pricing、rate limit、invalid API key、context management。        |
| MCP         | install、permissions、security、troubleshooting。                 |
| FAQ         | 对应深度页和官方来源。                                            |

### 7. 页面更新检查清单

每次改页面先检查：

1. 用户搜索这个页面时，最想立刻知道什么？
2. 首屏有没有明确答案？
3. 有没有表格或步骤能扫读？
4. 事实是否来自官方或当前可验证来源？
5. 是否写清楚“不要选它”的场景？
6. 有没有下一步内链？
7. `Last checked` 是否需要更新？
8. 中文页是否同步了同一结论？

## 已应用范围

本次已把标准落到以下高价值入口：

| 页面                                                                                      | 处理方式                                                                |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `content/pages/pricing*.mdx`                                                              | 已改为方案推荐表优先，并保留价格/限制/成本控制。                        |
| `content/docs/index*.mdx`                                                                 | 教程首页增加 Start Here 决策表。                                        |
| `content/docs/getting-started/installation*.mdx`                                          | 重写为官方安装路径、认证路径、验证命令和失败分支。                      |
| `content/docs/getting-started/basic-usage*.mdx`                                           | 增加首屏 Quick Answer 和任务类型表。                                    |
| `content/pages/faqs/how-much-is-claude-code*.mdx`                                         | 调整为 FAQ 快答 + 深度页分流。                                          |
| `content/pages/faqs/claude-code-usage-limits*.mdx`                                        | 增加用量限制分类、价格页和上下文页分流。                                |
| `content/pages/faqs/claude-update-vs-npm-install*.mdx`                                    | 补 release notes、doctor、安装渠道判断。                                |
| `content/pages/troubleshooting/claude-code-rate-limit-error*`                             | 增加限流、5-hour limit、ccusage、auto-compact 表。                      |
| `content/pages/troubleshooting/claude-code-unable-to-connect*`                            | 增加连接失败、500、认证失败、gateway 分层排查。                         |
| `content/pages/mechanics/context-management*.mdx`                                         | 补 context window size 和 auto-compact 搜索承接。                       |
| `content/pages/mechanics/plan-mode*.mdx`                                                  | 补 planner、plan mode、auto mode 区分并校正事实。                       |
| `content/pages/mechanics/hooks*.mdx`                                                      | 补 hooks documentation 搜索入口。                                       |
| `content/pages/mcp*.mdx`                                                                  | 增加 MCP 高频搜索路由表。                                               |
| `content/docs/configuration/tools-allowlist*.mdx`                                         | 补 dangerously-skip-permissions 安全判断。                              |
| `content/pages/troubleshooting/claude-code-opus-4-8*`                                     | 补 Opus/Sonnet 选型判断。                                               |
| `content/docs/advanced/headless-mode*.mdx`                                                | 补 Claude Code review 只读自动化承接。                                  |
| `content/pages/mechanics/statusline*.mdx`                                                 | 新建 statusline 搜索承接页，包含字段、配置、安全边界。                  |
| `content/pages/mechanics/sessions*.mdx`                                                   | 新建 sessions 搜索承接页，区分 resume、compact、clear 和命名。          |
| `content/pages/mechanics/remote-control*.mdx`                                             | 新建 remote control 搜索承接页，区分本地远控和 Claude Code on the web。 |
| `content/docs/configuration/ide-account-check*.mdx`                                       | 新建 VS Code/IDE 账号检查页，承接账号、计费、OpenSCAD 普通项目流。      |
| `content/pages/mcp/playwright-mcp*.mdx`                                                   | 补 “does Claude Code take pictures” 截图能力边界。                      |
| `content/pages/resources*.mdx`、`content/pages/mechanics*.mdx`、`content/docs/index*.mdx` | 增加新页面入口，避免孤岛页。                                            |

## 下一批应继续套用的页面

不建议一次性机械改完 144 个 MDX 页面。下一批按搜索/转化价值处理：

1. `content/pages/mcp/github-mcp*.mdx`、Context7 深化页
2. `content/pages/troubleshooting*.mdx` 中没有 symptom table 的页面
3. 继续观察 `claui`、非 Claude Code 专属泛词；没有明确意图前不建薄页
4. 后续价格页更新必须继续先查官方来源，尤其是 Education、trial、usage credits 和订阅权益

详细任务拆解见 `docs/semrush-keyword-optimization-tasklist.md`。

## 参考来源

- https://claudelog.com/
- https://claudelog.com/claude-code-pricing/
- https://claudelog.com/install-claude-code/
- https://claudelog.com/claude-code-tutorial/
- https://claudelog.com/configuration/
- https://claudelog.com/claude-code-mcps/
- https://claudelog.com/mechanics/plan-mode/
- https://claudelog.com/troubleshooting/
- https://claudelog.com/claude-code-limits/
- https://code.claude.com/docs/en/setup
- https://platform.claude.com/docs/en/about-claude/pricing
- https://claude.com/pricing
