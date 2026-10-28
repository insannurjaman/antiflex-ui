// Explicit import of the installed, MIT-licensed Tailwind reference data.
// Ordinary tokens:build never silently replaces this snapshot after dependency updates.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'apps/docs/node_modules/tailwindcss');
const css = fs.readFileSync(path.join(source, 'theme.css'), 'utf8');
const pkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf8'));
const read = (key) => {
  const value = css.match(new RegExp('--' + key + ':\\s*([^;]+);'))?.[1];
  if (!value) throw Error('Missing reference ' + key);
  return value.trim();
};
const palette = {};
for (const [, family, shade, value] of css.matchAll(/--color-([a-z]+)-(\d+):\s*([^;]+);/g))
  (palette[family] ??= {})[shade] = value;
if (
  Object.keys(palette).length !== 26 ||
  Object.values(palette).some((r) => Object.keys(r).length !== 11)
)
  throw Error('Reference inventory changed; review before importing.');
palette.black = read('color-black');
palette.white = read('color-white');
palette.transparent = '#00000000';
const size = {},
  lineHeight = {},
  weight = {},
  tracking = {},
  leading = { none: 1 };
for (const name of [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
]) {
  size[name] = parseFloat(read('text-' + name)) * 16;
  const raw = read('text-' + name + '--line-height');
  const ratio = raw.startsWith('calc(') ? raw.match(/calc\(([\d.]+)\s*\/\s*([\d.]+)\)/) : null;
  lineHeight[name] = ratio ? Number(ratio[1]) * 16 : Number(raw) * size[name];
}
for (const [, name, value] of css.matchAll(/--font-weight-([a-z]+):\s*(\d+);/g))
  weight[name] = Number(value);
for (const [, name, value] of css.matchAll(/--tracking-([a-z]+):\s*(-?[\d.]+)em;/g))
  tracking[name] = Number(value);
for (const [, name, value] of css.matchAll(/--leading-([a-z]+):\s*([\d.]+);/g))
  leading[name] = Number(value);
const target = path.join(root, 'packages/tokens/src/tokens.json');
const data = JSON.parse(fs.readFileSync(target, 'utf8'));
const reference = {
  package: 'tailwindcss',
  version: pkg.version,
  source: `https://github.com/tailwindlabs/tailwindcss/blob/v${pkg.version}/packages/tailwindcss/theme.css`,
  license: 'MIT',
  sourceSha256: crypto.createHash('sha256').update(css).digest('hex'),
  basePixelsPerRem: 16,
};
if (process.argv.includes('--check')) {
  for (const [actual, expected] of [
    [data.primitives.palette, palette],
    [data.primitives.typography, { size, 'line-height': lineHeight, weight, tracking, leading }],
    [data.reference, reference],
  ])
    if (JSON.stringify(actual) !== JSON.stringify(expected))
      throw Error('Reference snapshot drift. Run tokens:reference explicitly after review.');
} else {
  data.reference = reference;
  data.primitives.palette = palette;
  data.primitives.typography = { size, 'line-height': lineHeight, weight, tracking, leading };
  data.primitives.font.serif = 'Georgia';
  fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n');
  fs.mkdirSync(path.join(root, 'packages/tokens/licenses'), { recursive: true });
  fs.copyFileSync(
    path.join(source, 'LICENSE'),
    path.join(root, 'packages/tokens/licenses/tailwindcss.txt'),
  );
}
console.log(
  `Reference ${pkg.version}: 26 × 11 colors, 13 type sizes, 9 weights, 6 tracking and 6 leading presets.`,
);
