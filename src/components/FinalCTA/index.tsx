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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
            <span className="icon-[lucide--sparkles] text-blue-600 dark:text-blue-400"></span>
            {currentLocale === 'zh' ? '立即开始你的 AI 编程之旅' : 'Start Your AI Programming Journey'}
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
            {currentLocale === 'zh' ? (
              <>
                准备好让 AI <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  革命性改变
                </span>{' '}
                你的编程方式了吗？
              </>
            ) : (
              <>
                Ready to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  revolutionize
                </span>{' '}
                <br />
                your coding with AI?
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {currentLocale === 'zh' 
              ? '加入数万名开发者，体验前所未有的智能编程体验。5分钟快速上手，终身受益。'
              : 'Join thousands of developers experiencing unprecedented intelligent programming. Get started in 5 minutes, benefit for life.'
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "font-bold group px-6 py-3 text-base",
                "bg-blue-600 hover:bg-blue-700 text-white",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300 transform hover:scale-105"
              )}
            >
              <Link href={`/${currentLocale}/tutorial`}>
                <span className="icon-[lucide--rocket] mr-2"></span>
                {currentLocale === 'zh' ? '免费开始学习' : 'Start Learning Free'}
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 icon-[lucide--arrow-right]"></span>
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "font-bold group px-6 py-3 text-base",
                "border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                "transition-all duration-300"
              )}
            >
              <Link
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-[simple-icons--anthropic] mr-2"></span>
                {currentLocale === 'zh' ? '访问 Claude Code' : 'Visit Claude Code'}
                <span className="ml-2 icon-[lucide--external-link] w-4 h-4"></span>
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-neutral-600 dark:text-neutral-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="icon-[lucide--check-circle] text-green-600 dark:text-green-400"></span>
              {currentLocale === 'zh' ? '无需信用卡' : 'No Credit Card Required'}
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-[lucide--clock] text-blue-600 dark:text-blue-400"></span>
              {currentLocale === 'zh' ? '5分钟快速上手' : '5-Minute Quick Start'}
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-[lucide--users] text-purple-600 dark:text-purple-400"></span>
              {currentLocale === 'zh' ? '10,000+ 开发者信赖' : '10,000+ Developers Trust'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}