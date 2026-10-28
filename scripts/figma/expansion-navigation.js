const page = await pageFor('antiflex / Workspace navigation');
if (page.children.some((n) => n.name === 'HoverCard'))
  throw Error('Existing construction; reconcile saved IDs.');
const hover = [];
for (const state of ['Default', 'Focus', 'Long content']) {
  const n = comp(page, 'State=' + state, 288);
  panel(n, 'hover-card');
  padding(n, 4, map);
  gap(n, 2, map);
  bind(n, 'minWidth', 'component.hover-card-width', map);
  expose(n, await label(n, 'Alex Morgan', 254, 'semantic.foreground', 16, 'Medium'), 'Name');
  expose(
    n,
    await label(
      n,
      state === 'Long content'
        ? 'Product designer working on the Atlas workspace and its local review process.'
        : 'Product designer · Atlas workspace',
      254,
    ),
    'Description',
  );
  await label(n, 'Supplementary profile preview', 254, 'semantic.muted');
  if (state === 'Focus') focus(n);
  hover.push(n);
}
const hs = set(page, hover, 'HoverCard', 40, 40, 3, 320, 250);
const menu = [];
const itemSet = await figma.getNodeByIdAsync('82:81');
for (const state of ['Closed', 'Open', 'Focus', 'Disabled']) {
  const n = comp(page, 'State=' + state, 258);
  gap(n, 1, map);
  const bar = box(n, 'Menubar / command headings', 218, true);
  bar.counterAxisAlignItems = 'CENTER';
  padding(bar, 1, map);
  gap(bar, 1, map);
  fill(bar, 'semantic.surface', map);
  border(bar, 'semantic.border-strong', map);
  bar.strokesIncludedInLayout = true;
  bind(bar, 'minHeight', 'component.menubar-height', map);
  for (const name of ['File', 'Edit', 'View']) {
    const b = await button(
      bar,
      name,
      state === 'Disabled' && name === 'Edit'
        ? 'Disabled'
        : state === 'Focus' && name === 'File'
          ? 'Focus'
          : 'Default',
    );
    if (state === 'Open' && name === 'File') {
      fill(b, 'semantic.accent-soft', map);
      for (const t of b.findAll((n) => n.type === 'TEXT')) fill(t, 'semantic.accent', map);
    }
  }
  if (state === 'Open') {
    const p = box(n, 'File actions', 240);
    panel(p, 'menu');
    padding(p, 1, map);
    gap(p, 0, map);
    for (const [state, label] of [
      ['Default', 'New local project'],
      ['Submenu', 'Export'],
      ['Disabled', 'Delete project'],
    ]) {
      const i = instance(p, getVariant(itemSet, { Size: 'md', State: state }), label);
      i.layoutSizingHorizontal = 'FILL';
    }
  }
  menu.push(n);
}
const ms = set(page, menu, 'Menubar', 40, 380, 4, 290, 320);
const nav = [];
for (const state of ['Closed', 'Open', 'Current', 'Focus']) {
  const n = comp(page, 'State=' + state, 360);
  gap(n, 2, map);
  const row = box(n, 'Navigation headings', 280, true);
  gap(row, 2, map);
  await button(row, 'Learn', state === 'Focus' ? 'Focus' : 'Default', 'md');
  await button(row, 'Build', 'Default', 'md');
  if (['Open', 'Current'].includes(state)) {
    const p = box(n, 'Learn resources', 360);
    panel(p, 'hover-card');
    padding(p, 2, map);
    gap(p, 1, map);
    bind(p, 'minWidth', 'component.navigation-menu-width', map);
    for (const [title, desc] of [
      ['Introduction', 'Get to know antiflex/ui.'],
      ['Foundations', 'Shared colors and typography.'],
    ]) {
      const l = box(p, title, 342);
      padding(l, 3, map);
      gap(l, 1, map);
      if (state === 'Current' && title === 'Introduction') fill(l, 'semantic.accent-soft', map);
      await label(
        l,
        title,
        318,
        state === 'Current' && title === 'Introduction' ? 'semantic.accent' : 'semantic.foreground',
      );
      await label(l, desc, 318, 'semantic.muted', 12);
    }
  }
  nav.push(n);
}
const ns = set(page, nav, 'NavigationMenu', 40, 800, 4, 390, 360);
const boards = [];
for (const [mode, width] of [
  ['Light', 1120],
  ['Dark', 1120],
  ['Light', 390],
  ['Dark', 390],
]) {
  const mobile = width === 390;
  const n = await board(
    page,
    'Workspace navigation / ' + mode + (mobile ? ' / Mobile' : ''),
    width,
    mode,
    mobile ? 1240 : 40,
    1300 + (mode === 'Dark' ? (mobile ? 1000 : 700) : 0),
    'Ordinary links for navigation; roving command headings for application actions. Hover preview supplements a real profile link.',
  );
  const row = box(n, 'Live component specimens', width - 48, !mobile);
  gap(row, 6, map);
  for (const [source, props] of [
    [hs, { State: 'Default' }],
    [ms, { State: 'Open' }],
    [ns, { State: 'Open' }],
  ]) {
    const col = box(row, source.name, mobile ? 342 : 330);
    await label(col, source.name);
    const i = instance(col, getVariant(source, props));
    if (source === ns && mobile) {
      i.resize(342, i.height);
      const p = i.findOne((n) => n.name === 'Learn resources');
      if (p) p.resize(342, p.height);
    }
  }
  boards.push(n.id);
}
await bindTypography(page, map);
return result({
  pageId: page.id,
  sets: { HoverCard: hs.id, Menubar: ms.id, NavigationMenu: ns.id },
  boards,
});
