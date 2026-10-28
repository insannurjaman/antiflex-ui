await fonts();
const available = (await figma.listAvailableFontsAsync()).map((f) => f.fontName);
const weightNames = {
  thin: 'Thin',
  extralight: 'ExtraLight',
  light: 'Light',
  normal: 'Regular',
  medium: 'Medium',
  semibold: 'SemiBold',
  bold: 'Bold',
  extrabold: 'ExtraBold',
  black: 'Black',
};
for (const family of ['DM Sans', 'Anybody', 'Space Mono'])
  for (const f of available.filter((f) => f.family === family)) await figma.loadFontAsync(f);
const page = await pageFor('antiflex / Type library');
const { map, collections } = await tokenMap();
const existing = await figma.getLocalTextStylesAsync();
const createdStyles = [];
async function style(
  name,
  size,
  line,
  fontName = { family: 'DM Sans', style: 'Regular' },
  tracking = 0,
  leadingPercent = false,
) {
  let s = existing.find((s) => s.name === 'antiflex / ' + name);
  if (!s) {
    s = figma.createTextStyle();
    existing.push(s);
  }
  s.name = 'antiflex / ' + name;
  s.fontName = fontName;
  s.fontSize = size;
  s.lineHeight = { unit: leadingPercent ? 'PERCENT' : 'PIXELS', value: line };
  s.letterSpacing = { unit: 'PERCENT', value: tracking * 100 };
  s.setBoundVariable(
    'fontFamily',
    map[
      fontName.family === 'Anybody'
        ? 'font.display'
        : fontName.family === 'Space Mono'
          ? 'font.mono'
          : 'font.sans'
    ],
  );
  createdStyles.push({
    id: s.id,
    name: s.name,
    size: s.fontSize,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    fontName: s.fontName,
  });
  return s;
}
const scales = {},
  weights = {},
  trackings = {},
  leadings = {};
for (const [name, size] of Object.entries(TOKEN_DATA.primitives.typography.size)) {
  const s = await style(
    'Type scale / ' + name,
    size,
    TOKEN_DATA.primitives.typography['line-height'][name],
  );
  s.setBoundVariable('fontSize', map['typography.size.' + name]);
  s.setBoundVariable('lineHeight', map['typography.line-height.' + name]);
  scales[name] = s;
}
for (const [name, value] of Object.entries(TOKEN_DATA.primitives.typography.weight)) {
  const s = await style('Type weight / ' + name, 24, 32, {
    family: 'DM Sans',
    style: weightNames[name],
  });
  s.setBoundVariable('fontWeight', map['typography.weight.' + name]);
  weights[name] = s;
}
for (const [name, value] of Object.entries(TOKEN_DATA.primitives.typography.tracking))
  trackings[name] = await style('Type tracking / ' + name, 24, 32, undefined, value);
for (const [name, value] of Object.entries(TOKEN_DATA.primitives.typography.leading))
  leadings[name] = await style('Type leading / ' + name, 16, value * 100, undefined, 0, true);
const familyStyles = {};
for (const [key, family] of [
  ['Sans', 'DM Sans'],
  ['Display', 'Anybody'],
  ['Mono', 'Space Mono'],
])
  familyStyles[key] = await style('Type family / ' + key, 24, 32, { family, style: 'Regular' });
const italicStyles = {};
for (const family of ['DM Sans', 'Anybody'])
  italicStyles[family] = await style('Type italic / ' + family, 24, 32, {
    family,
    style: 'Italic',
  });
function stack(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = direction === 'HORIZONTAL' ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = direction === 'HORIZONTAL' ? 'AUTO' : 'FIXED';
  n.clipsContent = false;
  gap(n, 4, map);
  return n;
}
async function tx(parent, value, style, width) {
  const t = text(
    parent,
    value,
    style.fontSize,
    'semantic.foreground',
    map,
    false,
    style.fontName.style,
    width,
  );
  t.setBoundVariable('fontSize', null);
  t.setBoundVariable('fontFamily', null);
  await t.setTextStyleIdAsync(style.id);
  fill(t, 'semantic.foreground', map);
  t.layoutSizingHorizontal = 'FILL';
  return t;
}
const heading = existing.find((s) => s.name === 'antiflex / Heading'),
  body = existing.find((s) => s.name === 'antiflex / Body');
const reviews = [];
for (const theme of ['Light', 'Dark']) {
  let board = page.children.find((n) => n.name === 'Type reference / ' + theme);
  if (!board) {
    board = stack(page, 'Type reference / ' + theme, 1240);
    board.x = theme === 'Light' ? 100 : 1450;
    board.y = 100;
    padding(board, 6, map);
    gap(board, 6, map);
    fill(board, 'semantic.canvas', map);
    setTheme(board, collections, theme);
    await tx(board, 'A full range of expression.', heading, 1192);
    await tx(board, '13 sizes · 9 weights · 6 leading presets · 6 tracking steps', body, 1192);
    for (const [name, s] of Object.entries(scales)) {
      const row = stack(board, 'Size / ' + name, 1192, 'HORIZONTAL');
      const info = stack(row, 'Specification', 220);
      await tx(
        info,
        name +
          ' · ' +
          s.fontSize +
          'px / ' +
          TOKEN_DATA.primitives.typography['line-height'][name] +
          'px',
        body,
        220,
      );
      const t = await tx(row, 'Aa', s, 900);
      t.layoutSizingHorizontal = 'FILL';
    }
    await tx(board, 'Weights', heading, 1192);
    for (const [name, s] of Object.entries(weights))
      await tx(board, name + ' · Clear forms. Considered details.', s, 1192);
    await tx(board, 'Families and italic', heading, 1192);
    for (const [name, s] of Object.entries(familyStyles))
      await tx(board, name + ' · Clarity at every scale. 0123456789', s, 1192);
    for (const [name, s] of Object.entries(italicStyles))
      await tx(board, name + ' · Italic expression.', s, 1192);
    await tx(
      board,
      'System serif is a browser stack: Georgia / Times New Roman / serif. It is not bundled into this Figma library.',
      body,
      1192,
    );
    await tx(board, 'Tracking · em converted to native percent', heading, 1192);
    for (const [name, s] of Object.entries(trackings))
      await tx(board, name + ' · antiflex typography', s, 1192);
    await tx(board, 'Leading · ratios converted to native percent', heading, 1192);
    for (const [name, s] of Object.entries(leadings))
      await tx(
        board,
        name +
          ' · A shared scale helps teams compose interfaces with clear hierarchy and comfortable reading rhythm.',
        s,
        420,
      );
  }
  reviews.push({ id: board.id, name: board.name, width: board.width, height: board.height });
}
return result({ pageId: page.id, styles: createdStyles, reviews });
