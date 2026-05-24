import type { ReactNode } from 'react';

import { KnowledgeLayout } from '../_components/knowledge-layout';

export default function TroubleshootingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <KnowledgeLayout section="troubleshooting" params={params}>
      {children}
    </KnowledgeLayout>
  );
}
