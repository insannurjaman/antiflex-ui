import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const sb = process.env.ANTIFLEX_STORYBOOK_URL || 'http://127.0.0.1:6106';
async function story(page: Page, id: string, theme = 'light') {
  await page.goto(`${sb}/iframe.html?id=components-${id}&viewMode=story&globals=theme:${theme}`);
  await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
}
const b = (p: Page, name: string) => p.getByRole('button', { name, exact: true });
test('Hover Card delays pointer entry, bridges to content, dismisses and never takes focus', async ({
  page,
}) => {
  await story(page, 'hovercard--default');
  await page.clock.install();
  const link = page.getByRole('link', { name: 'Alex Morgan', exact: true }),
    panel = page.getByRole('region', { name: 'Alex Morgan' });
  // Start the pointer outside the link before installing the paused clock.
  await page.mouse.move(0, 0);
  await link.hover();
  await page.clock.runFor(300);
  await expect(panel).toBeHidden();
  await page.clock.runFor(400);
  await expect(panel).toBeVisible();
  await panel.hover();
  await page.clock.runFor(1000);
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await link.focus();
  await expect(panel).toBeVisible();
  await expect(link).toBeFocused();
  await b(page, 'After preview').focus();
  await expect(panel).toBeHidden();
  await b(page, 'Preview Alex Morgan').click();
  await expect(panel).toBeVisible();
  await b(page, 'Preview Alex Morgan').click();
  await expect(panel).toBeHidden();
  await expect(link).toHaveAttribute('href', '#sample-member');
});
test('Hover Card controlled refusal, nested modal Escape and strict cleanup', async ({ page }) => {
  await story(page, 'hovercard--controlled-refusal');
  await b(page, 'Preview Alex Morgan').click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'Alex Morgan' })).toBeVisible();
  await b(page, 'Close from owner').click();
  await expect(page.getByRole('region', { name: 'Alex Morgan' })).toBeHidden();
  await story(page, 'hovercard--inside-dialog');
  await b(page, 'Open example task').click();
  await page.getByRole('link', { name: 'Alex Morgan', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('region', { name: 'Alex Morgan' })).toBeHidden();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await story(page, 'hovercard--strict-cleanup');
  await b(page, 'Preview Alex Morgan').click();
  await b(page, 'Toggle specimen mount').click();
  await expect(page.getByRole('region')).toHaveCount(0);
  await b(page, 'Toggle specimen mount').click();
  await b(page, 'Preview Alex Morgan').click();
  await expect(page.getByRole('region')).toBeVisible();
});
for (const rtl of [false, true])
  test(`Menubar roving headings, open-menu switching and nested Escape RTL=${rtl}`, async ({
    page,
  }) => {
    await story(page, rtl ? 'menubar--rtl' : 'menubar--default');
    const bar = page.getByRole('menubar', { name: 'Workspace commands' });
    const file = bar.getByRole('menuitem', { name: 'File', exact: true });
    await file.focus();
    await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
    await expect(bar.getByRole('menuitem', { name: 'Edit', exact: true })).toBeFocused();
    await page.keyboard.press('Home');
    await expect(file).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(
      page.getByRole('menuitem', { name: 'New local project', exact: true }),
    ).toBeFocused();
    await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
    await expect(page.getByRole('menuitem', { name: 'Undo', exact: true })).toBeFocused();
    await page.keyboard.press(rtl ? 'ArrowRight' : 'ArrowLeft');
    await page.getByRole('menuitem', { name: 'Export', exact: true }).focus();
    await page.keyboard.press(rtl ? 'ArrowLeft' : 'ArrowRight');
    await expect(page.getByRole('menuitem', { name: 'JSON', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('menuitem', { name: 'Export', exact: true })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(file).toBeFocused();
    await file.press('Enter');
    await page.keyboard.press('Tab');
    await expect(b(page, 'After menubar')).toBeFocused();
    await expect(page.getByRole('menu')).toBeHidden();
  });
test('Menubar disabled headings, typeahead, checkbox persistence and controlled close', async ({
  page,
}) => {
  await story(page, 'menubar--disabled');
  const file = page.getByRole('menubar').getByRole('menuitem', { name: 'File', exact: true });
  await file.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('menubar').getByRole('menuitem', { name: 'View', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('f');
  await expect(file).toBeFocused();
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  const guides = page.getByRole('menuitemcheckbox', { name: 'Show guides' });
  await guides.click();
  await expect(guides).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Escape');
  await story(page, 'menubar--controlled-refusal');
  await page.getByRole('menubar').getByRole('menuitem', { name: 'File', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('menu', { name: 'File', exact: true })).toBeVisible();
  await b(page, 'Close from owner').click();
  await expect(page.getByRole('menu')).toBeHidden();
});
test('Navigation Menu retains ordinary Tab order, supports entry keys, Escape, links and outside focus', async ({
  page,
  browserName,
}) => {
  await story(page, 'navigationmenu--default');
  const learn = b(page, 'Learn');
  await learn.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeFocused();
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: 'Foundations', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(learn).toBeFocused();
  await learn.press('Enter');
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeFocused();
  await b(page, 'After navigation').focus();
  await expect(page.getByRole('link', { name: 'Foundations', exact: true })).toBeHidden();
  await expect(b(page, 'After navigation')).toBeFocused();
  await b(page, 'Build').click();
  await page.getByRole('link', { name: 'Components', exact: true }).click();
  await expect(page).toHaveURL(/#nav-destination$/);
  await expect(page.getByRole('link', { name: 'Installation', exact: true })).toBeHidden();
  await expect(page.getByRole('menu')).toHaveCount(0);
});
test('Navigation controlled ownership and modal focus layering remain separate', async ({
  page,
}) => {
  await story(page, 'navigationmenu--controlled-refusal');
  await b(page, 'Learn').click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link', { name: 'Foundations', exact: true })).toBeVisible();
  await b(page, 'Close from owner').click();
  await expect(page.getByRole('link', { name: 'Foundations', exact: true })).toBeHidden();
  await story(page, 'navigationmenu--inside-dialog');
  await b(page, 'Open example task').click();
  await b(page, 'Learn').focus();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  await expect(b(page, 'Learn')).toBeFocused();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('Select explores without committing, skips disabled options, submits and resets native values', async ({
  page,
}) => {
  await story(page, 'select--default');
  const control = page.getByRole('combobox', { name: 'Sample member', exact: true });
  await control.focus();
  await page.keyboard.press('ArrowDown');
  await expect(control).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('option', { name: /Sam Rivera/ })).toHaveAttribute(
    'data-active',
    'true',
  );
  await page.keyboard.press('Escape');
  await b(page, 'Submit choice').click();
  await expect(page.getByRole('status')).toHaveText('Submitted alex');
  await control.focus();
  await page.keyboard.press('s');
  await page.keyboard.press('Enter');
  await b(page, 'Submit choice').click();
  await expect(page.getByRole('status')).toHaveText('Submitted sam');
  await b(page, 'Reset choice').click();
  await expect(control).toContainText('Alex Morgan');
  await b(page, 'Submit choice').click();
  await expect(page.getByRole('status')).toHaveText('Submitted alex');
  await control.click();
  await page.mouse.move(0, 0);
  await page.keyboard.press('End');
  await expect(page.getByRole('option', { name: /Sam Rivera/ })).toHaveAttribute(
    'data-active',
    'true',
  );
  const unavailable = await page
    .getByRole('option', { name: 'Jordan Lee', exact: true })
    .boundingBox();
  await page.mouse.click(
    unavailable!.x + unavailable!.width / 2,
    unavailable!.y + unavailable!.height / 2,
  );
  await expect(control).toHaveAttribute('aria-expanded', 'true');
});
test('Select required validation reaches the visible control and controlled values can refuse changes', async ({
  page,
}) => {
  await story(page, 'select--sizes');
  const control = page.getByRole('combobox', { name: 'Sample member', exact: true });
  await b(page, 'Submit choice').click();
  await expect(control).toBeFocused();
  await expect(control).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('alert')).toContainText('Choose an option');
  await control.press('Enter');
  await page.keyboard.press('Enter');
  await expect(control).not.toHaveAttribute('aria-invalid', 'true');
  await story(page, 'select--controlled');
  const selected = page.getByRole('combobox', { name: 'Sample member', exact: true });
  await selected.click();
  await page.getByRole('option', { name: /Sam Rivera/ }).click();
  await expect(selected).toContainText('Alex Morgan');
  await expect(page.getByRole('status')).toContainText('Requested sam');
  await page.getByRole('checkbox', { name: 'Refuse value changes' }).uncheck();
  await selected.click();
  await page.getByRole('option', { name: /Sam Rivera/ }).click();
  await expect(selected).toContainText('Sam Rivera');
});
test('Combobox searches labels and keywords while preserving input focus and native editing', async ({
  page,
}) => {
  await story(page, 'combobox--default');
  const input = page.getByRole('combobox', { name: 'Sample member', exact: true });
  await input.fill('react');
  await expect(page.getByRole('option', { name: /Sam Rivera/ })).toBeVisible();
  await expect(page.getByRole('option', { name: /Alex Morgan/ })).toHaveCount(0);
  await expect(input).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Sam Rivera');
  await b(page, 'Submit choice').click();
  await expect(page.getByRole('status')).toHaveText('Submitted sam');
  await input.fill('aléx');
  await expect(page.getByRole('option', { name: /Alex Morgan/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(input).toHaveValue('Sam Rivera');
  await input.fill('not a member');
  await expect(page.getByRole('option', { name: 'No options found.' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(input).toHaveValue('Sam Rivera');
  await input.fill('');
  await page.keyboard.press('Tab');
  await b(page, 'Submit choice').click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
});
test('Combobox controlled refusal restores the owned label and initial open shows all choices', async ({
  page,
}) => {
  await story(page, 'combobox--controlled');
  const input = page.getByRole('combobox', { name: 'Sample member', exact: true });
  await input.click();
  await expect(page.getByRole('option')).toHaveCount(3);
  await input.fill('react');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Alex Morgan');
  await page.getByRole('checkbox', { name: 'Refuse value changes' }).uncheck();
  await input.fill('react');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Sam Rivera');
});
test('Command filters actions, blocks disabled commands and composes modal cancellation', async ({
  page,
}) => {
  await story(page, 'command--default');
  const input = page.getByRole('combobox', { name: 'Search commands', exact: true });
  const searchBounds = await input.boundingBox(),
    resultsBounds = await page.getByRole('listbox').boundingBox();
  expect(resultsBounds!.y).toBeGreaterThanOrEqual(searchBounds!.y + searchBounds!.height);
  await input.fill('add');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('Project created');
  await input.fill('delete');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).not.toContainText('ERROR');
  await page.keyboard.press('Escape');
  await expect(input).toHaveValue('');
  await story(page, 'command--dialog');
  const trigger = b(page, 'Open commands');
  await trigger.focus();
  await trigger.press('Enter');
  const search = page.getByRole('combobox', { name: 'Search commands', exact: true });
  await expect(search).toBeFocused();
  await search.fill('keep');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await search.fill('add');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
});
test('Command keeps the last long-result row inside inline and dialog scroll viewports', async ({
  page,
}) => {
  await story(page, 'command--long-content');
  for (const modal of [false, true]) {
    if (modal) {
      await b(page, 'Open long commands').focus();
      await b(page, 'Open long commands').press('Enter');
    }
    const root = modal ? page.getByRole('dialog') : page.locator('.af-command').first();
    const input = root.getByRole('combobox');
    await input.focus();
    await input.press('ArrowUp');
    const last = root.getByRole('option', {
      name: 'Sample action 40 Synthetic command',
      exact: true,
    });
    await expect(last).toHaveAttribute('data-active', 'true');
    await expect
      .poll(async () =>
        last.evaluate((n) => {
          const row = n.getBoundingClientRect(),
            list = n.closest('[role="listbox"]')!.getBoundingClientRect(),
            popup = n.closest('.af-selection__popup')!.getBoundingClientRect();
          return (
            row.top >= list.top - 1 && row.bottom <= Math.min(list.bottom, popup.bottom - 5) + 1
          );
        }),
      )
      .toBe(true);
    if (modal) {
      await input.press('Enter');
      await expect(page.getByRole('dialog')).toBeHidden();
      await expect(page.getByRole('status')).toHaveText('Action 40');
    }
  }
});
test('Calendar grid has one date Tab stop and moves across months and leap boundaries', async ({
  page,
}) => {
  await story(page, 'calendar--default');
  const oct = page.getByRole('button', { name: 'Friday, October 23, 2026', exact: true });
  await oct.focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('button', { name: 'Saturday, October 24, 2026', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('PageDown');
  await expect(
    page.getByRole('button', { name: 'Tuesday, November 24, 2026', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Home');
  await expect(
    page.getByRole('button', { name: 'Sunday, November 22, 2026', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Selected date: 2026-11-28');
  await expect(page.locator('[data-af-date][tabindex="0"]')).toHaveCount(1);
  await story(page, 'calendar--bounded-leap-year');
  const leap = page.getByRole('button', { name: 'Thursday, February 29, 2024', exact: true });
  await leap.focus();
  await page.keyboard.press('PageUp');
  await expect(leap).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('button', { name: 'Friday, March 1, 2024', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('PageDown');
  await expect(
    page.getByRole('button', { name: 'Sunday, March 3, 2024', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('button', { name: 'Sunday, March 3, 2024', exact: true }),
  ).toBeFocused();
});
test('Calendar unavailable days remain discoverable, RTL keys reverse and locale/week start are real', async ({
  page,
}) => {
  await story(page, 'calendar--disabled-dates');
  await page.getByRole('button', { name: 'Friday, October 23, 2026', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  const disabled = page.getByRole('button', { name: 'Saturday, October 24, 2026', exact: true });
  await expect(disabled).toBeFocused();
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Selected date: 2026-10-23');
  await story(page, 'calendar--rtl');
  await page.getByRole('button', { name: 'Friday, October 23, 2026', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(
    page.getByRole('button', { name: 'Thursday, October 22, 2026', exact: true }),
  ).toBeFocused();
  await story(page, 'calendar--monday-start');
  await expect(page.getByRole('columnheader').first()).toHaveText('Mon');
  await story(page, 'calendar--locale-indonesian');
  await expect(page.getByRole('heading', { name: 'Oktober 2026' })).toBeVisible();
  await story(page, 'calendar--fully-disabled');
  await expect(page.locator('[data-af-date][tabindex="0"]')).toHaveCount(0);
});
test('Date Picker focuses the active day, honors unavailable dates and returns to its trigger', async ({
  page,
}) => {
  await story(page, 'datepicker--bounded');
  const trigger = page.getByRole('button', { name: /^Due date:/ });
  await trigger.click();
  await expect(
    page.getByRole('button', { name: 'Wednesday, February 28, 2024', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Due date', exact: true })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Due date', exact: true })).toBeHidden();
  await expect(
    page.getByRole('button', { name: /^Due date: Friday, March 1, 2024/ }),
  ).toBeFocused();
  await b(page, 'Submit date').click();
  await expect(page.getByRole('status')).toContainText('Submitted 2024-03-01');
});
test('Date Picker required state, clear/reset, controlled value and modal layering work', async ({
  page,
}) => {
  await story(page, 'datepicker--required-form');
  await b(page, 'Submit date').click();
  await expect(b(page, 'Due date')).toBeFocused();
  await expect(b(page, 'Due date')).toHaveAttribute('aria-invalid', 'true');
  await b(page, 'Due date').click();
  await page.getByRole('button', { name: 'Friday, October 23, 2026', exact: true }).click();
  await b(page, 'Submit date').click();
  await expect(page.getByRole('status')).toContainText('Submitted 2026-10-23');
  await b(page, 'Reset date').click();
  await expect(b(page, 'Due date')).toBeVisible();
  await b(page, 'Submit date').click();
  await expect(b(page, 'Due date')).toHaveAttribute('aria-invalid', 'true');
  await story(page, 'datepicker--inside-dialog');
  await b(page, 'Open example task').click();
  await b(page, 'Due date').click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Workspace example task' })).toBeVisible();
  await expect(b(page, 'Due date')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});
test('workspace example submits real local form values and exports sample JSON', async ({
  page,
}) => {
  await page.goto('/docs/workspace-tools');
  await expect(page.locator('[data-workspace-ready="true"]')).toBeVisible();
  const reviewer = page.getByRole('combobox', { name: 'Assign reviewer' });
  await reviewer.click();
  await reviewer.fill('react');
  await expect(page.getByRole('option', { name: /Sam Rivera/ })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(reviewer).toHaveValue('Sam Rivera');
  const form = page
    .locator('form')
    .filter({ has: page.getByRole('combobox', { name: 'Assign reviewer' }) });
  await form.getByRole('button', { name: 'Save selection' }).click();
  await expect(form.getByRole('status')).toContainText('Submitted sam');
  await page.getByRole('menubar').getByRole('menuitem', { name: 'File', exact: true }).click();
  await page.getByRole('menuitem', { name: 'Export', exact: true }).press('ArrowRight');
  const download = page.waitForEvent('download');
  await page.getByRole('menuitem', { name: 'Download sample JSON' }).click();
  expect((await download).suggestedFilename()).toBe('antiflex-workspace-sample.json');
});
for (const theme of ['light', 'dark'])
  test(`all64 new stories and responsive docs pass axe in ${theme}`, async ({ page }) => {
    test.setTimeout(240000);
    await page.addInitScript((t) => localStorage.setItem('antiflex-theme', t), theme);
    await page.goto('/docs/workspace-tools');
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      ).toBeTruthy();
    }
    const old = page;
    page = await page.context().newPage();
    await old.close();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const index = await (await page.request.get(`${sb}/index.json`)).json();
    const ids = Object.keys(index.entries).filter(
      (id) =>
        /^components-(hovercard|menubar|navigationmenu|select|combobox|command|calendar|datepicker)--/.test(
          id,
        ) && index.entries[id].type === 'story',
    );
    expect(ids).toHaveLength(64);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const id of ids) {
      await page.goto(`${sb}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await expect(page.locator('[data-theme]').first()).toHaveAttribute('data-theme', theme);
      if (id.endsWith('inside-dialog')) await b(page, 'Open example task').click();
      if (id === 'components-command--dialog') await b(page, 'Open commands').click();
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
