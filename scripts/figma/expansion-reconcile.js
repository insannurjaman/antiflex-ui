await fonts();
// Read existing IDs from the phase ledgers before invoking this script.
const page = await figma.getNodeByIdAsync('104:27');
await figma.setCurrentPageAsync(page);
const calendarSet = await figma.getNodeByIdAsync('104:391');
const daySet = await figma.getNodeByIdAsync('104:41');
const key = Object.keys(daySet.componentPropertyDefinitions).find((k) => k.startsWith('Day#'));
for (const calendar of calendarSet.children.filter((c) => c.type === 'COMPONENT')) {
  const days = calendar.findAll((n) => n.type === 'INSTANCE' && n.name === daySet.name);
  for (let i = 0; i < days.length; i++) {
    const day = new Date(Date.UTC(2026, 8, 27 + i)).getUTCDate();
    days[i].setProperties({ [key]: String(day) });
    mutatedNodeIds.push(days[i].id);
  }
  const title = calendar.findOne((n) => n.type === 'TEXT' && n.characters === 'October 2026');
  title.textAlignHorizontal = 'CENTER';
  mutatedNodeIds.push(title.id);
}
const pickerSet = await figma.getNodeByIdAsync('105:968');
const valueKey = Object.keys(pickerSet.componentPropertyDefinitions).find((k) =>
  k.startsWith('Value#'),
);
for (const n of page.findAll((n) => n.type === 'INSTANCE' && n.name === 'DatePicker')) {
  if (['Selected', 'Open'].includes(n.variantProperties.State)) {
    n.setProperties({ [valueKey]: 'Oct 23, 2026' });
    mutatedNodeIds.push(n.id);
  }
}
for (const n of pickerSet.findAll((n) => n.type === 'INSTANCE' && n.name === 'Calendar')) {
  n.setBoundVariable('minWidth', null);
  n.minWidth = null;
  n.resize(294, n.height);
  mutatedNodeIds.push(n.id);
}
return result({ pageId: page.id, correctedCalendarLabels: true });
