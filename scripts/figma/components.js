async function buildComponents() {
  await fonts();
  const page = await pageFor('Chamfer / Components');
  const { map, collections } = await tokenMap();
  if (!map['semantic.accent']) throw new Error('Run foundations first.');
  const existing = page.children.find((n) => n.name === 'Chamfer / Component specimens');
  if (existing) return result({ pageId: page.id, frameId: existing.id, alreadyExists: true });
  const sets = {};
  let y = 200;
  function component(name, width, height, direction = 'HORIZONTAL') {
    const c = remember(figma.createComponent());
    c.name = name;
    c.layoutMode = direction;
    c.resize(width, height);
    c.primaryAxisSizingMode = 'FIXED';
    c.counterAxisSizingMode = 'FIXED';
    c.primaryAxisAlignItems = 'CENTER';
    c.counterAxisAlignItems = 'CENTER';
    c.fills = [];
    c.x = 200;
    c.y = y;
    page.appendChild(c);
    return c;
  }
  function group(name, variants, columns = 3) {
    const set = remember(figma.combineAsVariants(variants, page));
    set.name = name;
    set.description =
      'Matches the original React ' +
      name.split('/')[0].trim() +
      ' component. Native states, token bindings, and shared names.';
    set.x = 200;
    set.y = y;
    const width = Math.max(...variants.map((v) => v.width));
    const height = Math.max(...variants.map((v) => v.height));
    variants.forEach((v, i) => {
      v.x = 24 + (i % columns) * (width + 24);
      v.y = 24 + Math.floor(i / columns) * (height + 24);
    });
    set.resize(
      columns * (width + 24) + 24,
      Math.ceil(variants.length / columns) * (height + 24) + 24,
    );
    y += set.height + 64;
    sets[name] = set;
    return set;
  }
  function labelProperty(set, name = 'Label', defaultValue = 'Label', nodeName = 'Label') {
    const key = set.addComponentProperty(name, 'TEXT', defaultValue);
    for (const c of set.children)
      for (const t of c.findAll((n) => n.type === 'TEXT' && n.name === nodeName)) {
        let ancestor = t.parent;
        let insideInstance = false;
        while (ancestor && ancestor !== c) {
          if (ancestor.type === 'INSTANCE') {
            insideInstance = true;
            break;
          }
          ancestor = ancestor.parent;
        }
        if (!insideInstance) t.componentPropertyReferences = { characters: key };
      }
  }
  for (const variant of ['primary', 'secondary', 'ghost', 'danger']) {
    const variants = [];
    for (const size of ['sm', 'md', 'lg'])
      for (const state of ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading']) {
        const height = { sm: 32, md: 36, lg: 44 }[size];
        const c = component(
          `Size=${size}, State=${state}`,
          size === 'sm' ? 130 : size === 'md' ? 150 : 176,
          height,
        );
        gap(c, '2', map);
        c.primaryAxisSizingMode = 'AUTO';
        const inset = { sm: '3', md: '4', lg: '5' }[size];
        bind(c, 'paddingLeft', 'space.' + inset, map);
        bind(c, 'paddingRight', 'space.' + inset, map);
        bind(c, 'cornerRadius', 'component.button-radius', map);
        bind(c, 'height', 'component.button-height-' + size, map);
        const bg =
          variant === 'primary'
            ? state === 'Hover'
              ? 'component.button-bg-hover'
              : 'component.button-bg'
            : variant === 'secondary'
              ? state === 'Hover'
                ? 'semantic.subtle'
                : 'semantic.surface'
              : variant === 'danger'
                ? 'semantic.danger-soft'
                : null;
        const fg =
          variant === 'primary'
            ? 'component.button-fg'
            : variant === 'danger'
              ? 'semantic.danger'
              : variant === 'ghost'
                ? 'semantic.muted'
                : 'semantic.foreground';
        if (bg) fill(c, bg, map);
        if (variant === 'ghost' && state === 'Hover') fill(c, 'semantic.subtle', map);
        if (variant === 'secondary') border(c, 'semantic.border-strong', map);
        if (variant === 'danger' && state === 'Hover') border(c, 'semantic.danger', map);
        if (state === 'Focus') {
          border(c, 'semantic.focus', map);
          c.strokeWeight = 2;
          c.strokeAlign = 'OUTSIDE';
        }
        if (state === 'Disabled') c.opacity = 0.5;
        if (state === 'Loading') {
          const spinner = remember(figma.createEllipse());
          spinner.resize(12, 12);
          spinner.fills = [];
          spinner.strokes = [paint(map[fg])];
          spinner.strokeWeight = 2;
          spinner.arcData = { startingAngle: 0, endingAngle: Math.PI * 1.5, innerRadius: 0 };
          c.appendChild(spinner);
        }
        const label = text(
          c,
          state === 'Loading' ? 'Save changes' : 'Save changes',
          size === 'sm' ? 12 : 14,
          fg,
          map,
          false,
          'Medium',
        );
        label.name = 'Label';
        label.lineHeight = { unit: 'PERCENT', value: 100 };
        variants.push(c);
      }
    const set = group('Button / ' + variant, variants, 3);
    labelProperty(set, 'Label', 'Save changes');
  }
  const fields = [];
  for (const size of ['sm', 'md', 'lg'])
    for (const state of ['Default', 'Focus', 'Error', 'Disabled', 'Filled']) {
      const c = component(`Size=${size}, State=${state}`, 320, 100, 'VERTICAL');
      c.primaryAxisSizingMode = 'AUTO';
      c.primaryAxisAlignItems = 'MIN';
      c.counterAxisAlignItems = 'MIN';
      gap(c, '2', map);
      const label = text(c, 'Project name', 14, 'semantic.foreground', map, false, 'Medium');
      label.name = 'Label';
      const control = frame(c, 'Control', 320, { sm: 32, md: 36, lg: 44 }[size], 'HORIZONTAL');
      control.primaryAxisSizingMode = 'FIXED';
      control.counterAxisAlignItems = 'CENTER';
      control.paddingLeft = 12;
      control.paddingRight = 12;
      fill(control, 'component.field-bg', map);
      border(control, state === 'Error' ? 'semantic.danger' : 'component.field-border', map);
      bind(control, 'cornerRadius', 'component.field-radius', map);
      if (state === 'Focus') {
        border(control, 'semantic.focus', map);
        control.strokeWeight = 2;
        control.strokeAlign = 'OUTSIDE';
      }
      const placeholder = text(
        control,
        state === 'Filled' ? 'Orbit workspace' : 'A new workspace',
        14,
        state === 'Filled' ? 'semantic.foreground' : 'semantic.muted',
        map,
      );
      placeholder.name = 'Value';
      const hint = text(
        c,
        state === 'Error' ? 'Enter a project name.' : 'Choose a name your team will recognize.',
        12,
        state === 'Error' ? 'semantic.danger' : 'semantic.muted',
        map,
      );
      hint.name = 'Hint';
      if (state === 'Disabled') control.opacity = 0.5;
      fields.push(c);
    }
  const fieldSet = group('TextField', fields);
  labelProperty(fieldSet, 'Label', 'Project name');
  labelProperty(fieldSet, 'Value', 'A new workspace', 'Value');
  labelProperty(fieldSet, 'Hint', 'Choose a name your team will recognize.', 'Hint');
  const badges = [];
  for (const variant of ['neutral', 'accent', 'success', 'warning', 'danger'])
    for (const size of ['sm', 'md']) {
      const c = component(`Variant=${variant}, Size=${size}`, 100, size === 'sm' ? 19 : 22);
      c.primaryAxisSizingMode = 'AUTO';
      c.paddingLeft = size === 'sm' ? 6 : 8;
      c.paddingRight = c.paddingLeft;
      bind(c, 'cornerRadius', 'radius.sm', map);
      fill(
        c,
        variant === 'neutral'
          ? 'semantic.subtle'
          : 'semantic.' + (variant === 'accent' ? 'accent-soft' : variant + '-soft'),
        map,
      );
      const label = text(
        c,
        {
          neutral: 'Draft',
          accent: 'New',
          success: 'Active',
          warning: 'In review',
          danger: 'Failed',
        }[variant],
        size === 'sm' ? 11 : 12,
        variant === 'neutral' ? 'semantic.muted' : 'semantic.' + variant,
        map,
        false,
        'Medium',
      );
      label.name = 'Label';
      badges.push(c);
    }
  const badgeSet = group('Badge', badges, 2);
  labelProperty(badgeSet, 'Label', 'Active');
  const cards = [];
  for (const variant of ['outline', 'subtle'])
    for (const value of ['none', 'sm', 'md', 'lg']) {
      const c = component(`Variant=${variant}, Padding=${value}`, 320, 150, 'VERTICAL');
      c.primaryAxisSizingMode = 'AUTO';
      c.primaryAxisAlignItems = 'MIN';
      c.counterAxisAlignItems = 'MIN';
      gap(c, '2', map);
      padding(c, { none: '0', sm: '3', md: '5', lg: '6' }[value], map);
      fill(c, variant === 'subtle' ? 'semantic.subtle' : 'component.card-bg', map);
      if (variant === 'outline') border(c, 'component.card-border', map);
      bind(c, 'cornerRadius', 'component.card-radius', map);
      const title = text(c, 'Workspace', 20, 'semantic.foreground', map, false, 'Medium');
      title.name = 'Label';
      text(
        c,
        'Give related content a clear boundary.',
        14,
        'semantic.muted',
        map,
        false,
        'Regular',
        270,
      );
      cards.push(c);
    }
  const cardSet = group('Card', cards, 2);
  labelProperty(cardSet, 'Label', 'Workspace');
  const separators = [];
  for (const orientation of ['horizontal', 'vertical'])
    for (const decorative of ['true', 'false']) {
      const c = component(
        `Orientation=${orientation}, Decorative=${decorative}`,
        orientation === 'horizontal' ? 240 : 1,
        orientation === 'horizontal' ? 1 : 48,
      );
      fill(c, 'semantic.border', map);
      separators.push(c);
    }
  group('Separator', separators, 2);
  const skeletons = [];
  for (const size of ['short', 'long']) {
    const c = component(`Width=${size}`, size === 'short' ? 160 : 240, 16);
    fill(c, 'semantic.subtle', map);
    bind(c, 'cornerRadius', 'radius.sm', map);
    skeletons.push(c);
  }
  group('Skeleton', skeletons, 2);
  const tables = [];
  for (const state of ['Default', 'Empty', 'Loading']) {
    const c = component(`State=${state}`, 640, 200, 'VERTICAL');
    c.primaryAxisSizingMode = 'AUTO';
    c.primaryAxisAlignItems = 'MIN';
    c.counterAxisAlignItems = 'MIN';
    c.itemSpacing = 0;
    fill(c, 'semantic.surface', map);
    const caption = text(c, 'Sample projects', 12, 'semantic.muted', map);
    caption.name = 'Label';
    const header = frame(c, 'Header', 640, 40, 'HORIZONTAL');
    header.primaryAxisSizingMode = 'FIXED';
    header.counterAxisAlignItems = 'CENTER';
    header.itemSpacing = 0;
    fill(header, 'component.table-header-bg', map);
    border(header, 'component.table-border', map);
    for (const [label, w] of [
      ['Project', 260],
      ['Status', 160],
      ['Owner', 220],
    ]) {
      const cell = frame(header, label, w, 40, 'HORIZONTAL');
      cell.primaryAxisSizingMode = 'FIXED';
      cell.counterAxisAlignItems = 'CENTER';
      cell.paddingLeft = 20;
      text(cell, label, 12, 'semantic.muted', map, false, 'Medium');
    }
    if (state === 'Empty') text(c, 'No projects yet.', 14, 'semantic.muted', map);
    else
      for (const [project, status, owner] of [
        ['Atlas', 'Active', 'Alex Kim'],
        ['Meridian', 'In review', 'Sam Rivera'],
        ['Forma', 'Active', 'Jordan Lee'],
      ]) {
        const row = frame(c, 'Row / ' + project, 640, 52, 'HORIZONTAL');
        row.primaryAxisSizingMode = 'FIXED';
        row.counterAxisAlignItems = 'CENTER';
        row.itemSpacing = 0;
        border(row, 'component.table-border', map);
        for (const [label, w] of [
          [project, 260],
          [status, 160],
          [owner, 220],
        ]) {
          const cell = frame(row, 'Cell', w, 52, 'HORIZONTAL');
          cell.primaryAxisSizingMode = 'FIXED';
          cell.counterAxisAlignItems = 'CENTER';
          cell.paddingLeft = 20;
          if (state === 'Loading') {
            const block = remember(figma.createRectangle());
            block.resize(100, 16);
            fill(block, 'semantic.subtle', map);
            bind(block, 'cornerRadius', 'radius.sm', map);
            cell.appendChild(block);
          } else if (label === status)
            instance(
              cell,
              getVariant(badgeSet, {
                Variant: status === 'Active' ? 'success' : 'warning',
                Size: 'md',
              }),
              status,
            );
          else text(cell, label, 14, 'semantic.foreground', map);
        }
      }
    tables.push(c);
  }
  const tableSet = group('Table', tables, 1);
  labelProperty(tableSet, 'Caption', 'Sample projects');
  const shells = [];
  for (const viewport of ['Desktop', 'Mobile']) {
    const width = viewport === 'Desktop' ? 720 : 390;
    const c = component(`Viewport=${viewport}`, width, 300, 'VERTICAL');
    c.itemSpacing = 0;
    fill(c, 'semantic.canvas', map);
    const top = frame(c, 'Topbar', width, 64, 'HORIZONTAL');
    top.primaryAxisSizingMode = 'FIXED';
    top.counterAxisAlignItems = 'CENTER';
    top.paddingLeft = 24;
    border(top, 'semantic.border', map);
    if (viewport === 'Mobile')
      instance(top, getVariant(sets['Button / ghost'], { Size: 'sm', State: 'Default' }), 'Menu');
    text(top, 'Sample workspace', 14, 'semantic.foreground', map, false, 'Medium');
    const body = frame(c, 'Body', width, 236, 'HORIZONTAL');
    body.primaryAxisSizingMode = 'FIXED';
    body.itemSpacing = 0;
    if (viewport === 'Desktop') {
      const sidebar = frame(body, 'Sidebar', 224, 236);
      sidebar.primaryAxisSizingMode = 'FIXED';
      padding(sidebar, '5', map);
      fill(sidebar, 'semantic.inset', map);
      text(sidebar, 'Overview', 14, 'semantic.accent', map);
      text(sidebar, 'Projects', 14, 'semantic.muted', map);
    }
    const main = frame(body, 'Main', width - (viewport === 'Desktop' ? 224 : 0), 236);
    main.primaryAxisSizingMode = 'FIXED';
    padding(main, '8', map);
    text(main, 'Overview', 20, 'semantic.foreground', map, false, 'Medium');
    text(
      main,
      'A frame for your primary task.',
      14,
      'semantic.muted',
      map,
      false,
      'Regular',
      main.width - 64,
    );
    shells.push(c);
  }
  group('AppShell', shells, 1);
  const review = frame(page, 'Chamfer / Component specimens', 1240);
  review.x = 1700;
  review.y = 200;
  padding(review, '12', map);
  gap(review, '8', map);
  fill(review, 'semantic.canvas', map);
  text(
    review,
    'Original components. Complete details.',
    40,
    'semantic.foreground',
    map,
    false,
    'Medium',
  );
  text(
    review,
    'Token-bound instances in light and dark modes. Main components remain outside this review frame.',
    14,
    'semantic.muted',
    map,
    false,
    'Regular',
    1144,
  );
  for (const mode of ['Light', 'Dark']) {
    const sheet = frame(review, mode + ' / Specimens', 1144);
    padding(sheet, '6', map);
    gap(sheet, '6', map);
    setTheme(sheet, collections, mode);
    fill(sheet, 'semantic.canvas', map);
    border(sheet, 'semantic.border', map);
    bind(sheet, 'cornerRadius', 'radius.md', map);
    text(sheet, mode + ' theme', 28, 'semantic.foreground', map, false, 'Medium');
    for (const [label, name, props] of [
      ['Button', 'Button / primary', { Size: 'md', State: 'Default' }],
      ['TextField', 'TextField', { Size: 'md', State: 'Default' }],
      ['Badge', 'Badge', { Variant: 'success', Size: 'md' }],
      ['Card', 'Card', { Variant: 'outline', Padding: 'md' }],
      ['Separator', 'Separator', { Orientation: 'horizontal', Decorative: 'false' }],
      ['Skeleton', 'Skeleton', { Width: 'long' }],
      ['Table', 'Table', { State: 'Default' }],
      ['AppShell', 'AppShell', { Viewport: 'Desktop' }],
    ]) {
      const section = frame(sheet, label, 1096);
      gap(section, '3', map);
      text(section, label, 16, 'semantic.foreground', map, false, 'Medium');
      instance(section, getVariant(sets[name], props));
    }
  }
  await bindTypography(page, map);
  return result({
    pageId: page.id,
    frameId: review.id,
    sets: Object.fromEntries(
      Object.entries(sets).map(([name, set]) => [
        name,
        { id: set.id, variants: set.children.length },
      ]),
    ),
    bounds: { width: review.width, height: review.height },
  });
}
