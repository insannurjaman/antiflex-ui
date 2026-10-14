const TOKEN_DATA={"primitives":{"color":{"neutral":{"0":"#ffffff","25":"#fbfcfd","50":"#f5f7f9","100":"#edf0f3","200":"#dce2e8","300":"#bac5d0","400":"#8995a4","500":"#617083","600":"#465568","700":"#344254","800":"#202c3a","900":"#131c27","950":"#0c131d"},"cyan":{"50":"#e9f9fc","100":"#cdf1f8","400":"#48cce3","500":"#16b0ce","600":"#07819c","700":"#06677e","900":"#10313d"},"green":{"50":"#eaf7f0","400":"#61d6a0","700":"#21754c","900":"#153629"},"amber":{"50":"#fff5e3","400":"#f4c46b","700":"#895915","900":"#3b2c16"},"red":{"50":"#ffedef","400":"#ff8d9b","700":"#b53649","900":"#3d202b"}},"space":{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"8":32,"10":40,"12":48,"16":64},"radius":{"none":0,"sm":4,"md":6,"lg":8,"full":999},"font":{"sans":"IBM Plex Sans","mono":"IBM Plex Mono"},"fontSize":{"xs":12,"sm":14,"md":16,"lg":20,"xl":28,"display":56},"lineHeight":{"tight":1.15,"body":1.5},"border":{"thin":1},"elevation":{"low":"0 2px 8px rgb(12 19 29 / 0.06)"},"duration":{"fast":120,"normal":200}},"semantic":{"light":{"canvas":"color.neutral.0","surface":"color.neutral.0","subtle":"color.neutral.50","inset":"color.neutral.25","foreground":"color.neutral.900","muted":"color.neutral.500","border":"color.neutral.200","border-strong":"color.neutral.300","accent":"color.cyan.700","accent-hover":"color.cyan.900","accent-soft":"color.cyan.50","accent-foreground":"color.neutral.0","focus":"color.cyan.600","success":"color.green.700","success-soft":"color.green.50","warning":"color.amber.700","warning-soft":"color.amber.50","danger":"color.red.700","danger-soft":"color.red.50"},"dark":{"canvas":"color.neutral.950","surface":"color.neutral.900","subtle":"color.neutral.800","inset":"color.neutral.950","foreground":"color.neutral.50","muted":"color.neutral.300","border":"color.neutral.700","border-strong":"color.neutral.500","accent":"color.cyan.400","accent-hover":"color.cyan.100","accent-soft":"color.cyan.900","accent-foreground":"color.neutral.950","focus":"color.cyan.400","success":"color.green.400","success-soft":"color.green.900","warning":"color.amber.400","warning-soft":"color.amber.900","danger":"color.red.400","danger-soft":"color.red.900"}},"components":{"button-bg":"semantic.accent","button-fg":"semantic.accent-foreground","button-bg-hover":"semantic.accent-hover","button-radius":"radius.sm","button-height-sm":32,"button-height-md":36,"button-height-lg":44,"field-bg":"semantic.surface","field-border":"semantic.border-strong","field-radius":"radius.sm","card-bg":"semantic.surface","card-border":"semantic.border","card-radius":"radius.md","table-border":"semantic.border","table-header-bg":"semantic.inset","table-row-height":52,"shell-sidebar-width":224}};
const ICONS={"IconArrowDown":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-down\"><path d=\"M12 5l0 14\"></path><path d=\"M18 13l-6 6\"></path><path d=\"M6 13l6 6\"></path></svg>","IconArrowUp":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-up\"><path d=\"M12 5l0 14\"></path><path d=\"M18 11l-6 -6\"></path><path d=\"M6 11l6 -6\"></path></svg>","IconArrowUpRight":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-up-right\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg>","IconChevronLeft":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-left\"><path d=\"M15 6l-6 6l6 6\"></path></svg>","IconChevronRight":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-right\"><path d=\"M9 6l6 6l-6 6\"></path></svg>","IconDownload":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-download\"><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path><path d=\"M7 11l5 5l5 -5\"></path><path d=\"M12 4l0 12\"></path></svg>","IconSearch":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-search\"><path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\"></path><path d=\"M21 21l-6 -6\"></path></svg>","IconLayoutDashboard":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-layout-dashboard\"><path d=\"M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path><path d=\"M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path></svg>","IconShoppingBag":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-shopping-bag\"><path d=\"M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M9 11v-5a3 3 0 0 1 6 0v5\"></path></svg>","IconActivity":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-activity\"><path d=\"M3 12h4l3 8l4 -16l3 8h4\"></path></svg>","IconChartBar":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chart-bar\"><path d=\"M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6\"></path><path d=\"M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10\"></path><path d=\"M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14\"></path><path d=\"M4 20h14\"></path></svg>","IconRefresh":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-refresh\"><path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\"></path><path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\"></path></svg>","IconCircleCheck":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-circle-check\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\"></path><path d=\"M9 12l2 2l4 -4\"></path></svg>"};
const BRAND_SVG="<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\"><path d=\"M10 4H30L36 10V30L30 36H10L4 30V10L10 4Z\" fill=\"#06677e\"/><path d=\"M14 12H28V18H18V26H28V32H14L10 28V16L14 12Z\" fill=\"white\"/></svg>\n";
const ORDER_DATA=[{"id":"CH-1048","customer":"Alex Morgan","email":"alex@northstar.example","initials":"AM","plan":"Scale","status":"Paid","amount":249,"date":"2026-10-14"},{"id":"CH-1047","customer":"Lina Chen","email":"lina@forma.example","initials":"LC","plan":"Growth","status":"Paid","amount":129,"date":"2026-10-13"},{"id":"CH-1046","customer":"Sam Rivera","email":"sam@meridian.example","initials":"SR","plan":"Starter","status":"Pending","amount":49,"date":"2026-10-12"},{"id":"CH-1045","customer":"Jordan Lee","email":"jordan@atlas.example","initials":"JL","plan":"Scale","status":"Paid","amount":249,"date":"2026-10-11"},{"id":"CH-1044","customer":"Maya Patel","email":"maya@relay.example","initials":"MP","plan":"Growth","status":"Paid","amount":129,"date":"2026-10-10"},{"id":"CH-1043","customer":"Noah Wilson","email":"noah@acme.example","initials":"NW","plan":"Starter","status":"Refunded","amount":49,"date":"2026-10-09"},{"id":"CH-1042","customer":"Emilia Rossi","email":"emilia@field.example","initials":"ER","plan":"Scale","status":"Paid","amount":249,"date":"2026-10-08"},{"id":"CH-1041","customer":"Oliver Park","email":"oliver@orbit.example","initials":"OP","plan":"Growth","status":"Paid","amount":129,"date":"2026-10-07"},{"id":"CH-1040","customer":"Sofia Davis","email":"sofia@studio.example","initials":"SD","plan":"Starter","status":"Paid","amount":49,"date":"2026-10-06"},{"id":"CH-1039","customer":"Ethan Brooks","email":"ethan@linear.example","initials":"EB","plan":"Scale","status":"Pending","amount":249,"date":"2026-10-05"},{"id":"CH-1038","customer":"Isla Kim","email":"isla@mono.example","initials":"IK","plan":"Growth","status":"Paid","amount":129,"date":"2026-10-04"},{"id":"CH-1037","customer":"Leo Martin","email":"leo@craft.example","initials":"LM","plan":"Starter","status":"Paid","amount":49,"date":"2026-10-03"},{"id":"CH-1036","customer":"Amara Singh","email":"amara@shift.example","initials":"AS","plan":"Scale","status":"Paid","amount":249,"date":"2026-10-02"},{"id":"CH-1035","customer":"Theo Wright","email":"theo@arc.example","initials":"TW","plan":"Growth","status":"Refunded","amount":129,"date":"2026-10-01"},{"id":"CH-1034","customer":"Nora Adams","email":"nora@open.example","initials":"NA","plan":"Starter","status":"Paid","amount":49,"date":"2026-10-14"},{"id":"CH-1033","customer":"Felix Stone","email":"felix@signal.example","initials":"FS","plan":"Scale","status":"Paid","amount":249,"date":"2026-10-13"},{"id":"CH-1032","customer":"Clara Ito","email":"clara@frame.example","initials":"CI","plan":"Growth","status":"Pending","amount":129,"date":"2026-10-12"},{"id":"CH-1031","customer":"Owen Hall","email":"owen@grid.example","initials":"OH","plan":"Starter","status":"Paid","amount":49,"date":"2026-10-11"}];
// Shared native Figma Plugin API helpers. TOKEN_DATA and ICONS are injected by build-figma.mjs.
const createdNodeIds = [];
const mutatedNodeIds = [];
const variableIds = [];
function remember(node) {
  createdNodeIds.push(node.id);
  return node;
}
function rgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  };
}
function flatten(object, prefix = '') {
  return Object.entries(object).flatMap(([k, v]) =>
    v && typeof v === 'object'
      ? flatten(v, prefix ? prefix + '.' + k : k)
      : [[prefix ? prefix + '.' + k : k, v]],
  );
}
function cssName(key) {
  return 'var(--ch-' + key.replaceAll('.', '-') + ')';
}
async function fonts() {
  const available = (await figma.listAvailableFontsAsync()).map((f) => f.fontName);
  for (const family of ['IBM Plex Sans', 'IBM Plex Mono'])
    for (const style of ['Regular', 'Medium']) {
      const font = available.find((f) => f.family === family && f.style === style);
      if (!font) throw new Error('Required product font not available: ' + family + ' ' + style);
      await figma.loadFontAsync(font);
    }
}
async function pageFor(name) {
  let page = figma.root.children.find((p) => p.name === name);
  if (!page) {
    page = remember(figma.createPage());
    page.name = name;
  }
  await figma.setCurrentPageAsync(page);
  return page;
}
async function tokenMap() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const variables = await figma.variables.getLocalVariablesAsync();
  const ownIds = new Set(
    collections.filter((c) => c.name.startsWith('Chamfer /')).map((c) => c.id),
  );
  const map = {};
  for (const v of variables.filter((v) => ownIds.has(v.variableCollectionId)))
    map[v.name.replaceAll('/', '.')] = v;
  return { map, collections };
}
function paint(variable) {
  if (!variable) throw new Error('Missing color variable');
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
    'color',
    variable,
  );
}
function fill(node, key, map) {
  node.fills = [paint(map[key])];
}
function border(node, key, map) {
  node.strokes = [paint(map[key])];
  node.strokeWeight = 1;
}
function bind(node, property, key, map) {
  if (!map[key]) throw new Error('Missing token ' + key);
  node.setBoundVariable(property, map[key]);
}
function frame(parent, name, width, height = 100, direction = 'VERTICAL') {
  const node = remember(
    typeof figma.createAutoLayout === 'function'
      ? figma.createAutoLayout(direction)
      : figma.createFrame(),
  );
  node.name = name;
  node.layoutMode = direction;
  node.resize(width, height);
  node.primaryAxisSizingMode = 'AUTO';
  node.counterAxisSizingMode = 'FIXED';
  node.fills = [];
  node.itemSpacing = 16;
  parent.appendChild(node);
  return node;
}
function padding(node, value, map) {
  for (const property of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'])
    bind(node, property, 'space.' + value, map);
}
function gap(node, value, map) {
  bind(node, 'itemSpacing', 'space.' + value, map);
}
function text(
  parent,
  value,
  size = 14,
  key = 'semantic.foreground',
  map = {},
  mono = false,
  weight = 'Regular',
  width,
) {
  const node = remember(figma.createText());
  node.name = value.slice(0, 60);
  node.fontName = { family: mono ? 'IBM Plex Mono' : 'IBM Plex Sans', style: weight };
  node.fontSize = size;
  node.lineHeight = { unit: 'PERCENT', value: 150 };
  node.characters = value;
  node.fills = [paint(map[key])];
  parent.appendChild(node);
  if (width) {
    node.textAutoResize = 'HEIGHT';
    node.resize(width, node.height);
  }
  return node;
}
function icon(parent, name, map, key = 'semantic.muted', size = 16) {
  const svg = ICONS[name];
  if (!svg) throw new Error('Missing source icon: ' + name);
  const node = remember(figma.createNodeFromSvg(svg));
  node.name = 'Icon / ' + name;
  node.resize(size, size);
  parent.appendChild(node);
  for (const child of node.findAll(() => true)) {
    createdNodeIds.push(child.id);
    if ('strokes' in child && Array.isArray(child.strokes) && child.strokes.length)
      child.strokes = child.strokes.map((p) => (p.type === 'SOLID' ? paint(map[key]) : p));
    if ('fills' in child && Array.isArray(child.fills) && child.fills.length)
      child.fills = child.fills.map((p) => (p.type === 'SOLID' ? paint(map[key]) : p));
  }
  return node;
}
function result(extra = {}) {
  return { createdNodeIds, mutatedNodeIds, variableIds, ...extra };
}
function setTheme(node, collections, mode) {
  const semantic = collections.find((c) => c.name === 'Chamfer / Semantic');
  if (!semantic) throw new Error('Missing semantic collection');
  const value = semantic.modes.find((m) => m.name === mode);
  if (!value) throw new Error('Missing ' + mode + ' mode');
  node.setExplicitVariableModeForCollection(semantic, value.modeId);
}
function getVariant(set, values) {
  return set.children.find(
    (c) =>
      c.type === 'COMPONENT' &&
      Object.entries(values).every(([k, v]) => c.variantProperties[k] === v),
  );
}
function instance(parent, component, label) {
  if (!component) throw new Error('Missing component variant');
  const node = remember(component.createInstance());
  parent.appendChild(node);
  for (const child of node.findAll(() => true)) createdNodeIds.push(child.id);
  if (label) {
    const definitions =
      component.parent.type === 'COMPONENT_SET'
        ? component.parent.componentPropertyDefinitions
        : component.componentPropertyDefinitions;
    const key = Object.keys(definitions).find((k) => k.startsWith('Label#'));
    if (key) node.setProperties({ [key]: label });
  }
  return node;
}

async function buildDashboard() {
  await fonts();
  const page = await pageFor('Chamfer / Dashboard');
  const { map, collections } = await tokenMap();
  const existing = page.children.find((n) => n.name === 'Dashboard / Desktop / Light');
  if (existing) return result({ pageId: page.id, frameId: existing.id, alreadyExists: true });
  const componentPage = figma.root.children.find((p) => p.name === 'Chamfer / Components');
  if (!componentPage) throw new Error('Run components first.');
  await componentPage.loadAsync();
  const sets = Object.fromEntries(
    componentPage.findAll((n) => n.type === 'COMPONENT_SET').map((n) => [n.name, n]),
  );
  const sorted = ORDER_DATA.slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);
  const money = (n) => '$' + n.toLocaleString('en-US');
  const date = (s) => 'Oct ' + Number(s.slice(-2));
  const frames = [];
  const shared = {};
  function row(parent, name, width, height) {
    const n = frame(parent, name, width, height, 'HORIZONTAL');
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisAlignItems = 'CENTER';
    gap(n, '3', map);
    return n;
  }
  function label(
    parent,
    value,
    size = 14,
    key = 'semantic.foreground',
    mono = false,
    weight = 'Regular',
    width,
  ) {
    return text(parent, value, size, key, map, mono, weight, width);
  }
  function panel(parent, name, width) {
    const n = frame(parent, name, width);
    padding(n, '6', map);
    gap(n, '4', map);
    fill(n, 'component.card-bg', map);
    border(n, 'component.card-border', map);
    bind(n, 'cornerRadius', 'component.card-radius', map);
    return n;
  }
  function button(parent, value, variant = 'secondary', size = 'md') {
    return instance(
      parent,
      getVariant(sets['Button / ' + variant], { Size: size, State: 'Default' }),
      value,
    );
  }
  function badge(parent, value, variant = 'neutral') {
    return instance(parent, getVariant(sets.Badge, { Variant: variant, Size: 'sm' }), value);
  }
  function avatar(parent, value, size = 28) {
    const n = frame(parent, 'Avatar', size, size, 'HORIZONTAL');
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisAlignItems = 'CENTER';
    n.primaryAxisAlignItems = 'CENTER';
    fill(n, 'semantic.subtle', map);
    border(n, 'semantic.border', map);
    bind(n, 'cornerRadius', 'radius.full', map);
    label(n, value, 9, 'semantic.muted');
    return n;
  }
  // Composed, reusable patterns from the dashboard, built once and instanced.
  function metricComponent() {
    const c = remember(figma.createComponent());
    c.name = 'Dashboard / Metric';
    c.layoutMode = 'VERTICAL';
    c.resize(272, 138);
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'FIXED';
    padding(c, '5', map);
    gap(c, '3', map);
    fill(c, 'component.card-bg', map);
    border(c, 'component.card-border', map);
    bind(c, 'cornerRadius', 'component.card-radius', map);
    c.x = 200;
    c.y = 200;
    page.appendChild(c);
    for (const [name, value, size, key, mono] of [
      ['Title', 'Revenue', 12, 'semantic.muted', false],
      ['Value', '$1,957', 27, 'semantic.foreground', true],
      ['Note', '13 paid orders', 11, 'semantic.muted', false],
    ]) {
      const t = label(c, value, size, key, mono, name === 'Value' ? 'Medium' : 'Regular');
      t.name = name;
      const prop = c.addComponentProperty(name, 'TEXT', value);
      t.componentPropertyReferences = { characters: prop };
    }
    c.description =
      'Dashboard composition using Card tokens. Matches the metric pattern in the React dashboard.';
    return c;
  }
  shared.metric = metricComponent();
  const rowComp = remember(figma.createComponent());
  rowComp.name = 'Dashboard / Order row';
  rowComp.layoutMode = 'HORIZONTAL';
  rowComp.resize(1150, 56);
  rowComp.primaryAxisSizingMode = 'FIXED';
  rowComp.counterAxisSizingMode = 'FIXED';
  rowComp.itemSpacing = 0;
  fill(rowComp, 'semantic.surface', map);
  border(rowComp, 'component.table-border', map);
  rowComp.strokeTopWeight = 0;
  rowComp.strokeLeftWeight = 0;
  rowComp.strokeRightWeight = 0;
  rowComp.x = 200;
  rowComp.y = 430;
  page.appendChild(rowComp);
  rowComp.description = 'Semantic table row composition from the sample orders screen.';
  const cellWidths = [110, 380, 135, 145, 185, 195];
  const propertyKeys = {};
  for (const [i, field] of ['Order', 'Customer', 'Plan', 'Status', 'Amount', 'Date'].entries()) {
    const cell = row(rowComp, field, cellWidths[i], 56);
    cell.paddingLeft = 20;
    cell.paddingRight = 20;
    if (field === 'Customer') {
      avatar(cell, 'AM');
      const info = frame(cell, 'Customer details', 280);
      info.itemSpacing = 0;
      const name = label(info, 'Alex Morgan', 12, 'semantic.foreground', false, 'Medium');
      const email = label(info, 'alex@northstar.example', 10, 'semantic.muted');
      propertyKeys.Customer = rowComp.addComponentProperty('Customer', 'TEXT', 'Alex Morgan');
      name.componentPropertyReferences = { characters: propertyKeys.Customer };
      propertyKeys.Email = rowComp.addComponentProperty('Email', 'TEXT', 'alex@northstar.example');
      email.componentPropertyReferences = { characters: propertyKeys.Email };
    } else if (field === 'Status') badge(cell, 'Paid', 'success');
    else {
      const value = { Order: 'CH-1048', Plan: 'Scale', Amount: '$249', Date: 'Oct 14' }[field];
      const t = label(
        cell,
        value,
        field === 'Order' ? 10 : 12,
        ['Order', 'Date'].includes(field) ? 'semantic.muted' : 'semantic.foreground',
        ['Order', 'Amount'].includes(field),
      );
      propertyKeys[field] = rowComp.addComponentProperty(field, 'TEXT', value);
      t.componentPropertyReferences = { characters: propertyKeys[field] };
    }
  }
  shared.orderRow = rowComp;
  const metricKeys = Object.fromEntries(
    Object.keys(shared.metric.componentPropertyDefinitions).map((k) => [k.split('#')[0], k]),
  );
  for (const [width, mode] of [
    [1440, 'Light'],
    [1440, 'Dark'],
    [390, 'Light'],
    [390, 'Dark'],
  ]) {
    const mobile = width === 390;
    const root = frame(page, `Dashboard / ${mobile ? 'Mobile' : 'Desktop'} / ${mode}`, width);
    root.x = 1100 + frames.length * 1640;
    root.y = 200;
    root.itemSpacing = 0;
    fill(root, 'semantic.canvas', map);
    setTheme(root, collections, mode);
    const top = row(root, 'Chamfer / Site navigation', width, mobile ? 102 : 72);
    top.paddingLeft = mobile ? 20 : 40;
    top.paddingRight = mobile ? 20 : 40;
    gap(top, '12', map);
    border(top, 'semantic.border', map);
    top.strokeTopWeight = 0;
    top.strokeLeftWeight = 0;
    top.strokeRightWeight = 0;
    if (mobile) {
      top.layoutMode = 'VERTICAL';
      top.counterAxisAlignItems = 'MIN';
      top.primaryAxisAlignItems = 'CENTER';
      gap(top, '6', map);
    }
    const brand = frame(top, 'Brand', 170, 28, 'HORIZONTAL');
    brand.counterAxisAlignItems = 'CENTER';
    gap(brand, '2', map);
    const logo = remember(figma.createNodeFromSvg(BRAND_SVG));
    logo.resize(28, 28);
    brand.appendChild(logo);
    for (const n of logo.findAll(() => true)) createdNodeIds.push(n.id);
    label(brand, 'chamfer/ui', 23, 'semantic.foreground', false, 'Medium');
    const navigation = frame(top, 'Navigation', mobile ? 350 : 660, 24, 'HORIZONTAL');
    gap(navigation, '6', map);
    for (const v of ['Documentation', 'Components', 'Foundations', 'Dashboard'])
      label(
        navigation,
        v,
        mobile ? 12 : 13,
        v === 'Dashboard' ? 'semantic.foreground' : 'semantic.muted',
      );
    const work = row(root, 'AppShell / Topbar', width, mobile ? 56 : 64);
    work.paddingLeft = 24;
    work.paddingRight = 24;
    border(work, 'semantic.border', map);
    work.strokeTopWeight = 0;
    work.strokeLeftWeight = 0;
    work.strokeRightWeight = 0;
    if (mobile) button(work, 'Menu', 'ghost', 'sm');
    const orbit = frame(work, 'Orbit', 28, 28, 'HORIZONTAL');
    orbit.primaryAxisSizingMode = 'FIXED';
    orbit.primaryAxisAlignItems = 'CENTER';
    orbit.counterAxisAlignItems = 'CENTER';
    fill(orbit, 'semantic.accent', map);
    bind(orbit, 'cornerRadius', 'radius.md', map);
    label(orbit, 'o', 20, 'semantic.accent-foreground', false, 'Medium');
    label(work, 'Orbit', 13, 'semantic.foreground', false, 'Medium');
    if (!mobile) label(work, '/  Workspace', 13, 'semantic.muted');
    const body = frame(root, 'AppShell / Body', width, 100, 'HORIZONTAL');
    body.itemSpacing = 0;
    body.counterAxisAlignItems = 'MIN';
    if (!mobile) {
      const sidebar = frame(body, 'AppShell / Sidebar', 224);
      padding(sidebar, '5', map);
      gap(sidebar, '6', map);
      fill(sidebar, 'semantic.inset', map);
      label(sidebar, 'Orbit workspace', 12, 'semantic.foreground', false, 'Medium');
      label(sidebar, 'Foundation demo', 10, 'semantic.muted');
      for (const [title, iconName] of [
        ['Overview', 'IconLayoutDashboard'],
        ['Orders', 'IconShoppingBag'],
        ['Revenue', 'IconChartBar'],
        ['Activity', 'IconActivity'],
      ]) {
        const nav = row(sidebar, title, 184, 40);
        padding(nav, '3', map);
        if (title === 'Overview') {
          fill(nav, 'semantic.accent-soft', map);
          bind(nav, 'cornerRadius', 'radius.sm', map);
        }
        icon(nav, iconName, map, title === 'Overview' ? 'semantic.accent' : 'semantic.muted');
        label(nav, title, 13, title === 'Overview' ? 'semantic.accent' : 'semantic.muted');
      }
      label(
        sidebar,
        'One system.\nReady for your product.',
        14,
        'semantic.foreground',
        false,
        'Regular',
        180,
      );
      label(sidebar, 'Explore the components ↗', 11, 'semantic.accent');
      const profile = row(sidebar, 'Profile', 180, 48);
      avatar(profile, 'AM');
      label(profile, 'Alex Morgan\nDemo account', 11, 'semantic.muted');
    }
    const main = frame(body, 'AppShell / Main', mobile ? 390 : 1216);
    padding(main, mobile ? '4' : '8', map);
    gap(main, '6', map);
    const content = mobile ? 358 : 1152;
    label(main, 'Orbit workspace  /  Overview', 11, 'semantic.muted');
    const heading = frame(
      main,
      'Dashboard / Heading',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    heading.counterAxisAlignItems = mobile ? 'MIN' : 'CENTER';
    gap(heading, '6', map);
    const headingText = frame(heading, 'Heading', mobile ? 358 : 700);
    gap(headingText, '2', map);
    label(
      headingText,
      'Workspace overview',
      mobile ? 25 : 28,
      'semantic.foreground',
      false,
      'Medium',
    );
    label(
      headingText,
      'A clear view of your business, down to the details.',
      mobile ? 12 : 13,
      'semantic.muted',
      false,
      'Regular',
      mobile ? 350 : 650,
    );
    const actions = frame(heading, 'Actions', mobile ? 358 : 290, 36, 'HORIZONTAL');
    actions.counterAxisAlignItems = 'CENTER';
    gap(actions, '3', map);
    button(actions, 'Oct 1–14, 2026');
    button(actions, 'Export');
    const metrics = frame(main, 'Dashboard / Metrics', content);
    gap(metrics, mobile ? '3' : '4', map);
    const metricValues = [
      ['Revenue', '$1,957', '13 paid orders'],
      ['Orders', '18', 'Across three plans'],
      ['Customers', '18', 'Unique sample customers'],
      ['Pending', '3', 'Awaiting payment'],
    ];
    for (let i = 0; i < (mobile ? 2 : 1); i++) {
      const metricRow = frame(metrics, 'Metric row', content, 138, 'HORIZONTAL');
      gap(metricRow, mobile ? '3' : '4', map);
      for (const [title, value, note] of metricValues.slice(
        mobile ? i * 2 : 0,
        mobile ? i * 2 + 2 : 4,
      )) {
        const n = instance(metricRow, shared.metric);
        n.resize(mobile ? 173 : 276, 138);
        n.setProperties({
          [metricKeys.Title]: title,
          [metricKeys.Value]: value,
          [metricKeys.Note]: note,
        });
      }
    }
    const middle = frame(
      main,
      'Dashboard / Panels',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    gap(middle, mobile ? '4' : '6', map);
    const revenue = panel(middle, 'Revenue over time', mobile ? 358 : 676);
    label(revenue, 'Revenue over time', 15, 'semantic.foreground', false, 'Medium');
    label(revenue, 'Paid orders · Oct 1–14, 2026', 11, 'semantic.muted');
    const chart = frame(revenue, 'Daily paid revenue', mobile ? 310 : 628, 180);
    chart.primaryAxisSizingMode = 'FIXED';
    chart.layoutMode = 'NONE';
    const values = Array.from({ length: 14 }, (_, i) =>
      ORDER_DATA.filter((o) => o.status === 'Paid' && Number(o.date.slice(-2)) === i + 1).reduce(
        (s, o) => s + o.amount,
        0,
      ),
    );
    const max = Math.max(...values, 300);
    for (let i = 0; i < 14; i++) {
      const bar = remember(figma.createRectangle());
      const h = (values[i] / max) * 130;
      bar.resize(mobile ? 10 : 22, Math.max(h, 0.01));
      bar.x = 20 + (i * (chart.width - 40)) / 14;
      bar.y = 145 - h;
      fill(bar, 'semantic.accent', map);
      bar.opacity = i === 13 ? 1 : 0.55;
      bar.cornerRadius = 2;
      chart.appendChild(bar);
      const t = label(chart, String(i + 1), 10, 'semantic.muted', true);
      t.x = bar.x;
      t.y = 160;
    }
    label(
      revenue,
      'October · Sample data     $1,957 selected period',
      10,
      'semantic.muted',
      false,
      'Regular',
      mobile ? 310 : 628,
    );
    const activity = panel(middle, 'Recent activity', mobile ? 358 : 452);
    label(activity, 'Recent activity', 15, 'semantic.foreground', false, 'Medium');
    label(activity, 'The latest in your workspace', 11, 'semantic.muted');
    for (const o of ORDER_DATA.slice(0, 3)) {
      const item = frame(
        activity,
        'Activity / ' + o.customer,
        mobile ? 310 : 404,
        100,
        'HORIZONTAL',
      );
      gap(item, '3', map);
      icon(item, 'IconCircleCheck', map, 'semantic.success');
      const lines = frame(item, 'Details', mobile ? 280 : 374);
      lines.itemSpacing = 4;
      label(
        lines,
        o.customer.split(' ')[0] +
          ' ' +
          (o.status === 'Paid' ? 'completed a payment' : 'started an order'),
        11,
        'semantic.foreground',
        false,
        'Regular',
        mobile ? 280 : 374,
      );
      label(
        lines,
        o.plan + ' plan · ' + money(o.amount) + ' · ' + date(o.date),
        10,
        'semantic.muted',
      );
    }
    label(activity, 'View all orders ↗', 11, 'semantic.accent');
    const orders = frame(main, 'Dashboard / Orders', content);
    orders.itemSpacing = 0;
    fill(orders, 'semantic.surface', map);
    border(orders, 'semantic.border', map);
    bind(orders, 'cornerRadius', 'radius.md', map);
    orders.clipsContent = true;
    const orderHeading = frame(orders, 'Orders heading', content);
    padding(orderHeading, '5', map);
    gap(orderHeading, '2', map);
    label(orderHeading, 'Orders  18', 15, 'semantic.foreground', false, 'Medium');
    label(orderHeading, 'Manage and review your recent transactions.', 11, 'semantic.muted');
    const toolbar = frame(
      orders,
      'Orders toolbar',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    padding(toolbar, '5', map);
    gap(toolbar, '3', map);
    const search = row(toolbar, 'Search orders', mobile ? 318 : 290, 36);
    search.paddingLeft = 12;
    fill(search, 'component.field-bg', map);
    border(search, 'component.field-border', map);
    bind(search, 'cornerRadius', 'component.field-radius', map);
    icon(search, 'IconSearch', map);
    label(search, 'Search name, email, or order…', 14, 'semantic.muted');
    button(toolbar, 'All statuses');
    button(toolbar, 'Export CSV', 'secondary', 'sm');
    const table = frame(orders, 'Table / Orders', 1152);
    table.itemSpacing = 0;
    const header = row(table, 'Column headers', 1152, 40);
    header.itemSpacing = 0;
    fill(header, 'component.table-header-bg', map);
    for (const [i, title] of ['Order', 'Customer', 'Plan', 'Status', 'Amount', 'Date'].entries()) {
      const cell = row(header, title, cellWidths[i], 40);
      cell.paddingLeft = 20;
      label(cell, title, 12, 'semantic.muted', false, 'Medium');
    }
    for (const o of sorted) {
      const n = instance(table, shared.orderRow);
      n.setProperties({
        [propertyKeys.Order]: o.id,
        [propertyKeys.Customer]: o.customer,
        [propertyKeys.Email]: o.email,
        [propertyKeys.Plan]: o.plan,
        [propertyKeys.Amount]: money(o.amount),
        [propertyKeys.Date]: date(o.date),
      });
      const status = n.findAll((n) => n.type === 'INSTANCE' && n.name === 'Badge')[0];
      if (status) {
        const component = getVariant(sets.Badge, {
          Variant: o.status === 'Paid' ? 'success' : o.status === 'Pending' ? 'warning' : 'neutral',
          Size: 'sm',
        });
        status.swapComponent(component);
        const labelKey = Object.keys(sets.Badge.componentPropertyDefinitions).find((k) =>
          k.startsWith('Label#'),
        );
        status.setProperties({ [labelKey]: o.status });
      }
    }
    const pagination = frame(orders, 'Pagination', content, 60, mobile ? 'VERTICAL' : 'HORIZONTAL');
    padding(pagination, '4', map);
    gap(pagination, '3', map);
    label(pagination, '1–6 of 18 orders', 11, 'semantic.muted');
    label(pagination, 'Page 1 of 3    ‹    ›', 11, 'semantic.muted');
    label(
      main,
      'Illustrative data · No live business or payment connection',
      10,
      'semantic.muted',
      false,
      'Regular',
      content,
    );
    frames.push({ id: root.id, name: root.name, width: root.width, height: root.height });
  }
  return result({
    pageId: page.id,
    frames,
    sharedComponents: { metric: shared.metric.id, orderRow: shared.orderRow.id },
    nativeEditable: true,
  });
}

return await buildDashboard();
