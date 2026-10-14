# Chamfer UI — Figma foundation

Destination requested by the owner: https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled

The current chat's connector continues to report the previous Saphyte account and rejects edit access. **The generated bundle has not yet been run or visually verified in Figma.** No canvas completion is claimed.

## Generate from the shared source

```sh
pnpm figma:build
```

`packages/tokens/src/tokens.json` supplies all variable values and aliases. The dashboard record source supplies the same sample data as the browser. Source icons are rendered directly from the application's Tabler icons. The brand uses the repository SVG.

## Import using your Figma desktop account

1. Open the intended Figma Design file with your Eftax editor account.
2. Choose **Plugins → Development → Import plugin from manifest**.
3. Select `assets/figma/generated/manifest.json` in this repository.
4. Run **Chamfer UI — Foundation** from Development plugins.
5. Review the resulting native objects before publishing a library.

The local plugin has no network access and preserves existing pages. It creates only named Chamfer pages and collections. If its own named review frames already exist, that phase is skipped; edit/reconcile those assets deliberately rather than generating duplicates.

## Included output

- **Chamfer / Foundations:** brand mark, getting-started guidance, semantic light/dark swatches, typography, spacing, shape, and motion.
- **Variables:** original primitives; light/dark semantic aliases; component aliases; property-specific scopes; matching CSS code syntax.
- **Styles:** six IBM Plex text styles and the low-elevation effect.
- **Chamfer / Components:** all eight families. Button style families are split into sets of 18 variants each to keep the size/state matrices manageable. Text fields include label/value/hint properties. Other components include applicable sizes, variants, and documented native states.
- **Chamfer / Dashboard:** native editable desktop/mobile frames in light and dark modes, reusable metric/order-row compositions, source icons, synthetic sample records, and component instances.

IBM Plex Sans and IBM Plex Mono Regular and Medium must be available in Figma. The script deliberately fails if a required product font is missing. The target file needs a plan supporting two variable modes.

## Connector execution

`generated/foundations.js`, `components.js`, and `dashboard.js` are independent `use_figma` phase scripts. Execute them sequentially in that order once this chat's connector can edit the destination. Save returned IDs in a state ledger. Do not run writes concurrently.

## Acceptance checks still required on the real canvas

- Confirm variable aliases, both modes, code syntax, and component properties.
- Confirm text uses the approved IBM Plex families.
- Inspect each review frame for clipping, overlaps, and incorrect sizing.
- Compare desktop/mobile dashboard screenshots to `assets/previews/` and repair drift before calling the Figma deliverable complete.
