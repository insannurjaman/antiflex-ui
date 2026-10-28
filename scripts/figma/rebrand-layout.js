const p = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(p);
const vars = await figma.variables.getLocalVariablesAsync();
const get = (n) => vars.find((v) => v.name === n);
const changed = [];
const mark = (n) => changed.push(n.id);
const paint = (n, k, property = 'fills') => {
  const v = get('semantic/' + k);
  n[property] = [
    figma.variables.setBoundVariableForPaint(
      { type: 'SOLID', color: v.resolveForConsumer(n).value },
      'color',
      v,
    ),
  ];
  mark(n);
};
await figma.loadFontAsync({ family: 'DM Sans', style: 'SemiBold' });
await figma.loadFontAsync({ family: 'Space Mono', style: 'Regular' });
for (const n of p.findAll()) {
  if (
    n.type === 'FRAME' &&
    /avatar|profile/i.test(n.name) &&
    typeof n.cornerRadius === 'number' &&
    n.cornerRadius > 8
  ) {
    n.setBoundVariable('cornerRadius', get('radius/sm'));
    mark(n);
  }
}
for (const root of p.children.filter(
  (n) => n.type === 'FRAME' && /Desktop \/ (Light|Dark)$/.test(n.name),
)) {
  const main = root.findOne((n) => n.name === 'AppShell / Main' || n.name === 'Main content');
  if (!main) continue;
  for (const t of main.children)
    if (t.type === 'TEXT') {
      t.layoutSizingHorizontal = 'FILL';
      mark(t);
    }
  const panels = main.children.find((n) => n.name === 'Dashboard / Panels');
  if (panels) {
    panels.children[0].resize(705.6, panels.children[0].height);
    panels.children[1].resize(470.4, panels.children[1].height);
    mark(panels.children[0]);
    mark(panels.children[1]);
  }
  const queue = main.children.find((n) => n.name === 'Portfolio and work queue');
  if (queue) {
    for (let i = 0; i < queue.children.length; i++) {
      const c = queue.children[i];
      c.resize(i === 0 ? 756 : 420, c.height);
      mark(c);
    }
  }
  const orders = main.children.find((n) => n.name === 'Dashboard / Orders');
  if (orders)
    for (const c of orders.children) {
      c.layoutSizingHorizontal = 'FILL';
      mark(c);
      if (c.name === 'Table / Orders')
        for (const row of c.children) {
          row.layoutSizingHorizontal = 'FILL';
          mark(row);
        }
    }
}
if (p.name === 'antiflex / Dashboard')
  for (const frame of p.children.filter(
    (n) => n.type === 'FRAME' && n.name.startsWith('Dashboard / '),
  )) {
    const metrics = frame.findOne((n) => n.name === 'Dashboard / Metrics');
    if (!metrics) continue;
    paint(metrics, 'surface');
    paint(metrics, 'border', 'strokes');
    metrics.itemSpacing = 0;
    mark(metrics);
    for (const row of metrics.children) {
      if (!('children' in row)) continue;
      row.itemSpacing = 0;
      row.layoutSizingHorizontal = 'FILL';
      mark(row);
      const width = metrics.width / row.children.length;
      for (let i = 0; i < row.children.length; i++) {
        const c = row.children[i];
        c.resize(width, c.height);
        c.strokes = [];
        c.paddingLeft = 20;
        c.paddingRight = 20;
        mark(c);
        const value = c.findOne((n) => n.type === 'TEXT' && n.name === 'Value');
        if (value) {
          value.fontName = { family: 'DM Sans', style: 'SemiBold' };
          value.fontSize = 32;
          value.setBoundVariable('fontFamily', get('font/sans'));
          mark(value);
        }
      }
    }
  }
return {
  pageId: p.id,
  changedNodeIds: changed.join(','),
  frames: p.children
    .filter((n) => n.type === 'FRAME' && /Desktop|Mobile/.test(n.name))
    .map((n) => ({ id: n.id, name: n.name, width: n.width, height: n.height })),
};
