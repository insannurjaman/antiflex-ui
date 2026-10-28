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
const page = await pageFor('Chamfer / Floating');
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
const semantic = collections.find((c) => c.name === 'Chamfer / Semantic');
const buttonSet = await figma.getNodeByIdAsync('5:82');
const inputSet = await figma.getNodeByIdAsync('48:35');
if (buttonSet?.type !== 'COMPONENT_SET' || inputSet?.type !== 'COMPONENT_SET')
  throw Error('Missing original Chamfer dependencies');
function auto(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  n.clipsContent = false;
  gap(n, 2, map);
  return n;
}
async function tx(parent, value, role, color = 'semantic.foreground', width) {
  const style = styles.find((s) => s.name === 'Chamfer / ' + role);
  if (!style) throw Error('Missing style ' + role);
  const t = text(parent, value, style.fontSize, color, map, false, style.fontName.style, width);
  await t.setTextStyleIdAsync(style.id);
  fill(t, color, map);
  bind(t, 'fontFamily', 'font.sans', map);
  return t;
}
function prop(owner, node, name) {
  node.componentPropertyReferences = {
    characters: owner.addComponentProperty(name, 'TEXT', node.characters),
  };
}
async function control(parent, set, label, state = 'Default', width) {
  const source = set.children.find(
    (c) => c.type === 'COMPONENT' && c.name === 'Size=md, State=' + state,
  );
  if (!source) throw Error('Missing control state');
  const n = remember(source.createInstance());
  parent.appendChild(n);
  const def = set.componentPropertyDefinitions;
  const name = Object.keys(def).find((k) => def[k].type === 'TEXT');
  if (name) n.setProperties({ [name]: label });
  if (width) n.resize(width, n.height);
  if (set === buttonSet) {
    const style = styles.find((s) => s.name === 'Chamfer / Button label');
    for (const t of n.findAllWithCriteria({ types: ['TEXT'] }))
      await t.setTextStyleIdAsync(style.id);
  }
  return n;
}
async function panel(side, state) {
  const n = remember(figma.createComponent());
  n.name = 'Side=' + side + ', State=' + state;
  n.layoutMode = 'VERTICAL';
  n.resize(320, 200);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  n.strokesIncludedInLayout = true;
  page.appendChild(n);
  bind(n, 'minWidth', 'component.popover-width', map);
  bind(n, 'maxWidth', 'component.popover-width', map);
  for (const k of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'])
    bind(n, k, 'component.popover-padding', map);
  bind(n, 'itemSpacing', 'component.popover-gap', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  fill(n, 'semantic.surface', map);
  border(n, 'semantic.border-strong', map);
  const title = await tx(n, 'View settings', 'Interface title', 'semantic.foreground', 286);
  prop(n, title, 'Title');
  const desc = await tx(n, 'Changes stay in this sample.', 'Body', 'semantic.muted', 286);
  prop(n, desc, 'Description');
  const field = auto(n, 'View name field', 286);
  await tx(field, 'View name', 'Form label', 'semantic.foreground', 286);
  await control(field, inputSet, 'Active projects', state, 286);
  await control(n, buttonSet, 'Done', 'Default', 286);
  n.description =
    'Nonmodal Popover content; ' +
    side +
    ' preferred placement, ' +
    state +
    ' field focus. 320px content, 16px padding, 8px gaps. Placement flips in the browser. Use one title and a close action. Native top-layer behavior lives in React.';
  return n;
}
async function tip(side) {
  const n = remember(figma.createComponent());
  n.name = 'Side=' + side;
  n.layoutMode = 'VERTICAL';
  n.resize(272, 52);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'AUTO';
  page.appendChild(n);
  bind(n, 'maxWidth', 'component.tooltip-max-width', map);
  for (const k of ['paddingTop', 'paddingBottom']) bind(n, k, 'space.2', map);
  for (const k of ['paddingLeft', 'paddingRight']) bind(n, k, 'space.3', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  fill(n, 'component.tooltip-bg', map);
  n.strokes = [];
  const copy = await tx(
    n,
    'Reveals the sample project identifier.',
    'Form help',
    'component.tooltip-fg',
  );
  prop(n, copy, 'Text');
  n.description =
    'Supplemental plain text tooltip; ' +
    side +
    ' preferred side, 272px maximum, 12px regular interface text, 8px/12px padding. No arrow, interactive content, or focus transfer.';
  return n;
}
const families = [];
const sources = {};
for (const family of ['Popover', 'Tooltip']) {
  let set = page.children.find((n) => n.type === 'COMPONENT_SET' && n.name === family);
  if (!set) {
    const variants = [];
    for (const side of ['top', 'right', 'bottom', 'left'])
      if (family === 'Popover')
        for (const state of ['Default', 'Focus']) variants.push(await panel(side, state));
      else variants.push(await tip(side));
    set = remember(figma.combineAsVariants(variants, page));
    set.name = family;
    set.x = family === 'Popover' ? 100 : 1000;
    set.y = 100;
    let y = 44;
    for (const [i, v] of variants.entries()) {
      v.x = 24 + (i % 2) * 370;
      v.y = y;
      if (i % 2) y += Math.max(v.height, variants[i - 1].height) + 56;
    }
    set.resize(790, y);
    set.description =
      'Original Chamfer ' +
      family +
      ' content. Side is a preferred placement, resolved by the shared browser collision engine.';
  }
  families.push({ name: family, id: set.id, variants: set.children.length });
  sources[family] = set;
}
async function specimen(parent, family, side, width) {
  const box = auto(parent, family + ' / ' + side, width);
  box.counterAxisAlignItems = 'CENTER';
  gap(box, 2, map);
  const source = sources[family].children.find(
    (n) =>
      n.type === 'COMPONENT' &&
      n.name === (family === 'Popover' ? 'Side=' + side + ', State=Focus' : 'Side=' + side),
  );
  const instance = remember(source.createInstance());
  const trigger = await control(
    box,
    buttonSet,
    family === 'Popover' ? 'Edit view' : 'Show project ID',
    'Default',
    family === 'Popover' ? 90 : 126,
  );
  box.appendChild(instance);
  if (side === 'top' || side === 'left') box.insertChild(0, instance);
  if (side === 'left' || side === 'right') {
    box.layoutMode = 'HORIZONTAL';
    box.primaryAxisSizingMode = 'FIXED';
    box.counterAxisSizingMode = 'AUTO';
  }
  return box;
}
const reviews = [];
for (const theme of ['Light', 'Dark']) {
  let board = page.children.find(
    (n) => n.type === 'FRAME' && n.name === 'Floating / Review / ' + theme,
  );
  if (!board) {
    board = auto(page, 'Floating / Review / ' + theme, 1150);
    board.x = theme === 'Light' ? 100 : 1350;
    board.y = 1250;
    padding(board, 6, map);
    gap(board, 6, map);
    fill(board, 'semantic.canvas', map);
    board.setExplicitVariableModeForCollection(
      semantic.id,
      semantic.modes.find((m) => m.name === theme).modeId,
    );
    await tx(board, 'Anchored panels and help', 'Heading', 'semantic.foreground', 1102);
    await tx(
      board,
      'Original content components · Top-layer behavior lives in React · Eight-pixel placement gap',
      'Body',
      'semantic.muted',
      1102,
    );
    for (const family of ['Popover', 'Tooltip']) {
      await tx(board, family, 'Title', 'semantic.foreground', 1102);
      for (const sides of [
        ['top', 'bottom'],
        ['left', 'right'],
      ]) {
        const row = auto(board, family + ' placement row', 1102, 'HORIZONTAL');
        row.primaryAxisSizingMode = 'FIXED';
        row.counterAxisSizingMode = 'AUTO';
        gap(row, 6, map);
        row.counterAxisAlignItems = 'MIN';
        for (const side of sides) await specimen(row, family, side, 539);
      }
    }
    const mobile = auto(board, 'Mobile 390px specimen', 390);
    padding(mobile, 4, map);
    gap(mobile, 4, map);
    fill(mobile, 'semantic.surface', map);
    await tx(mobile, 'Narrow viewport', 'Interface title', 'semantic.foreground', 358);
    await specimen(mobile, 'Popover', 'bottom', 358);
    await specimen(mobile, 'Tooltip', 'top', 358);
  }
  reviews.push({ id: board.id, name: board.name, width: board.width, height: board.height });
}
return result({
  pageId: page.id,
  families,
  reviews,
  variants: families.reduce((n, f) => n + f.variants, 0),
  variableCount: (await figma.variables.getLocalVariablesAsync()).length,
});
