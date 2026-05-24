import type { ReactNode } from 'react';

import { KnowledgeLayout } from '../_components/knowledge-layout';

export default function MechanicsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <KnowledgeLayout section="mechanics" params={params}>
      {children}
    </KnowledgeLayout>
  );
}
