const page = await pageFor('antiflex / Search and selection');
if (page.children.some((n) => n.name === 'Select'))
  throw Error('Existing construction; reconcile saved IDs.');
const itemVariants = [];
for (const state of ['Default', 'Active', 'Selected', 'Disabled', 'Description']) {
  const n = comp(page, 'State=' + state, 270, true);
  n.counterAxisAlignItems = 'CENTER';
  padding(n, 2, map);
  for (const p of ['paddingLeft', 'paddingRight']) bind(n, p, 'space.3', map);
  bind(n, 'minHeight', 'component.choice-item-height', map);
  gap(n, 3, map);
  if (state === 'Active') fill(n, 'semantic.accent-soft', map);
  if (state === 'Disabled') n.opacity = 0.5;
  const content = box(n, 'Label and description', 220);
  gap(content, 0, map);
  content.layoutSizingHorizontal = 'FILL';
  expose(n, await label(content, 'Alex Morgan', 220), 'Label');
  if (state === 'Description')
    expose(n, await label(content, 'Product designer', 220, 'semantic.muted', 12), 'Description');
  if (state === 'Selected') arrow(n, 'check', 'semantic.accent');
  itemVariants.push(n);
}
const optionSet = set(page, itemVariants, '.Building Blocks/ChoiceOption', 40, 40, 5, 300, 120);
function option(parent, state, value) {
  const n = instance(parent, getVariant(optionSet, { State: state }), value);
  n.layoutSizingHorizontal = 'FILL';
  return n;
}
async function control(parent, value, size = 'md', state = 'Default', editable = false) {
  const h = { sm: 32, md: 36, lg: 44 }[size];
  const n = box(parent, 'Visible ' + (editable ? 'input' : 'button'), 280, true);
  n.resize(280, h);
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'FIXED';
  n.counterAxisAlignItems = 'CENTER';
  n.itemSpacing = 12;
  for (const p of ['paddingLeft', 'paddingRight']) bind(n, p, 'space.3', map);
  bind(n, 'minHeight', 'component.field-height-' + size, map);
  panel(n);
  if (state === 'Disabled') n.opacity = 0.5;
  if (state === 'Error') border(n, 'semantic.danger', map);
  const t = await label(
    n,
    value,
    editable ? 254 : 226,
    value.startsWith('Choose') ? 'semantic.muted' : 'semantic.foreground',
    size === 'sm' ? 12 : 14,
  );
  t.layoutSizingHorizontal = 'FILL';
  if (!editable) arrow(n);
  if (state === 'Focus') focus(n);
  return n;
}
const selections = {};
let y = 230;
for (const family of ['Select', 'Combobox']) {
  const nodes = [];
  const states = ['Default', 'Focus', 'Disabled', 'Error', 'Open', 'Empty', 'Loading'];
  for (const size of ['sm', 'md', 'lg'])
    for (const state of size === 'md' ? states : ['Default']) {
      const n = comp(page, 'Size=' + size + ', State=' + state, 280);
      gap(n, 1, map);
      const c = await control(
        n,
        state === 'Open' && family === 'Combobox'
          ? 'react'
          : state === 'Empty'
            ? 'No match'
            : state === 'Default'
              ? 'Alex Morgan'
              : 'Choose a sample member',
        size,
        state,
        family === 'Combobox',
      );
      const textNode = c.findOne((n) => n.type === 'TEXT');
      if (textNode) expose(n, textNode, 'Value');
      if (['Open', 'Empty', 'Loading'].includes(state)) {
        const popup = box(n, 'Listbox / ' + state, 280);
        panel(popup);
        padding(popup, 1, map);
        gap(popup, 0, map);
        bind(popup, 'maxHeight', 'component.choice-max-height', map);
        if (state === 'Empty' || state === 'Loading') {
          padding(popup, 3, map);
          await label(
            popup,
            state === 'Empty' ? 'No options found.' : 'Loading options…',
            254,
            'semantic.muted',
          );
        } else if (family === 'Combobox') {
          const i = option(popup, 'Active', 'Sam Rivera');
        } else {
          option(popup, 'Selected', 'Alex Morgan');
          option(popup, 'Active', 'Sam Rivera');
          option(popup, 'Disabled', 'Jordan Lee');
        }
      }
      if (state === 'Error')
        await label(n, 'Choose an option before continuing.', 280, 'semantic.danger', 12);
      nodes.push(n);
    }
  selections[family] = set(page, nodes, family, 40, y, 3, 320, 280);
  y += 920;
}
const cmds = [];
for (const state of ['Default', 'Filtered', 'Empty', 'Loading', 'Disabled action']) {
  const n = comp(page, 'State=' + state, 560);
  gap(n, 2, map);
  const input = await control(
    n,
    state === 'Filtered' ? 'create' : 'Search commands…',
    'md',
    'Default',
    true,
  );
  input.resize(560, input.height);
  const popup = box(n, 'Action results', 560);
  panel(popup);
  padding(popup, 1, map);
  gap(popup, 0, map);
  bind(popup, 'maxHeight', 'component.command-height', map);
  if (['Empty', 'Loading'].includes(state)) {
    padding(popup, 3, map);
    await label(
      popup,
      state === 'Empty' ? 'No commands found.' : 'Loading options…',
      530,
      'semantic.muted',
    );
  } else {
    option(popup, 'Active', 'Create local project');
    if (state !== 'Filtered')
      option(popup, state === 'Disabled action' ? 'Disabled' : 'Default', 'View foundations');
  }
  cmds.push(n);
}
const cs = set(page, cmds, 'Command', 1120, 230, 2, 600, 300);
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
    'Search and selection / ' + mode + (mobile ? ' / Mobile' : ''),
    width,
    mode,
    mobile ? 1150 : 40,
    2300 + (mode === 'Dark' ? 900 : 0),
    'Committed values remain separate from search text. Native form validation and reset; local action search.',
  );
  const row = box(n, 'Choice specimens', width - 48, !mobile);
  gap(row, 6, map);
  for (const family of ['Select', 'Combobox']) {
    const col = box(row, family, 280);
    await label(col, family);
    instance(col, getVariant(selections[family], { Size: 'md', State: 'Open' }));
  }
  const command = instance(n, getVariant(cs, { State: 'Default' }));
  if (mobile) {
    command.resize(342, command.height);
    for (const c of command.children) c.resize(342, c.height);
  }
  boards.push(n.id);
}
await bindTypography(page, map);
return result({
  pageId: page.id,
  sets: {
    ChoiceOption: optionSet.id,
    Select: selections.Select.id,
    Combobox: selections.Combobox.id,
    Command: cs.id,
  },
  boards,
});
