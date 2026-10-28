import '@fontsource/dm-sans/100.css';
import '@fontsource/dm-sans/100-italic.css';
import '@fontsource/dm-sans/200.css';
import '@fontsource/dm-sans/200-italic.css';
import '@fontsource/dm-sans/300.css';
import '@fontsource/dm-sans/300-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/400-italic.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/500-italic.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/600-italic.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/700-italic.css';
import '@fontsource/dm-sans/800.css';
import '@fontsource/dm-sans/800-italic.css';
import '@fontsource/dm-sans/900.css';
import '@fontsource/dm-sans/900-italic.css';
import '@fontsource/anybody/100.css';
import '@fontsource/anybody/200.css';
import '@fontsource/anybody/300.css';
import '@fontsource/anybody/400.css';
import '@fontsource/anybody/500.css';
import '@fontsource/anybody/600.css';
import '@fontsource/anybody/700.css';
import '@fontsource/anybody/800.css';
import '@fontsource/anybody/900.css';
import '@fontsource/anybody/100-italic.css';
import '@fontsource/anybody/200-italic.css';
import '@fontsource/anybody/300-italic.css';
import '@fontsource/anybody/400-italic.css';
import '@fontsource/anybody/500-italic.css';
import '@fontsource/anybody/600-italic.css';
import '@fontsource/anybody/700-italic.css';
import '@fontsource/anybody/800-italic.css';
import '@fontsource/anybody/900-italic.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/400-italic.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/space-mono/700-italic.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from '../components/theme';
import { previousThemeKey } from '../components/storage-migration';
import { SiteHeader } from '../components/site-header';
export const metadata: Metadata = {
  metadataBase: new URL('https://antiflex-ui.vercel.app'),
  title: { default: 'antiflex/ui — less flex. More function.', template: '%s — antiflex/ui' },
  description:
    'A design system that favors familiar patterns, thoughtful defaults, and intuitive experiences over unnecessary complexity.',
  openGraph: {
    type: 'website',
    siteName: 'antiflex/ui',
    locale: 'en_US',
    title: 'antiflex/ui — less flex. More function.',
    description: 'Familiar patterns, thoughtful defaults, and intuitive experiences.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'antiflex/ui — less flex. More function.. Familiar patterns. Thoughtful defaults.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'antiflex/ui — less flex. More function.',
    description: 'Familiar patterns, thoughtful defaults, and intuitive experiences.',
    images: [
      {
        url: '/og-image.png',
        alt: 'antiflex/ui — less flex. More function.. Familiar patterns. Thoughtful defaults.',
      },
    ],
  },
};
const init = `try{var t=localStorage.getItem('antiflex-theme');if(t===null){t=localStorage.getItem('${previousThemeKey}');if(t==='dark'||t==='light')localStorage.setItem('antiflex-theme',t);}document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{document.documentElement.dataset.theme='light'}`;
// Workspace-tools extension contract: preserve antiflex's neutral square geometry,
// DM Sans interfaces and ruled docs shell. Ordinary navigation stays separate from
// application menus; selection keeps query/commit separate; date tools stay date-only.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!-- THESIS: Precision UI with matching design and code. OWN-WORLD: Neutral actions, neutral grays, Anybody display, DM Sans interfaces, Space Mono labels, square geometry. STORY: Explore, inspect, use components. FIRST VIEWPORT: Ruled frame, large left headline, original geometric antiflex artwork on the right, charcoal install action; a working specimen follows. FORM: User-pinned Greptile reference overrides direction roll 42075705; horizontal app navigation, ruled marketing frame. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md --><!-- THESIS: Commands remain beside their SaaS work. OWN-WORLD: Inherit flat neutrals, neutral focus, thin rules, DM Sans items and Space Mono shortcut hints. STORY: Open, navigate and run local project or order actions, with visible touch alternatives. FIRST VIEWPORT: Existing docs shell, title and project specimen; compact action list opens beside its named trigger. FORM: Scoped menu extension, menus-extension-2026-10-20; preserve incumbent composition. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md --><!-- THESIS: Feedback keeps SaaS work in focus. OWN-WORLD: Existing flat neutrals, neutral focus, DM Sans and restrained semantic icons. STORY: Save, review, undo and dismiss local changes without focus theft. FIRST VIEWPORT: Existing docs shell and a local project task; feedback appears beside the work. FORM: Scoped Toast extension preserves the incumbent visual world. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->',
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: init }} />
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
