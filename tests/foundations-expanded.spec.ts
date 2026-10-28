import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import tokens from '../packages/tokens/src/tokens.json' with { type: 'json' };
const book = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
test('all 26 ramps and base colors are searchable, keyboard reachable, and copy in four formats', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: string) => {
          (window as unknown as { copiedColor: string }).copiedColor = text;
        },
      },
      configurable: true,
    });
  });
  await page.goto('/docs/foundations/colors');
  await expect(page.locator('.palette-ramp')).toHaveCount(27);
  await expect(page.locator('.palette-steps button')).toHaveCount(286);
  await page.getByLabel('Search palettes').fill('olive');
  await expect(page.locator('.palette-steps button')).toHaveCount(11);
  const shade = page.getByRole('button', { name: 'Copy olive 500', exact: true });
  await shade.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.foundation-status[role=status]')).toContainText('Copied olive 500');
  expect(
    await page.evaluate(() => (window as unknown as { copiedColor: string }).copiedColor),
  ).toBe('var(--af-palette-olive-500)');
  for (const [format, expected] of [
    ['oklch', tokens.primitives.palette.olive['500']],
    ['tailwind', 'bg-af-olive-500'],
  ]) {
    await page.getByLabel('Copy format').selectOption(format);
    await shade.click();
    await expect(page.getByTestId('selected-color-value')).toHaveText(expected);
  }
  await page.getByLabel('Copy format').selectOption('hex');
  await shade.click();
  await expect(page.getByTestId('selected-color-value')).toHaveText(/^#[0-9a-f]{6}$/);
  await page.getByLabel('Search palettes').fill('not-a-palette');
  await expect(page.getByRole('heading', { name: 'No palettes found' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(page.locator('.palette-steps button')).toHaveCount(286);
  await page.getByRole('button', { name: 'Copy transparent', exact: true }).click();
  await expect(page.getByTestId('selected-color-value')).toHaveText('#00000000');
});
test('clipboard denial keeps the selected token available for manual copying', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async () => {
          throw Error('Denied');
        },
      },
    }),
  );
  await page.goto('/docs/foundations/colors');
  await page.getByRole('button', { name: 'Copy blue 500', exact: true }).click();
  await expect(page.locator('.foundation-status[role=status]')).toContainText('Copy unavailable');
  await expect(page.getByTestId('selected-color-value')).toHaveText('var(--af-palette-blue-500)');
});
test('typography playground applies real size, weight, leading, tracking, italic and numeric settings', async ({
  page,
}) => {
  await page.goto('/docs/foundations/typography');
  const preview = page.getByRole('region', { name: 'Typography preview' }).locator('p');
  await page.getByLabel('Sample text').fill('Aa 0123456789');
  await page.getByLabel('Font size', { exact: true }).selectOption('9xl');
  await page.getByLabel('Font weight', { exact: true }).selectOption('900');
  await page.getByLabel('Line height', { exact: true }).selectOption('relaxed');
  await page.getByLabel('Letter spacing', { exact: true }).selectOption('tight');
  await page.getByLabel('Italic', { exact: true }).check();
  await page.getByLabel('Numeric figures').selectOption('tabular-nums');
  await expect(preview).toHaveCSS('font-size', '128px');
  await expect(preview).toHaveCSS('font-weight', '900');
  await expect(preview).toHaveCSS('line-height', '208px');
  await expect(preview).toHaveCSS('letter-spacing', '-3.2px');
  await expect(preview).toHaveCSS('font-style', 'italic');
  await expect(preview).toHaveCSS('font-variant-numeric', 'tabular-nums');
  await page.getByLabel('Font family', { exact: true }).selectOption('mono');
  await expect(page.getByLabel('Font weight', { exact: true })).toHaveValue('400');
  await expect(
    page.getByLabel('Font weight', { exact: true }).locator('option[value="900"]'),
  ).toBeDisabled();
  await expect(preview).toHaveCSS('font-family', /Space Mono/);
});
test('Tailwind utilities compile with correct typed token units while core theme stays stable', async ({
  page,
}) => {
  await page.goto('/docs/foundations/typography');
  const css = await page.evaluate(() => {
    const sample = document.createElement('div');
    sample.className =
      'text-af-xl font-af-bold leading-af-relaxed tracking-af-tight bg-af-blue-500';
    document.body.append(sample);
    const style = getComputedStyle(sample);
    const result = {
      size: style.fontSize,
      weight: style.fontWeight,
      leading: style.lineHeight,
      tracking: style.letterSpacing,
      background: style.backgroundColor,
      action: getComputedStyle(document.documentElement)
        .getPropertyValue('--af-semantic-action')
        .trim(),
    };
    sample.remove();
    return result;
  });
  expect(css.size).toBe('20px');
  expect(css.weight).toBe('700');
  expect(css.leading).toBe('32.5px');
  expect(css.tracking).toBe('-0.5px');
  expect(css.background).not.toMatch(/rgba?\(0, 0, 0(, 0)?\)/);
  expect(css.action).toBe('#171717');
});
for (const theme of ['light', 'dark'])
  test(`expanded foundations ${theme} support mobile, tablet, desktop and accessible content`, async ({
    page,
  }) => {
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    for (const viewport of [
      { width: 320, height: 800 },
      { width: 390, height: 844 },
      { width: 768, height: 900 },
      { width: 1440, height: 1000 },
    ]) {
      await page.setViewportSize(viewport);
      for (const route of ['colors', 'typography']) {
        await page.goto('/docs/foundations/' + route);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        if (viewport.width === 390)
          expect(
            (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
              .violations,
          ).toEqual([]);
      }
    }
  });
test('new foundation stories render in both themes without errors or mobile overflow', async ({
  page,
  request,
}) => {
  const index = await (await request.get(book + '/index.json')).json();
  const stories = Object.values(index.entries).filter(
    (e: any) => e.type === 'story' && e.id.startsWith('foundations-'),
  ) as { id: string }[];
  expect(stories.length).toBe(7);
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewportSize({ width: 390, height: 844 });
  for (const theme of ['light', 'dark'])
    for (const { id } of stories) {
      await page.goto(`${book}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await expect(page.locator(`#storybook-root [data-theme="${theme}"]`)).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      expect(
        (
          await new AxeBuilder({ page })
            .include('#storybook-root')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
  expect(errors).toEqual([]);
});
