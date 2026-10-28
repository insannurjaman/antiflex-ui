import catalog from './catalog.json';
/** Public inventory. Only implemented component families belong here. */
export const componentCatalog = Object.entries(catalog)
  .map(([slug, item]) => ({ slug, name: item.name }))
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
export const componentCount = componentCatalog.length;
