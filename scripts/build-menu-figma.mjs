import fs from 'node:fs';
const tokens = JSON.parse(fs.readFileSync('packages/tokens/src/tokens.json', 'utf8'));
const code =
  'const MENU_TOKENS=' +
  JSON.stringify(
    Object.fromEntries(
      Object.entries(tokens.components).filter(([name]) => name.startsWith('menu-')),
    ),
  ) +
  ';\nconst ICONS={};\n' +
  fs.readFileSync('scripts/figma/common.js', 'utf8') +
  '\n' +
  fs.readFileSync('scripts/figma/menu-components.js', 'utf8');
fs.mkdirSync('assets/figma/generated', { recursive: true });
fs.writeFileSync('assets/figma/generated/menu-components.js', code);
console.log('Menu construction generated: ' + code.length + ' characters.');
