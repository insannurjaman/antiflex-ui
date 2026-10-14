import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'packages/cli/registry');
const original = fs.readFileSync(path.join(root, 'packages/ui/src/index.tsx'), 'utf8');
const source = ts.createSourceFile(
  'index.tsx',
  original,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const inventory = {
  button: ['ButtonProps', 'Button'],
  'text-field': ['TextFieldProps', 'TextField'],
  badge: ['BadgeProps', 'Badge'],
  card: ['CardProps', 'Card'],
  separator: ['SeparatorProps', 'Separator'],
  skeleton: ['Skeleton'],
  table: [
    'Table',
    'TableHeader',
    'TableBody',
    'TableRow',
    'TableHead',
    'TableCell',
    'TableCaption',
  ],
  'app-shell': ['AppShellProps', 'AppShell'],
};
const declarations = new Map();
for (const statement of source.statements) {
  if (ts.isVariableStatement(statement))
    for (const declaration of statement.declarationList.declarations)
      declarations.set(declaration.name.getText(source), statement);
  else if ('name' in statement && statement.name)
    declarations.set(statement.name.getText(source), statement);
}
const reactImport = source.statements.find(
  (node) => ts.isImportDeclaration(node) && node.moduleSpecifier.text === 'react',
);
const imports = reactImport.importClause.namedBindings.elements;
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const manifest = { version: 1, release: '0.1.0', components: {}, fonts: {} };
const files = new Map();
const usedIdentifiers = (statement) => {
  const names = new Set();
  function visit(node) {
    if (ts.isIdentifier(node)) names.add(node.text);
    ts.forEachChild(node, visit);
  }
  visit(statement);
  return names;
};
for (const [name, symbols] of Object.entries(inventory)) {
  const statements = symbols.map((symbol) => {
    const node = declarations.get(symbol);
    if (!node) throw Error('Missing component symbol ' + symbol);
    return node;
  });
  const used = new Set(statements.flatMap((node) => [...usedIdentifiers(node)]));
  const selectedImports = imports.filter((node) => used.has(node.name.text));
  const named = selectedImports
    .map((node) => (node.isTypeOnly ? 'type ' : '') + node.name.text)
    .join(', ');
  let code = `'use client';\n\nimport { ${named} } from 'react';\n`;
  const helpers = ['cx', 'Size'].filter((symbol) => used.has(symbol));
  if (helpers.length)
    code += `import { ${helpers.map((symbol) => (symbol === 'Size' ? 'type Size' : symbol)).join(', ')} } from './utils';\n`;
  const dependencies = name === 'app-shell' ? ['button'] : [];
  if (name === 'app-shell') code += "import { Button } from './button';\n";
  code +=
    '\n' +
    statements
      .map((node) => printer.printNode(ts.EmitHint.Unspecified, node, source))
      .join('\n\n') +
    '\n';
  files.set(`components/${name}.tsx`, code);
  manifest.components[name] = {
    file: `components/${name}.tsx`,
    dependencies,
    exports: symbols.filter((symbol) => !symbol.endsWith('Props')),
  };
}
files.set(
  'components/utils.ts',
  ['Size', 'cx']
    .map((symbol) => printer.printNode(ts.EmitHint.Unspecified, declarations.get(symbol), source))
    .join('\n\n') + '\n',
);
for (const name of ['tokens.css', 'tokens.json', 'tailwind.css'])
  files.set(
    'styles/' + name,
    fs.readFileSync(path.join(root, 'packages/tokens/src', name), 'utf8'),
  );
files.set(
  'styles/components.css',
  fs
    .readFileSync(path.join(root, 'packages/ui/src/styles.css'), 'utf8')
    .replace(/^@import ['"]@chamfer\/tokens\/css['"];\s*/, ''),
);
const fontFaces = [];
for (const [family, weights] of [
  ['sans', [400, 500, 600]],
  ['mono', [400, 500]],
]) {
  for (const weight of weights)
    fontFaces.push(`@font-face {
  font-family: 'IBM Plex ${family === 'sans' ? 'Sans' : 'Mono'}';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('@fontsource/ibm-plex-${family}/files/ibm-plex-${family}-latin-${weight}-normal.woff2') format('woff2');
}`);
}
files.set('styles/fonts.css', fontFaces.join('\n\n') + '\n');
files.set(
  'styles/index.css',
  "@import './tokens.css';\n@import './tailwind.css';\n@import './components.css';\n@import './fonts.css';\n",
);
for (const family of ['sans', 'mono']) {
  const name = '@fontsource/ibm-plex-' + family;
  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, 'apps/docs/node_modules', name, 'package.json'), 'utf8'),
  );
  manifest.fonts[name] = '^' + pkg.version;
  files.set(
    `styles/LICENSE-ibm-plex-${family}.txt`,
    fs.readFileSync(path.join(root, 'apps/docs/node_modules', name, 'LICENSE'), 'utf8'),
  );
}
files.set('styles/LICENSE-chamfer.txt', fs.readFileSync(path.join(root, 'LICENSE'), 'utf8'));
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
