const page = await figma.getNodeByIdAsync('82:2');
await figma.setCurrentPageAsync(page);
await fonts();
const { map, collections } = await tokenMap();
const set = await figma.getNodeByIdAsync('82:81');
for (const id of ['82:233', '82:294']) {
  const board = await figma.getNodeByIdAsync(id);
  mutatedNodeIds.push(board.id);
  const wrap = frame(board, 'Menu item state reference', 976);
  wrap.primaryAxisSizingMode = 'AUTO';
  gap(wrap, 3, map);
  for (const states of [
    ['Default', 'Hover', 'Focus', 'Disabled'],
    ['Checked', 'Radio', 'Submenu', 'Danger'],
  ]) {
    const row = frame(wrap, 'States ' + states.join(', '), 976, 100, 'HORIZONTAL');
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    gap(row, 3, map);
    for (const state of states) {
      const col = frame(row, state, 230);
      col.primaryAxisSizingMode = 'AUTO';
      gap(col, 2, map);
      text(col, state, 12, 'semantic.muted', map);
      const source = set.children.find(
        (c) =>
          c.type === 'COMPONENT' &&
          c.variantProperties.Size === 'md' &&
          c.variantProperties.State === state,
      );
      const n = remember(source.createInstance());
      col.appendChild(n);
      for (const child of n.findAll(() => true)) createdNodeIds.push(child.id);
    }
  }
}
return result({
  boards: (await Promise.all(['82:233', '82:294'].map((id) => figma.getNodeByIdAsync(id)))).map(
    (n) => ({ id: n.id, width: n.width, height: n.height }),
  ),
  statesPerTheme: 8,
});
