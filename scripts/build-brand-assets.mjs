import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(path.join(root, 'apps/docs/package.json'));
const { createElement: h } = require('react');
const { ImageResponse } = require('next/og');
// Sharp is already a declared dependency of the installed Next.js package.
const nextRequire = createRequire(require.resolve('next/package.json'));
const sharp = nextRequire('sharp');
const brand = path.join(root, 'assets/brand');
const docs = path.join(root, 'apps/docs');
const storybook = path.join(root, 'apps/storybook/public/brand');
await fs.mkdir(storybook, { recursive: true });
const mark = await fs.readFile(path.join(brand, 'antiflex-mark.svg'));
await fs.copyFile(path.join(brand, 'antiflex-wordmark.svg'), path.join(storybook, 'wordmark.svg'));
const tokens = JSON.parse(await fs.readFile(path.join(root, 'packages/tokens/src/tokens.json')));
const ink = tokens.primitives.color.neutral['950'];
const paper = tokens.primitives.color.neutral['50'];

const font = async (family, weight) => ({
  name: family,
  weight,
  style: 'normal',
  data: await fs.readFile(
    require.resolve(
      `@fontsource/${family.toLowerCase().replaceAll(' ', '-')}/files/${family.toLowerCase().replaceAll(' ', '-')}-latin-${weight}-normal.woff`,
    ),
  ),
});
const fonts = await Promise.all([
  font('Anybody', 600),
  font('DM Sans', 400),
  font('Space Mono', 400),
]);
// Reverse the neutral mark for the dark social card; favicon stays dark on light.
const socialMark = Buffer.from(
  mark
    .toString()
    .replaceAll('#171717', '__INK__')
    .replaceAll('#fafafa', ink)
    .replaceAll('__INK__', paper),
);
const image = (size, style = {}) =>
  h('img', {
    src: `data:image/svg+xml;base64,${socialMark.toString('base64')}`,
    width: size,
    height: size,
    style,
  });
const text = (value, style) => h('div', { style: { display: 'flex', ...style } }, value);
const og = h(
  'div',
  {
    style: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100%',
      background: ink,
      color: paper,
      padding: 64,
      flexDirection: 'column',
      fontFamily: 'DM Sans',
    },
  },
  h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 16 } },
    image(48),
    h(
      'div',
      {
        style: {
          display: 'flex',
          fontFamily: 'Anybody',
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: -1.3,
        },
      },
      'antiflex',
      h('span', { style: { color: '#a3a3a3' } }, '/ui'),
    ),
  ),
  h(
    'div',
    { style: { display: 'flex', marginTop: 72, flexDirection: 'column' } },
    text('less flex.', {
      fontFamily: 'Anybody',
      fontSize: 76,
      fontWeight: 600,
      letterSpacing: -2.4,
      lineHeight: 1.06,
    }),
    text('More function.', {
      fontFamily: 'Anybody',
      fontSize: 76,
      fontWeight: 600,
      letterSpacing: -2.4,
      lineHeight: 1.06,
    }),
    text('Familiar patterns. Thoughtful defaults.', {
      fontSize: 26,
      color: '#a3a3a3',
      marginTop: 28,
    }),
  ),
  image(216, { position: 'absolute', right: 64, top: 202 }),
  h(
    'div',
    {
      style: {
        display: 'flex',
        position: 'absolute',
        bottom: 48,
        left: 64,
        right: 64,
        borderTop: '1px solid #333333',
        paddingTop: 22,
        justifyContent: 'space-between',
        fontFamily: 'Space Mono',
        fontSize: 15,
        letterSpacing: 0.8,
      },
    },
    text('REACT / TYPESCRIPT / FIGMA', { color: '#a3a3a3' }),
    text('DESIGN SYSTEM', { color: paper }),
  ),
);
const response = new ImageResponse(og, { width: 1200, height: 630, fonts });
const ogPng = Buffer.from(await response.arrayBuffer());
await fs.writeFile(path.join(brand, 'antiflex-og.png'), ogPng);
await fs.writeFile(path.join(docs, 'public/og-image.png'), ogPng);
await fs.writeFile(path.join(storybook, 'og-image.png'), ogPng);

// Use the same antiflex A mark for browser and social assets.
await fs.writeFile(path.join(brand, 'antiflex-favicon.svg'), mark);
await fs.writeFile(path.join(docs, 'app/icon.svg'), mark);
await fs.writeFile(path.join(storybook, 'icon.svg'), mark);
const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((size) => sharp(mark).resize(size, size).png().toBuffer()),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [i, size] of sizes.entries()) {
  const entry = 6 + i * 16;
  directory[entry] = size;
  directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(pngs[i].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
  await fs.writeFile(path.join(brand, `antiflex-favicon-${size}.png`), pngs[i]);
}
const ico = Buffer.concat([directory, ...pngs]);
for (const target of [
  path.join(brand, 'antiflex-favicon.ico'),
  path.join(docs, 'app/favicon.ico'),
  path.join(storybook, 'favicon.ico'),
])
  await fs.writeFile(target, ico);
const apple = await sharp(mark).resize(180, 180).flatten({ background: paper }).png().toBuffer();
for (const target of [
  path.join(brand, 'antiflex-apple-touch.png'),
  path.join(docs, 'app/apple-icon.png'),
  path.join(storybook, 'apple-touch-icon.png'),
])
  await fs.writeFile(target, apple);
console.log(
  `Built 1200×630 OG image (${ogPng.length} bytes), SVG/16/32/48px favicon and 180px Apple Touch icon.`,
);
