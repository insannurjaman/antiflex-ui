const page = await pageFor('antiflex / Date tools');
if (page.children.some((n) => n.name === 'Calendar'))
  throw Error('Existing construction; reconcile saved IDs.');
const dayVariants = [];
for (const state of ['Default', 'Selected', 'Today', 'Unavailable', 'Outside', 'Focus']) {
  const n = comp(page, 'State=' + state, 40, true);
  n.resize(40, 36);
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.primaryAxisAlignItems = 'CENTER';
  n.counterAxisAlignItems = 'CENTER';
  bind(n, 'minHeight', 'component.calendar-day-size', map);
  if (state === 'Selected') fill(n, 'semantic.action', map);
  if (state === 'Today') border(n, 'semantic.border-strong', map);
  if (state === 'Unavailable') n.opacity = 0.5;
  expose(
    n,
    await label(
      n,
      '23',
      undefined,
      state === 'Selected'
        ? 'semantic.action-foreground'
        : state === 'Outside'
          ? 'semantic.muted'
          : 'semantic.foreground',
    ),
    'Day',
  );
  if (state === 'Focus') focus(n);
  dayVariants.push(n);
}
const ds = set(page, dayVariants, '.Building Blocks/CalendarDay', 40, 40, 6, 80, 90);
const calendars = [];
for (const state of ['Selected', 'Unavailable dates', 'Focus']) {
  const n = comp(page, 'State=' + state, 296);
  gap(n, 0, map);
  bind(n, 'minWidth', 'component.calendar-width', map);
  const h = box(n, 'Month navigation', 296, true);
  h.counterAxisAlignItems = 'CENTER';
  h.primaryAxisAlignItems = 'SPACE_BETWEEN';
  h.paddingBottom = 12;
  for (const side of ['left', 'title', 'right']) {
    if (side === 'title') {
      await label(h, 'October 2026', 204, 'semantic.foreground', 14, 'Medium');
    } else {
      const b = box(h, side === 'left' ? 'Previous month' : 'Next month', 32, true);
      b.resize(32, 32);
      b.primaryAxisSizingMode = 'FIXED';
      b.counterAxisSizingMode = 'FIXED';
      b.primaryAxisAlignItems = 'CENTER';
      b.counterAxisAlignItems = 'CENTER';
      arrow(b, side);
    }
  }
  const weekdays = box(n, 'Weekday headers', 296, true);
  weekdays.itemSpacing = 2;
  weekdays.paddingTop = 4;
  weekdays.paddingBottom = 4;
  weekdays.paddingLeft = 2;
  weekdays.paddingRight = 2;
  for (const name of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) {
    const cell = box(weekdays, name, 40, true);
    cell.primaryAxisAlignItems = 'CENTER';
    await label(cell, name, undefined, 'semantic.muted', 12);
  }
  for (let week = 0; week < 6; week++) {
    const row = box(n, 'Week ' + (week + 1), 296, true);
    row.itemSpacing = 2;
    row.paddingLeft = 2;
    row.paddingRight = 2;
    row.paddingBottom = 2;
    for (let d = 0; d < 7; d++) {
      const i = week * 7 + d;
      const date = new Date(Date.UTC(2026, 8, 27 + i));
      const day = date.getUTCDate();
      const outside = date.getUTCMonth() !== 9;
      const s = outside
        ? 'Outside'
        : day === 23
          ? state === 'Focus'
            ? 'Focus'
            : 'Selected'
          : state === 'Unavailable dates' && [0, 6].includes(d)
            ? 'Unavailable'
            : 'Default';
      const c = instance(row, getVariant(ds, { State: s }));
      const dayKey = Object.keys(ds.componentPropertyDefinitions).find((k) => k.startsWith('Day#'));
      c.setProperties({ [dayKey]: String(day) });
    }
  }
  const help = box(n, 'Keyboard help', 296);
  help.paddingTop = 8;
  await label(help, 'Arrow keys move days. Page Up/Down changes month.', 296, 'semantic.muted', 12);
  calendars.push(n);
}
const cs = set(page, calendars, 'Calendar', 40, 240, 3, 340, 450);
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
    'Date tools / ' + mode + (mobile ? ' / Mobile' : ''),
    width,
    mode,
    mobile ? 1150 : 40,
    850 + (mode === 'Dark' ? 1000 : 0),
    'Single Gregorian date · YYYY-MM-DD values · Explicit locale and week start. Native keyboard movement, limits and disabled-date checks are implemented in React.',
  );
  const row = box(n, 'Calendar specimens', width - 48, !mobile);
  gap(row, 6, map);
  for (const state of mobile ? ['Selected'] : ['Selected', 'Unavailable dates'])
    instance(row, getVariant(cs, { State: state }));
  boards.push(n.id);
}
await bindTypography(page, map);
return result({ pageId: page.id, sets: { CalendarDay: ds.id, Calendar: cs.id }, boards });
