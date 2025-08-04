'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/hooks'
import { cn } from '@/lib/utils'

export function SocialProof() {
  const { t, currentLocale } = useLocale()

  const stats = [
    {
      value: '50k+',
      label: currentLocale === 'zh' ? '全球开发者' : 'Global Developers',
      icon: 'icon-[lucide--users]',
      color: 'text-blue-600',
      description: currentLocale === 'zh' ? '来自 180+ 个国家' : 'From 180+ Countries',
    },
    {
      value: '500k+',
      label: currentLocale === 'zh' ? '代码生成量' : 'Code Generations',
      icon: 'icon-[lucide--code]',
      color: 'text-green-600',
      description: currentLocale === 'zh' ? '每月处理请求' : 'Monthly Requests',
    },
    {
      value: '4.9/5',
      label: currentLocale === 'zh' ? '用户评分' : 'User Rating',
      icon: 'icon-[lucide--star]',
      color: 'text-yellow-500',
      description: currentLocale === 'zh' ? '基于 3,200+ 评价' : 'Based on 3,200+ Reviews',
    },
    {
      value: '60%',
      label: currentLocale === 'zh' ? '效率提升' : 'Efficiency Boost',
      icon: 'icon-[lucide--trending-up]',
      color: 'text-purple-600',
      description: currentLocale === 'zh' ? '平均开发时间节省' : 'Average Dev Time Saved',
    },
  ]

  const testimonials = [
    {
      name: 'Alex Chen',
      role: currentLocale === 'zh' ? '全栈开发工程师' : 'Full Stack Developer',
      company: 'Google',
      content: currentLocale === 'zh'
        ? 'Claude Code 让我的开发效率提升了 3 倍，代码审查时间减少了 70%。特别是在大型项目重构时，它的上下文理解能力真的令人印象深刻。'
        : 'Claude Code increased my development efficiency by 3x and reduced code review time by 70%. Its contextual understanding ability is truly impressive, especially during large project refactoring.',
      avatar: '👨‍💻',
      rating: 5,
      metrics: currentLocale === 'zh' ? '节省 15小时/周' : 'Save 15hrs/week',
    },
    {
      name: 'Sarah Kim',
      role: currentLocale === 'zh' ? '产品工程经理' : 'Product Engineering Manager',
      company: 'Microsoft',
      content: currentLocale === 'zh'
        ? '我们团队使用 Claude Code 后，项目交付速度提升了 40%，代码 bug 减少了 50%。现在每个开发者都离不开它。'
        : 'After our team adopted Claude Code, project delivery speed improved by 40% and code bugs decreased by 50%. Now every developer can\'t live without it.',
      avatar: '👩‍💼',
      rating: 5,
      metrics: currentLocale === 'zh' ? '团队效率 +40%' : 'Team Efficiency +40%',
    },
    {
      name: 'David Rodriguez',
      role: currentLocale === 'zh' ? '首席技术架构师' : 'Principal Technical Architect',
      company: 'Meta',
      content: currentLocale === 'zh'
        ? '作为资深架构师，我试过很多 AI 编程工具，Claude Code 在理解复杂系统架构方面是最出色的。它不只是写代码，更像是一个真正的编程伙伴。'
        : 'As a senior architect, I\'ve tried many AI programming tools. Claude Code excels at understanding complex system architectures. It\'s not just writing code, it\'s like a true programming partner.',
      avatar: '👨‍🎓',
      rating: 5,
      metrics: currentLocale === 'zh' ? '架构设计时间 -60%' : 'Architecture Design -60%',
    },
    {
      name: 'Emma Wilson',
      role: currentLocale === 'zh' ? '开源项目维护者' : 'Open Source Maintainer',
      company: 'Apache Foundation',
      content: currentLocale === 'zh'
        ? 'Claude Code 帮助我维护多个开源项目，自动生成的文档和测试用例质量非常高，社区贡献者都很喜欢。'
        : 'Claude Code helps me maintain multiple open source projects. The automatically generated documentation and test cases are of very high quality, and community contributors love it.',
      avatar: '👩‍🔬',
      rating: 5,
      metrics: currentLocale === 'zh' ? '文档效率 +300%' : 'Documentation +300%',
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
              : 'Join the global developer community and experience the AI-powered programming revolution'}
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
                'shadow-lg mb-4',
              )}
              >
                <span className={cn(stat.icon, stat.color, 'text-2xl')} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {stat.description}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'p-6 rounded-2xl relative',
                'bg-white dark:bg-neutral-800',
                'border border-neutral-200 dark:border-neutral-700',
                'shadow-lg hover:shadow-xl',
                'transition-all duration-300',
                'hover:scale-105',
              )}
            >
              {/* 公司标识背景 */}
              <div className="absolute top-4 right-4 opacity-10 text-2xl font-bold text-neutral-400">
                {testimonial.company}
              </div>
              
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    @{testimonial.company}
                  </div>
                </div>
              </div>
              
              {/* 效率指标徽章 */}
              <div className="mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700">
                  📈 {testimonial.metrics}
                </span>
              </div>
              
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                "
                {testimonial.content}
                "
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array.from({ length: testimonial.rating })].map((_, i) => (
                    <span key={i} className="icon-[lucide--star] text-xs" />
                  ))}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {currentLocale === 'zh' ? '已验证用户' : 'Verified User'}
                  <span className="icon-[lucide--check-circle] ml-1 text-green-500"></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-4">
              {currentLocale === 'zh' ? '受到业界认可' : 'Trusted by Industry Leaders'}
            </h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700">
              <span className="icon-[simple-icons--anthropic] text-[#FF6B35] text-2xl"></span>
              <div className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                {currentLocale === 'zh' ? 'Anthropic 官方' : 'Anthropic Official'}
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400">
                {currentLocale === 'zh' ? '原厂支持' : 'Native Support'}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
              <span className="icon-[lucide--shield-check] text-green-600 dark:text-green-400 text-2xl"></span>
              <div className="text-xs font-semibold text-green-700 dark:text-green-300">
                {currentLocale === 'zh' ? 'SOC2 认证' : 'SOC2 Certified'}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {currentLocale === 'zh' ? '企业级安全' : 'Enterprise Security'}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700">
              <span className="icon-[lucide--github] text-blue-600 dark:text-blue-400 text-2xl"></span>
              <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                {currentLocale === 'zh' ? '开源项目' : 'Open Source'}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                {currentLocale === 'zh' ? '社区驱动' : 'Community Driven'}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-700">
              <span className="icon-[lucide--award] text-purple-600 dark:text-purple-400 text-2xl"></span>
              <div className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                {currentLocale === 'zh' ? 'AI 产品奖' : 'AI Product Award'}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                {currentLocale === 'zh' ? '2024 年度' : '2024 Winner'}
              </div>
            </div>
          </div>
          
          {/* 额外的社会证明指标 */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1">
                <span className="icon-[lucide--building] text-neutral-400"></span>
                {currentLocale === 'zh' ? '500+ 企业客户' : '500+ Enterprise Clients'}
              </div>
              <div className="flex items-center gap-1">
                <span className="icon-[lucide--globe] text-neutral-400"></span>
                {currentLocale === 'zh' ? '180+ 国家使用' : '180+ Countries'}
              </div>
              <div className="flex items-center gap-1">
                <span className="icon-[lucide--trending-up] text-neutral-400"></span>
                {currentLocale === 'zh' ? '月增长率 25%' : '25% Monthly Growth'}
              </div>
              <div className="flex items-center gap-1">
                <span className="icon-[lucide--clock] text-neutral-400"></span>
                {currentLocale === 'zh' ? '99.9% 可用性' : '99.9% Uptime'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
