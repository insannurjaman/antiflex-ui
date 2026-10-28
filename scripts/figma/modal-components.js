await fonts();
const page = await pageFor('antiflex / Modals');
const { map, collections } = await tokenMap();
const semantic = collections.find((c) => c.name === 'antiflex / Semantic');
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
    throw Error('Missing compatible antiflex component ' + key);
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
  const style = styles.find((s) => s.name === 'antiflex / ' + role);
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
    const style = styles.find((s) => s.name === 'antiflex / Button label');
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
      'Original antiflex ' +
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
