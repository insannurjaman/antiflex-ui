async function buildFoundations() {
  await fonts();
  const page = await pageFor('Chamfer / Foundations');
  const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const existingVariables = await figma.variables.getLocalVariablesAsync();
  function collection(name, modes) {
    let c = existingCollections.find((c) => c.name === name);
    if (!c) {
      c = figma.variables.createVariableCollection(name);
      c.renameMode(c.modes[0].modeId, modes[0]);
      for (const name of modes.slice(1)) c.addMode(name);
    }
    return c;
  }
  const primitive = collection('Chamfer / Primitives', ['Value']);
  const semantic = collection('Chamfer / Semantic', ['Light', 'Dark']);
  const component = collection('Chamfer / Components', ['Value']);
  const map = {};
  function variable(c, key, type, scopes) {
    const name = key.replaceAll('.', '/');
    let v = existingVariables.find((v) => v.variableCollectionId === c.id && v.name === name);
    if (!v) v = figma.variables.createVariable(name, c, type);
    v.scopes = scopes;
    v.setVariableCodeSyntax('WEB', cssName(key));
    map[key] = v;
    variableIds.push(v.id);
    return v;
  }
  for (const [key, value] of flatten(TOKEN_DATA.primitives)) {
    // Elevation is represented as an effect style below rather than a string variable.
    if (key.startsWith('elevation.')) continue;
    const type = key.startsWith('color.')
      ? 'COLOR'
      : typeof value === 'number'
        ? 'FLOAT'
        : 'STRING';
    const scopes = key.startsWith('space.')
      ? ['GAP']
      : key.startsWith('radius.')
        ? ['CORNER_RADIUS']
        : key.startsWith('fontSize.')
          ? ['FONT_SIZE']
          : key.startsWith('font.')
            ? ['FONT_FAMILY']
            : [];
    const v = variable(primitive, key, type, scopes);
    v.setValueForMode(primitive.modes[0].modeId, type === 'COLOR' ? rgb(value) : value);
  }
  for (const [key, value] of Object.entries(TOKEN_DATA.semantic.light)) {
    const scopes =
      key.includes('border') || key === 'focus'
        ? ['STROKE_COLOR']
        : [
              'foreground',
              'muted',
              'accent',
              'accent-hover',
              'accent-foreground',
              'success',
              'warning',
              'danger',
            ].includes(key)
          ? ['TEXT_FILL', 'FRAME_FILL', 'SHAPE_FILL']
          : ['FRAME_FILL', 'SHAPE_FILL'];
    const v = variable(semantic, 'semantic.' + key, 'COLOR', scopes);
    for (const mode of ['Light', 'Dark']) {
      const target = map[TOKEN_DATA.semantic[mode.toLowerCase()][key]];
      v.setValueForMode(semantic.modes.find((m) => m.name === mode).modeId, {
        type: 'VARIABLE_ALIAS',
        id: target.id,
      });
    }
  }
  for (const [key, value] of Object.entries(TOKEN_DATA.components)) {
    const target = typeof value === 'string' ? map[value] : null;
    const type = target ? target.resolvedType : 'FLOAT';
    const scopes =
      type === 'COLOR'
        ? key.includes('border') || key === 'focus'
          ? ['STROKE_COLOR']
          : key.endsWith('-fg')
            ? ['TEXT_FILL']
            : ['FRAME_FILL', 'SHAPE_FILL']
        : key.includes('radius')
          ? ['CORNER_RADIUS']
          : ['WIDTH_HEIGHT'];
    const v = variable(component, 'component.' + key, type, scopes);
    v.setValueForMode(
      component.modes[0].modeId,
      target ? { type: 'VARIABLE_ALIAS', id: target.id } : value,
    );
  }
  const styles = await figma.getLocalTextStylesAsync();
  for (const [name, size, family, style] of [
    ['Display', 56, 'IBM Plex Sans', 'Medium'],
    ['Heading', 28, 'IBM Plex Sans', 'Medium'],
    ['Title', 20, 'IBM Plex Sans', 'Medium'],
    ['Body', 14, 'IBM Plex Sans', 'Regular'],
    ['Label', 12, 'IBM Plex Sans', 'Medium'],
    ['Code', 12, 'IBM Plex Mono', 'Regular'],
  ]) {
    let s = styles.find((s) => s.name === 'Chamfer / ' + name);
    if (!s) s = figma.createTextStyle();
    s.name = 'Chamfer / ' + name;
    s.fontName = { family, style };
    s.fontSize = size;
    s.lineHeight = { unit: 'PERCENT', value: 150 };
  }
  const effects = await figma.getLocalEffectStylesAsync();
  let elevation = effects.find((s) => s.name === 'Chamfer / Elevation / Low');
  if (!elevation) elevation = figma.createEffectStyle();
  elevation.name = 'Chamfer / Elevation / Low';
  elevation.effects = [
    {
      type: 'DROP_SHADOW',
      visible: true,
      blendMode: 'NORMAL',
      color: { ...rgb('#0c131d'), a: 0.06 },
      offset: { x: 0, y: 2 },
      radius: 8,
      spread: 0,
    },
  ];
  const existing = page.children.find((n) => n.name === 'Chamfer UI — Foundation');
  if (existing)
    return result({
      pageId: page.id,
      frameId: existing.id,
      variables: Object.keys(map).length,
      alreadyExists: true,
    });
  const board = frame(page, 'Chamfer UI — Foundation', 1240);
  board.x = 200;
  board.y = 200;
  padding(board, '12', map);
  gap(board, '8', map);
  fill(board, 'semantic.canvas', map);
  const brandRow = frame(board, 'Brand', 1144, 100, 'HORIZONTAL');
  brandRow.counterAxisAlignItems = 'CENTER';
  gap(brandRow, '4', map);
  const mark = remember(figma.createNodeFromSvg(BRAND_SVG));
  mark.name = 'Chamfer / Brand mark';
  mark.resize(48, 48);
  brandRow.appendChild(mark);
  for (const n of mark.findAll(() => true)) createdNodeIds.push(n.id);
  text(brandRow, 'chamfer/ui', 32, 'semantic.foreground', map, false, 'Medium');
  text(board, 'Precision UI for SaaS teams.', 56, 'semantic.foreground', map, false, 'Medium');
  text(
    board,
    'An original foundation. React + TypeScript + Tailwind CSS. Shared values in design and code.',
    16,
    'semantic.muted',
    map,
    false,
    'Regular',
    950,
  );
  text(board, 'Colors / Semantic themes', 28, 'semantic.foreground', map, false, 'Medium');
  for (const mode of ['Light', 'Dark']) {
    const sheet = frame(board, mode + ' / Color roles', 1144);
    padding(sheet, '6', map);
    setTheme(sheet, [semantic], mode);
    fill(sheet, 'semantic.canvas', map);
    border(sheet, 'semantic.border', map);
    bind(sheet, 'cornerRadius', 'radius.md', map);
    text(sheet, mode + ' theme', 20, 'semantic.foreground', map, false, 'Medium');
    const roles = [
      'canvas',
      'subtle',
      'border',
      'foreground',
      'accent',
      'success',
      'warning',
      'danger',
    ];
    for (let row = 0; row < 2; row++) {
      const strip = frame(sheet, 'Swatch row', 1096, 100, 'HORIZONTAL');
      gap(strip, '6', map);
      for (const role of roles.slice(row * 4, row * 4 + 4)) {
        const swatch = frame(strip, role, 256);
        const block = remember(figma.createRectangle());
        block.resize(256, 72);
        fill(block, 'semantic.' + role, map);
        border(block, 'semantic.border', map);
        bind(block, 'cornerRadius', 'radius.sm', map);
        swatch.appendChild(block);
        text(swatch, role, 12, 'semantic.muted', map, true);
      }
    }
  }
  text(board, 'Typography / IBM Plex', 28, 'semantic.foreground', map, false, 'Medium');
  text(board, 'Clarity at every scale.', 40, 'semantic.foreground', map, false, 'Medium');
  text(board, '0123456789  const precision = "intentional";', 24, 'semantic.foreground', map, true);
  text(board, 'Spacing / Four-pixel base', 28, 'semantic.foreground', map, false, 'Medium');
  for (const [key, value] of Object.entries(TOKEN_DATA.primitives.space).filter(
    ([, v]) => v > 0 && v <= 48,
  )) {
    const row = frame(board, 'space/' + key, 1144, 20, 'HORIZONTAL');
    row.counterAxisAlignItems = 'CENTER';
    gap(row, '6', map);
    text(row, 'space / ' + key, 12, 'semantic.muted', map, true, 'Regular', 120);
    const bar = remember(figma.createRectangle());
    bar.resize(value * 3, 12);
    fill(bar, 'semantic.accent-soft', map);
    border(bar, 'semantic.accent', map);
    row.appendChild(bar);
    text(row, value + 'px', 12, 'semantic.muted', map, true);
  }
  text(board, 'Shape / Motion', 28, 'semantic.foreground', map, false, 'Medium');
  text(
    board,
    'Controls: 4px. Content: 6px. Thin borders. Feedback: 120ms. General transitions: 200ms.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1050,
  );
  text(board, 'Getting started', 28, 'semantic.foreground', map, false, 'Medium');
  text(board, 'pnpm install  →  pnpm dev  →  pnpm storybook', 16, 'semantic.foreground', map, true);
  text(
    board,
    'Core code is MIT licensed. Chamfer Pro assets and commerce are a future milestone. Dashboard records are synthetic.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1050,
  );
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frameId: board.id,
    variables: Object.keys(map).length,
    collections: [primitive.id, semantic.id, component.id],
    bounds: { width: board.width, height: board.height },
  });
}
