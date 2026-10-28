# Chamfer UI public alpha release

## Neutral default theme - 2026-10-27

The default light and dark roles now use Neutral, following the requested shadcn/ui reference: white/gray surfaces, charcoal/light primary actions, neutral link/selection/focus roles, and matching neutral favicon/social artwork. Semantic success, warning, and error pairs remain distinct. Mint remains an optional primitive ramp. Geometry, typography, APIs, and behavior are preserved.

- Figma: 13 existing neutral primitives and 27 semantic variables reconciled in place; 40 Neutral mode aliases match code. All 536 variable IDs remain intact.
- Builds: docs, UI library, Storybook, typechecking, formatting, generated token/registry checks passed. Local installer tarball and Figma generation artifacts refreshed.
- Tests: 6 token/contrast checks, 19 installer checks, and 32 Chromium/WebKit browser tests passed, including all 304 Storybook stories per browser. Mobile/tablet/desktop and both themes reviewed.
- Production docs: `dpl_6XuvDYtKMdJWdpp58ZQ948pCRSEE` - [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app).
- Production Storybook: `dpl_69FkweMzMzckXzDFEu4hgViqrnkv` - [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app).
- Public verification: expected primary colors, working theme switching, visible homepage mark, and matching local/public favicon and OG asset bytes.

Evidence: `design/research/neutral-theme-verification.json` and `assets/figma/neutral-theme-state.json`. No npm publication or GitHub commit/push was performed.

## Favicon and social sharing — 2026-10-26

- Docs production READY: `dpl_Byt8ruFZQLkxukuoJCmwkeLkivGY`; Storybook production READY: `dpl_GLkychSAtGsQdvLHB5ib7Sf37iS9`. Existing aliases and project scopes are preserved.
- Add the original Chamfer symbol as SVG, a 16/32/48px ICO and a 180px Apple Touch image. The 1200 × 630 OG PNG uses local brand fonts, charcoal, mint and the established positioning.
- Open Graph/Twitter metadata includes absolute image URLs, dimensions and alt text. Four docs routes pass crawler-HTML checks; Storybook metadata and its 304-story index pass. Eight live icon/image URLs return byte-identical generated assets. Both local production builds pass.
- Reproduce with `pnpm brand:build`. Evidence: `design/research/brand-assets-verification.json`. No component, token, Figma, npm or Git release changes are included in this asset update.

## Workspace tools portfolio preview — 2026-10-23

- Production docs **READY**: [workspace tools](https://chamfer-ui-docs.vercel.app/docs/workspace-tools), deployment `dpl_2bFby7VeKx7PVRqjhcoxot3mU9L8`.
- Production Storybook **READY**: [components](https://chamfer-ui-storybook.vercel.app), deployment `dpl_4Rhf3cM2qRyKCmZSEioUW7KR5rmc`.
- Eight new original families bring the source and hosted previews to **50 families / 304 stories**: Hover Card, Menubar, Navigation Menu, Select, Combobox, Command, Calendar and Date Picker. Date tools support a single Gregorian day; ranges, alternate calendars, virtualization, global shortcuts and backend persistence remain outside this batch.
- All **60 hosted Chromium/WebKit cases** pass, including all 64 new stories in both themes, keyboard/form/reset/date behavior, long Command row visibility in inline/dialog forms, responsive docs navigation and dashboard regressions. Local evidence separates the earlier 260-case full regression from the 56-case post-namespace checks and eight-case final Command/64-story follow-up.
- The independent React consumer installs all 50 families from a local packed CLI and passes typecheck, production build, interactions, axe and mobile overflow checks. The npm and tagged GitHub alpha remain the prior eight-family revision; no package or Git publication occurred.
- Figma adds 21 component roles and eight public sets with 42 visual variants plus 11 internal building-block variants. The file has 536 variables / 55 text styles and 16 theme/responsive boards. Full finish review returned ship; the subsequent scoped Command clipping finding was fixed and scored resolved/ship. DESIGN.md and its sidecar record the extension.
- Existing personal-scope project IDs were verified. Source uploads contain 210 docs files and 214 Storybook files, using dirty working-tree provenance based on `945583a879ef53d012d6eeae6951b1c7ae8d519d`. Payload hashes are retained; Pro/Figma/environment/auth/test artifacts were excluded. Next.js was patched to 16.4.2. No security settings changed.
- Official Analytics loader and route queues pass without duplicate preview SDKs or page errors. Headless ingestion does not establish visitor counts. Post-test deployment-scoped ten-minute error snapshots return zero records; drains were not inspected and continuous monitoring is not claimed.
- Evidence: `design/research/workspace-tools-verification.json`, `design/research/workspace-tools-public-verification.json`, `assets/figma/expansion-validation.json`, `design/research/workspace-tools-finish-review.md` and `design/previews/workspace-tools/public-workspace-tools.png`.

## Toast portfolio preview — 2026-10-21

- Production docs **READY**: [Toast example](https://chamfer-ui-docs.vercel.app/docs/notifications), deployment `dpl_4ppqD7p22o1478zouSmvvwsHZ1dj` (Next.js, build 40.071s).
- Production Storybook **READY**: [Toast stories](https://chamfer-ui-storybook.vercel.app/?path=/story/components-toast--default), deployment `dpl_fUkkbUEc3w6eRSVUrWgotVDhX9Ad` (Vite/Storybook, build 26.044s).
- Both use existing projects in `insans-projects-1a9cbf77`; source is the dirty working tree based on `945583a879ef53d012d6eeae6951b1c7ae8d519d`. Whitelisted source payloads contain 187 docs files and 185 Storybook files, excluding private Pro assets, Figma files, environment/auth files and test artifacts. No security settings changed.
- All 70 hosted Chromium/WebKit cases pass, including async retry/focus, queue/timing, nested dialogs/menus, local state/downloads, responsive layout and both themes. The source catalog has 42 families; the hosted index confirms 240 stories, including 16 Toast stories. The official Analytics loader and route queues pass without duplicates or browser errors; no new visitor-count claim is made from headless traffic.
- Scoped ten-minute runtime error snapshots return zero records for both deployments. Drains were not inspected; continuous error monitoring is not claimed.
- Figma adds twelve original Toast variants and seven token roles (515 variables / 55 text styles). Finish review: **ship**. npm and tagged GitHub remain the prior eight-family alpha; no package or Git publication was performed.
- Evidence: `design/research/toast-verification.json`, `design/research/toast-public-verification.json`, `assets/figma/toast-validation.json`, and `design/previews/toast/public-toast.png`.

## Targets

- GitHub: `insannurjaman/chamfer-ui`, public MIT core.
- npm: `chamfer-ui@0.1.0-alpha.1`, distributed under the `alpha` tag. Only the source installer is publishable; UI and token packages remain workspace internals.
- Vercel: `chamfer-ui-docs` and `chamfer-ui-storybook`, under the owner's personal scope `insans-projects-1a9cbf77`.

Account ownership and successful external publication must be verified before marking a target live. Package-name availability was checked before preparation; it is not reserved until publication succeeds.

## Edge panels — 2026-10-19

- Docs production `dpl_7pAbhjgpu8T7Lemz9zY5DZ1eDa8p`, READY at [panel examples](https://chamfer-ui-docs.vercel.app/docs/panels).
- Storybook production `dpl_CsbH3sACLPNs3aUuSqC5JrXyfKHq`, READY at [Sheet](https://chamfer-ui-storybook.vercel.app/?path=/story/components-sheet--right) and [Drawer](https://chamfer-ui-storybook.vercel.app/?path=/story/components-drawer--open).
- Current source/hosted catalog: 39 families and 196 specimens. This batch adds Sheet and Drawer, nine size tokens, 22 stories, 34 Figma variants, working local settings/export examples, and installer coverage. Drawer excludes swipe and snap points.
- Existing personal scope, project IDs and app roots were verified before release. Allowlisted source uploads preserve the shared dirty-workspace provenance at `945583a879ef53d012d6eeae6951b1c7ae8d519d`; payload file counts/hashes are recorded in `design/research/panels-public-verification.json`. Private Pro assets and environment files are excluded.
- All 58 hosted Chromium/WebKit cases pass. Analytics loader/route-queue recheck passes, including no duplicate embedded-preview SDK. Runtime error scan: zero records on both deployments in the recorded ten-minute snapshots. Drains were not inspected in this scoped release; continuous error monitoring is not claimed.
- Independent review: `ship`, no material findings. npm and tagged GitHub remain the prior eight-family alpha; no package publication or repository changes were pushed.

## Vercel Web Analytics — 2026-10-19

- Docs production: `dpl_GcESJJgKmVXoX97N32m12scG7rhW`, READY. Storybook production: `dpl_EM1boDwSSSMYx2WFgrJ3PeGfZVz2`, READY.
- Both projects already had Web Analytics enabled on their current Hobby scope; the missing official `@vercel/analytics@2.0.1` integration is now deployed.
- Next.js root integration tracks navigation. Storybook records normalized story/docs paths after its manager channel is ready, deduplicates repeated notifications, and excludes embedded previews while supporting standalone previews.
- Both builds, workspace types, and hosted SDK/route-queue checks pass. Real browser verification produced recorded traffic in both projects. Vercel deliberately excludes headless/webdriver traffic, so automated checks validate loaders and SDK queues rather than manufacturing production events.
- Evidence: `design/research/analytics-verification.json`, `artifacts/analytics-browser-checks.json`, and `design/previews/analytics/`. No plan upgrade, Speed Insights, custom events, npm release, or GitHub publication was performed.

## Documentation navigation repair — 2026-10-18

- Documentation production deployment `dpl_2z8X38nDFE5CWm5sjDxuVZpD2Gpv`, READY at [chamfer-ui-docs.vercel.app/docs/components](https://chamfer-ui-docs.vercel.app/docs/components).
- Desktop docs header/sidebar remain in view, with independent sidebar scrolling. Sidebar and Overview use the same A–Z display-name catalog; mobile retains its disclosure navigation.
- Four local and four hosted Chromium/WebKit scenarios pass, including 390/768/900/1440 widths, keyboard footer reachability, scroll independence, ordering equality, and axe. Build/typecheck pass; independent finish review returned `ship`.
- Evidence: `design/research/docs-navigation-verification.json`. Storybook, Figma, npm, and GitHub publication remain unchanged for this docs-only repair.

## Anchored floating portfolio preview — 2026-10-18

- Documentation/dashboard: [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app/docs/floating), production deployment `dpl_DDu41kPpygd3gMnFf3xqGKVQfUTy`, READY.
- Storybook: [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app), production deployment `dpl_BeNLXYhyMG7xP3pSvFa9pueRXbor`, READY.
- Thirty-seven families, 174 specimens, Popover/Tooltip documentation and interactive examples, and the NativeSelect logical chevron inset fix.
- All 48 hosted Chromium/WebKit scenarios pass: 34 floating, twelve dashboard/navigation/field regressions, and two Select spacing scenarios. Both aliases return HTTP 200. The 174-story full scan passed locally in both browsers; hosted verification checks the scoped open stories in both themes. A deployment-scoped runtime error snapshot returned zero records.
- Native Figma adds twelve variants and six roles, with 150 shared variables. Independent finish review returned `ship`; durable design records were updated.
- Source payloads contain uncommitted changes based on `945583a`; scope, hashes, IDs, and results live in `design/research/floating-public-verification.json`. npm and the tagged GitHub alpha remain unchanged; unique-deployment authentication was preserved.

## Native modal portfolio preview — 2026-10-18

- Documentation/dashboard: [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app/docs/modals), production deployment `dpl_92vxGz9wiAzErVm2Umt19LrZA5Ca`, READY.
- Storybook: [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app), production deployment `dpl_hTzEbVXa9vqMvz93Bq1v7U8Rumi6`, READY.
- Thirty-five component families, 149 stories, and a working modal task/confirmation example. Native modal variants, shared scroll/focus behavior, and corrected sample edit/archive workflows are included.
- All 36 hosted Chromium/WebKit scenarios pass: 24 modal cases and twelve dashboard/navigation/field regressions, with all twenty new stories scanned in both themes. Stable aliases return HTTP 200. A deployment-scoped runtime error snapshot returned zero records.
- Source bundles include uncommitted changes based on `945583a`; hashes, IDs, scope, and evidence live in `design/research/modal-public-verification.json`. The npm and tagged GitHub alpha remain unchanged. Unique-deployment authentication was preserved.

## Public portfolio preview — 2026-10-18

- Documentation/dashboard: [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app/docs/feedback), production deployment `dpl_8Y1L6fq8ZAvGjQcPQ5DNDGuyFAgs`, READY.
- Storybook: [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app), production deployment `dpl_4HCApU62DJi8awuMdmT2L8cqKQLD`, READY.
- Includes 33 component families, the feedback/navigation workspace example, and 129 Storybook specimens. Stable aliases return HTTP 200 without authentication.
- Explicit source bundles include uncommitted working-tree changes based on `945583a`; this does not change the npm alpha or tagged GitHub release. Payload hashes and actual hosted checks are recorded in `design/research/feedback-public-verification.json`.
- Scope and both project IDs were verified using the existing CLI authentication before creation. Unique deployment protection remains enabled.
- All 40 hosted scenarios pass across Chromium and WebKit, including every one of the 129 Storybook specimens and light/dark feedback routes. A deployment-scoped runtime error query returned zero records; this is a bounded release check, not ongoing monitoring.

## Public portfolio preview — 2026-10-17

- Documentation/dashboard: [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app), production deployment `dpl_CR3VfevjT3L5qDbpfbTTCYBg7RzH`, READY.
- Storybook: [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app), production deployment `dpl_pjqChXpPPLxmggan6PyYmKqMTo5p`, READY.
- Includes the mint visual revision, 18 component families, composing forms example, and 69 Storybook specimens. The stable public aliases work without authentication.
- Deployed explicit source bundles from the working tree based on `945583a`, including uncommitted changes. This is a website preview update, not a new tagged GitHub or npm release. Source bundle hashes and hosted verification are recorded in `design/research/public-preview-verification.json`.
- The Vercel connector rejected deployment scope access; the existing CLI authentication deployed the verified personal projects successfully. Preview deployment protection remains enabled.
- All 30 hosted browser tests pass across Chromium and WebKit, including accessibility checks for all 69 Storybook specimens. Documentation routes return HTTP 200 without login redirects.

## Initial alpha release — 2026-10-15

- Documentation/dashboard: [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app), deployment `dpl_H176ib6QUYznEv65JLB72t8JPdZ9`, READY.
- Storybook: [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app), deployment `dpl_FPQQD7RWxA3utY1thkKAQ2hRPUQ8`, READY.
- Both projects automatically deployed source commit `c771cda` through Git integration. The public aliases return HTTP 200. Unique deployment URLs retain Vercel Authentication; protection was preserved.
- Vercel connector scope access returned 403. The CLI's existing authentication successfully created, configured, and deployed the exact intended personal projects.
- GitHub repository: public `insannurjaman/chamfer-ui` created under the verified owner account; source history uploaded to `main`. [Foundation CI](https://github.com/insannurjaman/chamfer-ui/actions/runs/38626202881) and the [tagged release workflow](https://github.com/insannurjaman/chamfer-ui/actions/runs/38626271271) pass on `c771cda`: tokens, registry integrity, 14 installer tests, types, all three builds, 27 browser scenarios across Chromium/Firefox/WebKit, and the independent installer consumer. Bulk accessibility scans have explicit aggregate budgets. Only the disposable test consumer permits lockfile updates when initialization adds fonts; the repository installation remains frozen.
- GitHub prerelease: [v0.1.0-alpha.1](https://github.com/insannurjaman/chamfer-ui/releases/tag/v0.1.0-alpha.1), published with the verified installer tarball and SHA-256 checksum.
- npm publication: `chamfer-ui@0.1.0-alpha.1` published by `insannurjaman` and verified in registry metadata. The `alpha` tag points to this release.

## Verify and assemble

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium webkit
pnpm check
pnpm installer:smoke
pnpm release:prepare
```

The release preparation creates the installer tarball, a SHA-256 checksum file, and release notes under `artifacts/`. No credentials or workspace dependencies are included in the installer package. It has no runtime package dependencies; it adds Fontsource dependencies to the consumer during initialization.

## GitHub and release automation

Create the empty public repository, connect the local checkout, and push the reviewed main branch. GitHub Actions runs the same checks on push and pull requests. Set the Foundation checks / verify job as a required check once the first remote run succeeds.

The `release.yml` workflow verifies builds and browser behavior, tests the packed installer, and uploads release assets. A version tag matching `packages/cli/package.json` creates a draft prerelease containing the tested tarball and checksum. Review and publish that draft once external links and Linux CI results are verified.

## npm ownership and publishing

The package is prepared for unscoped publication as `chamfer-ui`. Its owner must authenticate directly through `npm login` and complete npm's required verification. Do not put credentials in this repository or paste them into chat.

For the initial release, publish the tested tarball from the authenticated owner account:

```sh
npm publish ./artifacts/chamfer-ui-0.1.0-alpha.1.tgz --access public --tag alpha --ignore-scripts
```

For subsequent releases, configure an [npm trusted publisher](https://docs.npmjs.com/trusted-publishers/) for GitHub user `insannurjaman`, repository `chamfer-ui`, workflow `publish.yml`, and environment `npm`. Configure that environment to allow the reviewed `main` branch. The manually dispatched workflow tests and packs first, then publishes that exact artifact using OIDC. It needs no stored npm token.

Do not advertise the registry command until `npm view chamfer-ui@0.1.0-alpha.1` confirms the actual release. Before then, the tarball installation documented in the product works.

## Documentation and Storybook hosting

[Vercel's monorepo workflow](https://vercel.com/docs/monorepos) uses one project for each app, with Root Directory set in the project's settings:

| Setting                     | Documentation                    | Storybook                          |
| --------------------------- | -------------------------------- | ---------------------------------- |
| Root Directory              | `apps/docs`                      | `apps/storybook`                   |
| Framework                   | Next.js                          | Other                              |
| Node                        | 24.x                             | 24.x                               |
| Include source outside root | Enabled                          | Enabled                            |
| Install                     | `pnpm install --frozen-lockfile` | Same                               |
| Build                       | `cd ../.. && pnpm build`         | `cd ../.. && pnpm storybook:build` |
| Output                      | Next.js default                  | `storybook-static`                 |

The app-local `vercel.json` files record build configuration. Root Directory is a project setting, not a `vercel.json` key. Workspace packages and shared configuration must be included in the source checkout.

Both Vercel projects are connected to `insannurjaman/chamfer-ui` through Git integration. It supplies PR previews and deployment links; CI supplies behavior checks. Verify the project owner, directory, Git commit, and environment before deployment. Do not enable a token-based deployment workflow just to duplicate the Git integration.

`pnpm deploy:prepare docs` and `pnpm deploy:prepare storybook` assemble explicit source-only API payloads under `artifacts/` for a connector deployment when Git integration is not yet available. Those commands do not deploy. They omit local environment files, node_modules, authentication state, tests, previews, and Figma exports.

Before promoting a tested release, check the documentation routes, component specimens, dashboard filtering/sorting/pagination, theme switching, mobile navigation, font loading, and Storybook iframe assets on the hosted URLs. Record the actual URLs and deployment IDs after successful builds.

## Recheck the hosted release

```sh
CHAMFER_DOCS_URL=https://chamfer-ui-docs.vercel.app \
CHAMFER_STORYBOOK_URL=https://chamfer-ui-storybook.vercel.app \
pnpm test
```

These variables direct the complete browser suite to the hosted applications without starting local servers.

## Complete reference foundations deployment — 2026-10-19

Both existing production targets are READY with the expanded color and typography foundations. This deployment contains 39 component families and 203 Storybook specimens. It updates the public previews from the current dirty local source based on `945583a879ef53d012d6eeae6951b1c7ae8d519d`; it does not claim the local changes are published as a Git commit or npm release.

| Target                | Public URL                                                                                                                   | Deployment                         | Build duration |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------- |
| Next.js documentation | [chamfer-ui-docs.vercel.app](https://chamfer-ui-docs.vercel.app/docs/foundations/colors)                                     | `dpl_FcRsLkbGFD6UMaT74eWrJndvstrP` | 30s            |
| Storybook             | [chamfer-ui-storybook.vercel.app](https://chamfer-ui-storybook.vercel.app/?path=/story/foundations-colors--complete-palette) | `dpl_EAhATRcK3sS8jiznCqf4vdZWVNHX` | 26s            |

The scope is `insans-projects-1a9cbf77`; project roots remain `apps/docs` and `apps/storybook`. Each explicit source-only payload contains 173 files. Payload hashes and provenance are recorded in `artifacts/expanded-foundations-payloads.json`. Private Pro material, environment files, authentication state, tests, screenshots, and Figma exports are excluded from the payload.

Post-deploy Analytics loader/SDK queue checks pass for docs navigation, Storybook manager routing, embedded-frame exclusion, and standalone previews, without duplicate loaders or page errors. Headless collection is intentionally excluded by Vercel; these checks verify SDK behavior rather than inventing visitor events. Runtime error snapshots return zero records for both deployments. This is a scoped snapshot, not continuous error monitoring; drains were not inspected or changed.

Hosted behavior evidence is recorded in `design/research/expanded-foundations-public-verification.json`. The npm package and tagged GitHub alpha remain the earlier eight-family revision.

## Action menus deployment — 2026-10-20

The existing documentation and Storybook production aliases are READY with 41 component families and 224 stories. This source-only deployment uses the dirty checkout based on `945583a879ef53d012d6eeae6951b1c7ae8d519d`; it does not claim the changes were pushed as a commit or published to npm.

| Target                | URL                                                                                                  | Deployment                         |
| --------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Next.js documentation | [Action menus](https://chamfer-ui-docs.vercel.app/docs/menus)                                        | `dpl_7qZyDYby2TE89KAfp6udVCokWkaS` |
| Storybook             | [Dropdown Menu](https://chamfer-ui-storybook.vercel.app/?path=/story/components-dropdownmenu--basic) | `dpl_CJjsvN3DzY7oZtpFEGJAgpokPYR1` |

Scope remains `insans-projects-1a9cbf77`, roots `apps/docs` and `apps/storybook`, with Node 24.x. Each explicit payload contains 182 allowed source files; payload hashes and metadata are in `artifacts/menus-payloads.json`. Private Pro material, environment files, authentication state, tests, screenshots, and Figma exports are excluded.

All 48 hosted scenarios pass. Official Analytics loader/SDK route checks pass, including standalone Storybook preview and embedded-frame deduplication. Runtime error snapshots return zero records for both deployments; this is scoped verification, not continuous monitoring. Drains were not inspected or changed. Actual deployment/build details are in `design/research/menus-public-verification.json`. The npm/tagged GitHub alpha remains the earlier eight-family revision.

## Orbit SaaS showcase deployment — 2026-10-28

The [Examples gallery](https://chamfer-ui-docs.vercel.app/examples) and [Orbit workspace](https://chamfer-ui-docs.vercel.app/demo) are live on the existing documentation production alias. Deployment `dpl_EXpFEpuNwjHpSnFhkbz5xwmXxpLw` is READY in project `prj_v6zRKTVNzXbHrV6s0Z6Ro8XQhgtz`, scope `insans-projects-1a9cbf77`, root `apps/docs`, Node 24.x.

The showcase adds thirteen connected views: overview, analytics, orders, customers, projects, activity, team, settings, profile, billing, checkout, sign-in and onboarding. Application pages support sidebar and top navigation; sign-in and onboarding use focused standalone layouts. All views support light and dark themes and responsive layouts. Customer/project/team changes, settings, profile, activity and demo receipts share browser-local state. Authentication, invitations, recovery and checkout are simulations; no payment or account service is connected.

Production build and workspace type checks pass. Local verification passes 26 showcase browser tests across Chromium and WebKit plus 16 legacy regression tests. Five hosted Chromium flow tests pass. All sixteen checked public routes return HTTP 200, and all twenty-six preview assets match their local source bytes. Visual evidence includes 84 responsive route captures and 14 gallery/state captures; four gallery accessibility scans return zero violations. The independent finish review concludes `ship`. These are scoped checks, not a claim of universal accessibility certification.

The explicit source-only deployment contains 283 files, with payload SHA-256 `7cfecbcff960c08dec4e5f95744afe9a91e0518d79d1aaaf8d65e56e0b2b4d7d`. It uses the dirty checkout based on `945583a879ef53d012d6eeae6951b1c7ae8d519d`; no Git push or npm publication was performed. The component catalog remains fifty families / 304 stories; Storybook and Figma were not changed by this milestone. Aggregate evidence is recorded in `design/research/orbit-showcase-verification.json`, with usage and limitations in `docs/EXAMPLES.md`.

## antiflex/ui rename deployment — 2026-10-28

The renamed site is live at [antiflex-ui.vercel.app](https://antiflex-ui.vercel.app), with [Storybook](https://antiflex-storybook.vercel.app). The requested nested ui.antiflex.vercel.app address was rejected by Vercel; the user confirmed antiflex-ui.vercel.app. The previous public aliases remain attached and return HTTP 200.

- Docs: `dpl_6dxvkoiEBExquUN4BNW9inyTYAA1`, project `prj_v6zRKTVNzXbHrV6s0Z6Ro8XQhgtz`, READY.
- Storybook: `dpl_5GmqMot8buyCe383reeMNVE4jJp9`, project `prj_14YzPP3ojmyymMMqV1aXC90QjYPy`, READY.

Both existing projects were renamed in scope insans-projects-1a9cbf77. Roots, Node 24.x, Git integration, Analytics and protection settings were preserved. Source-only payloads contain 283 docs files and 220 Storybook files; hashes are in artifacts/antiflex/payload-provenance.json. These deployments use the dirty checkout based on 945583a879ef53d012d6eeae6951b1c7ae8d519d, with no Git push or npm publication.

The product name, user-approved positioning, A mark, favicon, OG image, documentation, Storybook and26 gallery preview assets now use antiflex/ui. All 50 selected local browser tests pass across Chromium/WebKit; five hosted flow tests pass. Nineteen routes return HTTP 200;35 public image/icon assets match local bytes; the index retains304 stories. Analytics loader/queue and iframe checks pass; headless checks do not establish real visitor ingestion. The finish verdict resolves both identified material fixes. Documentation reconciliation used a local fallback after the documenter hit a usage limit.

Existing @chamfer workspace names, ch- CSS/token identifiers, browser storage keys and published chamfer-ui alpha remain compatible identifiers. Browser storage remains scoped to its hostname; switching to the new hostname starts separate demo state. Sixteen existing Figma product pages and brand labels plus five A insets were updated;536 variables remain. The Figma file title was not changed. Aggregate evidence: design/research/antiflex-verification.json.
