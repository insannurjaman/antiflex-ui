import Link from 'next/link';
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
            Precision UI.
            <br />
            <span>Built to be yours.</span>
          </h1>
          <p>
            A compact system for ambitious SaaS products. Thoughtful components, shared tokens, and
            a clear path from design to code.
          </p>
          <div className="hero-actions flex items-center">
            <Link className="ch-button ch-button--primary ch-button--lg" href="/docs/installation">
              Start building <IconArrowRight />
            </Link>
            <Link className="text-link" href="/dashboard">
              Explore the dashboard <IconArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-facts">
            <span>React + TypeScript</span>
            <span>Tailwind CSS</span>
            <span>MIT core</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="mark-large">
            <Brand compact />
          </div>
          <div className="art-ruler">
            <span>DESIGN</span>
            <span>↔</span>
            <span>CODE</span>
          </div>
          <div className="art-note">
            One language.
            <br />
            Every layer.
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
            All 8 components <IconArrowRight size={16} />
          </Link>
        </div>
        <OverviewSpecimen />
      </section>
      <section className="home-paths" aria-label="Explore Chamfer UI">
        <Link href="/docs/components">
          <IconComponents size={23} />
          <h3>Components</h3>
          <p>Eight original building blocks, with the states that matter.</p>
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
        <Link href="/dashboard">
          <IconLayoutDashboard size={23} />
          <h3>In context</h3>
          <p>A responsive dashboard with real interactions and sample data.</p>
          <span>
            Open the demo <IconArrowUpRight size={16} />
          </span>
        </Link>
      </section>
      <section className="pro-note">
        <IconBraces size={20} />
        <div>
          <strong>A foundation today. More possibilities next.</strong>
          <p>
            Chamfer Pro will extend the system with Figma assets, blocks, and templates. Commerce is
            outside this foundation release.
          </p>
        </div>
      </section>
      <footer className="site-footer">
        <Brand />
        <span>Precision UI for SaaS teams.</span>
        <Link href="/docs/accessibility">Accessibility</Link>
        <span>Foundation · 0.1.0</span>
      </footer>
    </main>
  );
}
