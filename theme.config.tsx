import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { useLocale } from '@/hooks'

export default {
  logo: (
    <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
      <div className="relative group">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* 背景圆角矩形 */}
          <rect width="32" height="32" rx="8" fill="url(#gradient-bg)" />
          
          {/* CC字母设计 */}
          <g className="text-white">
            {/* 第一个C */}
            <path 
              d="M8 12C8 10.5 9.5 9 11 9C12.5 9 14 10.5 14 12V13H12V12C12 11.5 11.5 11 11 11C10.5 11 10 11.5 10 12V20C10 20.5 10.5 21 11 21C11.5 21 12 20.5 12 20V19H14V20C14 21.5 12.5 23 11 23C9.5 23 8 21.5 8 20V12Z" 
              fill="white"
            />
            
            {/* 第二个C */}
            <path 
              d="M18 12C18 10.5 19.5 9 21 9C22.5 9 24 10.5 24 12V13H22V12C22 11.5 21.5 11 21 11C20.5 11 20 11.5 20 12V20C20 20.5 20.5 21 21 21C21.5 21 22 20.5 22 20V19H24V20C24 21.5 22.5 23 21 23C19.5 23 18 21.5 18 20V12Z" 
              fill="white"
            />
          </g>
          
          {/* 编码符号装饰 */}
          <g className="opacity-60">
            <circle cx="6" cy="6" r="1" fill="white" />
            <circle cx="26" cy="6" r="1" fill="white" />
            <circle cx="6" cy="26" r="1" fill="white" />
            <circle cx="26" cy="26" r="1" fill="white" />
          </g>
          
          {/* 渐变定义 */}
          <defs>
            <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="50%" stopColor="#FF8A5B" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
          
          {/* 动态效果 */}
          <circle cx="28" cy="4" r="2" fill="url(#pulse-gradient)" className="animate-pulse">
            <animate attributeName="r" values="1;3;1" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
          </circle>
          
          <defs>
            <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* 背景光晕效果 */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#FF8A5B] blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
      </div>
      
      <div className="flex flex-col">
        <span className="font-bold text-lg bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-600 dark:from-white dark:via-neutral-100 dark:to-neutral-200 bg-clip-text text-transparent">
          Claude Code
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 -mt-1 font-medium">
          编程中心
        </span>
      </div>
    </div>
  ),
  project: {
    link: 'https://github.com/anthropics/claude-code',
    icon: (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200">
        <span className="icon-[mingcute--github-line] text-lg text-neutral-700 dark:text-neutral-300" />
        <span className="text-sm font-medium hidden sm:inline text-neutral-700 dark:text-neutral-300">GitHub</span>
      </div>
    )
  },
  chat: {
    link: 'https://claude.ai/code',
    icon: (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm">
        <span className="icon-[lucide--message-circle] text-lg text-white" />
        <span className="text-sm font-medium hidden sm:inline text-white">体验Claude Code</span>
      </div>
    )
  },
  docsRepositoryBase: 'https://github.com/anthropics/claude-code',
  footer: {
    text: (
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="icon-[simple-icons--anthropic] text-[#FF6B35]" />
          <span>Powered by Anthropic Claude</span>
        </div>
        <div className="text-xs text-neutral-500">
          © 2024 Claude Code 教程中心 - 让AI成为你最得力的编程助手
        </div>
      </div>
    )
  },
  toc: {
    extraContent: (
      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">
        <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-3 uppercase tracking-wide">
          快速链接
        </div>
        <div className="space-y-2">
          <a 
            href="https://claude.ai/code" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-2 py-1 rounded-md transition-colors duration-200"
          >
            <span className="icon-[lucide--external-link] text-xs" />
            Claude Code 官网
          </a>
          <a 
            href="https://docs.anthropic.com/en/docs/claude-code" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/30 px-2 py-1 rounded-md transition-colors duration-200"
          >
            <span className="icon-[lucide--book-open] text-xs" />
            官方文档
          </a>
          <a 
            href="https://github.com/anthropics/claude-code/discussions" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 px-2 py-1 rounded-md transition-colors duration-200"
          >
            <span className="icon-[lucide--message-square] text-xs" />
            社区讨论
          </a>
        </div>
      </div>
    )
  },
  editLink: {
    text: '在GitHub上编辑此页面'
  },
  feedback: {
    content: '有问题？点击反馈',
    labels: 'feedback'
  },
  search: {
    placeholder: '搜索 Claude Code 文档...',
    loading: '搜索中...',
    emptyResult: '没有找到相关内容',
    error: '搜索失败，请重试',
  },
  gitTimestamp: ({ timestamp }: { timestamp: Date }) => (
    <div className="text-xs text-neutral-500">
      最后更新于 {timestamp.toLocaleDateString('zh-CN')}
    </div>
  ),
  navigation: {
    prev: true,
    next: true
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'system'
  }
}