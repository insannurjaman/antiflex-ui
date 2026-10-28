# Workspace tools design documentation

Recorded 2026-10-23 from the completed code-led extension. This merges the eight approved families into the existing Chamfer system; it creates no new world or composition contract. Design authority remains PRODUCT.md and the incumbent neutral/mint, square ruled, DM Sans/Anybody/Space Mono system.

## Durable records changed

- `DESIGN.md`: nine component frontmatter entries describe the reusable surfaces and selection state; layout captures bounded floating/inline geometry; three component subsections cover all eight families; Navigation Intent and Selection Ownership rules distinguish commands, destinations, active options and committed values. The existing quiet-selection guardrail explicitly allows Calendar's committed action-fill date.
- `.impeccable/design.json`: adds `extensions.workspaceTools` with the 21 CSS role names, geometry, timing, keyboard/form ownership, limits, and scoped evidence. Narrative characteristics/rules/do/don't lists match the Markdown. Existing color metadata, component snippets, other extensions and historical milestone counts remain intact.
- This record: exact source values, alias resolution and final review evidence at batch granularity. The previous design and sidecar already had uncommitted changes when this pass began; those were preserved.

## Component role ledger

Canonical source: `packages/tokens/src/tokens.json`, `components`. CSS names are `--ch-component-` followed by the ledger name; Figma names use `component/` followed by that same name. The 21 roles add geometry and reuse existing semantic colors, with no new palette or typography voice.

| Role                      | Canonical value or alias | Resolved value              |
| ------------------------- | ------------------------ | --------------------------- |
| `hover-card-width`        | `288`                    | 288px                       |
| `hover-card-padding`      | `space.4`                | 16px                        |
| `hover-card-bg`           | `semantic.surface`       | light #fefefe; dark #202020 |
| `hover-card-fg`           | `semantic.foreground`    | light #171717; dark #f7f7f7 |
| `hover-card-border`       | `semantic.border-strong` | light #b8b8b8; dark #515151 |
| `menubar-height`          | `42`                     | 42px                        |
| `menubar-padding`         | `space.1`                | 4px                         |
| `menubar-gap`             | `space.1`                | 4px                         |
| `navigation-menu-width`   | `360`                    | 360px                       |
| `navigation-menu-padding` | `space.2`                | 8px                         |
| `navigation-menu-gap`     | `space.2`                | 8px                         |
| `choice-width`            | `280`                    | 280px                       |
| `choice-max-height`       | `288`                    | 288px                       |
| `choice-item-height`      | `36`                     | 36px                        |
| `choice-bg`               | `semantic.surface`       | light #fefefe; dark #202020 |
| `choice-fg`               | `semantic.foreground`    | light #171717; dark #f7f7f7 |
| `choice-border`           | `semantic.border-strong` | light #b8b8b8; dark #515151 |
| `command-height`          | `320`                    | 320px                       |
| `command-width`           | `560`                    | 560px                       |
| `calendar-width`          | `296`                    | 296px                       |
| `calendar-day-size`       | `36`                     | 36px                        |

## Geometry and state rules

| Family          | Shipped geometry/material                                                                                                         | Behavior and ownership                                                                                                                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hover Card      | 288px width, 16px padding, 8px content gap; 14px/1.5 DM Sans, 16px medium title; surface/foreground/strong-border and 1px corners | Real anchor plus visible Toggle; 600ms/300ms hover delays, immediate focus entry; supplementary named region; no initial focus transfer. Pointer entry cancels closure; Escape/outside pointer/focus exit dismisses.                                                    |
| Menubar         | 42px minimum height, 4px padding and gap; wrapping square ruled frame                                                             | One roving heading Tab stop; RTL Left/Right, Home/End, buffered typeahead; already-open menus transfer across headings by arrows/non-touch pointer. Existing menu items, links, choices, submenus and Tab exit remain.                                                  |
| Navigation Menu | 360px panel, 8px padding; headings gap 8px, panel gap 4px, link padding 12px                                                      | Named nav with disclosure buttons and ordinary links; Down/Up enters first/last link. Escape returns owned focus; no trap. Subtle expanded trigger, quiet mint current link; 120ms chevron rotation honors reduced motion.                                              |
| Select          | 280px control/popup capped by available width; field heights 32/36/44px; strong border and 1px corners                            | Button combobox; enabled arrows, open Home/End, 700ms buffered typeahead; Enter/Space commit. Hidden native select handles form/required/reset.                                                                                                                         |
| Combobox        | Same surface; 4px popup inset; 8px/12px rows, 36px minimum (44px coarse), 12px descriptions and groups, 16px SVG check            | Editable combobox, label/keyword substring search with case/diacritic normalization; query distinct from committed value; label restored on dismissal. Focus stays on input with active descendant.                                                                     |
| Command         | Outer width 100% capped at 560px, 16px padding; popup has 320px border-box maximum; listbox cap 310px                             | Inline local action search. Final row scrolls completely within popup. CommandDialog uses native Dialog, initial search focus and close after success. Synchronous false keeps it open. No asynchronous action lifecycle supplied.                                      |
| Calendar        | Width 296px maximum 100%; 7 columns × 6 weeks, 2px cell spacing; day minimum height 36px/44px coarse                              | One Gregorian date; today border, muted outside dates, action-filled committed date, unavailable aria-disabled days. One day Tab stop, RTL day arrows, week arrows, Home/End, Page month and Shift+Page year. Sunday default is explicit, independent of locale labels. |
| Date Picker     | Trigger minimum min(240px,100%); panel min(328px,100vw − 16px), 16px padding; action gap 8px/top gap 12px                         | Existing nonmodal Popover focuses active day; choose/clear commits immediately and closes; Cancel only closes. Native date input preserves YYYY-MM-DD submission, required/min/max and custom predicate validity. Controlled value/open/reset stays consumer-owned.     |

Select/Combobox popup caps at 288px; its listbox caps at min(278px, 100dvh − 26px). Command separately reserves the same 10px (8px padding + 2px borders) from its 320px popup cap. These are maximum allocations, not fixed content heights. Calendar's coarse 44px value is a button-height minimum; the seven responsive columns are not promised 44px square cells.

Selection uses `ch-selection` DOM classes, independent of the incumbent Radio Group `ch-choice` namespace. Active list rows use accent-soft/accent and a 1px inset focus outline; committed Select/Combobox values have a check. Calendar intentionally uses action/action-foreground for the committed date. Shared visible control/day/link focus is 2px with 2px offset. Forced colors adds Highlight outlines to active options and selected dates. No new shadows, floating scrim or decorative animation is introduced; CommandDialog inherits the existing modal scrim.

## Evidence and limits

The local catalog is 50 families and 304 stories, including 64 new stories. `assets/figma/expansion-validation.json` records 536 variables, 55 text styles, all 21 new variable roles, correct October 2026 date labels, and no missing style/color bindings in the three new pages. The eight public component sets total 42 visual variants; ChoiceOption (5) and CalendarDay (6) are 11 internal building-block variants. Sixteen light/dark desktop/mobile boards span navigation, selection, calendar and Date Picker. These are visual states, not browser behavior prototypes.

`design/research/workspace-tools-finish-review.md` first scores the supplied full scope ship. A later scoped source addendum identifies the long-list Command allocation mismatch, and the final verdict records it resolved/ship. Four confirmation captures — `command-long-desktop-light.png`, `command-dialog-long-desktop-light.png`, `command-long-mobile-dark.png`, `command-dialog-long-mobile-dark.png` under `.impeccable/review/` — show the full final Sample action 40 row, description and active outline at maximum scroll. This documentation relies on that review for visual scoring; it does not claim a new independent screenshot review.

Verification scopes stay separate: the supplied record reports 260 complete Chromium/WebKit regression cases before the selection namespace repair, 56 scoped checks after that repair, and the final long-Command containment/selection case in both browsers (`artifacts/expansion-command-final.log`). Installer smoke evidence records source installation, typecheck and production build. This documentation pass changes no source or deployed artifact and makes no additional browser-test claim.

Supported date values represent one Gregorian day. Range/time selection, alternative-calendar arithmetic, typed date entry, virtualization, global shortcut bindings and backend persistence are outside this implementation. Synthetic workspace members and local actions are examples, not production claims. No npm/GitHub release is asserted. Public preview publication remains the owning task's responsibility.

## Not canonized or repaired

No unresolved material defect is reported by the supplied final review. The earlier 496-variable foundation figure in DESIGN.md and `referenceFoundations.evidence` remains historical evidence of that milestone; it is not rewritten as the current total. The source's coarse day rule provides height only, so no square 44px target claim is canonized. Source, PRODUCT.md, older records, screenshots and deployment files were not edited.
