# SEMrush 关键词内容优化任务清单

核查日期：2026-07-08

来源：用户提供的 SEMrush 截图。本文只把截图里的关键词当作需求信号，不把第三方页面或竞品内容当事实来源。涉及价格、命令、限制、版本、权限和产品行为时，以官方文档和当前项目页面为准。

## 排序原则

1. **转化价值优先于搜索量：** 价格、安装、CLI、用量、错误排查优先，因为这些页面直接影响用户是否继续使用。
2. **问题明确优先于泛词：** `unable to connect to Anthropic services`、`approaching 5-hour limit` 比 `Claude` 泛词更值得先做。
3. **页面匹配优先于关键词堆砌：** 关键词必须落到能回答它的页面，不能硬塞到价格页或教程首页。
4. **可验证事实优先：** 官方文档能验证的命令、权限、MCP 行为、安装方式优先写；不能验证的只写成提醒用户自查。
5. **双语同构：** 英文和中文页面保持相同结论、相同表格结构、相同内链方向。

## P0：已完成或本批必须完成

| 优先级 | 关键词簇                                                                                                                                                                                 | 目标页面                                                                                                                                                                 | 当前状态                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| P0     | `claude code pricing`、`claude price`、`how much does claude cost`、`claude code价格`、`claude pro`、`claude max`、`claude max plan`                                                     | `content/pages/pricing*.mdx`、`content/pages/faqs/how-much-is-claude-code*.mdx`                                                                                          | 已完成：首屏推荐表、价格/用量分流、FAQ 快答。                 |
| P0     | `claude code cli`、`claude code cli documentation`、`node js for claude code`                                                                                                            | `content/docs/getting-started/installation*.mdx`、`content/docs/getting-started/basic-usage*.mdx`                                                                        | 已完成：安装路径、验证命令、基础使用路径。                    |
| P0     | `approaching 5-hour limit`、`ccusage`、`context left until auto-compact`、`claude upload limit`、`claude code context window size`                                                       | `content/pages/faqs/claude-code-usage-limits*.mdx`、`content/pages/troubleshooting/claude-code-rate-limit-error*.mdx`、`content/pages/mechanics/context-management*.mdx` | 已完成：限制分类、上下文和账号额度分离、内链补强。            |
| P0     | `unable to connect to anthropic services`、`can't reach claude error`、`claude code api error: 500`、`authorization failed internal server error claude`、`claude internal server error` | `content/pages/troubleshooting/claude-code-unable-to-connect-to-api*.mdx`                                                                                                | 已完成：错误按网络、认证、provider、gateway 分层。            |
| P0     | `claude update`、`claude code release notes`、`claude doctor command`                                                                                                                    | `content/pages/faqs/claude-update-vs-npm-install*.mdx`、`content/pages/upgrade*.mdx`                                                                                     | 已完成：更新前后检查、release notes 意图、doctor 检查。       |
| P0     | `context7`、`context7 mcp`、`claude mcp list command`、`browser mcp`、`posthog mcp claude code`、`claude_desktop_config.json`                                                            | `content/pages/mcp*.mdx`、`content/pages/mcp/context7-mcp*.mdx`、`content/pages/mcp/playwright-mcp*.mdx`                                                                 | 已完成：MCP 目录增加高频搜索路由表；Context7 页已有基础承接。 |
| P0     | `claude planner`、`claude code plan mode`、`claude automode`、`auto mode`、`claude code hooks documentation`                                                                             | `content/pages/mechanics/plan-mode*.mdx`、`content/pages/mechanics/hooks*.mdx`                                                                                           | 已完成：Plan Mode/auto mode 区分；Hooks 页补搜索入口。        |

## P1：已落地或明确处理

| 优先级 | 关键词簇                                                                                             | 目标页面                                                                          | 当前状态                                                                                                   |
| ------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| P1     | `claude --dangerously-skip-permissions`                                                              | `content/docs/configuration/tools-allowlist*.mdx`                                 | 已完成：补“什么时候不要跳过权限”决策表。                                                                   |
| P1     | `opus vs sonnet`、`claude opus vs sonnet`、`sonnet vs opus`、`claude opus 4.7`                       | `content/pages/troubleshooting/claude-code-opus-4-8-slow-or-expensive*.mdx`       | 已完成：补 Opus/Sonnet 选型判断，不追未经核实的模型传闻。                                                  |
| P1     | `claude code review`                                                                                 | `content/docs/advanced/headless-mode*.mdx`                                        | 已完成：补只读 review 自动化 prompt、工具边界和风险控制。                                                  |
| P1     | `statusline claude code`、`claude code sessions`、`claude code remote`、`claude code remote control` | `content/pages/mechanics/statusline*.mdx`、`sessions*.mdx`、`remote-control*.mdx` | 已完成：新建独立机制页，并从 mechanics hub、resources 建入口。                                             |
| P1     | `check claude code vscode account`、`how to use vs code openscad claude`                             | `content/docs/configuration/ide-account-check*.mdx`                               | 已完成：用账号/计费路径检查承接 VS Code 搜索意图；OpenSCAD 只作为普通 IDE 项目工作流处理，不伪造专门能力。 |
| P1     | `does claude code take pictures`、`browser mcp`                                                      | `content/pages/mcp/playwright-mcp*.mdx`                                           | 已完成：补截图能力边界，明确浏览器截图、图片输入、3D/CAD 渲染验证不是同一件事。                            |

## P2：低优先级或需要额外验证

| 优先级 | 关键词簇                                  | 判断                                                                                                                          |
| ------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| P2     | `claude student discount`、`claude trial` | 已补到 `content/pages/pricing*.mdx` FAQ：官方有 Education plan 和 Free plan，但没有写成个人自助学生折扣或 Claude Code trial。 |
| P2     | `claui`                                   | 暂不承接：意图不清，且不是本站当前 Claude Code 主题的高确定性词。继续观察 GSC/SEMrush 后再决定。                              |
| P2     | 非 Claude Code 专属泛词                   | 只在能服务本站主题时接入，不为了流量破坏定位。                                                                                |

## 页面写作检查清单

每个页面改完必须检查：

1. 首屏是否直接回答该关键词背后的问题。
2. 是否有表格或步骤能让用户 10 秒内定位自己。
3. 是否区分已验证事实、判断、需要用户自查的部分。
4. 是否至少补 3 个相关内链。
5. 是否更新英文和中文同构页面。
6. 是否避免把多个不相关关键词塞进同一段。
7. 是否保留官方来源或明确说明需要自查。
8. 是否能通过格式检查和构建。
