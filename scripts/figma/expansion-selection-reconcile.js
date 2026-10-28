await fonts();
const page = await figma.getNodeByIdAsync('103:2');
await figma.setCurrentPageAsync(page);
const { map } = await tokenMap();
const commands = await figma.getNodeByIdAsync('103:161');
for (const n of commands.children.filter((n) => n.type === 'COMPONENT')) {
  padding(n, 4, map);
  for (const child of n.children) {
    child.resize(528, child.height);
    child.layoutSizingHorizontal = 'FILL';
  }
  mutatedNodeIds.push(n.id, ...n.children.map((c) => c.id));
}
for (const family of ['Select', 'Combobox']) {
  const source = await figma.getNodeByIdAsync(family === 'Select' ? '103:85' : '103:123');
  const key = Object.keys(source.componentPropertyDefinitions).find((k) => k.startsWith('Value#'));
  for (const n of page.findAll((n) => n.type === 'INSTANCE' && n.name === family)) {
    n.setProperties({ [key]: family === 'Select' ? 'Alex Morgan' : 'react' });
    mutatedNodeIds.push(n.id);
    for (const t of n.children[0].findAll((n) => n.type === 'TEXT')) {
      fill(t, 'semantic.foreground', map);
      mutatedNodeIds.push(t.id);
    }
  }
}
return result({ pageId: page.id, commandPadding: 16 });
