// Generated form-family reconciliation for the existing Chamfer foundation.
const FORM_FAMILIES=['Input','Label','Field','Textarea','Native Select'];
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
const page = await pageFor('Chamfer / Forms');
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
const sizeValue = { sm: 32, md: 36, lg: 44 };
const choiceValue = { sm: 16, md: 18, lg: 20 };
const sets = {};
function solid(parent, name, width, height, key, ellipse = false) {
  const n = remember(ellipse ? figma.createEllipse() : figma.createRectangle());
  n.name = name;
  n.resize(width, height);
  parent.appendChild(n);
  fill(n, key, map);
  return n;
}
async function ft(parent, value, role = 'Body', color = 'semantic.foreground') {
  const n = text(
    parent,
    value,
    role === 'Form help' ? 12 : 14,
    color,
    map,
    false,
    role === 'Form label' ? 'Medium' : 'Regular',
  );
  const style = styles.find((s) => s.name === 'Chamfer / ' + role);
  if (style) await n.setTextStyleIdAsync(style.id);
  fill(n, color, map);
  bind(n, 'fontFamily', 'font.sans', map);
  bind(n, 'fontSize', role === 'Form help' ? 'fontSize.xs' : 'fontSize.sm', map);
  return n;
}
function component(name, width = 240, height = 36, direction = 'HORIZONTAL') {
  const n = remember(figma.createComponent());
  n.name = name;
  n.layoutMode = direction;
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.resize(width, height);
  n.itemSpacing = 8;
  n.fills = [];
  n.clipsContent = false;
  page.appendChild(n);
  return n;
}
function focus(n) {
  const r = solid(n, 'Focus ring', n.width + 10, n.height + 10, 'semantic.focus');
  r.layoutPositioning = 'ABSOLUTE';
  r.x = -5;
  r.y = -5;
  r.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  r.fills = [];
  border(r, 'semantic.focus', map);
  r.strokeWeight = 2;
}
function controlFrame(n, size, state) {
  fill(n, state === 'ReadOnly' ? 'semantic.inset' : 'component.field-bg', map);
  border(n, state === 'Invalid' ? 'semantic.danger' : 'component.field-border', map);
  bind(n, 'cornerRadius', 'component.field-radius', map);
  bind(n, 'height', 'component.field-height-' + size, map);
  bind(n, 'paddingLeft', 'space.3', map);
  bind(n, 'paddingRight', 'space.3', map);
  bind(n, 'itemSpacing', 'space.2', map);
  n.counterAxisAlignItems = 'CENTER';
  if (state === 'Disabled') n.opacity = 0.5;
  if (state === 'Focus') focus(n);
}
function textProp(n, t, key = 'Value') {
  const prop = n.addComponentProperty(key, 'TEXT', t.characters);
  t.componentPropertyReferences = { characters: prop };
}
function inst(parent, source) {
  const i = instance(parent, source);
  return i;
}
async function baseInput(kind, size, state) {
  const height = kind === 'Textarea' ? { sm: 64, md: 80, lg: 112 }[size] : sizeValue[size];
  const n = component(`Size=${size}, State=${state}`, 240, height);
  controlFrame(n, size, state);
  if (kind === 'Textarea') {
    n.resize(240, height);
    const ring = n.children.find((c) => c.name === 'Focus ring');
    if (ring) ring.resize(250, height + 10);
    n.primaryAxisAlignItems = 'MIN';
    n.counterAxisAlignItems = 'MIN';
    bind(n, 'paddingTop', 'space.2', map);
    bind(n, 'paddingBottom', 'space.2', map);
  }
  const t = await ft(
    n,
    kind === 'Native Select'
      ? 'Jakarta (UTC+7)'
      : kind === 'Textarea'
        ? 'What are you building?'
        : 'Orbit workspace',
    'Body',
    kind === 'Textarea' ? 'semantic.muted' : 'semantic.foreground',
  );
  textProp(n, t);
  if (kind === 'Native Select') {
    const spacer = frame(n, 'Flexible space', 8, 1, 'HORIZONTAL');
    spacer.layoutGrow = 1;
    const chevron = remember(
      figma.createNodeFromSvg(
        '<svg width="12" height="12" viewBox="0 0 12 12"><path d="m3 4 3 3 3-3" fill="none" stroke="#666" stroke-width="1.5"/></svg>',
      ),
    );
    n.appendChild(chevron);
    for (const v of chevron.findAll(() => true)) {
      createdNodeIds.push(v.id);
      if ('strokes' in v && v.strokes.length) v.strokes = [paint(map['semantic.muted'], v)];
    }
  }
  return n;
}
async function choice(kind, size, state) {
  const isSwitch = kind === 'Switch';
  const width = isSwitch ? { sm: 32, md: 36, lg: 40 }[size] : choiceValue[size];
  const height = isSwitch ? { sm: 18, md: 20, lg: 22 }[size] : width;
  const n = component(`Size=${size}, State=${state}`, width, height);
  n.paddingLeft = n.paddingRight = n.paddingTop = n.paddingBottom = 0;
  n.primaryAxisAlignItems = 'CENTER';
  n.counterAxisAlignItems = 'CENTER';
  const on = ['Checked', 'Mixed', 'On', 'DisabledChecked', 'DisabledOn'].includes(state);
  fill(n, on ? 'component.choice-checked-bg' : 'component.field-bg', map);
  border(
    n,
    state === 'Invalid' ? 'semantic.danger' : on ? 'component.choice-checked-bg' : 'semantic.muted',
    map,
  );
  bind(n, 'cornerRadius', 'radius.sm', map);
  bind(
    n,
    'width',
    isSwitch ? 'component.switch-width-' + size : 'component.choice-size-' + size,
    map,
  );
  bind(
    n,
    'height',
    isSwitch ? 'component.switch-height-' + size : 'component.choice-size-' + size,
    map,
  );
  if (isSwitch) {
    if (!on) fill(n, 'semantic.subtle', map);
    const thumb = solid(
      n,
      'Thumb',
      Math.round((width - 8) * 0.4),
      height - 8,
      on ? 'component.choice-checked-fg' : 'semantic.muted',
    );
    thumb.layoutPositioning = 'ABSOLUTE';
    thumb.x = on ? width - 4 - thumb.width : 4;
    thumb.y = 4;
  } else if (on) {
    const svg = remember(
      figma.createNodeFromSvg(
        state === 'Mixed'
          ? '<svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 8h10" stroke="#171717" stroke-width="2"/></svg>'
          : '<svg width="14" height="14" viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" fill="none" stroke="#171717" stroke-width="2"/></svg>',
      ),
    );
    n.appendChild(svg);
    for (const v of svg.findAll(() => true)) {
      createdNodeIds.push(v.id);
      if ('strokes' in v && v.strokes.length)
        v.strokes = [paint(map['component.choice-checked-fg'], v)];
    }
  }
  if (state.startsWith('Disabled')) n.opacity = 0.5;
  if (state === 'Focus') focus(n);
  return n;
}
async function makeLabel(required) {
  const n = component(`Required=${required ? 'true' : 'false'}`, 190, 21);
  const t = await ft(n, 'Workspace name', 'Form label');
  textProp(n, t, 'Label');
  if (required) {
    const marker = await ft(n, '*', 'Form label');
    marker.name = 'Required marker';
  }
  return n;
}
async function makeField(state) {
  const n = component(`State=${state}`, 240, state === 'Invalid' ? 122 : 97, 'VERTICAL');
  n.primaryAxisSizingMode = 'AUTO';
  bind(n, 'itemSpacing', 'space.2', map);
  const labelRow = frame(n, 'Label row', 240, 21, 'HORIZONTAL');
  labelRow.primaryAxisSizingMode = 'AUTO';
  labelRow.counterAxisSizingMode = 'FIXED';
  labelRow.itemSpacing = 4;
  const t = await ft(labelRow, 'Work email', 'Form label');
  textProp(n, t, 'Label');
  if (state === 'Required') await ft(labelRow, '*', 'Form label');
  const src = sets.Input?.children.find(
    (c) =>
      c.name ===
      `Size=md, State=${state === 'Invalid' ? 'Invalid' : state === 'Disabled' ? 'Disabled' : 'Default'}`,
  );
  if (!src) throw Error('Input family required before Field');
  const input = inst(n, src);
  const valueProp = Object.keys(input.componentProperties).find((k) => k.startsWith('Value#'));
  if (valueProp) input.setProperties({ [valueProp]: 'alex@example.com' });
  const help = await ft(n, 'Use your work address.', 'Form help', 'semantic.muted');
  textProp(n, help, 'Description');
  if (state === 'Invalid') {
    const error = await ft(n, 'Enter a valid email address.', 'Form help', 'semantic.danger');
    textProp(n, error, 'Error');
  }
  return n;
}
async function radioGroup(size, state, orientation) {
  const n = component(
    `Size=${size}, State=${state}, Orientation=${orientation}`,
    240,
    orientation === 'vertical' ? 110 : 75,
    'VERTICAL',
  );
  n.primaryAxisSizingMode = 'AUTO';
  bind(n, 'itemSpacing', 'space.2', map);
  const title = await ft(n, 'Visibility', 'Form label');
  textProp(n, title, 'Label');
  const options = frame(
    n,
    'Options',
    240,
    60,
    orientation === 'vertical' ? 'VERTICAL' : 'HORIZONTAL',
  );
  options.primaryAxisSizingMode = 'AUTO';
  options.counterAxisSizingMode = 'AUTO';
  bind(options, 'itemSpacing', orientation === 'vertical' ? 'space.2' : 'space.6', map);
  for (let index = 0; index < 2; index++) {
    const row = frame(options, 'Option / ' + (index ? 'Private' : 'Team'), 90, 24, 'HORIZONTAL');
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisAlignItems = 'CENTER';
    bind(row, 'itemSpacing', 'space.2', map);
    const c = solid(row, 'Radio', choiceValue[size], choiceValue[size], 'component.field-bg', true);
    border(
      c,
      state === 'Invalid' ? 'semantic.danger' : index ? 'semantic.muted' : 'semantic.accent',
      map,
    );
    c.strokeWeight = index ? 1 : 5;
    bind(c, 'width', 'component.choice-size-' + size, map);
    bind(c, 'height', 'component.choice-size-' + size, map);
    await ft(row, index ? 'Private' : 'Team', 'Form label');
  }
  if (state === 'Disabled') n.opacity = 0.5;
  if (state === 'Invalid') await ft(n, 'Choose a visibility.', 'Form help', 'semantic.danger');
  return n;
}
async function inputGroup(size, state) {
  const n = component(`Size=${size}, State=${state}`, 240, sizeValue[size]);
  controlFrame(n, size, state);
  const p = await ft(n, 'https://', 'Body', 'semantic.muted');
  textProp(n, p, 'Prefix');
  const value = await ft(n, 'your-company', 'Body');
  textProp(n, value, 'Value');
  const end = await ft(n, '.com', 'Body', 'semantic.muted');
  textProp(n, end, 'Suffix');
  return n;
}
async function buttonGroup(orientation) {
  const n = component(
    `Orientation=${orientation}`,
    228,
    orientation === 'vertical' ? 64 : 32,
    orientation === 'vertical' ? 'VERTICAL' : 'HORIZONTAL',
  );
  n.primaryAxisSizingMode = 'AUTO';
  n.counterAxisSizingMode = 'AUTO';
  n.itemSpacing = -1;
  const existing = await figma.getNodeByIdAsync('5:82');
  const source =
    existing.children.find(
      (c) => c.variantProperties?.Size === 'md' && c.variantProperties?.State === 'Default',
    ) || existing.children[0];
  instance(n, source, 'Save draft');
  instance(n, source, 'Save a copy');
  if (orientation === 'vertical') {
    const width = Math.max(...n.children.map((c) => c.width));
    n.counterAxisSizingMode = 'FIXED';
    n.resize(width, n.height);
    for (const child of n.children) child.resize(width, child.height);
  }
  return n;
}
for (const name of [
  'Input',
  'Label',
  'Field',
  'Textarea',
  'Native Select',
  'Checkbox',
  'Radio Group',
  'Switch',
  'Button Group',
  'Input Group',
]) {
  const existing = page.children.find((n) => n.type === 'COMPONENT_SET' && n.name === name);
  if (existing) sets[name] = existing;
}
for (const name of FORM_FAMILIES) {
  if (sets[name]) continue;
  const variants = [];
  if (['Input', 'Textarea', 'Native Select'].includes(name))
    for (const size of ['sm', 'md', 'lg'])
      for (const state of name === 'Native Select'
        ? ['Default', 'Focus', 'Disabled', 'Invalid']
        : ['Default', 'Focus', 'Disabled', 'Invalid', 'ReadOnly'])
        variants.push(await baseInput(name, size, state));
  else if (name === 'Label')
    for (const required of [false, true]) variants.push(await makeLabel(required));
  else if (name === 'Field')
    for (const state of ['Default', 'Required', 'Invalid', 'Disabled'])
      variants.push(await makeField(state));
  else if (['Checkbox', 'Switch'].includes(name))
    for (const size of ['sm', 'md', 'lg'])
      for (const state of name === 'Checkbox'
        ? [
            'Unchecked',
            'Checked',
            'Mixed',
            'DisabledUnchecked',
            'DisabledChecked',
            'Focus',
            'Invalid',
          ]
        : ['Off', 'On', 'DisabledOff', 'DisabledOn', 'Focus', 'Invalid'])
        variants.push(await choice(name, size, state));
  else if (name === 'Radio Group')
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Default', 'Disabled', 'Invalid'])
        for (const orientation of ['vertical', 'horizontal'])
          variants.push(await radioGroup(size, state, orientation));
  else if (name === 'Button Group')
    for (const orientation of ['horizontal', 'vertical'])
      variants.push(await buttonGroup(orientation));
  else if (name === 'Input Group')
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Default', 'Focus', 'Invalid', 'Disabled'])
        variants.push(await inputGroup(size, state));
  const set = remember(figma.combineAsVariants(variants, page));
  set.name = name;
  set.description =
    'Chamfer ' +
    name +
    ' — original native form foundation. Sizes and states match the React component; use the light/dark semantic collection. See /docs/components/' +
    name.toLowerCase().replaceAll(' ', '-') +
    '.';
  variants.forEach((n, i) => {
    n.x = (i % 4) * 280 + 24;
    n.y = Math.floor(i / 4) * 170 + 40;
  });
  set.resize(4 * 280 + 24, Math.ceil(variants.length / 4) * 170 + 40);
  set.x = 1600;
  set.y =
    [
      'Input',
      'Label',
      'Field',
      'Textarea',
      'Native Select',
      'Checkbox',
      'Radio Group',
      'Switch',
      'Button Group',
      'Input Group',
    ].indexOf(name) * 1250;
  set.fills = [];
  sets[name] = set;
}
return result({
  pageId: page.id,
  families: FORM_FAMILIES.map((name) => ({
    name,
    id: sets[name].id,
    variants: sets[name].children.length,
  })),
  styles: styles
    .filter((s) => /Form label|Form help/.test(s.name))
    .map((s) => ({ id: s.id, name: s.name })),
});
