import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const output = path.join(root, 'assets/figma/generated');
const require = createRequire(path.join(root, 'apps/docs/package.json'));
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const icons = require('@tabler/icons-react');
const ICONS = Object.fromEntries(
  [
    'IconCircleCheck',
    'IconInfoCircle',
    'IconAlertTriangle',
    'IconFolder',
    'IconSearch',
    'IconLock',
    'IconChevronDown',
    'IconChevronRight',
  ].map((name) => [
    name,
    renderToStaticMarkup(React.createElement(icons[name], { size: 16, stroke: 1.5 })),
  ]),
);
const common = 'const ICONS=' + JSON.stringify(ICONS) + ';\n' + read('scripts/figma/common.js');
const components = read('scripts/figma/feedback-components.js');
const files = [
  [
    'feedback-foundations.js',
    'const TOKEN_DATA=' +
      read('packages/tokens/src/tokens.json') +
      ';\n' +
      read('scripts/figma/feedback-foundations.js'),
  ],
];
for (const [suffix, names] of [
  ['a', ['Alert', 'Avatar', 'Breadcrumb', 'Empty', 'Kbd']],
  ['b', ['Pagination', 'Progress', 'Spinner', 'Tabs', 'Accordion']],
  ['c', ['Collapsible', 'Toggle', 'Toggle Group', 'Typography', 'Aspect Ratio']],
])
  files.push([
    'feedback-components-' + suffix + '.js',
    'const FEEDBACK_FAMILIES=' + JSON.stringify(names) + ';\n' + common + '\n' + components,
  ]);
files.push([
  'feedback-review.js',
  'const FEEDBACK_FAMILIES=[];\n' +
    common +
    '\n' +
    components.slice(0, components.lastIndexOf('return result(')) +
    '\n' +
    read('scripts/figma/feedback-review.js'),
]);
for (const [file, code] of files)
  fs.writeFileSync(
    path.join(output, file),
    '// Generated source reconciliation for the existing antiflex file.\n' + code,
  );
console.log('Generated feedback foundations, three component phases, and review boards.');
