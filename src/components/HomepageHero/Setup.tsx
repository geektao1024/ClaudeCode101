'use client'

import clsx from 'clsx'
import Link from 'next/link'
import styles from '@/components/HomepageHero/SetupHero.module.css'
import { MotionWrapperFlash } from '@/components/MotionWrapper/Flash'
import { Button } from '@/components/ui/button'
import { FlipWords } from '@/components/ui/flip-words'
import { LinkPreview } from '@/components/ui/link-preview'
import { useLocale } from '@/hooks'

interface Props {
}
export function SetupHero(props: Props) {
  const { t, currentLocale } = useLocale()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.badgeContainer}>
          <a
            className={styles.badge}
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('badgeTitle')}
          </a>
        </div>
        <h1 className={styles.headline}>
          <MotionWrapperFlash
            disabledAnimation={false}
            className="flex items-center gap-3"
          >
            <span className="icon-[simple-icons--anthropic] text-[#FF6B35]" aria-hidden="true"></span>
          </MotionWrapperFlash>
          {currentLocale === 'zh' ? (
            <>
              Claude Code
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                AI 编程助手教程中心
              </span>
            </>
          ) : (
            <>
              <span className="leading-tight">Claude Code</span>
              <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                AI Programming Assistant
              </span>
            </>
          )}
        </h1>

        <Link
          href={`/${currentLocale}/tutorial`}
          className={clsx([
            'bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 text-white shadow-lg',
            'dark:bg-linear-to-r dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 dark:text-white',
            'text-sm mt-2 inline-block px-3 py-1 rounded-lg',
            '[&>span]:font-bold',
            'animate-pulse',
            '[animation-duration:2s]',
          ])}
          dangerouslySetInnerHTML={{
            __html: t('featureSupport', {
              feature: `<span>${t('bestPracticeGuide')}</span>`,
            }),
          }}
        />


        {/* Value Proposition */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className={clsx([
            styles.subtitle,
            'text-neutral-600 dark:text-neutral-300 text-lg md:text-xl leading-relaxed',
          ])}
          >
            {currentLocale === 'zh' ? (
              <>
                让 AI 成为你的
                <FlipWords
                  words={[
                    '编程伙伴',
                    '代码审查师',
                    '架构顾问',
                    '调试专家',
                    '学习导师',
                    '效率助手',
                  ]}
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                />
                <br className="hidden sm:block" />
                掌握专业的 AI 辅助编程技能，
                <LinkPreview url="https://claude.ai/code" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">
                  Claude Code
                </LinkPreview>
                让编程更智能、更高效
              </>
            ) : (
              <>
                Make AI your
                <FlipWords
                  words={[
                    'coding partner',
                    'code reviewer', 
                    'architecture advisor',
                    'debugging expert',
                    'learning mentor',
                    'efficiency booster',
                  ]}
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                />
                <br className="hidden sm:block" />
                Master professional AI-assisted programming with
                <LinkPreview url="https://claude.ai/code" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">
                  Claude Code
                </LinkPreview>
              </>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <span className="icon-[lucide--shield-check] text-green-500"></span>
            {currentLocale === 'zh' ? '官方支持' : 'Official Support'}
          </div>
          <div className="flex items-center gap-1">
            <span className="icon-[lucide--zap] text-yellow-500"></span>
            {currentLocale === 'zh' ? '即刻开始' : 'Get Started Instantly'}
          </div>
          <div className="flex items-center gap-1">
            <span className="icon-[lucide--users] text-blue-500"></span>
            {currentLocale === 'zh' ? '活跃社区' : 'Active Community'}
          </div>
        </div>
        {/* Enhanced CTA Section */}
        <div className="flex justify-center pt-8">
          <div className="max-w-[600px] flex flex-col sm:flex-row gap-4 max-sm:w-full">
            <Button
              asChild
              size="lg"
              className="font-bold group max-sm:w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-base"
            >
              <Link href={`/${currentLocale}/tutorial`}>
                <span className="icon-[lucide--rocket] mr-2"></span>
                {currentLocale === 'zh' ? '开始学习 (5分钟上手)' : 'Start Learning (5 min setup)'}
                <span className="w-[20px] translate-x-[6px] transition-all group-hover:translate-x-[10px] icon-[mingcute--arrow-right-fill]"></span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-bold group max-sm:w-full border-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-base transition-all duration-300"
            >
              <Link
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon-[mingcute--github-line] mr-2"></span>
                {currentLocale === 'zh' ? '查看源码' : 'View on GitHub'}
                <span className="ml-1 icon-[lucide--external-link] w-4 h-4 transition-transform group-hover:translate-x-1"></span>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Quick Start Hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {currentLocale === 'zh' ? (
              <>💡 无需安装，打开终端输入 <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">claude</code> 即可开始</>
            ) : (
              <>💡 No installation required, just type <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">claude</code> in your terminal</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
