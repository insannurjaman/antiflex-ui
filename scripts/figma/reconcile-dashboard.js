// Shared final geometry pass used by the generator and the live-file reconciliation.
async function reconcileDashboard(root, map, collections, sets, metric) {
  const mobile = root.width === 390;
  const content = mobile ? 358 : 1152;
  const find = (name) => root.findOne((n) => n.name === name && n.type === 'FRAME');
  const hug = (n) => {
    n.primaryAxisSizingMode = 'AUTO';
  };
  const fixedWidth = (n, width) => {
    n.resize(width, n.height);
    n.layoutSizingHorizontal = 'FIXED';
  };
  const label = (
    p,
    value,
    size = 11,
    key = 'semantic.muted',
    mono = false,
    weight = 'Regular',
    width,
  ) => text(p, value, size, key, map, mono, weight, width);
  const makeButton = (p, value, variant = 'secondary', size = 'sm') =>
    instance(p, getVariant(sets['Button / ' + variant], { Size: size, State: 'Default' }), value);
  for (const n of root.findAll(
    (n) =>
      n.type === 'FRAME' &&
      ['AppShell / Body', 'Dashboard / Heading', 'Dashboard / Panels', 'Orders toolbar'].includes(
        n.name,
      ),
  )) {
    if (n.layoutMode === 'HORIZONTAL') n.counterAxisSizingMode = 'AUTO';
  }
  const brand = find('Brand');
  const logo = brand.children.find((n) => n.type === 'FRAME');
  if (logo)
    logo
      .findAll((n) => n.type === 'VECTOR')
      .forEach((n, i) => fill(n, i === 0 ? 'semantic.accent' : 'semantic.canvas', map));
  const nav = find('Navigation');
  if (mobile) {
    gap(nav, '3', map);
    fixedWidth(nav, 350);
  }
  const dashboardLink = nav.findOne((n) => n.type === 'TEXT' && n.characters === 'Dashboard');
  if (dashboardLink) dashboardLink.characters = 'Dashboard demo';
  if (!mobile && !find('Site tools')) {
    nav.layoutGrow = 1;
    const tools = frame(find('Chamfer / Site navigation'), 'Site tools', 110, 32, 'HORIZONTAL');
    tools.counterAxisAlignItems = 'CENTER';
    gap(tools, '4', map);
    instance(tools, getVariant(sets.Badge, { Variant: 'neutral', Size: 'sm' }), 'v0.1.0');
    const theme = frame(tools, 'Theme control', 32, 32, 'HORIZONTAL');
    theme.primaryAxisAlignItems = 'CENTER';
    theme.counterAxisAlignItems = 'CENTER';
    fill(theme, 'semantic.subtle', map);
    bind(theme, 'cornerRadius', 'radius.sm', map);
    icon(theme, root.name.endsWith('Dark') ? 'IconSun' : 'IconMoon', map);
  }
  const heading = find('Dashboard / Heading');
  fixedWidth(heading, content);
  if (!mobile) {
    heading.primaryAxisAlignItems = 'SPACE_BETWEEN';
    fixedWidth(heading.children[0], content - 310);
  }
  const title = heading.findOne((n) => n.type === 'TEXT' && n.characters === 'Workspace overview');
  title.lineHeight = { unit: 'PERCENT', value: 120 };
  title.letterSpacing = { unit: 'PIXELS', value: -0.8 };
  const sidebar = find('AppShell / Sidebar');
  if (sidebar && !sidebar.children.some((n) => n.name === 'Workspace sections')) {
    sidebar.layoutSizingVertical = 'FILL';
    padding(sidebar, '3', map);
    gap(sidebar, '6', map);
    const workspace = frame(sidebar, 'Workspace selection', 200, 48, 'HORIZONTAL');
    workspace.counterAxisAlignItems = 'CENTER';
    gap(workspace, '3', map);
    const orbit = frame(workspace, 'Workspace avatar', 30, 30, 'HORIZONTAL');
    orbit.primaryAxisAlignItems = 'CENTER';
    orbit.counterAxisAlignItems = 'CENTER';
    fill(orbit, 'semantic.accent', map);
    bind(orbit, 'cornerRadius', 'radius.md', map);
    label(orbit, 'o', 18, 'semantic.accent-foreground', false, 'Medium');
    const info = frame(workspace, 'Workspace information', 150);
    gap(info, '1', map);
    for (const n of sidebar.children.slice())
      if (n.type === 'TEXT' && ['Orbit workspace', 'Foundation demo'].includes(n.characters))
        info.appendChild(n);
    sidebar.insertChild(0, workspace);
    const links = frame(sidebar, 'Workspace sections', 200);
    gap(links, '1', map);
    for (const n of sidebar.children.slice())
      if (['Overview', 'Orders', 'Revenue', 'Activity'].includes(n.name)) {
        links.appendChild(n);
        fixedWidth(n, 200);
      }
    sidebar.insertChild(1, links);
    const note = frame(sidebar, 'Chamfer product note', 200);
    gap(note, '4', map);
    padding(note, '3', map);
    note.paddingTop = 48;
    label(note, 'BUILT WITH CHAMFER', 9, 'semantic.muted', true);
    for (const n of sidebar.children.slice())
      if (
        n.type === 'TEXT' &&
        (n.characters.startsWith('One system.') ||
          n.characters.startsWith('Explore the components'))
      )
        note.appendChild(n);
    sidebar.insertChild(2, note);
  }
  for (const name of ['Revenue over time', 'Recent activity']) {
    const panel = find(name);
    if (!panel.children.some((n) => n.name === 'Panel heading')) {
      const header = frame(panel, 'Panel heading', panel.width - (mobile ? 40 : 48));
      gap(header, '1', map);
      for (const n of panel.children.slice(0, 2)) header.appendChild(n);
      panel.insertChild(0, header);
      gap(panel, '6', map);
      if (mobile) padding(panel, '5', map);
    }
    if (name === 'Recent activity' && !mobile) panel.layoutSizingVertical = 'FILL';
  }
  const toolbar = find('Orders toolbar');
  fixedWidth(toolbar, content);
  toolbar.paddingTop = 0;
  toolbar.paddingLeft = mobile ? 16 : 20;
  toolbar.paddingRight = mobile ? 16 : 20;
  if (!toolbar.children.some((n) => n.name === 'Order actions')) {
    const actions = frame(toolbar, 'Order actions', mobile ? 326 : 226, 36, 'HORIZONTAL');
    gap(actions, '3', map);
    actions.counterAxisAlignItems = 'CENTER';
    for (const n of toolbar.children.slice()) if (n.type === 'INSTANCE') actions.appendChild(n);
    if (mobile) {
      fixedWidth(actions, 326);
      actions.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else {
      toolbar.primaryAxisAlignItems = 'SPACE_BETWEEN';
    }
  }
  if (mobile) fixedWidth(find('Search orders'), 326);
  const pagination = find('Pagination');
  fixedWidth(pagination, content);
  if (!pagination.children.some((n) => n.name === 'Page controls')) {
    const old = pagination.children.find(
      (n) => n.type === 'TEXT' && n.characters.startsWith('Page 1'),
    );
    const controls = frame(pagination, 'Page controls', mobile ? 326 : 172, 32, 'HORIZONTAL');
    controls.counterAxisAlignItems = 'CENTER';
    gap(controls, '3', map);
    makeButton(controls, '‹');
    if (old) {
      old.characters = 'Page 1 of 3';
      controls.appendChild(old);
    }
    makeButton(controls, '›');
    if (mobile) {
      pagination.primaryAxisSizingMode = 'AUTO';
      fixedWidth(controls, 326);
      controls.primaryAxisAlignItems = 'SPACE_BETWEEN';
    } else pagination.primaryAxisAlignItems = 'SPACE_BETWEEN';
  }
  if (!metric.children.some((n) => n.name === 'Metric heading')) {
    const header = frame(metric, 'Metric heading', 232, 18, 'HORIZONTAL');
    header.counterAxisAlignItems = 'CENTER';
    const title = metric.children.find((n) => n.name === 'Title');
    header.appendChild(title);
    title.layoutGrow = 1;
    for (const [name, iconName] of [
      ['Revenue', 'IconChartBar'],
      ['Orders', 'IconShoppingBag'],
      ['Customers', 'IconLayoutDashboard'],
      ['Pending', 'IconActivity'],
    ]) {
      const glyph = icon(header, iconName, map);
      glyph.name = 'Metric icon / ' + name;
      const prop = metric.addComponentProperty('Icon ' + name, 'BOOLEAN', name === 'Revenue');
      glyph.componentPropertyReferences = { visible: prop };
      glyph.visible = name === 'Revenue';
    }
    metric.insertChild(0, header);
    header.layoutSizingHorizontal = 'FILL';
    const value = metric.children.find((n) => n.name === 'Value');
    value.lineHeight = { unit: 'PERCENT', value: 120 };
    value.letterSpacing = { unit: 'PIXELS', value: -0.7 };
  }
  const definitions = Object.keys(metric.componentPropertyDefinitions);
  for (const n of root.findAll((n) => n.type === 'INSTANCE' && n.name === 'Dashboard / Metric')) {
    const titleKey = definitions.find((k) => k.startsWith('Title#'));
    const title = n.componentProperties[titleKey].value;
    const props = {};
    for (const key of definitions.filter((k) => k.startsWith('Icon ')))
      props[key] = key.split('#')[0] === 'Icon ' + title;
    n.setProperties(props);
  }
  mutatedNodeIds.push(root.id, metric.id);
}
