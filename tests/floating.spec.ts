import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const storybookURL = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
async function story(page: import('@playwright/test').Page, id: string, theme = 'light') {
  await page.goto(
    `${storybookURL}/iframe.html?id=components-${id}&viewMode=story&globals=theme:${theme}`,
  );
  await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
}

test('popover saves local filters, names its content, and restores the trigger', async ({
  page,
}) => {
  await page.goto('/docs/components/popover');
  const trigger = page.getByRole('button', { name: 'Filter projects' });
  await trigger.click();
  const panel = page.getByRole('dialog', { name: 'Project filters' });
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAccessibleDescription('Choose which sample projects to show.');
  const select = panel.getByRole('combobox', { name: 'Project status' });
  await expect(select).toBeFocused();
  await select.selectOption('Active projects');
  await panel.getByRole('button', { name: 'Apply filters' }).click();
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('.floating-specimen [role="status"]')).toContainText('active projects');
});
test('popover closes on focus leaving and preserves the outside destination', async ({ page }) => {
  await story(page, 'popover--default');
  await page.getByRole('button', { name: 'Edit view' }).click();
  const outside = page.getByRole('button', { name: 'Outside action' });
  await outside.focus();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(outside).toBeFocused();
});
test('popover Escape and outside click dismiss, while inside drag does not', async ({ page }) => {
  await story(page, 'popover--default');
  const trigger = page.getByRole('button', { name: 'Edit view' });
  await trigger.click();
  const box = await page.getByRole('dialog').boundingBox();
  await page.mouse.move(box!.x + 8, box!.y + 8);
  await page.mouse.down();
  await page.mouse.move(1000, 500);
  await page.mouse.up();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('textbox', { name: 'Outside field' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('textbox', { name: 'Outside field' })).toBeFocused();
});
test('nested popovers close only their nearest layer', async ({ page }) => {
  await story(page, 'popover--nested-panels');
  await page.getByRole('button', { name: 'Open parent panel' }).click();
  await page.getByRole('button', { name: 'Open child panel' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Child panel' })).toBeHidden();
  await expect(page.getByRole('dialog', { name: 'Parent panel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open child panel' })).toBeFocused();
  await page.getByRole('button', { name: 'Open child panel' }).click();
  await page.mouse.click(1000, 700);
  await expect(page.getByRole('dialog', { name: 'Child panel' })).toBeHidden();
  await expect(page.getByRole('dialog', { name: 'Parent panel' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('popover inside a native modal receives Escape first', async ({ page }) => {
  await story(page, 'popover--inside-dialog');
  await page.getByRole('button', { name: 'Open task' }).click();
  await page.getByRole('button', { name: 'Edit view' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'View settings' })).toBeHidden();
  await expect(page.getByRole('dialog', { name: 'Project task' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('controlled popover refusal stays open until its owner closes it', async ({ page }) => {
  await story(page, 'popover--controlled-refusal');
  await page.getByRole('button', { name: 'Open controlled panel' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Request close' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close from owner' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('floating content flips, clamps, scrolls, and tracks a hidden anchor', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 300 });
  await story(page, 'popover--long-content');
  const panel = page.getByRole('dialog');
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(7);
  expect(box!.x + box!.width).toBeLessThanOrEqual(353);
  expect(box!.y + box!.height).toBeLessThanOrEqual(293);
  expect(await panel.evaluate((n) => n.scrollHeight > n.clientHeight)).toBe(true);
  await story(page, 'popover--scroll-anchor');
  await page.getByRole('button', { name: 'Edit view' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page
    .getByRole('region', { name: 'Scrollable anchor' })
    .evaluate((n) => (n.scrollTop = 400));
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('popover strict replay and unmount clean up focus', async ({ page }) => {
  await story(page, 'popover--strict-lifecycle');
  await expect(page.getByRole('textbox', { name: 'View name' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await story(page, 'popover--unmount');
  await page.getByRole('button', { name: 'Open removable panel' }).click();
  await page.getByRole('button', { name: 'Remove panel tree' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mount panel' })).toBeFocused();
});
test('logical popover alignment follows RTL', async ({ page }) => {
  await story(page, 'popover--rtl');
  const trigger = await page.getByRole('button', { name: 'Edit view' }).boundingBox(),
    panel = await page.getByRole('dialog').boundingBox();
  expect(Math.abs(trigger!.x + trigger!.width - panel!.x - panel!.width)).toBeLessThan(2);
});
test('tooltip hover is delayed, hoverable, and dismissible without focus transfer', async ({
  page,
}) => {
  await story(page, 'tooltip--default');
  const trigger = page.getByRole('button', { name: 'Show project ID' });
  await trigger.hover();
  await expect(page.getByRole('tooltip')).toBeHidden();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.getByRole('tooltip').hover();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(trigger).not.toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();
  await page.mouse.move(800, 600);
  await trigger.hover();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.mouse.move(800, 600);
  await expect(page.getByRole('tooltip')).toBeHidden();
});
test('tooltip focus is immediate, supplemental descriptions merge, and activation dismisses', async ({
  page,
}) => {
  await story(page, 'tooltip--existing-description');
  const trigger = page.getByRole('button', { name: 'Show project ID' });
  await trigger.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await expect(trigger).toHaveAccessibleDescription(
    'This action uses local sample data. Reveals the project identifier.',
  );
  await expect(trigger).toBeFocused();
  await trigger.press('Enter');
  await expect(page.getByRole('tooltip')).toBeHidden();
  await expect(trigger).toBeFocused();
});
test('tooltip Escape wins inside a popover', async ({ page }) => {
  await story(page, 'tooltip--inside-popover');
  await page.getByRole('button', { name: 'Open project panel' }).click();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('tooltip long text stays bounded and strict replay cleans up', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 400 });
  await story(page, 'tooltip--long-text');
  const box = await page.getByRole('tooltip').boundingBox();
  expect(box!.width).toBeLessThanOrEqual(273);
  expect(box!.x).toBeGreaterThanOrEqual(7);
  expect(box!.x + box!.width).toBeLessThanOrEqual(353);
  await story(page, 'tooltip--strict-lifecycle');
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();
});
for (const theme of ['light', 'dark'])
  test(`floating documentation and open stories are accessible in ${theme}`, async ({ page }) => {
    test.setTimeout(90_000);
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    for (const route of [
      '/docs/floating',
      '/docs/components/popover',
      '/docs/components/tooltip',
    ]) {
      await page.goto(route);
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
        route,
      ).toEqual([]);
    }
    for (const id of [
      'popover--open',
      'popover--long-content',
      'popover--rtl',
      'tooltip--open',
      'tooltip--long-text',
      'tooltip--rtl',
    ]) {
      await story(page, id, theme);
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
        id,
      ).toEqual([]);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/docs/floating');
    await page.getByRole('button', { name: 'Filter projects' }).click();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });

test('Tab leaves the nonmodal panel and preserves its next keyboard destination', async ({
  page,
  browserName,
}) => {
  await story(page, 'popover--default');
  await page.getByRole('button', { name: 'Edit view' }).click();
  await expect(page.getByRole('textbox', { name: 'View name' })).toBeFocused();
  const tab = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.keyboard.press(tab);
  await expect(page.getByRole('button', { name: 'Done' })).toBeFocused();
  await page.keyboard.press(tab);
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Outside action' })).toBeFocused();
});
test('preferred placement flips near an edge and recovers after resize', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 844 });
  await story(page, 'popover--right');
  const panel = page.getByRole('dialog');
  await expect(panel).toHaveAttribute('data-side', 'bottom');
  await page.setViewportSize({ width: 1280, height: 844 });
  await expect(panel).toHaveAttribute('data-side', 'right');
  const trigger = await page.getByRole('button', { name: 'Edit view' }).boundingBox(),
    box = await panel.boundingBox();
  expect(Math.abs(box!.x - trigger!.x - trigger!.width - 8)).toBeLessThan(2);
});
