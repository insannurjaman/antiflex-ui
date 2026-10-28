const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collection = collections.find((c) => c.name === 'antiflex / Components');
if (!collection) throw Error('The existing antiflex foundation is required.');
const variables = await figma.variables.getLocalVariablesAsync();
const map = new Map(variables.map((v) => [v.name.replaceAll('/', '.'), v]));
const changed = [];
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  /^(avatar-size|spinner-size|progress-height|navigation-height|selection-)/.test(name),
)) {
  const alias = typeof value === 'string' ? map.get(value) : undefined;
  if (typeof value === 'string' && !alias) throw Error('Missing source alias ' + value);
  let variable = variables.find(
    (v) => v.variableCollectionId === collection.id && v.name === 'component/' + name,
  );
  if (!variable)
    variable = figma.variables.createVariable(
      'component/' + name,
      collection,
      alias ? alias.resolvedType : 'FLOAT',
    );
  variable.scopes = alias
    ? name.endsWith('-fg')
      ? ['TEXT_FILL', 'STROKE_COLOR']
      : ['FRAME_FILL', 'SHAPE_FILL']
    : ['WIDTH_HEIGHT'];
  variable.setVariableCodeSyntax('WEB', 'var(--af-component-' + name + ')');
  variable.setValueForMode(
    collection.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
  changed.push({ id: variable.id, name: variable.name });
}
const available = (await figma.listAvailableFontsAsync()).map((f) => f.fontName);
for (const font of [
  { family: 'DM Sans', style: 'Regular' },
  { family: 'DM Sans', style: 'Medium' },
  { family: 'DM Sans', style: 'SemiBold' },
]) {
  if (!available.some((f) => f.family === font.family && f.style === font.style))
    throw Error('Missing product font');
  await figma.loadFontAsync(font);
}
const styles = await figma.getLocalTextStylesAsync();
const changedStyles = [];
for (const [name, size, style] of [
  ['Feedback title', 14, 'SemiBold'],
  ['Interface title', 16, 'Medium'],
  ['Avatar small', 10, 'Medium'],
  ['Avatar medium', 12, 'Medium'],
  ['Body large', 16, 'Regular'],
]) {
  let s = styles.find((s) => s.name === 'antiflex / ' + name);
  if (!s) s = figma.createTextStyle();
  s.name = 'antiflex / ' + name;
  s.fontName = { family: 'DM Sans', style };
  s.fontSize = size;
  s.lineHeight = { unit: 'PERCENT', value: 150 };
  changedStyles.push({ id: s.id, name: s.name });
}
let page = figma.root.children.find((p) => p.name === 'antiflex / Feedback & navigation');
const created = [];
if (!page) {
  page = figma.createPage();
  page.name = 'antiflex / Feedback & navigation';
  created.push(page.id);
}
await figma.setCurrentPageAsync(page);
return {
  page: { id: page.id, name: page.name },
  createdNodeIds: created,
  mutatedNodeIds: [],
  variables: changed,
  styles: changedStyles,
};
