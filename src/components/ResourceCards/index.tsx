'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

export function ResourceCards() {
  const { currentLocale } = useLocale()

  const resourceList = [
    {
      title: currentLocale === 'zh' ? '资源和工具总览' : 'Resources & Tools Hub',
      description: currentLocale === 'zh'
        ? '先进入资源页，再按工作流场景查看推荐工具、发布素材专题和高相关外部站点。'
        : 'Start with the resources hub to explore recommended tools, launch-asset guidance, and related external sites in one place.',
      link: `/${currentLocale}/resources`,
      icon: <span className="icon-[lucide--folder-kanban]"></span>,
      badge: currentLocale === 'zh' ? '汇聚入口' : 'Hub',
    },
    {
      title: currentLocale === 'zh' ? 'ClaudeCode 教程最佳实践' : 'ClaudeCode Tutorial Best Practices',
      description: currentLocale === 'zh'
        ? '学习如何有效使用 ClaudeCode 进行智能体编程的完整 Claude Code 教程指南，包括设置、工作流程和优化技巧。'
        : 'A comprehensive ClaudeCode tutorial guide to effectively using Claude Code for agentic programming, including setup, workflows, and optimization tips.',
      link: `/${currentLocale}/tutorial`,
      icon: <span className="icon-[material-symbols--school]"></span>,
      badge: currentLocale === 'zh' ? '推荐' : 'Recommended',
    },
    {
      title: currentLocale === 'zh' ? '官方文档' : 'Official Documentation',
      description: currentLocale === 'zh'
        ? 'ClaudeCode 官方英文文档，包含最新的 Claude Code 功能介绍和API参考。'
        : 'Official ClaudeCode documentation with the latest Claude Code feature introductions and API references.',
      link: 'https://docs.anthropic.com/en/docs/claude-code',
      icon: <span className="icon-[material-symbols--description]"></span>,
      badge: currentLocale === 'zh' ? '官方资源' : 'Official',
    },
    {
      title: currentLocale === 'zh' ? 'Musikalis AI 音乐生成器' : 'Musikalis AI Music Generator',
      description: currentLocale === 'zh'
        ? '当你用 Claude Code 做完官网、组件或产品 demo 后，可以用 Musikalis 快速生成适合视频、播客、游戏原型和社媒内容的免版税音乐。'
        : 'After building a site, component, or product demo with Claude Code, use Musikalis to quickly generate royalty-free music for videos, podcasts, game prototypes, and social content.',
      link: 'https://musikalis.com/',
      icon: <span className="icon-[lucide--music-4]"></span>,
      badge: currentLocale === 'zh' ? '创作者工具' : 'Creator Tool',
    },
    {
      title: 'Suno AI Musical',
      description: currentLocale === 'zh'
        ? '如果你更需要快速生成适合视频、播客和社媒短内容的版权友好音乐，Suno AI Musical 也是一个自然的第二选择。'
        : 'If you need fast copyright-friendly music for videos, podcasts, and short social content, Suno AI Musical is another practical option.',
      link: 'https://sunoaimusical.com/',
      icon: <span className="icon-[lucide--audio-lines]"></span>,
      badge: currentLocale === 'zh' ? '可选工具' : 'Alternative',
    },
  ]

  const getBadgeStyle = (badge: string) => {
    const styles = {
      Recommended: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      推荐: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      Hub: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
      汇聚入口: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
      Official: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      官方资源: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
      Community: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      社区资源: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      Videos: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      视频资源: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      'Creator Tool': 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white',
      创作者工具: 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white',
      Alternative: 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white',
      可选工具: 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white',
    }
    return styles[badge as keyof typeof styles] || 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
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
