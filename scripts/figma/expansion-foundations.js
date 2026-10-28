await fonts();
const page = await pageFor('antiflex / Components');
const { map, collections } = await tokenMap();
const vars = await figma.variables.getLocalVariablesAsync();
const componentCollection = collections.find((c) => c.name === 'antiflex / Components');
const newVariables = [];
for (const [name, value] of Object.entries(EXPANSION_TOKENS)) {
  const alias = typeof value === 'string' ? map[value] : null;
  let v = map['component.' + name];
  if (!v) {
    v = figma.variables.createVariable(
      'component/' + name,
      componentCollection,
      alias ? alias.resolvedType : 'FLOAT',
    );
    variableIds.push(v.id);
  }
  v.scopes = /fg$/.test(name)
    ? ['TEXT_FILL']
    : /border$/.test(name)
      ? ['STROKE_COLOR']
      : /bg$/.test(name)
        ? ['FRAME_FILL', 'SHAPE_FILL']
        : /width|height|size$/.test(name)
          ? ['WIDTH_HEIGHT']
          : ['GAP'];
  v.setValueForMode(
    componentCollection.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
  v.setVariableCodeSyntax('WEB', 'var(--af-component-' + name + ')');
  map['component.' + name] = v;
  newVariables.push({
    id: v.id,
    name: v.name,
    scopes: v.scopes,
    syntax: v.codeSyntax,
    values: v.valuesByMode,
  });
}

return result({
  newVariables,
  totalVariables: (await figma.variables.getLocalVariablesAsync()).length,
});
