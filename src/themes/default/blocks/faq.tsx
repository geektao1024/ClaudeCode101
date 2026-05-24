'use client';

import { ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Section } from '@/shared/types/blocks/landing';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={`border-y border-[#151b2d]/10 bg-[#f4f6f1] py-16 text-[#151b2d] md:py-24 dark:border-white/10 dark:bg-[#080d13] dark:text-[#f8faf5] ${section.className || ''} ${className || ''}`}
    >
      <div className="container max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          {section.label ? (
            <p className="font-mono text-sm font-semibold text-[#2367d1] dark:text-[#d9ff4a]">
              {section.label}
            </p>
          ) : null}
          <h2 className="mt-4 font-serif text-3xl leading-tight font-black text-balance md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#647084] dark:text-[#aab3c2]">
            {section.description}
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-4xl rounded-lg border border-[#151b2d]/10 bg-white/72 p-2 shadow-[0_24px_70px_-46px_rgba(21,27,45,0.82)] dark:border-white/10 dark:bg-white/[0.055] dark:shadow-none">
          <Accordion type="single" collapsible className="grid w-full gap-2">
            {section.items?.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={item.question || item.title || ''}
                className="w-full overflow-hidden rounded-md border border-[#151b2d]/10 bg-white px-0 py-0 shadow-none data-[state=open]:border-[#2367d1]/35 dark:border-white/10 dark:bg-[#111827] dark:data-[state=open]:border-[#d9ff4a]/35"
              >
                <AccordionTrigger className="w-full cursor-pointer px-4 py-4 text-left text-sm font-semibold break-words text-[#151b2d] hover:no-underline sm:text-base dark:text-[#f8faf5]">
                  {item.question || item.title || ''}
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <p className="max-w-3xl text-sm leading-7 text-[#647084] dark:text-[#aab3c2]">
                    {item.answer || item.description || ''}
                  </p>
                  {item.url ? (
                    <Link
                      href={item.url}
                      target={item.target || '_self'}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-[#151b2d]/10 bg-[#f4f6f1] px-3 py-2 text-xs font-semibold text-[#151b2d] transition-colors hover:border-[#2367d1]/45 hover:bg-[#eef3ff] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#f8faf5] dark:hover:border-[#d9ff4a]/45 dark:hover:bg-white/[0.1]"
                    >
                      <span>{item.link_title || 'Open full FAQ'}</span>
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {section.tip ? (
          <p
            className="mx-auto mt-6 max-w-4xl rounded-lg border border-[#151b2d]/10 bg-white/70 px-4 py-3 text-sm leading-6 text-[#647084] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#aab3c2]"
            dangerouslySetInnerHTML={{ __html: section.tip || '' }}
          />
        ) : null}
      </div>
    </section>
  );
}
