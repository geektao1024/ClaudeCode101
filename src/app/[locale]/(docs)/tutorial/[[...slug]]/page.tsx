import { notFound } from 'next/navigation';
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

import { tutorialSource } from '@/core/docs/source';
import { envConfigs } from '@/config';

export const revalidate = 86400;
export const dynamic = 'force-static';
export const dynamicParams = true;

export default async function TutorialContentPage(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  const params = await props.params;
  const page = tutorialSource.getPage(params.slug, params.locale);

  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
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
            a: createRelativeLink(tutorialSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return tutorialSource.generateParams('slug', 'locale');
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  const params = await props.params;
  const page = tutorialSource.getPage(params.slug, params.locale);
  if (!page) notFound();

  const locale = params.locale || 'en';
  const path = page.url.replace(new RegExp(`^/${locale}`), '');
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
