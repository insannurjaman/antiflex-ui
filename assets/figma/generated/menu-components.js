const MENU_TOKENS={"menu-width-sm":192,"menu-width-md":240,"menu-width-lg":288,"menu-item-height-sm":28,"menu-item-height-md":32,"menu-item-height-lg":40,"menu-padding":"space.1","menu-bg":"semantic.surface","menu-fg":"semantic.foreground","menu-border":"semantic.border","menu-active-bg":"semantic.accent-soft","menu-active-fg":"semantic.accent"};
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
const page = await pageFor('Chamfer / Menus');
if (page.children.some((n) => n.name === 'DropdownMenu'))
  throw Error('Existing menu construction: reconcile returned IDs instead of duplicating.');
const { map, collections } = await tokenMap();
const vars = await figma.variables.getLocalVariablesAsync();
const componentCollection = collections.find((c) => c.name === 'Chamfer / Components');
const newVariables = [];
for (const [name, value] of Object.entries(MENU_TOKENS)) {
  const alias = typeof value === 'string' ? map[value] : null;
  let v = map['component.' + name];
  if (!v) {
    v = figma.variables.createVariable(
      'component/' + name,
      componentCollection,
      alias ? alias.resolvedType : 'FLOAT',
    );
    variableIds.push(v.id);
  }
  v.scopes = /fg$/.test(name)
    ? ['TEXT_FILL']
    : /border$/.test(name)
      ? ['STROKE_COLOR']
      : /bg$/.test(name)
        ? ['FRAME_FILL', 'SHAPE_FILL']
        : /width|height/.test(name)
          ? ['WIDTH_HEIGHT']
          : ['GAP'];
  v.setValueForMode(
    componentCollection.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
  v.setVariableCodeSyntax('WEB', 'var(--ch-component-' + name + ')');
  map['component.' + name] = v;
  newVariables.push({
    id: v.id,
    name: v.name,
    scopes: v.scopes,
    syntax: v.codeSyntax,
    values: v.valuesByMode,
  });
}
const styles = await figma.getLocalTextStylesAsync();
for (const style of styles.filter((s) =>
  ['Chamfer / Body', 'Chamfer / Form help'].includes(s.name),
))
  await figma.loadFontAsync(style.fontName);
async function tx(parent, value, color = 'component.menu-fg', width) {
  const t = text(parent, value, 14, color, map, false, 'Regular', width);
  const style = styles.find((s) => s.name === 'Chamfer / Body');
  await t.setTextStyleIdAsync(style.id);
  fill(t, color, map);
  return t;
}
function box(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = direction === 'HORIZONTAL' ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = direction === 'HORIZONTAL' ? 'AUTO' : 'FIXED';
  n.clipsContent = false;
  return n;
}
function variantSet(nodes, name, x, y, cols) {
  const s = remember(figma.combineAsVariants(nodes, page));
  s.name = name;
  s.description =
    'Original Chamfer ' +
    name +
    '; native behavior and keyboard contracts live in React. Token-bound auto-layout, matching light/dark semantics.';
  s.x = x;
  s.y = y;
  nodes.forEach((n, i) => {
    n.x = 16 + (i % cols) * 320;
    n.y = 40 + Math.floor(i / cols) * 380;
  });
  s.resize(cols * 320 + 16, Math.ceil(nodes.length / cols) * 380 + 40);
  return s;
}
function component(name, width) {
  const n = remember(figma.createComponent());
  n.name = name;
  n.layoutMode = 'VERTICAL';
  n.resize(width, 100);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  n.clipsContent = false;
  page.appendChild(n);
  return n;
}
function prop(owner, node, name) {
  node.componentPropertyReferences = {
    characters: owner.addComponentProperty(name, 'TEXT', node.characters),
  };
}
const itemVariants = [];
for (const size of ['sm', 'md', 'lg'])
  for (const state of [
    'Default',
    'Hover',
    'Focus',
    'Disabled',
    'Checked',
    'Radio',
    'Submenu',
    'Danger',
  ]) {
    const width = MENU_TOKENS['menu-width-' + size] - 10;
    const n = component('Size=' + size + ', State=' + state, width);
    n.layoutMode = 'HORIZONTAL';
    n.resize(width, 29);
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisSizingMode = 'AUTO';
    n.counterAxisAlignItems = 'CENTER';
    n.strokesIncludedInLayout = false;
    bind(n, 'minHeight', 'component.menu-item-height-' + size, map);
    bind(n, 'cornerRadius', 'radius.sm', map);
    for (const key of ['paddingTop', 'paddingBottom']) bind(n, key, 'space.1', map);
    for (const key of ['paddingLeft', 'paddingRight']) bind(n, key, 'space.2', map);
    bind(n, 'itemSpacing', 'space.2', map);
    n.fills = [];
    if (['Hover', 'Focus'].includes(state)) fill(n, 'component.menu-active-bg', map);
    if (state === 'Focus') {
      border(n, 'semantic.focus', map);
      n.strokeWeight = 2;
      n.strokeAlign = 'INSIDE';
    }
    const fg =
      state === 'Disabled'
        ? 'semantic.muted'
        : state === 'Danger'
          ? 'semantic.danger'
          : ['Hover', 'Focus'].includes(state)
            ? 'component.menu-active-fg'
            : 'component.menu-fg';
    if (['Checked', 'Radio'].includes(state)) {
      const mark = remember(
        figma.createNodeFromSvg(
          state === 'Checked'
            ? '<svg width="16" height="16" viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" fill="none" stroke="black" stroke-width="1.5"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="black"/></svg>',
        ),
      );
      n.appendChild(mark);
      mark.resize(16, 16);
      for (const child of mark.findAll(() => true)) {
        createdNodeIds.push(child.id);
        if ('fills' in child && child.fills.length) fill(child, fg, map);
        if ('strokes' in child && child.strokes.length) border(child, fg, map);
      }
    }
    const label = await tx(
      n,
      state === 'Checked'
        ? 'Pin project'
        : state === 'Radio'
          ? 'Comfortable'
          : state === 'Submenu'
            ? 'Export'
            : state === 'Danger'
              ? 'Archive project'
              : state === 'Disabled'
                ? 'Delete project'
                : 'Duplicate project',
      fg,
      width - 60,
    );
    label.layoutSizingHorizontal = 'FILL';
    prop(n, label, 'Label');
    if (state === 'Submenu') {
      const v = remember(
        figma.createNodeFromSvg(
          '<svg width="16" height="16" viewBox="0 0 16 16"><path d="m6 4 4 4-4 4" fill="none" stroke="black" stroke-width="1.5"/></svg>',
        ),
      );
      n.appendChild(v);
      v.resize(16, 16);
      for (const c of v.findAll(() => true)) {
        createdNodeIds.push(c.id);
        if ('strokes' in c && c.strokes.length) border(c, fg, map);
      }
    }
    itemVariants.push(n);
  }
const itemSet = variantSet(itemVariants, 'MenuItem', 40, 40, 4);
function itemSource(size, state) {
  return itemVariants.find(
    (n) => n.variantProperties.Size === size && n.variantProperties.State === state,
  );
}
function itemInstance(parent, size, state, label) {
  const n = remember(itemSource(size, state).createInstance());
  parent.appendChild(n);
  n.layoutSizingHorizontal = 'FILL';
  for (const c of n.findAll(() => true)) createdNodeIds.push(c.id);
  if (label) {
    const key = Object.keys(itemSet.componentPropertyDefinitions).find((k) =>
      k.startsWith('Label#'),
    );
    if (key) n.setProperties({ [key]: label });
  }
  return n;
}
const panelSets = {};
let nextX = 1460;
for (const family of ['DropdownMenu', 'ContextMenu']) {
  const variants = [];
  for (const size of ['sm', 'md', 'lg'])
    for (const state of ['Actions', 'Choices']) {
      const n = component('Size=' + size + ', Content=' + state, MENU_TOKENS['menu-width-' + size]);
      bind(n, 'minWidth', 'component.menu-width-' + size, map);
      bind(n, 'maxWidth', 'component.menu-width-' + size, map);
      bind(n, 'cornerRadius', 'radius.sm', map);
      fill(n, 'component.menu-bg', map);
      border(n, 'component.menu-border', map);
      n.strokesIncludedInLayout = true;
      padding(n, 1, map);
      gap(n, 0, map);
      const label = box(n, 'Menu label', MENU_TOKENS['menu-width-' + size] - 10);
      padding(label, 2, map);
      await tx(label, 'Atlas workspace');
      for (const [itemState, label] of state === 'Actions'
        ? [
            ['Default', 'Duplicate project'],
            ['Submenu', 'Export'],
            ['Disabled', 'Delete project'],
          ]
        : [
            ['Checked', 'Pin project'],
            ['Radio', 'Comfortable'],
            ['Default', 'Compact'],
          ])
        itemInstance(n, size, itemState, label);
      variants.push(n);
    }
  panelSets[family] = variantSet(variants, family, nextX, 40, 2);
  nextX += 720;
}
const areas = [];
for (const state of ['Default', 'Focus']) {
  const n = component('State=' + state, 320);
  n.layoutMode = 'HORIZONTAL';
  n.counterAxisAlignItems = 'CENTER';
  padding(n, 6, map);
  fill(n, 'semantic.surface', map);
  border(n, state === 'Focus' ? 'semantic.focus' : 'semantic.border', map);
  if (state === 'Focus') n.strokeWeight = 2;
  await tx(n, 'Atlas workspace', 'component.menu-fg', 270);
  areas.push(n);
}
const areaSet = variantSet(areas, 'ContextMenuTrigger', nextX, 40, 1);
const boards = [];
for (const mode of ['Light', 'Dark']) {
  const board = box(page, 'Menus / ' + mode, 1040);
  board.x = 40;
  board.y = 2640 + (mode === 'Dark' ? 900 : 0);
  padding(board, 8, map);
  gap(board, 6, map);
  fill(board, 'semantic.canvas', map);
  setTheme(board, collections, mode);
  await tx(board, 'Dropdown Menu and Context Menu');
  await tx(
    board,
    'Original action menus · Native top layer · Keyboard and pointer entry',
    'semantic.muted',
    940,
  );
  const row = box(board, 'Menu sizes', 976, 'HORIZONTAL');
  gap(row, 6, map);
  for (const size of ['sm', 'md', 'lg']) {
    const col = box(row, 'Size ' + size, MENU_TOKENS['menu-width-' + size]);
    gap(col, 3, map);
    await tx(col, size + ' · ' + MENU_TOKENS['menu-width-' + size] + 'px');
    const source = panelSets.DropdownMenu.children.find(
      (n) =>
        n.type === 'COMPONENT' &&
        n.variantProperties.Size === size &&
        n.variantProperties.Content === 'Actions',
    );
    const inst = remember(source.createInstance());
    col.appendChild(inst);
    for (const c of inst.findAll(() => true)) createdNodeIds.push(c.id);
  }
  const contextRow = box(board, 'Context and preferences', 976, 'HORIZONTAL');
  gap(contextRow, 6, map);
  const area = remember(areas[mode === 'Light' ? 0 : 1].createInstance());
  contextRow.appendChild(area);
  for (const c of area.findAll(() => true)) createdNodeIds.push(c.id);
  const choices = remember(
    panelSets.ContextMenu.children
      .find(
        (n) =>
          n.type === 'COMPONENT' &&
          n.variantProperties.Size === 'md' &&
          n.variantProperties.Content === 'Choices',
      )
      .createInstance(),
  );
  contextRow.appendChild(choices);
  for (const c of choices.findAll(() => true)) createdNodeIds.push(c.id);
  await tx(
    board,
    'Arrow keys, Home/End, typeahead · Escape closes one level · Tab leaves the tree.',
    'semantic.muted',
    940,
  );
  await tx(
    board,
    'Context menu: right-click or Shift+F10; visible actions button is the touch alternative.',
    'semantic.muted',
    940,
  );
  boards.push({ id: board.id, name: board.name, width: board.width, height: board.height });
}
const validation = {
  errors: [],
  families: 2,
  sharedItemVariants: itemVariants.length,
  panelVariants: 12,
  contextTriggerVariants: 2,
  variables: newVariables.length,
  totalVariables: (await figma.variables.getLocalVariablesAsync()).length,
};
for (const n of itemVariants)
  if (!n.boundVariables.minHeight || !n.boundVariables.paddingLeft)
    validation.errors.push('Missing sizing binding ' + n.id);
for (const s of Object.values(panelSets))
  for (const n of s.children)
    if (!n.boundVariables.minWidth || !n.fills[0]?.boundVariables?.color)
      validation.errors.push('Missing panel binding ' + n.id);
return result({
  pageId: page.id,
  sets: {
    item: itemSet.id,
    dropdown: panelSets.DropdownMenu.id,
    context: panelSets.ContextMenu.id,
    trigger: areaSet.id,
  },
  boards,
  variables: newVariables,
  validation,
});
