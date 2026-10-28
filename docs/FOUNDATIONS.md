# Complete reference foundations

antiflex separates reference choices from theme decisions. The full reference library is available for composition; existing semantic colors and component aliases still determine the antiflex interface.

## Color

The pinned Tailwind CSS 4.3.3 reference contains 26 named ramps with eleven steps each (50, 100–900, 950), plus black, white, and transparent: 289 values. The source is `packages/tokens/src/tokens.json` under `primitives.palette`. The default theme now uses the Neutral ramp in `primitives.color.neutral`; mint remains an optional primitive ramp. Semantic action, accent, selection, focus, and brand roles resolve to neutrals in both modes. Feedback roles retain distinct success, warning, and error colors.

```css
.example {
  background: var(--af-palette-blue-500);
  color: var(--af-color-text-primary);
}
```

Tailwind utilities use the separate `af-` namespace, for example `bg-af-blue-500`. Prefer semantic tokens for application surfaces, text, controls, and feedback. Choosing a reference color does not establish an accessible foreground/background pair; check the actual pair in its intended context.

CSS retains canonical OKLCH values from the reference. HEX/RGB exports and Figma fills are clipped sRGB previews, so saturated colors can differ on wide-gamut displays. Transparent retains alpha zero. The color explorer supports family search and copying CSS variables, canonical values, HEX previews, or Tailwind utilities.

## Typography

The optional reference scale adds thirteen sizes (`xs`–`9xl`, 12–128px), their default line heights, nine weights (100–900), six tracking values (−0.05–0.1em), and six unitless leading values (1–2). The legacy antiflex `fontSize` and `lineHeight` scales remain unchanged.

```css
.example {
  font-family: var(--af-font-sans), sans-serif;
  font-size: var(--af-typography-size-xl);
  line-height: var(--af-typography-line-height-xl);
  font-weight: var(--af-typography-weight-bold);
  letter-spacing: var(--af-typography-tracking-tight);
}
```

Equivalent utilities include `text-af-xl font-af-bold tracking-af-tight`; size utilities include their reference default line height. Use `leading-af-relaxed` to override it. Standard Tailwind utilities cover alignment, case, decoration, wrapping, list styling, and numeric features; support depends on the selected font.

The applications and generated installer stylesheet load forty genuine Fontsource faces: DM Sans and Anybody at all nine weights in upright and italic, plus Space Mono at 400/700 in upright and italic. Georgia is a browser-provided serif reference, not a bundled font or an available font in the connected Figma file. The playground restricts mono/serif weights to 400/700 instead of requesting synthetic intermediate faces. Brand roles remain DM Sans for interface text, Anybody for display, and Space Mono for technical text.

## Figma correspondence

The shared primitive collection adds 337 variables (289 color, 47 typography, and one serif family), bringing the file to 496 variables. All 159 prior variable values are preserved. The color boards contain 289 bound swatches in each theme. Typography adds 39 text styles, bringing the file to 55.

Pixel size/default-line-height variables bind directly. Raw tracking values remain em and leading values remain unitless; Figma text styles convert these to native percentage values. Their raw variables have no misleading pixel-only picker scope. The generated boards disclose sRGB approximation and browser-provided serif availability.

## Generation and checks

```sh
pnpm tokens:reference --check
pnpm tokens:build
pnpm tokens:test
pnpm registry:build
pnpm figma:foundations-expanded
```

Run `pnpm tokens:reference` deliberately when updating the pinned reference snapshot; normal token builds do not silently import changed dependency data. The importer validates the expected inventory before changing the source. Reference package/version, source URL, and source SHA-256 are recorded with the token data. Tailwind's MIT license is included in the token package and copied installer assets; see `THIRD_PARTY_NOTICES.md`.

`@antiflex/tokens/foundations` exports the palette inventory, steps, typography scales, font availability, and preview conversion helpers. Documentation and Storybook consume this common implementation. These additions bring Storybook to 203 stories while the component catalog remains 39 families.
