import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

const accentBars = [
  'before:bg-[#ff5a3d]',
  'before:bg-[#2367d1]',
  'before:bg-[#16a34a]',
  'before:bg-[#d97706]',
];

const iconSurfaces = [
  'bg-[#fff1eb] text-[#bd341b] dark:bg-[#4a2118] dark:text-[#ffb19f]',
  'bg-[#eaf1ff] text-[#1d4ed8] dark:bg-[#162b52] dark:text-[#9fc1ff]',
  'bg-[#e9f8ef] text-[#16803d] dark:bg-[#123b27] dark:text-[#8fe0ad]',
  'bg-[#fff4d8] text-[#b45309] dark:bg-[#453113] dark:text-[#ffd27a]',
];

function EmphasizedTitle({ title }: { title?: string }) {
  if (!title) return null;

  const parts = title.split('Claude Code');

  return (
    <>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`}>
          {index > 0 ? (
            <span className="font-mono box-decoration-clone rounded-md bg-[#d9ff4a] px-2 py-0.5 text-[0.86em] text-[#151b2d] shadow-[inset_0_-0.18em_0_rgba(255,90,61,0.28)]">
              Claude Code
            </span>
          ) : null}
          {part}
        </span>
      ))}
    </>
  );
}

function MetricLine({
  label,
  value,
  index,
}: {
  label?: string;
  value?: string;
  index: number;
}) {
  return (
    <div
      className={cn(
        'relative min-w-0 overflow-hidden rounded-lg border border-[#151b2d]/10 bg-white/75 px-4 py-3 shadow-[0_18px_45px_-34px_rgba(21,27,45,0.65)] before:absolute before:inset-y-0 before:left-0 before:w-1 dark:border-white/10 dark:bg-white/[0.075] dark:shadow-none',
        accentBars[index % accentBars.length]
      )}
    >
      <div className="font-mono text-[#151b2d] text-xl font-semibold tabular-nums dark:text-[#f8faf5]">
        {value}
      </div>
      <div className="mt-1 text-xs leading-5 text-[#657083] dark:text-[#aab3c2]">
        {label}
      </div>
    </div>
  );
}

function HubLink({
  item,
  index,
  tone = 'light',
}: {
  item: Record<string, any>;
  index: number;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <Link
      href={item.url || '/'}
      target={item.target || '_self'}
      className={cn(
        'group flex min-w-0 items-center gap-3 rounded-lg border p-3 text-left transition-all duration-200',
        isDark
          ? 'border-white/10 bg-white/[0.055] text-white hover:-translate-y-0.5 hover:border-[#d9ff4a]/55 hover:bg-white/[0.09]'
          : 'border-[#151b2d]/10 bg-white/80 text-[#151b2d] shadow-[0_16px_42px_-34px_rgba(21,27,45,0.72)] hover:-translate-y-0.5 hover:border-[#2367d1]/35 hover:bg-white dark:border-white/10 dark:bg-white/[0.065] dark:text-white dark:shadow-none dark:hover:border-[#d9ff4a]/45 dark:hover:bg-white/[0.1]'
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-md',
          isDark
            ? 'bg-[#d9ff4a] text-[#151b2d]'
            : iconSurfaces[index % iconSurfaces.length]
        )}
      >
        <SmartIcon name={item.icon || 'ArrowRight'} size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-sm font-semibold break-words',
            isDark ? 'text-white' : 'text-[#151b2d] dark:text-[#f8faf5]'
          )}
        >
          {item.title}
        </span>
        {item.description ? (
          <span
            className={cn(
              'mt-1 block text-xs leading-5 break-words',
              isDark ? 'text-white/63' : 'text-[#647084] dark:text-[#aab3c2]'
            )}
          >
            {item.description}
          </span>
        ) : null}
      </span>
      <ArrowRight
        className={cn(
          'size-4 shrink-0 transition-colors',
          isDark
            ? 'text-white/45 group-hover:text-[#d9ff4a]'
            : 'text-[#8791a3] group-hover:text-[#2367d1] dark:text-white/45 dark:group-hover:text-[#d9ff4a]'
        )}
      />
    </Link>
  );
}

export function HomeHub({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const metrics = section.metrics || [];
  const quickLinks = section.quick_links || [];
  const pathItems = section.path || [];
  const topics = section.topics || [];
  const signals = section.signals || [];
  const expansion = section.expansion || [];

  return (
    <main
      id={section.id}
      className={cn(
        'overflow-hidden bg-[#f4f6f1] text-[#151b2d] dark:bg-[#080d13] dark:text-[#f8faf5]',
        section.className,
        className
      )}
    >
      <section className="relative isolate overflow-hidden border-b border-[#151b2d]/10 pt-24 pb-12 dark:border-white/10 md:pt-32 md:pb-18">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(21,27,45,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,27,45,0.08)_1px,transparent_1px)] bg-[size:38px_38px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.075)_1px,transparent_1px)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-20 -z-10 h-32 bg-[linear-gradient(135deg,#ffffff_0%,#ffffff_42%,#d9ff4a_42%,#d9ff4a_50%,#ff5a3d_50%,#ff5a3d_56%,transparent_56%)] opacity-60 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.12)_42%,#d9ff4a_42%,#d9ff4a_50%,#ff5a3d_50%,#ff5a3d_56%,transparent_56%)] dark:opacity-50"
        />

        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)]">
            <div className="min-w-0">
              {section.label ? (
                <div className="inline-flex max-w-full items-center gap-2 rounded-md border border-[#151b2d]/15 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#5e687a] shadow-sm dark:border-white/12 dark:bg-white/[0.075] dark:text-[#cad2df]">
                  <CheckCircle2 className="size-3.5 shrink-0 text-[#2367d1] dark:text-[#d9ff4a]" />
                  <span className="truncate">{section.label}</span>
                </div>
              ) : null}

              <h1 className="font-serif mt-7 max-w-4xl text-[2.18rem] leading-[1.06] font-black break-words text-balance text-[#151b2d] dark:text-[#f8faf5] sm:text-5xl md:text-[4.85rem] md:leading-[1.04]">
                <EmphasizedTitle title={section.title} />
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 break-words text-[#5f697c] dark:text-[#aeb7c6] md:text-lg">
                {section.description}
              </p>

              {section.buttons ? (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {section.buttons.map((button, idx) => (
                    <Link
                      key={idx}
                      href={button.url || '/'}
                      target={button.target || '_self'}
                      className={cn(
                        'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#2367d1] focus-visible:outline-none',
                        idx === 0
                          ? 'bg-[#151b2d] text-white shadow-[0_18px_44px_-22px_rgba(21,27,45,0.85)] hover:-translate-y-0.5 hover:bg-[#0f172a] dark:bg-[#d9ff4a] dark:text-[#151b2d] dark:hover:bg-[#e5ff73]'
                          : 'border border-[#151b2d]/12 bg-white/78 text-[#151b2d] shadow-sm hover:-translate-y-0.5 hover:border-[#ff5a3d]/40 hover:bg-white dark:border-white/12 dark:bg-white/[0.075] dark:text-white dark:hover:border-[#ff5a3d]/55 dark:hover:bg-white/[0.12]'
                      )}
                    >
                      {button.icon ? (
                        <SmartIcon name={button.icon as string} size={16} />
                      ) : null}
                      <span>{button.title}</span>
                    </Link>
                  ))}
                </div>
              ) : null}

              {metrics.length > 0 ? (
                <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                  {metrics.map((item: Record<string, any>, idx: number) => (
                    <MetricLine
                      key={idx}
                      index={idx}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative rounded-lg border border-[#151b2d] bg-[#111827] text-white shadow-[0_28px_80px_-34px_rgba(17,24,39,0.95)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="size-2 rounded-full bg-[#ff5a3d]" />
                  <span className="size-2 rounded-full bg-[#f4c430]" />
                  <span className="size-2 rounded-full bg-[#d9ff4a]" />
                  <span className="ml-2 text-sm font-semibold">
                    {section.map_title}
                  </span>
                </div>
                <span className="font-mono text-xs text-white/50">
                  {section.map_meta}
                </span>
              </div>

              <div className="border-b border-white/10 px-4 py-3 font-mono text-xs text-[#d9ff4a]">
                {section.command_text || '$ claude-code101 --map --focus=tutorial'}
              </div>

              <div className="grid gap-3 p-4">
                {quickLinks.map((item: Record<string, any>, idx: number) => (
                  <HubLink item={item} index={idx} key={idx} tone="dark" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#151b2d]/10 py-10 dark:border-white/10 md:py-14">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-4">
            {pathItems.map((item: Record<string, any>, idx: number) => (
              <div
                className={cn(
                  'group relative min-h-[176px] overflow-hidden rounded-lg border border-[#151b2d]/10 bg-white p-5 shadow-[0_22px_60px_-42px_rgba(21,27,45,0.82)] before:absolute before:inset-x-0 before:top-0 before:h-1',
                  'dark:border-white/10 dark:bg-white/[0.065] dark:shadow-none',
                  accentBars[idx % accentBars.length]
                )}
                key={idx}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold text-[#7b8495] tabular-nums dark:text-[#96a1b4]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-md',
                      iconSurfaces[idx % iconSurfaces.length]
                    )}
                  >
                    <SmartIcon name={item.icon || 'CircleDot'} size={18} />
                  </span>
                </div>
                <h2 className="mt-6 text-lg font-bold text-[#151b2d] dark:text-[#f8faf5]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#667085] dark:text-[#aab3c2]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#111827] bg-[#111827] py-14 text-white dark:border-white/10 dark:bg-[#0b111b] md:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[330px_minmax(0,1fr)]">
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-[#d9ff4a]">
                {section.topic_label}
              </p>
              <h2 className="font-serif mt-4 text-3xl font-black text-balance md:text-5xl">
                {section.topic_title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/64">
                {section.topic_description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {topics.map((item: Record<string, any>, idx: number) => (
                <HubLink item={item} index={idx} key={idx} tone="dark" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f3] py-14 dark:bg-[#080d13] md:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="font-serif text-3xl font-black text-balance text-[#151b2d] dark:text-[#f8faf5] md:text-5xl">
                {section.signal_title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#647084] dark:text-[#aab3c2]">
                {section.signal_description}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {signals.map((item: Record<string, any>, idx: number) => (
                  <div
                    className="rounded-lg border border-[#151b2d]/10 bg-white p-4 shadow-[0_18px_50px_-38px_rgba(21,27,45,0.72)] dark:border-white/10 dark:bg-white/[0.065] dark:shadow-none"
                    key={idx}
                  >
                    <span
                      className={cn(
                        'flex size-9 items-center justify-center rounded-md',
                        iconSurfaces[idx % iconSurfaces.length]
                      )}
                    >
                      <SmartIcon name={item.icon || 'CheckCircle2'} size={18} />
                    </span>
                    <h3 className="mt-4 text-sm font-bold text-[#151b2d] dark:text-[#f8faf5]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#667085] dark:text-[#aab3c2]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-[#151b2d]/10 bg-[#151b2d] p-5 text-white shadow-[0_24px_70px_-38px_rgba(21,27,45,0.9)] dark:border-white/10 dark:bg-[#0b111b]">
              <div className="font-mono text-sm font-semibold text-[#d9ff4a]">
                {section.expansion_title}
              </div>
              <div className="mt-5 grid gap-2">
                {expansion.map((item: Record<string, any>, idx: number) => (
                  <div
                    key={idx}
                    className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2"
                  >
                    <span className="min-w-0 truncate text-sm">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-xs text-white/55">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              {section.expansion_tip ? (
                <p className="mt-5 text-xs leading-6 text-white/56">
                  {section.expansion_tip}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
