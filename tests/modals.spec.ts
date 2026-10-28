import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const storybook = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
const story = (id: string) => `${storybook}/iframe.html?id=${id}&viewMode=story`;

test('edit dialog names itself, contains keyboard focus, validates, saves, and restores focus', async ({
  page,
}) => {
  await page.goto('/docs/modals');
  const trigger = page.getByRole('button', { name: 'Edit sample project', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Edit project', exact: true });
  const name = dialog.getByRole('textbox', { name: 'Project name', exact: true });
  await expect(name).toBeFocused();
  await expect(dialog).toHaveAccessibleDescription(
    'Update the details your team sees in this sample workspace.',
  );
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await name.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Save changes', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(name).toBeFocused();
  await name.fill('');
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(dialog).toBeVisible();
  await expect(name).toBeFocused();
  await name.fill('New project');
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.getByText('Sample project saved. No server request was made.')).toBeVisible();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await trigger.click();
  await expect(name).toHaveValue('New project');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

test('dialog backdrop dismisses only a press and release outside, while inner drag stays open', async ({
  page,
}) => {
  await page.goto('/docs/components/dialog');
  await page.getByRole('button', { name: 'Edit sample project', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Edit project', exact: true });
  const box = (await dialog.boundingBox())!;
  await page.mouse.move(box.x + 30, box.y + 20);
  await page.mouse.down();
  await page.mouse.move(2, 2);
  await page.mouse.up();
  await expect(dialog).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog).toBeHidden();
});

test('alert dialog focuses cancel, ignores backdrop, and returns to the next logical workflow action', async ({
  page,
}) => {
  await page.goto('/docs/components/alert-dialog');
  const trigger = page.getByRole('button', { name: 'Archive sample project', exact: true });
  await trigger.click();
  const dialog = page.getByRole('alertdialog', { name: 'Archive Orbit workspace?', exact: true });
  await expect(dialog.getByRole('button', { name: 'Keep project', exact: true })).toBeFocused();
  await expect(dialog).toHaveAccessibleDescription(/sample project will leave/);
  await page.mouse.click(2, 2);
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('button', { name: 'Archive project', exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: 'Restore sample project' })).toBeFocused();
  await page.getByRole('button', { name: 'Restore sample project' }).click();
  await expect(trigger).toBeEnabled();
});

test('nested modal Escape closes only the child and keeps background scroll locked', async ({
  page,
}) => {
  await page.goto(story('components-dialog--nested'));
  const parentTrigger = page.getByRole('button', { name: 'Open parent', exact: true });
  await parentTrigger.click();
  const parent = page.getByRole('dialog', { name: 'Parent task', exact: true });
  const childTrigger = parent.getByRole('button', { name: 'Open child confirmation', exact: true });
  await childTrigger.click();
  const child = page.getByRole('alertdialog', { name: 'Child confirmation', exact: true });
  await expect(child.getByRole('button', { name: 'Keep editing' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(child).toBeHidden();
  await expect(parent).toBeVisible();
  await expect(childTrigger).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(parent).toBeHidden();
  await expect(parentTrigger).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
});

test('controlled refusal preserves modality until its owner closes', async ({ page }) => {
  await page.goto(story('components-dialog--controlled-refusal'));
  await page.getByRole('button', { name: 'Open controlled dialog' }).click();
  const dialog = page.getByRole('dialog', { name: 'Controlled project' });
  await page.keyboard.press('Escape');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Request close' }).click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Close from owner' }).click();
  await expect(dialog).toBeHidden();
});

test('native dialog form validation, close event, and mounted field state remain native', async ({
  page,
}) => {
  await page.goto(story('components-dialog--native-form'));
  const trigger = page.getByRole('button', { name: 'Open native form' });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Native completion' });
  const input = dialog.getByRole('textbox', { name: 'Required name' });
  await dialog.getByRole('button', { name: 'Complete native form' }).click();
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await input.fill('Alex');
  await dialog.getByRole('button', { name: 'Complete native form' }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(input).toHaveValue('Alex');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('strict lifecycle and unmount clean up modal state, scroll, and focus', async ({ page }) => {
  await page.goto(story('components-dialog--strict-lifecycle'));
  const dialog = page.getByRole('dialog', { name: 'Project details' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await page.getByRole('button', { name: 'Edit project', exact: true }).click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await page.goto(story('components-dialog--unmount'));
  await page.getByRole('button', { name: 'Open removable dialog' }).click();
  await page.getByRole('button', { name: 'Remove dialog tree' }).click();
  await expect(page.getByRole('button', { name: 'Mount dialog' })).toBeFocused();
  await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  await page.getByRole('button', { name: 'Mount dialog' }).click();
  await page.getByRole('button', { name: 'Open removable dialog' }).click();
  await expect(page.getByRole('dialog', { name: 'Removable task' })).toBeVisible();
});

test('long content focuses its heading and keeps scrolling inside the modal', async ({ page }) => {
  await page.goto('/docs/modals');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Read sample review' }).click();
  const dialog = page.getByRole('dialog', { name: 'Review before continuing' });
  await expect(dialog.getByRole('heading', { name: 'Review before continuing' })).toBeFocused();
  await expect(dialog).toHaveAttribute('aria-describedby', '');
  const box = (await dialog.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.height).toBeLessThanOrEqual(812);
  await dialog.evaluate((node) => (node.scrollTop = node.scrollHeight));
  await expect(dialog.getByRole('button', { name: 'Finish review' })).toBeInViewport();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('explicit names omit absent description IDs and pending confirmation stays open on failure', async ({
  page,
}) => {
  await page.goto(story('components-dialog--explicit-name'));
  await page.getByRole('button', { name: 'Open named dialog' }).click();
  const dialog = page.getByRole('dialog', { name: 'Named task' });
  await expect(dialog).not.toHaveAttribute('aria-labelledby');
  await expect(dialog).not.toHaveAttribute('aria-describedby');
  await page.keyboard.press('Escape');
  await page.goto(story('components-alert-dialog--pending-and-error'));
  await page.getByRole('button', { name: 'Try pending confirmation' }).click();
  const alert = page.getByRole('alertdialog', { name: 'Apply sample change?' });
  await alert.getByRole('button', { name: 'Apply change' }).click();
  await expect(alert).toBeVisible();
  await expect(alert.getByRole('alert')).toContainText('sample operation failed');
  await alert.getByRole('button', { name: 'Cancel change' }).click();
  await expect(alert).toBeHidden();
});

for (const theme of ['light', 'dark'] as const)
  test(`modal surfaces and all modal stories are accessible in ${theme}, with responsive RTL`, async ({
    page,
    request,
  }) => {
    test.setTimeout(180_000);
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    for (const route of [
      '/docs/modals',
      '/docs/components/dialog',
      '/docs/components/alert-dialog',
    ]) {
      await page.goto(route);
      expect((await new AxeBuilder({ page }).analyze()).violations, route).toEqual([]);
    }
    await page.goto('/docs/modals');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => (document.documentElement.dir = 'rtl'));
    for (const [trigger, role, name] of [
      ['Edit sample project', 'dialog', 'Edit project'],
      ['Archive sample project', 'alertdialog', 'Archive Orbit workspace?'],
    ] as const) {
      await page.getByRole('button', { name: trigger, exact: true }).click();
      const modal = page.getByRole(role, { name, exact: true });
      await expect(modal).toBeVisible();
      expect((await new AxeBuilder({ page }).analyze()).violations, name).toEqual([]);
      expect(await modal.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
      await page.keyboard.press('Escape');
    }
    await page.setViewportSize({ width: 900, height: 900 });
    const entries = Object.values(
      (await (await request.get(storybook + '/index.json')).json()).entries,
    ) as { id: string; type: string }[];
    for (const { id } of entries.filter(
      (e) => e.type === 'story' && /^components-(?:alert-dialog|dialog)--/.test(e.id),
    )) {
      await page.goto(story(id) + '&globals=theme:' + theme);
      await expect(page.locator('#storybook-root > div')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('#storybook-root > div')).toBeVisible();
      const result = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations, id).toEqual([]);
    }
  });

test('workspace shares archive state and edit Save/Cancel owns both name and description drafts', async ({
  page,
}) => {
  await page.goto('/docs/modals');
  const edit = page.getByRole('button', { name: 'Edit sample project', exact: true });
  await edit.click();
  const dialog = page.getByRole('dialog', { name: 'Edit project', exact: true });
  await dialog.getByRole('textbox', { name: 'Project name', exact: true }).fill('Orbit release');
  await dialog
    .getByRole('textbox', { name: 'Description', exact: true })
    .fill('Saved release description.');
  await dialog.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByText('Orbit release', { exact: true })).toBeVisible();
  await edit.click();
  await dialog
    .getByRole('textbox', { name: 'Project name', exact: true })
    .fill('Discard this name');
  await dialog
    .getByRole('textbox', { name: 'Description', exact: true })
    .fill('Discard this description.');
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await edit.click();
  await expect(dialog.getByRole('textbox', { name: 'Project name', exact: true })).toHaveValue(
    'Orbit release',
  );
  await expect(dialog.getByRole('textbox', { name: 'Description', exact: true })).toHaveValue(
    'Saved release description.',
  );
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Archive sample project', exact: true }).click();
  const confirmation = page.getByRole('alertdialog', {
    name: 'Archive Orbit release?',
    exact: true,
  });
  await confirmation.getByRole('button', { name: 'Archive project', exact: true }).click();
  await expect(page.getByText('No active sample projects.', { exact: true })).toBeVisible();
  await expect(page.getByText('Active', { exact: true })).toHaveCount(0);
  await expect(edit).toBeDisabled();
  await page.getByRole('button', { name: 'Restore sample project' }).click();
  await expect(edit).toBeEnabled();
  await expect(page.getByText('Orbit release', { exact: true })).toBeVisible();
  await expect(page.getByText('Active', { exact: true })).toBeVisible();
});
