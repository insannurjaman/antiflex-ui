const collections = await figma.variables.getLocalVariableCollectionsAsync();
const primitive = collections.find((c) => c.name === 'antiflex / Primitives');
const semantic = collections.find((c) => c.name === 'antiflex / Semantic');
const component = collections.find((c) => c.name === 'antiflex / Components');
const vars = await figma.variables.getLocalVariablesAsync();
const fonts = await figma.listAvailableFontsAsync();
for (const family of ['IBM Plex Sans', 'IBM Plex Mono', 'DM Sans', 'Space Mono', 'Anybody']) {
  for (const style of ['Regular', 'Medium', 'SemiBold', 'Bold']) {
    const f = fonts.find((f) => f.fontName.family === family && f.fontName.style === style);
    if (f) await figma.loadFontAsync(f.fontName);
  }
}
const flatten = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, p ? p + '.' + k : k) : [[p ? p + '.' + k : k, v]],
  );
const map = new Map();
const changed = [];
const ensure = (name, collection, type) => {
  let v = vars.find((v) => v.name === name && v.variableCollectionId === collection.id);
  if (!v && name.startsWith('color/mint/'))
    v = vars.find(
      (v) =>
        v.name === name.replace('/mint/', '/cyan/') && v.variableCollectionId === collection.id,
    );
  if (!v) {
    v = figma.variables.createVariable(name, collection, type);
    vars.push(v);
  } else v.name = name;
  v.setVariableCodeSyntax(
    'WEB',
    'var(--af-' +
      name
        .replaceAll('/', '-')
        .replace(/^component-/, 'component-')
        .replace(/^semantic-/, 'semantic-') +
      ')',
  );
  map.set(name.replaceAll('/', '.'), v);
  changed.push(v.id);
  return v;
};
for (const [name, value] of flatten(TOKEN_DATA.primitives)) {
  if (name === 'elevation.low') continue;
  const type = typeof value === 'number' ? 'FLOAT' : name.startsWith('color.') ? 'COLOR' : 'STRING';
  const v = ensure(name.replaceAll('.', '/'), primitive, type);
  v.scopes = [];
  v.setValueForMode(primitive.defaultModeId, type === 'COLOR' ? figma.util.rgba(value) : value);
}
for (const [name] of Object.entries(TOKEN_DATA.semantic.light)) {
  const v = ensure('semantic/' + name, semantic, 'COLOR');
  v.scopes = /border/.test(name)
    ? ['STROKE_COLOR']
    : /foreground|muted|accent$|focus|display-ink/.test(name)
      ? ['TEXT_FILL', 'FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR']
      : ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL'];
  for (const mode of semantic.modes) {
    const key = mode.name.toLowerCase();
    v.setValueForMode(mode.modeId, {
      type: 'VARIABLE_ALIAS',
      id: map.get(TOKEN_DATA.semantic[key][name]).id,
    });
  }
}
for (const [name, value] of Object.entries(TOKEN_DATA.components)) {
  const ref = typeof value === 'string' ? map.get(value) : null;
  const v = ensure('component/' + name, component, ref ? ref.resolvedType : 'FLOAT');
  v.scopes =
    ref && ref.resolvedType === 'COLOR'
      ? ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR']
      : name.includes('radius')
        ? ['CORNER_RADIUS']
        : ['WIDTH_HEIGHT'];
  v.setValueForMode(component.defaultModeId, ref ? { type: 'VARIABLE_ALIAS', id: ref.id } : value);
}
const styles = await figma.getLocalTextStylesAsync();
for (const s of styles) {
  await figma.loadFontAsync(s.fontName);
  s.fontName = {
    family: s.name.endsWith('/ Display')
      ? 'Anybody'
      : s.name.endsWith('/ Code') || s.name.endsWith('/ Label')
        ? 'Space Mono'
        : 'DM Sans',
    style: s.name.endsWith('/ Display')
      ? 'SemiBold'
      : s.name.endsWith('/ Label')
        ? 'Regular'
        : s.fontName.style === 'Medium'
          ? 'Medium'
          : 'Regular',
  };
}
return {
  variableIds: changed,
  styleIds: styles.map((s) => s.id),
  count: changed.length,
  collections: collections.map((c) => ({ id: c.id, name: c.name, modes: c.modes })),
  aliasCount: vars.filter((v) => v.variableCollectionId !== primitive.id).length,
};
