await fonts();
const page = await pageFor('antiflex / Panels');
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
  const style = styles.find((s) => s.name === 'antiflex / ' + role);
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
      await t.setTextStyleIdAsync(styles.find((s) => s.name === 'antiflex / Button label').id);
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
    'Original antiflex ' +
    family +
    ' content. ' +
    (family === 'Sheet'
      ? 'Physical ' + side + ' edge; ' + size + ' size.'
      : 'Intrinsic bottom task; ' + size + ' width, max 85dvh.') +
    ' Header and footer remain visible while Body scrolls. Native modal behavior is in React. No swipe, snap points, or drag handle. Semantic modes inherit from the consumer.';
  return n;
}
const families = [],
  sources = {};
let originX = 100;
for (const family of ['Sheet', 'Drawer']) {
  let set = page.children.find((n) => n.type === 'COMPONENT_SET' && n.name === family);
  if (!set) {
    const variants = [];
    for (const side of family === 'Sheet' ? ['right', 'left', 'top', 'bottom'] : ['bottom'])
      for (const size of ['sm', 'md', 'lg'])
        for (const state of ['Default', 'Focus'])
          variants.push(await panel(family, side, size, state));
    for (const state of ['Default', 'Focus'])
      variants.push(
        await panel(family, family === 'Sheet' ? 'right' : 'bottom', 'md', state, 'Mobile'),
      );
    set = remember(figma.combineAsVariants(variants, page));
    set.name = family;
    set.x = originX;
    set.y = 100;
    let y = 48;
    for (let i = 0; i < variants.length; i += 2) {
      variants[i].x = 24;
      variants[i].y = y;
      variants[i + 1].x = 1080;
      variants[i + 1].y = y;
      y += Math.max(variants[i].height, variants[i + 1].height) + 64;
    }
    set.resize(2140, y);
    set.description =
      'antiflex ' +
      family +
      ' content; original components, shared modal styles and native controls. Size and Focus correspond to code. Widths represent a 1000px desktop viewport; mobile examples clamp to 390px.';
  }
  originX += 2300;
  sources[family] = set;
  families.push({
    id: set.id,
    name: family,
    variants: set.children.length,
    properties: set.componentPropertyDefinitions,
  });
}
const reviews = [];
for (const theme of ['Light', 'Dark']) {
  let board = page.children.find(
    (n) => n.type === 'FRAME' && n.name === 'Panels / Review / ' + theme,
  );
  if (!board) {
    board = auto(page, 'Panels / Review / ' + theme, 1240);
    board.x = theme === 'Light' ? 100 : 1450;
    board.y = 10000;
    padding(board, 6, map);
    gap(board, 6, map);
    fill(board, 'semantic.canvas', map);
    setTheme(board, collections, theme);
    await tx(board, 'Edge panels and bottom tasks', 'Heading', 'semantic.foreground', 1192);
    await tx(
      board,
      'Native modal focus · Fixed actions · No swipe or snap points',
      'Body',
      'semantic.muted',
      1192,
    );
    const row = auto(board, 'Desktop specimens', 1192, 100, 'HORIZONTAL');
    row.counterAxisSizingMode = 'AUTO';
    gap(row, 6, map);
    for (const family of ['Sheet', 'Drawer']) {
      const source = sources[family].children.find(
        (n) =>
          n.name ===
          (family === 'Sheet' ? 'Side=right, ' : '') + 'Size=md, State=Focus, Viewport=Desktop',
      );
      const instance = remember(source.createInstance());
      row.appendChild(instance);
    }
    await tx(board, 'Mobile · 390px viewport', 'Title', 'semantic.foreground', 1192);
    const mobile = auto(board, 'Mobile specimens', 1192, 100, 'HORIZONTAL');
    mobile.counterAxisSizingMode = 'AUTO';
    gap(mobile, 6, map);
    for (const family of ['Sheet', 'Drawer']) {
      const source = sources[family].children.find(
        (n) =>
          n.name ===
          (family === 'Sheet' ? 'Side=right, ' : '') + 'Size=md, State=Focus, Viewport=Mobile',
      );
      const instance = remember(source.createInstance());
      mobile.appendChild(instance);
    }
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
