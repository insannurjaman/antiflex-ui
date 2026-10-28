import fs from 'node:fs';
const tokens = JSON.parse(fs.readFileSync('packages/tokens/src/tokens.json', 'utf8'));
const keys = ['hover-card-', 'menubar-', 'navigation-menu-', 'choice-', 'command-', 'calendar-'];
for (const phase of ['foundations', 'navigation', 'selection', 'dates', 'pickers']) {
  const body = 'scripts/figma/expansion-' + phase + '.js';
  if (!fs.existsSync(body)) continue;
  const code =
    'const EXPANSION_TOKENS=' +
    JSON.stringify(
      Object.fromEntries(
        Object.entries(tokens.components).filter(
          ([key]) => keys.some((p) => key.startsWith(p)) && !/^choice-(size-|checked-)/.test(key),
        ),
      ),
    ) +
    ';\nconst ICONS={};\n' +
    fs.readFileSync('scripts/figma/common.js', 'utf8') +
    '\n' +
    (phase === 'foundations'
      ? ''
      : fs.readFileSync('scripts/figma/expansion-helpers.js', 'utf8') + '\n') +
    fs.readFileSync(body, 'utf8');
  fs.writeFileSync('assets/figma/generated/expansion-' + phase + '.js', code);
  console.log(phase + ': ' + code.length + ' characters');
}
