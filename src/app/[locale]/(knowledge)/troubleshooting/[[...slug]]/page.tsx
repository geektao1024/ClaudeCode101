import {
  generateKnowledgeMetadata,
  generateKnowledgeStaticParams,
  KnowledgeContentPage,
} from '../../_components/knowledge-page';

const section = 'troubleshooting';

export default function TroubleshootingPage(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  return <KnowledgeContentPage section={section} params={props.params} />;
}

export function generateStaticParams() {
  return generateKnowledgeStaticParams(section);
}

export function generateMetadata(props: {
  params: Promise<{ slug?: string[]; locale?: string }>;
}) {
  return generateKnowledgeMetadata({ section, params: props.params });
}
