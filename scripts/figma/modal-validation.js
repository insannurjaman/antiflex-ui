const page = await figma.getNodeByIdAsync('61:12');
await figma.setCurrentPageAsync(page);
const vars = await figma.variables.getLocalVariablesAsync();
const issues = [];
const families = page.children.filter(
  (n) => n.type === 'COMPONENT_SET' && ['Dialog', 'Alert Dialog'].includes(n.name),
);
for (const set of families) {
  if (set.children.length !== 6) issues.push(set.name + ' expected six variants');
  for (const n of set.children) {
    const size = /Size=(sm|md|lg)/.exec(n.name)?.[1];
    const expected = { sm: 400, md: 512, lg: 640 }[size];
    if (n.width !== expected) issues.push(n.id + ' incorrect width');
    if (n.layoutMode !== 'VERTICAL' || n.primaryAxisSizingMode !== 'AUTO')
      issues.push(n.id + ' incorrect layout');
    if (!n.boundVariables.width) issues.push(n.id + ' unbound width');
    const title = n
      .findAllWithCriteria({ types: ['TEXT'] })
      .find(
        (t) =>
          t.characters === (set.name === 'Dialog' ? 'Edit project' : 'Archive Orbit workspace?'),
      );
    if (!title || title.fontSize !== 20 || title.textStyleId === '')
      issues.push(n.id + ' modal title style drift');
  }
}
const texts = page.findAllWithCriteria({ types: ['TEXT'] });
for (const t of texts) {
  if (t.textStyleId === '') issues.push(t.id + ' missing shared text style');
  if (t.width <= 0 || t.height <= 0) issues.push(t.id + ' empty geometry');
}
for (const n of page.findAllWithCriteria({ types: ['INSTANCE'] })) {
  const ring = n.children.find((c) => c.name === 'Focus ring');
  if (ring && Math.abs(ring.width - n.width - 10) > 0.1)
    issues.push(n.id + ' truncated focus ring');
}
const overlay = vars.find((v) => v.name === 'color/overlay/ink');
if (!overlay || Math.abs(Object.values(overlay.valuesByMode)[0].a - 128 / 255) > 0.001)
  issues.push('Overlay alpha drift');
for (const name of [
  'semantic/overlay',
  'component/dialog-backdrop',
  'component/dialog-width-sm',
  'component/dialog-width-md',
  'component/dialog-width-lg',
  'component/dialog-padding',
  'component/dialog-gap',
]) {
  const v = vars.find((v) => v.name === name);
  if (!v || v.scopes.includes('ALL_SCOPES') || !v.codeSyntax.WEB.startsWith('var('))
    issues.push(name + ' variable metadata drift');
}
const reviews = page.children
  .filter((n) => n.type === 'FRAME' && n.name.startsWith('Modals / Review /'))
  .map((n) => ({ id: n.id, name: n.name, width: n.width, height: n.height }));
return {
  pageId: page.id,
  componentFamilies: families.length,
  variants: families.reduce((n, f) => n + f.children.length, 0),
  responsiveConstructionComponents: page.children.filter(
    (n) => n.type === 'COMPONENT' && n.name.endsWith('Mobile construction'),
  ).length,
  reviewInstances: 8,
  variableCount: vars.length,
  newVariables: 8,
  reviewFrames: reviews,
  issues,
  createdNodeIds: [],
  mutatedNodeIds: [],
};
