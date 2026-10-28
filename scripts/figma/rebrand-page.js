const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const vars = await figma.variables.getLocalVariablesAsync();
const byName = new Map(vars.map((v) => [v.name, v]));
const changed = [];
const touch = (n) => {
  changed.push(n.id);
  return n;
};
const fontVars = {
  sans: byName.get('font/sans'),
  mono: byName.get('font/mono'),
  display: byName.get('font/display'),
};
const texts = page.findAllWithCriteria({ types: ['TEXT'] });
const allFonts = new Map();
for (const n of texts)
  for (const seg of n.getStyledTextSegments(['fontName']))
    allFonts.set(JSON.stringify(seg.fontName), seg.fontName);
for (const family of ['DM Sans', 'Space Mono', 'Anybody'])
  for (const style of family === 'Space Mono'
    ? ['Regular', 'Bold']
    : ['Regular', 'Medium', 'SemiBold'])
    allFonts.set(family + style, { family, style });
for (const f of allFonts.values()) await figma.loadFontAsync(f);
for (const n of texts) {
  const bound = n.boundVariables.fontFamily?.[0]?.id;
  const oldFamily = n.fontName !== figma.mixed ? n.fontName.family : '';
  const style = n.fontName !== figma.mixed ? n.fontName.style : 'Regular';
  const isBrand = /^(antiflex\/?ui|antiflex Pro|antiflex/ui — Foundation)$/.test(n.characters);
  let kind =
    bound === fontVars.mono.id
      ? 'mono'
      : bound === fontVars.sans.id
        ? 'sans'
        : oldFamily.includes('Mono')
          ? 'mono'
          : 'sans';
  if (
    isBrand ||
    n.textStyleId ===
      (await figma.getLocalTextStylesAsync()).find((s) => s.name === 'antiflex / Display')?.id
  )
    kind = 'display';
  if (
    n.parent &&
    /header/i.test(n.parent.name) &&
    /^(Order|Customer|Plan|Status|Amount|Date|Invoice|MRR|Renewal|Account actions|Due date)$/.test(
      n.characters,
    )
  )
    kind = 'mono';
  const family = kind === 'mono' ? 'Space Mono' : kind === 'display' ? 'Anybody' : 'DM Sans';
  const weight =
    kind === 'mono'
      ? 'Regular'
      : kind === 'display'
        ? 'SemiBold'
        : /Medium|Bold/.test(style)
          ? 'Medium'
          : 'Regular';
  n.fontName = { family, style: weight };
  n.setBoundVariable('fontFamily', fontVars[kind]);
  if (n.characters.includes('IBM Plex'))
    n.characters = n.characters
      .replaceAll('IBM Plex Sans', 'DM Sans')
      .replaceAll('IBM Plex Mono', 'Space Mono')
      .replaceAll('IBM Plex', 'antiflex');
  if (n.characters.includes('cyan')) n.characters = n.characters.replaceAll('cyan', 'mint');
  touch(n);
}
for (const n of page.findAll()) {
  if (
    'cornerRadius' in n &&
    typeof n.cornerRadius === 'number' &&
    n.cornerRadius > 0 &&
    n.cornerRadius <= 8 &&
    !n.boundVariables?.cornerRadius
  ) {
    n.cornerRadius = 1;
    touch(n);
  }
}
const fill = (n, name) => {
  const v = byName.get('semantic/' + name);
  n.fills = [
    figma.variables.setBoundVariableForPaint(
      { type: 'SOLID', color: v.resolveForConsumer(n).value },
      'color',
      v,
    ),
  ];
  touch(n);
};
const frames = page.children.filter(
  (n) => n.type === 'FRAME' && /Desktop \/ (Light|Dark)$/.test(n.name),
);
const layouts = [];
for (const root of frames) {
  const core = root.name.startsWith('Dashboard');
  const body = root.children.find((n) => n.name === (core ? 'AppShell / Body' : 'Workspace body'));
  const header = root.children.find(
    (n) => n.name === (core ? 'AppShell / Topbar' : 'Application header'),
  );
  if (!body || !header) continue;
  const nav = body.children.find((n) => n.name === (core ? 'AppShell / Sidebar' : 'Navigation'));
  const main = body.children.find((n) => n.name === (core ? 'AppShell / Main' : 'Main content'));
  if (!main || !nav) continue;
  body.counterAxisSizingMode = 'FIXED';
  body.resize(root.width, body.height);
  header.resize(root.width, 48);
  touch(header);
  body.layoutMode = 'VERTICAL';
  body.primaryAxisSizingMode = 'AUTO';
  body.counterAxisAlignItems = 'CENTER';
  touch(body);
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'FIXED';
  nav.resize(root.width, 40);
  nav.paddingLeft = 24;
  nav.paddingRight = 24;
  nav.paddingTop = 0;
  nav.paddingBottom = 0;
  nav.itemSpacing = 4;
  nav.counterAxisAlignItems = 'CENTER';
  nav.layoutSizingVertical = 'FIXED';
  nav.layoutSizingHorizontal = 'FILL';
  fill(nav, 'canvas');
  let links = nav;
  if (core) {
    links = nav.children.find((n) => n.name === 'Workspace sections');
    for (const c of nav.children)
      if (c !== links) {
        c.visible = false;
        touch(c);
      }
    if (links) {
      links.layoutMode = 'HORIZONTAL';
      links.primaryAxisSizingMode = 'AUTO';
      links.counterAxisSizingMode = 'FIXED';
      links.resize(links.width, 40);
      links.layoutSizingHorizontal = 'HUG';
      links.layoutSizingVertical = 'FIXED';
      touch(links);
    }
  }
  if (links)
    for (const link of links.children) {
      if (link.type !== 'FRAME') continue;
      link.primaryAxisSizingMode = 'AUTO';
      link.counterAxisSizingMode = 'FIXED';
      link.resize(link.width, 40);
      link.layoutSizingHorizontal = 'HUG';
      link.layoutSizingVertical = 'FIXED';
      link.paddingTop = 8;
      link.paddingBottom = 8;
      fill(link, 'canvas');
      const label = link.findOne((n) => n.type === 'TEXT');
      if (label) fill(label, link === links.children[0] ? 'foreground' : 'muted');
      touch(link);
    }
  main.layoutAlign = 'INHERIT';
  main.layoutGrow = 0;
  main.layoutSizingHorizontal = 'FIXED';
  main.resize(1264, main.height);
  for (const c of main.children) {
    if (c.type === 'FRAME') {
      c.layoutSizingHorizontal = 'FILL';
      touch(c);
    }
  }
  main.primaryAxisSizingMode = 'AUTO';
  main.counterAxisSizingMode = 'FIXED';
  main.layoutSizingVertical = 'HUG';
  touch(main);
  root.primaryAxisSizingMode = 'AUTO';
  touch(root);
  layouts.push({
    id: root.id,
    name: root.name,
    w: root.width,
    h: root.height,
    mainWidth: main.width,
    navHeight: nav.height,
  });
}
return {
  pageId: page.id,
  changedNodeIds: [...new Set(changed)].join(','),
  textCount: texts.length,
  layouts,
};
