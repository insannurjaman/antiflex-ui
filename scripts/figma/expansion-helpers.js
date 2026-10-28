await fonts();
const { map, collections } = await tokenMap();
const styles = await figma.getLocalTextStylesAsync();
async function label(
  parent,
  value,
  width,
  color = 'semantic.foreground',
  size = 14,
  weight = 'Regular',
) {
  const n = text(parent, value, size, color, map, false, weight, width);
  const style = styles.find(
    (s) =>
      s.name.startsWith('antiflex /') &&
      s.fontName.family === 'DM Sans' &&
      s.fontName.style === weight &&
      s.fontSize === size &&
      s.lineHeight.unit === 'PERCENT' &&
      s.lineHeight.value === 150,
  );
  if (style) await n.setTextStyleIdAsync(style.id);
  if (size === 24 && weight === 'Medium') {
    const heading = styles.find((s) => s.name === 'antiflex / Type weight / medium');
    if (heading) await n.setTextStyleIdAsync(heading.id);
  }
  fill(n, color, map);
  return n;
}
function box(parent, name, width, horizontal = false) {
  const n = frame(parent, name, width, 100, horizontal ? 'HORIZONTAL' : 'VERTICAL');
  n.primaryAxisSizingMode = horizontal ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = horizontal ? 'AUTO' : 'FIXED';
  n.clipsContent = false;
  gap(n, 2, map);
  return n;
}
function comp(page, name, width, horizontal = false) {
  const n = remember(figma.createComponent());
  n.name = name;
  n.layoutMode = horizontal ? 'HORIZONTAL' : 'VERTICAL';
  n.resize(width, 100);
  n.primaryAxisSizingMode = horizontal ? 'FIXED' : 'AUTO';
  n.counterAxisSizingMode = horizontal ? 'AUTO' : 'FIXED';
  n.fills = [];
  n.clipsContent = false;
  n.itemSpacing = 0;
  page.appendChild(n);
  return n;
}
function panel(n, prefix = 'choice') {
  fill(n, 'component.' + prefix + '-bg', map);
  border(n, 'component.' + prefix + '-border', map);
  bind(n, 'cornerRadius', 'radius.sm', map);
  n.strokesIncludedInLayout = true;
}
function expose(owner, node, name = 'Label') {
  node.componentPropertyReferences = {
    characters: owner.addComponentProperty(name, 'TEXT', node.characters),
  };
}
function arrow(parent, kind = 'down', color = 'semantic.muted') {
  const path =
    kind === 'down'
      ? 'm4 6 4 4 4-4'
      : kind === 'check'
        ? 'm3 8 3 3 7-7'
        : kind === 'left'
          ? 'm10 4-4 4 4 4'
          : 'm6 4 4 4-4 4';
  const n = remember(
    figma.createNodeFromSvg(
      '<svg width="16" height="16" viewBox="0 0 16 16"><path d="' +
        path +
        '" fill="none" stroke="black" stroke-width="1.5"/></svg>',
    ),
  );
  parent.appendChild(n);
  n.name = 'Icon / ' + kind;
  n.resize(16, 16);
  for (const c of n.findAll(() => true)) {
    createdNodeIds.push(c.id);
    if ('strokes' in c && c.strokes.length) {
      c.strokes = c.strokes.map((p) => (p.type === 'SOLID' ? paint(map[color], c) : p));
    }
  }
  return n;
}
function set(page, nodes, name, x, y, cols = 3, cellWidth = 390, cellHeight = 390) {
  const s = remember(figma.combineAsVariants(nodes, page));
  s.name = name;
  s.x = x;
  s.y = y;
  s.description =
    'Original antiflex ' +
    name +
    '. Token-bound auto-layout; light/dark modes inherited. React owns native keyboard, focus, forms, dismissal and date arithmetic. Visual states are specimens, not simulated browser behavior.';
  nodes.forEach((n, i) => {
    n.x = 16 + (i % cols) * cellWidth;
    n.y = 40 + Math.floor(i / cols) * cellHeight;
  });
  s.resize(cols * cellWidth + 16, Math.ceil(nodes.length / cols) * cellHeight + 40);
  return s;
}
async function button(parent, value, state = 'Default', size = 'sm') {
  const source = await figma.getNodeByIdAsync('5:122');
  const n = instance(parent, getVariant(source, { Size: size, State: state }), value);
  n.layoutSizingHorizontal = 'HUG';
  return n;
}
async function board(page, name, width, mode, x, y, description) {
  const n = box(page, name, width);
  n.x = x;
  n.y = y;
  fill(n, 'semantic.canvas', map);
  setTheme(n, collections, mode);
  padding(n, 6, map);
  gap(n, 6, map);
  await label(n, name, width - 48, 'semantic.foreground', 24, 'Medium');
  await label(n, description, width - 48, 'semantic.muted');
  return n;
}
function focus(n) {
  const ring = remember(figma.createRectangle());
  n.appendChild(ring);
  ring.name = 'Focus indicator / 2px offset';
  ring.layoutPositioning = 'ABSOLUTE';
  ring.x = -4;
  ring.y = -4;
  ring.resize(n.width + 8, n.height + 8);
  ring.fills = [];
  border(ring, 'semantic.focus', map);
  ring.strokeWeight = 2;
  ring.strokeAlign = 'INSIDE';
  ring.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
  return ring;
}
