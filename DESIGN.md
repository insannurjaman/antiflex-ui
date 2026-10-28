---
name: 'antiflex/ui'
description: 'less flex. More function.'
colors:
  canvas: '#ffffff'
  surface: '#ffffff'
  subtle: '#f5f5f5'
  inset: '#f5f5f5'
  foreground: '#0a0a0a'
  muted: '#525252'
  border: '#e5e5e5'
  border-strong: '#737373'
  accent: '#171717'
  accent-hover: '#404040'
  accent-soft: '#f5f5f5'
  accent-foreground: '#fafafa'
  focus: '#737373'
  success: '#236b40'
  success-soft: '#e5f6eb'
  warning: '#895915'
  warning-soft: '#fff5e3'
  danger: '#b53649'
  danger-soft: '#ffedef'
  brand: '#171717'
  brand-foreground: '#fafafa'
  action: '#171717'
  action-hover: '#262626'
  action-foreground: '#fafafa'
  display-ink: '#171717'
  display-surface: '#fafafa'
  overlay: '#00000080'
  dark-canvas: '#0a0a0a'
  dark-surface: '#171717'
  dark-subtle: '#262626'
  dark-inset: '#262626'
  dark-foreground: '#fafafa'
  dark-muted: '#a3a3a3'
  dark-border: '#404040'
  dark-border-strong: '#737373'
  dark-accent: '#fafafa'
  dark-accent-hover: '#e5e5e5'
  dark-accent-soft: '#262626'
  dark-accent-foreground: '#171717'
  dark-focus: '#a3a3a3'
  dark-success: '#80dda5'
  dark-success-soft: '#1c3325'
  dark-warning: '#f4c46b'
  dark-warning-soft: '#3b2c16'
  dark-danger: '#ff8d9b'
  dark-danger-soft: '#3d202b'
  dark-brand: '#e5e5e5'
  dark-brand-foreground: '#171717'
  dark-action: '#e5e5e5'
  dark-action-hover: '#d4d4d4'
  dark-action-foreground: '#171717'
  dark-display-ink: '#fafafa'
  dark-display-surface: '#0a0a0a'
  dark-overlay: '#00000080'
typography:
  display:
    fontFamily: 'Anybody, sans-serif'
    fontSize: '76px'
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Anybody, sans-serif'
    fontSize: '42px'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-1.4px'
  title:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '28px'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.8px'
  dialog-title:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '20px'
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 'normal'
  dialog-description:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: 1.5
  control:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1
  table-label:
    fontFamily: 'Space Mono, monospace'
    fontSize: '12px'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: '0.02em'
  code:
    fontFamily: 'Space Mono, monospace'
    fontSize: '13px'
    fontWeight: 400
    lineHeight: 1.8
  data:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '32px'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.7px'
rounded:
  sm: '1px'
  md: '0px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
  '12': '48px'
  '16': '64px'
components:
  button-primary:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '32px'
  button-primary-hover:
    backgroundColor: '{colors.action-hover}'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '32px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '32px'
  button-danger:
    backgroundColor: '{colors.danger-soft}'
    textColor: '{colors.danger}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '32px'
  field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '0 12px'
    height: '36px'
  field-sm:
    height: '32px'
  field-lg:
    height: '44px'
  choice-sm:
    size: '16px'
  choice-md:
    size: '18px'
  choice-lg:
    size: '20px'
  choice-checked:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-foreground}'
  switch-sm:
    width: '32px'
    height: '18px'
  switch-md:
    width: '36px'
    height: '20px'
  switch-lg:
    width: '40px'
    height: '22px'
  badge-accent:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '2px 8px'
  card-outline:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.md}'
    padding: '20px'
  navigation-active:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
    padding: '10px 12px'
  alert-neutral:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    padding: '16px'
  alert-success:
    backgroundColor: '{colors.success-soft}'
    textColor: '{colors.success}'
  alert-warning:
    backgroundColor: '{colors.warning-soft}'
    textColor: '{colors.warning}'
  alert-danger:
    backgroundColor: '{colors.danger-soft}'
    textColor: '{colors.danger}'
  selection-active:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent}'
    rounded: '{rounded.sm}'
  tab-trigger:
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '8px 12px'
  avatar-sm:
    size: '24px'
  avatar-md:
    size: '32px'
  avatar-lg:
    size: '40px'
  spinner-sm:
    size: '16px'
  spinner-md:
    size: '20px'
  spinner-lg:
    size: '24px'
  progress-sm:
    height: '4px'
  progress-md:
    height: '6px'
  progress-lg:
    height: '8px'
  table-header:
    backgroundColor: '{colors.inset}'
    textColor: '{colors.muted}'
    typography: '{typography.table-label}'
    padding: '8px 20px'
    height: '40px'
  table-row:
    textColor: '{colors.foreground}'
    padding: '8px 20px'
    height: '52px'
  dialog-sm:
    width: '400px'
  dialog-md:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.md}'
    padding: '0'
    width: '512px'
  dialog-lg:
    width: '640px'
  dialog-header:
    padding: '24px 24px 16px'
  dialog-body:
    padding: '0 24px 24px'
  dialog-footer:
    backgroundColor: '{colors.subtle}'
    padding: '16px 24px'
  sheet-width-sm:
    width: '360px'
  sheet-width-md:
    width: '448px'
  sheet-width-lg:
    width: '640px'
  sheet-height-sm:
    height: '320px'
  sheet-height-md:
    height: '480px'
  sheet-height-lg:
    height: '640px'
  drawer-width-sm:
    width: '400px'
  drawer-width-md:
    width: '640px'
  drawer-width-lg:
    width: '800px'
  popover:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '{spacing.4}'
    width: '320px'
  tooltip:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.surface}'
    rounded: '{rounded.sm}'
    padding: '8px 12px'
  menu-sm:
    width: '192px'
  menu-md:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '{spacing.1}'
    width: '240px'
  menu-lg:
    width: '288px'
  menu-item-active:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent}'
  toast:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '{spacing.4}'
    width: '384px'
  hover-card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '{spacing.4}'
    width: '288px'
  menubar:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    padding: '{spacing.1}'
  navigation-menu:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '{spacing.2}'
    width: '360px'
  selection-control:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.sm}'
    padding: '0 12px'
    width: '280px'
    height: '36px'
  selection-popup:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '4px'
    width: '280px'
  command:
    padding: '{spacing.4}'
    width: '560px'
  calendar:
    textColor: '{colors.foreground}'
    typography: '{typography.body}'
    width: '296px'
  calendar-selected:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-foreground}'
  date-picker-content:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '{spacing.4}'
    width: '328px'
---

# Design System: antiflex/ui

## Overview

**Creative North Star: "Precision in a ruled workspace"**

antiflex/ui pairs precision in design and code with a reference-led visual language: neutral gray material, charcoal/light actions, thin ruled boundaries, and square geometry. Anybody gives display statements a distinctive voice; DM Sans keeps the compact interface readable; Space Mono separates technical labels and code. The approved antiflex/ui identity uses a geometric A mark; component behaviour, neutral token values and typography remain unchanged.

The user-requested Neutral default supersedes the previous mint theme; the established geometry and typography remain. This record describes the implemented system; surface composition can differ between marketing, reading documentation, and operational examples while sharing the same token roles.

**Key Characteristics:**

- Neutral light and dark material with charcoal actions in light mode and light actions in dark mode.
- Anybody display, DM Sans interface, Space Mono technical roles.
- Square panels, nearly square controls, thin structural seams.
- Distinct marketing, documentation, and application layouts.
- Native semantics, visible focus, and reduced-motion support.
- Quiet selection, explicit feedback, and native-button disclosures.
- Compact anchored assistance that keeps the surrounding page available.
- Edge tasks with persistent titles and actions around an independently scrolling body.
- Optional reference color and typography libraries with matching design and code names.
- Local feedback with deliberate timing, explicit review, and recoverable actions.
- Distinct command, link-navigation, option-selection, and single-date behaviors in the same flat material.

### Identity migration — 2026-10-28

**antiflex/ui — less flex. More function.** A design system that favors familiar patterns, thoughtful defaults, and intuitive experiences over unnecessary complexity.

This approved namespace migration preserves every color, typography, spacing, radius, component, and motion value recorded above. The original geometric A mark remains inset in its established frame. Canonical identity assets are `assets/brand/antiflex-mark.svg` and `assets/brand/antiflex-wordmark.svg`.

Current workspace package names use `@antiflex`; CSS classes, custom properties, component data attributes, and optional reference Tailwind utilities use `af-`. Semantic utilities remain unprefixed and `data-theme` continues to select light or dark material. Earlier technical-name retention is superseded; the private one-time browser-storage reader and factual historical evidence are the only legacy-name exceptions.

The published installer is `antiflex-ui@0.1.0-alpha.2`, its executable is `antiflex`, and configuration is `antiflex.json`. Default source paths are `components/antiflex` and `styles/antiflex`, beneath `src/` when present. The `@antiflex/ui` and `@antiflex/tokens` packages remain private workspace dependencies. Figma collection/style names and WEB syntax follow the same namespace while preserving IDs, values, and bindings. Public docs use https://antiflex-ui.vercel.app and Storybook uses https://antiflex-storybook.vercel.app; deployment verification remains separate from this design record.

## Colors

Unprefixed frontmatter colors map to light mode; `dark-` colors map to dark mode. The source switches semantic roles with `data-theme`; semantic component aliases re-resolve at every light or dark boundary, including nested theme regions. Neutral grays establish material, action, selection, focus, and identity. Mint remains an optional primitive palette.

### Primary

- **Neutral Action** (`action`, `action-hover`, `action-foreground`): charcoal primary fills with light text in light mode and light fills with dark text in dark mode. `brand` and `brand-foreground` support identity treatments.
- **Neutral Link** (`accent`, `accent-hover`): charcoal textual actions in light mode and light gray actions in dark mode. Use the action roles for solid primary buttons rather than substituting the link color.
- **Quiet Selection** (`accent-soft`): accent badges, selected rows, selected tabs, and pressed toggles. Listbox active rows, tabs, and toggles pair this fill with accent text. Calendar uses the action pair for its committed single date, with a separate border for today.
- **Neutral Focus** (`focus`): visible keyboard focus, independent of resting borders.

### Neutral

- **Canvas and Surface** (`canvas`, `surface`): page and panel backgrounds; dark mode separates charcoal canvas from panels by tone.
- **Subtle and Inset** (`subtle`, `inset`): quiet hover fills, table headers, and supporting regions.
- **Ink and Muted Ink** (`foreground`, `muted`): information and supporting text.
- **Seam and Control Border** (`border`, `border-strong`): structural divisions and stronger field/secondary-button outlines.
- **Neutral Display Ink and Display Surface** (`display-ink`, `display-surface`): marketing material; regular app text retains the foreground role.
- **Modal Scrim** (`overlay`): the shared translucent black backdrop in both themes; use the semantic role through the dialog backdrop alias.

Success green, warning amber, and danger red each have readable text and soft-fill pairs. Keep their status labels visible.

Popover retains surface and foreground roles; Tooltip inverts those same roles for supplemental text in each theme. Neither adds a new palette. Toast retains surface, foreground, and strong-border roles across all variants; semantic status colors apply to its icon, with readable title and description carrying the message.

**The Action and Link Rule.** Solid primary actions use the theme-specific neutral action/foreground pair; textual actions use the theme's accent role.

**The Semantic Color Rule.** Use semantic roles for surfaces, information, borders, focus, and status so light and dark modes remain coherent.

### Optional reference library

The separate `primitives.palette` library contains 26 ramps, each with 11 steps (50–950), plus black, white, and transparent: 289 reference colors. It includes the pinned Tailwind CSS 4.3.3 reference, with MIT provenance in `packages/tokens/src/tokens.json` and `packages/tokens/licenses/tailwindcss.txt`. This breadth is available for authored work and foundation specimens; the semantic antiflex light/dark theme and the frontmatter brand roles stay unchanged.

Use optional CSS variables such as `--af-palette-blue-500` or the namespaced Tailwind mapping `bg-af-blue-500`. The shared generator `scripts/build-tokens.mjs` creates these mappings from the token source. The color browser searches ramp names and lets a swatch copy a CSS variable, canonical source value, clipped sRGB HEX preview, or Tailwind class. Selection remains explicit through the inspector, pressed state, and text feedback; failed clipboard access leaves the displayed value available for manual copying.

OKLCH is canonical for the reference ramps. Figma color variables and HEX use clipped sRGB previews produced by the shared conversion in `packages/tokens/src/foundations.ts`; gamut clipping can change the appearance of out-of-sRGB colors. Do not round-trip a Figma preview into the canonical source.

**The Optional Reference Rule.** Use the palette and typography reference namespaces for explicit design choices and specimens; keep semantic antiflex roles and the established three typography voices as the defaults.

## Typography

**Display Font:** Anybody, with sans-serif fallback.
**Interface Font:** DM Sans, with sans-serif fallback.
**Technical Font:** Space Mono, with monospace fallback.

### Hierarchy

- **Display:** the marketing headline uses the frontmatter display role, reducing to 60px at widths up to 1100px and 44px up to 767px. Marketing section headings also use Anybody, at 24px on desktop and 22px on mobile.
- **Headline:** documentation titles use the headline role and reduce to 34px on mobile. Documentation section headings use 23px DM Sans with medium weight and compact tracking.
- **Title:** application page headings use the title role, reducing to 25px on mobile and increasing to 32px from 1500px. Compact panel headings use 12px uppercase Space Mono in the dashboard.
- **Body:** the interface baseline is the body role. Documentation prose uses 14px/1.8 and a 70ch reading measure; leads use 17px/1.7, reducing to 15px on mobile. Marketing supporting text uses 19px/1.5, reducing to 16px on mobile.
- **Labels and controls:** badges use the label role; small buttons use 12px and normal buttons use the control role. Table headers use uppercase Space Mono with the table-label tracking. Header navigation uses 11px uppercase Space Mono.
- **Modal title and description:** Dialog and AlertDialog share the `dialog-title` and `dialog-description` roles. Keep modal titles in DM Sans with normal tracking; action labels retain the normal control role.
- **Code and data:** code blocks use the code role; inline code is 0.85em. Dashboard metric values use the data role. Amounts and identifiers use Space Mono at their contextual size.

Anchored assistance stays in DM Sans: Popover uses the body role with a 16px medium title; Tooltip uses regular 12px text at 1.5 line-height. Display and technical faces do not replace these compact reading roles.

**The Three Voices Rule.** Use Anybody for display and identity, DM Sans for reading and controls, and Space Mono for technical labels, code, and aligned operational data.

### Optional reference typography

The `primitives.typography` library exposes 13 sizes (xs–9xl), nine weights (100–900), six unitless leading choices, and six em-based tracking choices through `--af-typography-*`. Tailwind mappings retain the `af-` namespace: `text-af-base`, `font-af-medium`, `leading-af-relaxed`, and `tracking-af-tight`. Each text-size utility pairs its size with its default pixel line-height. These reference controls extend the available vocabulary without changing the established hierarchy above.

| Size | Font size / default line-height (px) |
| ---- | ------------------------------------ |
| xs   | 12 / 16                              |
| sm   | 14 / 20                              |
| base | 16 / 24                              |
| lg   | 18 / 28                              |
| xl   | 20 / 28                              |
| 2xl  | 24 / 32                              |
| 3xl  | 30 / 36                              |
| 4xl  | 36 / 40                              |
| 5xl  | 48 / 48                              |
| 6xl  | 60 / 60                              |
| 7xl  | 72 / 72                              |
| 8xl  | 96 / 96                              |
| 9xl  | 128 / 128                            |

Leading choices are none (1), tight (1.25), snug (1.375), normal (1.5), relaxed (1.625), and loose (2). Tracking choices are tighter (-0.05em), tight (-0.025em), normal (0), wide (0.025em), wider (0.05em), and widest (0.1em). The 128px endpoint and -0.05em tighter option are user-requested reference choices, not new brand defaults.

The playground exposes editable sample text, family, size, supported weight, default or explicit leading, tracking, italic, and numeric figures with generated CSS. Bundled genuine font faces total 40: DM Sans and Anybody each provide weights 100–900 in normal and italic; Space Mono provides 400/700 in both styles. Unsupported family weights are disabled and switching families restores a supported weight. Preview text disables synthesized faces. Georgia is a browser-provided optional serif reference, is not bundled, and is unavailable in the current Figma environment. Numeric-feature rendering depends on the selected font's OpenType support.

Figma preserves named reference assets: sizes and default line-heights bind pixel variables; leading ratios multiply by 100 for native line-height percentages, and tracking em values multiply by 100 for native letter-spacing percentages. The expansion adds 337 variables (496 total) and 39 text styles (55 total), including the reference scale, weights, leading, tracking, and family treatments. Browser-only Georgia is disclosed rather than substituted into the Figma library.

## Layout

The spacing rhythm uses the frontmatter scale. Compact control groups use smaller gaps, panel divisions typically use 20px or 24px, and marketing sections get more room. Default cards use 20px padding.

Marketing has a centered container capped at 1440px with 32px outer padding. Its ruled hero uses a wide text column beside original geometric artwork, then a working component specimen. At widths up to 767px, the hero stacks, outer padding becomes 16px, and actions wrap.

Documentation keeps a distinct reading layout: a 240px sidebar within a 1440px shell, with an article capped at 930px and desktop padding of 48px vertically/64px horizontally. The article reduces padding at 1100px and uses a disclosed navigation and 32px/24px/60px article padding on mobile.

Foundation pages inherit the documentation shell. The color toolbar has two columns, ramp steps use 11 columns with 8px gaps, and the type controls use three columns with 16px gaps. At widths up to 640px, the toolbar becomes one column, ramps reflow to six columns, type controls become two columns, and the inspector wraps. The type preview keeps oversized samples in a focusable internal scroll region (160px minimum, 360px maximum height), with whitespace preserved, rather than expanding the document width. Specimen rows retain thin seams and readable metadata beside the sample.

**The Stable Documentation Navigation Rule.** At widths of 768px and above, keep the documentation header pinned at the viewport top and the sidebar pinned below its 72px height. The sidebar fills the remaining dynamic viewport and scrolls independently while the article uses document scrolling. At widths up to 767px, keep the sidebar in normal flow with disclosed navigation. Component links and the component overview share one catalog ordered A–Z by display name; retain Overview before the component links.

The reusable AppShell defaults to a 224px sidebar and 64px topbar. Its optional `navigationLayout="top"` is used by the operational example: 48px desktop header, approximately 40px horizontal navigation, and a centered 1264px outer main container with 32px padding (1200px content). Up to 767px, the header is 56px, navigation becomes a disclosure, and the top-layout main uses 24px/16px padding. Multi-column panels stack and metrics become two columns. Wide tables keep their own horizontal scroll region.

Form rows align their fields at the start so help and error text can grow without stretching neighboring controls. In the documentation form, paired columns become one column at widths up to 600px; this is a form-layout breakpoint, independent of the shell's mobile breakpoint. FieldSets separate related controls with the existing spacing rhythm.

Feedback and navigation keep intrinsic sizing: breadcrumb, pagination, empty-state actions, keyboard groups, and horizontal toggle groups wrap. Tab lists scroll within their container. Vertical tabs use a narrow track capped at 160px beside a flexible panel, separated by a logical end border; content can shrink and long text wraps. These component layouts do not introduce a new global breakpoint.

Modals center within the viewport using the shared small, medium, and large dialog widths, retaining 16px clearance on each side and a maximum height of the dynamic viewport minus 32px. Overflow stays inside the panel. Headers and footers use the existing 8px gap; bodies use 16px. At widths up to 480px, footer actions stack at full width in the same DOM order used on desktop.

Edge panels attach to the viewport instead of using the centered modal clearance. Sheet fills its chosen edge; Drawer follows its content height up to 85dvh. Both keep their Body as the independent scroll region and retain safe-area padding around persistent titles and actions. Their footer uses the existing 480px stacking breakpoint. See Sheets and Drawers for the size and anatomy rules.

Anchored floating content uses an 8px default trigger gap and 8px collision clearance. Placement follows anchor/content resize, captured scrolling, and the visual viewport; it tries the preferred side, flips to a fitting side, and clamps within available space. Top/bottom start/end alignment follows the anchor’s text direction. Content scrolls internally when constrained and requests dismissal when the anchor is clipped out of view. These are viewport-aware layouts rather than a new breakpoint.

Workspace tools reuse this shell and anchored placement. Menubar and Navigation Menu headings wrap; selection controls cap at available width. Select and Combobox use a 4px trigger gap and 8px collision clearance. Their popup border box caps at 288px; its scrollable listbox subtracts 10px for padding and borders and also caps at the dynamic viewport minus 26px. Command uses its frontmatter width as an outer maximum, not a fixed width; its 320px inline popup border box contains a listbox capped at 310px. Keep this allocation when changing list density. Date Picker adds 32px to the Calendar width and caps at the viewport minus 16px. Coarse pointers increase option and calendar-day minimum heights to 44px without changing the seven-column calendar.

Toast viewports use the frontmatter Toast width, capped by the viewport with 24px logical edge offsets and safe-area clearance. The fixed stack scrolls internally within the dynamic viewport and supports all four start/end corner positions; bottom-end is the default. Inline layout remains in document flow at full available width up to the same cap. Stack spacing uses the existing 8px step.

## Elevation & Depth

Resting surfaces have no box shadows. Neutral tone, thin seams, spacing, and content hierarchy provide depth. The declared low-elevation primitive is unused by these patterns and is not part of the recorded shadow vocabulary. Native modal panels retain this flat material in the browser top layer; the semantic scrim separates the active task from the inert page without adding a panel shadow.

Popover and Tooltip also use native manual popovers in the browser top layer, without a scrim, page inertness, or scroll lock. Their existing near-square material stays flat, with no added shadow, decorative arrow, or entrance/exit animation. Forced colors uses Canvas, CanvasText, and a visible panel border.

**The Ruled Surface Rule.** Separate resting panels and shell regions with tone and thin borders; keep the established flat material.

## Shapes

Panels and cards are square (`rounded.md`); controls and badges have nearly square corners (`rounded.sm`). Thin borders (1px) outline controls, frame containers, and divide rows. Profile and customer tiles also use the nearly square treatment. Circular loading spinners and activity dots retain their functional geometry. Native radio choices are circular; checkboxes, switch tracks, and switch thumbs retain the near-square form language rather than adopting pill silhouettes.

Use the approved geometric A inset within the existing cut-corner frame. Marketing can echo that geometry in its authored vector artwork and clipped install action. Ordinary panels remain square; the identity shape is not a clipping requirement for every component.

## Components

### Buttons

Compact actions use regular DM Sans, an 8px icon/text gap, 16px SVG icons, and nearly square corners. Core small and medium buttons are 32px high; large buttons are 40px. Horizontal padding is 12px, 16px, and 20px respectively; small text is 12px and other sizes use 14px. Primary hover uses action-hover; secondary and ghost hover use subtle. Secondary has a strong border; danger pairs danger text with its soft fill and adds a danger border on hover.

Visible focus uses a 2px outline offset by 3px. Disabled/loading buttons use 0.5 opacity and native disabled state. Background, text, and border transitions use 120ms; reduced-motion removes transitions. Activation briefly changes brightness. Loading spinners rotate over 0.8s and stop for reduced motion.

### Chips

Badges are quiet status labels, with neutral, accent, success, warning, and danger role pairs. Default badges use 12px medium text and 2px vertical/8px horizontal padding; compact badges use 11px and 1px/6px. They retain readable status text rather than relying on color alone.

### Cards / Containers

Square, flat group boundaries use surface and a thin border; subtle cards use subtle. The shared padding choices are none, 12px, 20px, and 24px. Grouped measurements share seams rather than floating as elevated cards.

### Inputs / Fields

Flat surface controls use strong borders, nearly square corners, and the `field`, `field-sm`, and `field-lg` heights. Shared Input, NativeSelect, and InputGroup use the field size vocabulary; Textarea uses the same typography and border with vertical resizing and size-dependent minimum height. Input text uses regular DM Sans; labels use medium weight and help uses the smaller interface role. Label/control/help spacing follows the existing compact rhythm. Read-only inputs use inset fill and remain focusable; disabled controls use native disabled state, dimming, and a disabled cursor. Invalid controls and adjacent error text use danger while retaining the visible focus outline.

**The One Control Rule.** Each Field associates one native control with its Label. Use FieldSet and FieldLegend for related controls. Field resolves an explicit native or antiflex child control ID through transparent wrappers, including InputGroup; otherwise it uses `controlId`, then a generated ID. Its Label and description/error IDs share that resolved ID. Control props can override inherited required or invalid state, and described-by IDs are merged without duplicates. A consumer's own custom control component that hides its rendered control must share an explicit ID through Field's `controlId`. Label's required asterisk is hidden from assistive technology: the control's native `required` attribute carries the requirement. Standalone Label does not make a control required.

Input, Textarea, NativeSelect, Checkbox, and Switch forward native refs and attributes. TextField remains a convenience composition of Field, InputGroup, and Input; its ref still targets the input, and its error replaces its description. An input's native required prop remains effective, while the visible required marker is requested through Field or Label. NativeSelect preserves browser selection behavior, including native multiple selection. Single selection uses a decorative, pointer-transparent 16px SVG chevron at the logical end with `spacing.3` inset and `spacing.10` text clearance. Multiple selection retains native appearance without the chevron; forced colors restores native appearance, hides the chevron, and returns end padding to `spacing.3`.

### Choices and Switches

Checkboxes and radio controls share the `choice-sm`, `choice-md`, and `choice-lg` sizes. Checkbox checked and indeterminate states use action fill with the paired action-foreground check or dash. Radio selection uses the theme accent as a thick circular border. RadioGroup uses a native fieldset/legend and same-name radio inputs, preserving browser arrow-key selection; horizontal options wrap. Switch uses a checkbox with `role="switch"` beneath a decorative track. Its paired `switch-sm`, `switch-md`, and `switch-lg` width/height tokens scale together; the thumb moves to the logical end when checked. Native checkbox submission rules also apply to switches.

**The Native Ownership Rule.** Uncontrolled values use `defaultValue` or `defaultChecked` and reset through the native form. Controlled values use `value` or `checked` and remain consumer-owned; the form's reset handler must restore consumer state and validation state. RadioGroup follows the same distinction through `value`/`defaultValue`; Checkbox's indeterminate visual state is separately consumer-owned. Keep names, native validity, form association, and disabled behavior intact.

### Input and Button Groups

InputGroup gives a single input and its addons one flat border and shared focus-within outline. Addons use logical `start` and `end`; inline padding and ordering follow text direction. Keep DOM order meaningful, especially for interactive content, because visual addon order does not change keyboard order. Decorative addons are hidden from assistive technology; meaningful prefixes or suffixes need an accessible association with the input. Group invalid styling does not replace the control's own invalid state.

ButtonGroup joins ordinary buttons along shared seams, horizontally or vertically. It exposes `role="group"`; provide an accessible group name when context needs one. Each enabled button remains in the ordinary Tab sequence. The group supplies neither toolbar arrow navigation nor selection behavior. Specify each button's native form type for submit, reset, or other actions.

### Form Accessibility and Motion

Controls keep the shared visible focus treatment; InputGroup places it on the enclosing border. Help and errors remain adjacent and associated, rather than relying on color alone. Checkbox and radio return to browser-native appearance in forced-colors mode. Switch uses system ButtonText, Highlight, and HighlightText colors so both states retain a visible track and thumb. Form state changes introduce no decorative animation; existing button transitions and loading animations retain the reduced-motion behavior documented above.

### Navigation

The site header uses uppercase technical labels and a thin foreground underline for the current section. Documentation retains 13px DM Sans sidebar links, muted at rest and foreground on subtle for the current page. The operational example uses 13px DM Sans horizontal navigation with 10px/12px padding and a foreground bottom rule for its active item. Mobile application navigation becomes a grid with subtle active fill. Menus expose expanded state, close on navigation, and return focus to their trigger on Escape.

### Feedback and Loading

Alert is a square, flat message with the `alert-neutral` padding and typography, a thin border, a semibold title, and optional 16px decorative SVG. Success, warning, and danger use their soft-fill/text pairs and a current-color border. Neutral uses surface, foreground, and the ordinary seam. Body links stay underlined and inherit the message color. Static content has no live role by default; consumers choose `role="status"` for non-urgent inserted updates or `role="alert"` for a newly inserted urgent error.

Progress uses a native, labelled progress element, inset track, accent fill, and the paired `progress-sm`, `progress-md`, and `progress-lg` heights. Omitted or non-finite values are indeterminate; finite values clamp to a valid positive maximum. Indeterminate motion runs for 1.4s and stops for reduced motion. Spinner uses the paired spinner sizes and existing circular rotation; it is decorative without a label and exposes a hidden status label when one is supplied. In forced-colors mode, progress returns to native appearance and spinners use system ButtonText.

**The Explicit Feedback Rule.** Keep feedback readable as text, label measurable progress, and choose announcements intentionally at the consuming surface.

### Toasts

Brief feedback stays beside the task in the existing flat neutral material. Toast uses the frontmatter surface, body typography, padding, width, and near-square corner roles with a thin strong border. Titles are medium weight; descriptions use muted ink with 4px top spacing. Neutral, success, warning, and danger share this material: the restrained 20px SVG status icon changes tone, while text states the outcome. Content wraps; the body can shrink. Actions sit 12px below the message and retain small secondary-button styling. The named dismiss button is 28px square for fine pointers and 44px for coarse pointers, with a 16px SVG. Focus retains the shared neutral outline; forced colors uses CanvasText for the border and icon. There is no added shadow, scrim, gesture, or entrance/exit animation.

**The Deliberate Notification Rule.** Ordinary neutral and success messages default to six seconds; warning, danger, and actionable messages persist unless the consumer explicitly supplies a duration. Zero disables expiry. Queue timers begin only when a message is visible and the viewport is attached. Hover, viewport focus, a hidden document, and window blur pause timers, which resume with remaining time; a pending action pauses its own timer. Updating a message resets its duration. Keep essential information available in the application beyond transient feedback.

ToastProvider and the local `useToast` hook own a bounded queue: three visible messages and 50 total by default, configurable to 1–5 visible and 1–100 total with capacity at least the visible limit. Extra messages wait with a visible queue count. New messages at capacity return `null`; explicit IDs replace existing messages without adding another slot. `update`, `dismiss`, and `dismissAll` stay scoped to that provider. Actions dismiss on successful completion; returning `false` keeps the message, and rejection leaves a persistent danger message for retry. Backend persistence and undo effects remain consumer-owned.

**The Uninterrupted Work Rule.** New feedback never takes focus. Keep stable polite/status and assertive/alert announcers separate from visible named groups; announce only visible new or updated messages, and reserve explicit assertive priority for urgency. Use one ToastViewport per ToastProvider. Offer a visible Review notifications action through the viewport ref when explicit focus access is useful; do not install a global shortcut. Escape dismisses only from within that viewport. Removing a focused message restores another notification control or its recorded origin only while focus is still owned, preserving focus moved by an action into a dialog.

Fixed layout uses a native manual popover in the top layer without modal behavior; inline layout remains beside the work. Fixed layout requires native popover support. For actionable feedback inside a native modal, mount both provider and viewport inside that modal so its controls remain available within the active task. The presentational Toast is a named group with no timer or live region; provider announcements and queue behavior belong to the composed family.

### Tabs and Toggles

Tabs use a flat ruled list, compact 4px spacing, and `tab-trigger` padding. Triggers have a 36px minimum height, muted resting text, subtle hover fill, and the shared `selection-active` pair when selected. The panel has 20px vertical/4px horizontal padding. A tab and its panel share generated ARIA associations; inactive panels remain mounted and hidden. Panels are focusable by default. Automatic activation follows focus; manual activation waits for native Enter or Space activation.

Toggle is a native button with `aria-pressed`, default or outline treatment, and the button height scale. Pressed controls use `selection-active` plus an accent border. ToggleGroup supports single or multiple pressed values; arrows move focus without changing pressed state, and Enter or Space toggles the focused button. Name each list/group and give icon-only controls accessible labels. Disabled controls retain native disabled behavior and 0.5 opacity.

**The Scoped Collection Rule.** Tabs and ToggleGroup maintain one enabled Tab stop per collection, recover to the first enabled item when needed, and discover rendered descendants through custom wrappers. Nested collections retain their own focus order. Arrow navigation skips disabled items, follows orientation and horizontal text direction, and supports Home/End. ToggleGroup can disable looping; Tabs loop. Controlled selection and pressed values remain consumer-owned; defaults initialize uncontrolled state once.

### Disclosures

Accordion is a set of thin bottom-ruled rows. Its medium-weight native heading buttons use 16px vertical padding, foreground text, accent hover, and a 16px SVG chevron; open chevrons rotate with the shared fast transition. Muted content uses 16px bottom padding. Consumers choose the heading level; single and multiple modes use arrays of values. When collapse is disallowed, the last open trigger communicates its unavailable closing action with `aria-disabled`. Enabled headings keep their normal Tab order, with Up/Down/Home/End shortcuts scoped to that accordion.

Collapsible uses a nearly square, strongly outlined native button, a 32px minimum height, 8px/12px padding, and subtle hover. Its content has 16px vertical padding. Both disclosure families connect `aria-expanded` and `aria-controls` to mounted, hidden content; root/item disabled state reaches their buttons. Collapsible returns focus to its trigger when closing content that held focus. Controlled open/value state remains consumer-owned. Disclosures reveal content without height animation; chevron transitions stop for reduced motion.

### Supporting Content and Navigation

Breadcrumb uses a wrapping ordered list, 8px gaps, muted real links, foreground current-page text, and decorative separators that reverse in RTL. Pagination uses a wrapping list with 4px gaps and compact 32px controls; its current page gains a surface fill and strong border. Links preserve browser navigation; disabled links lose their destination and Tab stop, and client-held state uses PaginationButton. Page ranges, fetching, and announcing results belong to the consumer.

Avatar is nearly square with an inset fill and thin border, using the paired avatar sizes. Initials or a supplied fallback remain visible until an image loads and after an error. Its outer image role carries the supplied alternative text; the image and fallback inside are decorative. Empty centers an optional 28px decorative icon, a medium title, muted description capped at 44ch, and wrapping actions, with 40px vertical/20px horizontal padding. Provide contextual guidance and a useful action where applicable.

Kbd renders semantic keyboard text in Space Mono within a strongly outlined, nearly square keycap, at least 24px in each dimension and padded 2px/6px. KbdGroup wraps with 4px gaps; it documents a shortcut without installing a handler. Typography styles semantic HTML with the existing three voices, a 70ch measure, 16px or compact 14px body at 1.8 line-height, ruled blockquotes, inset code, and scrollable preformatted content; consumers own the document outline. AspectRatio clips media to a supplied positive ratio, defaulting to 16:9; images and video cover their frame, and accessible media descriptions remain consumer-owned.

All interactive feedback/navigation controls retain the shared focus outline. Forced-colors selection gains a system Highlight outline for selected tabs, pressed toggles, and the current page. Keep that indication distinct from keyboard focus.

### Dialogs and Alert Dialogs

One focused task sits in a square, flat surface panel with a thin strong neutral border. Dialog and AlertDialog share the modal width, header/body/footer padding, and typography roles above. The footer uses subtle fill and a thin top seam; actions retain the ordinary button variants and control type. Titles and descriptions wrap long content. Forced-colors mode uses a system CanvasText panel border.

**The Protected Task Rule.** Open modal content with native `dialog.showModal()` so the page outside the active modal is inert. Keep Tab and Shift+Tab inside that modal, exclude nested dialog controls from its focus loop, and let Escape close the topmost modal. Nested modals share a reference-counted document scroll lock; closing the last one restores the original inline overflow setting.

Give each modal an accessible name through its title or explicit ARIA label. A mounted description supplies the default description association. `initialFocusRef` can choose a focusable element inside the panel; otherwise Dialog uses the native initial focus behavior with an enabled-control/title fallback. AlertDialog prefers its enabled Cancel action. Preserve visible focus, including when the title receives focus.

Dialog permits completed outside pointer dismissal by default and can disable it with `dismissOnOutside={false}`. AlertDialog ignores outside dismissal and provides explicit Cancel and Action controls; its default Action uses the danger variant. Escape remains available unless a consumer prevents cancellation. Choose clear action labels and a safe initial focus for confirmation tasks.

**The Modal Ownership Rule.** Controlled open state, form drafts, validation, submission, and body content remain consumer-owned. Close/Cancel/Action call the consumer handler before requesting closure; preventing the click's default keeps the modal open. Return focus to the invoker or `returnFocusRef` when the target is connected and focusable. Focus return is queued so a workflow action mounted by the closing update can receive it. Closing a modal does not itself save, discard, or reset form values.

### Sheets and Drawers

Sheet and Drawer extend the existing modal material for an interrupted task beside the page. Both reuse Dialog's native modal behavior, title/description roles, subtle footer, focus handling, scrim, dismissal options, and consumer-owned state. Their surface remains square and flat with thin neutral seams; neither introduces a new palette or type hierarchy.

Sheet defaults to the right edge at medium size. Its `side` is physical: top, right, bottom, or left; left and right do not swap in RTL. Left/right sheets use the frontmatter sheet-width scale and fill the dynamic viewport height. Top/bottom sheets fill the viewport width and use the sheet-height scale. All dimensions cap at the viewport, and borders disappear at attached edges while retaining the interior seam.

Drawer defaults to medium size, sits centered against the bottom edge, and uses the frontmatter drawer-width scale capped at the viewport width. Height follows content up to 85dvh. It has no swipe, drag handle, or snap-point behavior.

**The Persistent Panel Actions Rule.** Place Header, Body, and Footer directly inside Content, or inside one direct form. Let Body shrink and scroll independently while Header and Footer stay reachable. Preserve the inherited footer action order when actions stack at widths up to 480px. Do not add wrappers that break this flex anatomy.

Panel padding retains the shared modal rhythm and accommodates safe areas: top header padding and horizontal padding take the larger of the modal padding or the corresponding safe-area inset; footer bottom padding takes the larger of 16px or the bottom inset. Long body content wraps, and overscroll stays within Body. The Protected Task and Modal Ownership rules apply equally to Sheet and Drawer; saving a draft or exporting a file remains a consumer action.

### Popovers and Tooltips

Compact anchored assistance keeps the surrounding task available. Popover is a small interactive task; Tooltip is short supplemental text. Both retain the existing near-square corners and theme roles rather than introducing a new visual world.

Popover uses the frontmatter width and padding, an 8px internal gap, a thin strong border, and the existing body text. Supply one title or an explicit accessible name, an optional short description, and a reachable close action. The title is medium-weight DM Sans; descriptions use muted ink. Inputs and actions retain their ordinary component styles.

**The Anchored Task Rule.** Use a nonmodal Popover for a small task that belongs to its trigger. Move initial focus to the first focusable descendant or Content; an explicit `initialFocusRef` must target a visible descendant. Do not trap Tab or make the page inert. Escape, a completed outside pointer gesture, or focus leaving both trigger and panel requests dismissal of the top floating layer. Close and Escape restore the trigger or `returnFocusRef` when focusable; outside/focus dismissal preserves an outside focus destination. Controlled consumers must honor `onOpenChange`; form drafts, validation, and applying changes remain consumer-owned.

Tooltip uses foreground as its fill and surface as its text, with the frontmatter padding and a 272px maximum width. Keep content plain text, wrapping when needed, and leave focus on the trigger. Pointer hover opens after 500ms by default; keyboard focus opens immediately. A transparent bridge spans the placement gap and a 180ms grace period allows travel between trigger and text. Touch hover is ignored. Escape or trigger activation dismisses without moving focus; a fresh trigger entry or focus can reopen it. The generated description ID merges with existing `aria-describedby` IDs.

**The Supplemental Help Rule.** Give the trigger a complete visible or accessible action name. Tooltip adds context; essential instructions and errors stay visible. Tooltip contains no controls and receives no focus. Disabled native buttons need visible help because they cannot receive keyboard focus. Use Popover when assistance needs an interactive control.

### Dropdown and Context Menus

Discrete commands sit beside their work in a compact, flat list. Dropdown Menu uses a visible native button; Context Menu opens from a named, focusable region through right-click, Shift+F10, or the ContextMenu key. Supply equivalent commands through a visible actions button for touch and discoverability. Keep text fields and forms in Popover or a modal task.

A root contains Trigger and Content; Item is a native command button and Link is a real anchor. Group, Label, Separator, Shortcut, CheckboxItem, RadioGroup/RadioItem, and nested Sub/SubTrigger/Content supply the remaining anatomy. Keep parts as DOM descendants of their owning menu, including through rendered wrappers. Surface, foreground, thin seam, nearly square corners, quiet neutral focus/hover, and danger soft-fill states inherit existing roles. Items use regular DM Sans body type; shortcut hints use 12px Space Mono. Labels have medium weight, indicators and icons reserve 16px, and separators use a thin full-width seam. Shortcut hints describe keys without installing global bindings.

The frontmatter menu widths pair with small, medium, and large minimum item heights (28/32/40px). These are minimums, not fixed heights: body text plus 4px vertical padding yields a 29px small text row. Coarse pointers raise the minimum to 44px; long labels wrap. Content uses the shared small spacing inset; items use 4px/8px padding and 8px gaps. Native manual popovers place menus in the top layer without a scrim, shadow, or added animation. Placement follows scroll and resize, flips and clamps to the visual viewport, and dismisses hidden anchors; nested submenu clipping is checked against its actual top-layer container. Logical spacing follows direction, and submenu chevrons and directional keys reverse in RTL.

**The Local Command Rule.** Name each menu and keep one roving focus stop per menu level. Dropdown Enter/Space/ArrowDown starts at the first item; ArrowUp starts at the last. Up/Down wrap, Home/End and buffered typeahead navigate the current level, and disabled items remain discoverable through `aria-disabled` without activating. Click or the forward arrow opens a submenu; the backward arrow closes it. Escape closes one floating level and restores its invoker; Tab/Shift+Tab close the entire tree and move beyond the root invoker. Outside pointer completion and focus exit request dismissal. Menus do not trap focus or open submenus on hover.

**The Menu Ownership Rule.** Controlled open and choice state remain consumer-owned. Ordinary selection closes the tree; checkbox and radio items stay open by default unless `closeOnSelect` requests closure. Preventing `onSelect` cancels automatic close and choice changes, and cancels Link navigation; preventing the click cancels selection. Restore focus only while the menu still owns it so an action opening a modal preserves the modal's focus. Keep persistence, permissions, networking, and destructive confirmation in the consuming workflow.

### Workspace Navigation and Previews

Hover Card is a supplementary named region beside a real link, with a separate visible Toggle for touch. It reuses flat surface/foreground/strong-border material, the frontmatter width and padding, an 8px content gap, and a 16px medium DM Sans title. Non-touch hover opens after 600ms and closes after 300ms by default; focus opens immediately. Entering the panel cancels pending closure; Escape, outside pointer, or focus exit dismisses the top floating layer. The preview does not take initial focus or make the page inert. Keep essential information and navigation available outside hover.

Menubar groups application commands in a square ruled frame with 42px minimum height, frontmatter padding, and 4px gaps. Its top-level headings use one roving Tab stop; Left/Right follow text direction, Home/End move to the ends, and buffered typeahead searches headings. Arrows can transfer an already open menu; non-touch pointer entry switches headings only while a menu is already open. The inherited menu parts retain nested command, disabled, checkbox/radio, Escape, and Tab-exit behavior. This top-level switching does not introduce hover-open submenus.

Navigation Menu is a named nav with ordinary links and disclosure buttons. Headings wrap with 8px gaps; open content uses the frontmatter width and padding, 4px internal gaps, and links with 12px padding. Open triggers use subtle fill and rotate their chevron over the existing fast duration; reduced motion removes that transition. Current links use accent-soft/accent. Down/Up explicitly opens and focuses the first/last panel link; Tab keeps ordinary link order. Escape returns owned panel focus to the trigger; outside pointer or focus exit dismisses without trapping focus. Controlled disclosure state remains consumer-owned.

**The Navigation Intent Rule.** Use Menubar for application commands and Navigation Menu for destinations. Preserve real links, the visible Hover Card toggle, and normal page access around nonmodal layers.

### Select, Combobox, and Command

Select and Combobox share flat ruled controls in the existing small/medium/large field heights; small text is 12px, other text is 14px. Their frontmatter widths are capped at available space. Popup rows have 8px/12px padding, a 12px gap, 16px SVG indicators, 12px descriptions, and a 36px minimum height; text can increase the actual height. Groups are 12px medium muted text. Active rows pair accent-soft/accent with a 1px inset focus outline; a selected check independently identifies the committed value. Disabled rows stay visible at 0.5 opacity but do not activate or join enabled arrow movement. Coarse pointers use a 44px row minimum. Controls retain the strong border, danger invalid state, muted placeholder, and 2px focus outline with 2px offset.

Select is a button combobox with buffered typeahead and Home/End navigation while open. Combobox is an editable text combobox: search matches accent-insensitive label/keyword substrings, and uncommitted text restores the committed label on dismissal; clearing text clears selection. Both keep DOM focus on the control with an active descendant, wrap enabled Up/Down navigation, commit on Enter (Select also Space), and dismiss on Tab, Escape, outside pointer, or focus exit. Loading and empty rows remain explicit. Hidden native selects preserve names, form association, required validity, submission and reset; invalid submission focuses the visible control and associates visible error text. Defaults reset automatically; controlled values remain consumer-owned. The selection DOM namespace is separate from native radio choices.

Command reuses the editable list in document flow, with the frontmatter outer maximum and padding. It has no committed selection or form mirror: its active row names the candidate action. Escape clears its query. The popup caps at 320px including 4px padding on each side and 1px borders; the independently scrolling listbox caps at 310px so the last row and active outline remain fully visible. CommandDialog composes the existing native Dialog, names the task, focuses search initially, and closes after a successful local action. An item's synchronous `false` return keeps the dialog open; action effects and persistence are consumer-owned. No global shortcut service, asynchronous action lifecycle, or virtualization is supplied.

**The Selection Ownership Rule.** Keep search text, active option, and committed value distinct. Preserve native form mirrors for Select and Combobox, scroll the listbox rather than the page, and reserve Command for consumer-owned local actions.

### Calendar and Date Picker

Calendar keeps a seven-column, six-week Gregorian grid in the frontmatter width, with 2px cell spacing and a 36px day-button minimum height (44px for coarse pointers). These are height minimums; column width follows the bounded grid and is not a promised 44px square target. Day numbers are tabular DM Sans. Today has a strong border, outside-month days use muted ink, unavailable dates retain discoverable `aria-disabled` state and dimming, and the committed single date uses action/action-foreground. A polite month heading and associated keyboard help stay visible. One day is in the Tab order; horizontal arrows follow text direction, vertical arrows move a week, Home/End follow `weekStartsOn`, Page Up/Down changes month, and Shift changes year. Locale affects labels; `weekStartsOn` defaults explicitly to Sunday rather than being inferred from locale. Date and month state can be controlled; min/max and disabled predicates remain consumer-supplied.

Date Picker composes the existing nonmodal Popover and Calendar. Its trigger has a 240px minimum capped by available width; selected labels truncate visibly while the accessible name retains the full date. Content uses the frontmatter cap and padding; actions align at the end with an 8px gap and 12px top space. Opening targets the active day. Choosing or clearing commits immediately and closes; Cancel closes without another value change. A hidden native date input preserves `YYYY-MM-DD` form submission, required/min/max validity, form association and reset; predicate-invalid selections set native custom validity. Visible requirement/error text and focus restoration remain explicit. Read-only preserves submission while preventing opening. Support is one Gregorian date only: range, time, alternative calendars and typed date entry are outside this implementation.

### Tables and Technical Specimens

Core tables use 40px headers and 52px body rows with 8px/20px cell padding, thin row dividers, and inset hover fill. Keep native table semantics, captions, and header scope. Code and interactive specimens sit in flat ruled containers. Skeletons pulse over 1.5s and stop for reduced motion.

### Foundation Browsers

Color and typography references use existing Field, Input, NativeSelect, Checkbox, Button, and Code patterns inside the flat documentation layout. Color swatches are native buttons with step labels and an explicit selected outline; transparent uses a dashed border. The inspector retains a named value and a separate copy action. Search has a clear empty state and recovery action. The type playground pairs native controls with a bounded sample and a generated CSS example; it does not alter page typography as options change.

Design/code evidence is retained in `assets/figma/expanded-foundations-color-validation.json` and `assets/figma/expanded-foundations-type-validation.json`; desktop and mobile screenshots in both themes, plus both Figma foundation boards, live in `design/previews/expanded-foundations/`. Reviewer disposition: ship, with no material fixes required. This foundation extension adds no component families.

## Do's and Don'ts

### Do:

- **Do** use semantic roles for both theme mappings and re-resolve semantic component aliases at nested theme boundaries.
- **Do** preserve the approved antiflex/ui name, A mark, and authored vector artwork.
- **Do** retain square panels, nearly square controls, and thin seams.
- **Do** keep visible labels, connected help/error text, and keyboard focus.
- **Do** use the three typography roles for their distinct jobs.
- **Do** pair Field with one native control and use FieldSet/FieldLegend for related choices.
- **Do** preserve consumer ownership of controlled values, reset state, and checkbox indeterminacy.
- **Do** retain logical addon alignment, normal button Tab order, and native form behavior.
- **Do** name tab lists and toggle groups, preserve scoped keyboard collections, and keep controlled state consumer-owned.
- **Do** choose feedback announcements deliberately and retain progress labels, alternative text, and useful empty-state guidance.
- **Do** name modal tasks, keep focus inside the active modal, and provide a reachable focus-return target.
- **Do** keep modal form state consumer-owned and preserve footer action order when stacking.
- **Do** keep Sheet and Drawer Header/Body/Footer direct, or within one direct form, so Body scrolls without hiding actions.
- **Do** name anchored tasks, provide a close action, and preserve consumer-owned floating state.
- **Do** keep tooltip triggers fully named and essential or disabled-control help visible.
- **Do** expose context commands through a visible actions button and retain discoverable disabled menu items.
- **Do** keep actionable Toast messages persistent by default, preserve remaining time when paused, and mount one viewport per local provider.
- **Do** offer explicit notification review and put actionable modal feedback providers and viewports inside the active modal.

- **Do** preserve canonical reference OKLCH and the explicit Figma pixel/percentage typography unit bridge.
- **Do** keep optional reference utilities namespaced with `af-` and disclose family/font-feature availability.
- **Do** distinguish navigation links, application commands, active options, committed values, and the selected date.
- **Do** preserve the listbox border/padding allocation and visible final row when Command lists overflow.
- **Do** provide a visible Hover Card toggle and disclose single Gregorian date and local-action limits.

### Don't:

- **Don't** substitute textual accent colors for the action fill and its paired foreground.
- **Don't** replace flat ruled panels with resting shadows or broadly rounded cards.
- **Don't** communicate status with color alone; retain readable labels.
- **Don't** substitute reference-site branding or content for antiflex's own identity.
- **Don't** use a visible required marker as a substitute for native required state.
- **Don't** treat ButtonGroup as a toolbar or replace native radio/select keyboard behavior with invented navigation.
- **Don't** use primary-action fills for quiet listbox, tab, or toggle selection, or make every static message a live announcement; Calendar's committed date retains its explicit action-fill treatment.
- **Don't** treat Accordion headings as a one-Tab-stop collection or let nested widgets join their parent's arrow navigation.
- **Don't** dismiss AlertDialog from the backdrop or assume closing a modal commits or resets its form.
- **Don't** add swipe or snap-point expectations to Drawer or treat Sheet sides as logical RTL edges.
- **Don't** trap focus in Popover, add a floating scrim, or treat a popover as a modal confirmation.
- **Don't** put interactive content in Tooltip or use it as the only action name, instruction, or error.
- **Don't** add hover-open submenus, custom long-press gestures, or global key bindings from shortcut hints; keep menus for discrete commands and choices.
- **Don't** steal focus for new notifications, duplicate visible messages as live regions, or install global notification shortcuts.
- **Don't** promote the full reference palette, 128px endpoint, or -0.05em tracking option into antiflex's default brand identity.
- **Don't** replace canonical OKLCH with clipped preview HEX or synthesize unsupported font faces.
- **Don't** infer range selection, alternative calendars, virtualized lists, global shortcuts, or backend persistence from workspace-tool specimens.
