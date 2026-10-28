const cols = await figma.variables.getLocalVariableCollectionsAsync();
const primitives = cols.find((c) => c.name === 'antiflex / Primitives');
const semantic = cols.find((c) => c.name === 'antiflex / Semantic');
const components = cols.find((c) => c.name === 'antiflex / Components');
if (!primitives || !semantic || !components)
  throw Error('Existing antiflex foundations are required.');
const vars = await figma.variables.getLocalVariablesAsync();
const map = new Map(vars.map((v) => [v.name.replaceAll('/', '.'), v]));
const changed = [];
function variable(key, collection, type, scopes) {
  let v = map.get(key);
  if (!v) {
    v = figma.variables.createVariable(key.replaceAll('.', '/'), collection, type);
    map.set(key, v);
  }
  v.scopes = scopes;
  v.setVariableCodeSyntax('WEB', 'var(--af-' + key.replaceAll('.', '-') + ')');
  changed.push({ id: v.id, name: v.name });
  return v;
}
const overlay = variable('color.overlay.ink', primitives, 'COLOR', []);
overlay.setValueForMode(primitives.defaultModeId, { r: 0, g: 0, b: 0, a: 128 / 255 });
const overlayRole = variable('semantic.overlay', semantic, 'COLOR', ['FRAME_FILL', 'SHAPE_FILL']);
for (const mode of semantic.modes)
  overlayRole.setValueForMode(mode.modeId, { type: 'VARIABLE_ALIAS', id: overlay.id });
for (const [name, value] of Object.entries(TOKEN_DATA.components).filter(([name]) =>
  name.startsWith('dialog-'),
)) {
  const alias = typeof value === 'string' ? map.get(value) : undefined;
  if (typeof value === 'string' && !alias) throw Error('Missing alias ' + value);
  const scopes =
    name === 'dialog-backdrop'
      ? ['FRAME_FILL', 'SHAPE_FILL']
      : name.includes('width')
        ? ['WIDTH_HEIGHT']
        : ['GAP'];
  const v = variable('component.' + name, components, alias ? alias.resolvedType : 'FLOAT', scopes);
  v.setValueForMode(
    components.defaultModeId,
    alias ? { type: 'VARIABLE_ALIAS', id: alias.id } : value,
  );
}
const fonts = (await figma.listAvailableFontsAsync()).map((f) => f.fontName);
const styles = await figma.getLocalTextStylesAsync();
const styleIds = [];
for (const [name, size, weight, line] of [
  ['Modal title', 20, 'SemiBold', 140],
  ['Modal description', 14, 'Regular', 160],
  ['Button label', 14, 'Regular', 100],
]) {
  const font = fonts.find((f) => f.family === 'DM Sans' && f.style === weight);
  if (!font) throw Error('Required DM Sans weight unavailable.');
  await figma.loadFontAsync(font);
  let style = styles.find((s) => s.name === 'antiflex / ' + name);
  if (!style) style = figma.createTextStyle();
  style.name = 'antiflex / ' + name;
  style.fontName = font;
  style.fontSize = size;
  style.lineHeight = { unit: 'PERCENT', value: line };
  styleIds.push({ id: style.id, name: style.name });
}
let page = figma.root.children.find((p) => p.name === 'antiflex / Modals');
const created = [];
if (!page) {
  page = figma.createPage();
  page.name = 'antiflex / Modals';
  created.push(page.id);
}
await figma.setCurrentPageAsync(page);
return {
  page: { id: page.id, name: page.name },
  createdNodeIds: created,
  mutatedNodeIds: [],
  variables: changed,
  styles: styleIds,
};
