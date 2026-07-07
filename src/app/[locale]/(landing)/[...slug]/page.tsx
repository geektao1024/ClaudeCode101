import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { envConfigs } from '@/config';
import { localeMessagesPaths, locales } from '@/config/locale';
import { buildStaticPageJsonLd, JsonLd } from '@/shared/lib/structured-data';
import { getLocalPage } from '@/shared/models/local-content';

export const revalidate = 3600;

function getLocalizedAlternates(locale: string, slug: string) {
  const path = slug ? `/${slug}` : '';

  return {
    canonical: `${envConfigs.app_url}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        locales.map((loc) => [loc, `${envConfigs.app_url}/${loc}${path}`])
      ),
      'x-default': `${envConfigs.app_url}/en${path}`,
    },
  };
}

function getNoIndexMetadata(
  alternates: ReturnType<typeof getLocalizedAlternates>
) {
  return {
    alternates,
    robots: {
      index: false,
      follow: false,
    },
  };
}

function getPreviewImageUrl() {
  const imageUrl = envConfigs.app_preview_image;

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${envConfigs.app_url}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

function hasDynamicPageMessages(slug: string) {
  return localeMessagesPaths.includes(`pages/${slug}`);
}

// dynamic page metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const { locale, slug } = await params;

  // metadata values
  let title = '';
  let description = '';

  // 1. try to get static page metadata from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug (files with extensions or dev server paths like @vite/client)
  if (staticPageSlug.includes('.') || staticPageSlug.startsWith('@')) {
    return;
  }

  const alternates = getLocalizedAlternates(locale, staticPageSlug);

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page metadata
  if (staticPage) {
    title = staticPage.title || '';
    description = staticPage.description || '';
    const previewImageUrl = getPreviewImageUrl();

    return {
      title,
      description,
      alternates,
      openGraph: {
        type: 'website',
        locale,
        url: alternates.canonical,
        title,
        description,
        siteName: envConfigs.app_name,
        images: [previewImageUrl],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [previewImageUrl],
        site: envConfigs.app_url,
      },
    };
  }

  // 2. static page not found, try to get dynamic page metadata from
  // src/config/locale/messages/{locale}/pages/**/*.json

  // dynamic page slug
  const dynamicPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('.') || '';

  const messageKey = `pages.${dynamicPageSlug}`;

  if (!hasDynamicPageMessages(dynamicPageSlug)) {
    return getNoIndexMetadata(alternates);
  }

  try {
    const t = await getTranslations({ locale, namespace: messageKey });

    // return dynamic page metadata
    if (t.has('metadata')) {
      title = t.raw('metadata.title');
      description = t.raw('metadata.description');

      return {
        title,
        description,
        alternates,
      };
    }
  } catch {
    return getNoIndexMetadata(alternates);
  }

  // 3. return common metadata
  const tc = await getTranslations('common.metadata');

  title = tc('title');
  description = tc('description');

  return {
    title,
    description,
    alternates,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 1. try to get static page from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug (files with extensions or dev server paths like @vite/client)
  if (staticPageSlug.includes('.') || staticPageSlug.startsWith('@')) {
    return notFound();
  }

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page
  if (staticPage) {
    const Page = await getThemePage('static-page');

    return (
      <>
        <JsonLd
          data={buildStaticPageJsonLd({
            locale,
            slug: staticPageSlug,
            post: staticPage,
          })}
        />
        <Page locale={locale} post={staticPage} />
      </>
    );
  }

  // 2. static page not found
  // try to get dynamic page content from
  // src/config/locale/messages/{locale}/pages/**/*.json

  // dynamic page slug
  const dynamicPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('.') || '';

  const messageKey = `pages.${dynamicPageSlug}`;

  if (!hasDynamicPageMessages(dynamicPageSlug)) {
    return notFound();
  }

  try {
    const t = await getTranslations({ locale, namespace: messageKey });

    // return dynamic page
    if (t.has('page')) {
      const Page = await getThemePage('dynamic-page');
      return <Page locale={locale} page={t.raw('page')} />;
    }
  } catch {
    // ignore error if translation not found
    return notFound();
  }

  // 3. page not found
  return notFound();
}
