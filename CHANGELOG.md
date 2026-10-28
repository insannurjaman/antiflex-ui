# Changelog

## 2026-10-28 — Complete antiflex namespace

- Publish `antiflex-ui@0.1.0-alpha.2` with all 50 component families and the `antiflex` executable.
- Migrate workspace packages to `@antiflex`, CSS/data namespaces to `af-`, and installer configuration to `antiflex.json`.
- Update installation examples, source paths, downloadable archives, Figma labels and GitHub repository identity.
- Preserve neutral token values and native component behavior; migrate previously saved browser preferences privately.
- Verify 292 browser scenarios, 19 installer tests, and independent packed/registry consumers covering all 50 families.

## 2026-10-28 — antiflex/ui identity

- Rename the product from Chamfer UI to antiflex/ui, with “less flex. More function.” and the user-approved positioning.
- Update homepage, docs, Storybook, metadata, A mark, favicon, OG image and all 26 versioned example previews.
- Publish on antiflex-ui.vercel.app and antiflex-storybook.vercel.app; preserve the existing aliases.
- Rename existing Figma page/brand labels and five mark insets; retain536 variables and existing bindings.
- Preserve component APIs, neutral tokens, browser storage keys, workspace namespaces and published alpha identifiers. No npm release or GitHub repository rename.

## Orbit SaaS showcase - 2026-10-28

- Add an examples gallery and thirteen connected SaaS screens in the existing Neutral design language.
- Support sidebar/top navigation, shared local state, page search, responsive navigation, and light/dark previews.
- Add working customer, project, team, settings, profile, billing, checkout, auth-preview and onboarding flows.
- Keep the standalone foundation dashboard and make the richer showcase discoverable from the homepage and site navigation.

## Neutral default theme — 2026-10-27

- Replace mint default actions, links, focus and selection with Neutral light/dark role pairs.
- Align neutral primitives, Figma variables, documentation, installer assets, favicon and social sharing artwork.
- Keep mint available as an optional primitive palette and preserve semantic feedback colors.

## Browser and sharing identity — 2026-10-26

- Add the original Chamfer symbol as a scalable favicon, multi-resolution ICO and opaque 180px Apple Touch icon.
- Add a 1200 × 630 brand OG image, rendered from local Anybody, DM Sans and Space Mono font files.
- Configure Open Graph/Twitter image metadata and icons for documentation and Storybook, with absolute public image URLs and descriptive alt text.
- Add deterministic asset generation through `pnpm brand:build`; original logo sources remain unchanged.

## Workspace tools — 2026-10-23

- Add eight original component families: Hover Card, Menubar, Navigation Menu, Select, Combobox, Command, Calendar and Date Picker. The catalog now contains 50 families and 304 stories.
- Add keyboard contracts, controlled state, RTL, local form validation/reset, scoped list scrolling, local command actions and Gregorian single-date planning.
- Add component API documentation, a working `/docs/workspace-tools` example, 64 stories and independent installer consumer coverage.
- Add 21 component tokens; Figma uses the existing semantic themes and shared text styles.
- Patch Next.js from 16.4.0 to 16.4.2 after the production build flagged the earlier version.

## Toast foundation — 2026-10-21

- Add original Toast, ToastProvider, ToastViewport and useToast; source catalog now has 42 families and Storybook 240 specimens.
- Bounded queue, ID updates, deliberate polite/assertive announcements, persistent recovery actions, async retry, and remaining-time pause on hover, focus, hidden tab or window blur.
- Preserve keyboard focus during pending actions and return it after dismissal; native fixed top-layer and inline layouts support RTL and modal composition.
- Add a working local save/archive/undo example at `/docs/notifications` and visible dashboard feedback. No backend persistence or cancellation is implied.
- Add seven component tokens and twelve native Figma variants, bringing the shared file to 515 variables and 55 text styles.
- Include source in the local installer. npm and tagged GitHub remain the earlier eight-family alpha.

## Action menus — 2026-10-20

- Add original Dropdown Menu and Context Menu, bringing the source catalog to 41 families and Storybook to 224 specimens.
- Share a native top-layer menu engine with nested actions, checkbox/radio choices, discoverable disabled states, typeahead, RTL keyboard navigation, focus restoration, and explicit Tab exit.
- Add live project/context examples and per-order dashboard flag/download actions. Context menus have an equivalent visible touch entry.
- Add twelve component tokens and matching token-bound Figma menu/item variants and light/dark review instances.
- Include both families and internal helpers in the local source installer. No new npm or tagged GitHub release is implied.

## Unreleased — Complete reference foundations

- Add 26 Tailwind CSS 4.3.3 reference palettes × 11 shades, plus black, white, and transparent, alongside unchanged Chamfer semantic colors.
- Add xs–9xl typography, 100–900 weights, size-specific line heights, six leading and tracking presets, full genuine font faces, and CSS/Tailwind mappings.
- Add searchable/copyable color docs and a typography playground, seven foundation stories (203 total), and 337 Figma variables / 39 text styles.
- Preserve existing component sizes and names. Reference MIT license and source provenance ship in the local installer.

## Unreleased — Edge panels and bottom tasks

- Add original Sheet and Drawer families on the shared native modal foundation; current source catalog is 39 families with 196 Storybook specimens.
- Four physical Sheet edges and a content-sized bottom Drawer, with controlled state, native attributes/refs, independent body scrolling, persistent actions, and safe-area padding. No swipe or snap points.
- Interactive workspace-settings and real local CSV/JSON download examples at `/docs/panels`.
- Nine size tokens and 34 Figma variants, including mobile constructions. Installer resolves both families and shared modal utilities without pulling unrelated overlays.
- Hosted docs and Storybook updated on 2026-10-19 after 58 passing public Chromium/WebKit scenarios. Analytics remains installed. npm and tagged GitHub alpha remain the previous eight-family revision.

## Unreleased — Vercel Web Analytics

- Install the official Analytics integration on the Chamfer Next.js website and Storybook.
- Track Storybook navigation after its manager channel is ready; normalize public story/doc paths and avoid duplicate embedded-preview page views.
- Keep analytics out of the distributable component library.

## Unreleased — Documentation navigation

- Keep the desktop documentation header and sidebar in view while the main page scrolls; the sidebar scrolls independently and remains keyboard reachable.
- Sort the shared component catalog A–Z by display name, used by the sidebar and Overview. Mobile retains its existing disclosure navigation.

## Unreleased — Anchored floating foundation

- Popover and Tooltip bring the current source catalog to 37 families and Storybook to 174 specimens.
- Native browser top-layer content with authored viewport collision, scroll/resize tracking, logical alignment, controlled state, and nested Escape handling.
- Nonmodal task panels and supplemental plain-text tooltips include interactive documentation at `/docs/floating`.
- Six component token roles, twelve Figma variants, shared text styles, and light/dark/mobile review instances.
- Source installer registry includes both families and their positioning/state helpers. Hosted previews updated on 2026-10-18 after 48 passing public browser scenarios; published npm and tagged GitHub alpha remain unchanged.

## Unreleased — Native Select spacing fix

- Replace the platform dropdown indicator with a decorative chevron inset 12px from the logical end; reserve 40px for the indicator and text clearance across all field sizes.
- Preserve native selection, disabled state, multiple selection, and forced-colors indicators. Synchronize the installer registry.

## Unreleased — Native modal foundation

- Dialog and AlertDialog bring the current source catalog to 35 families.
- Shared native `showModal()` foundation with controlled state, focus containment/restoration, nested Escape handling, backdrop policy, and reference-counted page scroll locking.
- Editable project, nested confirmation, long-content review, local archive/restore, native form, strict lifecycle, and pending/error examples.
- Twenty new Storybook specimens, twelve Figma variants, and eight additional variables; source registry includes native modal dependencies.
- Semantic component aliases resolve at nested theme boundaries, including modal field surfaces.
- Hosted documentation and Storybook updated on 2026-10-18 after 36 hosted checks. npm and tagged GitHub alpha remain unchanged until a separate package release.

## Unreleased — Feedback, navigation, and disclosure

- Fifteen original families bring the local catalog to 33: Alert, Avatar, Breadcrumb, Empty, Kbd, Pagination, Progress, Spinner, Tabs, Accordion, Collapsible, Toggle, ToggleGroup, Typography, and AspectRatio.
- Native keyboard collections with automatic/manual tabs, RTL/orientation, custom wrappers, disabled items, and controlled/uncontrolled state.
- Shared Spinner, Empty, and Pagination replace dashboard-specific implementations.
- Interactive workspace example at `/docs/feedback`, API guidance, and 129 Storybook specimens across the complete library.
- Matching Figma page: 15 families, 99 variants, light/dark review instances, and 136 shared variables.
- Registry includes all 33 families; documentation and Storybook previews updated on 2026-10-18. npm and tagged GitHub release remain the earlier alpha until a separate package release.

## Unreleased — Form foundation

- Ten new original families: Input, Label, Field, Textarea, NativeSelect, Checkbox, RadioGroup, Switch, ButtonGroup, and InputGroup.
- Modular component sources and a shared 18-family catalog for docs and source distribution.
- TextField composes the new primitives while retaining its public props and input ref.
- Native form values, reset, validation associations, mixed checkboxes, keyboard interaction, and light/dark sizes.
- Interactive API pages, composable form example, Storybook states, installer dependency checks, and matching native Figma families.
- Hosted documentation/dashboard and Storybook updated on 2026-10-17. The npm alpha and tagged GitHub release still contain the earlier revision.

## Unreleased — Greptile-inspired visual revision

- Mint action/brand tokens, neutral gray themes, and basalt marketing ink.
- Self-hosted Anybody, DM Sans, and Space Mono with preserved font licenses.
- Square cards, compact controls, monochrome navigation, and a ruled marketing composition.
- Optional `AppShell navigationLayout="top"`, used by the working dashboard.
- Installer registry, Storybook examples, documentation, and native Figma assets synchronized.
- Included in the hosted preview updated on 2026-10-17; npm publication remains pending.

## 0.1.0-alpha.1 — Public alpha

- Publishable `chamfer-ui` installer package with explicit alpha distribution and release metadata.
- Hosted documentation/dashboard and Storybook on separate Vercel projects.
- Pinned GitHub Actions, verified release archives/checksums, draft release workflow, and npm trusted-publishing workflow.
- Source-only deployment preparation and hosted browser verification.
- Public source repository and verified npm alpha release under `insannurjaman`.

## Unreleased — Source installer and live Figma

- Original bundled source installer with dependency resolution, dry runs, conflict protection, and replacement backups.
- Independent React consumer verification using the packed CLI and all eight component families.
- Live Eftax Figma foundations, 97 variables, component variants, and light/dark desktop/mobile dashboard compositions.
- Shared Figma generation repairs for automatic sizing, control padding, order initials, theme colors, and layout alignment.

## 0.1.0 — Foundation

- Original Chamfer identity and three-layer token system.
- Light and dark semantic themes and Tailwind v4 mappings.
- Button, TextField, Badge, Card, Separator, Skeleton, Table, and AppShell.
- Next.js documentation with interactive component examples.
- Storybook stories, controls, themes, and accessibility addon.
- Responsive dashboard with synthetic data, search, sorting, pagination, loading, and CSV export.
- Browser and accessibility checks, GitHub Actions, and contribution templates.
