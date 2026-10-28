const page = figma.root.children.find((p) => p.name === 'antiflex / Feedback & navigation');
if (!page) throw Error('Missing feedback page');
await figma.setCurrentPageAsync(page);
const variables = await figma.variables.getLocalVariablesAsync();
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const map = new Map(variables.map((v) => [v.name.replaceAll('/', '.'), v]));
const issues = [];
const expected = {
  Alert: 4,
  Avatar: 9,
  Breadcrumb: 2,
  Empty: 4,
  Kbd: 2,
  Pagination: 3,
  Progress: 9,
  Spinner: 3,
  Tabs: 8,
  Accordion: 8,
  Collapsible: 4,
  Toggle: 30,
  'Toggle Group': 8,
  Typography: 2,
  'Aspect Ratio': 3,
};
const sets = page.children.filter((n) => n.type === 'COMPONENT_SET');
for (const [name, count] of Object.entries(expected)) {
  const set = sets.find((n) => n.name === name);
  if (!set || set.children.length !== count) issues.push(name + ' variant count');
}
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  /^(avatar-size|spinner-size|progress-height|navigation-height|selection-)/.test(name),
)) {
  const v = map.get('component.' + name);
  if (!v) {
    issues.push('Missing token ' + name);
    continue;
  }
  const collection = collections.find((c) => c.id === v.variableCollectionId);
  const actual = v.valuesByMode[collection.defaultModeId];
  if (v.scopes.includes('ALL_SCOPES') || !v.scopes.length) issues.push('Scope ' + name);
  if (v.codeSyntax.WEB !== 'var(--af-component-' + name + ')') issues.push('Syntax ' + name);
  if (
    typeof value === 'number'
      ? actual !== value
      : actual.type !== 'VARIABLE_ALIAS' || actual.id !== map.get(value)?.id
  )
    issues.push('Value ' + name);
}
for (const set of sets) {
  if (!set.description) issues.push('Description ' + set.name);
  for (const component of set.children) {
    if (component.layoutMode === 'NONE') issues.push('Auto layout ' + component.id);
    for (const t of component.findAllWithCriteria({ types: ['TEXT'] })) {
      if (!t.textStyleId) issues.push('Missing shared text style ' + t.id);
      if (!t.fills.some((p) => p.type === 'SOLID' && p.boundVariables?.color))
        issues.push('Unbound text color ' + t.id);
    }
    for (const ring of component.findAll((n) => n.name === 'Keyboard focus')) {
      let parent = ring.parent;
      while (parent && parent.type !== 'PAGE' && parent.type !== 'COMPONENT_SET') {
        if ('clipsContent' in parent && parent.clipsContent)
          issues.push('Clipped focus ' + parent.id);
        parent = parent.parent;
      }
    }
  }
}
const reviews = page.children.filter(
  (n) => n.type === 'FRAME' && n.name.startsWith('Feedback / Review '),
);
if (reviews.length !== 6) issues.push('Six review boards required');
let specimens = 0;
for (const board of reviews) {
  if (board.children.filter((n) => n.type === 'FRAME').length !== 5)
    issues.push('Review family coverage ' + board.id);
  if (!Object.keys(board.explicitVariableModes).length) issues.push('Review theme ' + board.id);
  for (const sample of board.findAllWithCriteria({ types: ['INSTANCE'] })) {
    specimens++;
    const source = await sample.getMainComponentAsync();
    if (!source) {
      issues.push('Detached specimen ' + sample.id);
      continue;
    }
    for (const t of source.findAllWithCriteria({ types: ['TEXT'] })) {
      const property = t.componentPropertyReferences.characters;
      if (property && sample.componentProperties[property]?.value !== t.characters)
        issues.push('Specimen text override ' + sample.id + ' ' + property);
    }
  }
}
return {
  pageId: page.id,
  variableCount: variables.length,
  newComponentTokens: 14,
  componentFamilies: sets.length,
  variants: sets.reduce((sum, n) => sum + n.children.length, 0),
  specimens,
  reviews: reviews.map((n) => ({ id: n.id, name: n.name, width: n.width, height: n.height })),
  issues: [...new Set(issues)],
};
