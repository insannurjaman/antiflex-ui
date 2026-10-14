import { Code } from '../../../components/code';
export const metadata = { title: 'Installation' };
export default function Installation() {
  return (
    <>
      <div className="doc-breadcrumb">Documentation / Getting started</div>
      <h1>Start building.</h1>
      <p className="doc-lead">
        Run the foundation locally, explore the components, and make it yours.
      </p>
      <h2>1. Install the workspace</h2>
      <p>Use Node.js 24 and pnpm 10. From the repository root:</p>
      <Code label="Terminal">{'corepack enable\npnpm install\npnpm dev'}</Code>
      <p>
        The site runs at <code>http://localhost:3000</code>. Open <code>/dashboard</code> for the
        working example.
      </p>
      <h2>2. Use a component</h2>
      <p>
        The workspace packages are private for this milestone. Add them to a workspace app’s
        dependencies using <code>workspace:*</code>, then import the component and styles.
      </p>
      <Code>{`import { Button } from '@chamfer/ui';\nimport '@chamfer/ui/styles.css';\n\nexport function SaveAction() {\n  return <Button onClick={() => console.log('Saved')}>\n    Save changes\n  </Button>;\n}`}</Code>
      <h2>3. Connect Tailwind</h2>
      <p>
        Import the semantic mapping in your Tailwind v4 entry stylesheet. Include the component
        source when you add utility classes inside library components.
      </p>
      <Code label="CSS">
        {
          '@import "tailwindcss";\n@import "@chamfer/tokens/tailwind";\n@import "@chamfer/ui/styles.css";\n\n/* bg-surface, text-foreground, border-border */'
        }
      </Code>
      <h2>4. Explore the specimens</h2>
      <Code label="Terminal">
        {
          'pnpm storybook\n# Storybook: http://localhost:6006\n\npnpm build\npnpm storybook:build\npnpm test'
        }
      </Code>
      <p>
        A public npm package and source installer are planned for a later release. This release uses
        local workspace imports.
      </p>
    </>
  );
}
