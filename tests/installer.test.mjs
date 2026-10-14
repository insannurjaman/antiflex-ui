import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { initialize, addComponents } from '../packages/cli/src/installer.mjs';
const cli = path.resolve('packages/cli/src/cli.mjs');
function fixture(t, extra = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chamfer-installer-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'src'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({
      name: 'fixture',
      private: true,
      dependencies: { react: '^19.0.0', ...extra },
      devDependencies: { tailwindcss: '^4.3.3' },
    }),
  );
  fs.writeFileSync(
    path.join(root, 'src/index.css'),
    "@import 'tailwindcss';\nbody { margin: 0; }\n",
  );
  return root;
}
const read = (root, file) => fs.readFileSync(path.join(root, file), 'utf8');
const init = (root) => initialize(root, { skipInstall: true });
test('initialization connects styles, adds fonts, preserves app dependencies, and is idempotent', (t) => {
  const root = fixture(t, { example: '1.0.0' });
  const result = init(root);
  assert.equal(result.config.componentsDir, 'src/components/chamfer');
  assert.match(read(root, 'src/index.css'), /styles\/chamfer\/index.css/);
  const manifest = JSON.parse(read(root, 'package.json'));
  assert.equal(manifest.dependencies.example, '1.0.0');
  assert.ok(manifest.dependencies['@fontsource/ibm-plex-sans']);
  const before = read(root, 'src/index.css');
  assert.equal(init(root).alreadyConfigured, true);
  assert.equal(read(root, 'src/index.css'), before);
});
test('init dry run never changes manifest, stylesheet, or creates directories', (t) => {
  const root = fixture(t);
  const pkg = read(root, 'package.json');
  const css = read(root, 'src/index.css');
  const result = initialize(root, { dryRun: true });
  assert.ok(result.files.length > 0);
  assert.equal(read(root, 'package.json'), pkg);
  assert.equal(read(root, 'src/index.css'), css);
  assert.equal(fs.existsSync(path.join(root, 'chamfer.json')), false);
  assert.equal(fs.existsSync(path.join(root, 'src/styles')), false);
});
test('add resolves AppShell dependencies without unrelated components', (t) => {
  const root = fixture(t);
  init(root);
  addComponents(root, ['app-shell']);
  for (const file of ['app-shell.tsx', 'button.tsx', 'utils.ts'])
    assert.ok(fs.existsSync(path.join(root, 'src/components/chamfer', file)));
  assert.equal(fs.existsSync(path.join(root, 'src/components/chamfer/table.tsx')), false);
  assert.match(read(root, 'src/components/chamfer/app-shell.tsx'), /from '\.\/button'/);
  assert.equal(addComponents(root, ['app-shell']).files.length, 0);
});
test('customized dependencies are kept when adding another component', (t) => {
  const root = fixture(t);
  init(root);
  addComponents(root, ['button']);
  const file = path.join(root, 'src/components/chamfer/button.tsx');
  const content = fs.readFileSync(file, 'utf8') + '\n// User customization\n';
  fs.writeFileSync(file, content);
  const result = addComponents(root, ['app-shell']);
  assert.deepEqual(result.preserved, ['button']);
  assert.equal(fs.readFileSync(file, 'utf8'), content);
});
test('an edited explicitly requested component causes no partial writes; force keeps a backup', (t) => {
  const root = fixture(t);
  init(root);
  addComponents(root, ['button']);
  const file = path.join(root, 'src/components/chamfer/button.tsx');
  fs.writeFileSync(file, '// Mine\n');
  assert.throws(() => addComponents(root, ['badge', 'button']), /has changes/);
  assert.equal(fs.existsSync(path.join(root, 'src/components/chamfer/badge.tsx')), false);
  const result = addComponents(root, ['button'], { force: true });
  assert.equal(read(root, result.backup + '/src/components/chamfer/button.tsx'), '// Mine\n');
  assert.match(fs.readFileSync(file, 'utf8'), /forwardRef/);
});
test('unknown items and path traversal fail before any app mutation', (t) => {
  const root = fixture(t);
  const before = read(root, 'src/index.css');
  assert.throws(
    () => initialize(root, { componentsDir: '../outside', skipInstall: true }),
    /inside the project/,
  );
  assert.equal(read(root, 'src/index.css'), before);
  assert.equal(fs.existsSync(path.join(root, 'chamfer.json')), false);
  init(root);
  assert.throws(() => addComponents(root, ['button', '../../outside']), /Unknown component/);
  assert.equal(fs.existsSync(path.join(root, 'src/components')), false);
});
test('symlink destinations are rejected even when configuration is edited', (t) => {
  const root = fixture(t);
  init(root);
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'chamfer-outside-'));
  t.after(() => fs.rmSync(outside, { recursive: true, force: true }));
  fs.mkdirSync(path.join(root, 'src/components'), { recursive: true });
  fs.symlinkSync(outside, path.join(root, 'src/components/chamfer'), 'dir');
  assert.throws(() => addComponents(root, ['button']), /symlink/);
  assert.deepEqual(fs.readdirSync(outside), []);
});
test('stylesheet conflicts and overlapping paths do not partially initialize', (t) => {
  const root = fixture(t);
  fs.mkdirSync(path.join(root, 'src/styles/chamfer'), { recursive: true });
  fs.writeFileSync(path.join(root, 'src/styles/chamfer/tokens.css'), '/* My existing tokens */');
  const before = read(root, 'src/index.css');
  assert.throws(() => init(root), /Existing style/);
  assert.equal(read(root, 'src/index.css'), before);
  assert.equal(fs.existsSync(path.join(root, 'chamfer.json')), false);
});
test('add dry run leaves source files untouched and reports dependency files', (t) => {
  const root = fixture(t);
  init(root);
  const result = addComponents(root, ['app-shell'], { dryRun: true });
  assert.deepEqual(result.components, ['button', 'app-shell']);
  assert.equal(fs.existsSync(path.join(root, 'src/components')), false);
});
test('custom paths and CSS charset are preserved', (t) => {
  const root = fixture(t);
  fs.writeFileSync(path.join(root, 'src/index.css'), '@charset "UTF-8";\n@import "tailwindcss";\n');
  initialize(root, { skipInstall: true, componentsDir: 'src/ui', stylesDir: 'src/theme' });
  addComponents(root, ['text-field']);
  assert.ok(fs.existsSync(path.join(root, 'src/ui/text-field.tsx')));
  assert.match(read(root, 'src/index.css'), /^@charset "UTF-8";\n@import '\.\/theme\/index.css';/);
});
test('Next.js app-directory styles are discovered without assuming a src directory', (t) => {
  const root = fixture(t, { next: '16.4.0' });
  fs.rmSync(path.join(root, 'src'), { recursive: true });
  fs.mkdirSync(path.join(root, 'app'));
  fs.writeFileSync(path.join(root, 'app/globals.css'), '@import "tailwindcss";\n');
  const result = init(root);
  assert.equal(result.config.css, 'app/globals.css');
  assert.equal(result.config.componentsDir, 'components/chamfer');
  addComponents(root, ['button']);
  assert.ok(fs.existsSync(path.join(root, 'components/chamfer/button.tsx')));
});
test('CLI list works without a React app; failed commands report a nonzero exit status', (t) => {
  const root = fixture(t);
  const list = spawnSync(process.execPath, [cli, 'list'], { cwd: os.tmpdir(), encoding: 'utf8' });
  assert.equal(list.status, 0);
  assert.match(list.stdout, /app-shell/);
  const missing = spawnSync(process.execPath, [cli, 'add', 'button', '--cwd', root], {
    encoding: 'utf8',
  });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /init first/);
});
test('a tampered bundled file fails its integrity check without touching the app', (t) => {
  const root = fixture(t);
  const copy = fs.mkdtempSync(path.join(os.tmpdir(), 'chamfer-package-'));
  t.after(() => fs.rmSync(copy, { recursive: true, force: true }));
  fs.cpSync(path.resolve('packages/cli'), copy, { recursive: true });
  fs.appendFileSync(path.join(copy, 'registry/styles/tokens.css'), '\n/* altered */');
  const before = read(root, 'package.json');
  const run = spawnSync(
    process.execPath,
    [path.join(copy, 'src/cli.mjs'), 'init', '--cwd', root, '--skip-install'],
    { encoding: 'utf8' },
  );
  assert.equal(run.status, 1);
  assert.match(run.stderr, /integrity/);
  assert.equal(read(root, 'package.json'), before);
  assert.equal(fs.existsSync(path.join(root, 'chamfer.json')), false);
});

test('non-CSS entries and self-importing style paths are rejected before writes', (t) => {
  const root = fixture(t);
  assert.throws(
    () => initialize(root, { css: 'package.json', skipInstall: true }),
    /\.css stylesheet/,
  );
  assert.throws(
    () => initialize(root, { css: 'src/index.css', stylesDir: 'src', skipInstall: true }),
    /outside the generated/,
  );
  assert.equal(fs.existsSync(path.join(root, 'chamfer.json')), false);
});
