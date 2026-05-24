import type { ReactNode } from 'react';

import { KnowledgeLayout } from '../_components/knowledge-layout';

export default function FaqsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <KnowledgeLayout section="faqs" params={params}>
      {children}
    </KnowledgeLayout>
  );
}
