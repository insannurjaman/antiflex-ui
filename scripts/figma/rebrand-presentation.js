const p = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(p);
const vs = await figma.variables.getLocalVariablesAsync();
const v = (n) => vs.find((v) => v.name === n);
const changed = [];
const mark = (n) => changed.push(n.id);
const paint = (n, role, prop = 'fills') => {
  const token = v('semantic/' + role);
  n[prop] = [
    figma.variables.setBoundVariableForPaint(
      { type: 'SOLID', color: token.resolveForConsumer(n).value },
      'color',
      token,
    ),
  ];
  mark(n);
};
for (const t of p.findAllWithCriteria({ types: ['TEXT'] }))
  for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName);
await figma.loadFontAsync({ family: 'Space Mono', style: 'Regular' });
for (const t of p.findAllWithCriteria({ types: ['TEXT'] })) {
  let a = t.parent;
  let tableHeader = false;
  for (let i = 0; i < 3 && a; i++, a = a.parent)
    if (a.name === 'Column headers' || a.name === 'Header') tableHeader = true;
  if (['Revenue over time', 'Recent activity'].includes(t.characters) || tableHeader) {
    t.fontName = { family: 'Space Mono', style: 'Regular' };
    t.setBoundVariable('fontFamily', v('font/mono'));
    t.fontSize = 12;
    t.characters = t.characters.toUpperCase();
    mark(t);
  }
}
for (const root of p.children.filter((n) => n.type === 'FRAME' && /Desktop|Mobile/.test(n.name))) {
  const site = root.children.find((n) => n.name === 'antiflex / Site navigation');
  if (site) {
    const nav = site.children.find((n) => n.name === 'Navigation');
    if (nav)
      for (const t of nav.findAllWithCriteria({ types: ['TEXT'] })) {
        t.fontName = { family: 'Space Mono', style: 'Regular' };
        t.setBoundVariable('fontFamily', v('font/mono'));
        t.fontSize = 11;
        t.characters = t.characters.toUpperCase();
        mark(t);
      }
  }
  const header = site || root.children.find((n) => n.name === 'Application header');
  const brand = header && (header.children.find((n) => n.name === 'Brand') || header);
  const markFrame =
    brand && brand.children.find((n) => n.type === 'FRAME' && n.width <= 40 && n.height <= 40);
  if (markFrame) {
    const paths = markFrame.findAllWithCriteria({ types: ['VECTOR'] });
    if (paths[0]) paint(paths[0], 'foreground');
    if (paths[1]) paint(paths[1], 'canvas');
  }
  if (root.name.includes('Desktop')) {
    const nav = root.findOne(
      (n) =>
        n.name === 'Workspace sections' ||
        (n.name === 'Navigation' && n.parent?.name === 'Workspace body'),
    );
    if (nav) {
      const selected = root.name.includes('Customers')
        ? 'Customers'
        : root.name.includes('Billing')
          ? 'Billing'
          : 'Overview';
      for (const link of nav.children) {
        if (link.type !== 'FRAME') continue;
        const label = link.findOne((n) => n.type === 'TEXT');
        if (!label) continue;
        const active = label.characters === selected;
        paint(label, active ? 'foreground' : 'muted');
        paint(link, active ? 'foreground' : 'border', 'strokes');
        link.strokeTopWeight = 0;
        link.strokeLeftWeight = 0;
        link.strokeRightWeight = 0;
        link.strokeBottomWeight = active ? 1 : 0;
        mark(link);
        for (const path of link.findAllWithCriteria({ types: ['VECTOR'] })) {
          if (path.strokes.length) paint(path, active ? 'foreground' : 'muted', 'strokes');
          else if (path.fills.length) paint(path, active ? 'foreground' : 'muted');
        }
      }
    }
  }
}
return { pageId: p.id, changedNodeIds: changed.join(',') };
