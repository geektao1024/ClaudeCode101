import { pagesSource } from './source';

type PageTree = Record<string, any>;

function getNodeChildren(node: PageTree) {
  return Array.isArray(node.children) ? node.children : [];
}

function getNodeUrl(node: PageTree) {
  return typeof node?.url === 'string' ? node.url : '';
}

function isSectionUrl(url: string, section: string, locale: string) {
  return (
    url === `/${locale}/${section}` ||
    url.startsWith(`/${locale}/${section}/`) ||
    url === `/${section}` ||
    url.startsWith(`/${section}/`)
  );
}

function isSectionNode(node: PageTree, section: string, locale: string) {
  const name =
    typeof node?.name === 'string' ? node.name.toLowerCase() : undefined;

  return (
    isSectionUrl(getNodeUrl(node), section, locale) ||
    name === section ||
    getNodeChildren(node).some((child) =>
      isSectionUrl(getNodeUrl(child), section, locale)
    )
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
  const children = getNodeChildren(tree);
  const sectionNodes = children.filter((node: PageTree) =>
    isSectionNode(node, section, locale)
  );
  const sectionNode =
    sectionNodes.find((node: PageTree) => getNodeChildren(node).length > 0) ??
    sectionNodes[0];

  if (!sectionNode) {
    return tree;
  }

  return {
    ...tree,
    children: [sectionNode],
  };
}
