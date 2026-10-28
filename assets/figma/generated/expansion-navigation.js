const EXPANSION_TOKENS={"hover-card-width":288,"hover-card-padding":"space.4","hover-card-bg":"semantic.surface","hover-card-fg":"semantic.foreground","hover-card-border":"semantic.border-strong","menubar-height":42,"menubar-padding":"space.1","menubar-gap":"space.1","navigation-menu-width":360,"navigation-menu-padding":"space.2","navigation-menu-gap":"space.2","choice-width":280,"choice-max-height":288,"choice-item-height":36,"choice-bg":"semantic.surface","choice-fg":"semantic.foreground","choice-border":"semantic.border-strong","command-height":320,"command-width":560,"calendar-width":296,"calendar-day-size":36};
const ICONS={};
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
  for (const family of ['DM Sans', 'Space Mono', 'Anybody'])
    for (const style of family === 'Space Mono'
      ? ['Regular', 'Bold']
      : ['Regular', 'Medium', 'SemiBold']) {
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
  const value = consumer ? variable.resolveForConsumer(consumer).value : { r: 0, g: 0, b: 0 };
  return figma.variables.setBoundVariableForPaint(
    {
      type: 'SOLID',
      color: { r: value.r, g: value.g, b: value.b },
      ...(value.a === undefined ? {} : { opacity: value.a }),
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
  node.fontName = {
    family: mono ? 'Space Mono' : 'DM Sans',
    style: mono && weight === 'Medium' ? 'Regular' : weight,
  };
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
    if (font.family === 'DM Sans' || font.family === 'Space Mono')
      bind(node, 'fontFamily', font.family === 'DM Sans' ? 'font.sans' : 'font.mono', map);
    mutatedNodeIds.push(node.id);
  }
}

await fonts();
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
async function label(
  parent,
  value,
  width,
  color = 'semantic.foreground',
  size = 14,
  weight = 'Regular',
) {
  const n = text(parent, value, size, color, map, false, weight, width);
  const style = styles.find(
    (s) =>
      s.name.startsWith('Chamfer /') &&
      s.fontName.family === 'DM Sans' &&
      s.fontName.style === weight &&
      s.fontSize === size &&
      s.lineHeight.unit === 'PERCENT' &&
      s.lineHeight.value === 150,
  );
  if (style) await n.setTextStyleIdAsync(style.id);
  if (size === 24 && weight === 'Medium') {
    const heading = styles.find((s) => s.name === 'Chamfer / Type weight / medium');
    if (heading) await n.setTextStyleIdAsync(heading.id);
  }
  fill(n, color, map);
  return n;
}
function box(parent, name, width, horizontal = false) {
  const n = frame(parent, name, width, 100, horizontal ? 'HORIZONTAL' : 'VERTICAL');
  n.primaryAxisSizingMode = horizontal ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = horizontal ? 'AUTO' : 'FIXED';
  n.clipsContent = false;
  gap(n, 2, map);
  return n;
}
function comp(page, name, width, horizontal = false) {
  const n = remember(figma.createComponent());
  n.name = name;
  n.layoutMode = horizontal ? 'HORIZONTAL' : 'VERTICAL';
  n.resize(width, 100);
  n.primaryAxisSizingMode = horizontal ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = horizontal ? 'AUTO' : 'FIXED';
  n.fills = [];
  n.clipsContent = false;
  n.itemSpacing = 0;
  page.appendChild(n);
  return n;
}
function panel(n, prefix = 'choice') {
  fill(n, 'component.' + prefix + '-bg', map);
  border(n, 'component.' + prefix + '-border', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  n.strokesIncludedInLayout = true;
}
function expose(owner, node, name = 'Label') {
  node.componentPropertyReferences = {
    characters: owner.addComponentProperty(name, 'TEXT', node.characters),
  };
}
function arrow(parent, kind = 'down', color = 'semantic.muted') {
  const path =
    kind === 'down'
      ? 'm4 6 4 4 4-4'
      : kind === 'check'
        ? 'm3 8 3 3 7-7'
        : kind === 'left'
          ? 'm10 4-4 4 4 4'
          : 'm6 4 4 4-4 4';
  const n = remember(
    figma.createNodeFromSvg(
      '<svg width="16" height="16" viewBox="0 0 16 16"><path d="' +
        path +
        '" fill="none" stroke="black" stroke-width="1.5"/></svg>',
    ),
  );
  parent.appendChild(n);
  n.name = 'Icon / ' + kind;
  n.resize(16, 16);
  for (const c of n.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('strokes' in c && c.strokes.length) {
      c.strokes = c.strokes.map((p) => (p.type === 'SOLID' ? paint(map[color], c) : p));
    }
  }
  return n;
}
function set(page, nodes, name, x, y, cols = 3, cellWidth = 390, cellHeight = 390) {
  const s = remember(figma.combineAsVariants(nodes, page));
  s.name = name;
  s.x = x;
  s.y = y;
  s.description =
    'Original Chamfer ' +
    name +
    '. Token-bound auto-layout; light/dark modes inherited. React owns native keyboard, focus, forms, dismissal and date arithmetic. Visual states are specimens, not simulated browser behavior.';
  nodes.forEach((n, i) => {
    n.x = 16 + (i % cols) * cellWidth;
    n.y = 40 + Math.floor(i / cols) * cellHeight;
  });
  s.resize(cols * cellWidth + 16, Math.ceil(nodes.length / cols) * cellHeight + 40);
  return s;
}
async function button(parent, value, state = 'Default', size = 'sm') {
  const source = await figma.getNodeByIdAsync('5:122');
  const n = instance(parent, getVariant(source, { Size: size, State: state }), value);
  n.layoutSizingHorizontal = 'HUG';
  return n;
}
async function board(page, name, width, mode, x, y, description) {
  const n = box(page, name, width);
  n.x = x;
  n.y = y;
  fill(n, 'semantic.canvas', map);
  setTheme(n, collections, mode);
  padding(n, 6, map);
  gap(n, 6, map);
  await label(n, name, width - 48, 'semantic.foreground', 24, 'Medium');
  await label(n, description, width - 48, 'semantic.muted');
  return n;
}
function focus(n) {
  const ring = remember(figma.createRectangle());
  n.appendChild(ring);
  ring.name = 'Focus indicator / 2px offset';
  ring.layoutPositioning = 'ABSOLUTE';
  ring.x = -4;
  ring.y = -4;
  ring.resize(n.width + 8, n.height + 8);
  ring.fills = [];
  border(ring, 'semantic.focus', map);
  ring.strokeWeight = 2;
  ring.strokeAlign = 'INSIDE';
  ring.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  return ring;
}

const page = await pageFor('Chamfer / Workspace navigation');
if (page.children.some((n) => n.name === 'HoverCard'))
  throw Error('Existing construction; reconcile saved IDs.');
const hover = [];
for (const state of ['Default', 'Focus', 'Long content']) {
  const n = comp(page, 'State=' + state, 288);
  panel(n, 'hover-card');
  padding(n, 4, map);
  gap(n, 2, map);
  bind(n, 'minWidth', 'component.hover-card-width', map);
  expose(n, await label(n, 'Alex Morgan', 254, 'semantic.foreground', 16, 'Medium'), 'Name');
  expose(
    n,
    await label(
      n,
      state === 'Long content'
        ? 'Product designer working on the Atlas workspace and its local review process.'
        : 'Product designer · Atlas workspace',
      254,
    ),
    'Description',
  );
  await label(n, 'Supplementary profile preview', 254, 'semantic.muted');
  if (state === 'Focus') focus(n);
  hover.push(n);
}
const hs = set(page, hover, 'HoverCard', 40, 40, 3, 320, 250);
const menu = [];
const itemSet = await figma.getNodeByIdAsync('82:81');
for (const state of ['Closed', 'Open', 'Focus', 'Disabled']) {
  const n = comp(page, 'State=' + state, 258);
  gap(n, 1, map);
  const bar = box(n, 'Menubar / command headings', 218, true);
  bar.counterAxisAlignItems = 'CENTER';
  padding(bar, 1, map);
  gap(bar, 1, map);
  fill(bar, 'semantic.surface', map);
  border(bar, 'semantic.border-strong', map);
  bar.strokesIncludedInLayout = true;
  bind(bar, 'minHeight', 'component.menubar-height', map);
  for (const name of ['File', 'Edit', 'View']) {
    const b = await button(
      bar,
      name,
      state === 'Disabled' && name === 'Edit'
        ? 'Disabled'
        : state === 'Focus' && name === 'File'
          ? 'Focus'
          : 'Default',
    );
    if (state === 'Open' && name === 'File') {
      fill(b, 'semantic.accent-soft', map);
      for (const t of b.findAll((n) => n.type === 'TEXT')) fill(t, 'semantic.accent', map);
    }
  }
  if (state === 'Open') {
    const p = box(n, 'File actions', 240);
    panel(p, 'menu');
    padding(p, 1, map);
    gap(p, 0, map);
    for (const [state, label] of [
      ['Default', 'New local project'],
      ['Submenu', 'Export'],
      ['Disabled', 'Delete project'],
    ]) {
      const i = instance(p, getVariant(itemSet, { Size: 'md', State: state }), label);
      i.layoutSizingHorizontal = 'FILL';
    }
  }
  menu.push(n);
}
const ms = set(page, menu, 'Menubar', 40, 380, 4, 290, 320);
const nav = [];
for (const state of ['Closed', 'Open', 'Current', 'Focus']) {
  const n = comp(page, 'State=' + state, 360);
  gap(n, 2, map);
  const row = box(n, 'Navigation headings', 280, true);
  gap(row, 2, map);
  await button(row, 'Learn', state === 'Focus' ? 'Focus' : 'Default', 'md');
  await button(row, 'Build', 'Default', 'md');
  if (['Open', 'Current'].includes(state)) {
    const p = box(n, 'Learn resources', 360);
    panel(p, 'hover-card');
    padding(p, 2, map);
    gap(p, 1, map);
    bind(p, 'minWidth', 'component.navigation-menu-width', map);
    for (const [title, desc] of [
      ['Introduction', 'Get to know Chamfer UI.'],
      ['Foundations', 'Shared colors and typography.'],
    ]) {
      const l = box(p, title, 342);
      padding(l, 3, map);
      gap(l, 1, map);
      if (state === 'Current' && title === 'Introduction') fill(l, 'semantic.accent-soft', map);
      await label(
        l,
        title,
        318,
        state === 'Current' && title === 'Introduction' ? 'semantic.accent' : 'semantic.foreground',
      );
      await label(l, desc, 318, 'semantic.muted', 12);
    }
  }
  nav.push(n);
}
const ns = set(page, nav, 'NavigationMenu', 40, 800, 4, 390, 360);
const boards = [];
for (const [mode, width] of [
  ['Light', 1120],
  ['Dark', 1120],
  ['Light', 390],
  ['Dark', 390],
]) {
  const mobile = width === 390;
  const n = await board(
    page,
    'Workspace navigation / ' + mode + (mobile ? ' / Mobile' : ''),
    width,
    mode,
    mobile ? 1240 : 40,
    1300 + (mode === 'Dark' ? (mobile ? 1000 : 700) : 0),
    'Ordinary links for navigation; roving command headings for application actions. Hover preview supplements a real profile link.',
  );
  const row = box(n, 'Live component specimens', width - 48, !mobile);
  gap(row, 6, map);
  for (const [source, props] of [
    [hs, { State: 'Default' }],
    [ms, { State: 'Open' }],
    [ns, { State: 'Open' }],
  ]) {
    const col = box(row, source.name, mobile ? 342 : 330);
    await label(col, source.name);
    const i = instance(col, getVariant(source, props));
    if (source === ns && mobile) {
      i.resize(342, i.height);
      const p = i.findOne((n) => n.name === 'Learn resources');
      if (p) p.resize(342, p.height);
    }
  }
  boards.push(n.id);
}
await bindTypography(page, map);
return result({
  pageId: page.id,
  sets: { HoverCard: hs.id, Menubar: ms.id, NavigationMenu: ns.id },
  boards,
});
