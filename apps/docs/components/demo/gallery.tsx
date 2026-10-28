'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, TextField, Button, Empty } from '@antiflex/ui';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconSearch,
  IconLayoutSidebar,
  IconLayoutNavbar,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { demoPages, demoPath } from './catalog';
import { useTheme } from '../theme';
const categories = ['All examples', 'Workspace', 'Account', 'Commerce', 'Getting started'];
export function ExamplesGallery() {
  const [category, setCategory] = useState('All examples');
  const [query, setQuery] = useState('');
  const { theme } = useTheme();
  const pages = demoPages.filter(
    (p) =>
      (category === 'All examples' || p.category === category) &&
      `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main id="main-content" className="examples-page">
      <section className="examples-intro">
        <div>
          <h1>
            See the system
            <br />
            at work.
          </h1>
          <p>
            One connected workspace. Thirteen complete screens. Explore how antiflex/ui brings the
            details together, from the first sign-in to the final checkout.
          </p>
          <div className="examples-intro-actions">
            <Link href="/demo" className="af-button af-button--primary af-button--lg">
              Open the workspace <IconArrowRight size={17} />
            </Link>
            <Link href="/docs/components" className="demo-inline-link">
              Explore components <IconArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="examples-intro-note">
          <strong>Orbit, a SaaS workspace.</strong>
          <p>
            Switch navigation layouts. Make a customer record. Move a project forward. Save your
            preferences. Every example is a working part of the same demo.
          </p>
          <dl>
            <div>
              <dt>Navigation</dt>
              <dd>Sidebar + top bar</dd>
            </div>
            <div>
              <dt>Appearance</dt>
              <dd>Light + dark</dd>
            </div>
            <div>
              <dt>Interactions</dt>
              <dd>Working local flows</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="examples-layouts" aria-label="Navigation examples">
        <Link href="/demo">
          <IconLayoutSidebar size={21} />
          <div>
            <h2>Side navigation</h2>
            <p>More room for a growing workspace.</p>
          </div>
          <IconArrowUpRight size={18} />
        </Link>
        <Link href="/demo/analytics?layout=top">
          <IconLayoutNavbar size={21} />
          <div>
            <h2>Top navigation</h2>
            <p>The same workflow, a different frame.</p>
          </div>
          <IconArrowUpRight size={18} />
        </Link>
      </section>
      <section aria-labelledby="example-library">
        <div className="examples-library-heading">
          <div>
            <h2 id="example-library">Find your next starting point.</h2>
            <p>Built with the same tokens and components as the library.</p>
          </div>
          <TextField
            label="Search examples"
            hideLabel
            leading={<IconSearch size={16} />}
            placeholder="Search examples…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="examples-filters" role="group" aria-label="Example category">
          {categories.map((c) => (
            <Button
              key={c}
              variant={c === category ? 'primary' : 'ghost'}
              size="sm"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
          <span role="status">
            {pages.length} {pages.length === 1 ? 'example' : 'examples'}
          </span>
        </div>
        <div className="examples-grid">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={demoPath(p.slug)}
              className="examples-item"
              aria-label={`Open ${p.title.toLowerCase()} example`}
            >
              <div className="examples-image">
                <Image
                  src={`/examples/antiflex-${p.slug || 'overview'}-${theme}.webp`}
                  alt={`Orbit ${p.title.toLowerCase()} screen in ${theme} mode`}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority={p.slug === ''}
                />
              </div>
              <div className="examples-item-caption">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <IconArrowUpRight size={20} />
              </div>
              <span className="examples-item-category">{p.category}</span>
            </Link>
          ))}
        </div>
        {!pages.length && (
          <Empty
            title={<h2>No examples found</h2>}
            description="Try a different search or view the complete collection."
          >
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('');
                setCategory('All examples');
              }}
            >
              Show all examples
            </Button>
          </Empty>
        )}
      </section>
      <section className="examples-close">
        <div>
          <h2>From example to your product.</h2>
          <p>
            These flows use original antiflex components, shared tokens, and native browser
            behavior. Explore the implementation, then bring your own product into the frame.
          </p>
        </div>
        <Link href="/docs/installation" className="af-button af-button--primary af-button--md">
          Start building <IconArrowRight size={16} />
        </Link>
      </section>
      <footer className="examples-footer">
        <span>Sample data throughout. Checkout and authentication are interactive previews.</span>
        <Link href="/dashboard">
          Original foundation dashboard <IconArrowUpRight size={14} />
        </Link>
      </footer>
    </main>
  );
}
