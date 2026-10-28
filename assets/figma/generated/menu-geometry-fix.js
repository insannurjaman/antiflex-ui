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

const page=await figma.getNodeByIdAsync('82:2');await figma.setCurrentPageAsync(page);await fonts();
const all=page.findAll(()=>true);for(const node of all.filter(n=>n.type==='TEXT'))for(const seg of node.getStyledTextSegments(['fontName']))await figma.loadFontAsync(seg.fontName);
const ids=[];const item=await figma.getNodeByIdAsync('82:81');
for(const n of item.children){n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='AUTO';ids.push(n.id);}
for(const n of all.filter(n=>n.type==='FRAME'&&n.layoutMode==='HORIZONTAL')){n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='AUTO';ids.push(n.id);}
const labels={Default:'Duplicate project',Hover:'Duplicate project',Focus:'Duplicate project',Disabled:'Delete project',Checked:'Pin project',Radio:'Comfortable',Submenu:'Export',Danger:'Archive project'};
for(const id of ['82:233','82:294']){const board=await figma.getNodeByIdAsync(id);for(const inst of board.findAll(n=>n.type==='INSTANCE'&&n.parent?.type==='FRAME'&&labels[n.parent.name])){const label=labels[inst.parent.name];const keys=Object.keys(inst.componentProperties).filter(k=>k.startsWith('Label#'));if(keys.length)inst.setProperties(Object.fromEntries(keys.map(key=>[key,label])));ids.push(inst.id);for(const c of inst.findAll(()=>true))ids.push(c.id);}ids.push(board.id);}
for(const n of item.findAll(n=>n.type==='VECTOR')){if(n.strokes.length){n.strokeWeight=1.5;ids.push(n.id);}}
const issues=[];for(const n of item.children){if(n.height<28||n.height>44)issues.push({id:n.id,height:n.height});}
const boards=await Promise.all(['82:233','82:294'].map(id=>figma.getNodeByIdAsync(id)));
return {mutatedNodeIds:[...new Set(ids)],createdNodeIds:[],validation:{errors:issues,itemBounds:item.children.map(n=>({id:n.id,width:n.width,height:n.height})),boards:boards.map(n=>({id:n.id,width:n.width,height:n.height})),totalVariables:(await figma.variables.getLocalVariablesAsync()).length}};
