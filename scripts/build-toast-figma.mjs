import fs from 'node:fs';
const tokens = JSON.parse(fs.readFileSync('packages/tokens/src/tokens.json', 'utf8'));
const code =
  'const TOAST_TOKENS=' +
  JSON.stringify(
    Object.fromEntries(
      Object.entries(tokens.components).filter(([name]) => name.startsWith('toast-')),
    ),
  ) +
  ';\nconst ICONS={};\n' +
  fs.readFileSync('scripts/figma/common.js', 'utf8') +
  '\n' +
  fs.readFileSync('scripts/figma/toast-components.js', 'utf8');
fs.writeFileSync('assets/figma/generated/toast-components.js', code);
console.log(`Toast construction generated: ${code.length} characters.`);
