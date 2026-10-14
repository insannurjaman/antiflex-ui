const TOKEN_DATA={"primitives":{"color":{"neutral":{"0":"#ffffff","25":"#fbfcfd","50":"#f5f7f9","100":"#edf0f3","200":"#dce2e8","300":"#bac5d0","400":"#8995a4","500":"#617083","600":"#465568","700":"#344254","800":"#202c3a","900":"#131c27","950":"#0c131d"},"cyan":{"50":"#e9f9fc","100":"#cdf1f8","400":"#48cce3","500":"#16b0ce","600":"#07819c","700":"#06677e","900":"#10313d"},"green":{"50":"#eaf7f0","400":"#61d6a0","700":"#21754c","900":"#153629"},"amber":{"50":"#fff5e3","400":"#f4c46b","700":"#895915","900":"#3b2c16"},"red":{"50":"#ffedef","400":"#ff8d9b","700":"#b53649","900":"#3d202b"}},"space":{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"8":32,"10":40,"12":48,"16":64},"radius":{"none":0,"sm":4,"md":6,"lg":8,"full":999},"font":{"sans":"IBM Plex Sans","mono":"IBM Plex Mono"},"fontSize":{"xs":12,"sm":14,"md":16,"lg":20,"xl":28,"display":56},"lineHeight":{"tight":1.15,"body":1.5},"border":{"thin":1},"elevation":{"low":"0 2px 8px rgb(12 19 29 / 0.06)"},"duration":{"fast":120,"normal":200}},"semantic":{"light":{"canvas":"color.neutral.0","surface":"color.neutral.0","subtle":"color.neutral.50","inset":"color.neutral.25","foreground":"color.neutral.900","muted":"color.neutral.500","border":"color.neutral.200","border-strong":"color.neutral.300","accent":"color.cyan.700","accent-hover":"color.cyan.900","accent-soft":"color.cyan.50","accent-foreground":"color.neutral.0","focus":"color.cyan.600","success":"color.green.700","success-soft":"color.green.50","warning":"color.amber.700","warning-soft":"color.amber.50","danger":"color.red.700","danger-soft":"color.red.50"},"dark":{"canvas":"color.neutral.950","surface":"color.neutral.900","subtle":"color.neutral.800","inset":"color.neutral.950","foreground":"color.neutral.50","muted":"color.neutral.300","border":"color.neutral.700","border-strong":"color.neutral.500","accent":"color.cyan.400","accent-hover":"color.cyan.100","accent-soft":"color.cyan.900","accent-foreground":"color.neutral.950","focus":"color.cyan.400","success":"color.green.400","success-soft":"color.green.900","warning":"color.amber.400","warning-soft":"color.amber.900","danger":"color.red.400","danger-soft":"color.red.900"}},"components":{"button-bg":"semantic.accent","button-fg":"semantic.accent-foreground","button-bg-hover":"semantic.accent-hover","button-radius":"radius.sm","button-height-sm":32,"button-height-md":36,"button-height-lg":44,"field-bg":"semantic.surface","field-border":"semantic.border-strong","field-radius":"radius.sm","card-bg":"semantic.surface","card-border":"semantic.border","card-radius":"radius.md","table-border":"semantic.border","table-header-bg":"semantic.inset","table-row-height":52,"shell-sidebar-width":224}};
const ICONS={"IconSun":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-sun\"><path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\"></path><path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\"></path></svg>","IconMoon":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-moon\"><path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\"></path></svg>","IconArrowDown":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-down\"><path d=\"M12 5l0 14\"></path><path d=\"M18 13l-6 6\"></path><path d=\"M6 13l6 6\"></path></svg>","IconArrowUp":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-up\"><path d=\"M12 5l0 14\"></path><path d=\"M18 11l-6 -6\"></path><path d=\"M6 11l6 -6\"></path></svg>","IconArrowUpRight":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-arrow-up-right\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg>","IconChevronLeft":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-left\"><path d=\"M15 6l-6 6l6 6\"></path></svg>","IconChevronRight":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-right\"><path d=\"M9 6l6 6l-6 6\"></path></svg>","IconDownload":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-download\"><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path><path d=\"M7 11l5 5l5 -5\"></path><path d=\"M12 4l0 12\"></path></svg>","IconSearch":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-search\"><path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\"></path><path d=\"M21 21l-6 -6\"></path></svg>","IconLayoutDashboard":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-layout-dashboard\"><path d=\"M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path><path d=\"M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path></svg>","IconShoppingBag":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-shopping-bag\"><path d=\"M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M9 11v-5a3 3 0 0 1 6 0v5\"></path></svg>","IconActivity":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-activity\"><path d=\"M3 12h4l3 8l4 -16l3 8h4\"></path></svg>","IconChartBar":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chart-bar\"><path d=\"M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6\"></path><path d=\"M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10\"></path><path d=\"M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14\"></path><path d=\"M4 20h14\"></path></svg>","IconRefresh":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-refresh\"><path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\"></path><path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\"></path></svg>","IconCircleCheck":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-circle-check\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\"></path><path d=\"M9 12l2 2l4 -4\"></path></svg>"};
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
function paint(variable, consumer) {
  if (!variable) throw new Error('Missing color variable');
  return figma.variables.setBoundVariableForPaint(
    {
      type: 'SOLID',
      color: consumer ? variable.resolveForConsumer(consumer).value : { r: 0, g: 0, b: 0 },
    },
    'color',
    variable,
  );
}
function fill(node, key, map) {
  node.fills = [paint(map[key], node)];
}
function border(node, key, map) {
  node.strokes = [paint(map[key], node)];
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
  node.primaryAxisSizingMode = direction === 'HORIZONTAL' ? 'FIXED' : 'AUTO';
  node.counterAxisSizingMode = direction === 'HORIZONTAL' && height === 100 ? 'AUTO' : 'FIXED';
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
  const sizeToken = Object.keys(map).find(
    (key) => key.startsWith('fontSize.') && Object.values(map[key].valuesByMode)[0] === size,
  );
  if (sizeToken) bind(node, 'fontSize', sizeToken, map);
  if (map['font.' + (mono ? 'mono' : 'sans')])
    bind(node, 'fontFamily', 'font.' + (mono ? 'mono' : 'sans'), map);
  node.lineHeight = { unit: 'PERCENT', value: 150 };
  node.characters = value;
  node.fills = [paint(map[key], node)];
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
      child.strokes = child.strokes.map((p) => (p.type === 'SOLID' ? paint(map[key], child) : p));
    if ('fills' in child && Array.isArray(child.fills) && child.fills.length)
      child.fills = child.fills.map((p) => (p.type === 'SOLID' ? paint(map[key], child) : p));
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
  node.name = component.parent.type === 'COMPONENT_SET' ? component.parent.name : component.name;
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
async function bindTypography(page, map) {
  const styles = await figma.getLocalTextStylesAsync();
  const sizeTokens = Object.keys(map).filter((key) => key.startsWith('fontSize.'));
  for (const node of page.findAll((node) => node.type === 'TEXT')) {
    let parent = node.parent;
    let inInstance = false;
    while (parent && parent.type !== 'PAGE') {
      if (parent.type === 'INSTANCE') inInstance = true;
      parent = parent.parent;
    }
    if (inInstance || node.fontName === figma.mixed) continue;
    const font = node.fontName;
    for (const usedFont of node.getRangeAllFontNames(0, node.characters.length))
      await figma.loadFontAsync(usedFont);
    const matching = styles.find(
      (style) =>
        style.name.startsWith('Chamfer /') &&
        style.fontName.family === font.family &&
        style.fontName.style === font.style &&
        style.fontSize === node.fontSize &&
        style.lineHeight.unit === node.lineHeight.unit &&
        style.lineHeight.value === node.lineHeight.value,
    );
    if (matching) await node.setTextStyleIdAsync(matching.id);
    const sizeKey = sizeTokens.find(
      (key) => Math.abs(Object.values(map[key].valuesByMode)[0] - node.fontSize) < 0.001,
    );
    if (sizeKey) bind(node, 'fontSize', sizeKey, map);
    if (font.family === 'IBM Plex Sans' || font.family === 'IBM Plex Mono')
      bind(node, 'fontFamily', font.family === 'IBM Plex Sans' ? 'font.sans' : 'font.mono', map);
    mutatedNodeIds.push(node.id);
  }
}

// Shared final geometry pass used by the generator and the live-file reconciliation.
async function reconcileDashboard(root, map, collections, sets, metric) {
  const mobile = root.width === 390;
  const content = mobile ? 358 : 1152;
  const find = (name) => root.findOne((n) => n.name === name && n.type === 'FRAME');
  const hug = (n) => {
    n.primaryAxisSizingMode = 'AUTO';
  };
  const fixedWidth = (n, width) => {
    n.resize(width, n.height);
    n.layoutSizingHorizontal = 'FIXED';
  };
  const label = (
    p,
    value,
    size = 11,
    key = 'semantic.muted',
    mono = false,
    weight = 'Regular',
    width,
  ) => text(p, value, size, key, map, mono, weight, width);
  const makeButton = (p, value, variant = 'secondary', size = 'sm') =>
    instance(p, getVariant(sets['Button / ' + variant], { Size: size, State: 'Default' }), value);
  for (const n of root.findAll(
    (n) =>
      n.type === 'FRAME' &&
      ['AppShell / Body', 'Dashboard / Heading', 'Dashboard / Panels', 'Orders toolbar'].includes(
        n.name,
      ),
  )) {
    if (n.layoutMode === 'HORIZONTAL') n.counterAxisSizingMode = 'AUTO';
  }
  const brand = find('Brand');
  const logo = brand.children.find((n) => n.type === 'FRAME');
  if (logo)
    logo
      .findAll((n) => n.type === 'VECTOR')
      .forEach((n, i) => fill(n, i === 0 ? 'semantic.accent' : 'semantic.canvas', map));
  const nav = find('Navigation');
  if (mobile) { gap(nav, '3', map); fixedWidth(nav, 350); }
  const dashboardLink = nav.findOne((n) => n.type === 'TEXT' && n.characters === 'Dashboard');
  if (dashboardLink) dashboardLink.characters = 'Dashboard demo';
  if (!mobile && !find('Site tools')) {
    nav.layoutGrow = 1;
    const tools = frame(find('Chamfer / Site navigation'), 'Site tools', 110, 32, 'HORIZONTAL');
    tools.counterAxisAlignItems = 'CENTER';
    gap(tools, '4', map);
    instance(tools, getVariant(sets.Badge, { Variant: 'neutral', Size: 'sm' }), 'v0.1.0');
    const theme = frame(tools, 'Theme control', 32, 32, 'HORIZONTAL');
    theme.primaryAxisAlignItems = 'CENTER';
    theme.counterAxisAlignItems = 'CENTER';
    fill(theme, 'semantic.subtle', map);
    bind(theme, 'cornerRadius', 'radius.sm', map);
    icon(theme, root.name.endsWith('Dark') ? 'IconSun' : 'IconMoon', map);
  }
  const heading = find('Dashboard / Heading');
  fixedWidth(heading, content);
  if (!mobile) {
    heading.primaryAxisAlignItems = 'SPACE_BETWEEN';
    fixedWidth(heading.children[0], content - 310);
  }
  const title = heading.findOne((n) => n.type === 'TEXT' && n.characters === 'Workspace overview');
  title.lineHeight = { unit: 'PERCENT', value: 120 };
  title.letterSpacing = { unit: 'PIXELS', value: -0.8 };
  const sidebar = find('AppShell / Sidebar');
  if (sidebar && !sidebar.children.some((n) => n.name === 'Workspace sections')) {
    sidebar.layoutSizingVertical = 'FILL';
    padding(sidebar, '3', map);
    gap(sidebar, '6', map);
    const workspace = frame(sidebar, 'Workspace selection', 200, 48, 'HORIZONTAL');
    workspace.counterAxisAlignItems = 'CENTER';
    gap(workspace, '3', map);
    const orbit = frame(workspace, 'Workspace avatar', 30, 30, 'HORIZONTAL');
    orbit.primaryAxisAlignItems = 'CENTER';
    orbit.counterAxisAlignItems = 'CENTER';
    fill(orbit, 'semantic.accent', map);
    bind(orbit, 'cornerRadius', 'radius.md', map);
    label(orbit, 'o', 18, 'semantic.accent-foreground', false, 'Medium');
    const info = frame(workspace, 'Workspace information', 150);
    gap(info, '1', map);
    for (const n of sidebar.children.slice())
      if (n.type === 'TEXT' && ['Orbit workspace', 'Foundation demo'].includes(n.characters))
        info.appendChild(n);
    sidebar.insertChild(0, workspace);
    const links = frame(sidebar, 'Workspace sections', 200);
    gap(links, '1', map);
    for (const n of sidebar.children.slice())
      if (['Overview', 'Orders', 'Revenue', 'Activity'].includes(n.name)) {
        links.appendChild(n);
        fixedWidth(n, 200);
      }
    sidebar.insertChild(1, links);
    const note = frame(sidebar, 'Chamfer product note', 200);
    gap(note, '4', map);
    padding(note, '3', map);
    note.paddingTop = 48;
    label(note, 'BUILT WITH CHAMFER', 9, 'semantic.muted', true);
    for (const n of sidebar.children.slice())
      if (
        n.type === 'TEXT' &&
        (n.characters.startsWith('One system.') ||
          n.characters.startsWith('Explore the components'))
      )
        note.appendChild(n);
    sidebar.insertChild(2, note);
  }
  for (const name of ['Revenue over time', 'Recent activity']) {
    const panel = find(name);
    if (!panel.children.some((n) => n.name === 'Panel heading')) {
      const header = frame(panel, 'Panel heading', panel.width - (mobile ? 40 : 48));
      gap(header, '1', map);
      for (const n of panel.children.slice(0, 2)) header.appendChild(n);
      panel.insertChild(0, header);
      gap(panel, '6', map);
      if (mobile) padding(panel, '5', map);
    }
    if (name === 'Recent activity' && !mobile) panel.layoutSizingVertical = 'FILL';
  }
  const toolbar = find('Orders toolbar');
  fixedWidth(toolbar, content);
  toolbar.paddingTop = 0;
  toolbar.paddingLeft = mobile ? 16 : 20;
  toolbar.paddingRight = mobile ? 16 : 20;
  if (!toolbar.children.some((n) => n.name === 'Order actions')) {
    const actions = frame(toolbar, 'Order actions', mobile ? 326 : 226, 36, 'HORIZONTAL');
    gap(actions, '3', map);
    actions.counterAxisAlignItems = 'CENTER';
    for (const n of toolbar.children.slice()) if (n.type === 'INSTANCE') actions.appendChild(n);
    if (mobile) {
      fixedWidth(actions, 326);
      actions.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else {
      toolbar.primaryAxisAlignItems = 'SPACE_BETWEEN';
    }
  }
  if (mobile) fixedWidth(find('Search orders'), 326);
  const pagination = find('Pagination');
  fixedWidth(pagination, content);
  if (!pagination.children.some((n) => n.name === 'Page controls')) {
    const old = pagination.children.find(
      (n) => n.type === 'TEXT' && n.characters.startsWith('Page 1'),
    );
    const controls = frame(pagination, 'Page controls', mobile ? 326 : 172, 32, 'HORIZONTAL');
    controls.counterAxisAlignItems = 'CENTER';
    gap(controls, '3', map);
    makeButton(controls, '‹');
    if (old) {
      old.characters = 'Page 1 of 3';
      controls.appendChild(old);
    }
    makeButton(controls, '›');
    if (mobile) {
      pagination.primaryAxisSizingMode = 'AUTO';
      fixedWidth(controls, 326);
      controls.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else pagination.primaryAxisAlignItems = 'SPACE_BETWEEN';
  }
  if (!metric.children.some((n) => n.name === 'Metric heading')) {
    const header = frame(metric, 'Metric heading', 232, 18, 'HORIZONTAL');
    header.counterAxisAlignItems = 'CENTER';
    const title = metric.children.find((n) => n.name === 'Title');
    header.appendChild(title);
    title.layoutGrow = 1;
    for (const [name, iconName] of [
      ['Revenue', 'IconChartBar'],
      ['Orders', 'IconShoppingBag'],
      ['Customers', 'IconLayoutDashboard'],
      ['Pending', 'IconActivity'],
    ]) {
      const glyph = icon(header, iconName, map);
      glyph.name = 'Metric icon / ' + name;
      const prop = metric.addComponentProperty('Icon ' + name, 'BOOLEAN', name === 'Revenue');
      glyph.componentPropertyReferences = { visible: prop };
      glyph.visible = name === 'Revenue';
    }
    metric.insertChild(0, header);
    header.layoutSizingHorizontal = 'FILL';
    const value = metric.children.find((n) => n.name === 'Value');
    value.lineHeight = { unit: 'PERCENT', value: 120 };
    value.letterSpacing = { unit: 'PIXELS', value: -0.7 };
  }
  const definitions = Object.keys(metric.componentPropertyDefinitions);
  for (const n of root.findAll((n) => n.type === 'INSTANCE' && n.name === 'Dashboard / Metric')) {
    const titleKey = definitions.find((k) => k.startsWith('Title#'));
    const title = n.componentProperties[titleKey].value;
    const props = {};
    for (const key of definitions.filter((k) => k.startsWith('Icon ')))
      props[key] = key.split('#')[0] === 'Icon ' + title;
    n.setProperties(props);
  }
  mutatedNodeIds.push(root.id, metric.id);
}

async function buildFoundations() {
  await fonts();
  const page = await pageFor('Chamfer / Foundations');
  const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const existingVariables = await figma.variables.getLocalVariablesAsync();
  function collection(name, modes) {
    let c = existingCollections.find((c) => c.name === name);
    if (!c) {
      c = figma.variables.createVariableCollection(name);
      c.renameMode(c.modes[0].modeId, modes[0]);
      for (const name of modes.slice(1)) c.addMode(name);
    }
    return c;
  }
  const primitive = collection('Chamfer / Primitives', ['Value']);
  const semantic = collection('Chamfer / Semantic', ['Light', 'Dark']);
  const component = collection('Chamfer / Components', ['Value']);
  const map = {};
  function variable(c, key, type, scopes) {
    const name = key.replaceAll('.', '/');
    let v = existingVariables.find((v) => v.variableCollectionId === c.id && v.name === name);
    if (!v) v = figma.variables.createVariable(name, c, type);
    v.scopes = scopes;
    v.setVariableCodeSyntax('WEB', cssName(key));
    map[key] = v;
    variableIds.push(v.id);
    return v;
  }
  for (const [key, value] of flatten(TOKEN_DATA.primitives)) {
    // Elevation is represented as an effect style below rather than a string variable.
    if (key.startsWith('elevation.')) continue;
    const type = key.startsWith('color.')
      ? 'COLOR'
      : typeof value === 'number'
        ? 'FLOAT'
        : 'STRING';
    const scopes = key.startsWith('space.')
      ? ['GAP']
      : key.startsWith('radius.')
        ? ['CORNER_RADIUS']
        : key.startsWith('fontSize.')
          ? ['FONT_SIZE']
          : key.startsWith('font.')
            ? ['FONT_FAMILY']
            : [];
    const v = variable(primitive, key, type, scopes);
    v.setValueForMode(primitive.modes[0].modeId, type === 'COLOR' ? rgb(value) : value);
  }
  for (const [key, value] of Object.entries(TOKEN_DATA.semantic.light)) {
    const scopes =
      key.includes('border') || key === 'focus'
        ? ['STROKE_COLOR']
        : [
              'foreground',
              'muted',
              'accent',
              'accent-hover',
              'accent-foreground',
              'success',
              'warning',
              'danger',
            ].includes(key)
          ? ['TEXT_FILL', 'FRAME_FILL', 'SHAPE_FILL']
          : ['FRAME_FILL', 'SHAPE_FILL'];
    const v = variable(semantic, 'semantic.' + key, 'COLOR', scopes);
    for (const mode of ['Light', 'Dark']) {
      const target = map[TOKEN_DATA.semantic[mode.toLowerCase()][key]];
      v.setValueForMode(semantic.modes.find((m) => m.name === mode).modeId, {
        type: 'VARIABLE_ALIAS',
        id: target.id,
      });
    }
  }
  for (const [key, value] of Object.entries(TOKEN_DATA.components)) {
    const target = typeof value === 'string' ? map[value] : null;
    const type = target ? target.resolvedType : 'FLOAT';
    const scopes =
      type === 'COLOR'
        ? key.includes('border') || key === 'focus'
          ? ['STROKE_COLOR']
          : key.endsWith('-fg')
            ? ['TEXT_FILL']
            : ['FRAME_FILL', 'SHAPE_FILL']
        : key.includes('radius')
          ? ['CORNER_RADIUS']
          : ['WIDTH_HEIGHT'];
    const v = variable(component, 'component.' + key, type, scopes);
    v.setValueForMode(
      component.modes[0].modeId,
      target ? { type: 'VARIABLE_ALIAS', id: target.id } : value,
    );
  }
  const styles = await figma.getLocalTextStylesAsync();
  for (const [name, size, family, style] of [
    ['Display', 56, 'IBM Plex Sans', 'Medium'],
    ['Heading', 28, 'IBM Plex Sans', 'Medium'],
    ['Title', 20, 'IBM Plex Sans', 'Medium'],
    ['Body', 14, 'IBM Plex Sans', 'Regular'],
    ['Label', 12, 'IBM Plex Sans', 'Medium'],
    ['Code', 12, 'IBM Plex Mono', 'Regular'],
  ]) {
    let s = styles.find((s) => s.name === 'Chamfer / ' + name);
    if (!s) s = figma.createTextStyle();
    s.name = 'Chamfer / ' + name;
    s.fontName = { family, style };
    s.fontSize = size;
    s.lineHeight = { unit: 'PERCENT', value: 150 };
  }
  const effects = await figma.getLocalEffectStylesAsync();
  let elevation = effects.find((s) => s.name === 'Chamfer / Elevation / Low');
  if (!elevation) elevation = figma.createEffectStyle();
  elevation.name = 'Chamfer / Elevation / Low';
  elevation.effects = [
    {
      type: 'DROP_SHADOW',
      visible: true,
      blendMode: 'NORMAL',
      color: { ...rgb('#0c131d'), a: 0.06 },
      offset: { x: 0, y: 2 },
      radius: 8,
      spread: 0,
    },
  ];
  const existing = page.children.find((n) => n.name === 'Chamfer UI — Foundation');
  if (existing)
    return result({
      pageId: page.id,
      frameId: existing.id,
      variables: Object.keys(map).length,
      alreadyExists: true,
    });
  const board = frame(page, 'Chamfer UI — Foundation', 1240);
  board.x = 200;
  board.y = 200;
  padding(board, '12', map);
  gap(board, '8', map);
  fill(board, 'semantic.canvas', map);
  const brandRow = frame(board, 'Brand', 1144, 100, 'HORIZONTAL');
  brandRow.counterAxisAlignItems = 'CENTER';
  gap(brandRow, '4', map);
  const mark = remember(figma.createNodeFromSvg(BRAND_SVG));
  mark.name = 'Chamfer / Brand mark';
  mark.resize(48, 48);
  brandRow.appendChild(mark);
  for (const n of mark.findAll(() => true)) createdNodeIds.push(n.id);
  text(brandRow, 'chamfer/ui', 32, 'semantic.foreground', map, false, 'Medium');
  text(board, 'Precision UI for SaaS teams.', 56, 'semantic.foreground', map, false, 'Medium');
  text(
    board,
    'An original foundation. React + TypeScript + Tailwind CSS. Shared values in design and code.',
    16,
    'semantic.muted',
    map,
    false,
    'Regular',
    950,
  );
  text(board, 'Colors / Semantic themes', 28, 'semantic.foreground', map, false, 'Medium');
  for (const mode of ['Light', 'Dark']) {
    const sheet = frame(board, mode + ' / Color roles', 1144);
    padding(sheet, '6', map);
    setTheme(sheet, [semantic], mode);
    fill(sheet, 'semantic.canvas', map);
    border(sheet, 'semantic.border', map);
    bind(sheet, 'cornerRadius', 'radius.md', map);
    text(sheet, mode + ' theme', 20, 'semantic.foreground', map, false, 'Medium');
    const roles = [
      'canvas',
      'subtle',
      'border',
      'foreground',
      'accent',
      'success',
      'warning',
      'danger',
    ];
    for (let row = 0; row < 2; row++) {
      const strip = frame(sheet, 'Swatch row', 1096, 100, 'HORIZONTAL');
      gap(strip, '6', map);
      for (const role of roles.slice(row * 4, row * 4 + 4)) {
        const swatch = frame(strip, role, 256);
        const block = remember(figma.createRectangle());
        block.resize(256, 72);
        fill(block, 'semantic.' + role, map);
        border(block, 'semantic.border', map);
        bind(block, 'cornerRadius', 'radius.sm', map);
        swatch.appendChild(block);
        text(swatch, role, 12, 'semantic.muted', map, true);
      }
    }
  }
  text(board, 'Typography / IBM Plex', 28, 'semantic.foreground', map, false, 'Medium');
  text(board, 'Clarity at every scale.', 40, 'semantic.foreground', map, false, 'Medium');
  text(board, '0123456789  const precision = "intentional";', 24, 'semantic.foreground', map, true);
  text(board, 'Spacing / Four-pixel base', 28, 'semantic.foreground', map, false, 'Medium');
  for (const [key, value] of Object.entries(TOKEN_DATA.primitives.space).filter(
    ([, v]) => v > 0 && v <= 48,
  )) {
    const row = frame(board, 'space/' + key, 1144, 20, 'HORIZONTAL');
    row.counterAxisAlignItems = 'CENTER';
    gap(row, '6', map);
    text(row, 'space / ' + key, 12, 'semantic.muted', map, true, 'Regular', 120);
    const bar = remember(figma.createRectangle());
    bar.resize(value * 3, 12);
    fill(bar, 'semantic.accent-soft', map);
    border(bar, 'semantic.accent', map);
    row.appendChild(bar);
    text(row, value + 'px', 12, 'semantic.muted', map, true);
  }
  text(board, 'Shape / Motion', 28, 'semantic.foreground', map, false, 'Medium');
  text(
    board,
    'Controls: 4px. Content: 6px. Thin borders. Feedback: 120ms. General transitions: 200ms.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1050,
  );
  text(board, 'Getting started', 28, 'semantic.foreground', map, false, 'Medium');
  text(board, 'pnpm install  →  pnpm dev  →  pnpm storybook', 16, 'semantic.foreground', map, true);
  text(
    board,
    'Core code is MIT licensed. Chamfer Pro assets and commerce are a future milestone. Dashboard records are synthetic.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1050,
  );
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frameId: board.id,
    variables: Object.keys(map).length,
    collections: [primitive.id, semantic.id, component.id],
    bounds: { width: board.width, height: board.height },
  });
}

async function buildComponents() {
  await fonts();
  const page = await pageFor('Chamfer / Components');
  const { map, collections } = await tokenMap();
  if (!map['semantic.accent']) throw new Error('Run foundations first.');
  const existing = page.children.find((n) => n.name === 'Chamfer / Component specimens');
  if (existing) return result({ pageId: page.id, frameId: existing.id, alreadyExists: true });
  const sets = {};
  let y = 200;
  function component(name, width, height, direction = 'HORIZONTAL') {
    const c = remember(figma.createComponent());
    c.name = name;
    c.layoutMode = direction;
    c.resize(width, height);
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'FIXED';
    c.primaryAxisAlignItems = 'CENTER';
    c.counterAxisAlignItems = 'CENTER';
    c.fills = [];
    c.x = 200;
    c.y = y;
    page.appendChild(c);
    return c;
  }
  function group(name, variants, columns = 3) {
    const set = remember(figma.combineAsVariants(variants, page));
    set.name = name;
    set.description =
      'Matches the original React ' +
      name.split('/')[0].trim() +
      ' component. Native states, token bindings, and shared names.';
    set.x = 200;
    set.y = y;
    const width = Math.max(...variants.map((v) => v.width));
    const height = Math.max(...variants.map((v) => v.height));
    variants.forEach((v, i) => {
      v.x = 24 + (i % columns) * (width + 24);
      v.y = 24 + Math.floor(i / columns) * (height + 24);
    });
    set.resize(
      columns * (width + 24) + 24,
      Math.ceil(variants.length / columns) * (height + 24) + 24,
    );
    y += set.height + 64;
    sets[name] = set;
    return set;
  }
  function labelProperty(set, name = 'Label', defaultValue = 'Label', nodeName = 'Label') {
    const key = set.addComponentProperty(name, 'TEXT', defaultValue);
    for (const c of set.children)
      for (const t of c.findAll((n) => n.type === 'TEXT' && n.name === nodeName)) {
        let ancestor = t.parent;
        let insideInstance = false;
        while (ancestor && ancestor !== c) {
          if (ancestor.type === 'INSTANCE') {
            insideInstance = true;
            break;
          }
          ancestor = ancestor.parent;
        }
        if (!insideInstance) t.componentPropertyReferences = { characters: key };
      }
  }
  for (const variant of ['primary', 'secondary', 'ghost', 'danger']) {
    const variants = [];
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading']) {
        const height = { sm: 32, md: 36, lg: 44 }[size];
        const c = component(
          `Size=${size}, State=${state}`,
          size === 'sm' ? 130 : size === 'md' ? 150 : 176,
          height,
        );
        gap(c, '2', map);
        c.primaryAxisSizingMode = 'AUTO';
        const inset = { sm: '3', md: '4', lg: '5' }[size];
        bind(c, 'paddingLeft', 'space.' + inset, map);
        bind(c, 'paddingRight', 'space.' + inset, map);
        bind(c, 'cornerRadius', 'component.button-radius', map);
        bind(c, 'height', 'component.button-height-' + size, map);
        const bg =
          variant === 'primary'
            ? state === 'Hover'
              ? 'component.button-bg-hover'
              : 'component.button-bg'
            : variant === 'secondary'
              ? state === 'Hover'
                ? 'semantic.subtle'
                : 'semantic.surface'
              : variant === 'danger'
                ? 'semantic.danger-soft'
                : null;
        const fg =
          variant === 'primary'
            ? 'component.button-fg'
            : variant === 'danger'
              ? 'semantic.danger'
              : variant === 'ghost'
                ? 'semantic.muted'
                : 'semantic.foreground';
        if (bg) fill(c, bg, map);
        if (variant === 'ghost' && state === 'Hover') fill(c, 'semantic.subtle', map);
        if (variant === 'secondary') border(c, 'semantic.border-strong', map);
        if (variant === 'danger' && state === 'Hover') border(c, 'semantic.danger', map);
        if (state === 'Focus') {
          border(c, 'semantic.focus', map);
          c.strokeWeight = 2;
          c.strokeAlign = 'OUTSIDE';
        }
        if (state === 'Disabled') c.opacity = 0.5;
        if (state === 'Loading') {
          const spinner = remember(figma.createEllipse());
          spinner.resize(12, 12);
          spinner.fills = [];
          spinner.strokes = [paint(map[fg])];
          spinner.strokeWeight = 2;
          spinner.arcData = { startingAngle: 0, endingAngle: Math.PI * 1.5, innerRadius: 0 };
          c.appendChild(spinner);
        }
        const label = text(
          c,
          state === 'Loading' ? 'Save changes' : 'Save changes',
          size === 'sm' ? 12 : 14,
          fg,
          map,
          false,
          'Medium',
        );
        label.name = 'Label';
        label.lineHeight = { unit: 'PERCENT', value: 100 };
        variants.push(c);
      }
    const set = group('Button / ' + variant, variants, 3);
    labelProperty(set, 'Label', 'Save changes');
  }
  const fields = [];
  for (const size of ['sm', 'md', 'lg'])
    for (const state of ['Default', 'Focus', 'Error', 'Disabled', 'Filled']) {
      const c = component(`Size=${size}, State=${state}`, 320, 100, 'VERTICAL');
      c.primaryAxisSizingMode = 'AUTO';
      c.primaryAxisAlignItems = 'MIN';
      c.counterAxisAlignItems = 'MIN';
      gap(c, '2', map);
      const label = text(c, 'Project name', 14, 'semantic.foreground', map, false, 'Medium');
      label.name = 'Label';
      const control = frame(c, 'Control', 320, { sm: 32, md: 36, lg: 44 }[size], 'HORIZONTAL');
      control.primaryAxisSizingMode = 'FIXED';
      control.counterAxisAlignItems = 'CENTER';
      control.paddingLeft = 12;
      control.paddingRight = 12;
      fill(control, 'component.field-bg', map);
      border(control, state === 'Error' ? 'semantic.danger' : 'component.field-border', map);
      bind(control, 'cornerRadius', 'component.field-radius', map);
      if (state === 'Focus') {
        border(control, 'semantic.focus', map);
        control.strokeWeight = 2;
        control.strokeAlign = 'OUTSIDE';
      }
      const placeholder = text(
        control,
        state === 'Filled' ? 'Orbit workspace' : 'A new workspace',
        14,
        state === 'Filled' ? 'semantic.foreground' : 'semantic.muted',
        map,
      );
      placeholder.name = 'Value';
      const hint = text(
        c,
        state === 'Error' ? 'Enter a project name.' : 'Choose a name your team will recognize.',
        12,
        state === 'Error' ? 'semantic.danger' : 'semantic.muted',
        map,
      );
      hint.name = 'Hint';
      if (state === 'Disabled') control.opacity = 0.5;
      fields.push(c);
    }
  const fieldSet = group('TextField', fields);
  labelProperty(fieldSet, 'Label', 'Project name');
  labelProperty(fieldSet, 'Value', 'A new workspace', 'Value');
  labelProperty(fieldSet, 'Hint', 'Choose a name your team will recognize.', 'Hint');
  const badges = [];
  for (const variant of ['neutral', 'accent', 'success', 'warning', 'danger'])
    for (const size of ['sm', 'md']) {
      const c = component(`Variant=${variant}, Size=${size}`, 100, size === 'sm' ? 19 : 22);
      c.primaryAxisSizingMode = 'AUTO';
      c.paddingLeft = size === 'sm' ? 6 : 8;
      c.paddingRight = c.paddingLeft;
      bind(c, 'cornerRadius', 'radius.sm', map);
      fill(
        c,
        variant === 'neutral'
          ? 'semantic.subtle'
          : 'semantic.' + (variant === 'accent' ? 'accent-soft' : variant + '-soft'),
        map,
      );
      const label = text(
        c,
        {
          neutral: 'Draft',
          accent: 'New',
          success: 'Active',
          warning: 'In review',
          danger: 'Failed',
        }[variant],
        size === 'sm' ? 11 : 12,
        variant === 'neutral' ? 'semantic.muted' : 'semantic.' + variant,
        map,
        false,
        'Medium',
      );
      label.name = 'Label';
      badges.push(c);
    }
  const badgeSet = group('Badge', badges, 2);
  labelProperty(badgeSet, 'Label', 'Active');
  const cards = [];
  for (const variant of ['outline', 'subtle'])
    for (const value of ['none', 'sm', 'md', 'lg']) {
      const c = component(`Variant=${variant}, Padding=${value}`, 320, 150, 'VERTICAL');
      c.primaryAxisSizingMode = 'AUTO';
      c.primaryAxisAlignItems = 'MIN';
      c.counterAxisAlignItems = 'MIN';
      gap(c, '2', map);
      padding(c, { none: '0', sm: '3', md: '5', lg: '6' }[value], map);
      fill(c, variant === 'subtle' ? 'semantic.subtle' : 'component.card-bg', map);
      if (variant === 'outline') border(c, 'component.card-border', map);
      bind(c, 'cornerRadius', 'component.card-radius', map);
      const title = text(c, 'Workspace', 20, 'semantic.foreground', map, false, 'Medium');
      title.name = 'Label';
      text(
        c,
        'Give related content a clear boundary.',
        14,
        'semantic.muted',
        map,
        false,
        'Regular',
        270,
      );
      cards.push(c);
    }
  const cardSet = group('Card', cards, 2);
  labelProperty(cardSet, 'Label', 'Workspace');
  const separators = [];
  for (const orientation of ['horizontal', 'vertical'])
    for (const decorative of ['true', 'false']) {
      const c = component(
        `Orientation=${orientation}, Decorative=${decorative}`,
        orientation === 'horizontal' ? 240 : 1,
        orientation === 'horizontal' ? 1 : 48,
      );
      fill(c, 'semantic.border', map);
      separators.push(c);
    }
  group('Separator', separators, 2);
  const skeletons = [];
  for (const size of ['short', 'long']) {
    const c = component(`Width=${size}`, size === 'short' ? 160 : 240, 16);
    fill(c, 'semantic.subtle', map);
    bind(c, 'cornerRadius', 'radius.sm', map);
    skeletons.push(c);
  }
  group('Skeleton', skeletons, 2);
  const tables = [];
  for (const state of ['Default', 'Empty', 'Loading']) {
    const c = component(`State=${state}`, 640, 200, 'VERTICAL');
    c.primaryAxisSizingMode = 'AUTO';
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.itemSpacing = 0;
    fill(c, 'semantic.surface', map);
    const caption = text(c, 'Sample projects', 12, 'semantic.muted', map);
    caption.name = 'Label';
    const header = frame(c, 'Header', 640, 40, 'HORIZONTAL');
    header.primaryAxisSizingMode = 'FIXED';
    header.counterAxisAlignItems = 'CENTER';
    header.itemSpacing = 0;
    fill(header, 'component.table-header-bg', map);
    border(header, 'component.table-border', map);
    for (const [label, w] of [
      ['Project', 260],
      ['Status', 160],
      ['Owner', 220],
    ]) {
      const cell = frame(header, label, w, 40, 'HORIZONTAL');
      cell.primaryAxisSizingMode = 'FIXED';
      cell.counterAxisAlignItems = 'CENTER';
      cell.paddingLeft = 20;
      text(cell, label, 12, 'semantic.muted', map, false, 'Medium');
    }
    if (state === 'Empty') text(c, 'No projects yet.', 14, 'semantic.muted', map);
    else
      for (const [project, status, owner] of [
        ['Atlas', 'Active', 'Alex Kim'],
        ['Meridian', 'In review', 'Sam Rivera'],
        ['Forma', 'Active', 'Jordan Lee'],
      ]) {
        const row = frame(c, 'Row / ' + project, 640, 52, 'HORIZONTAL');
        row.primaryAxisSizingMode = 'FIXED';
        row.counterAxisAlignItems = 'CENTER';
        row.itemSpacing = 0;
        border(row, 'component.table-border', map);
        for (const [label, w] of [
          [project, 260],
          [status, 160],
          [owner, 220],
        ]) {
          const cell = frame(row, 'Cell', w, 52, 'HORIZONTAL');
          cell.primaryAxisSizingMode = 'FIXED';
          cell.counterAxisAlignItems = 'CENTER';
          cell.paddingLeft = 20;
          if (state === 'Loading') {
            const block = remember(figma.createRectangle());
            block.resize(100, 16);
            fill(block, 'semantic.subtle', map);
            bind(block, 'cornerRadius', 'radius.sm', map);
            cell.appendChild(block);
          } else if (label === status)
            instance(
              cell,
              getVariant(badgeSet, {
                Variant: status === 'Active' ? 'success' : 'warning',
                Size: 'md',
              }),
              status,
            );
          else text(cell, label, 14, 'semantic.foreground', map);
        }
      }
    tables.push(c);
  }
  const tableSet = group('Table', tables, 1);
  labelProperty(tableSet, 'Caption', 'Sample projects');
  const shells = [];
  for (const viewport of ['Desktop', 'Mobile']) {
    const width = viewport === 'Desktop' ? 720 : 390;
    const c = component(`Viewport=${viewport}`, width, 300, 'VERTICAL');
    c.itemSpacing = 0;
    fill(c, 'semantic.canvas', map);
    const top = frame(c, 'Topbar', width, 64, 'HORIZONTAL');
    top.primaryAxisSizingMode = 'FIXED';
    top.counterAxisAlignItems = 'CENTER';
    top.paddingLeft = 24;
    border(top, 'semantic.border', map);
    if (viewport === 'Mobile')
      instance(top, getVariant(sets['Button / ghost'], { Size: 'sm', State: 'Default' }), 'Menu');
    text(top, 'Sample workspace', 14, 'semantic.foreground', map, false, 'Medium');
    const body = frame(c, 'Body', width, 236, 'HORIZONTAL');
    body.primaryAxisSizingMode = 'FIXED';
    body.itemSpacing = 0;
    if (viewport === 'Desktop') {
      const sidebar = frame(body, 'Sidebar', 224, 236);
      sidebar.primaryAxisSizingMode = 'FIXED';
      padding(sidebar, '5', map);
      fill(sidebar, 'semantic.inset', map);
      text(sidebar, 'Overview', 14, 'semantic.accent', map);
      text(sidebar, 'Projects', 14, 'semantic.muted', map);
    }
    const main = frame(body, 'Main', width - (viewport === 'Desktop' ? 224 : 0), 236);
    main.primaryAxisSizingMode = 'FIXED';
    padding(main, '8', map);
    text(main, 'Overview', 20, 'semantic.foreground', map, false, 'Medium');
    text(
      main,
      'A frame for your primary task.',
      14,
      'semantic.muted',
      map,
      false,
      'Regular',
      main.width - 64,
    );
    shells.push(c);
  }
  group('AppShell', shells, 1);
  const review = frame(page, 'Chamfer / Component specimens', 1240);
  review.x = 1700;
  review.y = 200;
  padding(review, '12', map);
  gap(review, '8', map);
  fill(review, 'semantic.canvas', map);
  text(
    review,
    'Original components. Complete details.',
    40,
    'semantic.foreground',
    map,
    false,
    'Medium',
  );
  text(
    review,
    'Token-bound instances in light and dark modes. Main components remain outside this review frame.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1144,
  );
  for (const mode of ['Light', 'Dark']) {
    const sheet = frame(review, mode + ' / Specimens', 1144);
    padding(sheet, '6', map);
    gap(sheet, '6', map);
    setTheme(sheet, collections, mode);
    fill(sheet, 'semantic.canvas', map);
    border(sheet, 'semantic.border', map);
    bind(sheet, 'cornerRadius', 'radius.md', map);
    text(sheet, mode + ' theme', 28, 'semantic.foreground', map, false, 'Medium');
    for (const [label, name, props] of [
      ['Button', 'Button / primary', { Size: 'md', State: 'Default' }],
      ['TextField', 'TextField', { Size: 'md', State: 'Default' }],
      ['Badge', 'Badge', { Variant: 'success', Size: 'md' }],
      ['Card', 'Card', { Variant: 'outline', Padding: 'md' }],
      ['Separator', 'Separator', { Orientation: 'horizontal', Decorative: 'false' }],
      ['Skeleton', 'Skeleton', { Width: 'long' }],
      ['Table', 'Table', { State: 'Default' }],
      ['AppShell', 'AppShell', { Viewport: 'Desktop' }],
    ]) {
      const section = frame(sheet, label, 1096);
      gap(section, '3', map);
      text(section, label, 16, 'semantic.foreground', map, false, 'Medium');
      instance(section, getVariant(sets[name], props));
    }
  }
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frameId: review.id,
    sets: Object.fromEntries(
      Object.entries(sets).map(([name, set]) => [
        name,
        { id: set.id, variants: set.children.length },
      ]),
    ),
    bounds: { width: review.width, height: review.height },
  });
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
      const customerAvatar = avatar(cell, 'AM');
      const initials = customerAvatar.findOne((node) => node.type === 'TEXT');
      propertyKeys.Initials = rowComp.addComponentProperty('Initials', 'TEXT', 'AM');
      initials.componentPropertyReferences = { characters: propertyKeys.Initials };
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
        [propertyKeys.Initials]: o.initials,
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
    await reconcileDashboard(root, map, collections, sets, shared.metric);
    frames.push({ id: root.id, name: root.name, width: root.width, height: root.height });
  }
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frames,
    sharedComponents: { metric: shared.metric.id, orderRow: shared.orderRow.id },
    nativeEditable: true,
  });
}

(async()=>{try{const foundation=await buildFoundations();const components=await buildComponents();const dashboard=await buildDashboard();figma.showUI('<html><body style="font:14px sans-serif;padding:20px"><h2>Chamfer UI — Foundation</h2><p>Created native variables, component variants, and dashboard layouts.</p><pre style="white-space:pre-wrap">'+JSON.stringify({foundation,components,dashboard},null,2)+'</pre></body></html>',{width:520,height:420});}catch(error){figma.showUI('<html><body style="font:14px sans-serif;padding:24px"><h2>Import needs attention</h2><pre style="white-space:pre-wrap">'+String(error)+'</pre></body></html>',{width:520,height:320});}})();