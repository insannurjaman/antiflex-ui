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
    const scopes = key.includes('border')
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
        ? key.includes('border')
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
  return result({
    pageId: page.id,
    frameId: board.id,
    variables: Object.keys(map).length,
    collections: [primitive.id, semantic.id, component.id],
    bounds: { width: board.width, height: board.height },
  });
}

return await buildFoundations();
