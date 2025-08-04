import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'
import process from 'node:process'
import { GoogleAnalytics } from '@next/third-parties/google'

import Script from 'next/script'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { CustomFooter } from '@/components/CustomFooter'
import { useServerLocale } from '@/hooks'
import LocaleToggle from '@/widgets/locale-toggle'
import ThemeToggle from '@/widgets/theme-toggle'

import { getDirection } from '../_dictionaries/get-dictionary'
import { ThemeProvider } from './_components/ThemeProvider'
import './styles/index.css'

export async function generateMetadata({ params }: { params: Promise<{ lang: I18nLangKeys }> }): Promise<Metadata> {
  const { lang } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://claudecode101.com'
  const siteName = lang === 'zh' ? 'Claude Code 教程中心' : 'Claude Code Tutorial Center'
  const title = lang === 'zh'
    ? 'ClaudeCode 教程中心 - Claude Code 智能编程助手完整指南'
    : 'ClaudeCode Tutorial Center - Complete Claude Code AI Programming Assistant Guide'
  const description = lang === 'zh'
    ? 'ClaudeCode 中文教程，学习如何使用 Claude Code 进行智能体编程。专业的 ClaudeCode 教程包含最佳实践、工作流程和优化技巧，助您掌握 AI 驱动的编程助手。'
    : 'ClaudeCode tutorial in Chinese. Learn how to use Claude Code for agentic programming. Professional ClaudeCode tutorial includes best practices, workflows, and optimization tips to master AI-powered programming assistant.'
  const keywords = lang === 'zh'
    ? ['ClaudeCode', 'Claude Code 教程', 'claudecode', 'AI编程', '智能编程助手', 'Anthropic', '编程教程', '最佳实践', 'MCP', '代码生成', '编程自动化', 'Claude Code 中文教程']
    : ['ClaudeCode', 'Claude Code tutorial', 'claudecode', 'AI Programming', 'AI Programming Assistant', 'Anthropic', 'Programming Tutorial', 'Best Practices', 'MCP', 'Code Generation', 'Programming Automation', 'Claude Code guide']

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: '/img/favicon.svg',
      apple: '/img/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      siteName,
      url: `${siteUrl}/${lang}`,
      images: [
        {
          url: '/img/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/img/og-image.jpg'],
      creator: '@anthropic',
      site: '@anthropic',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'zh-CN': `${siteUrl}/zh`,
        en: `${siteUrl}/en`,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE,
      yandex: process.env.YANDEX_VERIFICATION_CODE,
      yahoo: process.env.YAHOO_VERIFICATION_CODE,
    },
  } satisfies Metadata
}

const repo = 'https://github.com/anthropics/claude-code'

const CustomBanner = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Banner
      storageKey="starter-banner"
    >
      <div className="flex justify-center items-center gap-1">
        { t('banner.title') }
        {' '}
        <a
          className="max-sm:hidden text-warning hover:underline"
          target="_blank"
          href={repo}
        >
          { t('banner.more') }
        </a>
      </div>
    </Banner>
  )
}


const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  return (
    <Navbar
      logo={(
        <div className="flex items-center gap-2">
          <img
            src="/img/Logo-cc.png"
            alt="ClaudeCode101"
            className="h-8 w-8"
          />
          <span className="font-semibold">ClaudeCode101</span>
        </div>
      )}
      logoLink={`/${lang}`}
      projectLink={repo}
    >
      <>
        <LocaleToggle className="max-md:hidden" />
        <ThemeToggle className="max-md:hidden" />
      </>

    </Navbar>
  )
}



interface Props {
  children: ReactNode
  params: Promise<{ lang: I18nLangKeys }>
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  const pageMap = await getPageMap(lang)
  const { t } = await useServerLocale(lang)

  return (
    <html
      // Not required, but good for SEO
      lang={lang}
      // Required to be set
      // dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      dir={getDirection(lang)}
      suppressHydrationWarning
    >
      <Head>
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-6152848695010247" />

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: lang === 'zh' ? 'ClaudeCode 教程中心 - Claude Code 学习平台' : 'ClaudeCode Tutorial Center - Claude Code Learning Platform',
              description: lang === 'zh'
                ? 'ClaudeCode 中文教程，学习如何使用 Claude Code 进行智能体编程。专业的 ClaudeCode 教程包含最佳实践、工作流程和优化技巧，助您掌握 AI 驱动的编程助手。'
                : 'ClaudeCode tutorial in Chinese. Learn how to use Claude Code for agentic programming. Professional ClaudeCode tutorial includes best practices, workflows, and optimization tips to master AI-powered programming assistant.',
              url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}`,
              publisher: {
                '@type': 'Organization',
                name: 'Claude Code Tutorial Center',
                url: 'https://claude-code-tutorial.com',
                logo: {
                  '@type': 'ImageObject',
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/img/logo.png`,
                },
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
              inLanguage: lang === 'zh' ? 'zh-CN' : 'en-US',
              about: {
                '@type': 'Thing',
                name: 'Claude Code',
                description: lang === 'zh' ? 'AI 编程助手' : 'AI Programming Assistant',
              },
            }),
          }}
        />

        {/* 教程内容的结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Course',
              name: lang === 'zh' ? 'ClaudeCode 完整教程 - Claude Code 编程指南' : 'Complete ClaudeCode Tutorial - Claude Code Programming Guide',
              description: lang === 'zh'
                ? '学习如何使用 ClaudeCode 进行智能体编程的完整 Claude Code 教程课程'
                : 'Complete ClaudeCode tutorial course on learning how to use Claude Code for agentic programming',
              provider: {
                '@type': 'Organization',
                name: 'Claude Code Tutorial Center',
                url: 'https://claude-code-tutorial.com',
                sameAs: [
                  'https://github.com/anthropics/claude-code',
                  'https://docs.anthropic.com/en/docs/claude-code',
                ],
              },
              educationalLevel: lang === 'zh' ? '初级到高级' : 'Beginner to Advanced',
              coursePrerequisites: lang === 'zh' ? '基础编程知识' : 'Basic programming knowledge',
              teaches: lang === 'zh'
                ? ['ClaudeCode 使用', 'Claude Code 教程', 'AI 编程', '代码生成', '智能体编程', '最佳实践', 'Claude Code 工作流程']
                : ['ClaudeCode usage', 'Claude Code tutorial', 'AI Programming', 'Code Generation', 'Agentic Programming', 'Best Practices', 'Claude Code workflows'],
              inLanguage: lang === 'zh' ? 'zh-CN' : 'en-US',
              duration: 'PT5H',
              courseMode: 'online',
              accessMode: 'textual',
              accessModeSufficient: 'textual',
              accessibilityFeature: ['alternativeText', 'structuralNavigation'],
              accessibilityHazard: 'none',
              accessibilityAPI: 'ARIA',
              hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'online',
                instructor: {
                  '@type': 'Person',
                  name: 'Claude Code Expert',
                },
              },
            }),
          }}
        />

        {/* FAQ 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: lang === 'zh' ? '什么是 ClaudeCode？' : 'What is ClaudeCode?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: lang === 'zh'
                      ? 'ClaudeCode（Claude Code）是 Anthropic 开发的智能编程命令行工具，为开发者提供AI驱动的编程协助。通过 Claude Code 教程，您可以学习支持多种编程语言和工作流程的智能编程技巧。'
                      : 'ClaudeCode (Claude Code) is an intelligent programming command-line tool developed by Anthropic, providing AI-driven programming assistance for developers. Through Claude Code tutorials, you can learn intelligent programming techniques that support multiple programming languages and workflows.',
                  },
                },
                {
                  '@type': 'Question',
                  name: lang === 'zh' ? '如何安装和配置 ClaudeCode？' : 'How to install and configure ClaudeCode?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: lang === 'zh'
                      ? '您可以通过 Claude Code 教程和官方文档获取最新的 ClaudeCode 安装方法，通常包括设置API密钥、配置环境变量，以及创建CLAUDE.md配置文件。'
                      : 'You can get the latest ClaudeCode installation methods through Claude Code tutorials and official documentation, typically including setting up API keys, configuring environment variables, and creating CLAUDE.md configuration files.',
                  },
                },
                {
                  '@type': 'Question',
                  name: lang === 'zh' ? 'ClaudeCode 支持哪些编程语言？' : 'Which programming languages does ClaudeCode support?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: lang === 'zh'
                      ? 'ClaudeCode（Claude Code）支持几乎所有主流编程语言，包括 Python、JavaScript、TypeScript、Java、Go、Rust 等。通过 Claude Code 教程，您可以学习如何在不同语言项目中使用智能编程功能。'
                      : 'ClaudeCode (Claude Code) supports almost all mainstream programming languages, including Python, JavaScript, TypeScript, Java, Go, Rust, and more. Through Claude Code tutorials, you can learn how to use intelligent programming features in different language projects.',
                  },
                },
              ],
            }),
          }}
        />

        {/* HowTo 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: lang === 'zh' ? '如何使用 ClaudeCode 进行智能编程' : 'How to Use ClaudeCode for Intelligent Programming',
              description: lang === 'zh'
                ? '完整的 ClaudeCode 教程指南，学习如何配置和使用 Claude Code 进行 AI 辅助编程'
                : 'Complete ClaudeCode tutorial guide on how to configure and use Claude Code for AI-assisted programming',
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/img/og-image.jpg`,
              totalTime: 'PT10M',
              estimatedCost: {
                '@type': 'MonetaryAmount',
                currency: 'USD',
                value: '0',
              },
              supply: [
                {
                  '@type': 'HowToSupply',
                  name: lang === 'zh' ? '计算机或笔记本电脑' : 'Computer or Laptop',
                },
                {
                  '@type': 'HowToSupply',
                  name: lang === 'zh' ? 'Claude API 密钥' : 'Claude API Key',
                },
              ],
              tool: [
                {
                  '@type': 'HowToTool',
                  name: 'Claude Code CLI',
                },
                {
                  '@type': 'HowToTool',
                  name: lang === 'zh' ? '命令行终端' : 'Command Line Terminal',
                },
              ],
              step: [
                {
                  '@type': 'HowToStep',
                  name: lang === 'zh' ? '安装 ClaudeCode' : 'Install ClaudeCode',
                  text: lang === 'zh'
                    ? '通过 npm 或官方安装程序安装 Claude Code CLI 工具'
                    : 'Install Claude Code CLI tool via npm or official installer',
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}/tutorial/getting-started/installation`,
                },
                {
                  '@type': 'HowToStep',
                  name: lang === 'zh' ? '配置 API 密钥' : 'Configure API Key',
                  text: lang === 'zh'
                    ? '设置 Claude API 密钥以启用 AI 功能'
                    : 'Set up Claude API key to enable AI features',
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}/tutorial/configuration`,
                },
                {
                  '@type': 'HowToStep',
                  name: lang === 'zh' ? '开始使用' : 'Start Using',
                  text: lang === 'zh'
                    ? '在终端中运行 claude 命令开始智能编程'
                    : 'Run claude command in terminal to start intelligent programming',
                  url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}/tutorial/getting-started/basic-usage`,
                },
              ],
            }),
          }}
        />

        {/* 产品结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Claude Code',
              alternateName: 'ClaudeCode',
              description: lang === 'zh'
                ? 'Claude Code 是 Anthropic 开发的 AI 驱动编程助手，通过命令行界面提供智能编程协助'
                : 'Claude Code is an AI-powered programming assistant developed by Anthropic, providing intelligent programming assistance through a command-line interface',
              url: 'https://claude.ai/code',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: ['Windows', 'macOS', 'Linux'],
              programmingLanguage: ['JavaScript', 'Python', 'TypeScript', 'Java', 'Go', 'Rust', 'C++', 'C#'],
              downloadUrl: 'https://claude.ai/code',
              author: {
                '@type': 'Organization',
                name: 'Anthropic',
                url: 'https://anthropic.com',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'InStock',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250',
                bestRating: '5',
                worstRating: '1',
              },
              review: [
                {
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: 'Alex Chen',
                  },
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                  reviewBody: lang === 'zh'
                    ? 'Claude Code 让我的开发效率提升了 3 倍，代码质量也明显改善了。'
                    : 'Claude Code increased my development efficiency by 3x and significantly improved code quality.',
                },
              ],
            }),
          }}
        />

        {/* 面包屑导航结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: lang === 'zh' ? '首页' : 'Home',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: lang === 'zh' ? 'ClaudeCode 教程' : 'ClaudeCode Tutorial',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://claude-code-tutorial.com'}/${lang}/tutorial`,
                },
              ],
            }),
          }}
        />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="starter-theme-provider"
          disableTransitionOnChange
        >
          <Layout
            banner={
              <CustomBanner lang={lang} />
            }
            navbar={
              <CustomNavbar lang={lang} />
            }
            lastUpdated={(
              <LastUpdated>
                { t('lastUpdated') }
              </LastUpdated>
            )}
            editLink={null}
            docsRepositoryBase="https://github.com/anthropics/claude-code"
            footer={(
              <Footer className="bg-background py-5!">
                <CustomFooter />
              </Footer>
            )}
            search={<Search />}
            i18n={[
              { locale: 'en', name: 'English' },
              { locale: 'zh', name: '简体中文' },
            ]}
            pageMap={pageMap}
            feedback={{ content: '' }}
          // ... Your additional layout options
          >
            {children}

            {/* Adsterra Ad Container */}
            <div id="container-f45fea6468637f2b2fb47a4f10d061e2"></div>
          </Layout>
        </ThemeProvider>
      </body>
      {/* 延迟加载 Google Analytics - 用户交互后加载 */}
      <Script
        id="ga-delayed"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.gtag = window.gtag || function(){dataLayer.push(arguments);};
            window.dataLayer = window.dataLayer || [];
            
            // 延迟加载 GA
            function loadGA() {
              if (!window.gaLoaded) {
                window.gaLoaded = true;
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4683BGZTR8';
                document.head.appendChild(script);
                
                script.onload = function() {
                  gtag('js', new Date());
                  gtag('config', 'G-4683BGZTR8', {
                    page_title: document.title,
                    page_location: window.location.href
                  });
                };
              }
            }
            
            // 用户交互或 3 秒后加载
            ['mousedown', 'touchstart', 'scroll'].forEach(event => {
              document.addEventListener(event, loadGA, { once: true });
            });
            setTimeout(loadGA, 3000);
          `,
        }}
      />

      {/* 延迟加载 Google AdSense */}
      <Script
        id="adsense-delayed"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function loadAdSense() {
              if (!window.adSenseLoaded) {
                window.adSenseLoaded = true;
                const script = document.createElement('script');
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247';
                document.head.appendChild(script);
              }
            }
            
            // 用户滚动或 5 秒后加载广告
            ['scroll', 'touchstart'].forEach(event => {
              document.addEventListener(event, loadAdSense, { once: true });
            });
            setTimeout(loadAdSense, 5000);
          `,
        }}
      />

      {/* 延迟加载 Adsterra */}
      <Script
        id="adsterra-delayed"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function loadAdsterra() {
              if (!window.adsterraLoaded) {
                window.adsterraLoaded = true;
                const script = document.createElement('script');
                script.async = true;
                script.src = '//pl27236491.profitableratecpm.com/f45fea6468637f2b2fb47a4f10d061e2/invoke.js';
                script.setAttribute('data-cfasync', 'false');
                document.head.appendChild(script);
              }
            }
            
            // 用户滚动 50% 或 8 秒后加载
            function checkScroll() {
              if (window.scrollY > window.innerHeight * 0.5) {
                loadAdsterra();
                document.removeEventListener('scroll', checkScroll);
              }
            }
            document.addEventListener('scroll', checkScroll);
            setTimeout(loadAdsterra, 8000);
          `,
        }}
      />

      {/* 延迟加载 Microsoft Clarity */}
      <Script
        id="microsoft-clarity-delayed"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function loadClarity() {
              if (!window.clarityLoaded) {
                window.clarityLoaded = true;
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "sgv5r29kpc");
              }
            }
            
            // 用户交互或 4 秒后加载
            ['click', 'scroll', 'touchstart'].forEach(event => {
              document.addEventListener(event, loadClarity, { once: true });
            });
            setTimeout(loadClarity, 4000);
          `,
        }}
      />

      {/* 延迟加载百度统计 */}
      <Script
        id="baidu-delayed"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            function loadBaidu() {
              if (!window.baiduLoaded) {
                window.baiduLoaded = true;
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?d5ad5e04e6af914c01767926567602be";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
              }
            }
            
            // 用户交互或 6 秒后加载
            ['mousedown', 'touchstart'].forEach(event => {
              document.addEventListener(event, loadBaidu, { once: true });
            });
            setTimeout(loadBaidu, 6000);
          `,
        }}
      />
    </html>
  )
}
