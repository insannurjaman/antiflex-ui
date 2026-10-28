await fonts();
const page = await pageFor('antiflex / Toast');
if (page.children.some((n) => n.name === 'Toast'))
  throw Error('Existing Toast construction: reconcile returned IDs instead of duplicating.');
const { map, collections } = await tokenMap();
const vars = await figma.variables.getLocalVariablesAsync();
const componentCollection = collections.find((c) => c.name === 'antiflex / Components');
const newVariables = [];
for (const [name, value] of Object.entries(TOAST_TOKENS)) {
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
  v.setVariableCodeSyntax('WEB', 'var(--af-component-' + name + ')');
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
  ['antiflex / Body', 'antiflex / Form label', 'antiflex / Button label'].includes(s.name),
))
  await figma.loadFontAsync(style.fontName);
const buttonSet = await figma.getNodeByIdAsync('5:82');
const buttonDefault = getVariant(buttonSet, { Size: 'sm', State: 'Default' });
const buttonPending = getVariant(buttonSet, { Size: 'sm', State: 'Loading' });
async function tx(parent, value, role = 'body', color = 'component.toast-fg', width) {
  const t = text(
    parent,
    value,
    14,
    color,
    map,
    false,
    role === 'title' ? 'Medium' : 'Regular',
    width,
  );
  await t.setTextStyleIdAsync(
    styles.find((s) => s.name === (role === 'title' ? 'antiflex / Form label' : 'antiflex / Body'))
      .id,
  );
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
function glyph(parent, tone) {
  const paths =
    tone === 'success'
      ? '<circle cx="10" cy="10" r="7.25"/><path d="m6.5 10 2.5 2.5 4.5-5"/>'
      : tone === 'warning'
        ? '<path d="m10 2 8 15H2Z"/><path d="M10 7v4m0 2v1"/>'
        : tone === 'danger'
          ? '<circle cx="10" cy="10" r="7.25"/><path d="m7.5 7.5 5 5m0-5-5 5"/>'
          : '<circle cx="10" cy="10" r="7.25"/><path d="M10 9v5m0-9v1"/>';
  const n = remember(
    figma.createNodeFromSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="black" stroke-width="1.5">' +
        paths +
        '</svg>',
    ),
  );
  parent.appendChild(n);
  n.name = 'Status / ' + tone;
  n.resize(20, 20);
  for (const c of n.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('strokes' in c && c.strokes.length)
      c.strokes = c.strokes.map((p) =>
        p.type === 'SOLID' ? paint(map['semantic.' + (tone === 'neutral' ? 'muted' : tone)], c) : p,
      );
  }
  return n;
}
const titles = {
  neutral: 'Changes are local',
  success: 'Project saved',
  warning: 'Storage nearly full',
  danger: 'Project could not be saved',
};
const descriptions = {
  neutral: 'Your application owns persistence.',
  success: 'Your changes are ready.',
  warning: 'Review the local example before continuing.',
  danger: 'Check the project name and try again.',
};
const variants = [];
for (const tone of ['neutral', 'success', 'warning', 'danger'])
  for (const action of ['None', 'Available', 'Pending']) {
    const n = remember(figma.createComponent());
    n.name = 'Variant=' + tone + ', Action=' + action;
    n.layoutMode = 'HORIZONTAL';
    n.resize(384, 100);
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisSizingMode = 'AUTO';
    n.counterAxisAlignItems = 'MIN';
    n.strokesIncludedInLayout = true;
    n.clipsContent = false;
    page.appendChild(n);
    fill(n, 'component.toast-bg', map);
    border(n, 'component.toast-border', map);
    bind(n, 'cornerRadius', 'radius.sm', map);
    for (const key of ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'])
      bind(n, key, 'component.toast-padding', map);
    gap(n, 3, map);
    glyph(n, tone);
    const body = box(n, 'Content', 266);
    body.layoutSizingHorizontal = 'FILL';
    gap(body, 1, map);
    const title = await tx(body, titles[tone], 'title', 'component.toast-fg', 266);
    title.layoutSizingHorizontal = 'FILL';
    title.componentPropertyReferences = {
      characters: n.addComponentProperty('Title', 'TEXT', title.characters),
    };
    const desc = await tx(body, descriptions[tone], 'body', 'semantic.muted', 266);
    desc.layoutSizingHorizontal = 'FILL';
    desc.componentPropertyReferences = {
      characters: n.addComponentProperty('Description', 'TEXT', desc.characters),
    };
    if (action !== 'None') {
      const slot = box(body, 'Action', 266);
      slot.layoutSizingHorizontal = 'FILL';
      bind(slot, 'paddingTop', 'space.2', map);
      slot.itemSpacing = 0;
      const a = instance(slot, action === 'Pending' ? buttonPending : buttonDefault, 'Undo change');
      a.layoutSizingHorizontal = 'HUG';
    }
    const close = box(n, 'Dismiss notification', 28, 'HORIZONTAL');
    close.resize(28, 28);
    close.primaryAxisSizingMode = 'FIXED';
    close.counterAxisSizingMode = 'FIXED';
    close.primaryAxisAlignItems = 'CENTER';
    close.counterAxisAlignItems = 'CENTER';
    close.itemSpacing = 0;
    bind(close, 'cornerRadius', 'radius.sm', map);
    const cross = remember(
      figma.createNodeFromSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="black" stroke-width="1.5"><path d="m4 4 8 8m0-8-8 8"/></svg>',
      ),
    );
    close.appendChild(cross);
    cross.name = 'Close';
    for (const c of cross.findAll(() => true)) {
      createdNodeIds.push(c.id);
      if ('strokes' in c && c.strokes.length)
        c.strokes = c.strokes.map((p) =>
          p.type === 'SOLID' ? paint(map['semantic.muted'], c) : p,
        );
    }
    n.description =
      'Original Toast. Visual group only; ToastProvider owns live announcements, queue and timer. No focus theft. Warning/danger/action notifications persist by default.';
    variants.push(n);
  }
const set = remember(figma.combineAsVariants(variants, page));
set.name = 'Toast';
set.description =
  'Four semantic variants × three action states. React ToastProvider owns bounded queue, updates, live regions, pause and async recovery. Figma shows visual states only. Fixed geometry: status icon 20px, close target 28px (44px for coarse pointers).';
set.x = 0;
set.y = 0;
variants.forEach((n, i) => {
  n.x = 24 + (i % 3) * 416;
  n.y = 48 + Math.floor(i / 3) * 204;
});
set.resize(1272, 880);
const boards = [];
for (const mode of ['Light', 'Dark']) {
  const board = box(page, 'Toast / ' + mode + ' review', 432);
  board.x = mode === 'Light' ? 0 : 480;
  board.y = 960;
  padding(board, 6, map);
  gap(board, 2, map);
  fill(board, 'semantic.canvas', map);
  setTheme(board, collections, mode);
  await tx(board, 'Notifications', 'title');
  for (const tone of ['neutral', 'success', 'warning', 'danger']) {
    const i = instance(
      board,
      variants.find(
        (n) => n.variantProperties.Variant === tone && n.variantProperties.Action === 'Available',
      ),
    );
    i.layoutSizingHorizontal = 'FILL';
    i.setProperties({
      [Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith('Title#'))]:
        titles[tone],
      [Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith('Description#'))]:
        descriptions[tone],
    });
  }
  await tx(board, '384px desktop · 16px padding · 8px stack gap', 'body', 'semantic.muted', 384);
  boards.push({ id: board.id, name: board.name, width: board.width, height: board.height });
}
const mobile = box(page, 'Toast / Mobile review', 320);
mobile.x = 1000;
mobile.y = 960;
padding(mobile, 6, map);
gap(mobile, 2, map);
fill(mobile, 'semantic.canvas', map);
setTheme(mobile, collections, 'Light');
await tx(mobile, 'Mobile notification', 'title');
const small = instance(
  mobile,
  variants.find(
    (n) => n.variantProperties.Variant === 'danger' && n.variantProperties.Action === 'None',
  ),
);
small.layoutSizingHorizontal = 'FILL';
small.setProperties({
  [Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith('Title#'))]:
    titles.danger,
  [Object.keys(set.componentPropertyDefinitions).find((k) => k.startsWith('Description#'))]:
    descriptions.danger,
});
const close = small.findOne((n) => n.name === 'Dismiss notification');
close.resize(44, 44);
await tx(
  mobile,
  '320px viewport. 24px logical offsets. Coarse pointer close target: 44px.',
  'body',
  'semantic.muted',
  272,
);
boards.push({ id: mobile.id, name: mobile.name, width: mobile.width, height: mobile.height });
return result({
  pageId: page.id,
  setId: set.id,
  variantCount: variants.length,
  variants: variants.map((n) => ({ id: n.id, name: n.name, width: n.width, height: n.height })),
  boards,
  newVariables,
  totalVariables: (await figma.variables.getLocalVariablesAsync()).length,
  textStyles: styles.length,
  representativeText: variants[0]
    .findAll((n) => n.type === 'TEXT')
    .map((n) => ({ id: n.id, style: n.textStyleId, bound: n.boundVariables })),
});
