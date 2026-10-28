import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const output = path.join(root, 'assets/figma/generated');
fs.mkdirSync(output, { recursive: true });
const common = read('scripts/figma/common.js');
const components = read('scripts/figma/forms-components.js');
const foundations =
  'const TOKEN_DATA=' +
  read('packages/tokens/src/tokens.json') +
  ';\n' +
  read('scripts/figma/forms-foundations.js');
const header = '// Generated form-family reconciliation for the existing antiflex foundation.\n';
for (const [file, code] of [
  ['forms-foundations.js', foundations],
  [
    'forms-components-a.js',
    "const FORM_FAMILIES=['Input','Label','Field','Textarea','Native Select'];\n" +
      common +
      '\n' +
      components,
  ],
  [
    'forms-components-b.js',
    "const FORM_FAMILIES=['Checkbox','Radio Group','Switch','Button Group','Input Group'];\n" +
      common +
      '\n' +
      components,
  ],
  [
    'forms-review.js',
    'const FORM_FAMILIES=[];\n' +
      common +
      '\n' +
      components.slice(0, components.lastIndexOf('return result(')) +
      '\n' +
      read('scripts/figma/forms-review.js'),
  ],
])
  fs.writeFileSync(path.join(output, file), header + code);
console.log(
  'Generated native form reconciliation: foundations, two component batches, light/dark review.',
);
