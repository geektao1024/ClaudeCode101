import { getTranslations, setRequestLocale } from 'next-intl/server';

import { envConfigs } from '@/config';
import { locales } from '@/config/locale';

// get metadata for page component
export function getMetadata(
  options: {
    title?: string;
    description?: string;
    keywords?: string;
    metadataKey?: string;
    canonicalUrl?: string; // relative path or full url
    imageUrl?: string;
    appName?: string;
    noIndex?: boolean;
    includeAlternates?: boolean;
  } = {}
) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    setRequestLocale(locale);

    // passed metadata
    const passedMetadata = {
      title: options.title,
      description: options.description,
      keywords: options.keywords,
    };

    // default metadata
    const defaultMetadata = await getTranslatedMetadata(
      defaultMetadataKey,
      locale
    );

    // translated metadata
    let translatedMetadata: any = {};
    if (options.metadataKey) {
      translatedMetadata = await getTranslatedMetadata(
        options.metadataKey,
        locale
      );
    }

    // canonical url
    const canonicalUrl = await getCanonicalUrl(
      options.canonicalUrl || '',
      locale || ''
    );
    const alternates =
      options.includeAlternates === false
        ? undefined
        : {
            canonical: canonicalUrl,
            languages: getAlternateLanguages(options.canonicalUrl || ''),
          };

    const title =
      passedMetadata.title || translatedMetadata.title || defaultMetadata.title;
    const description =
      passedMetadata.description ||
      translatedMetadata.description ||
      defaultMetadata.description;

    // image url
    let imageUrl = options.imageUrl || envConfigs.app_preview_image;
    if (imageUrl.startsWith('http')) {
      imageUrl = imageUrl;
    } else {
      imageUrl = `${envConfigs.app_url}${imageUrl}`;
    }

    // app name
    let appName = options.appName;
    if (!appName) {
      appName = envConfigs.app_name || '';
    }

    return {
      title:
        passedMetadata.title ||
        translatedMetadata.title ||
        defaultMetadata.title,
      description:
        passedMetadata.description ||
        translatedMetadata.description ||
        defaultMetadata.description,
      keywords:
        passedMetadata.keywords ||
        translatedMetadata.keywords ||
        defaultMetadata.keywords,
      ...(alternates ? { alternates } : {}),

      openGraph: {
        type: 'website',
        locale: locale,
        url: canonicalUrl,
        title,
        description,
        siteName: appName,
        images: [imageUrl.toString()],
      },

      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl.toString()],
        site: envConfigs.app_url,
      },

      ...(options.noIndex
        ? {
            robots: {
              index: false,
              follow: false,
            },
          }
        : {}),
    };
  };
}

const defaultMetadataKey = 'common.metadata';

async function getTranslatedMetadata(metadataKey: string, locale: string) {
  setRequestLocale(locale);
  const t = await getTranslations(metadataKey);

  return {
    title: t.has('title') ? t('title') : '',
    description: t.has('description') ? t('description') : '',
    keywords: t.has('keywords') ? t('keywords') : '',
  };
}

async function getCanonicalUrl(canonicalUrl: string, locale: string) {
  if (canonicalUrl.startsWith('http')) {
    return canonicalUrl.endsWith('/')
      ? canonicalUrl.slice(0, -1)
      : canonicalUrl;
  }

  const path = getCanonicalPath(canonicalUrl);
  return `${envConfigs.app_url}${locale ? `/${locale}` : ''}${path}`;
}

function getAlternateLanguages(canonicalUrl: string) {
  const path = getCanonicalPath(canonicalUrl);

  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      `${envConfigs.app_url}/${locale}${path}`,
    ])
  );
}

function getCanonicalPath(canonicalUrl: string) {
  if (!canonicalUrl || canonicalUrl === '/') {
    return '';
  }

  let pathname = canonicalUrl;

  if (canonicalUrl.startsWith('http')) {
    try {
      pathname = new URL(canonicalUrl).pathname;
    } catch {
      pathname = '/';
    }
  }

  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  const localePrefixPattern = new RegExp(`^/(${locales.join('|')})(?=/|$)`);
  pathname = pathname.replace(localePrefixPattern, '') || '';

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
