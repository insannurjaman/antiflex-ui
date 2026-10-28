const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collection = collections.find((c) => c.name === 'antiflex / Components');
if (!collection) throw Error('Missing existing antiflex component collection');
const vars = await figma.variables.getLocalVariablesAsync();
const map = new Map(vars.map((v) => [v.name.replaceAll('/', '.'), v]));
const changed = [];
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  /^(field-height|choice-|switch-)/.test(name),
)) {
  const alias = typeof value === 'string' ? map.get(value) : undefined;
  if (typeof value === 'string' && !alias) throw Error('Missing source token ' + value);
  let variable = vars.find(
    (v) => v.variableCollectionId === collection.id && v.name === 'component/' + name,
  );
  if (!variable)
    variable = figma.variables.createVariable(
      'component/' + name,
      collection,
      alias ? alias.resolvedType : 'FLOAT',
    );
  variable.scopes = alias
    ? ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR']
    : ['WIDTH_HEIGHT'];
  variable.setVariableCodeSyntax('WEB', 'var(--af-component-' + name + ')');
  variable.setValueForMode(
    collection.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
  changed.push({ id: variable.id, name: variable.name });
}
let page = figma.root.children.find((p) => p.name === 'antiflex / Forms');
const created = [];
if (!page) {
  page = figma.createPage();
  page.name = 'antiflex / Forms';
  created.push(page.id);
}
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'DM Sans', style: 'Regular' });
await figma.loadFontAsync({ family: 'DM Sans', style: 'Medium' });
const styles = await figma.getLocalTextStylesAsync();
const styleIds = {};
for (const [name, size, weight] of [
  ['Form label', 14, 'Medium'],
  ['Form help', 12, 'Regular'],
]) {
  let style = styles.find((s) => s.name === 'antiflex / ' + name);
  if (!style) style = figma.createTextStyle();
  style.name = 'antiflex / ' + name;
  style.fontName = { family: 'DM Sans', style: weight };
  style.fontSize = size;
  style.lineHeight = { unit: 'PERCENT', value: 150 };
  styleIds[name] = style.id;
}
return {
  page: { id: page.id, name: page.name },
  createdNodeIds: created,
  variables: changed,
  styles: styleIds,
};
