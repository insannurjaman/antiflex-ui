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
const page = await pageFor('Chamfer / Modals');
const { map, collections } = await tokenMap();
const semantic = collections.find((c) => c.name === 'Chamfer / Semantic');
const styles = await figma.getLocalTextStylesAsync();
const sets = {};
for (const [key, id] of [
  ['primary', '5:42'],
  ['secondary', '5:82'],
  ['danger', '5:162'],
  ['ghost', '5:122'],
  ['input', '48:35'],
  ['textarea', '48:96'],
]) {
  const set = await figma.getNodeByIdAsync(id);
  if (!set || set.type !== 'COMPONENT_SET')
    throw Error('Missing compatible Chamfer component ' + key);
  sets[key] = set;
}
function auto(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  n.clipsContent = false;
  n.itemSpacing = 0;
  return n;
}
async function tx(parent, value, role, color = 'semantic.foreground', width) {
  const style = styles.find((s) => s.name === 'Chamfer / ' + role);
  if (!style) throw Error('Missing ' + role);
  const n = text(parent, value, style.fontSize, color, map, false, style.fontName.style, width);
  await n.setTextStyleIdAsync(style.id);
  fill(n, color, map);
  bind(n, 'fontFamily', 'font.sans', map);
  return n;
}
function property(owner, node, label) {
  node.componentPropertyReferences = {
    characters: owner.addComponentProperty(label, 'TEXT', node.characters),
  };
}
function variant(key, state = 'Default') {
  const node = sets[key].children.find(
    (c) => c.type === 'COMPONENT' && c.name === 'Size=md, State=' + state,
  );
  if (!node) throw Error('Missing ' + key + ' ' + state);
  return node;
}
async function instance(parent, key, label, state = 'Default', width) {
  const n = remember(variant(key, state).createInstance());
  parent.appendChild(n);
  n.clipsContent = false;
  const props = sets[key].componentPropertyDefinitions;
  const prop = Object.keys(props).find((k) => props[k].type === 'TEXT');
  if (prop) n.setProperties({ [prop]: label });
  if (width) n.resize(width, n.height);
  if (['primary', 'secondary', 'danger', 'ghost'].includes(key)) {
    const style = styles.find((s) => s.name === 'Chamfer / Button label');
    if (!style) throw Error('Missing shared Button label style');
    for (const label of n.findAllWithCriteria({ types: ['TEXT'] }))
      await label.setTextStyleIdAsync(style.id);
  }
  const ring = n.children.find((child) => child.name === 'Focus ring');
  if (ring) {
    ring.resize(n.width + 10, n.height + 10);
  }
  return n;
}
const titleCopy = 'Edit project';
const descCopy = 'Update the details your team sees in this sample workspace.';
async function content(kind, size, state, widthOverride) {
  const width = widthOverride ?? { sm: 400, md: 512, lg: 640 }[size];
  const n = remember(figma.createComponent());
  page.appendChild(n);
  n.name = 'Size=' + size + ', State=' + state;
  n.layoutMode = 'VERTICAL';
  n.resize(width, 100);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  n.itemSpacing = 0;
  n.clipsContent = false;
  n.paddingTop = 1;
  n.paddingBottom = 1;
  n.paddingLeft = 1;
  n.paddingRight = 1;
  fill(n, 'semantic.surface', map);
  border(n, 'semantic.border-strong', map);
  bind(n, 'cornerRadius', 'radius.md', map);
  if (!widthOverride) bind(n, 'width', 'component.dialog-width-' + size, map);
  const inner = width - 50;
  const header = auto(n, 'Header', width - 2);
  padding(header, 6, map);
  header.paddingBottom = 16;
  bind(header, 'itemSpacing', 'component.dialog-gap', map);
  const title = await tx(
    header,
    kind === 'Dialog' ? titleCopy : 'Archive Orbit workspace?',
    'Modal title',
    'semantic.foreground',
    inner,
  );
  property(n, title, 'Title');
  const description = await tx(
    header,
    kind === 'Dialog'
      ? descCopy
      : 'The sample project will leave this page’s active list. You can restore it using the action shown afterwards.',
    'Modal description',
    'semantic.muted',
    inner,
  );
  property(n, description, 'Description');
  if (kind === 'Dialog') {
    const body = auto(n, 'Body', width - 2);
    body.paddingLeft = 24;
    body.paddingRight = 24;
    body.paddingBottom = 24;
    gap(body, 4, map);
    const field = auto(body, 'Project name field', inner);
    gap(field, 2, map);
    await tx(field, 'Project name *', 'Form label', 'semantic.foreground', inner);
    await instance(
      field,
      'input',
      'Orbit workspace',
      state === 'Focus' ? 'Focus' : 'Default',
      inner,
    );
    const notes = auto(body, 'Description field', inner);
    gap(notes, 2, map);
    await tx(notes, 'Description', 'Form label', 'semantic.foreground', inner);
    await instance(notes, 'textarea', 'The shared foundation for our product.', 'Default', inner);
    await tx(notes, 'A short note for your team.', 'Form help', 'semantic.muted', inner);
    await instance(body, 'ghost', 'Reset draft', 'Default', 104);
  }
  const footer = auto(n, 'Footer', width - 2, 'HORIZONTAL');
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.paddingTop = 16;
  footer.paddingBottom = 16;
  footer.paddingLeft = 24;
  footer.paddingRight = 24;
  gap(footer, 2, map);
  footer.primaryAxisAlignItems = 'MAX';
  fill(footer, 'semantic.subtle', map);
  footer.strokes = [paint(map['semantic.border'], footer)];
  footer.strokeTopWeight = 1;
  footer.strokeBottomWeight = 0;
  footer.strokeLeftWeight = 0;
  footer.strokeRightWeight = 0;
  const mobile = width <= 358;
  if (mobile) {
    footer.layoutMode = 'VERTICAL';
    footer.primaryAxisSizingMode = 'AUTO';
    footer.counterAxisSizingMode = 'FIXED';
  }
  await instance(
    footer,
    'secondary',
    kind === 'Dialog' ? 'Cancel' : 'Keep project',
    kind === 'Alert Dialog' && state === 'Focus' ? 'Focus' : 'Default',
    mobile ? inner : kind === 'Dialog' ? 78 : 112,
  );
  await instance(
    footer,
    kind === 'Dialog' ? 'primary' : 'danger',
    kind === 'Dialog' ? 'Save changes' : 'Archive project',
    'Default',
    mobile ? inner : kind === 'Dialog' ? 122 : 130,
  );
  n.description =
    'Native ' +
    kind +
    ' visual state. React owns modal focus, inertness, scroll, Escape, and controlled state. Size ' +
    size +
    '; ' +
    state +
    '.';
  return n;
}
const families = [];
let cursor = 100;
for (const kind of ['Dialog', 'Alert Dialog']) {
  let set = page.children.find((n) => n.type === 'COMPONENT_SET' && n.name === kind);
  if (!set) {
    const variants = [];
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Default', 'Focus']) variants.push(await content(kind, size, state));
    set = remember(figma.combineAsVariants(variants, page));
    set.name = kind;
    set.x = cursor;
    set.y = 120;
    let y = 50;
    for (const [i, v] of variants.entries()) {
      v.x = 24 + (i % 2) * 700;
      v.y = y;
      if (i % 2) y += Math.max(v.height, variants[i - 1].height) + 60;
    }
    set.resize(1420, y);
    set.description =
      'Original Chamfer ' +
      kind +
      ' with shared native-HTML implementation, width variants, and keyboard focus states.';
  }
  cursor += 1550;
  families.push({ name: kind, id: set.id, variants: set.children.length });
}
const mobileSources = {};
for (const kind of ['Dialog', 'Alert Dialog']) {
  let source = page.children.find(
    (n) => n.type === 'COMPONENT' && n.name === kind + ' / Mobile construction',
  );
  if (!source) {
    source = await content(kind, 'sm', 'Focus', 358);
    source.name = kind + ' / Mobile construction';
    source.x = 3200;
    source.y = kind === 'Dialog' ? 120 : 850;
  }
  mobileSources[kind] = source;
}
async function preview(parent, name, width, source) {
  const view = auto(parent, name, width);
  view.resize(width, 620);
  view.primaryAxisSizingMode = 'FIXED';
  view.counterAxisSizingMode = 'FIXED';
  view.clipsContent = true;
  fill(view, 'semantic.canvas', map);
  padding(view, 6, map);
  gap(view, 4, map);
  await tx(view, 'Sample workspace', 'Interface title', 'semantic.foreground', width - 48);
  await tx(view, 'An isolated modal specimen', 'Body', 'semantic.muted', width - 48);
  const layer = frame(view, 'Modal backdrop', width, 620);
  layer.resize(width, 620);
  layer.primaryAxisSizingMode = 'FIXED';
  layer.counterAxisSizingMode = 'FIXED';
  layer.layoutPositioning = 'ABSOLUTE';
  layer.x = 0;
  layer.y = 0;
  layer.primaryAxisAlignItems = 'CENTER';
  layer.counterAxisAlignItems = 'CENTER';
  layer.itemSpacing = 0;
  fill(layer, 'component.dialog-backdrop', map);
  layer.clipsContent = false;
  const inst = remember(source.createInstance());
  layer.appendChild(inst);
  inst.name = name + ' content';
  return view;
}
const reviews = [];
for (const theme of ['Light', 'Dark']) {
  let board = page.children.find(
    (n) => n.type === 'FRAME' && n.name === 'Modals / Review / ' + theme,
  );
  if (!board) {
    board = auto(page, 'Modals / Review / ' + theme, 1200);
    board.x = theme === 'Light' ? 100 : 1450;
    board.y = 1500;
    padding(board, 6, map);
    gap(board, 6, map);
    fill(board, 'semantic.canvas', map);
    board.setExplicitVariableModeForCollection(
      semantic.id,
      semantic.modes.find((m) => m.name === theme).modeId,
    );
    await tx(board, 'Focused tasks and confirmations', 'Heading', 'semantic.foreground', 1152);
    await tx(
      board,
      'Two original modal families · Native browser behavior lives in React',
      'Body',
      'semantic.muted',
      1152,
    );
    for (const kind of ['Dialog', 'Alert Dialog']) {
      const row = auto(board, kind + ' specimens', 1152, 'HORIZONTAL');
      row.primaryAxisSizingMode = 'FIXED';
      row.counterAxisSizingMode = 'AUTO';
      gap(row, 6, map);
      row.counterAxisAlignItems = 'MIN';
      const set = await figma.getNodeByIdAsync(families.find((f) => f.name === kind).id);
      const source = set.children.find(
        (n) => n.type === 'COMPONENT' && n.name === 'Size=md, State=Focus',
      );
      await preview(row, kind + ' / Desktop specimen', 560, source);
      await preview(row, kind + ' / Mobile 390px', 390, mobileSources[kind]);
    }
  }
  reviews.push({ id: board.id, name: board.name, width: board.width, height: board.height });
}
return result({
  pageId: page.id,
  families,
  reviews,
  variableCount: (await figma.variables.getLocalVariablesAsync()).length,
  variants: families.reduce((sum, f) => sum + f.variants, 0),
});
