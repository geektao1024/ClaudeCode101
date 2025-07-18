'use client'
import Marquee from 'react-fast-marquee'
import { PanelParticles } from '@/components/PanelParticles'
import { ResourceCards } from '@/components/ResourceCards'
import { SocialProof } from '@/components/SocialProof'
import { FinalCTA } from '@/components/FinalCTA'
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
      <PanelParticles />
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
        {/* Features Section - replacing tech stack */}
        <Section
          title={currentLocale === 'zh' ? 'Claude Code 核心特性' : 'Core Features'}
          description={currentLocale === 'zh' ? '让 AI 成为你最得力的编程助手' : 'Make AI your most powerful programming companion'}
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
                {currentLocale === 'zh' ? '智能代码生成' : 'Intelligent Code Generation'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? '基于上下文的精准代码生成，支持多种编程语言和框架' : 'Context-aware precise code generation supporting multiple languages and frameworks'}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4 text-2xl">
                <span className="icon-[lucide--search-check]"></span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {currentLocale === 'zh' ? '代码审查与优化' : 'Code Review & Optimization'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? '自动发现潜在问题，提供优化建议和最佳实践指导' : 'Automatically detect issues and provide optimization suggestions with best practices'}
              </p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 text-white mb-4 text-2xl">
                <span className="icon-[lucide--users]"></span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                {currentLocale === 'zh' ? '团队协作' : 'Team Collaboration'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {currentLocale === 'zh' ? '无缝集成Git工作流，支持多人协作和代码标准化' : 'Seamless Git workflow integration with multi-user collaboration and code standardization'}
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
