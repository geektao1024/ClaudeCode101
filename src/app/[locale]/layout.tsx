import '@/config/style/global.css';

import { JetBrains_Mono, Merriweather } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

import { routing } from '@/core/i18n/config';
import { ThemeProvider } from '@/core/theme/provider';
import { envConfigs } from '@/config';
import { UtmCapture } from '@/shared/blocks/common/utm-capture';
import { Toaster } from '@/shared/components/ui/sonner';
import { AppContextProvider } from '@/shared/contexts/app';
import { getMetadata } from '@/shared/lib/seo';
import { buildSiteJsonLd, JsonLd } from '@/shared/lib/structured-data';
import { getAdsService } from '@/shared/services/ads';
import { getAffiliateService } from '@/shared/services/affiliate';
import { getAnalyticsService } from '@/shared/services/analytics';
import { getCustomerService } from '@/shared/services/customer_service';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Songti SC', 'STSong', 'Noto Serif CJK SC', 'serif'],
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: true,
});

export const generateMetadata = getMetadata({
  includeAlternates: false,
});

async function getPublicRuntimeConfigs() {
  if (process.env.RUNTIME_CONFIG_FROM_DB !== 'true') {
    return envConfigs;
  }

  const { getAllConfigs } = await import('@/shared/models/config');
  return getAllConfigs();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isProduction = process.env.NODE_ENV === 'production';
  const isDebug = process.env.NEXT_PUBLIC_DEBUG === 'true';

  let adsMetaTags = null;
  let adsHeadScripts = null;
  let adsBodyScripts = null;

  let analyticsMetaTags = null;
  let analyticsHeadScripts = null;
  let analyticsBodyScripts = null;

  let affiliateMetaTags = null;
  let affiliateHeadScripts = null;
  let affiliateBodyScripts = null;

  let customerServiceMetaTags = null;
  let customerServiceHeadScripts = null;
  let customerServiceBodyScripts = null;

  if (isProduction || isDebug) {
    const configs = await getPublicRuntimeConfigs();

    const [adsService, analyticsService, affiliateService, customerService] =
      await Promise.all([
        getAdsService(configs),
        getAnalyticsService(configs),
        getAffiliateService(configs),
        getCustomerService(configs),
      ]);

    adsMetaTags = adsService.getMetaTags();
    adsHeadScripts = adsService.getHeadScripts();
    adsBodyScripts = adsService.getBodyScripts();

    analyticsMetaTags = analyticsService.getMetaTags();
    analyticsHeadScripts = analyticsService.getHeadScripts();
    analyticsBodyScripts = analyticsService.getBodyScripts();

    affiliateMetaTags = affiliateService.getMetaTags();
    affiliateHeadScripts = affiliateService.getHeadScripts();
    affiliateBodyScripts = affiliateService.getBodyScripts();

    customerServiceMetaTags = customerService.getMetaTags();
    customerServiceHeadScripts = customerService.getHeadScripts();
    customerServiceBodyScripts = customerService.getBodyScripts();
  }

  return (
    <html
      lang={locale}
      className={`${merriweather.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={envConfigs.app_favicon} />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <JsonLd data={buildSiteJsonLd(locale)} />

        {adsMetaTags}
        {adsHeadScripts}

        {analyticsMetaTags}
        {analyticsHeadScripts}

        {affiliateMetaTags}
        {affiliateHeadScripts}

        {customerServiceMetaTags}
        {customerServiceHeadScripts}
      </head>
      <body suppressHydrationWarning className="overflow-x-hidden">
        <NextTopLoader
          color="#6466F1"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
        />

        <UtmCapture />

        <NextIntlClientProvider>
          <ThemeProvider>
            <AppContextProvider>
              {children}
              <Toaster position="top-center" richColors />
            </AppContextProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

        {adsBodyScripts}
        {analyticsBodyScripts}
        {affiliateBodyScripts}
        {customerServiceBodyScripts}
      </body>
    </html>
  );
}
