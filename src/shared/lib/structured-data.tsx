import { envConfigs } from '@/config';
import { locales } from '@/config/locale';
import { type Post } from '@/shared/types/blocks/blog';

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

const collectionLabels: Record<string, Record<string, string>> = {
  en: {
    faqs: 'FAQ',
    mechanics: 'Mechanics',
    mcp: 'MCP Directory',
    resources: 'Resources',
    pricing: 'Pricing',
    troubleshooting: 'Troubleshooting',
    upgrade: 'Upgrade Guide',
    'api-reference': 'API Reference',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
  },
  zh: {
    faqs: '常见问题',
    mechanics: '机制专题',
    mcp: 'MCP 目录',
    resources: '资源工具',
    pricing: '价格',
    troubleshooting: '故障排查',
    upgrade: '升级指南',
    'api-reference': 'API 参考',
    'privacy-policy': '隐私政策',
    'terms-of-service': '服务条款',
  },
};

function getLocale(locale: string) {
  return locales.includes(locale as any) ? locale : 'en';
}

function getLabel(locale: string, segment: string) {
  const normalizedLocale = getLocale(locale);
  const labels = collectionLabels[normalizedLocale] || collectionLabels.en;

  return (
    labels[segment] ||
    segment
      .split('-')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}

function absoluteUrl(path: string) {
  if (path.startsWith('http')) {
    return path;
  }

  return `${envConfigs.app_url}${path.startsWith('/') ? path : `/${path}`}`;
}

function cleanJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data }: { data: unknown }) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: cleanJsonLd(data) }}
    />
  );
}

export function getStaticPageBreadcrumbs({
  locale,
  slug,
  title,
}: {
  locale: string;
  slug: string;
  title?: string;
}): BreadcrumbItem[] {
  const parts = slug.split('/').filter(Boolean);
  const normalizedLocale = getLocale(locale);
  const homeLabel = normalizedLocale === 'zh' ? '首页' : 'Home';
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: homeLabel,
      href: `/${normalizedLocale}`,
    },
  ];

  if (!parts.length) {
    return breadcrumbs;
  }

  if (parts.length > 1) {
    breadcrumbs.push({
      name: getLabel(normalizedLocale, parts[0]),
      href: `/${normalizedLocale}/${parts[0]}`,
    });
  }

  breadcrumbs.push({
    name: title || getLabel(normalizedLocale, parts[parts.length - 1]),
    href: `/${normalizedLocale}/${slug}`,
    current: true,
  });

  return breadcrumbs;
}

export function buildSiteJsonLd(locale: string) {
  const normalizedLocale = getLocale(locale);
  const homeUrl = `${envConfigs.app_url}/${normalizedLocale}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${envConfigs.app_url}#organization`,
        name: envConfigs.app_name,
        url: envConfigs.app_url,
        logo: absoluteUrl(envConfigs.app_logo),
        description: envConfigs.app_description || undefined,
      },
      {
        '@type': 'WebSite',
        '@id': `${homeUrl}#website`,
        name: envConfigs.app_name,
        url: homeUrl,
        inLanguage: normalizedLocale,
        publisher: {
          '@id': `${envConfigs.app_url}#organization`,
        },
      },
    ],
  };
}

export function buildStaticPageJsonLd({
  locale,
  slug,
  post,
}: {
  locale: string;
  slug: string;
  post: Post;
}) {
  const normalizedLocale = getLocale(locale);
  const parts = slug.split('/').filter(Boolean);
  const pageUrl = `${envConfigs.app_url}/${normalizedLocale}/${slug}`;
  const breadcrumbs = getStaticPageBreadcrumbs({
    locale: normalizedLocale,
    slug,
    title: post.title,
  });
  const isFaqDetail = parts[0] === 'faqs' && parts.length > 1;
  const isCollectionPage =
    parts.length === 1 &&
    ['faqs', 'mechanics', 'mcp', 'resources', 'troubleshooting'].includes(
      parts[0]
    );

  const pageSchema: Record<string, unknown> = {
    '@type': isFaqDetail
      ? 'FAQPage'
      : isCollectionPage
        ? 'CollectionPage'
        : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: post.title,
    description: post.description || undefined,
    inLanguage: normalizedLocale,
    isPartOf: {
      '@id': `${envConfigs.app_url}/${normalizedLocale}#website`,
    },
    publisher: {
      '@id': `${envConfigs.app_url}#organization`,
    },
  };

  const question = post.schema_question || post.title;
  const answer = post.schema_answer || post.description;

  if (isFaqDetail && question && answer) {
    pageSchema.mainEntity = [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      },
    ];
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      pageSchema,
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.href),
        })),
      },
    ],
  };
}
