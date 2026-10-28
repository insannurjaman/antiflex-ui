// Scoped reconciliation: update existing colors without rebuilding components or text styles.
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const primitive = collections.find((c) => c.name === 'antiflex / Primitives');
const semantic = collections.find((c) => c.name === 'antiflex / Semantic');
if (!primitive || !semantic) throw Error('Existing antiflex foundations required.');
const variables = await figma.variables.getLocalVariablesAsync();
const byName = new Map(variables.map((v) => [v.variableCollectionId + ':' + v.name, v]));
const find = (collection, name) => {
  const v = byName.get(collection.id + ':' + name);
  if (!v) throw Error('Missing existing variable: ' + name);
  return v;
};
// Resolve every reference before mutation, so missing variables cannot cause partial updates.
const primitives = Object.entries(TOKEN_DATA.primitives.color.neutral).map(([shade, value]) => ({
  variable: find(primitive, 'color/neutral/' + shade),
  value,
}));
const aliases = Object.keys(TOKEN_DATA.semantic.light).map((role) => ({
  variable: find(semantic, 'semantic/' + role),
  modes: semantic.modes.map((mode) => ({
    id: mode.modeId,
    target: find(
      primitive,
      TOKEN_DATA.semantic[mode.name.toLowerCase()][role].replaceAll('.', '/'),
    ),
  })),
}));
// Color-variable updates propagate through existing text bindings; preload actual available faces.
for (const { fontName } of await figma.listAvailableFontsAsync())
  if (['DM Sans', 'Anybody', 'Space Mono'].includes(fontName.family))
    await figma.loadFontAsync(fontName);
for (const { variable, value } of primitives) {
  variable.scopes = [];
  variable.setVariableCodeSyntax('WEB', 'var(--af-' + variable.name.replaceAll('/', '-') + ')');
  variable.setValueForMode(primitive.defaultModeId, figma.util.rgba(value));
}
for (const { variable, modes } of aliases) {
  variable.setVariableCodeSyntax('WEB', 'var(--af-' + variable.name.replaceAll('/', '-') + ')');
  for (const { id, target } of modes)
    variable.setValueForMode(id, { type: 'VARIABLE_ALIAS', id: target.id });
}
return {
  createdNodeIds: [],
  mutatedNodeIds: [],
  variableIds: [...primitives.map((p) => p.variable.id), ...aliases.map((a) => a.variable.id)],
  updatedPrimitives: primitives.length,
  updatedSemanticRoles: aliases.length,
  variableCount: variables.length,
  colors: primitives.map(({ variable }) => ({
    id: variable.id,
    name: variable.name,
    values: variable.valuesByMode,
    scopes: variable.scopes,
    syntax: variable.codeSyntax,
  })),
  aliases: aliases.map(({ variable }) => ({
    id: variable.id,
    name: variable.name,
    values: variable.valuesByMode,
    scopes: variable.scopes,
    syntax: variable.codeSyntax,
  })),
};
