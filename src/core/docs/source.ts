import { createElement } from 'react';
import { docs, logs, pages, posts } from '@/.source';
import type { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';

export const i18n: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en', 'zh'],
};

const iconHelper = (icon: string | undefined) => {
  if (!icon) return;
  if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
};

export const tutorialSource = loader({
  baseUrl: '/tutorial',
  source: docs.toFumadocsSource(),
  i18n,
  icon: iconHelper,
});

export const docsSource = tutorialSource;
export const source = tutorialSource;

export const pagesSource = loader({
  baseUrl: '/',
  source: pages.toFumadocsSource(),
  i18n,
  icon: iconHelper,
});

export const postsSource = loader({
  baseUrl: '/blog',
  source: posts.toFumadocsSource(),
  i18n,
  icon: iconHelper,
});

export const logsSource = loader({
  baseUrl: '/logs',
  source: logs.toFumadocsSource(),
  i18n,
  icon: iconHelper,
});
