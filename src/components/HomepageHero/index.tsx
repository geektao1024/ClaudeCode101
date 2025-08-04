'use client'
import { FinalCTA } from '@/components/FinalCTA'
import { OptimizedParticles } from '@/components/OptimizedParticles'
import { ResourceCards } from '@/components/ResourceCards'
import { SocialProof } from '@/components/SocialProof'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'
import { Section } from './Section'
import { SetupHero } from './Setup'

export const StackItem = ({
  className,
}: {
  className: string
},
) => {
  return (
    <div className={cn(
      'mx-6 size-[50px]',
      'text-neutral-800 dark:text-neutral-100',
      'transition-all duration-300 transform opacity-75',
      'hover:scale-125 hover:opacity-100',
      className,
    )}
    >
    </div>
  )
}

export default function HomepageHero() {
  const { t, currentLocale } = useLocale()

  const faqs = t('faqs')

  return (
    <>
      <OptimizedParticles />
      <SetupHero />
      {/* <div className="relative top-[-18px] mb-[-10px] flex justify-center py-[0px] z-2">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[150px] h-[40px] flex flex-col items-center gap-[20px]"
        >
          <img
            className="dark:invert"
            src="/next.svg"
            style={{ width: '100%', height: 'auto' }}
          />
        </a>
      </div> */}
      {/* Resource Center Section - moved to second screen */}
      <Section
        title={t('resourceCenter')}
        description={t('resourceCenterDesc')}
      >
        <ResourceCards />
      </Section>

      {/* Social Proof Section */}
      <SocialProof />

      <div className="relative z-1">
        {/* Features Section - 优化关键词 */}
        <Section
          title={currentLocale === 'zh' ? 'Claude Code AI 编程助手核心功能特性' : 'Claude Code AI Programming Assistant Core Features'}
          description={currentLocale === 'zh' ? '通过 ClaudeCode 智能编程教程，掌握 AI 辅助编程和代码生成最佳实践，让人工智能成为你最专业的编程伙伴' : 'Master AI-assisted programming and code generation best practices through ClaudeCode intelligent programming tutorial, making artificial intelligence your most professional coding companion'}
          titleProps={{
            disabledAnimation: false,
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-4 text-2xl">
                <span className="icon-[lucide--brain]"></span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {currentLocale === 'zh' ? 'AI 智能代码生成与自动编程' : 'AI Intelligent Code Generation & Auto Programming'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? '通过 Claude Code 教程学习基于上下文的精准 AI 代码生成技术，支持 Python、JavaScript、TypeScript 等多种编程语言和主流开发框架' : 'Learn context-aware precise AI code generation technology through Claude Code tutorial, supporting Python, JavaScript, TypeScript and multiple programming languages with mainstream development frameworks'}
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4 text-2xl">
                <span className="icon-[lucide--search-check]"></span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {currentLocale === 'zh' ? '智能代码审查与性能优化' : 'Intelligent Code Review & Performance Optimization'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? 'Claude Code AI 编程助手教程指导你自动发现代码缺陷和安全漏洞，提供专业的代码优化建议和编程最佳实践，提升代码质量和开发效率' : 'Claude Code AI programming assistant tutorial guides you to automatically detect code defects and security vulnerabilities, providing professional code optimization suggestions and programming best practices to improve code quality and development efficiency'}
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 text-white mb-4 text-2xl">
                <span className="icon-[lucide--users]"></span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {currentLocale === 'zh' ? 'AI 驱动的团队协作与开发流程' : 'AI-Driven Team Collaboration & Development Workflow'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? 'ClaudeCode 智能编程教程指导你无缝集成 Git 工作流程，支持多人协作开发、自动化代码标准化和智能项目管理，提升团队开发效率和代码一致性' : 'ClaudeCode intelligent programming tutorial guides you to seamless Git workflow integration, supporting multi-user collaborative development, automated code standardization and intelligent project management to improve team development efficiency and code consistency'}
              </p>
            </div>
          </div>
        </Section>

        <Section
          title={t('faqTitle')}
          tallPaddingY
        >
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-5xl"
          >
            {
              faqs.map((faqItem, index) => (
                <AccordionItem
                  value={faqItem.question}
                  key={index}
                >
                  <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                  <AccordionContent>
                    {faqItem.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        </Section>
      </div>

      {/* Final CTA Section */}
      <FinalCTA />
    </>
  )
}
