const review = [];
for (const theme of ['Light', 'Dark']) {
  let root = page.children.find((n) => n.name === 'Forms / Review / ' + theme);
  if (root) {
    review.push({ id: root.id, theme });
    continue;
  }
  root = frame(page, 'Forms / Review / ' + theme, 1200, 100, 'VERTICAL');
  padding(root, 8, map);
  gap(root, 6, map);
  fill(root, 'semantic.canvas', map);
  setTheme(root, collections, theme);
  root.x = 0;
  root.y = theme === 'Light' ? 0 : 2400;
  text(root, 'antiflex / Form foundation', 28, 'semantic.foreground', map, false, 'Medium');
  await ft(
    root,
    '10 original form families · native semantics · three sizes · ' + theme + ' theme',
    'Body',
    'semantic.muted',
  );
  for (const [name, set] of Object.entries(sets)) {
    const section = frame(root, name + ' / States', 1136, 100, 'VERTICAL');
    gap(section, 4, map);
    await ft(section, name, 'Form label');
    const samples = set.children.filter(
      (n) =>
        n.type === 'COMPONENT' &&
        (n.variantProperties.Size === undefined || n.variantProperties.Size === 'md') &&
        (n.variantProperties.Orientation === undefined ||
          n.variantProperties.Orientation === 'vertical' ||
          name === 'Button Group'),
    );
    for (let index = 0; index < samples.length; index += 4) {
      const row = frame(section, 'State row', 1136, 100, 'HORIZONTAL');
      row.primaryAxisSizingMode = 'AUTO';
      row.counterAxisSizingMode = 'AUTO';
      gap(row, 6, map);
      for (const source of samples.slice(index, index + 4)) {
        const cell = frame(row, 'Specimen / ' + source.name, 260, 100, 'VERTICAL');
        cell.primaryAxisSizingMode = 'AUTO';
        cell.counterAxisSizingMode = 'FIXED';
        gap(cell, 3, map);
        await ft(
          cell,
          source.variantProperties.State || source.name,
          'Form help',
          'semantic.muted',
        );
        inst(cell, source);
      }
    }
  }
  root.clipsContent = false;
  for (const frameNode of root.findAllWithCriteria({ types: ['FRAME'] }))
    frameNode.clipsContent = false;
  review.push({ id: root.id, theme, width: root.width, height: root.height });
}
return result({
  pageId: page.id,
  review,
  families: Object.entries(sets).map(([name, set]) => ({
    name,
    id: set.id,
    variants: set.children.length,
  })),
});
