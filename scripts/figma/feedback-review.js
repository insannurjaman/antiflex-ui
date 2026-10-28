const review = [];
for (const theme of ['Light', 'Dark'])
  for (let group = 0; group < 3; group++) {
    const name = `Feedback / Review ${group + 1} / ${theme}`;
    let root = page.children.find((n) => n.name === name);
    if (root) {
      review.push({ id: root.id, name: root.name, width: root.width, height: root.height });
      continue;
    }
    root = auto(page, name, 1200);
    padding(root, 8, map);
    gap(root, 6, map);
    fill(root, 'semantic.canvas', map);
    setTheme(root, collections, theme);
    root.x = 40 + (theme === 'Dark' ? 1320 : 0);
    root.y = 40 + group * 3000;
    await tx(root, 'antiflex / Feedback and navigation', 'Heading');
    await tx(
      root,
      `15 original families · ${theme} theme · ${['Feedback and identity', 'Navigation and disclosure', 'Choices and content'][group]}`,
      'Body',
      'semantic.muted',
    );
    for (const family of ALL_FEEDBACK_FAMILIES.slice(group * 5, group * 5 + 5)) {
      const section = auto(root, family + ' / States', 1136);
      gap(section, 4, map);
      await tx(section, family, 'Form label');
      const samples = sets[family].children.filter(
        (n) =>
          n.type === 'COMPONENT' &&
          (!n.variantProperties.Size || n.variantProperties.Size === 'md') &&
          (family !== 'Accordion' ||
            n.variantProperties.Type === 'single' ||
            n.variantProperties.State === 'Open'),
      );
      for (let i = 0; i < samples.length; i += 2) {
        const row = auto(section, 'State row', 1136, 'HORIZONTAL');
        gap(row, 6, map);
        for (const source of samples.slice(i, i + 2)) {
          const cell = auto(row, 'Specimen / ' + source.name, 548);
          gap(cell, 3, map);
          await tx(cell, source.name, 'Form help', 'semantic.muted', 548);
          const sample = instance(cell, source);
          const textValues = {};
          for (const t of source.findAllWithCriteria({ types: ['TEXT'] })) {
            const property = t.componentPropertyReferences.characters;
            if (property) textValues[property] = t.characters;
          }
          if (Object.keys(textValues).length) sample.setProperties(textValues);
        }
      }
    }
    review.push({ id: root.id, name: root.name, width: root.width, height: root.height });
  }
return result({
  pageId: page.id,
  review,
  families: Object.entries(sets).map(([name, set]) => ({
    name,
    id: set.id,
    variants: set.children.length,
  })),
  variables: Object.keys(map).length,
});
