# Foundation verification

## Workspace tools — 2026-10-23

Eight original families are now included in the 50-family source/hosted catalog and 304-story index. UI, Next.js 16.4.2 docs and Storybook builds, TypeScript, token/registry consistency, nineteen installer unit cases and five token cases pass. The independent source consumer installs all 50 families and reports zero axe violations, overflow or page errors.

Browser scopes are recorded separately: 260 full local regression cases passed before the final selection namespace repair; 56 focused cases passed after it; eight final Command/all 64-story follow-ups passed after the long-list height fix. All 60 hosted Chromium/WebKit cases pass, including keyboard, form submission/reset, controlled refusal, locale/RTL/date bounds, both themes, responsive navigation and dashboard regressions. Automated checks do not replace a manual screen-reader review.

Figma validation records 536 variables, 55 text styles, 21 new roles, 42 public visual variants, 11 building-block variants, 16 review boards, correct 42 date labels and no missing standalone text style/color bindings. Review disposition is ship for the full supplied scope; the later Command-only finding was fixed and scored resolved/ship. Design documentation preserves that distinction.

Public aliases are READY. Analytics loader/route queues pass; headless traffic is not used as an ingestion/count claim. Post-test ten-minute deployment error snapshots return zero records. See `design/research/workspace-tools-verification.json` and `design/research/workspace-tools-public-verification.json` for provenance, limits and exact evidence.

## Verified locally

- Token outputs match the shared JSON source.
- Bundled source registry matches the original UI and token source.
- 14 installer tests pass for initialization, dry runs, dependency resolution, customized source protection, backups, path safety, and integrity checks.
- The packed CLI installs all eight components into an independent React 19 / Tailwind CSS 4 app outside this workspace. Strict TypeScript, Vite production build, self-hosted fonts, theme colors, keyboard navigation, and axe checks pass with no page errors or mobile overflow.
- Strict TypeScript checks pass for UI, documentation, and Storybook.
- UI JavaScript and declaration build passes.
- Next.js production build passes and produces all documentation/component routes.
- Storybook static build passes with all eight families.
- 18 Playwright scenarios pass in Chromium and WebKit.
- Search, status filters, sort direction, pagination, empty state recovery, CSV download, date range, and simulated refresh loading work.
- Light/dark choice persists across reload and navigation.
- Mobile disclosure closes with Escape and restores focus, and closes on link navigation.
- Installation examples are named, focusable scroll regions; horizontal keyboard scrolling and mobile accessibility checks pass in both themes.
- TextField error association and Button loading activation prevention pass.
- Axe scans pass on all primary pages in both themes and every Storybook specimen.
- Seven desktop/tablet/mobile browser previews report no page errors or horizontal overflow and use IBM Plex Sans.
- Independent finish review: **ship** for the local frontend. Homepage label removal, chart-period alignment, and readable mobile date labels are resolved. No material regressions remain from that fix batch.
- The direction contract persists in the production HTML.

## Live Figma verification

- The Eftax connector created the native foundation in the supplied file.
- All 97 variables match the source primitive values, light/dark semantic aliases, component aliases/values, and CSS code syntax.
- Eight component families have editable variant sets and appropriate component properties.
- Font family/size variables and matching text styles are applied to native text.
- Desktop (1440px) and mobile (390px) layouts in both themes contain native objects and component instances without image fills.
- Foundations, components, and all four dashboard layouts were visually reviewed. Major widths, theme colors, font families, and control heights match the source. Static dashboard spacing and decorative/control details retain small differences; exact screenshot parity is not claimed.
- Evidence: `assets/figma/validation.json`, `assets/figma/state.json`, and `assets/previews/figma/`.

## External / environment limitations

- Firefox's downloaded binary fails to launch on this macOS host before reaching application code (`Could not find profile folder`). Chromium/WebKit are the local defaults. Linux CI successfully runs all 27 browser scenarios in Chromium, Firefox, and WebKit, including all accessibility scans.
- Public documentation/dashboard and Storybook are deployed on Vercel. Core source is public on GitHub, and the npm alpha is published by `insannurjaman`; no domain or paid product has been published.

## Published installer verification

`chamfer-ui@0.1.0-alpha.1` is available from npm under the owner's account. Its registry artifact was installed into a fresh independent React app; all eight components, strict TypeScript, production build, fonts, both themes, accessibility, and mobile keyboard behavior pass. Evidence: `assets/previews/npm-evidence.json`. Reproduce with `pnpm installer:smoke --registry`.

## Linux release verification

[Foundation CI](https://github.com/insannurjaman/chamfer-ui/actions/runs/38626202881) and the [tagged release workflow](https://github.com/insannurjaman/chamfer-ui/actions/runs/38626271271) pass for `c771cda` / `v0.1.0-alpha.1`. They verify tokens, registry integrity, 14 installer unit tests, TypeScript, UI/Next.js/Storybook builds, all 27 browser scenarios in Chromium/Firefox/WebKit, and the packed installer in an independent consumer. The published GitHub prerelease includes the tested tarball and checksum.

## Hosted alpha verification

The production aliases return HTTP 200. Seven hosted documentation/dashboard routes and all 25 Storybook specimens pass Chromium rendering and axe checks. The full 18-scenario suite also passes against the hosted aliases in Chromium and WebKit. Hosted dashboard search/empty-state recovery, pagination, theme persistence, and mobile Escape/focus behavior pass without overflow or page errors. Evidence is in `assets/previews/hosted-evidence.json` and `docs/RELEASE.md`.

## Reproduce

```sh
pnpm install
pnpm exec playwright install chromium webkit
pnpm check
pnpm installer:smoke
pnpm figma:build
pnpm format:check
```

Semantics were reviewed against [W3C disclosure guidance](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) and [native table guidance](https://www.w3.org/WAI/ARIA/apg/patterns/table/). Storybook uses its [accessibility addon](https://storybook.js.org/docs/writing-tests/accessibility-testing), with automated axe scans of every specimen.

Automated checks complement manual keyboard and screen-reader review. They are not an accessibility certification.

## Feedback/navigation foundation — 2026-10-18

The local catalog contains 33 families. Wave 2 adds fifteen feedback/navigation/disclosure families and brings Storybook to 129 specimens. All 56 Chromium/WebKit scenarios were verified: the first concurrent run passed 54, while two aggregate page scans timed out; both passed in a serial rerun with the same assertions and time budget. The complete Storybook axe scans passed in both browsers.

Sixteen installer unit tests and the independent packed consumer pass, including all 33 copied families, strict types, production build, no axe violations, no mobile overflow, and no page errors. Native Figma validation reports 15 new families, 99 variants, 122 review instances, 136 variables, and zero validation issues. Responsive review covers 390/900/1440 widths in both themes. The finish reviewer cleared the custom-wrapper collection fix and returned `ship`.

Evidence: `design/research/feedback-verification.json`, `feedback-finish-review.md`, `assets/figma/feedback-validation.json`, and `design/previews/feedback/`. Website deployment verification is recorded separately from the local run. The npm and tagged GitHub alpha remain the earlier eight-family revision.

## Native modal foundation — 2026-10-18

The current catalog contains 35 families and 149 Storybook specimens. Dialog and AlertDialog add 24 Chromium/WebKit scenarios: keyboard containment, safe initial focus, native form validation/close, controlled refusal, nested Escape and scroll locks, strict lifecycle, cleanup, long content, outside-pointer policy, pending/error handling, and complete local edit/archive workflows. Twenty new stories pass axe in both themes and nested theme boundaries resolve semantic component aliases correctly.

All 38 form/feedback regressions and 18 foundation regressions pass, including every one of the 149 Storybook specimens in Chromium and WebKit. This totals 80 unique browser scenarios across three scoped runs. Seventeen installer unit tests pass; a separately built React consumer copies all 35 families and passes types, production build, interaction checks, axe, and mobile overflow checks. Figma validation records two modal families, twelve variants, eight review instances, 144 variables, and zero issues.

The finish review returned `ship` after synchronizing the sample project archive state and saved/draft description. Evidence: `design/research/modal-verification.json`, `modal-finish-review.md`, and `assets/figma/modal-validation.json`. Public preview checks are recorded separately in `design/research/modal-public-verification.json`. Native browser dialog support is required; other Wave 3 families remain planned.

## Anchored floating foundation — 2026-10-18

The catalog now contains 37 families and 174 Storybook specimens. Popover and Tooltip add 34 passing Chromium/WebKit scenarios: local filter application, nonmodal Tab exit, controlled refusal, nested Escape/outside gestures, native-modal integration, focus restoration, strict lifecycle/unmount, viewport flips/clamping/resize recovery, clipped anchors, RTL, hover delay/hoverability, merged descriptions, and activation dismissal. Open specimens and documentation pass axe in both themes, including a mobile panel.

All 42 foundation/modal regression scenarios pass, including the complete 174-story axe scan in both browsers. This is 76 unique scenarios across the floating and regression runs. Eighteen installer unit tests pass. The independent React consumer copies all 37 families and passes strict types, production build, floating/modal interactions, axe, and mobile overflow checks. Figma adds twelve variants and six roles, bringing the shared variables to 150; validation reports zero issues. Visual inspection covers 390/768/1440 widths, light/dark browser content, and both Figma review boards.

The independent finish reviewer returned `ship`; the separate documenter updated durable design rules. Evidence: `design/research/floating-verification.json`, `floating-finish-review.md`, `assets/figma/floating-validation.json`, and `design/previews/floating/`. The initial floating run had three failed test assumptions; corrected scroll targeting and a native focusable outside destination passed on rerun, followed by the complete final 34-scenario run. Browser-native popover and ResizeObserver support are required. Hosted checks are recorded separately; npm/tagged GitHub alpha remain the earlier eight-family revision.

## Documentation navigation repair — 2026-10-18

The desktop documentation header and sidebar remain stable during main document scrolling, with an independently scrollable, keyboard-reachable sidebar. Component names share one A–Z sort across sidebar and Overview. Four scoped scenarios pass locally and on the published docs in Chromium/WebKit, covering 390/768/900/1440 widths, ordering equality, independent scroll, footer focus, mobile link activation/disclosure, and axe. Build and workspace typecheck pass. The first attempt used a stale production test server; restarting it served the current build. Independent review returned `ship`, and the documenter recorded the durable rule. Evidence: `design/research/docs-navigation-verification.json` and `design/previews/docs-navigation/`.

## Web Analytics — 2026-10-19

The official SDK is installed on the Next.js root and Storybook shell/standalone previews. Both production builds and workspace types pass. Hosted verification checks one analytics loader per page, an empty embedded-frame analytics count, client-side docs navigation, Storybook route events after channel initialization, duplicate notification suppression, standalone preview tracking, and zero page errors. Real browser visits appear in both Vercel project counters; automated headless visits are intentionally excluded by Vercel's collection script and are tested through loader status and SDK queues. Evidence: `design/research/analytics-verification.json`, `artifacts/analytics-browser-checks.json`, `scripts/verify-analytics.mjs`, and `design/previews/analytics/`.

## Edge panels and bottom tasks — 2026-10-19

Sheet and Drawer bring the catalog to 39 families and Storybook to 196 specimens. Both reuse native modal behavior; Sheet supports four physical edges, while Drawer is an intrinsic-height bottom task without swipe/snap points. Scrollable Body, persistent actions, mobile safe areas, native forms/refs, nested dismissal, controlled refusal, cleanup, and real local CSV/JSON downloads are covered.

Eighty-four unique Chromium/WebKit scenarios were verified cumulatively: 74 passed initially; ten failures were test assertions (the old 37-family count, an ambiguous status locator, and an incorrect assumption about native initial focus). The corrected focused run passed all 42 cases. The initial regressions included all 196 Storybook specimens in both browsers, all modal checks, and foundation pages. Responsive coverage includes 390×844, 768×900, 1440×1000, and 667×320 with light/dark and reduced motion. Nineteen installer unit tests pass; the independent 39-family consumer passes strict types, production build, interaction checks, axe, and mobile overflow checks.

UI/Next.js/Storybook builds, workspace types, token/registry checks, and scoped formatting pass. Figma has 34 new variants, nine new size tokens, 159 total variables, shared text styles, light/dark review boards, and explicit mobile constructions; structural validation reports zero issues. Figma boards demonstrate component anatomy and Storybook sample states; composed docs examples intentionally supply other existing controls. Independent finish review: **ship**, no material fixes. Durable system rules were recorded by the documenter.

Both production targets are READY. All 58 hosted panel/navigation/foundation cases pass in Chromium/WebKit. The official Analytics loader and SDK route-queue checks pass after deployment; the first overlapping check encountered an in-flight Storybook build and was rerun after READY. Runtime error snapshots return zero records on both deployments. These are scoped snapshots, not continuous error monitoring. Evidence: `design/research/panels-verification.json`, `panels-public-verification.json`, `panels-finish-review.md`, `assets/figma/panels-validation.json`, and `design/previews/panels/`.

## Complete reference foundations — 2026-10-19

The color reference now contains the exact pinned Tailwind CSS 4.3.3 data: 26 eleven-step ramps and three base colors. Typography adds thirteen sizes, nine weights, six leading ratios, six tracking values, and forty genuine bundled font faces. These are optional reference choices; existing Chamfer semantic values, component aliases, and legacy typography scales remain unchanged. The catalog remains 39 families, with 203 Storybook specimens.

All 36 scoped local Chromium/WebKit scenarios pass, including expanded foundation interactions, clipboard denial recovery, real compiled Tailwind mappings, responsive light/dark layouts, keyboard navigation, and the complete 203-story axe scan in both browsers. The fourteen expanded-foundation scenarios pass again after the final copy/layout correction. Five token tests, nineteen installer tests, and the independent 39-family consumer pass. UI/Next.js/Storybook builds, workspace types, reference snapshot, token generation, and registry integrity checks pass.

Figma adds 337 variables (496 total), preserving all 159 prior values, and 39 text styles (55 total). Both themed color boards contain 289 bound swatches. Structural validation reports zero issues. CSS retains canonical OKLCH values; Figma/HEX use disclosed clipped sRGB previews. Native text styles bridge unitless leading and em tracking to percentage values. Independent finish review: **ship**, no material fixes; the documenter recorded the optional reference rules. Evidence: `design/research/expanded-foundations-verification.json`, `expanded-foundations-finish-review.md`, `assets/figma/expanded-foundations-*-validation.json`, and `design/previews/expanded-foundations/`.

Both updated production targets are READY. All 34 hosted foundation/navigation scenarios pass in Chromium/WebKit. The hosted story index reports 203 specimens. Official Analytics loader and SDK route-queue checks pass; scoped runtime error snapshots return zero records for both deployments. Public evidence: `design/research/expanded-foundations-public-verification.json` and `design/previews/expanded-foundations/public-colors.png`. No npm or tagged GitHub release was published.

## Action menus — 2026-10-20

Dropdown Menu and Context Menu bring the source catalog to 41 families and Storybook to 224 specimens. Original native top-layer behavior covers nested commands, discoverable disabled items, controlled state, checkbox/radio preferences, roving focus, typeahead, RTL, Tab exit, context keyboard invocation, clipping/collision handling, and dialog handoff. Working examples change local synthetic project/order state and download JSON; visible actions remain available for touch.

The scoped regression run passed 82 of 84 Chromium/WebKit scenarios initially. A WebKit story scan overlapped a Storybook rebuild, and a responsive test recorded cancelled Next.js RSC prefetches during navigation. The twenty-six interaction cases pass after the final menu scroll correction; all four responsive/axe cases pass after testing viewport changes without reloading the Next.js document and using a separate page for Storybook. Full Storybook recheck evidence is recorded in `design/research/menus-verification.json` after completion. Menu and floating behavior tests are retained alongside dashboard, navigation and foundation regressions.

Five token tests, nineteen installer tests, workspace types and UI/Next.js/Storybook builds pass. The independent 41-family React consumer passes strict types, production build, menu/submenu/context actions, axe, mobile overflow and page-error checks. Figma has twelve new component tokens (508 total variables), 24 shared item variants, twelve menu panels and two context-trigger variants. Corrected auto-layout uses fixed horizontal width/hug height, fill-width composition and a non-sizing focus stroke. Final structural checks report zero issues. Independent finish review: **ship**, no material fixes. Evidence: `design/research/menus-verification.json`, `menus-finish-review.md`, `assets/figma/menus-validation.json`, and `design/previews/menus/`.

The serial WebKit recheck now passes for every one of the 224 stories; Chromium passed the complete scan in the scoped run. The cumulative verification therefore covers all 84 unique regression/menu scenarios. The final four light/dark responsive cases pass with separate docs/story documents and viewport resizing without repeated navigation. The separate documenter recorded the durable menu sizing, density and focus ownership rules in DESIGN.md and its sidecar.

Both menu deployments are READY on their existing production aliases. All 48 hosted menu/navigation/foundation scenarios pass in Chromium and WebKit. Hosted checks include nested menus, modal focus handoff, context pointer/keyboard entry, local project/order actions, JSON downloads, both themes, responsive layouts and the twenty-one new menu stories. Official Analytics loader/SDK queue checks pass, with no duplicate loaders or page errors. Scoped runtime error snapshots return zero records on both deployments. Evidence: `design/research/menus-public-verification.json` and `design/previews/menus/public-menu.png`. No npm or GitHub release was published.

## Toast foundation — 2026-10-21

Source now has 42 component families and 240 Storybook specimens. Original ToastProvider/useToast support bounded local queues, stable IDs, updates, explicit dismiss reasons, async recovery, deliberate polite/assertive announcements, native top-layer or inline rendering, and pause with remaining duration on hover, focus, background tab or window blur. Warning/danger/action messages persist by default. The local project example saves synthetic state and supports archive/undo; dashboard feedback uses the same implementation.

All 22 final Toast scenarios pass in Chromium/WebKit, including the 16 new stories in both themes and widths 320/390/768/1440. The preceding 48 dashboard/menu/navigation/foundation cases and full 240-story scans also pass cumulatively (72 unique scenarios). Expanded keyboard testing caught disabled loading buttons losing focus and async dismissal choosing a target before React removed the row. Pending actions now use a focusable aria-disabled button with a repeat guard; focus return runs after commit. No actual screen-reader session is claimed.

UI/Next.js/Storybook builds, workspace types, token/registry integrity, five token tests, nineteen installer tests, and the independent 42-family React consumer pass. The consumer has zero axe violations, overflow or page errors. Figma adds seven tokens (515 variables total), twelve original variants and light/dark/mobile review frames, reusing shared text styles (55 total). Border inclusion and text-property overrides were corrected to match browser geometry. Independent finish review: **ship**, no material findings; the documenter merged durable rules into DESIGN.md and its sidecar. Evidence: `design/research/toast-verification.json`, `assets/figma/toast-validation.json`, `design/previews/toast/`.

Both Toast deployments are **READY** on the existing production aliases. All 70 hosted cases pass in Chromium and WebKit; the live index has 240 stories including 16 Toast specimens. Official Analytics loader/SDK queue checks pass without duplicate loading or browser errors. Deployment-scoped ten-minute runtime error snapshots return zero records; this is not continuous monitoring. See `design/research/toast-public-verification.json`. npm and GitHub publication were not performed.
