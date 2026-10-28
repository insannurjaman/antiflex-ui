disposition: ship

Inputs not supplied: a separate five-block direction contract and QUALITY BAR card; the packet identifies this as an ordinary incumbent-world extension, so PRODUCT.md, DESIGN.md and the quoted user-pinned direction are the design authority. No approved comp, decision comp, concept roll or comp-diff gate applies. Source was sampled at the supplied component scope; no browser was used.

## persistence

Pass. PRODUCT.md exists and records the eight-family expansion, 50 local families, 304 stories, single Gregorian dates and consumer-owned local commands. Existing DESIGN.md describes the rendered neutral gray, mint, square ruled geometry and three typography roles. No comp-led phase state or approval record is required for this extension.

All 21 required browser captures were opened: document tops at 1440, 1280 and 390 widths, both themes, and all eight component-state pairs. Full-page captures begin at the header; state captures show their named component and complete open layers. No missing, blank, malformed or clipped required evidence was found. The six supplied Figma previews were also opened.

## fidelity

| Element | State | Evidence |
| --- | --- | --- |
| TYPE | match | Anybody documentation headline, compact DM Sans controls and prose, and Space Mono technical header navigation preserve the incumbent roles; no system display substitution is visible. |
| MATERIAL | match | Flat neutral surfaces, nearly square controls and single-pixel rules are the actual material. The new families introduce no imitation physicality, decorative depth or raster obligation. |
| GROUND | match | Light neutral gray and dark charcoal grounds follow the explicitly named incumbent palette; neither theme drifts toward cream or blue slate. |
| Documentation hierarchy | match | Heading, explanation, synthetic workspace specimen and behavioral guidance retain Read-mode order and measure. The workspace groups navigation, commands, people, selection and dates without turning the page into repeated cards. |
| Hover Card | match | Supplementary, bounded profile preview retains a real link and visible touch toggle. Both state captures show legible complete content. Source preserves delayed hover, focus entry and independent dismissal. |
| Menubar and Navigation Menu | match | Command headings remain compact and ruled; navigation remains disclosure buttons and ordinary links. Open mobile panels stay within the viewport. Source keeps menubar collection navigation separate from link navigation. |
| Select, Combobox and Command | match | Named options, group labels, disabled rows, selected check, active outline and filtered results remain distinct. Source preserves separate search and committed labels, native form mirrors, reset and loading/empty/error messages. The repaired selection namespace is independent of radio styling. |
| Calendar and Date Picker | match | Seven-column date layout, month controls, outside days, selected/current-day distinction, help and clear/cancel actions remain coherent. Open date picker fits the mobile viewport; dates and locale labels correspond to October 2026. |
| Responsive reflow | adaptation | The packet's responsive documentation requirement and DESIGN.md's Read/Operate modes justify stacking paired examples at 390px. The desktop reading order and complete controls are retained. |
| Figma/code relationship | match | Supplied Figma boards retain the same widths, flat material, typography hierarchy, semantic selection treatment and date geometry. Figma shows representative visual states; the packet explicitly excludes behavioral prototyping. |

The incumbent promises are kept: original compact operational UI; neutral ruled material; a navigation-to-selection-to-planning story; a first viewport that identifies the local synthetic workspace; and the established documentation/component form. A new concept seed is inapplicable to this continuation. No missing or contradicted salient element was found.

## ceiling

Reached for this scope. Thin seams, compact lettering, quiet active rows, explicit green focus, restrained mint actions and mobile-bounded layers use the incumbent world's devices. Decorative ornament, dimensional material and display-scale theatrics would exceed this component extension's authority. Motion cannot be judged from stills; source contains the disclosure-chevron transition and reduced-motion override. The craft-floor Refuse check found no material violation in the scoped evidence; the supplied detector result is `[]`.

## material_fixes

None. The final scoped log records 56 passing Chromium/WebKit cases, including all 64 new stories in both themes. The packet reports the earlier 260-case regression pass before the CSS namespace repair; these are separate runs, not a claimed post-repair full-suite rerun. Installer evidence records successful typecheck, production build and source installation with no page errors. These support, rather than replace, the supplied visual evidence. Synthetic data, local actions, single-date limits and absence of a global shortcut/backend are disclosed; no unsupported commercial claims or hidden asset substitutions were found.

## keep

Preserve the flat neutral ruled surfaces, restrained mint, compact typography, complete mobile layers, explicit focus and honest local-demo boundaries.

## Scoped source addendum: long Command lists

disposition: fix

The supplied source concern is material for overflowing Command lists. The inline popup caps its border box at `--ch-component-command-height` (320px), including 8px padding and 2px borders, leaving a 310px content box. Its listbox separately permits 320px. The parent's `overflow: hidden` clips the child's lower edge; the 10px allocation mismatch does not necessarily mean 10 visible pixels are clipped because overflow clips at the padding edge. At maximum listbox scroll, the child's bottom still extends beyond that edge. The keyboard visibility calculation compares options with the listbox's own bounding rectangle, so it cannot account for the ancestor's clipping. Short filtered captures do not exercise this condition.

Required fix: cap the Command listbox at `calc(var(--ch-component-command-height) - 10px)` so its complete scroll viewport fits inside the popup. Verify a long unfiltered inline Command and CommandDialog by moving to the last enabled item: its full row, active outline and final content must remain visible at maximum scroll. This supersedes the earlier no-fixes conclusion only for this narrow source finding; no unrelated visual review was reopened.

## verdict

Resolved — the Command listbox now subtracts the popup's 10px border/padding allocation. All four confirmation captures were opened and are valid: `command-long-desktop-light.png`, `command-dialog-long-desktop-light.png`, `command-long-mobile-dark.png` and `command-dialog-long-mobile-dark.png`. Each shows the complete final “Sample action 40” row, description and active outline contained above the popup's lower edge at maximum scroll. The scoped containment-and-selection case passes in Chromium and WebKit in `artifacts/expansion-command-final.log`. No regression attributable to this fix is visible in these captures.

## remaining

Clear. This ship verdict covers the scored Command clipping fix, not the whole surface.

disposition: ship
