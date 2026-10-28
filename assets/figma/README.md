# antiflex/ui — Figma foundation

The live foundation is in the owner's [Eftax file](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=3-110). The Eftax connector successfully created and inspected these native assets on 2026-10-14.

## Neutral default — 2026-10-27

The live file now uses Neutral light/dark roles. Thirteen existing neutral primitives and 27 semantic variables were reconciled in place; all 536 variable IDs and existing component bindings remain intact. Mint stays available as an optional primitive palette. See [neutral-theme-state.json](neutral-theme-state.json) for returned values, aliases, scopes, and CSS syntax.

Run `node scripts/build-neutral-theme-figma.mjs` to regenerate the scoped `generated/neutral-theme.js` reconciliation from the current token source. It updates existing foundations without rebuilding components or changing text styles.

## Open the deliverables

- [Foundations](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=3-110): identity, light/dark semantic swatches, typography, spacing, shape, and motion.
- [Component review](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=5-387): all eight families in both themes. Main variant sets sit beside the review frame.
- [Desktop light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-127) and [desktop dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-407).
- [Mobile light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-687) and [mobile dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=6-937).

## Shared source and native structure

`packages/tokens/src/tokens.json` supplies 108 variable values and aliases across Primitives, Semantic (Light/Dark), and Components. Variable names have matching CSS code syntax. Typography uses DM Sans, Space Mono, and Anybody, matching text styles, and font-family/size bindings. Spacing, radius, color, and applicable component dimensions use variables.

Button has four style sets of 18 size/state variants each. TextField includes 15 size/state variants; Badge 10; Card 8; Separator 4; Skeleton 2; Table 3; AppShell 4. Labels, field values, hints, and table captions have appropriate component properties. The dashboard uses reusable metric/order-row compositions and component instances. It contains editable text, vectors, rectangles, and auto-layout frames, without screenshot fills.

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
4. Run **antiflex/ui — Foundation**.
5. Review the native objects before publishing a library.

DM Sans, Space Mono, and Anybody must be available; Space Mono uses Regular/Bold, and DM Sans and Anybody use Regular/Medium/SemiBold. The local plugin has no network access and preserves existing pages. It creates named antiflex pages and collections; an already existing named review frame causes that phase to skip. Reconcile existing assets deliberately to avoid overwriting edits.

`generated/foundations.js`, `components.js`, and `dashboard.js` are independent connector phase scripts. Execute sequentially in that order and keep returned IDs in a ledger. `scripts/figma/reconcile-dashboard.js` contains the shared final geometry pass used by generation and this live review.

## Greptile-inspired revision — 15 October 2026

The owner’s source file has been updated in place: 108 variables, mint action roles, neutral gray light/dark themes, new typography, square geometry, and horizontal desktop navigation. Existing variant/component IDs are preserved; AppShell adds Top variants alongside Sidebar variants. `design/research/greptile.md` records the observed reference and adaptation.

`generated/rebrand-tokens.js` updates the three collections in place. Run `rebrand-app-shell.js` to add horizontal variants, then run the page-scoped `rebrand-foundations.js`, `rebrand-components.js`, `rebrand-dashboard.js`, `rebrand-layout.js`, and `rebrand-presentation.js` against the source file, in order. The page IDs in these scripts belong to this source file; discover and replace IDs for other files before running them. The generation plugin creates the baseline layouts; these explicit reconciliation scripts apply the current reference-driven theme/layout. Review native typography and geometry before library publication.

Latest evidence lives in `design/previews/figma-*.png`; prior evidence under `assets/previews` and the original validation date are historical. Refer to `rebrand-validation.json` for the current token comparison. Static Figma compositions retain some differences in chart decoration, row details, and application state; browser behavior remains authoritative.

## Form foundation — 17 October 2026

The [antiflex / Forms page](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=47-16) adds ten component families: Input, Label, Field, Textarea, Native Select, Checkbox, Radio Group, Switch, Button Group, and Input Group. It contains 119 variants, auto-layout, shared text styles, variable bindings, and component instances in [light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=49-10) and [dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=49-274) review frames.

The file now contains 122 variables, including 14 new form component tokens. [forms-validation.json](forms-validation.json) records a passing native comparison; [forms-state.json](forms-state.json) records the node ledger. Browser and Figma screenshots are in `design/previews/forms/`. Native browser select popups, keyboard behavior, form submission, and reset are represented by the React implementation, not simulated in Figma.

```sh
pnpm figma:forms
```

This generates `forms-foundations.js`, `forms-components-a.js`, `forms-components-b.js`, and `forms-review.js` in `generated/`. Execute those phases sequentially after the baseline and theme reconciliation. They target this existing source file and reuse its Button set and variable collections; discover and replace source-file IDs before using another file. Run `scripts/figma/forms-validation.js` afterwards. `pnpm figma:build` still generates the original eight-family baseline plugin; the form phases are a separate reconciliation step.

## Feedback, navigation, and disclosure — 18 October 2026

The [antiflex / Feedback & navigation page](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=54-18) adds fifteen original families with 99 variants and 122 review instances. Six review boards cover light/dark feedback, navigation/selection, and disclosure/content. The file now contains 136 variables, including fourteen new component tokens. Existing identity, semantic themes, typography, and foundation components are reused.

[feedback-validation.json](feedback-validation.json) records zero native validation issues. [feedback-state.json](feedback-state.json) stores the live node ledger. Browser and Figma review screenshots are in `design/previews/feedback/`. Figma represents visual states; actual keyboard order, controlled state, image loading, progress semantics, and disclosure focus remain authoritative in React.

```sh
pnpm figma:feedback
```

This generates feedback foundation, three component phases, and review scripts under `generated/`. Run phases sequentially against this source file after its baseline/theme/form foundations; preserve source IDs and inspect existing sets before reconciliation. `scripts/figma/feedback-reconcile.js` repairs named visual properties without replacing sets; `feedback-validation.js` compares the resulting native assets. Baseline and form generators remain separate phases.

## Native modal foundation — 18 October 2026

The [antiflex / Modals page](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=61-12) adds Dialog and Alert Dialog: twelve width/focus variants, two mobile construction components, and eight review instances in [Light](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=62-218) and [Dark](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=62-301). Existing Button, Input, and Textarea components are reused. The file now has 144 variables. Modal title/description and regular Button label styles match code; stretched field focus rings follow instance width.

`pnpm figma:modals` generates foundations and component/review phases for the existing file. Run them sequentially, preserving the ledger in [modal-state.json](modal-state.json). [modal-validation.json](modal-validation.json) reports zero issues after checking widths, styles, focus geometry, and variable metadata. Review screenshots are in `design/previews/modals/`. Figma shows visual states; focus trapping, modal stacking, native forms, and controlled state remain the React implementation’s responsibility.

## Anchored floating foundation — 2026-10-18

`antiflex / Floating` adds Popover (eight side/focus variants) and Tooltip (four side variants), using existing Button/Input instances and shared interface/body/help styles. Six new component roles bring the shared variable inventory to 150. Light/dark boards contain desktop placements and a 390px construction specimen. React owns native top-layer focus, dismissal, hover timing, and collision behavior; Figma variants express the preferred side and visual state. IDs and validation live in `floating-state.json` and `floating-validation.json`. Rebuild the scoped scripts with `pnpm figma:floating`.

## Edge panels — 2026-10-19

[antiflex / Panels](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=70-11) adds Sheet (26 variants) and Drawer (8 variants). Desktop side/size/focus axes are accompanied by explicit 390px mobile constructions with stacked actions. Nine component size variables bring the shared inventory to 159. Both themes inherit existing semantic modes and text styles; native Input and Button instances are reused. React owns modality and keyboard behavior. Drawer has no swipe/snap points. Source dimensions represent a specimen viewport and sample content; content height remains intrinsic in the browser. State/validation: `panels-state.json` and `panels-validation.json`. Build scripts: `pnpm figma:panels`.

## Expanded color and typography foundations — 2026-10-19

[Color library](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=75-676) contains all 26×11 reference ramps plus black, white, and transparent in light/dark specimens. [Type library](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=75-2593) adds 39 text styles: 13 sizes, nine weights, six tracking presets, six leading presets, three bundled font families, and two italic specimens. New variables: 337; total 496. All previous 159 variable values are preserved. Pixel size/default-leading and weight styles bind variables. Canonical em tracking and unitless leading variables remain hidden from Figma's pixel pickers; generated styles convert them to native percentages. System serif is browser-provided and documented, not bundled. OKLCH remains canonical in CSS; Figma/HEX use clipped sRGB previews. Build with `pnpm figma:foundations-expanded`. Ledgers and acceptance checks use `expanded-foundations-*-state.json` and `expanded-foundations-*-validation.json`.

## Action menus — 2026-10-20

[antiflex / Menus](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o?node-id=82-233) adds DropdownMenu and ContextMenu, a shared 24-variant MenuItem construction, twelve panel variants, and two context-trigger variants. Review boards use instances in Light and Dark and show all eight item states. Twelve new component tokens bring the shared variables to 508; existing typography styles are reused.

The code-derived panels are 192/240/288px. Intrinsic item heights are 29px for sm (21px text plus 8px padding), 32px md, and 40px lg; the sm minimum token remains 28px. Focus uses an inside stroke without adding layout size. Horizontal rows keep fixed width and hug height, while composed item instances fill the available panel width. Browser coarse pointers receive a 44px minimum item target; this is a browser adaptation rather than a separate product family.

Construction and reconciliation IDs are persisted in `menus-state.json`, `menus-review-state.json`, and the `menus-menu*Fix*.json` ledgers. `menus-validation.json` records token counts, actual item dimensions, and composition checks. Main construction sets remain outside both review boards. `pnpm figma:menus` prepares the initial construction script; it refuses to duplicate an existing menu set. Use the returned ledger IDs for reconciliation. Prior family assets and Pro pages were not changed.

## Toast foundation — 21 October 2026

[antiflex / Toast](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=87-2) contains twelve variants (four tones × none/available/pending actions), editable Title/Description properties, auto-layout, bound semantic surfaces, and shared text styles. Existing Button instances supply the action. Light, dark and mobile review frames match the React anatomy. Seven new component roles bring the file to **515 variables / 55 text styles**.

Run `pnpm figma:toast` to generate the construction script. Existing sets must be reconciled by their returned IDs, not duplicated. `toast-state.json` and `toast-parity-fix.json` retain the mutation ledger. Border geometry includes the 1px stroke: desktop width 384, padding 16, gap 12, text 14/21, ordinary close 28 and coarse-pointer close 44. Figma previews show visual states only; queue, timer, announcements and async behavior live in React. Screenshots are in `design/previews/toast/`.

## Workspace tools — 2026-10-23

Eight original families are available on [Workspace navigation](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=101-2), [Search and selection](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=103-2), and [Date tools](https://www.figma.com/design/H2vHC7eByauNSQL06qtO3o/Untitled?node-id=104-27). Eight public sets provide 42 visual variants; ChoiceOption and CalendarDay add eleven internal building-block variants. Auto-layout, text properties, existing menu/button instances, shared text styles, and inherited light/dark roles remain editable.

Twenty-one new component roles bring the file to **536 variables / 55 text styles**. The ledgers `expansion-*-state.json`, reconciliation records and `expansion-validation.json` retain the exact returned IDs. The validation checks the 42 Gregorian day labels, zero-width text, all new standalone text styles/color bindings, variable scopes/code syntax and theme modes. Mobile boards are 390px wide; Calendar remains 296px, selection controls 280px, hover panels 288px and desktop navigation panels 360px. Command has a 560px outer maximum with 16px padding.

Figma documents visual states. React implements native top-layer positioning, keyboard focus, form validation/reset, local actions and date arithmetic. Browser coarse-pointer targets grow to 44px; the narrow desktop-browser/Figma specimens retain the default 36px day minimum. Date tools support one Gregorian date, without range selection or alternate calendar systems. No private Pro page was included in the update or deployment payloads.

## antiflex/ui identity rename — 2026-10-28

The existing sixteen product pages and branded text now use antiflex/ui. The foundation headline is “less flex. More function.” The foundation and four dashboard A insets preserve existing vector nodes, token bindings and dimensions. All536 variables remain; no variable values, style identifiers or component APIs changed. The file title was not changed.

State and affected IDs are recorded in `antiflex-brand-state.json`. Current Figma generator helpers use antiflex collection/style namespaces. The canonical SVG input is `assets/brand/antiflex-mark.svg`. Existing generated phase exports are historical snapshots and should be regenerated before reuse; no full library regeneration was run for this bounded rename.

The complete namespace migration also renames all three collections, 55 text styles, one effect style and all536WEB code-syntax mappings in place. IDs, values and bindings remain unchanged. Current ledger: antiflex-namespace-state.json.
