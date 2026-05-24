import { pagesSource } from './source';

type PageTree = Record<string, any>;

function isSectionNode(node: PageTree, section: string, locale: string) {
  const sectionUrl = `/${locale}/${section}`;

  return (
    node?.url === sectionUrl ||
    node?.url === `/${section}` ||
    node?.name?.toLowerCase?.() === section
  );
}

export function getKnowledgePageTree({
  section,
  locale,
}: {
  section: string;
  locale: string;
}) {
  const tree = pagesSource.pageTree[locale] || pagesSource.pageTree.en;
  const children = Array.isArray(tree.children) ? tree.children : [];
  const sectionNode = children.find((node: PageTree) =>
    isSectionNode(node, section, locale)
  );

  if (!sectionNode) {
    return tree;
  }

  return {
    ...tree,
    children: [sectionNode],
  };
}
