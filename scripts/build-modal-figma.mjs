import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const target = path.join(root, 'assets/figma/generated');
fs.writeFileSync(
  path.join(target, 'modal-foundations.js'),
  'const TOKEN_DATA=' +
    read('packages/tokens/src/tokens.json') +
    ';\n' +
    read('scripts/figma/modal-foundations.js'),
);
if (fs.existsSync(path.join(root, 'scripts/figma/modal-components.js')))
  fs.writeFileSync(
    path.join(target, 'modal-components.js'),
    'const ICONS={};\n' +
      read('scripts/figma/common.js') +
      '\n' +
      read('scripts/figma/modal-components.js'),
  );
console.log('Generated modal reconciliation scripts.');
