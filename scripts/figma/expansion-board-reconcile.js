await fonts();
const page = await figma.getNodeByIdAsync(PAGE_ID);
await figma.setCurrentPageAsync(page);
const style = (await figma.getLocalTextStylesAsync()).find(
  (s) => s.name === 'antiflex / Type weight / medium',
);
await figma.loadFontAsync(style.fontName);
for (const frame of page.children.filter((n) => n.type === 'FRAME')) {
  const title = frame.children.find((n) => n.type === 'TEXT' && n.fontSize === 24);
  if (title) {
    await title.setTextStyleIdAsync(style.id);
    mutatedNodeIds.push(title.id);
  }
}
if (PAGE_ID === '101:2') {
  const n = await figma.getNodeByIdAsync('101:230');
  n.y = 2300;
  mutatedNodeIds.push(n.id);
}
return result({ pageId: page.id });
