import fs from 'node:fs';
import path from 'node:path';
import { colorToSrgb } from '../packages/tokens/src/foundations.ts';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const data = JSON.parse(read('packages/tokens/src/tokens.json'));
const rgba = {};
const preview = (value) =>
  Object.fromEntries(
    Object.entries(colorToSrgb(value)).map(([key, channel]) => [key, Number(channel.toFixed(8))]),
  );
for (const [family, values] of Object.entries(data.primitives.palette)) {
  if (typeof values === 'string') rgba['palette.' + family] = preview(values);
  else
    for (const [shade, value] of Object.entries(values))
      rgba[`palette.${family}.${shade}`] = preview(value);
}
for (const phase of ['tokens', 'colors', 'typography'])
  fs.writeFileSync(
    path.join(root, 'assets/figma/generated/expanded-' + phase + '.js'),
    `const TOKEN_DATA=${JSON.stringify(data)};\nconst REFERENCE_SRGB=${JSON.stringify(phase === 'tokens' ? rgba : {})};\nconst ICONS={};\n` +
      read('scripts/figma/common.js') +
      '\n' +
      read('scripts/figma/expanded-' + phase + '.js'),
  );
console.log('Generated scoped expanded foundation Figma scripts.');
