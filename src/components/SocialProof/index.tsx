'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

export function SocialProof() {
  const { t, currentLocale } = useLocale()

  const stats = [
    {
      value: '10k+',
      label: currentLocale === 'zh' ? '活跃开发者' : 'Active Developers',
      icon: 'icon-[lucide--users]',
      color: 'text-blue-600',
    },
    {
      value: '50k+',
      label: currentLocale === 'zh' ? '代码生成' : 'Code Generations',
      icon: 'icon-[lucide--code]',
      color: 'text-green-600',
    },
    {
      value: '95%',
      label: currentLocale === 'zh' ? '满意度' : 'Satisfaction Rate',
      icon: 'icon-[lucide--heart]',
      color: 'text-red-500',
    },
    {
      value: '24/7',
      label: currentLocale === 'zh' ? '可用性' : 'Availability',
      icon: 'icon-[lucide--clock]',
      color: 'text-purple-600',
    },
  ]

  const testimonials = [
    {
      name: 'Alex Chen',
      role: currentLocale === 'zh' ? '全栈开发工程师' : 'Full Stack Developer',
      company: 'Tech Startup',
      content: currentLocale === 'zh' 
        ? 'Claude Code 让我的开发效率提升了 3 倍，代码质量也明显改善了。'
        : 'Claude Code increased my development efficiency by 3x and significantly improved code quality.',
      avatar: '👨‍💻',
    },
    {
      name: 'Sarah Kim',
      role: currentLocale === 'zh' ? '产品经理' : 'Product Manager',
      company: 'Enterprise Corp',
      content: currentLocale === 'zh'
        ? '团队使用 Claude Code 后，项目交付速度提升了 40%。'
        : 'Our team delivery speed improved by 40% after adopting Claude Code.',
      avatar: '👩‍💼',
    },
    {
      name: 'David Rodriguez',
      role: currentLocale === 'zh' ? '技术架构师' : 'Tech Architect',
      company: 'Scale Inc',
      content: currentLocale === 'zh'
        ? '最好的 AI 编程助手，特别适合复杂项目的架构设计。'
        : 'The best AI programming assistant, especially for complex architecture design.',
      avatar: '👨‍🎓',
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent mb-4">
            {currentLocale === 'zh' ? '数万开发者的共同选择' : 'Trusted by Thousands of Developers'}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            {currentLocale === 'zh' 
              ? '加入全球开发者社区，体验 AI 驱动的编程革命'
              : 'Join the global developer community and experience the AI-powered programming revolution'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={cn(
                'inline-flex items-center justify-center w-16 h-16 rounded-full',
                'bg-gradient-to-br from-white to-neutral-100',
                'dark:from-neutral-800 dark:to-neutral-700',
                'shadow-lg mb-4'
              )}>
                <span className={cn(stat.icon, stat.color, 'text-2xl')} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            {currentLocale === 'zh' ? '开发者怎么说' : 'What Developers Say'}
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'p-6 rounded-2xl',
                'bg-white dark:bg-neutral-800',
                'border border-neutral-200 dark:border-neutral-700',
                'shadow-lg hover:shadow-xl',
                'transition-all duration-300',
                'hover:scale-105'
              )}
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 italic">
                "{testimonial.content}"
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="icon-[lucide--star] text-sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="icon-[simple-icons--anthropic] text-[#FF6B35] text-lg"></span>
              {currentLocale === 'zh' ? 'Anthropic 官方支持' : 'Official Anthropic Support'}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="icon-[lucide--github] text-lg"></span>
              {currentLocale === 'zh' ? '开源社区' : 'Open Source Community'}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="icon-[lucide--shield-check] text-green-500 text-lg"></span>
              {currentLocale === 'zh' ? '企业级安全' : 'Enterprise Security'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}