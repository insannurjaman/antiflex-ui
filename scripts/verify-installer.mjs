import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.error || result.status !== 0) throw Error(command + ' ' + args.join(' ') + ' failed');
}
const consumer = fs.mkdtempSync(path.join(os.tmpdir(), 'chamfer-react-consumer-'));
const packageVersion = (p) => JSON.parse(fs.readFileSync(p, 'utf8')).version;
const docs = JSON.parse(fs.readFileSync(path.join(root, 'apps/docs/package.json'), 'utf8'));
const fromRegistry = process.argv.includes('--registry');
if (!fromRegistry) run('pnpm', ['installer:pack']);
const installer = JSON.parse(fs.readFileSync(path.join(root, 'packages/cli/package.json'), 'utf8'));
const tarball = path.join(
  root,
  'artifacts',
  installer.name.replace('@', '').replace('/', '-') + '-' + installer.version + '.tgz',
);
const manifest = {
  name: 'chamfer-independent-consumer',
  private: true,
  type: 'module',
  packageManager: 'pnpm@10.34.3',
  scripts: { build: 'vite build' },
  dependencies: { react: docs.dependencies.react, 'react-dom': docs.dependencies['react-dom'] },
  devDependencies: {
    [installer.name]: fromRegistry ? installer.version : 'file:' + tarball,
    vite: packageVersion(path.join(root, 'apps/storybook/node_modules/vite/package.json')),
    typescript: require('typescript/package.json').version,
    tailwindcss: docs.devDependencies.tailwindcss,
    '@tailwindcss/postcss': docs.devDependencies['@tailwindcss/postcss'],
    '@types/react': packageVersion(
      path.join(root, 'packages/ui/node_modules/@types/react/package.json'),
    ),
    '@types/react-dom': packageVersion(
      path.join(root, 'packages/ui/node_modules/@types/react-dom/package.json'),
    ),
  },
};
fs.mkdirSync(path.join(consumer, 'src'), { recursive: true });
fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify(manifest, null, 2));
// This disposable app deliberately changes dependencies during init, including in CI.
// Keep the repository's frozen lockfile policy; allow only this consumer to update its lock.
fs.writeFileSync(path.join(consumer, '.npmrc'), 'frozen-lockfile=false\n');
fs.writeFileSync(
  path.join(consumer, 'index.html'),
  '<html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Independent Chamfer consumer</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
);
fs.writeFileSync(
  path.join(consumer, 'src/index.css'),
  "@import 'tailwindcss';\nbody{margin:0;font-family:var(--ch-font-sans),sans-serif;color:var(--ch-semantic-foreground);background:var(--ch-semantic-canvas)}*{box-sizing:border-box}\n",
);
fs.writeFileSync(
  path.join(consumer, 'postcss.config.mjs'),
  "export default {plugins:{'@tailwindcss/postcss':{}}};\n",
);
fs.writeFileSync(
  path.join(consumer, 'vite.config.mjs'),
  "export default {esbuild:{jsx:'automatic',jsxImportSource:'react'}};\n",
);
fs.writeFileSync(
  path.join(consumer, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noEmit: true,
        skipLibCheck: true,
        allowImportingTsExtensions: true,
      },
      include: ['src'],
    },
    null,
    2,
  ),
);
fs.writeFileSync(
  path.join(consumer, 'src/main.tsx'),
  `import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './components/chamfer/button';
import { TextField } from './components/chamfer/text-field';
import { Badge } from './components/chamfer/badge';
import { Card } from './components/chamfer/card';
import { Separator } from './components/chamfer/separator';
import { Skeleton } from './components/chamfer/skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './components/chamfer/table';
import { AppShell } from './components/chamfer/app-shell';
import './index.css';
function App() {
 const [name,setName]=useState('');const [saved,setSaved]=useState('');const [dark,setDark]=useState(false);
 return <AppShell header={<><strong>Independent React app</strong><Button variant="secondary" onClick={()=>{document.documentElement.dataset.theme=dark?'light':'dark';setDark(!dark);}}>{dark?'Light theme':'Dark theme'}</Button></>} sidebar={<nav aria-label="Project navigation"><a href="#main-content">Overview</a></nav>}>
  <div className="mx-auto max-w-3xl space-y-6"><h1 className="text-3xl font-medium">Chamfer in a fresh project</h1><p className="text-muted">Installed from the packed CLI. No workspace imports.</p>
  <Card><div className="space-y-4"><Badge variant="success">Source-owned</Badge><TextField label="Project name" value={name} onChange={event=>setName(event.target.value)}/><Button onClick={()=>setSaved('Saved '+name)}>Save project</Button><p role="status">{saved}</p></div></Card>
  <Separator decorative={false}/><Table><TableCaption>Sample projects</TableCaption><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Orbit</TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow></TableBody></Table>
  <div role="status" aria-label="Loading example"><Skeleton style={{width:160,height:16}}/></div></div>
 </AppShell>;
}
createRoot(document.getElementById('root')!).render(<App/>);
`,
);
run('pnpm', ['install'], consumer);
run('pnpm', ['exec', 'chamfer', 'init', '--css', 'src/index.css'], consumer);
run('pnpm', ['exec', 'chamfer', 'add', '--all'], consumer);
run('pnpm', ['exec', 'chamfer', 'add', 'app-shell'], consumer); // idempotent packed execution
run('pnpm', ['exec', 'tsc', '--noEmit'], consumer);
run('pnpm', ['build'], consumer);
const server = spawn(
  path.join(consumer, 'node_modules/.bin/vite'),
  ['preview', '--host', '127.0.0.1', '--port', '4175', '--strictPort'],
  { cwd: consumer, stdio: 'pipe' },
);
let browser;
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch('http://127.0.0.1:4175')).ok) break;
    } catch {}
    if (attempt === 99) throw Error('Consumer preview did not start');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('http://127.0.0.1:4175');
  await expect(page.getByRole('heading', { name: 'Chamfer in a fresh project' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Project name' }).fill('Orbit');
  await page.getByRole('button', { name: 'Save project' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Saved Orbit' })).toBeVisible();
  await page.mouse.move(0, 0);
  await page.evaluate(async () => {
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  const light = await page
    .getByRole('button', { name: 'Save project' })
    .evaluate((n) => getComputedStyle(n).backgroundColor);
  expect(light).toBe('rgb(6, 103, 126)');
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.evaluate(async () => {
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  const dark = await page
    .getByRole('button', { name: 'Save project' })
    .evaluate((n) => getComputedStyle(n).backgroundColor);
  expect(dark).toBe('rgb(72, 204, 227)');
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () =>
        document.fonts.check('14px \"IBM Plex Sans\"') &&
        [...document.fonts].some(
          (f) => f.family.includes('IBM Plex Sans') && f.status === 'loaded',
        ),
    ),
  ).toBe(true);
  await page.screenshot({
    path: path.join(root, 'assets/previews/installer-consumer-mobile.png'),
    fullPage: true,
    animations: 'disabled',
  });
  const evidence = {
    consumer,
    ...(fromRegistry ? { registryPackage: installer.name + '@' + installer.version } : { tarball }),
    workspaceImports: false,
    components: 8,
    typecheck: 'passed',
    productionBuild: 'passed',
    sourceInstaller: 'passed',
    themeColors: { light, dark },
    accessibilityViolations: accessibility.violations.length,
    mobileOverflow: overflow,
    pageErrors: errors,
  };
  fs.writeFileSync(
    path.join(
      root,
      fromRegistry ? 'artifacts/installer-registry-smoke.json' : 'artifacts/installer-smoke.json',
    ),
    JSON.stringify(evidence, null, 2),
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
}
