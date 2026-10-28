const page = figma.root.children.find((p) => p.name === 'antiflex / Forms');
if (!page) throw Error('Missing Forms page');
await figma.setCurrentPageAsync(page);
const variables = await figma.variables.getLocalVariablesAsync();
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const map = new Map(variables.map((v) => [v.name.replaceAll('/', '.'), v]));
const issues = [];
const expected = {
  Input: 15,
  Label: 2,
  Field: 4,
  Textarea: 15,
  'Native Select': 12,
  Checkbox: 21,
  'Radio Group': 18,
  Switch: 18,
  'Button Group': 2,
  'Input Group': 12,
};
const sets = page.children.filter((n) => n.type === 'COMPONENT_SET');
for (const [name, count] of Object.entries(expected)) {
  const set = sets.find((n) => n.name === name);
  if (!set || set.children.length !== count) issues.push(name + ' variant count');
}
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  /^(field-height|choice-|switch-)/.test(name),
)) {
  const variable = map.get('component.' + name);
  if (!variable) {
    issues.push('Missing ' + name);
    continue;
  }
  const collection = collections.find((c) => c.id === variable.variableCollectionId);
  const actual = variable.valuesByMode[collection.defaultModeId];
  if (variable.scopes.includes('ALL_SCOPES') || !variable.scopes.length)
    issues.push('Scope ' + name);
  if (variable.codeSyntax.WEB !== 'var(--af-component-' + name + ')') issues.push('Syntax ' + name);
  if (
    typeof value === 'number'
      ? actual !== value
      : actual.type !== 'VARIABLE_ALIAS' || actual.id !== map.get(value)?.id
  )
    issues.push('Value ' + name);
}
for (const set of sets) {
  if (!set.description) issues.push('Description ' + set.name);
  for (const c of set.children) {
    if (c.layoutMode === 'NONE') issues.push('Auto layout ' + c.id);
    if (
      ['Input', 'Textarea', 'Native Select', 'Checkbox', 'Switch', 'Input Group'].includes(
        set.name,
      ) &&
      !Object.keys(c.boundVariables || {}).length
    )
      issues.push('Unbound ' + c.id);
  }
}
const reviews = page.children.filter((n) => n.name.startsWith('Forms / Review / '));
for (const r of reviews) {
  if (r.children.filter((n) => n.type === 'FRAME').length !== 10)
    issues.push('Review family coverage ' + r.id);
}
return {
  pageId: page.id,
  variableCount: variables.length,
  newComponentTokens: 14,
  componentFamilies: sets.length,
  variants: sets.reduce((sum, n) => sum + n.children.length, 0),
  reviews: reviews.map((n) => ({ id: n.id, name: n.name, width: n.width, height: n.height })),
  issues,
};
