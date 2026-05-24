import type { ReactNode } from 'react';

type HoverEffectItem = {
  title: string;
  description: string;
  icon?: ReactNode;
  link?: string;
};

export function HoverEffect({
  items,
  className = '',
}: {
  items: HoverEffectItem[];
  className?: string;
}) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`}>
      {items.map((item) => (
        <a
          key={item.title}
          href={item.link || '#'}
          className="group rounded-lg border border-border bg-card p-5 no-underline transition-colors hover:border-primary/60 hover:bg-accent/40"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            {item.icon}
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="m-0 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </a>
      ))}
    </div>
  );
}
