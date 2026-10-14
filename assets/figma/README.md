# Chamfer UI — Figma foundation

The live foundation is in the owner's [Eftax file](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=3-110). The Eftax connector successfully created and inspected these native assets on 2026-10-14.

## Open the deliverables

- [Foundations](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=3-110): identity, light/dark semantic swatches, typography, spacing, shape, and motion.
- [Component review](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=5-387): all eight families in both themes. Main variant sets sit beside the review frame.
- [Desktop light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-127) and [desktop dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-407).
- [Mobile light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-687) and [mobile dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-937).

## Shared source and native structure

`packages/tokens/src/tokens.json` supplies 97 variable values and aliases across Primitives, Semantic (Light/Dark), and Components. Variable names have matching CSS code syntax. Typography uses IBM Plex Sans and IBM Plex Mono, matching text styles, and font-family/size bindings. Spacing, radius, color, and applicable component dimensions use variables.

Button has four style sets of 18 size/state variants each. TextField includes 15 size/state variants; Badge 10; Card 8; Separator 4; Skeleton 2; Table 3; AppShell 2. Labels, field values, hints, and table captions have appropriate component properties. The dashboard uses reusable metric/order-row compositions and component instances. It contains editable text, vectors, rectangles, and auto-layout frames, without screenshot fills.

The dashboard uses the same synthetic order source and source icons as the browser. Desktop width is 1440px; mobile width is 390px. Both themes share the same geometry.

## Verification and comparison limits

[validation.json](validation.json) records a passing comparison of every primitive value, semantic alias in both modes, component alias/value, and CSS code syntax. [state.json](state.json) records the created node IDs and reconciliation. Screenshot evidence is in `assets/previews/figma/`.

Visual review repaired clipped swatch labels, control widths/padding, dashboard auto-sizing, mobile order actions, pagination placement, metric icons, customer initials, and dark brand colors. Colors, font families, control heights, and major layout widths match the code source. The Figma dashboard is a static design reference: chart grid decorations, some utility/header icons, Refresh, sort indicators, and application interactions are represented more fully in the browser. Total frame heights differ slightly because of static composition spacing. Pixel-perfect screenshot equivalence is not claimed.

## Generate or import in another file

```sh
pnpm figma:build
```

1. Open a Figma Design file in an editor account supporting two variable modes.
2. Choose **Plugins → Development → Import plugin from manifest**.
3. Select `assets/figma/generated/manifest.json`.
4. Run **Chamfer UI — Foundation**.
5. Review the native objects before publishing a library.

IBM Plex Sans and IBM Plex Mono Regular and Medium must be available. The local plugin has no network access and preserves existing pages. It creates named Chamfer pages and collections; an already existing named review frame causes that phase to skip. Reconcile existing assets deliberately to avoid overwriting edits.

`generated/foundations.js`, `components.js`, and `dashboard.js` are independent connector phase scripts. Execute sequentially in that order and keep returned IDs in a ledger. `scripts/figma/reconcile-dashboard.js` contains the shared final geometry pass used by generation and this live review.
