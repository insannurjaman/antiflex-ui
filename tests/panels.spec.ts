import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const book = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
const story = (id: string, theme = 'light') =>
  `${book}/iframe.html?id=components-${id}&viewMode=story&globals=theme:${theme}`;

test('sheet validates, saves, discards a cancelled draft, and restores focus', async ({ page }) => {
  await page.goto('/docs/components/sheet');
  const trigger = page.getByRole('button', { name: 'Edit workspace settings', exact: true });
  await trigger.click();
  const panel = page.getByRole('dialog', { name: 'Workspace settings', exact: true });
  const input = panel.getByRole('textbox', { name: 'Workspace name' });
  await expect(input).toBeFocused();
  await expect(panel).toHaveAccessibleDescription(/Update this sample workspace/);
  await input.fill('   ');
  await panel.getByRole('button', { name: 'Save settings' }).click();
  await expect(panel).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill('Atlas workspace');
  await panel.getByLabel('Visibility', { exact: true }).selectOption('Team');
  await panel.getByRole('button', { name: 'Save settings' }).click();
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('.floating-specimen [role="status"]')).toContainText(
    'Workspace settings saved.',
  );
  await trigger.click();
  await expect(input).toHaveValue('Atlas workspace');
  await input.fill('Unsaved draft');
  await panel.getByRole('button', { name: 'Cancel', exact: true }).click();
  await trigger.click();
  await expect(input).toHaveValue('Atlas workspace');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

for (const format of ['CSV', 'JSON'])
  test(`drawer downloads a real local ${format} file and returns focus`, async ({ page }) => {
    await page.goto('/docs/components/drawer');
    const trigger = page.getByRole('button', { name: 'Export sample records', exact: true });
    await trigger.click();
    const panel = page.getByRole('dialog', { name: 'Export project records' });
    await panel.getByRole('radio', { name: format, exact: true }).check();
    const pending = page.waitForEvent('download');
    await panel.getByRole('button', { name: `Download ${format}` }).click();
    const download = await pending;
    expect(download.suggestedFilename()).toBe(`antiflex-sample-projects.${format.toLowerCase()}`);
    const stream = await download.createReadStream();
    let contents = '';
    for await (const chunk of stream!) contents += chunk.toString();
    if (format === 'JSON') expect(JSON.parse(contents)).toHaveLength(2);
    else expect(contents.split('\n')).toHaveLength(3);
    expect(contents).toContain('Orbit workspace');
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(page.locator('.floating-specimen [role="status"]')).toContainText(
      `Sample ${format} downloaded.`,
    );
  });

for (const side of ['right', 'left', 'top', 'bottom'])
  test(`sheet stays on physical ${side} edge`, async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.goto(story(`sheet--${side}`));
    const panel = page.getByRole('dialog');
    await expect(panel).toBeVisible();
    const box = (await panel.boundingBox())!;
    if (side === 'left' || side === 'right') {
      expect(box.width).toBe(448);
      expect(box.height).toBe(800);
      expect(box.x).toBe(side === 'left' ? 0 : 652);
    } else {
      expect(box.width).toBe(1100);
      expect(box.height).toBe(480);
      expect(box.y).toBe(side === 'top' ? 0 : 320);
    }
  });

test('sheet contains keyboard focus, ignores inner-to-backdrop drags, and dismisses outside', async ({
  page,
}) => {
  await page.goto(story('sheet--default'));
  const trigger = page.getByRole('button', { name: 'Open workspace sheet' });
  await trigger.click();
  const panel = page.getByRole('dialog');
  const input = panel.getByRole('textbox');
  const close = panel.getByRole('button', { name: 'Close sheet' });
  expect(await panel.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await input.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(input).toBeFocused();
  const box = (await panel.boundingBox())!;
  await page.mouse.move(box.x + 20, 20);
  await page.mouse.down();
  await page.mouse.move(2, 2);
  await page.mouse.up();
  await expect(panel).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('nested drawer closes one layer and retains parent scroll lock', async ({ page }) => {
  await page.goto(story('sheet--nested'));
  const parent = page.getByRole('dialog', { name: 'Workspace settings', exact: true });
  const trigger = parent.getByRole('button', { name: 'Open export drawer' });
  await trigger.click();
  const child = page.getByRole('dialog', { name: 'Export options', exact: true });
  await page.keyboard.press('Escape');
  await expect(child).toBeHidden();
  await expect(parent).toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(parent).toBeHidden();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

test('controlled owner can decline Escape, outside, and Close requests', async ({ page }) => {
  await page.goto(story('sheet--controlled-refusal'));
  await page.getByRole('button', { name: 'Open controlled sheet' }).click();
  const panel = page.getByRole('dialog');
  await page.keyboard.press('Escape');
  await expect(panel).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(panel).toBeVisible();
  await panel.getByRole('button', { name: 'Request close' }).click();
  await expect(panel).toBeVisible();
  await panel.getByRole('button', { name: 'Close from owner' }).click();
  await expect(panel).toBeHidden();
});

test('outside dismissal can be disabled while Escape still closes', async ({ page }) => {
  await page.goto(story('sheet--outside-disabled'));
  const panel = page.getByRole('dialog');
  await expect(panel).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
});

test('drawer native form validates before completion and synchronizes state', async ({ page }) => {
  await page.goto(story('drawer--native-completion'));
  const trigger = page.getByRole('button', { name: 'Open native export form' });
  await trigger.click();
  const panel = page.getByRole('dialog');
  await panel.getByRole('button', { name: 'Complete export form' }).click();
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('textbox')).toBeFocused();
  await panel.getByRole('textbox').fill('projects');
  await panel.getByRole('button', { name: 'Complete export form' }).click();
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('drawer unmount releases scroll and focuses a surviving workflow target', async ({ page }) => {
  await page.goto(story('drawer--unmount'));
  await page.getByRole('button', { name: 'Open removable drawer' }).click();
  await page.getByRole('button', { name: 'Remove drawer', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mount drawer' })).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

for (const family of ['sheet', 'drawer']) {
  for (const theme of ['light', 'dark'])
    test(`${family} ${theme}: mobile/tablet/desktop and short viewport keep scrolling body and actions reachable`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      for (const viewport of [
        { width: 390, height: 844 },
        { width: 768, height: 900 },
        { width: 1440, height: 1000 },
        { width: 667, height: 320 },
      ]) {
        await page.setViewportSize(viewport);
        await page.goto(story(`${family}--long-content`, theme));
        await expect(page.locator(`[data-theme="${theme}"]`)).toBeVisible();
        const panel = page.getByRole('dialog');
        await expect(panel).toBeVisible();
        await expect(panel.getByRole('heading')).toBeFocused();
        const body = panel.locator('.af-dialog__body'),
          footer = panel.locator('.af-dialog__footer');
        const before = (await footer.boundingBox())!;
        await body.evaluate((el) => {
          el.scrollTop = el.scrollHeight;
        });
        expect(await body.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
        const after = (await footer.boundingBox())!;
        expect(after.y).toBeCloseTo(before.y, 0);
        expect(after.y + after.height).toBeLessThanOrEqual(viewport.height + 1);
        expect(after.y).toBeGreaterThanOrEqual(0);
        expect((await panel.boundingBox())!.width).toBeLessThanOrEqual(viewport.width);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        if (viewport.width === 390)
          expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      }
    });
  test(`${family} RTL preserves physical placement and StrictMode lifecycle remains stable`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1100, height: 800 });
    await page.goto(story(`${family}--rtl`));
    const panel = page.getByRole('dialog');
    await expect(panel).toHaveCSS('direction', 'rtl');
    const box = (await panel.boundingBox())!;
    expect(box.x).toBe(family === 'sheet' ? 652 : 230);
    await page.goto(story(`${family}--strict-lifecycle`));
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  });
}
