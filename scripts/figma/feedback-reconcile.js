await fonts();
const page = await pageFor('antiflex / Feedback & navigation');
const { map } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
const changed = new Set();
for (const set of page.children.filter((n) => n.type === 'COMPONENT_SET')) {
  for (const component of set.children.filter((n) => n.type === 'COMPONENT')) {
    for (const frameNode of component.findAllWithCriteria({ types: ['FRAME'] }))
      if (frameNode.children.some((c) => c.name === 'Keyboard focus')) {
        frameNode.clipsContent = false;
        changed.add(frameNode.id);
      }
    if (set.name === 'Pagination')
      for (const button of component.children.filter((n) => n.type === 'FRAME')) {
        const current = { Start: '1', Middle: '2', End: '3' }[component.variantProperties.State];
        if (button.name === current) {
          fill(button, 'semantic.surface', map);
          border(button, 'semantic.border-strong', map);
          changed.add(button.id);
          for (const t of button.findAllWithCriteria({ types: ['TEXT'] })) {
            fill(t, 'semantic.foreground', map);
            changed.add(t.id);
          }
        }
      }
    if (set.name === 'Empty' && component.variantProperties.Reason === 'FirstUse') {
      const action = component.children.find((n) => n.name === 'Recovery action');
      fill(action, 'semantic.action', map);
      action.strokes = [];
      changed.add(action.id);
      for (const t of action.findAllWithCriteria({ types: ['TEXT'] })) {
        fill(t, 'semantic.action-foreground', map);
        changed.add(t.id);
      }
    }
    if (set.name === 'Avatar')
      for (const t of component.findAllWithCriteria({ types: ['TEXT'] })) {
        const role =
          component.variantProperties.Size === 'sm'
            ? 'Avatar small'
            : component.variantProperties.Size === 'md'
              ? 'Avatar medium'
              : 'Form label';
        await t.setTextStyleIdAsync(styles.find((s) => s.name === 'antiflex / ' + role).id);
        changed.add(t.id);
      }
  }
}
for (const board of page.children.filter(
  (n) => n.type === 'FRAME' && n.name.startsWith('Feedback / Review '),
)) {
  for (const sample of board.findAllWithCriteria({ types: ['INSTANCE'] })) {
    const source = await sample.getMainComponentAsync();
    if (!source) continue;
    const values = {};
    for (const t of source.findAllWithCriteria({ types: ['TEXT'] })) {
      const property = t.componentPropertyReferences.characters;
      if (property) values[property] = t.characters;
    }
    if (Object.keys(values).length) sample.setProperties(values);
    changed.add(sample.id);
    for (const child of sample.findAll(() => true)) changed.add(child.id);
  }
}
return result({
  mutatedNodeIds: [...changed],
  pageId: page.id,
  fixes: [
    'variant-specific text overrides in review instances',
    'focus outline clipping',
    'neutral current pagination',
    'primary empty-state action',
    'avatar medium typography',
  ],
});
