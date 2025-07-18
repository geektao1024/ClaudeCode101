import type { Metadata } from 'next'

import type { ReactNode } from 'react'

import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'
import { GoogleAnalytics } from '@next/third-parties/google'

import Script from 'next/script'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { CustomFooter } from '@/components/CustomFooter'
import { useServerLocale } from '@/hooks'
import LocaleToggle from '@/widgets/locale-toggle'
import ThemeToggle from '@/widgets/theme-toggle'

import { getDictionary, getDirection } from '../_dictionaries/get-dictionary'
import { ThemeProvider } from './_components/ThemeProvider'
import './styles/index.css'

export const metadata = {
  title: 'Claude Code 教程中心 - 智能编程助手完整指南',
  description: 'Claude Code 中文教程，学习如何使用 AI 驱动的编程助手进行智能体编程，包含最佳实践、工作流程和优化技巧。',
  keywords: ['Claude Code', 'AI编程', '智能编程助手', 'Anthropic', '编程教程', '最佳实践'],
  authors: [{ name: 'Claude Code 教程中心' }],
  creator: 'Claude Code 教程中心',
  publisher: 'Claude Code 教程中心',
  metadataBase: new URL('https://claude-code-tutorial.com'),
  icons: '/img/favicon.svg',
  openGraph: {
    title: 'Claude Code 教程中心',
    description: 'Claude Code 智能编程助手完整指南',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Claude Code 教程中心',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code 教程中心',
    description: 'Claude Code 智能编程助手完整指南',
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
} satisfies Metadata

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
  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(lang)

  const title = 'Claude Code 教程中心'
  const description = 'Claude Code 智能编程助手完整指南'

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
      <Head
      // ... Your additional head options
      >
        {/* <title>{asPath !== '/' ? `${normalizePagesResult.title} - ${title}` : title}</title> */}
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={repo} />
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
      <GoogleAnalytics gaId="G-VCR6017LB8" />
      <BaiduTrack />
    </html>
  )
}
