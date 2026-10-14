# Foundation verification

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

- Firefox's downloaded binary fails to launch on this macOS host before reaching application code (`Could not find profile folder`). Chromium/WebKit are the local defaults. The Linux CI configuration includes Firefox; CI has not been run remotely.
- Public documentation/dashboard and Storybook are deployed on Vercel. Core source is public on GitHub, and the npm alpha is published by `insannurjaman`; no domain or paid product has been published.

## Published installer verification

`chamfer-ui@0.1.0-alpha.1` is available from npm under the owner's account. Its registry artifact was installed into a fresh independent React app; all eight components, strict TypeScript, production build, fonts, both themes, accessibility, and mobile keyboard behavior pass. Evidence: `assets/previews/npm-evidence.json`. Reproduce with `pnpm installer:smoke --registry`.

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
