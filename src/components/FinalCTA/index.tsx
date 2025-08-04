'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

export function FinalCTA() {
  const { currentLocale } = useLocale()

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/30" />
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200/30 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge - 更具吸引力的标语 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100/90 via-purple-100/90 to-blue-100/90 dark:from-blue-900/60 dark:via-purple-900/60 dark:to-blue-900/60 backdrop-blur-sm border border-blue-200/60 dark:border-blue-700/60 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-6 shadow-sm">
            <span className="icon-[lucide--sparkles] text-blue-600 dark:text-blue-400 animate-pulse"></span>
            {currentLocale === 'zh' ? '🚀 限时免费！立即体验 AI 编程革命' : '🚀 Free Limited Time! Experience AI Programming Revolution'}
          </div>

          {/* Headline - 更强的紧迫感和价值主张 */}
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
            {currentLocale === 'zh'
              ? (
                  <>
                    不要错过！让 Claude Code
                    {' '}
                    <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      3倍提升
                    </span>
                    {' '}
                    你的编程效率
                  </>
                )
              : (
                  <>
                    Don't Miss Out! Let Claude Code
                    {' '}
                    <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      3x Boost
                    </span>
                    {' '}
                    Your Programming Efficiency
                  </>
                )}
          </h2>

          {/* Description - 更具体的价值点和紧迫感 */}
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {currentLocale === 'zh'
              ? (
                  <>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">已有 50,000+ 开发者选择 ClaudeCode</span>
                    ，平均节省 60% 开发时间，代码质量提升 40%。
                    <br className="hidden sm:block" />
                    现在开始学习，
                    <span className="font-semibold text-blue-600 dark:text-blue-400">5分钟上手 AI 编程</span>
                    ，让人工智能成为你最强的编程伙伴！
                  </>
                )
              : (
                  <>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-200">Over 50,000+ developers have chosen ClaudeCode</span>
                    , saving 60% development time on average and improving code quality by 40%.
                    <br className="hidden sm:block" />
                    Start learning now,
                    <span className="font-semibold text-blue-600 dark:text-blue-400">master AI programming in 5 minutes</span>
                    , and make artificial intelligence your strongest coding partner!
                  </>
                )}
          </p>

          {/* CTA Buttons - 优化转化率 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className={cn(
                'font-bold group px-8 py-4 text-lg relative overflow-hidden',
                'bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600',
                'hover:from-blue-700 hover:via-blue-800 hover:to-purple-700',
                'text-white shadow-xl hover:shadow-2xl',
                'transition-all duration-500 transform hover:scale-110',
                'border-2 border-blue-500/50 hover:border-blue-400/70',
                'animate-pulse hover:animate-none',
              )}
            >
              <Link href={`/${currentLocale}/tutorial`} className="relative z-10">
                <span className="icon-[lucide--zap] mr-3 text-yellow-300 animate-bounce"></span>
                {currentLocale === 'zh' ? '立即免费掌握 AI 编程 (限时特惠)' : 'Master AI Programming Free Now (Limited Offer)'}
                <span className="ml-3 group-hover:translate-x-2 transition-transform duration-500 icon-[lucide--arrow-right] text-yellow-300"></span>
                
                {/* 闪光效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                'font-semibold group px-6 py-4 text-base',
                'border-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300',
                'hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-400 dark:hover:border-blue-500',
                'transition-all duration-300 hover:scale-105',
                'shadow-md hover:shadow-lg',
              )}
            >
              <Link
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-[simple-icons--anthropic] mr-2 text-[#FF6B35]"></span>
                {currentLocale === 'zh' ? '体验 Claude Code 官方版' : 'Try Claude Code Official'}
                <span className="ml-2 icon-[lucide--external-link] w-4 h-4 group-hover:rotate-12 transition-transform duration-300"></span>
              </Link>
            </Button>
          </div>

          {/* Trust indicators - 增强信任感 */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <span className="icon-[lucide--shield-check] text-green-600 dark:text-green-400"></span>
              <span className="font-medium text-green-700 dark:text-green-300">
                {currentLocale === 'zh' ? '✅ 完全免费使用' : '✅ Completely Free'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
              <span className="icon-[lucide--zap] text-blue-600 dark:text-blue-400"></span>
              <span className="font-medium text-blue-700 dark:text-blue-300">
                {currentLocale === 'zh' ? '⚡ 5分钟即可上手' : '⚡ 5-Min Quick Start'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
              <span className="icon-[lucide--users] text-purple-600 dark:text-purple-400"></span>
              <span className="font-medium text-purple-700 dark:text-purple-300">
                {currentLocale === 'zh' ? '🔥 50,000+ 开发者选择' : '🔥 50,000+ Developers'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
              <span className="icon-[simple-icons--anthropic] text-[#FF6B35]"></span>
              <span className="font-medium text-orange-700 dark:text-orange-300">
                {currentLocale === 'zh' ? '🏆 Anthropic 官方认证' : '🏆 Anthropic Official'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
