'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

export function ResourceCards() {
  const { t, currentLocale } = useLocale()

  const resourceList = [
    {
      title: currentLocale === 'zh' ? 'Claude Code 最佳实践' : 'Claude Code Best Practices',
      description: currentLocale === 'zh'
        ? '学习如何有效使用 Claude Code 进行智能体编程的完整指南，包括设置、工作流程和优化技巧。'
        : 'A comprehensive guide to effectively using Claude Code for agentic programming, including setup, workflows, and optimization tips.',
      link: `/${currentLocale}/tutorial`,
      icon: <span className="icon-[material-symbols--school]"></span>,
      badge: currentLocale === 'zh' ? '推荐' : 'Recommended',
    },
    {
      title: currentLocale === 'zh' ? '官方文档' : 'Official Documentation',
      description: currentLocale === 'zh'
        ? 'Claude Code 官方英文文档，包含最新的功能介绍和API参考。'
        : 'Official Claude Code documentation with the latest feature introductions and API references.',
      link: 'https://docs.anthropic.com/en/docs/claude-code',
      icon: <span className="icon-[material-symbols--description]"></span>,
      badge: currentLocale === 'zh' ? '官方资源' : 'Official',
    },
    {
      title: currentLocale === 'zh' ? 'GitHub 仓库' : 'GitHub Repository',
      description: currentLocale === 'zh'
        ? '提交问题、查看文档和参与社区讨论。'
        : 'Submit issues, view documentation, and participate in community discussions.',
      link: 'https://github.com/anthropics/claude-code',
      icon: <span className="icon-[mingcute--github-line]"></span>,
      badge: currentLocale === 'zh' ? '社区资源' : 'Community',
    },
    {
      title: currentLocale === 'zh' ? 'YouTube 视频' : 'YouTube Videos',
      description: currentLocale === 'zh'
        ? '观看 Claude Code 相关的教程、演示和技术分享视频。'
        : 'Watch Claude Code related tutorials, demos, and technical sharing videos.',
      link: 'https://www.youtube.com/results?search_query=claude+code',
      icon: <span className="icon-[mingcute--youtube-line]"></span>,
      badge: currentLocale === 'zh' ? '视频资源' : 'Videos',
    },
  ]

  const getBadgeStyle = (badge: string) => {
    const styles = {
      Recommended: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      推荐: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      Official: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      官方资源: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      Community: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      社区资源: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      Videos: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      视频资源: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    }
    return styles[badge as keyof typeof styles] || 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
      {resourceList.map((item, index) => {
        const isExternal = item.link.startsWith('http')
        const CardComponent = isExternal ? 'a' : Link
        const cardProps = isExternal
          ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
          : { href: item.link }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <CardComponent
              {...cardProps}
              className={cn(
                'block p-6 rounded-2xl',
                'bg-white dark:bg-neutral-900',
                'border border-neutral-200 dark:border-neutral-800',
                'shadow-sm hover:shadow-xl',
                'transition-all duration-300 ease-out',
                'hover:scale-105 hover:-translate-y-2',
                'hover:border-blue-200 dark:hover:border-blue-800',
                'cursor-pointer',
                'relative overflow-hidden',
                'h-full flex flex-col min-h-[280px]',
              )}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      'bg-gradient-to-br from-neutral-100 to-neutral-200',
                      'dark:from-neutral-800 dark:to-neutral-700',
                      'group-hover:scale-110 transition-transform duration-300',
                    )}
                    >
                      <span className={cn(item.icon.props.className, 'text-xl text-neutral-600 dark:text-neutral-400')} />
                    </div>
                  </div>
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    'shadow-sm',
                    getBadgeStyle(item.badge),
                  )}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 flex-grow">
                  {item.description}
                </p>

                {/* Action */}
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mt-auto">
                  <span>{currentLocale === 'zh' ? '查看详情' : 'Learn More'}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                    {isExternal
                      ? (
                          <span className="icon-[lucide--external-link] w-4 h-4" />
                        )
                      : (
                          <span className="icon-[lucide--arrow-right] w-4 h-4" />
                        )}
                  </span>
                </div>
              </div>
            </CardComponent>
          </motion.div>
        )
      })}
    </div>
  )
}
