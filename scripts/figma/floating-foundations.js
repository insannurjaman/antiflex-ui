const collections = await figma.variables.getLocalVariableCollectionsAsync();
const components = collections.find((c) => c.name === 'antiflex / Components');
const variables = await figma.variables.getLocalVariablesAsync();
const map = new Map(variables.map((v) => [v.name.replaceAll('/', '.'), v]));
if (!components) throw Error('Existing antiflex foundations required.');
const changed = [];
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  /^(popover|tooltip)-/.test(name),
)) {
  const alias = typeof value === 'string' ? map.get(value) : undefined;
  if (typeof value === 'string' && !alias) throw Error('Missing alias ' + value);
  let v = map.get('component.' + name);
  if (!v)
    v = figma.variables.createVariable(
      'component/' + name,
      components,
      alias ? alias.resolvedType : 'FLOAT',
    );
  v.scopes = name.endsWith('-fg')
    ? ['TEXT_FILL']
    : name.endsWith('-bg')
      ? ['FRAME_FILL', 'SHAPE_FILL']
      : name.includes('width')
        ? ['WIDTH_HEIGHT']
        : ['GAP'];
  v.setVariableCodeSyntax('WEB', 'var(--af-component-' + name + ')');
  v.setValueForMode(
    components.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
  changed.push({
    id: v.id,
    name: v.name,
    values: v.valuesByMode,
    scopes: v.scopes,
    syntax: v.codeSyntax,
  });
}
let page = figma.root.children.find((p) => p.name === 'antiflex / Floating');
const created = [];
if (!page) {
  page = figma.createPage();
  page.name = 'antiflex / Floating';
  created.push(page.id);
}
await figma.setCurrentPageAsync(page);
return {
  pageId: page.id,
  createdNodeIds: created,
  variables: changed,
  variableCount: (await figma.variables.getLocalVariablesAsync()).length,
};
