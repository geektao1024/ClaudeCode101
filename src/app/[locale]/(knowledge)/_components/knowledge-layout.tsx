import type { ReactNode } from 'react';
import type { Translations } from 'fumadocs-ui/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { RootProvider } from 'fumadocs-ui/provider';

import { getKnowledgePageTree } from '@/core/docs/knowledge-tree';

import { baseOptions } from '../../(docs)/layout.config';

import '@/config/style/docs.css';

const zh: Partial<Translations> = {
  search: '搜索内容',
};

const locales = [
  {
    name: 'English',
    locale: 'en',
  },
  {
    name: '简体中文',
    locale: 'zh',
  },
];

export async function KnowledgeLayout({
  children,
  params,
  section,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
  section: string;
}) {
  const { locale } = await params;
  const lang = locale || 'en';

  return (
    <RootProvider
      i18n={{
        locale: lang,
        locales,
        translations: { zh }[lang],
      }}
      search={{
        options: {
          api: '/api/docs/search',
        },
      }}
    >
      <DocsLayout
        {...baseOptions()}
        tree={getKnowledgePageTree({ section, locale: lang })}
        nav={{ ...baseOptions().nav, mode: 'top' }}
        sidebar={{
          tabs: [],
          defaultOpenLevel: 1,
        }}
        tabMode="sidebar"
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
