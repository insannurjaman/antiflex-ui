import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import tokens from '../packages/tokens/src/tokens.json' with { type: 'json' };
import { colorToHex, colorToSrgb, paletteRamps } from '../packages/tokens/src/foundations.ts';
test('reference snapshot matches the installed Tailwind release without silently updating', () => {
  execFileSync(process.execPath, ['scripts/sync-reference-foundations.mjs', '--check']);
  assert.equal(paletteRamps.length, 26);
  assert.equal(paletteRamps.flatMap((r) => r.shades).length, 286);
  for (const name of ['taupe', 'mauve', 'mist', 'olive'])
    assert.ok(paletteRamps.find((r) => r.name === name));
});
test('typography has complete size, weight and rhythm scales with correct CSS units', () => {
  assert.deepEqual(
    Object.values(tokens.primitives.typography.size),
    [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128],
  );
  assert.deepEqual(
    Object.values(tokens.primitives.typography.weight),
    [100, 200, 300, 400, 500, 600, 700, 800, 900],
  );
  const css = fs.readFileSync('packages/tokens/src/tokens.css', 'utf8');
  for (const rule of [
    '--af-typography-weight-bold: 700;',
    '--af-typography-tracking-tight: -0.025em;',
    '--af-typography-leading-relaxed: 1.625;',
    '--af-typography-line-height-base: 24px;',
  ])
    assert.ok(css.includes(rule), rule);
  const tw = fs.readFileSync('packages/tokens/src/tailwind.css', 'utf8');
  for (const rule of [
    '--color-af-olive-950:',
    '--text-af-9xl:',
    '--text-af-base--line-height:',
    '--font-weight-af-thin:',
    '--tracking-af-tight:',
    '--leading-af-loose:',
  ])
    assert.ok(tw.includes(rule), rule);
});
test('Neutral is the default while optional mint and legacy type scales remain available', () => {
  assert.deepEqual(tokens.primitives.fontSize, {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    display: 56,
  });
  assert.equal(tokens.primitives.color.mint['500'], '#28e99f');
  assert.equal(tokens.primitives.color.neutral['950'], '#0a0a0a');
  assert.equal(tokens.semantic.light.action, 'color.neutral.900');
  assert.equal(tokens.semantic.dark.action, 'color.neutral.200');
  assert.equal(tokens.semantic.light.foreground, 'color.neutral.950');
  assert.equal(tokens.components['button-bg'], 'semantic.action');
});
test('sRGB preview handles powerless hue, alpha, and the full OKLCH palette', () => {
  assert.equal(colorToHex('oklch(100% 0 none)'), '#ffffff');
  assert.equal(colorToHex('oklch(0% 0 none)'), '#000000');
  assert.equal(colorToHex('oklch(63.7% 0.237 25.331)'), '#fb2c36');
  assert.equal(colorToHex('#00000000'), '#00000000');
  for (const { shades } of paletteRamps)
    for (const shade of shades) {
      assert.match(shade.hex, /^#[0-9a-f]{6}$/);
      assert.ok(
        Object.values(colorToSrgb(shade.value)).every(
          (c) => Number.isFinite(c) && c >= 0 && c <= 1,
        ),
      );
    }
});
test('installer preserves full font faces and the reference license', () => {
  const fonts = fs.readFileSync('packages/cli/registry/styles/fonts.css', 'utf8');
  assert.equal((fonts.match(/@font-face/g) ?? []).length, 40);
  for (const file of [
    'dm-sans-latin-100-normal.woff2',
    'dm-sans-latin-900-italic.woff2',
    'anybody-latin-900-italic.woff2',
    'space-mono-latin-700-italic.woff2',
  ])
    assert.ok(fonts.includes(file));
  assert.match(
    fs.readFileSync('packages/cli/registry/styles/LICENSE-tailwindcss.txt', 'utf8'),
    /Copyright \(c\) Tailwind Labs/,
  );
});

// Verify usable role pairs instead of merely checking that generated aliases exist.
test('default Neutral text and focus pairs retain contrast in both themes', () => {
  const luminance = (hex) => {
    const rgb = hex
      .slice(1)
      .match(/../g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  for (const [mode, roles] of Object.entries(tokens.semantic)) {
    const color = (role) => roles[role].split('.').reduce((v, key) => v[key], tokens.primitives);
    const contrast = (a, b) => {
      const values = [luminance(color(a)), luminance(color(b))].sort((a, b) => b - a);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    for (const [fg, bg] of [
      ['foreground', 'canvas'],
      ['muted', 'surface'],
      ['muted', 'subtle'],
      ['action-foreground', 'action'],
      ['action-foreground', 'action-hover'],
      ['accent', 'accent-soft'],
      ['brand-foreground', 'brand'],
      ['success', 'success-soft'],
      ['warning', 'warning-soft'],
      ['danger', 'danger-soft'],
    ]) {
      assert.ok(contrast(fg, bg) >= 4.5, `${mode}: ${fg}/${bg}`);
    }
    for (const bg of ['canvas', 'surface', 'subtle']) {
      assert.ok(contrast('focus', bg) >= 3, `${mode}: focus/${bg}`);
      assert.ok(contrast('border-strong', bg) >= 3, `${mode}: border-strong/${bg}`);
    }
  }
});
