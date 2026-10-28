'use client';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  AppShell,
  Avatar,
  Badge,
  Button,
  CommandDialog,
  NativeSelect,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@antiflex/ui';
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconBell,
  IconChevronDown,
  IconLayoutDashboard,
  IconChartBar,
  IconShoppingBag,
  IconUsers,
  IconFolder,
  IconActivity,
  IconSettings,
  IconCreditCard,
  IconUser,
  IconSearch,
  IconLayoutSidebar,
  IconLayoutNavbar,
} from '@tabler/icons-react';
import { demoPages, demoPath } from './catalog';
import { DemoLink } from './common';
import { useDemo } from './store';
const navIcons = [
  IconLayoutDashboard,
  IconChartBar,
  IconShoppingBag,
  IconUsers,
  IconFolder,
  IconActivity,
  IconUsers,
  IconSettings,
  IconUser,
  IconCreditCard,
];
export function DemoShell({ children }: { children: ReactNode }) {
  const { state, reset } = useDemo();
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const layout = params.get('layout') === 'top' ? 'top' : 'sidebar';
  const standalone = ['/demo/sign-in', '/demo/onboarding'].includes(pathname);
  const [search, setSearch] = useState(false);
  const current = demoPages.find((p) => demoPath(p.slug) === pathname) ?? demoPages[0];
  const navigate = (href: string) => router.push(href + (layout === 'top' ? '?layout=top' : ''));
  const nav = (
    <nav className="demo-nav" aria-label="Orbit pages">
      {demoPages.slice(0, 10).map((p, i) => {
        const Icon = navIcons[i];
        return (
          <DemoLink
            href={demoPath(p.slug)}
            key={p.slug}
            aria-current={pathname === demoPath(p.slug) ? 'page' : undefined}
          >
            <Icon size={17} />
            <span>{p.title}</span>
            {p.slug === 'projects' && (
              <span className="demo-nav-count">
                {state.projects.filter((p) => p.status !== 'Complete').length}
              </span>
            )}
          </DemoLink>
        );
      })}
    </nav>
  );
  return (
    <>
      <div className="demo-toolbar">
        <Link href="/examples" className="demo-back">
          <IconArrowLeft size={16} />
          <span>All examples</span>
        </Link>
        <span className="demo-toolbar-title">Orbit SaaS workspace</span>
        <div className="demo-toolbar-controls">
          {!standalone && (
            <>
              <label className="af-sr-only" htmlFor="demo-layout">
                Navigation layout
              </label>
              <NativeSelect
                id="demo-layout"
                size="sm"
                value={layout}
                onChange={(e) => {
                  const next = new URLSearchParams(params.toString());
                  if (e.target.value === 'top') next.set('layout', 'top');
                  else next.delete('layout');
                  router.replace(pathname + (next.size ? '?' + next : ''), { scroll: false });
                }}
              >
                <option value="sidebar">Side navigation</option>
                <option value="top">Top navigation</option>
              </NativeSelect>
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger variant="ghost" size="sm">
              Reset demo
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset this sample workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your local demo edits and receipts will be replaced with the original sample data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my changes</AlertDialogCancel>
                <AlertDialogAction onClick={() => reset()}>Reset sample data</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <AppShell
        data-standalone={['/demo/sign-in', '/demo/onboarding'].includes(pathname) || undefined}
        navigationLayout={layout}
        className="showcase-shell"
        navigationLabel="Orbit navigation"
        header={
          <>
            <DemoLink href="/demo" className="demo-workspace-brand">
              <span className="demo-orbit-mark" aria-hidden="true">
                O
              </span>
              <strong>{state.workspace.name}</strong>
              <Badge size="sm">Demo</Badge>
            </DemoLink>
            <span className="demo-header-location">{current.title}</span>
            <div className="demo-header-tools">
              <Button variant="ghost" aria-label="Find a page" onClick={() => setSearch(true)}>
                <IconSearch size={18} />
                <span className="demo-search-label">Find a page</span>
              </Button>
              <DemoLink
                href="/demo/activity"
                className="demo-icon-link"
                aria-label="View workspace activity"
              >
                <IconBell size={18} />
              </DemoLink>
              <DropdownMenu>
                <DropdownMenuTrigger variant="ghost" aria-label="Open account menu">
                  <Avatar size="sm" alt={state.profile.name} />
                  <IconChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" aria-label="Account actions">
                  <DropdownMenuItem onSelect={() => navigate('/demo/profile')}>
                    Your profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate('/demo/settings')}>
                    Workspace settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => navigate('/demo/sign-in')}>
                    Preview sign in
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        }
        sidebar={
          <>
            {nav}
            <div className="demo-nav-footer">
              <p>One system. Every workflow.</p>
              <Link href="/docs/components">
                Explore the components <IconArrowUpRight size={14} />
              </Link>
              <DemoLink href="/demo/onboarding">
                Try workspace setup <IconArrowUpRight size={14} />
              </DemoLink>
              <div className="demo-member-summary">
                <Avatar alt={state.profile.name} size="sm" />
                <div>
                  <strong>{state.profile.name}</strong>
                  <span>Sample account</span>
                </div>
              </div>
            </div>
          </>
        }
      >
        <div
          className="demo-page"
          data-density={state.workspace.compact ? 'compact' : 'comfortable'}
        >
          {children}
        </div>
        <footer className="demo-footer">
          <span>Sample data · Changes stay in this browser</span>
          <Link href="/docs">
            Built with antiflex/ui <IconArrowUpRight size={13} />
          </Link>
        </footer>
      </AppShell>
      <CommandDialog
        open={search}
        onOpenChange={setSearch}
        title="Find a page"
        description="Jump to any example in the Orbit workspace."
        label="Search Orbit pages"
        placeholder="Search pages…"
        items={demoPages.map((p) => ({
          value: p.slug || 'overview',
          label: p.title,
          description: p.description,
          onSelect: () => navigate(demoPath(p.slug)),
        }))}
      />
    </>
  );
}
