import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';
const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(path.join(root, 'apps/docs/package.json'));
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const base = process.env.ANTIFLEX_DOCS_URL || 'http://127.0.0.1:3161';
const slugs = [
  '',
  'analytics',
  'orders',
  'customers',
  'projects',
  'activity',
  'team',
  'settings',
  'profile',
  'billing',
  'checkout',
  'sign-in',
  'onboarding',
];
const dir = path.resolve(root, process.env.ANTIFLEX_CAPTURE_DIR || '.impeccable/review/showcase');
const publicDir = path.join(root, 'apps/docs/public/examples');
await fs.mkdir(dir, { recursive: true });
await fs.mkdir(publicDir, { recursive: true });
const browser = await chromium.launch();
const manifest = [];
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const slug of slugs) {
    const label = slug || 'overview';
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(base + '/demo' + (slug ? '/' + slug : ''));
    await page.locator('.demo-page h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const preview = await page.screenshot();
    await sharp(preview)
      .webp({ quality: 82 })
      .toFile(path.join(publicDir, `antiflex-${label}-${theme}.webp`));
    for (const [viewport, width, height] of [
      ['desktop', 1440, 1000],
      ['tablet', 768, 1000],
      ['mobile', 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => window.scrollTo(0, 0));
      const file = path.join(dir, `${label}-${theme}-${viewport}.png`);
      await page.screenshot({ path: file, fullPage: true });
      manifest.push({
        slug: label,
        theme,
        viewport,
        width,
        height,
        file: path.relative(root, file),
        status: response.status(),
        overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      });
    }
  }
  for (const slug of ['', 'analytics', 'customers']) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + '/demo' + (slug ? '/' + slug : '') + '?layout=top');
    await page.locator('.demo-page h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(dir, `${slug || 'overview'}-${theme}-top.png`);
    await page.screenshot({ path: file, fullPage: true });
    manifest.push({
      slug: slug || 'overview',
      theme,
      viewport: 'desktop-top',
      width: 1440,
      height: 1000,
      file: path.relative(root, file),
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
  }
  if (errors.length) throw Error('Render errors: ' + JSON.stringify(errors));
  await context.close();
}
await browser.close();
await fs.writeFile(
  path.resolve(root, process.env.ANTIFLEX_CAPTURE_MANIFEST || 'artifacts/showcase/captures.json'),
  JSON.stringify(manifest, null, 2),
);
if (manifest.some((m) => m.overflow))
  throw Error(
    'Page overflow: ' +
      JSON.stringify(
        manifest
          .filter((m) => m.overflow)
          .map(({ slug, theme, viewport }) => ({ slug, theme, viewport })),
      ),
  );
console.log(
  `Captured ${manifest.length} responsive views; wrote ${slugs.length * 2} actual demo previews. No page errors or document overflow.`,
);
