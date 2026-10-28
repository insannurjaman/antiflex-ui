import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
for (const phase of ['foundations', 'components'])
  if (fs.existsSync(path.join(root, 'scripts/figma/panel-' + phase + '.js')))
    fs.writeFileSync(
      path.join(root, 'assets/figma/generated/panel-' + phase + '.js'),
      (phase === 'foundations'
        ? 'const TOKEN_DATA=' + read('packages/tokens/src/tokens.json') + ';\n'
        : 'const TOKEN_DATA=' +
          read('packages/tokens/src/tokens.json') +
          ';\nconst ICONS={};\n' +
          read('scripts/figma/common.js') +
          '\n') + read('scripts/figma/panel-' + phase + '.js'),
    );
console.log('Generated panel foundation scripts.');
