export default {
  systemTitle: 'ClaudeCode101',
  banner: {
    title: '👋 欢迎来到 Claude Code 中文教程!',
    more: '了解详情',
  },

  badgeTitle: '智能编程助手 🤖',
  featureSupport: `🔥 现在支持 {{feature}}！`,
  bestPracticeGuide: 'ClaudeCode 最佳实践指南',
  lastUpdated: '最后更新于:',

  getStarted: '开始学习',
  techStack: '技术栈',
  resourceCenter: '📚 资料中心',
  resourceCenterDesc: '这里汇集了各类资源，包括使用指南、官方文档和社区资源。',
  faqTitle: '常见问题',

  themeSwitcher: {
    light: '浅色模式',
    dark: '深色模式',
    lightAria: '切换到浅色模式',
    darkAria: '切换到深色模式',
  },

  faqs: [
    {
      question: '什么是 ClaudeCode？',
      answer: 'ClaudeCode（Claude Code）是 Anthropic 开发的智能编程命令行工具，为开发者提供AI驱动的编程协助。通过 Claude Code 教程，您可以学习支持多种编程语言和工作流程的智能编程技巧。',
    },
    {
      question: '如何安装和配置 ClaudeCode？',
      answer: '您可以通过 Claude Code 教程和官方文档获取最新的 ClaudeCode 安装方法，通常包括设置API密钥、配置环境变量，以及创建CLAUDE.md配置文件。建议先注册 Anthropic 账户，获取 API 密钥后进行配置。',
    },
    {
      question: 'ClaudeCode 支持哪些编程语言？',
      answer: 'ClaudeCode（Claude Code）支持几乎所有主流编程语言，包括 Python、JavaScript、TypeScript、Java、Go、Rust、C++、C#、PHP、Ruby、Swift、Kotlin 等。通过 Claude Code 教程，您可以学习如何在不同语言项目中使用智能编程功能。',
    },
    {
      question: 'ClaudeCode 是免费的吗？使用成本如何？',
      answer: 'ClaudeCode 工具本身免费使用，但需要 Claude API 调用费用。Anthropic 提供按使用量计费的灵活定价模式，新用户通常有免费额度。建议查看官方定价页面了解最新费用详情。',
    },
    {
      question: '如何优化 ClaudeCode 的使用效果？',
      answer: '通过 Claude Code 教程学习最佳实践：1) 创建详细的CLAUDE.md配置文件；2) 使用具体明确的指令；3) 合理管理上下文窗口；4) 结合测试驱动开发；5) 定期更新配置。这些 ClaudeCode 优化技巧能显著提升使用效果。',
    },
    {
      question: 'ClaudeCode 是否支持团队协作？',
      answer: '是的，ClaudeCode（Claude Code）支持团队协作。通过 Claude Code 教程学习如何：1) 共享CLAUDE.md配置文件；2) 使用git工作流程；3) 配置项目级别的设置；4) 建立团队编码规范；5) 统一开发环境来提升团队开发效率。',
    },
    {
      question: 'ClaudeCode 与其他 AI 编程工具有什么区别？',
      answer: 'ClaudeCode 的独特优势包括：1) 强大的上下文理解能力；2) 支持复杂的多文件编辑；3) 出色的代码重构功能；4) 智能的项目架构分析；5) 原生的命令行体验。与 GitHub Copilot、Cursor 等工具相比，ClaudeCode 在理解项目整体架构方面表现更佳。',
    },
    {
      question: 'ClaudeCode 的安全性如何？会泄露代码吗？',
      answer: 'Anthropic 严格遵循数据安全和隐私保护原则。ClaudeCode 不会存储或泄露您的代码。所有API调用都经过加密传输，且 Anthropic 承诺不会使用用户数据来训练模型。建议查看官方隐私政策了解详细信息。',
    },
    {
      question: '如何处理 ClaudeCode 的错误或意外行为？',
      answer: '当遇到错误时：1) 检查 CLAUDE.md 配置是否正确；2) 确认 API 密钥有效性；3) 查看错误日志获取详细信息；4) 尝试重新启动 Claude Code；5) 如问题持续，可在 GitHub Issues 中反馈或查看 Claude Code 教程的故障排除部分。',
    },
    {
      question: 'ClaudeCode 能处理大型项目吗？',
      answer: '是的，ClaudeCode 专门优化了大型项目的处理能力。通过智能的上下文管理、文件索引和增量分析，Claude Code 能够高效处理包含数千个文件的大型代码库。建议通过 Claude Code 教程学习大型项目的最佳实践配置。',
    },
    {
      question: '如何在 CI/CD 流水线中集成 ClaudeCode？',
      answer: 'ClaudeCode 支持 CI/CD 集成，可用于自动化代码审查、测试生成和质量检查。通过 Claude Code 教程学习如何配置 GitHub Actions、Jenkins 或其他 CI/CD 工具，实现智能化的开发流程自动化。',
    },
    {
      question: 'ClaudeCode 支持哪些开发环境和编辑器？',
      answer: 'ClaudeCode 作为命令行工具，可在任何支持终端的环境中使用，包括 VS Code、IntelliJ IDEA、Vim、Emacs 等。它还提供了与主流IDE的集成插件，让您在熟悉的开发环境中享受 AI 编程协助。',
    },
    {
      question: '如何学习 ClaudeCode 的高级功能？',
      answer: '建议按以下路径学习：1) 从基础安装配置开始；2) 掌握常用命令和工作流程；3) 学习 CLAUDE.md 高级配置；4) 探索代码重构和架构分析功能；5) 实践团队协作和 CI/CD 集成。本教程提供了完整的学习路径。',
    },
    {
      question: 'ClaudeCode 的更新频率如何？如何获取最新功能？',
      answer: 'Anthropic 定期更新 ClaudeCode，通常每月发布新功能和改进。建议：1) 关注官方 GitHub 仓库的 Release 页面；2) 订阅官方博客和邮件通知；3) 定期运行更新命令；4) 查看本教程的更新日志了解最新功能介绍。',
    },
    {
      question: '在哪里可以获得更多 ClaudeCode 帮助和支持？',
      answer: '获取帮助的渠道包括：1) Claude Code 官方文档和本教程网站；2) GitHub 仓库的 Issues 和 Discussions 区域；3) Anthropic 官方支持渠道；4) 开发者社区和论坛；5) YouTube 上的教程视频。我们建议优先查看官方文档和本教程内容。',
    },
    {
      question: '🤖 为什么选择 ClaudeCode？',
      answer: 'ClaudeCode（Claude Code）提供智能且上下文感知的编程协助，能够理解您的代码库全貌，提供精准建议。与其他工具相比，Claude Code 在项目理解、代码重构、架构设计方面表现卓越。通过 Claude Code 教程学习，您可以掌握从规划到部署的完整开发流程，让 AI 真正成为您的编程伙伴！',
    },
  ],

}
