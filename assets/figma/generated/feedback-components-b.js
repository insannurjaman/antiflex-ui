// Generated source reconciliation for the existing Chamfer file.
const FEEDBACK_FAMILIES=["Pagination","Progress","Spinner","Tabs","Accordion"];
const ICONS={"IconCircleCheck":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-circle-check\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\"></path><path d=\"M9 12l2 2l4 -4\"></path></svg>","IconInfoCircle":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-info-circle\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\"></path><path d=\"M12 9h.01\"></path><path d=\"M11 12h1v4h1\"></path></svg>","IconAlertTriangle":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-alert-triangle\"><path d=\"M12 9v4\"></path><path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\"></path><path d=\"M12 16h.01\"></path></svg>","IconFolder":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-folder\"><path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path></svg>","IconSearch":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-search\"><path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\"></path><path d=\"M21 21l-6 -6\"></path></svg>","IconLock":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-lock\"><path d=\"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6\"></path><path d=\"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0\"></path><path d=\"M8 11v-4a4 4 0 1 1 8 0v4\"></path></svg>","IconChevronDown":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-down\"><path d=\"M6 9l6 6l6 -6\"></path></svg>","IconChevronRight":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"tabler-icon tabler-icon-chevron-right\"><path d=\"M9 6l6 6l-6 6\"></path></svg>"};
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
const page = await pageFor('Chamfer / Feedback & navigation');
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
const ALL_FEEDBACK_FAMILIES = [
  'Alert',
  'Avatar',
  'Breadcrumb',
  'Empty',
  'Kbd',
  'Pagination',
  'Progress',
  'Spinner',
  'Tabs',
  'Accordion',
  'Collapsible',
  'Toggle',
  'Toggle Group',
  'Typography',
  'Aspect Ratio',
];
const sets = {};
for (const n of page.children)
  if (n.type === 'COMPONENT_SET' && ALL_FEEDBACK_FAMILIES.includes(n.name)) sets[n.name] = n;
function fc(name, width, height = 36, direction = 'HORIZONTAL') {
  const n = remember(figma.createComponent());
  n.name = name;
  n.layoutMode = direction;
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.resize(width, height);
  n.fills = [];
  n.clipsContent = false;
  n.itemSpacing = 0;
  page.appendChild(n);
  return n;
}
function auto(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = direction === 'VERTICAL' ? 'AUTO' : 'FIXED';
  n.counterAxisSizingMode = direction === 'VERTICAL' ? 'FIXED' : 'AUTO';
  n.clipsContent = false;
  gap(n, 2, map);
  return n;
}
function shape(parent, name, width, height, color, ellipse = false) {
  const n = remember(ellipse ? figma.createEllipse() : figma.createRectangle());
  n.name = name;
  n.resize(width, height);
  parent.appendChild(n);
  fill(n, color, map);
  return n;
}
async function tx(parent, value, role = 'Body', color = 'semantic.foreground', width) {
  const s = styles.find((s) => s.name === 'Chamfer / ' + role);
  if (!s) throw Error('Missing shared style ' + role);
  const n = text(parent, value, s.fontSize, color, map, role === 'Code', s.fontName.style, width);
  await n.setTextStyleIdAsync(s.id);
  fill(n, color, map);
  bind(n, 'fontFamily', role === 'Code' ? 'font.mono' : 'font.sans', map);
  const key = Object.keys(map).find(
    (k) => k.startsWith('fontSize.') && Object.values(map[k].valuesByMode)[0] === s.fontSize,
  );
  if (key) bind(n, 'fontSize', key, map);
  return n;
}
function tp(owner, node, key) {
  const prop = owner.addComponentProperty(key, 'TEXT', node.characters);
  node.componentPropertyReferences = { characters: prop };
}
function ring(parent, width = parent.width, height = parent.height) {
  const n = shape(parent, 'Keyboard focus', width + 10, height + 10, 'semantic.focus');
  n.layoutPositioning = 'ABSOLUTE';
  n.x = -5;
  n.y = -5;
  n.fills = [];
  border(n, 'semantic.focus', map);
  n.strokeWeight = 2;
}
function rule(parent, width) {
  return shape(parent, 'Divider', width, 1, 'semantic.border');
}
function makeIcon(parent, name, color = 'semantic.muted', size = 16) {
  return icon(parent, name, map, color, size);
}
function center(n) {
  n.primaryAxisAlignItems = 'CENTER';
  n.counterAxisAlignItems = 'CENTER';
}
async function smallButton(
  parent,
  label,
  { active = false, disabled = false, width = 80, size = 'md', outline = true, focus = false } = {},
) {
  const height = { sm: 32, md: 32, lg: 40 }[size];
  const n = frame(parent, label, width, height, 'HORIZONTAL');
  n.clipsContent = false;
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.resize(width, height);
  center(n);
  bind(n, 'height', 'component.button-height-' + size, map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  padding(n, 2, map);
  if (outline) border(n, active ? 'component.selection-fg' : 'semantic.border-strong', map);
  if (active) fill(n, 'component.selection-bg', map);
  else if (outline) fill(n, 'semantic.surface', map);
  const t = await tx(
    n,
    label,
    size === 'sm' ? 'Form help' : 'Body',
    active ? 'component.selection-fg' : 'semantic.foreground',
  );
  if (disabled) n.opacity = 0.5;
  if (focus) ring(n);
  return { n, t };
}
async function makeAlert(variant) {
  const n = fc('Variant=' + variant, 480, 100, 'HORIZONTAL');
  n.primaryAxisSizingMode = 'AUTO';
  padding(n, 4, map);
  gap(n, 3, map);
  fill(n, variant === 'neutral' ? 'semantic.surface' : 'semantic.' + variant + '-soft', map);
  border(n, variant === 'neutral' ? 'semantic.border' : 'semantic.' + variant, map);
  bind(n, 'cornerRadius', 'radius.md', map);
  const color = variant === 'neutral' ? 'semantic.foreground' : 'semantic.' + variant;
  makeIcon(
    n,
    variant === 'success'
      ? 'IconCircleCheck'
      : variant === 'neutral'
        ? 'IconInfoCircle'
        : 'IconAlertTriangle',
    color,
  );
  const body = auto(n, 'Message', 412);
  gap(body, 1, map);
  const title = await tx(
    body,
    {
      neutral: 'Review before publishing',
      success: 'Changes saved',
      warning: 'Storage is almost full',
      danger: 'Changes could not be saved',
    }[variant],
    'Feedback title',
    color,
    412,
  );
  const desc = await tx(
    body,
    variant === 'danger'
      ? 'Check your connection and try again.'
      : 'Illustrative feedback. No live service.',
    'Body',
    color,
    412,
  );
  tp(n, title, 'Title');
  tp(n, desc, 'Description');
  return n;
}
async function makeAvatar(size, state) {
  const dim = { sm: 24, md: 32, lg: 40 }[size];
  const n = fc(`Size=${size}, State=${state}`, dim, dim);
  bind(n, 'width', 'component.avatar-size-' + size, map);
  bind(n, 'height', 'component.avatar-size-' + size, map);
  fill(n, 'semantic.inset', map);
  border(n, 'semantic.border', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  center(n);
  const t = await tx(
    n,
    'AM',
    size === 'sm' ? 'Avatar small' : size === 'md' ? 'Avatar medium' : 'Form label',
  );
  tp(n, t, 'Initials');
  if (state === 'Image') {
    fill(n, 'semantic.action', map);
    t.visible = false;
    const mark = remember(
      figma.createNodeFromSvg(
        '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 2h8l4 4v8l-4 4H5l-3-4V6z" fill="#171717"/></svg>',
      ),
    );
    n.appendChild(mark);
    for (const c of mark.findAll(() => true)) {
      createdNodeIds.push(c.id);
      if ('fills' in c && c.fills.length) c.fills = [paint(map['semantic.action-foreground'], c)];
    }
  }
  return n;
}
async function makeBreadcrumb(direction) {
  const n = fc('Direction=' + direction, 480, 24);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'AUTO';
  gap(n, 2, map);
  n.counterAxisAlignItems = 'CENTER';
  const labels =
    direction === 'RTL'
      ? ['Breadcrumb', 'Components', 'Documentation']
      : ['Documentation', 'Components', 'Breadcrumb'];
  for (let i = 0; i < labels.length; i++) {
    const t = await tx(
      n,
      labels[i],
      'Body',
      labels[i] === 'Breadcrumb' ? 'semantic.foreground' : 'semantic.muted',
    );
    tp(n, t, 'Item ' + (i + 1));
    if (i < labels.length - 1) {
      const ic = makeIcon(n, 'IconChevronRight', 'semantic.muted', 12);
      if (direction === 'RTL') ic.rotation = 180;
    }
  }
  return n;
}
async function makeEmpty(reason) {
  const n = fc('Reason=' + reason, 480, 260, 'VERTICAL');
  n.primaryAxisSizingMode = 'AUTO';
  padding(n, 5, map);
  bind(n, 'paddingTop', 'space.10', map);
  bind(n, 'paddingBottom', 'space.10', map);
  gap(n, 2, map);
  n.counterAxisAlignItems = 'CENTER';
  const data = {
    FirstUse: [
      'No projects yet',
      'Create your first project to start a shared workspace.',
      'Create project',
      'IconFolder',
    ],
    NoResults: [
      'No matching records',
      'Try another search or clear your filters.',
      'Clear filters',
      'IconSearch',
    ],
    Permission: ['You need access', 'Ask your workspace owner for permission.', '', 'IconLock'],
    Error: [
      'Could not load records',
      'Check your connection and try again.',
      'Retry',
      'IconAlertTriangle',
    ],
  }[reason];
  makeIcon(n, data[3], 'semantic.muted', 28);
  const title = await tx(n, data[0], 'Interface title', 'semantic.foreground', 440);
  title.textAlignHorizontal = 'CENTER';
  const desc = await tx(n, data[1], 'Body', 'semantic.muted', 360);
  desc.textAlignHorizontal = 'CENTER';
  tp(n, title, 'Title');
  tp(n, desc, 'Description');
  if (data[2]) {
    const action = await smallButton(n, data[2], { width: reason === 'FirstUse' ? 130 : 110 });
    action.n.name = 'Recovery action';
    if (reason === 'FirstUse') {
      fill(action.n, 'semantic.action', map);
      action.n.strokes = [];
      fill(action.t, 'semantic.action-foreground', map);
    }
  }
  return n;
}
async function makeKbd(kind) {
  const labels = kind === 'Shortcut' ? ['Ctrl', 'K'] : ['Escape'];
  const n = fc('Kind=' + kind, kind === 'Shortcut' ? 86 : 64, 24);
  n.primaryAxisSizingMode = 'AUTO';
  gap(n, 1, map);
  for (let i = 0; i < labels.length; i++) {
    const key = frame(
      n,
      'Key',
      labels[i] === 'Escape' ? 64 : labels[i] === 'Ctrl' ? 44 : 24,
      24,
      'HORIZONTAL',
    );
    center(key);
    fill(key, 'semantic.surface', map);
    border(key, 'semantic.border-strong', map);
    bind(key, 'cornerRadius', 'radius.sm', map);
    const t = await tx(key, labels[i], 'Code', 'semantic.muted');
    tp(n, t, 'Key ' + (i + 1));
    if (i < labels.length - 1) await tx(n, '+', 'Body', 'semantic.muted');
  }
  return n;
}
async function makePagination(state) {
  const n = fc('State=' + state, 320, 32);
  n.primaryAxisSizingMode = 'AUTO';
  gap(n, 1, map);
  const current = state === 'Start' ? 1 : state === 'End' ? 3 : 2;
  for (const [label, num] of [
    ['Previous', 0],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['Next', 4],
  ]) {
    const button = await smallButton(n, label, {
      size: 'sm',
      width: num === 0 ? 72 : num === 4 ? 56 : 32,
      active: num === current,
      outline: num === current,
      disabled: (num === 0 && current === 1) || (num === 4 && current === 3),
    });
    if (num === current) {
      fill(button.n, 'semantic.surface', map);
      border(button.n, 'semantic.border-strong', map);
      fill(button.t, 'semantic.foreground', map);
    }
  }
  return n;
}
async function makeProgress(size, state) {
  const h = { sm: 4, md: 6, lg: 8 }[size];
  const n = fc(`Size=${size}, State=${state}`, 320, h);
  bind(n, 'height', 'component.progress-height-' + size, map);
  fill(n, 'semantic.inset', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  const bar = shape(
    n,
    state === 'Indeterminate' ? 'Unknown duration' : 'Measured value',
    state === 'Complete' ? 320 : state === 'Indeterminate' ? 100 : 205,
    h,
    'semantic.accent',
  );
  bind(bar, 'height', 'component.progress-height-' + size, map);
  if (state === 'Indeterminate') {
    bar.layoutPositioning = 'ABSOLUTE';
    bar.x = 100;
    bar.y = 0;
  }
  return n;
}
async function makeSpinner(size) {
  const dim = { sm: 16, md: 20, lg: 24 }[size];
  const n = fc('Size=' + size, dim, dim);
  bind(n, 'width', 'component.spinner-size-' + size, map);
  bind(n, 'height', 'component.spinner-size-' + size, map);
  const spin = remember(
    figma.createNodeFromSvg(
      '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M14 8a6 6 0 1 1-6-6" fill="none" stroke="#171717" stroke-width="2"/></svg>',
    ),
  );
  spin.resize(dim, dim);
  n.appendChild(spin);
  for (const c of spin.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('strokes' in c && c.strokes.length) c.strokes = [paint(map['semantic.foreground'], c)];
  }
  return n;
}
async function makeTabs(orientation, active, state) {
  const vertical = orientation === 'vertical';
  const n = fc(
    `Orientation=${orientation}, Active=${active}, State=${state}`,
    480,
    140,
    vertical ? 'HORIZONTAL' : 'VERTICAL',
  );
  n.primaryAxisSizingMode = vertical ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = vertical ? 'AUTO' : 'FIXED';
  gap(n, vertical ? 6 : 0, map);
  const list = auto(n, 'Tab list', vertical ? 140 : 480, vertical ? 'VERTICAL' : 'HORIZONTAL');
  padding(list, 1, map);
  gap(list, 1, map);
  for (const label of ['Overview', 'Activity', 'Billing']) {
    const { n: tab, t } = await smallButton(list, label, {
      width: vertical ? 132 : 110,
      active: label === active,
      disabled: label === 'Billing',
      outline: false,
      focus: state === 'Focus' && label === active,
    });
    bind(tab, 'height', 'component.navigation-height-md', map);
    if (label === active) fill(tab, 'component.selection-bg', map);
    tp(n, t, 'Tab ' + label);
  }
  const content = auto(n, 'Panel', vertical ? 316 : 480);
  padding(content, 1, map);
  bind(content, 'paddingTop', 'space.5', map);
  bind(content, 'paddingBottom', 'space.5', map);
  const title = await tx(
    content,
    active === 'Overview' ? 'Workspace overview' : 'Recent activity',
    'Form label',
    'semantic.foreground',
    vertical ? 308 : 472,
  );
  const body = await tx(
    content,
    active === 'Overview'
      ? 'Three projects are ready for review.'
      : 'Alex updated the shared component library.',
    'Body',
    'semantic.foreground',
    vertical ? 308 : 472,
  );
  tp(n, title, 'Panel title');
  tp(n, body, 'Panel content');
  return n;
}
async function disclosureRow(parent, label, open, disabled = false, focus = false) {
  const row = auto(parent, 'Disclosure heading', 480, 'HORIZONTAL');
  row.counterAxisAlignItems = 'CENTER';
  bind(row, 'paddingTop', 'space.4', map);
  bind(row, 'paddingBottom', 'space.4', map);
  const t = await tx(row, label, 'Form label', 'semantic.foreground', 448);
  const chevron = makeIcon(row, 'IconChevronDown');
  if (open) chevron.rotation = 180;
  if (disabled) row.opacity = 0.5;
  if (focus) ring(row, 480, 53);
  return { row, t };
}
async function makeAccordion(type, state) {
  const n = fc(`Type=${type}, State=${state}`, 480, 110, 'VERTICAL');
  n.primaryAxisSizingMode = 'AUTO';
  const opened = state === 'Open' || state === 'Focus';
  for (let i = 0; i < 2; i++) {
    const open = opened && (i === 0 || type === 'multiple');
    const { t } = await disclosureRow(
      n,
      i === 0 ? 'Can I edit the source?' : 'What does the core include?',
      open,
      state === 'Disabled',
      state === 'Focus' && i === 0,
    );
    tp(n, t, 'Heading ' + (i + 1));
    if (open) {
      const body = auto(n, 'Panel ' + (i + 1), 480);
      bind(body, 'paddingBottom', 'space.4', map);
      const text = await tx(
        body,
        i === 0
          ? 'Yes. Components live in your own application.'
          : 'Original React components and shared tokens.',
        'Body',
        'semantic.muted',
        480,
      );
      tp(n, text, 'Content ' + (i + 1));
    }
    rule(n, 480);
  }
  return n;
}
async function makeCollapsible(state) {
  const n = fc('State=' + state, 480, 36, 'VERTICAL');
  n.primaryAxisSizingMode = 'AUTO';
  const { n: trigger, t } = await smallButton(n, 'Connection details', {
    width: 176,
    disabled: state === 'Disabled',
    focus: state === 'Focus',
  });
  tp(n, t, 'Trigger');
  if (state === 'Open') {
    const body = auto(n, 'Content', 480);
    bind(body, 'paddingTop', 'space.4', map);
    bind(body, 'paddingBottom', 'space.4', map);
    const text = await tx(
      body,
      'Optional development connection guidance.',
      'Body',
      'semantic.foreground',
      480,
    );
    tp(n, text, 'Content');
  }
  return n;
}
async function makeToggle(size, variant, state) {
  const n = fc(
    `Size=${size}, Variant=${variant}, State=${state}`,
    size === 'lg' ? 80 : 64,
    { sm: 32, md: 32, lg: 40 }[size],
  );
  bind(n, 'height', 'component.button-height-' + size, map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  center(n);
  const on = state === 'On' || state === 'DisabledOn';
  if (variant === 'outline' || on)
    border(n, on ? 'component.selection-fg' : 'semantic.border-strong', map);
  if (on) fill(n, 'component.selection-bg', map);
  const t = await tx(
    n,
    'Bold',
    size === 'sm' ? 'Form help' : 'Body',
    on ? 'component.selection-fg' : 'semantic.muted',
  );
  tp(n, t, 'Label');
  if (state.startsWith('Disabled')) n.opacity = 0.5;
  if (state === 'Focus') ring(n);
  return n;
}
async function makeToggleGroup(orientation, type, state) {
  const n = fc(
    `Orientation=${orientation}, Type=${type}, State=${state}`,
    orientation === 'vertical' ? 104 : 300,
    orientation === 'vertical' ? 104 : 32,
    orientation === 'vertical' ? 'VERTICAL' : 'HORIZONTAL',
  );
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'AUTO';
  gap(n, 1, map);
  for (const [i, label] of ['Bold', 'Italic', 'Underline'].entries()) {
    const { n: button, t } = await smallButton(n, label, {
      width: 104,
      active: i === 0 || (type === 'multiple' && i === 1),
      disabled: state === 'Disabled',
    });
    tp(n, t, 'Item ' + (i + 1));
  }
  return n;
}
async function makeTypography(size) {
  const n = fc('Size=' + size, 480, 200, 'VERTICAL');
  n.primaryAxisSizingMode = 'AUTO';
  gap(n, 4, map);
  const title = await tx(n, 'Readable, by default.', 'Title', 'semantic.foreground', 480);
  tp(n, title, 'Heading');
  const body = await tx(
    n,
    'Compose meaningful HTML. Shared tokens keep a comfortable reading measure and a clear rhythm.',
    size === 'md' ? 'Body large' : 'Body',
    'semantic.foreground',
    480,
  );
  tp(n, body, 'Paragraph');
  await tx(
    n,
    '• Shared tokens in both themes.\n• Native semantics and visible focus.',
    'Body',
    'semantic.foreground',
    480,
  );
  await tx(n, 'data-theme="light"', 'Code', 'semantic.muted');
  return n;
}
async function makeAspectRatio(ratio) {
  const value = { Wide: 16 / 9, Square: 1, Classic: 4 / 3 }[ratio];
  const n = fc('Ratio=' + ratio, 240, 240 / value);
  fill(n, 'semantic.accent-soft', map);
  center(n);
  const mark = remember(
    figma.createNodeFromSvg(
      '<svg width="120" height="80" viewBox="0 0 120 80"><path d="M25 5h60l20 20v30L85 75H25L5 55V25z" fill="none" stroke="#076342"/><path d="M45 25h35v12H52v15h28v12H45L32 51V38z" fill="#076342"/></svg>',
    ),
  );
  n.appendChild(mark);
  for (const c of mark.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('fills' in c && c.fills.length) c.fills = [paint(map['semantic.accent'], c)];
    if ('strokes' in c && c.strokes.length) c.strokes = [paint(map['semantic.accent'], c)];
  }
  return n;
}
for (const name of FEEDBACK_FAMILIES) {
  if (sets[name]) continue;
  const variants = [];
  if (name === 'Alert')
    for (const variant of ['neutral', 'success', 'warning', 'danger'])
      variants.push(await makeAlert(variant));
  if (name === 'Avatar')
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Fallback', 'Image', 'Failed'])
        variants.push(await makeAvatar(size, state));
  if (name === 'Breadcrumb')
    for (const direction of ['LTR', 'RTL']) variants.push(await makeBreadcrumb(direction));
  if (name === 'Empty')
    for (const reason of ['FirstUse', 'NoResults', 'Permission', 'Error'])
      variants.push(await makeEmpty(reason));
  if (name === 'Kbd') for (const kind of ['Single', 'Shortcut']) variants.push(await makeKbd(kind));
  if (name === 'Pagination')
    for (const state of ['Start', 'Middle', 'End']) variants.push(await makePagination(state));
  if (name === 'Progress')
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Determinate', 'Indeterminate', 'Complete'])
        variants.push(await makeProgress(size, state));
  if (name === 'Spinner')
    for (const size of ['sm', 'md', 'lg']) variants.push(await makeSpinner(size));
  if (name === 'Tabs')
    for (const orientation of ['horizontal', 'vertical'])
      for (const active of ['Overview', 'Activity'])
        for (const state of ['Default', 'Focus'])
          variants.push(await makeTabs(orientation, active, state));
  if (name === 'Accordion')
    for (const type of ['single', 'multiple'])
      for (const state of ['Collapsed', 'Open', 'Disabled', 'Focus'])
        variants.push(await makeAccordion(type, state));
  if (name === 'Collapsible')
    for (const state of ['Closed', 'Open', 'Disabled', 'Focus'])
      variants.push(await makeCollapsible(state));
  if (name === 'Toggle')
    for (const size of ['sm', 'md', 'lg'])
      for (const variant of ['default', 'outline'])
        for (const state of ['Off', 'On', 'DisabledOff', 'DisabledOn', 'Focus'])
          variants.push(await makeToggle(size, variant, state));
  if (name === 'Toggle Group')
    for (const orientation of ['horizontal', 'vertical'])
      for (const type of ['single', 'multiple'])
        for (const state of ['Default', 'Disabled'])
          variants.push(await makeToggleGroup(orientation, type, state));
  if (name === 'Typography')
    for (const size of ['sm', 'md']) variants.push(await makeTypography(size));
  if (name === 'Aspect Ratio')
    for (const ratio of ['Wide', 'Square', 'Classic']) variants.push(await makeAspectRatio(ratio));
  const set = remember(figma.combineAsVariants(variants, page));
  set.name = name;
  set.description =
    'Original Chamfer ' +
    name +
    '. Matches the authored React family at /docs/components/' +
    name.toLowerCase().replaceAll(' ', '-') +
    '. Use semantic Light/Dark modes; behavior remains browser-owned.';
  variants.forEach((n, i) => {
    n.x = 24 + (i % 2) * 560;
    n.y = 40 + Math.floor(i / 2) * 360;
  });
  set.resize(1144, Math.ceil(variants.length / 2) * 360 + 40);
  set.fills = [];
  set.x = 3200 + (ALL_FEEDBACK_FAMILIES.indexOf(name) % 3) * 1280;
  set.y = Math.floor(ALL_FEEDBACK_FAMILIES.indexOf(name) / 3) * 6000;
  sets[name] = set;
}
return result({
  pageId: page.id,
  families: FEEDBACK_FAMILIES.map((name) => ({
    name,
    id: sets[name].id,
    variants: sets[name].children.length,
  })),
});
