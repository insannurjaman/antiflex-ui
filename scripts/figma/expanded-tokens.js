const collections = await figma.variables.getLocalVariableCollectionsAsync();
const primitive = collections.find((c) => c.name === 'antiflex / Primitives');
if (!primitive) throw Error('Existing antiflex foundations required.');
const existing = await figma.variables.getLocalVariablesAsync();
const before = JSON.stringify(
  existing.map((v) => ({ id: v.id, name: v.name, values: v.valuesByMode })),
);
const changed = [];
for (const [key, value] of flatten({
  palette: TOKEN_DATA.primitives.palette,
  typography: TOKEN_DATA.primitives.typography,
  font: { serif: TOKEN_DATA.primitives.font.serif },
})) {
  let variable = existing.find(
    (v) => v.variableCollectionId === primitive.id && v.name === key.replaceAll('.', '/'),
  );
  const type = key.startsWith('palette.')
    ? 'COLOR'
    : typeof value === 'number'
      ? 'FLOAT'
      : 'STRING';
  if (!variable)
    variable = figma.variables.createVariable(key.replaceAll('.', '/'), primitive, type);
  variable.scopes = key.startsWith('palette.')
    ? ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR']
    : key.startsWith('typography.size.')
      ? ['FONT_SIZE']
      : key.startsWith('typography.line-height.')
        ? ['LINE_HEIGHT']
        : key.startsWith('typography.weight.')
          ? ['FONT_WEIGHT']
          : [];
  variable.setVariableCodeSyntax('WEB', cssName(key));
  variable.description = key.startsWith('palette.')
    ? 'Tailwind CSS ' +
      TOKEN_DATA.reference.version +
      ' reference; canonical OKLCH in code, clipped sRGB preview in Figma.'
    : key.startsWith('typography.tracking.')
      ? 'Canonical unit: em. Generated Figma text styles convert em ×100 to percent; this raw variable is intentionally hidden from the letter-spacing picker.'
      : key.startsWith('typography.leading.')
        ? 'Unitless ratio. Generated Figma text styles convert ratio ×100 to percent; this raw variable is intentionally hidden from pixel line-height pickers.'
        : key === 'font.serif'
          ? 'Browser system serif stack; Georgia / Times New Roman / serif. Not a bundled Figma font.'
          : 'Reference typography; pixel dimensions or unitless font weight, as named.';
  variable.setValueForMode(primitive.defaultModeId, type === 'COLOR' ? REFERENCE_SRGB[key] : value);
  changed.push({
    id: variable.id,
    name: variable.name,
    type,
    values: variable.valuesByMode,
    scopes: variable.scopes,
    syntax: variable.codeSyntax,
  });
}
const after = await figma.variables.getLocalVariablesAsync();
return {
  variableIds: changed.map((v) => v.id),
  updatedVariables: changed.length,
  createdNodeIds: [],
  mutatedNodeIds: [],
  existingVariableValuesUnchanged:
    before ===
    JSON.stringify(
      after
        .filter((v) => existing.some((old) => old.id === v.id))
        .map((v) => ({ id: v.id, name: v.name, values: v.valuesByMode })),
    ),
  variableCount: after.length,
};
