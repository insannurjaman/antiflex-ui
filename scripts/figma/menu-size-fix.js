const page = await figma.getNodeByIdAsync('82:2');
await figma.setCurrentPageAsync(page);
await fonts();
for (const node of page.findAllWithCriteria({ types: ['TEXT'] }))
  for (const seg of node.getStyledTextSegments(['fontName']))
    await figma.loadFontAsync(seg.fontName);
const set = await figma.getNodeByIdAsync('82:81');
for (const n of set.children) {
  const size = n.variantProperties.Size;
  n.strokesIncludedInLayout = false;
  n.resize(MENU_TOKENS['menu-width-' + size] - 10, 29);
  n.primaryAxisSizingMode = 'FIXED';
  n.counterAxisSizingMode = 'AUTO';
  mutatedNodeIds.push(n.id);
}
for (const id of ['82:233', '82:294']) {
  const board = await figma.getNodeByIdAsync(id);
  for (const n of board.findAll((n) => n.type === 'INSTANCE' && n.parent?.type === 'FRAME')) {
    if (n.name === 'MenuItem') {
      n.layoutSizingHorizontal = 'FILL';
      mutatedNodeIds.push(n.id);
    }
  }
  mutatedNodeIds.push(board.id);
}
const errors = [];
for (const n of set.children) {
  const size = n.variantProperties.Size,
    w = MENU_TOKENS['menu-width-' + size] - 10;
  if (n.width !== w || n.height > 40)
    errors.push({ id: n.id, width: n.width, expectedWidth: w, height: n.height });
}
return result({
  validation: {
    errors,
    itemBounds: set.children.map((n) => ({ id: n.id, width: n.width, height: n.height })),
    boards: (await Promise.all(['82:233', '82:294'].map((id) => figma.getNodeByIdAsync(id)))).map(
      (n) => ({ id: n.id, width: n.width, height: n.height }),
    ),
  },
});
