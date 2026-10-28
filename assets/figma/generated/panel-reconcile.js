const TOKEN_DATA={
  "primitives": {
    "color": {
      "neutral": {
        "0": "#fefefe",
        "25": "#f7f7f7",
        "50": "#eeeeee",
        "100": "#e4e4e4",
        "200": "#d6d6d6",
        "300": "#b8b8b8",
        "400": "#a3a3a3",
        "500": "#666666",
        "600": "#515151",
        "700": "#333333",
        "800": "#262626",
        "900": "#202020",
        "950": "#171717"
      },
      "green": {
        "50": "#e5f6eb",
        "400": "#80dda5",
        "700": "#236b40",
        "900": "#1c3325"
      },
      "amber": {
        "50": "#fff5e3",
        "400": "#f4c46b",
        "700": "#895915",
        "900": "#3b2c16"
      },
      "red": {
        "50": "#ffedef",
        "400": "#ff8d9b",
        "700": "#b53649",
        "900": "#3d202b"
      },
      "mint": {
        "50": "#e5fbef",
        "100": "#c5ffd6",
        "400": "#69e3a5",
        "500": "#28e99f",
        "600": "#087f56",
        "700": "#076342",
        "900": "#193a2c"
      },
      "basalt": {
        "50": "#f0eff5",
        "700": "#3d3b4f",
        "900": "#272633"
      },
      "overlay": {
        "ink": "#00000080"
      }
    },
    "space": {
      "0": 0,
      "1": 4,
      "2": 8,
      "3": 12,
      "4": 16,
      "5": 20,
      "6": 24,
      "8": 32,
      "10": 40,
      "12": 48,
      "16": 64
    },
    "radius": {
      "none": 0,
      "sm": 1,
      "md": 0,
      "lg": 2,
      "full": 999
    },
    "font": {
      "sans": "DM Sans",
      "mono": "Space Mono",
      "display": "Anybody"
    },
    "fontSize": {
      "xs": 12,
      "sm": 14,
      "md": 16,
      "lg": 20,
      "xl": 28,
      "display": 56
    },
    "lineHeight": {
      "tight": 1.15,
      "body": 1.5
    },
    "border": {
      "thin": 1
    },
    "elevation": {
      "low": "0 2px 8px rgb(23 23 23 / 0.06)"
    },
    "duration": {
      "fast": 120,
      "normal": 200
    }
  },
  "semantic": {
    "light": {
      "canvas": "color.neutral.25",
      "surface": "color.neutral.0",
      "subtle": "color.neutral.50",
      "inset": "color.neutral.50",
      "foreground": "color.neutral.950",
      "muted": "color.neutral.500",
      "border": "color.neutral.200",
      "border-strong": "color.neutral.300",
      "accent": "color.mint.700",
      "accent-hover": "color.mint.600",
      "accent-soft": "color.mint.50",
      "accent-foreground": "color.neutral.0",
      "focus": "color.mint.600",
      "success": "color.green.700",
      "success-soft": "color.green.50",
      "warning": "color.amber.700",
      "warning-soft": "color.amber.50",
      "danger": "color.red.700",
      "danger-soft": "color.red.50",
      "brand": "color.mint.500",
      "brand-foreground": "color.neutral.950",
      "action": "color.mint.500",
      "action-hover": "color.mint.400",
      "action-foreground": "color.neutral.950",
      "display-ink": "color.basalt.700",
      "display-surface": "color.neutral.50",
      "overlay": "color.overlay.ink"
    },
    "dark": {
      "canvas": "color.neutral.950",
      "surface": "color.neutral.900",
      "subtle": "color.neutral.800",
      "inset": "color.neutral.800",
      "foreground": "color.neutral.25",
      "muted": "color.neutral.400",
      "border": "color.neutral.700",
      "border-strong": "color.neutral.600",
      "accent": "color.mint.500",
      "accent-hover": "color.mint.100",
      "accent-soft": "color.mint.900",
      "accent-foreground": "color.neutral.950",
      "focus": "color.mint.500",
      "success": "color.green.400",
      "success-soft": "color.green.900",
      "warning": "color.amber.400",
      "warning-soft": "color.amber.900",
      "danger": "color.red.400",
      "danger-soft": "color.red.900",
      "brand": "color.mint.500",
      "brand-foreground": "color.neutral.950",
      "action": "color.mint.500",
      "action-hover": "color.mint.400",
      "action-foreground": "color.neutral.950",
      "display-ink": "color.neutral.25",
      "display-surface": "color.neutral.950",
      "overlay": "color.overlay.ink"
    }
  },
  "components": {
    "button-bg": "semantic.action",
    "button-fg": "semantic.action-foreground",
    "button-bg-hover": "semantic.action-hover",
    "button-radius": "radius.sm",
    "button-height-sm": 32,
    "button-height-md": 32,
    "button-height-lg": 40,
    "field-bg": "semantic.surface",
    "field-border": "semantic.border-strong",
    "field-radius": "radius.sm",
    "card-bg": "semantic.surface",
    "card-border": "semantic.border",
    "card-radius": "radius.md",
    "table-border": "semantic.border",
    "table-header-bg": "semantic.inset",
    "table-row-height": 52,
    "shell-sidebar-width": 224,
    "field-height-sm": 32,
    "field-height-md": 36,
    "field-height-lg": 44,
    "choice-size-sm": 16,
    "choice-size-md": 18,
    "choice-size-lg": 20,
    "choice-checked-bg": "semantic.action",
    "choice-checked-fg": "semantic.action-foreground",
    "switch-width-sm": 32,
    "switch-width-md": 36,
    "switch-width-lg": 40,
    "switch-height-sm": 18,
    "switch-height-md": 20,
    "switch-height-lg": 22,
    "avatar-size-sm": 24,
    "avatar-size-md": 32,
    "avatar-size-lg": 40,
    "spinner-size-sm": 16,
    "spinner-size-md": 20,
    "spinner-size-lg": 24,
    "progress-height-sm": 4,
    "progress-height-md": 6,
    "progress-height-lg": 8,
    "navigation-height-sm": 32,
    "navigation-height-md": 36,
    "navigation-height-lg": 44,
    "selection-bg": "semantic.accent-soft",
    "selection-fg": "semantic.accent",
    "dialog-width-sm": 400,
    "dialog-width-md": 512,
    "dialog-width-lg": 640,
    "dialog-padding": "space.6",
    "dialog-gap": "space.2",
    "dialog-backdrop": "semantic.overlay",
    "popover-width": 320,
    "popover-padding": "space.4",
    "popover-gap": "space.2",
    "tooltip-max-width": 272,
    "tooltip-bg": "semantic.foreground",
    "tooltip-fg": "semantic.surface",
    "sheet-width-sm": 360,
    "sheet-width-md": 448,
    "sheet-width-lg": 640,
    "sheet-height-sm": 320,
    "sheet-height-md": 480,
    "sheet-height-lg": 640,
    "drawer-width-sm": 400,
    "drawer-width-md": 640,
    "drawer-width-lg": 800
  }
}
;
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
const page = await pageFor('Chamfer / Panels');
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
const buttons = {
  primary: await figma.getNodeByIdAsync('5:42'),
  secondary: await figma.getNodeByIdAsync('5:82'),
};
const inputs = await figma.getNodeByIdAsync('48:35');
function auto(parent, name, width, height = 100, direction = 'VERTICAL') {
  const n = frame(parent, name, width, height, direction);
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'FIXED';
  gap(n, 2, map);
  n.clipsContent = false;
  return n;
}
async function tx(parent, value, role, color = 'semantic.foreground', width) {
  const style = styles.find((s) => s.name === 'Chamfer / ' + role);
  if (!style) throw Error('Missing style ' + role);
  const t = text(parent, value, style.fontSize, color, map, false, style.fontName.style, width);
  await t.setTextStyleIdAsync(style.id);
  fill(t, color, map);
  bind(t, 'fontFamily', 'font.sans', map);
  t.layoutSizingHorizontal = 'FILL';
  return t;
}
async function control(parent, set, label, state = 'Default', width) {
  if (set?.type !== 'COMPONENT_SET') throw Error('Missing original control');
  const source = set.children.find(
    (c) => c.type === 'COMPONENT' && c.name === 'Size=md, State=' + state,
  );
  const n = remember(source.createInstance());
  parent.appendChild(n);
  const key = Object.keys(set.componentPropertyDefinitions).find(
    (k) => set.componentPropertyDefinitions[k].type === 'TEXT',
  );
  if (key) n.setProperties({ [key]: label });
  n.layoutSizingHorizontal = set === inputs ? 'FILL' : 'FIXED';
  if (width) n.resize(width, n.height);
  if (set === inputs) n.layoutSizingHorizontal = 'FILL';
  if (set !== inputs)
    for (const t of n.findAllWithCriteria({ types: ['TEXT'] }))
      await t.setTextStyleIdAsync(styles.find((s) => s.name === 'Chamfer / Button label').id);
  return n;
}
async function panel(family, side, size, state, viewport = 'Desktop') {
  const width =
    viewport === 'Mobile'
      ? 390
      : family === 'Sheet'
        ? side === 'left' || side === 'right'
          ? TOKEN_DATA.components['sheet-width-' + size]
          : 1000
        : TOKEN_DATA.components['drawer-width-' + size];
  const height =
    family === 'Sheet'
      ? side === 'left' || side === 'right'
        ? viewport === 'Mobile'
          ? 844
          : 800
        : TOKEN_DATA.components['sheet-height-' + size]
      : viewport === 'Mobile'
        ? 300
        : 252;
  const n = remember(figma.createComponent());
  page.appendChild(n);
  n.name =
    (family === 'Sheet' ? 'Side=' + side + ', ' : '') +
    'Size=' +
    size +
    ', State=' +
    state +
    ', Viewport=' +
    viewport;
  n.layoutMode = 'VERTICAL';
  n.resize(width, height);
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.itemSpacing = 0;
  n.strokesIncludedInLayout = true;
  n.clipsContent = true;
  fill(n, 'semantic.surface', map);
  border(n, 'semantic.border-strong', map);
  if (family === 'Drawer') {
    bind(n, 'topLeftRadius', 'radius.md', map);
    bind(n, 'topRightRadius', 'radius.md', map);
    if (viewport === 'Desktop') bind(n, 'width', 'component.drawer-width-' + size, map);
    n.strokeBottomWeight = 0;
  } else {
    if (side === 'left' || side === 'right') {
      if (viewport === 'Desktop') bind(n, 'width', 'component.sheet-width-' + size, map);
      n.strokeTopWeight = 0;
      n.strokeBottomWeight = 0;
      n[side === 'left' ? 'strokeLeftWeight' : 'strokeRightWeight'] = 0;
    } else {
      bind(n, 'height', 'component.sheet-height-' + size, map);
      n.strokeLeftWeight = 0;
      n.strokeRightWeight = 0;
      n[side === 'top' ? 'strokeTopWeight' : 'strokeBottomWeight'] = 0;
    }
  }
  const inner = width - 50;
  const header = auto(n, 'Header', width - 2);
  padding(header, 6, map);
  bind(header, 'paddingBottom', 'space.4', map);
  header.layoutSizingHorizontal = 'FILL';
  const title = await tx(
    header,
    family === 'Sheet' ? 'Workspace settings' : 'Export project records',
    'Modal title',
    'semantic.foreground',
    inner,
  );
  const desc = await tx(
    header,
    family === 'Sheet'
      ? 'Review this local sample workspace.'
      : 'Choose the scope for your local sample export.',
    'Modal description',
    'semantic.muted',
    inner,
  );
  for (const [key, t] of [
    ['Title', title],
    ['Description', desc],
  ])
    t.componentPropertyReferences = {
      characters: n.addComponentProperty(key, 'TEXT', t.characters),
    };
  const body = auto(n, 'Body / Scroll region', width - 2);
  padding(body, 6, map);
  body.paddingTop = 0;
  gap(body, 4, map);
  body.layoutSizingHorizontal = 'FILL';
  body.layoutSizingVertical = 'FILL';
  body.clipsContent = true;
  const field = auto(body, 'Field', inner);
  field.layoutSizingHorizontal = 'FILL';
  gap(field, 2, map);
  await tx(
    field,
    family === 'Sheet' ? 'Workspace name' : 'Export name',
    'Form label',
    'semantic.foreground',
    inner,
  );
  await control(
    field,
    inputs,
    family === 'Sheet' ? 'Orbit workspace' : 'Project records',
    state,
    inner,
  );
  const footer = auto(n, 'Footer / Persistent actions', width - 2, 100, 'HORIZONTAL');
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.layoutSizingHorizontal = 'FILL';
  footer.primaryAxisAlignItems = 'MAX';
  padding(footer, 6, map);
  bind(footer, 'paddingTop', 'space.4', map);
  bind(footer, 'paddingBottom', 'space.4', map);
  fill(footer, 'semantic.subtle', map);
  border(footer, 'semantic.border', map);
  footer.strokeLeftWeight = 0;
  footer.strokeRightWeight = 0;
  footer.strokeBottomWeight = 0;
  const close = await control(
    footer,
    buttons.secondary,
    family === 'Sheet' ? 'Close sheet' : 'Close drawer',
    'Default',
    family === 'Sheet' ? 111 : 120,
  );
  close.layoutSizingHorizontal = 'FIXED';
  const save = await control(
    footer,
    buttons.primary,
    family === 'Sheet' ? 'Save settings' : 'Export unavailable',
    'Disabled',
    family === 'Sheet' ? 121 : 153,
  );
  save.layoutSizingHorizontal = 'FIXED';
  if (viewport === 'Mobile') {
    footer.layoutMode = 'VERTICAL';
    footer.primaryAxisSizingMode = 'AUTO';
    footer.counterAxisSizingMode = 'FIXED';
    footer.layoutSizingHorizontal = 'FILL';
    close.layoutSizingHorizontal = 'FILL';
    save.layoutSizingHorizontal = 'FILL';
  }
  n.description =
    'Original Chamfer ' +
    family +
    ' content. ' +
    (family === 'Sheet'
      ? 'Physical ' + side + ' edge; ' + size + ' size.'
      : 'Intrinsic bottom task; ' + size + ' width, max 85dvh.') +
    ' Header and footer remain visible while Body scrolls. Native modal behavior is in React. No swipe, snap points, or drag handle. Semantic modes inherit from the consumer.';
  return n;
}
const sources={};
for(const family of ['Sheet','Drawer']) {
  const set=page.children.find(n=>n.type==='COMPONENT_SET'&&n.name===family);
  if(!set)throw Error('Missing original panel family');
  sources[family]=set;
  const descKey=Object.keys(set.componentPropertyDefinitions).find(k=>k.startsWith('Description#'));
  const description=family==='Sheet'?'Review this local sample workspace.':'Choose the scope for your local sample export.';
  set.editComponentProperty(descKey,{defaultValue:description});mutatedNodeIds.push(set.id);
  for(const v of [...set.children]) {
    if(!v.name.includes('Viewport='))v.name+=', Viewport=Desktop';
    mutatedNodeIds.push(v.id);
    for(const f of v.findAllWithCriteria({types:['FRAME']})) {
      f.clipsContent=f.name==='Body / Scroll region';mutatedNodeIds.push(f.id);
      if(f.name==='Field')gap(f,2,map);
    }
    for(const t of v.findAllWithCriteria({types:['TEXT']})) {
      if(t.parent.type==='INSTANCE')continue;
      t.layoutSizingHorizontal='FILL';mutatedNodeIds.push(t.id);
      if(t.componentPropertyReferences?.characters===descKey)t.characters=description;
    }
    const footer=v.findOne(n=>n.type==='FRAME'&&n.name==='Footer / Persistent actions');
    for(const [i,b] of footer.children.entries()) {
      b.layoutSizingHorizontal='FIXED';
      b.resize(family==='Sheet'?(i===0?111:121):(i===0?120:153),32);
      mutatedNodeIds.push(b.id);
    }
  }
  for(const state of ['Default','Focus']) {
    if(!set.children.some(n=>n.name.endsWith('State='+state+', Viewport=Mobile'))) {
      const n=await panel(family,family==='Sheet'?'right':'bottom','md',state,'Mobile');
      set.appendChild(n);n.x=state==='Default'?24:1080;n.y=set.height+48;
      set.resize(set.width,n.y+n.height+48);
    }
  }
}
const removedNodeIds=[];
for(const id of ['70:449','70:515']) {
  const board=await figma.getNodeByIdAsync(id);
  const mobile=board.children.find(n=>n.name==='Mobile specimens');
  for(const child of [...mobile.children]){removedNodeIds.push(child.id);child.remove();}
  mutatedNodeIds.push(mobile.id);
  for(const family of ['Sheet','Drawer']) {
    const source=sources[family].children.find(n=>n.name.endsWith('Size=md, State=Focus, Viewport=Mobile'));
    const instance=remember(source.createInstance());mobile.appendChild(instance);
  }
}
return result({removedNodeIds,pageId:page.id,families:Object.values(sources).map(s=>({id:s.id,name:s.name,variants:s.children.length,properties:s.componentPropertyDefinitions})),reviews:['70:449','70:515'],variableCount:(await figma.variables.getLocalVariablesAsync()).length});
