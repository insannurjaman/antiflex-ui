import type { Metadata } from 'next';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { ThemeProvider } from '../components/theme';
import { SiteHeader } from '../components/site-header';
export const metadata: Metadata = {
  title: { default: 'Chamfer UI — Precision UI for SaaS teams', template: '%s — Chamfer UI' },
  description:
    'An original React design system. Matching tokens, accessible components, Figma foundations, and a compact SaaS dashboard.',
};
const init = `try{var t=localStorage.getItem('chamfer-theme');document.documentElement.dataset.theme=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{document.documentElement.dataset.theme='light'}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!-- THESIS: Precision UI with matching design and code. OWN-WORLD: Cool neutral, restrained cyan, IBM Plex, thin borders, compact geometry. STORY: Explore, inspect, use components. FIRST VIEWPORT: Documentation navigation and a working specimen. FORM: User-pinned technical compact foundation; seed e5c25e48. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->',
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: init }} />
        <ThemeProvider>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
