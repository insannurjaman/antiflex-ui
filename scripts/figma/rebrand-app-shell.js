// Reconcile existing AppShell variants without replacing component IDs.
const page = figma.root.children.find((p) => p.name === 'antiflex / Components');
await figma.setCurrentPageAsync(page);
const set = page.findOne((n) => n.type === 'COMPONENT_SET' && n.name === 'AppShell');
if (!set) throw new Error('Build the baseline components first.');
const changed = [];
const created = [];
for (const variant of set.children.slice()) {
  if (!variant.name.includes('Layout=')) {
    variant.name += ', Layout=Sidebar';
    changed.push(variant.id);
  }
}
for (const original of set.children.filter((c) => c.name.includes('Layout=Sidebar'))) {
  const name = original.name.replace('Layout=Sidebar', 'Layout=Top');
  if (set.children.some((c) => c.name === name)) continue;
  const copy = original.clone();
  copy.name = name;
  set.appendChild(copy);
  created.push(copy.id);
  const body = copy.children.find((c) => c.name === 'Body');
  if (body) {
    body.layoutMode = 'VERTICAL';
    const nav = body.children.find((c) => c.name === 'Sidebar');
    const main = body.children.find((c) => c.name === 'Main');
    if (nav) {
      nav.layoutMode = 'HORIZONTAL';
      nav.resize(copy.width, 40);
      nav.layoutSizingHorizontal = 'FILL';
      nav.layoutSizingVertical = 'FIXED';
      nav.paddingTop = 8;
      nav.paddingBottom = 8;
      nav.itemSpacing = 24;
    }
    if (main) {
      main.layoutSizingHorizontal = 'FILL';
      main.resize(copy.width, 196);
    }
  }
  copy.x = 24;
  copy.y = 24 + set.children.indexOf(copy) * 324;
}
set.resize(768, 24 + set.children.length * 324);
return {
  createdNodeIds: created,
  mutatedNodeIds: [set.id, ...changed],
  variants: set.children.map((c) => ({ id: c.id, name: c.name })),
};
