import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(path.join(root, 'apps/docs/package.json'));
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const icons = require('@tabler/icons-react');
const names = [
  'IconSun',
  'IconMoon',
  'IconArrowDown',
  'IconArrowUp',
  'IconArrowUpRight',
  'IconChevronLeft',
  'IconChevronRight',
  'IconDownload',
  'IconSearch',
  'IconLayoutDashboard',
  'IconShoppingBag',
  'IconActivity',
  'IconChartBar',
  'IconRefresh',
  'IconCircleCheck',
];
const ICONS = Object.fromEntries(
  names.map((name) => [
    name,
    renderToStaticMarkup(React.createElement(icons[name], { size: 16, stroke: 1.5 })),
  ]),
);
const TOKEN_DATA = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/tokens/src/tokens.json'), 'utf8'),
);
const BRAND_SVG = fs.readFileSync(path.join(root, 'assets/brand/chamfer-mark.svg'), 'utf8');
const { orders } = await import('../apps/docs/components/dashboard-data.ts');
const preamble = `const TOKEN_DATA=${JSON.stringify(TOKEN_DATA)};\nconst ICONS=${JSON.stringify(ICONS)};\nconst BRAND_SVG=${JSON.stringify(BRAND_SVG)};\nconst ORDER_DATA=${JSON.stringify(orders)};\n`;
const common =
  fs.readFileSync(path.join(root, 'scripts/figma/common.js'), 'utf8') +
  '\n' +
  fs.readFileSync(path.join(root, 'scripts/figma/reconcile-dashboard.js'), 'utf8');
const output = path.join(root, 'assets/figma/generated');
fs.mkdirSync(output, { recursive: true });
const phaseNames = ['foundations', 'components', 'dashboard'];
const functions = ['buildFoundations', 'buildComponents', 'buildDashboard'];
const sources = phaseNames.map((name) =>
  fs.readFileSync(path.join(root, `scripts/figma/${name}.js`), 'utf8'),
);
for (let i = 0; i < phaseNames.length; i++)
  fs.writeFileSync(
    path.join(output, phaseNames[i] + '.js'),
    preamble + common + '\n' + sources[i] + `\nreturn await ${functions[i]}();\n`,
  );
// Development plugin uses exactly the same phase functions as the connector scripts.
fs.writeFileSync(
  path.join(output, 'code.js'),
  preamble +
    common +
    '\n' +
    sources.join('\n') +
    `\n(async()=>{try{const foundation=await buildFoundations();const components=await buildComponents();const dashboard=await buildDashboard();figma.showUI('<html><body style="font:14px sans-serif;padding:20px"><h2>Chamfer UI — Foundation</h2><p>Created native variables, component variants, and dashboard layouts.</p><pre style="white-space:pre-wrap">'+JSON.stringify({foundation,components,dashboard},null,2)+'</pre></body></html>',{width:520,height:420});}catch(error){figma.showUI('<html><body style="font:14px sans-serif;padding:24px"><h2>Import needs attention</h2><pre style="white-space:pre-wrap">'+String(error)+'</pre></body></html>',{width:520,height:320});}})();`,
);
fs.writeFileSync(
  path.join(output, 'manifest.json'),
  JSON.stringify(
    {
      name: 'Chamfer UI — Foundation',
      id: 'chamfer-ui-foundation',
      api: '1.0.0',
      main: 'code.js',
      editorType: ['figma'],
      documentAccess: 'dynamic-page',
      networkAccess: { allowedDomains: ['none'] },
    },
    null,
    2,
  ),
);
fs.writeFileSync(path.join(output, 'tokens.json'), JSON.stringify(TOKEN_DATA, null, 2));
console.log('Figma connector phase scripts and native development plugin generated.');

fs.copyFileSync(
  path.join(root, 'apps/docs/node_modules/@tabler/icons-react/LICENSE'),
  path.join(output, 'LICENSE-Tabler.txt'),
);
