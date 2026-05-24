import type { TOCItemType as FumadocsTOCItemType } from 'fumadocs-core/server';
import { slug } from 'github-slugger';

export type TOCItemType = FumadocsTOCItemType;

export function generateTOC(content: string): TOCItemType[] {
  if (!content) return [];

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TOCItemType[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    toc.push({
      title: text,
      url: `#${slug(text)}`,
      depth: level,
    });
  }

  return toc;
}
