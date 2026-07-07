import {
  createPageHeadingComponents,
  getMDXComponents,
} from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import moment from 'moment';

import { pagesSource } from '@/core/docs/source';
import { type Post as BlogPostType } from '@/shared/types/blocks/blog';

function getContentDate({
  created_at,
  locale,
}: {
  created_at: string;
  locale?: string;
}) {
  return moment(created_at)
    .locale(locale || 'en')
    .format(locale === 'zh' ? 'YYYY/MM/DD' : 'MMM D, YYYY');
}

// get local page from: content/pages/*.mdx
export async function getLocalPage({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}): Promise<BlogPostType | null> {
  const pageSlugs = slug.split('/').filter(Boolean);
  const localPage = await pagesSource.getPage(pageSlugs, locale);
  if (!localPage) {
    return null;
  }

  const MDXContent = localPage.data.body;
  const body = (
    <MDXContent
      components={getMDXComponents({
        ...createPageHeadingComponents(localPage.data.title),
        a: createRelativeLink(pagesSource, localPage),
      })}
    />
  );

  const frontmatter = localPage.data as any;

  return {
    id: localPage.path,
    slug,
    title: localPage.data.title || '',
    description: localPage.data.description || '',
    schema_question: frontmatter.schema_question || '',
    schema_answer: frontmatter.schema_answer || '',
    content: '',
    body,
    toc: localPage.data.toc,
    created_at: frontmatter.created_at
      ? getContentDate({
          created_at: frontmatter.created_at,
          locale,
        })
      : '',
    author_name: frontmatter.author_name || '',
    author_image: frontmatter.author_image || '',
    author_role: '',
    url: `/${locale}/${slug}`,
  };
}
