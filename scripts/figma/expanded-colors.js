await fonts();
const page = await pageFor('antiflex / Color library');
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
async function label(parent, value, role, width) {
  const style = styles.find((s) => s.name === 'antiflex / ' + role);
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
  await t.setTextStyleIdAsync(style.id);
  fill(t, 'semantic.foreground', map);
  t.layoutSizingHorizontal = 'FILL';
  return t;
}
function stack(parent, name, width, direction = 'VERTICAL') {
  const n = frame(parent, name, width, 100, direction);
  n.primaryAxisSizingMode = direction === 'HORIZONTAL' ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = direction === 'HORIZONTAL' ? 'AUTO' : 'FIXED';
  n.clipsContent = false;
  gap(n, 2, map);
  return n;
}
const reviews = [];
for (const theme of ['Light', 'Dark']) {
  let board = page.children.find((n) => n.name === 'Color reference / ' + theme);
  if (!board) {
    board = stack(page, 'Color reference / ' + theme, 1240);
    board.x = theme === 'Light' ? 100 : 1450;
    board.y = 100;
    padding(board, 6, map);
    gap(board, 6, map);
    fill(board, 'semantic.canvas', map);
    setTheme(board, collections, theme);
    await label(board, 'Color, at every step.', 'Heading', 1192);
    await label(
      board,
      '26 palettes · 11 steps · Tailwind CSS ' + TOKEN_DATA.reference.version + ' reference',
      'Body',
      1192,
    );
    await label(
      board,
      'Canonical OKLCH in CSS. These Figma swatches use clipped sRGB previews. antiflex semantic light/dark roles remain unchanged.',
      'Body',
      1192,
    );
    for (const [family, shades] of Object.entries(TOKEN_DATA.primitives.palette)) {
      const section = stack(board, 'Palette / ' + family, 1192);
      gap(section, 2, map);
      await label(section, family, 'Interface title', 1192);
      const row = stack(section, 'Shades', 1192, 'HORIZONTAL');
      gap(row, 2, map);
      const entries = typeof shades === 'string' ? [['base', shades]] : Object.entries(shades);
      for (const [shade] of entries) {
        const item = stack(row, family + ' / ' + shade, Math.floor((1192 - 80) / 11));
        const swatch = remember(figma.createRectangle());
        item.appendChild(swatch);
        swatch.name = 'Swatch';
        swatch.resize(100, 48);
        swatch.layoutSizingHorizontal = 'FILL';
        bind(swatch, 'cornerRadius', 'radius.sm', map);
        fill(swatch, 'palette.' + family + (shade === 'base' ? '' : '.' + shade), map);
        border(swatch, 'semantic.border', map);
        await label(item, shade === 'base' ? family : shade, 'Code', 100);
      }
    }
  }
  reviews.push({
    id: board.id,
    name: board.name,
    width: board.width,
    height: board.height,
    swatches: board.findAllWithCriteria({ types: ['RECTANGLE'] }).length,
  });
}
return result({ pageId: page.id, reviews, swatchesPerTheme: 289 });
