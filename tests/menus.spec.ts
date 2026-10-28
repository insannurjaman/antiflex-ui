import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const storybook = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
async function story(page: Page, id: string, theme = 'light') {
  await page.goto(
    `${storybook}/iframe.html?id=components-${id}&viewMode=story&globals=theme:${theme}`,
  );
  await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
}
const actions = (page: Page) => page.getByRole('button', { name: 'Project actions', exact: true });
const main = (page: Page) => page.getByRole('menu', { name: 'Project actions', exact: true });
test('dropdown keyboard entry, wrap, disabled discoverability, typeahead and cancelled selection', async ({
  page,
}) => {
  await story(page, 'dropdownmenu--basic');
  const trigger = actions(page);
  await trigger.focus();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Open details…' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Duplicate project' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  const disabled = page.getByRole('menuitem', { name: 'Delete project' });
  await expect(disabled).toBeFocused();
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Enter');
  await expect(main(page)).toBeVisible();
  await expect(page.getByRole('status')).not.toContainText('ERROR');
  await page.keyboard.press('k');
  await expect(page.getByRole('menuitem', { name: 'Keep open' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(main(page)).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Kept open');
  await page.keyboard.press('Home');
  await page.keyboard.press('Enter');
  await expect(main(page)).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.press('Space');
  await expect(main(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});
test('checkbox and radio items expose state, persist and keep the menu open', async ({ page }) => {
  await story(page, 'dropdownmenu--checks-and-radios');
  const pin = page.getByRole('menuitemcheckbox', { name: 'Pin project' });
  await expect(pin).toHaveAttribute('aria-checked', 'false');
  await pin.click();
  await expect(pin).toHaveAttribute('aria-checked', 'true');
  await page.getByRole('menuitemradio', { name: 'List', exact: true }).click();
  await expect(page.getByRole('menuitemradio', { name: 'List', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await expect(page.getByRole('menuitemradio', { name: 'Grid', exact: true })).toHaveAttribute(
    'aria-checked',
    'false',
  );
  await expect(main(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await actions(page).click();
  await expect(pin).toHaveAttribute('aria-checked', 'true');
});
for (const rtl of [false, true])
  test(`submenu keyboard tree, layered Escape and full selection close, RTL=${rtl}`, async ({
    page,
  }) => {
    await story(page, rtl ? 'dropdownmenu--rtl' : 'dropdownmenu--submenus');
    if (!rtl) await actions(page).click();
    const sub = page.getByRole('menuitem', { name: 'Export', exact: true });
    await sub.focus();
    await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
    const nested = page.getByRole('menu', { name: 'Export format', exact: true });
    await expect(nested).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'JSON', exact: true })).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
    await expect(page.getByRole('menuitem', { name: 'CSV', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menu', { name: 'More formats', exact: true })).toBeHidden();
    await expect(page.getByRole('menuitem', { name: 'More formats', exact: true })).toBeFocused();
    await page.keyboard.press(rtl ? 'ArrowRight' : 'ArrowLeft');
    await expect(nested).toBeHidden();
    await expect(sub).toBeFocused();
    await sub.click();
    await page.getByRole('menuitem', { name: 'JSON', exact: true }).click();
    await expect(main(page)).toBeHidden();
    await expect(nested).toBeHidden();
    await expect(actions(page)).toBeFocused();
    await expect(page.getByRole('status')).toContainText('JSON selected');
  });
test('Tab exits in either direction; outside focus and pointer destinations retain focus', async ({
  page,
  browserName,
}) => {
  await story(page, 'dropdownmenu--basic');
  await actions(page).click();
  await page.keyboard.press('Tab');
  await expect(main(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'After menu', exact: true })).toBeFocused();
  await actions(page).click();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Before menu', exact: true })).toBeFocused();
  await actions(page).click();
  const destination = page.getByRole('button', { name: 'After menu', exact: true });
  if (browserName === 'webkit') await destination.focus();
  else await destination.click();
  await expect(main(page)).toBeHidden();
  await expect(destination).toBeFocused();
});
test('controlled refusal leaves menu and focus intact', async ({ page }) => {
  await story(page, 'dropdownmenu--controlled-refusal');
  await actions(page).click();
  await page.keyboard.press('Escape');
  await expect(main(page)).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Close refused');
  await expect(page.getByRole('menuitem', { name: 'Duplicate project' })).toBeFocused();
});
test('menu-to-dialog action preserves dialog focus and nested Escape closes menu first', async ({
  page,
}) => {
  await story(page, 'dropdownmenu--basic');
  await actions(page).click();
  await page.getByRole('menuitem', { name: 'Open details…' }).click();
  await expect(main(page)).toBeHidden();
  await expect(page.getByRole('dialog', { name: 'Project details' })).toBeVisible();
  expect(
    await page
      .getByRole('dialog', { name: 'Project details' })
      .evaluate((node) => node.contains(document.activeElement)),
  ).toBeTruthy();
  await page.keyboard.press('Escape');
  await story(page, 'dropdownmenu--inside-dialog');
  await page.getByRole('button', { name: 'Open menu dialog' }).click();
  const dialog = page.getByRole('dialog', { name: 'Workspace settings' });
  await actions(page).click();
  await page.keyboard.press('Escape');
  await expect(main(page)).toBeHidden();
  await expect(dialog).toBeVisible();
  await expect(actions(page)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});
test('strict lifecycle, remount and empty menu cleanup do not strand focus', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await story(page, 'dropdownmenu--strict-cleanup');
  await actions(page).click();
  await page.getByRole('button', { name: 'Toggle menu mount' }).click();
  await expect(main(page)).toBeHidden();
  await page.getByRole('button', { name: 'Toggle menu mount' }).click();
  await actions(page).click();
  await page.keyboard.press('Escape');
  await expect(actions(page)).toBeFocused();
  await story(page, 'dropdownmenu--empty');
  await expect(main(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After menu', exact: true })).toBeFocused();
  expect(errors).toEqual([]);
});
test('context menu supports pointer coordinates, keyboard invocation, checked state and Tab exit', async ({
  page,
}) => {
  await story(page, 'contextmenu--basic');
  const target = page.getByRole('region', { name: 'Project context' });
  await target.click({ button: 'right', position: { x: 20, y: 20 } });
  const menu = page.getByRole('menu', { name: 'Context actions', exact: true });
  await expect(menu).toBeVisible();
  const box = await menu.boundingBox(),
    anchor = await target.boundingBox();
  expect(Math.abs(box!.x - (anchor!.x + 20))).toBeLessThanOrEqual(2);
  await page.keyboard.press('Escape');
  await expect(target).toBeFocused();
  await target.press('Shift+F10');
  await page.evaluate(() => document.dispatchEvent(new Event('scroll')));
  await expect(menu).toBeVisible();
  await page.getByRole('menuitemcheckbox', { name: 'Pin project' }).click();
  await expect(page.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Tab');
  await expect(menu).toBeHidden();
  await expect(page.getByRole('button', { name: 'After context' })).toBeFocused();
  await target.focus();
  await target.press('ContextMenu');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
});
test('context menu repositions on retarget and clamps at small viewport edges', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 460 });
  await story(page, 'contextmenu--long');
  const target = page.getByRole('region', { name: 'Project context' });
  await target.click({ button: 'right', position: { x: 180, y: 40 } });
  const menu = page.getByRole('menu', { name: 'Context actions', exact: true });
  await expect(menu).toBeVisible();
  let box = await menu.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(7);
  expect(box!.x + box!.width).toBeLessThanOrEqual(313);
  expect(box!.y + box!.height).toBeLessThanOrEqual(453);
  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Long context action 30' })).toBeFocused();
  await page.keyboard.press('Escape');
  await target.click({ button: 'right', position: { x: 12, y: 12 } });
  box = await menu.boundingBox();
  expect(box!.x).toBeLessThan(80);
  await page.mouse.wheel(0, 700);
  await expect(menu).toBeHidden();
});
test('docs menu actions update the shared local project and download JSON', async ({ page }) => {
  await page.goto('/docs/menus');
  await page.getByRole('button', { name: 'Project actions' }).click();
  await page.getByRole('menuitem', { name: 'Duplicate project' }).click();
  await expect(page.getByRole('list', { name: 'Local project copies' })).toContainText('copy 1');
  await page.getByRole('region', { name: 'Atlas project context actions' }).focus();
  await page.keyboard.press('Shift+F10');
  await page.getByRole('menuitemcheckbox', { name: 'Pin project' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'Atlas project context actions' })).toContainText(
    'Pinned',
  );
  await page.getByRole('button', { name: 'Project actions' }).click();
  await page.getByRole('menuitem', { name: 'Export', exact: true }).click();
  const download = page.waitForEvent('download');
  await page.getByRole('menuitem', { name: 'Download JSON' }).click();
  expect((await download).suggestedFilename()).toBe('antiflex-sample-project.json');
});
test('dashboard per-order menu flags records and exports an individual sample', async ({
  page,
}) => {
  await page.goto('/dashboard');
  const trigger = page.getByRole('button', { name: /Actions for/ }).first();
  const name = await trigger.getAttribute('aria-label');
  await trigger.click();
  await page.getByRole('menuitemcheckbox', { name: 'Flag for review' }).click();
  await expect(page.getByRole('menuitemcheckbox')).toHaveAttribute('aria-checked', 'true');
  const download = page.waitForEvent('download');
  await page.getByRole('menuitem', { name: 'Download record JSON' }).click();
  expect((await download).suggestedFilename()).toContain(name!.replace('Actions for ', ''));
  await expect(trigger).toBeFocused();
});
for (const theme of ['light', 'dark'])
  test(`new menu specimens and docs pass axe with responsive layouts in ${theme}`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    await page.goto('/docs/menus');
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.getByRole('button', { name: 'Project actions' }).click();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBeTruthy();
      await page.keyboard.press('Escape');
    }
    expect(errors).toEqual([]);
    // Use a separate document for Storybook: closing a Next document can cancel its
    // pending RSC prefetches during cross-origin navigation in WebKit.
    const docsPage = page;
    docsPage.removeAllListeners('pageerror');
    page = await page.context().newPage();
    await docsPage.close();
    errors.length = 0;
    page.on('pageerror', (e) => errors.push(e.message));
    const index = await (await page.request.get(`${storybook}/index.json`)).json();
    const ids = Object.keys(index.entries).filter(
      (id) =>
        /^components-(dropdownmenu|contextmenu)--/.test(id) && index.entries[id].type === 'story',
    );
    expect(ids).toHaveLength(21);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const id of ids) {
      await page.goto(`${storybook}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
      if (id.endsWith('inside-dialog'))
        await page.getByRole('button', { name: /Open (menu|context) dialog/ }).click();
      if (id.endsWith('--submenus')) {
        if (id.includes('dropdown')) await actions(page).click();
        else await page.getByRole('region').press('Shift+F10');
        await page.getByRole('menuitem', { name: 'Export', exact: true }).click();
      }
      expect(
        (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
          .violations,
        id,
      ).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        id,
      ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
