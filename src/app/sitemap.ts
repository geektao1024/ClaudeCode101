import type { MetadataRoute } from 'next';

import { pagesSource, tutorialSource } from '@/core/docs/source';
import { envConfigs } from '@/config';
import { locales } from '@/config/locale';

const excludedPagePaths = new Set(['/privacy-policy', '/terms-of-service']);

function normalizeUrl(locale: string, url: string) {
  const path = url.startsWith(`/${locale}/`)
    ? url.slice(locale.length + 1)
    : url.startsWith(`/${locale}`)
      ? url.slice(locale.length + 1) || '/'
      : url;

  if (path === '/') {
    return `${envConfigs.app_url}/${locale}`;
  }

  return `${envConfigs.app_url}/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

function shouldIndex(data: any) {
  if (data?.noindex === true) return false;
  if (data?.status && data.status !== 'published') return false;
  return true;
}

function pagePriority(path: string) {
  if (path === '/pricing') return 0.86;
  if (path === '/faqs') return 0.85;
  if (path === '/mechanics' || path === '/mcp' || path === '/troubleshooting') {
    return 0.84;
  }
  if (path.startsWith('/faqs/')) return 0.72;
  if (
    path.startsWith('/mechanics/') ||
    path.startsWith('/mcp/') ||
    path.startsWith('/troubleshooting/')
  ) {
    return 0.7;
  }
  if (path === '/resources' || path === '/upgrade') return 0.75;
  return 0.5;
}

function entry({
  url,
  priority,
}: {
  url: string;
  priority: number;
}): MetadataRoute.Sitemap[number] {
  return {
    url,
    changeFrequency: 'weekly',
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    items.push(entry({ url: `${envConfigs.app_url}/${locale}`, priority: 1 }));

    for (const page of tutorialSource.getPages(locale)) {
      if (!shouldIndex(page.data)) continue;
      const normalized = page.url.replace(new RegExp(`^/${locale}`), '');
      items.push(
        entry({
          url: normalizeUrl(locale, page.url),
          priority: normalized === '/tutorial' ? 0.95 : 0.8,
        })
      );
    }

    for (const page of pagesSource.getPages(locale)) {
      if (!shouldIndex(page.data)) continue;
      const normalized = page.url.replace(new RegExp(`^/${locale}`), '');
      if (excludedPagePaths.has(normalized)) continue;
      items.push(
        entry({
          url: normalizeUrl(locale, page.url),
          priority: pagePriority(normalized),
        })
      );
    }
  }

  return items;
}
