const page = await figma.getNodeByIdAsync('82:2');
await figma.setCurrentPageAsync(page);
await fonts();
const all = page.findAll(() => true);
for (const node of all.filter((n) => n.type === 'TEXT'))
  for (const seg of node.getStyledTextSegments(['fontName']))
    await figma.loadFontAsync(seg.fontName);
const ids = [];
const item = await figma.getNodeByIdAsync('82:81');
for (const n of item.children) {
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'AUTO';
  ids.push(n.id);
}
for (const n of all.filter((n) => n.type === 'FRAME' && n.layoutMode === 'HORIZONTAL')) {
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'AUTO';
  ids.push(n.id);
}
const labels = {
  Default: 'Duplicate project',
  Hover: 'Duplicate project',
  Focus: 'Duplicate project',
  Disabled: 'Delete project',
  Checked: 'Pin project',
  Radio: 'Comfortable',
  Submenu: 'Export',
  Danger: 'Archive project',
};
for (const id of ['82:233', '82:294']) {
  const board = await figma.getNodeByIdAsync(id);
  for (const inst of board.findAll(
    (n) => n.type === 'INSTANCE' && n.parent?.type === 'FRAME' && labels[n.parent.name],
  )) {
    const label = labels[inst.parent.name];
    const keys = Object.keys(inst.componentProperties).filter((k) => k.startsWith('Label#'));
    if (keys.length) inst.setProperties(Object.fromEntries(keys.map((key) => [key, label])));
    ids.push(inst.id);
    for (const c of inst.findAll(() => true)) ids.push(c.id);
  }
  ids.push(board.id);
}
for (const n of item.findAll((n) => n.type === 'VECTOR')) {
  if (n.strokes.length) {
    n.strokeWeight = 1.5;
    ids.push(n.id);
  }
}
const issues = [];
for (const n of item.children) {
  if (n.height < 28 || n.height > 44) issues.push({ id: n.id, height: n.height });
}
const boards = await Promise.all(['82:233', '82:294'].map((id) => figma.getNodeByIdAsync(id)));
return {
  mutatedNodeIds: [...new Set(ids)],
  createdNodeIds: [],
  validation: {
    errors: issues,
    itemBounds: item.children.map((n) => ({ id: n.id, width: n.width, height: n.height })),
    boards: boards.map((n) => ({ id: n.id, width: n.width, height: n.height })),
    totalVariables: (await figma.variables.getLocalVariablesAsync()).length,
  },
};
