import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const tokens = fs.readFileSync(path.join(root, 'packages/tokens/src/tokens.json'), 'utf8');
const script = fs.readFileSync(path.join(root, 'scripts/figma/neutral-theme.js'), 'utf8');
fs.writeFileSync(
  path.join(root, 'assets/figma/generated/neutral-theme.js'),
  `const TOKEN_DATA=${tokens};\n${script}`,
);
fs.writeFileSync(path.join(root, 'assets/figma/generated/tokens.json'), tokens);
console.log(
  'Generated scoped Neutral theme reconciliation; existing node IDs and bindings are preserved.',
);
