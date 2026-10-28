import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'packages/cli/registry');
const inventory = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/ui/src/catalog.json'), 'utf8'),
);
const release = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/cli/package.json'), 'utf8'),
).version;
const manifest = { version: 1, release, components: {}, fonts: {} };
const files = new Map();
for (const [name, item] of Object.entries(inventory)) {
  const file = `components/${name}.tsx`;
  files.set(file, fs.readFileSync(path.join(root, 'packages/ui/src', name + '.tsx'), 'utf8'));
  manifest.components[name] = {
    file,
    dependencies: item.dependencies,
    ...(item.utilities ? { utilities: item.utilities } : {}),
    exports: item.symbols.filter((symbol) => !symbol.endsWith('Props')),
  };
}
files.set(
  'components/utils.ts',
  fs.readFileSync(path.join(root, 'packages/ui/src/utils.ts'), 'utf8'),
);
for (const file of new Set(Object.values(inventory).flatMap((item) => item.utilities || []))) {
  files.set(
    'components/' + file,
    fs.readFileSync(path.join(root, 'packages/ui/src', file), 'utf8'),
  );
}
for (const name of ['tokens.css', 'tokens.json', 'tailwind.css'])
  files.set(
    'styles/' + name,
    fs.readFileSync(path.join(root, 'packages/tokens/src', name), 'utf8'),
  );
files.set(
  'styles/components.css',
  fs
    .readFileSync(path.join(root, 'packages/ui/src/styles.css'), 'utf8')
    .replace(/^@import ['"]@antiflex\/tokens\/css['"];\s*/, ''),
);
const fontFaces = [];
const fontFamilies = [
  ['dm-sans', 'DM Sans', [100, 200, 300, 400, 500, 600, 700, 800, 900]],
  ['space-mono', 'Space Mono', [400, 700]],
  ['anybody', 'Anybody', [100, 200, 300, 400, 500, 600, 700, 800, 900]],
];
for (const [slug, family, weights] of fontFamilies) {
  for (const weight of weights)
    for (const style of ['normal', 'italic'])
      fontFaces.push(`@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('@fontsource/${slug}/files/${slug}-latin-${weight}-${style}.woff2') format('woff2');
}`);
}
files.set('styles/fonts.css', fontFaces.join('\n\n') + '\n');
files.set(
  'styles/index.css',
  "@import './tokens.css';\n@import './tailwind.css';\n@import './components.css';\n@import './fonts.css';\n",
);
for (const [slug] of fontFamilies) {
  const name = '@fontsource/' + slug;
  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, 'apps/docs/node_modules', name, 'package.json'), 'utf8'),
  );
  manifest.fonts[name] = '^' + pkg.version;
  files.set(
    `styles/LICENSE-${slug}.txt`,
    fs.readFileSync(path.join(root, 'apps/docs/node_modules', name, 'LICENSE'), 'utf8'),
  );
}
files.set('styles/LICENSE-antiflex.txt', fs.readFileSync(path.join(root, 'LICENSE'), 'utf8'));
files.set(
  'styles/LICENSE-tailwindcss.txt',
  fs.readFileSync(path.join(root, 'packages/tokens/licenses/tailwindcss.txt'), 'utf8'),
);
manifest.integrity = {};
for (const [file, content] of files) {
  manifest.integrity[file] = crypto.createHash('sha256').update(content).digest('hex');
}
if (process.argv.includes('--check')) {
  for (const [file, content] of files)
    if (
      !fs.existsSync(path.join(output, file)) ||
      fs.readFileSync(path.join(output, file), 'utf8') !== content
    )
      throw Error('Stale registry item: ' + file);
  const current = JSON.parse(fs.readFileSync(path.join(output, 'manifest.json'), 'utf8'));
  if (JSON.stringify(current) !== JSON.stringify(manifest)) throw Error('Stale registry manifest');
  console.log('Bundled registry matches original source.');
} else {
  fs.mkdirSync(output, { recursive: true });
  for (const [file, content] of files) {
    const target = path.join(output, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  fs.copyFileSync(path.join(root, 'LICENSE'), path.join(root, 'packages/cli/LICENSE'));
  console.log('Bundled registry: ' + Object.keys(inventory).length + ' original components.');
}
