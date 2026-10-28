import Link from 'next/link';
import { componentCount } from '@antiflex/ui/catalog';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconBraces,
  IconComponents,
  IconPalette,
  IconLayoutDashboard,
} from '@tabler/icons-react';
import { Brand } from '../components/brand';
import { OverviewSpecimen } from '../components/specimens';
export default function Home() {
  return (
    <main id="main-content" className="home">
      <section className="home-hero">
        <div className="hero-copy min-w-0">
          <h1>
            less flex.
            <br />
            <span>More function.</span>
          </h1>
          <p>
            A design system that favors familiar patterns, thoughtful defaults, and intuitive
            experiences over unnecessary complexity.
          </p>
          <div className="hero-actions flex items-center">
            <Link className="af-button af-button--primary af-button--lg" href="/docs/installation">
              Start building <IconArrowRight />
            </Link>
            <Link className="text-link" href="/examples">
              Explore the examples <IconArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-facts">
            <span>React + TypeScript</span>
            <span>Tailwind CSS</span>
            <span>MIT core</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <svg className="hero-symbol" viewBox="0 0 440 440" fill="none">
            <defs>
              <pattern id="antiflex-hatch" width="7" height="7" patternUnits="userSpaceOnUse">
                <path d="M0 7L7 0" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <path d="M100 44H300L360 104V304L300 364H100L40 304V104Z" fill="url(#antiflex-hatch)" />
            <path
              d="M140 76H340L400 136V336L340 396H140L80 336V136Z"
              fill="var(--af-semantic-brand)"
              stroke="currentColor"
            />
            <path
              d="M160 120H310L354 164V314L310 358H160L116 314V164Z"
              fill="var(--af-semantic-brand-foreground)"
            />
            <path
              fillRule="evenodd"
              d="M160 314L207 174H249L296 314H254L244 280H212L202 314ZM222 246H234L228 222Z"
              fill="var(--af-semantic-brand)"
            />
            <path
              d="M40 24V4M30 14H50M400 422V402M390 412H410M12 104H60M380 336H428"
              stroke="currentColor"
            />
            <path d="M60 398H108M84 374V422" stroke="currentColor" />
          </svg>
          <div className="art-ruler">
            <span>FIGMA</span>
            <span>REACT</span>
            <span>ONE SYSTEM</span>
          </div>
        </div>
      </section>
      <section className="home-specimen">
        <div className="section-heading">
          <div>
            <h2>A system you can put to work.</h2>
            <p>Small details. Complete components. Try them below.</p>
          </div>
          <Link className="text-link" href="/docs/components">
            All {componentCount} components <IconArrowRight size={16} />
          </Link>
        </div>
        <OverviewSpecimen />
      </section>
      <section className="home-paths" aria-label="Explore antiflex/ui">
        <Link href="/docs/components">
          <IconComponents size={23} />
          <h3>Components</h3>
          <p>Original building blocks, with the states that matter.</p>
          <span>
            Explore the library <IconArrowUpRight size={16} />
          </span>
        </Link>
        <Link href="/docs/foundations">
          <IconPalette size={23} />
          <h3>Foundations</h3>
          <p>Color, type, spacing, and motion. One shared token language.</p>
          <span>
            Meet the system <IconArrowUpRight size={16} />
          </span>
        </Link>
        <Link href="/examples">
          <IconLayoutDashboard size={23} />
          <h3>In context</h3>
          <p>A connected SaaS workspace, with working flows and sample data.</p>
          <span>
            Explore the demos <IconArrowUpRight size={16} />
          </span>
        </Link>
      </section>
      <section className="pro-note">
        <IconBraces size={20} />
        <div>
          <strong>A foundation today. More possibilities next.</strong>
          <p>
            antiflex Pro will extend the system with Figma assets, blocks, and templates. Commerce
            is outside this foundation release.
          </p>
        </div>
      </section>
      <footer className="site-footer">
        <Brand />
        <span>less flex. More function.</span>
        <Link href="/docs/accessibility">Accessibility</Link>
        <span>Foundation · 0.1.0</span>
      </footer>
    </main>
  );
}
