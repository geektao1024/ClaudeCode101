import type { ReactNode } from 'react';

import { KnowledgeLayout } from '../_components/knowledge-layout';

export default function McpLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  return (
    <KnowledgeLayout section="mcp" params={params}>
      {children}
    </KnowledgeLayout>
  );
}
