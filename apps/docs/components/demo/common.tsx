'use client';
import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Badge, Empty, Button } from '@antiflex/ui';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
export function DemoLink({
  href,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }) {
  const params = useSearchParams();
  const url = new URL(href, 'https://antiflex.local');
  if (params.get('layout') === 'top') url.searchParams.set('layout', 'top');
  return (
    <Link {...props} href={url.pathname + url.search + url.hash} className={className}>
      {children}
    </Link>
  );
}
export function PageHeading({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="demo-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="demo-actions">{actions}</div>}
    </div>
  );
}
export function Panel({
  title,
  description,
  actions,
  children,
  className = '',
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`demo-panel ${className}`}>
      <div className="demo-panel-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
export function Status({ value }: { value: string }) {
  return (
    <Badge
      variant={
        ['Active', 'Complete', 'Paid', 'Owner'].includes(value)
          ? 'success'
          : ['Trial', 'Invited', 'Review', 'Pending'].includes(value)
            ? 'warning'
            : 'neutral'
      }
    >
      {value}
    </Badge>
  );
}
export function NoResults({
  title = 'No results found',
  description = 'Try a different search or clear your filters.',
  onClear,
}: {
  title?: string;
  description?: string;
  onClear?: () => void;
}) {
  return (
    <Empty icon={<IconSearch />} title={<h2>{title}</h2>} description={description}>
      {onClear && (
        <Button variant="secondary" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </Empty>
  );
}
export function NextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <DemoLink className="demo-inline-link" href={href}>
      {children}
      <IconArrowRight size={16} />
    </DemoLink>
  );
}
export function StatStrip({ items }: { items: { label: string; value: string; note: string }[] }) {
  return (
    <dl className="demo-stats">
      {items.map((i) => (
        <div key={i.label}>
          <dt>{i.label}</dt>
          <dd>
            <span className="demo-stat-value">{i.value}</span>
            <span className="demo-stat-note">{i.note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
