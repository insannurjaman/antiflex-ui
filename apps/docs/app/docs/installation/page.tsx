import { Code } from '../../../components/code';
export const metadata = { title: 'Installation' };
const release = '0.1.0-alpha.2';
export default function Installation() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Getting started</div>
      <h1>Start building.</h1>
      <p className="doc-lead">Use antiflex/ui in your React app, or explore the full workspace.</p>
      <h2>Copy components into your project</h2>
      <p>
        Start with React 19 and Tailwind CSS 4 configured in your project. The antiflex installer
        copies editable source, tokens, styles, and self-hosted fonts into your app. Node.js 22.18
        or newer is required.
      </p>
      <p>
        The current alpha includes all 50 component families. Run the versioned antiflex installer:
      </p>
      <Code label="Your React project">{`npx antiflex-ui@${release} init --css src/index.css\nnpx antiflex-ui@${release} add button text-field`}</Code>
      <p>
        Prefer a local development dependency?{' '}
        <a href={`/downloads/antiflex-ui-${release}.tgz`}>Download antiflex-ui {release}</a>, then
        install it in your app:
      </p>
      <Code label="Terminal">{`npm install -D antiflex-ui@${release}\nnpx antiflex init --css src/index.css\nnpx antiflex add button text-field`}</Code>
      <p>
        Initialization installs local tokens, Tailwind mappings, component styles, and Fontsource
        dependencies for DM Sans, Anybody, and Space Mono. Use <code>--skip-install</code> if you
        prefer to install font dependencies yourself.
      </p>
      <Code>{`'use client';\n\nimport { Button } from './components/antiflex/button';\nimport { TextField } from './components/antiflex/text-field';\n\nexport function ProjectForm() {\n  return <form onSubmit={(event) => event.preventDefault()}>\n    <TextField label="Project name" name="project" required />\n    <Button type="submit">Save changes</Button>\n  </form>;\n}`}</Code>
      <p>
        Defaults are <code>src/components/antiflex</code> and <code>src/styles/antiflex</code> when
        your app has a <code>src</code> directory; otherwise they are{' '}
        <code>components/antiflex</code> and <code>styles/antiflex</code>. Configuration is saved in{' '}
        <code>antiflex.json</code>.
      </p>
      <h2>Choose and own your source</h2>
      <Code label="Terminal">
        {
          'npx antiflex list\nnpx antiflex add app-shell\n# AppShell includes its Button dependency\nnpx antiflex add --all\nnpx antiflex add button --dry-run'
        }
      </Code>
      <p>
        These commands use the development dependency installed above. Edit copied components
        freely. Repeated installation skips identical files and preserves customized dependencies.
        Replacing an edited component requires <code>--force</code>; the previous file is backed up
        under <code>.antiflex/backups</code>.
      </p>
      <p>
        Set <code>data-theme="light"</code> or <code>data-theme="dark"</code> on your document or a
        local theme boundary. CSS variables use <code>--af-</code>; component classes use{' '}
        <code>af-</code>. Semantic utilities include <code>bg-surface</code>,{' '}
        <code>text-foreground</code>, and <code>border-border</code>.
      </p>
      <h2>Run the workspace locally</h2>
      <p>Use Node.js 24 and pnpm 10. From the repository root:</p>
      <Code label="Terminal">{'corepack enable\npnpm install\npnpm dev'}</Code>
      <p>
        Open <code>http://localhost:3000</code>. Explore <code>/examples</code> for the gallery and{' '}
        <code>/demo</code> for the connected SaaS workspace.
      </p>
      <h2>Use workspace packages</h2>
      <p>
        Within this pnpm workspace, add <code>@antiflex/ui</code> and <code>@antiflex/tokens</code>{' '}
        as <code>workspace:*</code> dependencies. These are private workspace packages; the
        installer copies their source for independent applications.
      </p>
      <Code>{`import { Button } from '@antiflex/ui';\nimport '@antiflex/ui/styles.css';`}</Code>
      <Code label="Tailwind CSS">
        {
          '@import "tailwindcss";\n@import "@antiflex/tokens/tailwind";\n@import "@antiflex/ui/styles.css";'
        }
      </Code>
      <h2>Build an installer from source</h2>
      <Code label="Workspace terminal">{`pnpm installer:pack\n# artifacts/antiflex-ui-${release}.tgz`}</Code>
      <h2>Explore and verify</h2>
      <p>
        <a href="https://antiflex-storybook.vercel.app">Open Storybook</a> to inspect component
        states, controls, and both themes.
      </p>
      <Code label="Terminal">
        {'pnpm storybook\n# http://localhost:6006\npnpm check\npnpm installer:smoke'}
      </Code>
    </>
  );
}
