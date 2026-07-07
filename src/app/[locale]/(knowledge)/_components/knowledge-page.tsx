import { notFound } from 'next/navigation';
import Script from 'next/script';
import {
  createPageHeadingComponents,
  getMDXComponents,
} from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { pagesSource } from '@/core/docs/source';
import { envConfigs } from '@/config';
import { buildStaticPageJsonLd } from '@/shared/lib/structured-data';

type KnowledgeParams = Promise<{ slug?: string[]; locale?: string }>;

function getPageSlugs(section: string, slug?: string[]) {
  return [section, ...(slug || [])];
}

function getPath(locale: string, pageUrl: string) {
  return pageUrl.replace(new RegExp(`^/${locale}`), '');
}

function getSchemaPost(
  page: NonNullable<ReturnType<typeof pagesSource.getPage>>
) {
  const frontmatter = page.data as any;

  return {
    title: page.data.title || '',
    description: page.data.description || '',
    schema_question: frontmatter.schema_question || '',
    schema_answer: frontmatter.schema_answer || '',
  };
}

export async function KnowledgeContentPage({
  section,
  params,
}: {
  section: string;
  params: KnowledgeParams;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const slugs = getPageSlugs(section, resolvedParams.slug);
  const page = pagesSource.getPage(slugs, locale);

  if (!page) notFound();

  const MDXContent = page.data.body;
  const jsonLd = buildStaticPageJsonLd({
    locale,
    slug: slugs.join('/'),
    post: getSchemaPost(page),
  });

  return (
    <>
      <DocsPage
        toc={page.data.toc}
        full={page.data.full}
        footer={{
          enabled: false,
        }}
        tableOfContentPopover={{
          enabled: false,
        }}
        tableOfContent={{
          style: 'clerk',
        }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              ...createPageHeadingComponents(page.data.title),
              a: createRelativeLink(pagesSource, page),
            })}
          />
        </DocsBody>
      </DocsPage>
      <Script
        id={`knowledge-jsonld-${locale}-${slugs.join('-')}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}

export function generateKnowledgeStaticParams(section: string) {
  return pagesSource
    .generateParams('slug', 'locale')
    .filter((params) => params.slug?.[0] === section)
    .map((params) => ({
      locale: params.locale,
      slug: params.slug.slice(1),
    }));
}

export async function generateKnowledgeMetadata({
  section,
  params,
}: {
  section: string;
  params: KnowledgeParams;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'en';
  const page = pagesSource.getPage(
    getPageSlugs(section, resolvedParams.slug),
    locale
  );

  if (!page) notFound();

  const path = getPath(locale, page.url);
  const canonical = `${envConfigs.app_url}/${locale}${path}`;
  const imageUrl = `${envConfigs.app_url}${envConfigs.app_preview_image}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
      languages: {
        zh: `${envConfigs.app_url}/zh${path}`,
        en: `${envConfigs.app_url}/en${path}`,
        'x-default': `${envConfigs.app_url}/en${path}`,
      },
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: canonical,
      siteName: envConfigs.app_name,
      images: [imageUrl],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
  };
}
