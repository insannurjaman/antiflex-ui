const page = await figma.getNodeByIdAsync('104:27');
await figma.setCurrentPageAsync(page);
if (page.children.some((n) => n.name === 'DatePicker'))
  throw Error('Existing construction; reconcile saved IDs.');
const calendarSet = await figma.getNodeByIdAsync('104:391');
const pickerVariants = [];
for (const state of ['Closed', 'Selected', 'Open', 'Disabled', 'Invalid']) {
  const n = comp(page, 'State=' + state, 328);
  gap(n, 2, map);
  const control = box(n, 'Date trigger', 240, true);
  control.resize(240, 32);
  control.primaryAxisSizingMode = 'FIXED';
  control.counterAxisSizingMode = 'FIXED';
  control.counterAxisAlignItems = 'CENTER';
  for (const p of ['paddingLeft', 'paddingRight']) bind(control, p, 'space.3', map);
  panel(control);
  if (state === 'Disabled') control.opacity = 0.5;
  if (state === 'Invalid') border(control, 'semantic.danger', map);
  const value = await label(
    control,
    state === 'Selected' || state === 'Open' ? 'Oct 23, 2026' : 'Choose a date',
    190,
  );
  value.layoutSizingHorizontal = 'FILL';
  expose(n, value, 'Value');
  const icon = remember(
    figma.createNodeFromSvg(
      '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 3.5h10v10H3ZM5 2v3m6-3v3M3 7h10" fill="none" stroke="black" stroke-width="1.5"/></svg>',
    ),
  );
  control.appendChild(icon);
  icon.resize(16, 16);
  for (const c of icon.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('strokes' in c && c.strokes.length)
      c.strokes = c.strokes.map((p) =>
        p.type === 'SOLID' ? paint(map['semantic.foreground'], c) : p,
      );
  }
  if (state === 'Open') {
    const panelNode = box(n, 'Date chooser', 328);
    panel(panelNode);
    padding(panelNode, 4, map);
    gap(panelNode, 3, map);
    await label(panelNode, 'Due date', 294, 'semantic.foreground', 16, 'Medium');
    const c = instance(panelNode, getVariant(calendarSet, { State: 'Selected' }));
    c.resize(294, c.height);
    c.layoutSizingHorizontal = 'FILL';
    const actions = box(panelNode, 'Clear and cancel', 294, true);
    actions.primaryAxisAlignItems = 'MAX';
    gap(actions, 2, map);
    await button(actions, 'Clear date');
    await button(actions, 'Cancel');
  }
  if (state === 'Invalid')
    await label(n, 'Choose an available date before continuing.', 328, 'semantic.danger', 12);
  pickerVariants.push(n);
}
const ps = set(page, pickerVariants, 'DatePicker', 40, 3000, 3, 370, 620);
const boards = [];
for (const [mode, width] of [
  ['Light', 1000],
  ['Dark', 1000],
  ['Light', 390],
  ['Dark', 390],
]) {
  const mobile = width === 390;
  const n = await board(
    page,
    'Date Picker / ' + mode + (mobile ? ' / Mobile' : ''),
    width,
    mode,
    mobile ? 1150 : 40,
    4400 + (mode === 'Dark' ? 1000 : 0),
    'Single-date picker · Initial active-day focus · Escape returns to invoker · Clear/cancel · Required validation and native form reset.',
  );
  const row = box(n, 'Date picker states', width - 48, !mobile);
  gap(row, 6, map);
  instance(row, getVariant(ps, { State: 'Open' }));
  if (!mobile) {
    const col = box(row, 'Other states', 328);
    for (const state of ['Closed', 'Selected', 'Disabled', 'Invalid'])
      instance(col, getVariant(ps, { State: state }));
  }
  boards.push(n.id);
}
await bindTypography(page, map);
return result({ pageId: page.id, sets: { DatePicker: ps.id }, boards });
