import { Code } from '../../../components/code';
export const metadata = { title: 'Installation' };
export default function Installation() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Getting started</div>
      <h1>Start building.</h1>
      <p className="doc-lead">
        Explore the workspace or copy editable components into your own React app.
      </p>
      <h2>Run the foundation locally</h2>
      <p>Use Node.js 24 and pnpm 10. From the repository root:</p>
      <Code label="Terminal">{'corepack enable\npnpm install\npnpm dev'}</Code>
      <p>
        The site runs at <code>http://localhost:3000</code>. Open <code>/dashboard</code> for the
        working example.
      </p>
      <h2>Copy components into your project</h2>
      <p>
        The source installer is available as a local alpha. First build its tarball from the Chamfer
        repository:
      </p>
      <Code label="Chamfer repository">
        {'pnpm installer:pack\n# Creates artifacts/chamfer-ui-0.1.0-alpha.1.tgz'}
      </Code>
      <p>
        In an existing React 19 app with Tailwind CSS 4 configured, install that tarball and connect
        your entry stylesheet. Replace the absolute path with your checkout location.
      </p>
      <Code label="Your React project">
        {
          'pnpm add -D /absolute/path/to/DS1/artifacts/chamfer-ui-0.1.0-alpha.1.tgz\npnpm exec chamfer init --css src/index.css\npnpm exec chamfer add button text-field'
        }
      </Code>
      <p>
        Initialization adds local tokens, component styles, Tailwind mappings, and self-hosted IBM
        Plex Latin fonts. It installs the Fontsource dependencies with your project’s package
        manager. Use <code>--skip-install</code> to install dependencies yourself.
      </p>
      <Code>{`'use client';\n\nimport { Button } from './components/chamfer/button';\nimport { TextField } from './components/chamfer/text-field';\n\nexport function ProjectForm() {\n  return <form onSubmit={(event) => event.preventDefault()}>\n    <TextField label="Project name" name="project" required />\n    <Button type="submit">Save changes</Button>\n  </form>;\n}`}</Code>
      <p>
        Defaults are <code>src/components/chamfer</code> and <code>src/styles/chamfer</code> when
        your app has a <code>src</code> directory. Otherwise they are{' '}
        <code>components/chamfer</code> and <code>styles/chamfer</code>. Paths are recorded in{' '}
        <code>chamfer.json</code>.
      </p>
      <h2>Choose and own your source</h2>
      <Code label="Terminal">
        {
          'pnpm exec chamfer list\npnpm exec chamfer add app-shell\n# AppShell also includes its Button dependency\npnpm exec chamfer add --all\npnpm exec chamfer add button --dry-run'
        }
      </Code>
      <p>
        Edit copied components freely. Repeated installation skips identical files and preserves
        customized dependencies. Replacing a customized component requires <code>--force</code>; its
        previous source is backed up under <code>.chamfer/backups</code>.
      </p>
      <p>
        Set <code>data-theme="light"</code> or <code>data-theme="dark"</code> on your document or a
        local theme boundary. Semantic utilities include <code>bg-surface</code>,{' '}
        <code>text-foreground</code>, and <code>border-border</code>.
      </p>
      <h2>Use packages inside this workspace</h2>
      <p>
        The private workspace packages remain available through <code>workspace:*</code>{' '}
        dependencies. Add both <code>@chamfer/ui</code> and <code>@chamfer/tokens</code> to a
        workspace app.
      </p>
      <Code>{`import { Button } from '@chamfer/ui';\nimport '@chamfer/ui/styles.css';`}</Code>
      <Code label="Tailwind CSS">
        {
          '@import "tailwindcss";\n@import "@chamfer/tokens/tailwind";\n@import "@chamfer/ui/styles.css";'
        }
      </Code>
      <h2>Explore and verify</h2>
      <p>
        <a href="https://chamfer-ui-storybook.vercel.app">Open the hosted Storybook</a> to inspect
        component states, controls, and themes.
      </p>
      <Code label="Terminal">
        {'pnpm storybook\n# http://localhost:6006\npnpm check\npnpm installer:smoke'}
      </Code>
      <p>
        The CLI and packages have not been published to npm. Public distribution follows the local
        foundation review.
      </p>
    </>
  );
}
