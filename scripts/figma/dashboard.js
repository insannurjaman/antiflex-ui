async function buildDashboard() {
  await fonts();
  const page = await pageFor('Chamfer / Dashboard');
  const { map, collections } = await tokenMap();
  const existing = page.children.find((n) => n.name === 'Dashboard / Desktop / Light');
  if (existing) return result({ pageId: page.id, frameId: existing.id, alreadyExists: true });
  const componentPage = figma.root.children.find((p) => p.name === 'Chamfer / Components');
  if (!componentPage) throw new Error('Run components first.');
  await componentPage.loadAsync();
  const sets = Object.fromEntries(
    componentPage.findAll((n) => n.type === 'COMPONENT_SET').map((n) => [n.name, n]),
  );
  const sorted = ORDER_DATA.slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);
  const money = (n) => '$' + n.toLocaleString('en-US');
  const date = (s) => 'Oct ' + Number(s.slice(-2));
  const frames = [];
  const shared = {};
  function row(parent, name, width, height) {
    const n = frame(parent, name, width, height, 'HORIZONTAL');
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisAlignItems = 'CENTER';
    gap(n, '3', map);
    return n;
  }
  function label(
    parent,
    value,
    size = 14,
    key = 'semantic.foreground',
    mono = false,
    weight = 'Regular',
    width,
  ) {
    return text(parent, value, size, key, map, mono, weight, width);
  }
  function panel(parent, name, width) {
    const n = frame(parent, name, width);
    padding(n, '6', map);
    gap(n, '4', map);
    fill(n, 'component.card-bg', map);
    border(n, 'component.card-border', map);
    bind(n, 'cornerRadius', 'component.card-radius', map);
    return n;
  }
  function button(parent, value, variant = 'secondary', size = 'md') {
    return instance(
      parent,
      getVariant(sets['Button / ' + variant], { Size: size, State: 'Default' }),
      value,
    );
  }
  function badge(parent, value, variant = 'neutral') {
    return instance(parent, getVariant(sets.Badge, { Variant: variant, Size: 'sm' }), value);
  }
  function avatar(parent, value, size = 28) {
    const n = frame(parent, 'Avatar', size, size, 'HORIZONTAL');
    n.primaryAxisSizingMode = 'FIXED';
    n.counterAxisAlignItems = 'CENTER';
    n.primaryAxisAlignItems = 'CENTER';
    fill(n, 'semantic.subtle', map);
    border(n, 'semantic.border', map);
    bind(n, 'cornerRadius', 'radius.full', map);
    label(n, value, 9, 'semantic.muted');
    return n;
  }
  // Composed, reusable patterns from the dashboard, built once and instanced.
  function metricComponent() {
    const c = remember(figma.createComponent());
    c.name = 'Dashboard / Metric';
    c.layoutMode = 'VERTICAL';
    c.resize(272, 138);
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'FIXED';
    padding(c, '5', map);
    gap(c, '3', map);
    fill(c, 'component.card-bg', map);
    border(c, 'component.card-border', map);
    bind(c, 'cornerRadius', 'component.card-radius', map);
    c.x = 200;
    c.y = 200;
    page.appendChild(c);
    for (const [name, value, size, key, mono] of [
      ['Title', 'Revenue', 12, 'semantic.muted', false],
      ['Value', '$1,957', 27, 'semantic.foreground', true],
      ['Note', '13 paid orders', 11, 'semantic.muted', false],
    ]) {
      const t = label(c, value, size, key, mono, name === 'Value' ? 'Medium' : 'Regular');
      t.name = name;
      const prop = c.addComponentProperty(name, 'TEXT', value);
      t.componentPropertyReferences = { characters: prop };
    }
    c.description =
      'Dashboard composition using Card tokens. Matches the metric pattern in the React dashboard.';
    return c;
  }
  shared.metric = metricComponent();
  const rowComp = remember(figma.createComponent());
  rowComp.name = 'Dashboard / Order row';
  rowComp.layoutMode = 'HORIZONTAL';
  rowComp.resize(1150, 56);
  rowComp.primaryAxisSizingMode = 'FIXED';
  rowComp.counterAxisSizingMode = 'FIXED';
  rowComp.itemSpacing = 0;
  fill(rowComp, 'semantic.surface', map);
  border(rowComp, 'component.table-border', map);
  rowComp.strokeTopWeight = 0;
  rowComp.strokeLeftWeight = 0;
  rowComp.strokeRightWeight = 0;
  rowComp.x = 200;
  rowComp.y = 430;
  page.appendChild(rowComp);
  rowComp.description = 'Semantic table row composition from the sample orders screen.';
  const cellWidths = [110, 380, 135, 145, 185, 195];
  const propertyKeys = {};
  for (const [i, field] of ['Order', 'Customer', 'Plan', 'Status', 'Amount', 'Date'].entries()) {
    const cell = row(rowComp, field, cellWidths[i], 56);
    cell.paddingLeft = 20;
    cell.paddingRight = 20;
    if (field === 'Customer') {
      const customerAvatar = avatar(cell, 'AM');
      const initials = customerAvatar.findOne((node) => node.type === 'TEXT');
      propertyKeys.Initials = rowComp.addComponentProperty('Initials', 'TEXT', 'AM');
      initials.componentPropertyReferences = { characters: propertyKeys.Initials };
      const info = frame(cell, 'Customer details', 280);
      info.itemSpacing = 0;
      const name = label(info, 'Alex Morgan', 12, 'semantic.foreground', false, 'Medium');
      const email = label(info, 'alex@northstar.example', 10, 'semantic.muted');
      propertyKeys.Customer = rowComp.addComponentProperty('Customer', 'TEXT', 'Alex Morgan');
      name.componentPropertyReferences = { characters: propertyKeys.Customer };
      propertyKeys.Email = rowComp.addComponentProperty('Email', 'TEXT', 'alex@northstar.example');
      email.componentPropertyReferences = { characters: propertyKeys.Email };
    } else if (field === 'Status') badge(cell, 'Paid', 'success');
    else {
      const value = { Order: 'CH-1048', Plan: 'Scale', Amount: '$249', Date: 'Oct 14' }[field];
      const t = label(
        cell,
        value,
        field === 'Order' ? 10 : 12,
        ['Order', 'Date'].includes(field) ? 'semantic.muted' : 'semantic.foreground',
        ['Order', 'Amount'].includes(field),
      );
      propertyKeys[field] = rowComp.addComponentProperty(field, 'TEXT', value);
      t.componentPropertyReferences = { characters: propertyKeys[field] };
    }
  }
  shared.orderRow = rowComp;
  const metricKeys = Object.fromEntries(
    Object.keys(shared.metric.componentPropertyDefinitions).map((k) => [k.split('#')[0], k]),
  );
  for (const [width, mode] of [
    [1440, 'Light'],
    [1440, 'Dark'],
    [390, 'Light'],
    [390, 'Dark'],
  ]) {
    const mobile = width === 390;
    const root = frame(page, `Dashboard / ${mobile ? 'Mobile' : 'Desktop'} / ${mode}`, width);
    root.x = 1100 + frames.length * 1640;
    root.y = 200;
    root.itemSpacing = 0;
    fill(root, 'semantic.canvas', map);
    setTheme(root, collections, mode);
    const top = row(root, 'Chamfer / Site navigation', width, mobile ? 102 : 72);
    top.paddingLeft = mobile ? 20 : 40;
    top.paddingRight = mobile ? 20 : 40;
    gap(top, '12', map);
    border(top, 'semantic.border', map);
    top.strokeTopWeight = 0;
    top.strokeLeftWeight = 0;
    top.strokeRightWeight = 0;
    if (mobile) {
      top.layoutMode = 'VERTICAL';
      top.counterAxisAlignItems = 'MIN';
      top.primaryAxisAlignItems = 'CENTER';
      gap(top, '6', map);
    }
    const brand = frame(top, 'Brand', 170, 28, 'HORIZONTAL');
    brand.counterAxisAlignItems = 'CENTER';
    gap(brand, '2', map);
    const logo = remember(figma.createNodeFromSvg(BRAND_SVG));
    logo.resize(28, 28);
    brand.appendChild(logo);
    for (const n of logo.findAll(() => true)) createdNodeIds.push(n.id);
    label(brand, 'chamfer/ui', 23, 'semantic.foreground', false, 'Medium');
    const navigation = frame(top, 'Navigation', mobile ? 350 : 660, 24, 'HORIZONTAL');
    gap(navigation, '6', map);
    for (const v of ['Documentation', 'Components', 'Foundations', 'Dashboard'])
      label(
        navigation,
        v,
        mobile ? 12 : 13,
        v === 'Dashboard' ? 'semantic.foreground' : 'semantic.muted',
      );
    const work = row(root, 'AppShell / Topbar', width, mobile ? 56 : 64);
    work.paddingLeft = 24;
    work.paddingRight = 24;
    border(work, 'semantic.border', map);
    work.strokeTopWeight = 0;
    work.strokeLeftWeight = 0;
    work.strokeRightWeight = 0;
    if (mobile) button(work, 'Menu', 'ghost', 'sm');
    const orbit = frame(work, 'Orbit', 28, 28, 'HORIZONTAL');
    orbit.primaryAxisSizingMode = 'FIXED';
    orbit.primaryAxisAlignItems = 'CENTER';
    orbit.counterAxisAlignItems = 'CENTER';
    fill(orbit, 'semantic.accent', map);
    bind(orbit, 'cornerRadius', 'radius.md', map);
    label(orbit, 'o', 20, 'semantic.accent-foreground', false, 'Medium');
    label(work, 'Orbit', 13, 'semantic.foreground', false, 'Medium');
    if (!mobile) label(work, '/  Workspace', 13, 'semantic.muted');
    const body = frame(root, 'AppShell / Body', width, 100, 'HORIZONTAL');
    body.itemSpacing = 0;
    body.counterAxisAlignItems = 'MIN';
    if (!mobile) {
      const sidebar = frame(body, 'AppShell / Sidebar', 224);
      padding(sidebar, '5', map);
      gap(sidebar, '6', map);
      fill(sidebar, 'semantic.inset', map);
      label(sidebar, 'Orbit workspace', 12, 'semantic.foreground', false, 'Medium');
      label(sidebar, 'Foundation demo', 10, 'semantic.muted');
      for (const [title, iconName] of [
        ['Overview', 'IconLayoutDashboard'],
        ['Orders', 'IconShoppingBag'],
        ['Revenue', 'IconChartBar'],
        ['Activity', 'IconActivity'],
      ]) {
        const nav = row(sidebar, title, 184, 40);
        padding(nav, '3', map);
        if (title === 'Overview') {
          fill(nav, 'semantic.accent-soft', map);
          bind(nav, 'cornerRadius', 'radius.sm', map);
        }
        icon(nav, iconName, map, title === 'Overview' ? 'semantic.accent' : 'semantic.muted');
        label(nav, title, 13, title === 'Overview' ? 'semantic.accent' : 'semantic.muted');
      }
      label(
        sidebar,
        'One system.\nReady for your product.',
        14,
        'semantic.foreground',
        false,
        'Regular',
        180,
      );
      label(sidebar, 'Explore the components ↗', 11, 'semantic.accent');
      const profile = row(sidebar, 'Profile', 180, 48);
      avatar(profile, 'AM');
      label(profile, 'Alex Morgan\nDemo account', 11, 'semantic.muted');
    }
    const main = frame(body, 'AppShell / Main', mobile ? 390 : 1216);
    padding(main, mobile ? '4' : '8', map);
    gap(main, '6', map);
    const content = mobile ? 358 : 1152;
    label(main, 'Orbit workspace  /  Overview', 11, 'semantic.muted');
    const heading = frame(
      main,
      'Dashboard / Heading',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    heading.counterAxisAlignItems = mobile ? 'MIN' : 'CENTER';
    gap(heading, '6', map);
    const headingText = frame(heading, 'Heading', mobile ? 358 : 700);
    gap(headingText, '2', map);
    label(
      headingText,
      'Workspace overview',
      mobile ? 25 : 28,
      'semantic.foreground',
      false,
      'Medium',
    );
    label(
      headingText,
      'A clear view of your business, down to the details.',
      mobile ? 12 : 13,
      'semantic.muted',
      false,
      'Regular',
      mobile ? 350 : 650,
    );
    const actions = frame(heading, 'Actions', mobile ? 358 : 290, 36, 'HORIZONTAL');
    actions.counterAxisAlignItems = 'CENTER';
    gap(actions, '3', map);
    button(actions, 'Oct 1–14, 2026');
    button(actions, 'Export');
    const metrics = frame(main, 'Dashboard / Metrics', content);
    gap(metrics, mobile ? '3' : '4', map);
    const metricValues = [
      ['Revenue', '$1,957', '13 paid orders'],
      ['Orders', '18', 'Across three plans'],
      ['Customers', '18', 'Unique sample customers'],
      ['Pending', '3', 'Awaiting payment'],
    ];
    for (let i = 0; i < (mobile ? 2 : 1); i++) {
      const metricRow = frame(metrics, 'Metric row', content, 138, 'HORIZONTAL');
      gap(metricRow, mobile ? '3' : '4', map);
      for (const [title, value, note] of metricValues.slice(
        mobile ? i * 2 : 0,
        mobile ? i * 2 + 2 : 4,
      )) {
        const n = instance(metricRow, shared.metric);
        n.resize(mobile ? 173 : 276, 138);
        n.setProperties({
          [metricKeys.Title]: title,
          [metricKeys.Value]: value,
          [metricKeys.Note]: note,
        });
      }
    }
    const middle = frame(
      main,
      'Dashboard / Panels',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    gap(middle, mobile ? '4' : '6', map);
    const revenue = panel(middle, 'Revenue over time', mobile ? 358 : 676);
    label(revenue, 'Revenue over time', 15, 'semantic.foreground', false, 'Medium');
    label(revenue, 'Paid orders · Oct 1–14, 2026', 11, 'semantic.muted');
    const chart = frame(revenue, 'Daily paid revenue', mobile ? 310 : 628, 180);
    chart.primaryAxisSizingMode = 'FIXED';
    chart.layoutMode = 'NONE';
    const values = Array.from({ length: 14 }, (_, i) =>
      ORDER_DATA.filter((o) => o.status === 'Paid' && Number(o.date.slice(-2)) === i + 1).reduce(
        (s, o) => s + o.amount,
        0,
      ),
    );
    const max = Math.max(...values, 300);
    for (let i = 0; i < 14; i++) {
      const bar = remember(figma.createRectangle());
      const h = (values[i] / max) * 130;
      bar.resize(mobile ? 10 : 22, Math.max(h, 0.01));
      bar.x = 20 + (i * (chart.width - 40)) / 14;
      bar.y = 145 - h;
      fill(bar, 'semantic.accent', map);
      bar.opacity = i === 13 ? 1 : 0.55;
      bar.cornerRadius = 2;
      chart.appendChild(bar);
      const t = label(chart, String(i + 1), 10, 'semantic.muted', true);
      t.x = bar.x;
      t.y = 160;
    }
    label(
      revenue,
      'October · Sample data     $1,957 selected period',
      10,
      'semantic.muted',
      false,
      'Regular',
      mobile ? 310 : 628,
    );
    const activity = panel(middle, 'Recent activity', mobile ? 358 : 452);
    label(activity, 'Recent activity', 15, 'semantic.foreground', false, 'Medium');
    label(activity, 'The latest in your workspace', 11, 'semantic.muted');
    for (const o of ORDER_DATA.slice(0, 3)) {
      const item = frame(
        activity,
        'Activity / ' + o.customer,
        mobile ? 310 : 404,
        100,
        'HORIZONTAL',
      );
      gap(item, '3', map);
      icon(item, 'IconCircleCheck', map, 'semantic.success');
      const lines = frame(item, 'Details', mobile ? 280 : 374);
      lines.itemSpacing = 4;
      label(
        lines,
        o.customer.split(' ')[0] +
          ' ' +
          (o.status === 'Paid' ? 'completed a payment' : 'started an order'),
        11,
        'semantic.foreground',
        false,
        'Regular',
        mobile ? 280 : 374,
      );
      label(
        lines,
        o.plan + ' plan · ' + money(o.amount) + ' · ' + date(o.date),
        10,
        'semantic.muted',
      );
    }
    label(activity, 'View all orders ↗', 11, 'semantic.accent');
    const orders = frame(main, 'Dashboard / Orders', content);
    orders.itemSpacing = 0;
    fill(orders, 'semantic.surface', map);
    border(orders, 'semantic.border', map);
    bind(orders, 'cornerRadius', 'radius.md', map);
    orders.clipsContent = true;
    const orderHeading = frame(orders, 'Orders heading', content);
    padding(orderHeading, '5', map);
    gap(orderHeading, '2', map);
    label(orderHeading, 'Orders  18', 15, 'semantic.foreground', false, 'Medium');
    label(orderHeading, 'Manage and review your recent transactions.', 11, 'semantic.muted');
    const toolbar = frame(
      orders,
      'Orders toolbar',
      content,
      100,
      mobile ? 'VERTICAL' : 'HORIZONTAL',
    );
    padding(toolbar, '5', map);
    gap(toolbar, '3', map);
    const search = row(toolbar, 'Search orders', mobile ? 318 : 290, 36);
    search.paddingLeft = 12;
    fill(search, 'component.field-bg', map);
    border(search, 'component.field-border', map);
    bind(search, 'cornerRadius', 'component.field-radius', map);
    icon(search, 'IconSearch', map);
    label(search, 'Search name, email, or order…', 14, 'semantic.muted');
    button(toolbar, 'All statuses');
    button(toolbar, 'Export CSV', 'secondary', 'sm');
    const table = frame(orders, 'Table / Orders', 1152);
    table.itemSpacing = 0;
    const header = row(table, 'Column headers', 1152, 40);
    header.itemSpacing = 0;
    fill(header, 'component.table-header-bg', map);
    for (const [i, title] of ['Order', 'Customer', 'Plan', 'Status', 'Amount', 'Date'].entries()) {
      const cell = row(header, title, cellWidths[i], 40);
      cell.paddingLeft = 20;
      label(cell, title, 12, 'semantic.muted', false, 'Medium');
    }
    for (const o of sorted) {
      const n = instance(table, shared.orderRow);
      n.setProperties({
        [propertyKeys.Order]: o.id,
        [propertyKeys.Customer]: o.customer,
        [propertyKeys.Initials]: o.initials,
        [propertyKeys.Email]: o.email,
        [propertyKeys.Plan]: o.plan,
        [propertyKeys.Amount]: money(o.amount),
        [propertyKeys.Date]: date(o.date),
      });
      const status = n.findAll((n) => n.type === 'INSTANCE' && n.name === 'Badge')[0];
      if (status) {
        const component = getVariant(sets.Badge, {
          Variant: o.status === 'Paid' ? 'success' : o.status === 'Pending' ? 'warning' : 'neutral',
          Size: 'sm',
        });
        status.swapComponent(component);
        const labelKey = Object.keys(sets.Badge.componentPropertyDefinitions).find((k) =>
          k.startsWith('Label#'),
        );
        status.setProperties({ [labelKey]: o.status });
      }
    }
    const pagination = frame(orders, 'Pagination', content, 60, mobile ? 'VERTICAL' : 'HORIZONTAL');
    padding(pagination, '4', map);
    gap(pagination, '3', map);
    label(pagination, '1–6 of 18 orders', 11, 'semantic.muted');
    label(pagination, 'Page 1 of 3    ‹    ›', 11, 'semantic.muted');
    label(
      main,
      'Illustrative data · No live business or payment connection',
      10,
      'semantic.muted',
      false,
      'Regular',
      content,
    );
    await reconcileDashboard(root, map, collections, sets, shared.metric);
    frames.push({ id: root.id, name: root.name, width: root.width, height: root.height });
  }
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frames,
    sharedComponents: { metric: shared.metric.id, orderRow: shared.orderRow.id },
    nativeEditable: true,
  });
}
