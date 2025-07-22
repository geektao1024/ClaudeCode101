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
  const { t } = await useServerLocale(lang)
  return (
    <Navbar
      logo={(
        <span>{ t('systemTitle') }</span>
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

const BaiduTrack = () => {
  return (
    <>
      <Script strategy="afterInteractive">
        {`
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?d5ad5e04e6af914c01767926567602be";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `}
      </Script>
    </>
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
              },
              educationalLevel: lang === 'zh' ? '初级到高级' : 'Beginner to Advanced',
              coursePrerequisites: lang === 'zh' ? '基础编程知识' : 'Basic programming knowledge',
              teaches: lang === 'zh'
                ? ['ClaudeCode 使用', 'Claude Code 教程', 'AI 编程', '代码生成', '智能体编程', '最佳实践', 'Claude Code 工作流程']
                : ['ClaudeCode usage', 'Claude Code tutorial', 'AI Programming', 'Code Generation', 'Agentic Programming', 'Best Practices', 'Claude Code workflows'],
              inLanguage: lang === 'zh' ? 'zh-CN' : 'en-US',
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
          </Layout>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-4683BGZTR8" />
      
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6152848695010247"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sgv5r29kpc");
          `,
        }}
      />
      <BaiduTrack />
    </html>
  )
}
