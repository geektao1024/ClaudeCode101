import { isValidElement, type ComponentProps, type ReactNode } from 'react';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import moment from 'moment';

import { pagesSource } from '@/core/docs/source';
import { cn } from '@/shared/lib/utils';
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

function normalizeHeading(text: string) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (isValidElement(node)) {
    return getNodeText((node.props as { children?: ReactNode }).children);
  }

  return '';
}

function createStaticPageComponents(title?: string) {
  let firstHeadingSeen = false;
  const normalizedTitle = normalizeHeading(title || '');

  return {
    h1: ({ children, className, ...props }: ComponentProps<'h1'>) => {
      const isFirstHeading = !firstHeadingSeen;
      firstHeadingSeen = true;
      const headingText = normalizeHeading(getNodeText(children));

      if (isFirstHeading && headingText && headingText === normalizedTitle) {
        return null;
      }

      return (
        <h2
          {...props}
          className={cn(
            'mt-10 scroll-m-28 text-2xl font-bold tracking-normal',
            className
          )}
        >
          {children}
        </h2>
      );
    },
  };
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
        ...createStaticPageComponents(localPage.data.title),
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
