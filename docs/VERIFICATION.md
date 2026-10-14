# Foundation verification

## Verified locally

- Token outputs match the shared JSON source.
- Strict TypeScript checks pass for UI, documentation, and Storybook.
- UI JavaScript and declaration build passes.
- Next.js production build passes and produces all documentation/component routes.
- Storybook static build passes with all eight families.
- 16 Playwright scenarios pass in Chromium and WebKit.
- Search, status filters, sort direction, pagination, empty state recovery, CSV download, date range, and simulated refresh loading work.
- Light/dark choice persists across reload and navigation.
- Mobile disclosure closes with Escape and restores focus, and closes on link navigation.
- TextField error association and Button loading activation prevention pass.
- Axe scans pass on all primary pages in both themes and every Storybook specimen.
- Seven desktop/tablet/mobile browser previews report no page errors or horizontal overflow and use IBM Plex Sans.
- Independent finish review: **ship** for the local frontend. Homepage label removal, chart-period alignment, and readable mobile date labels are resolved. No material regressions remain from that fix batch.
- The direction contract persists in the production HTML.

## External / environment limitations

- Firefox's downloaded binary fails to launch on this macOS host before reaching application code (`Could not find profile folder`). Chromium/WebKit are the local defaults. The Linux CI configuration includes Firefox; CI has not been run remotely.
- The Figma connector exposed to this chat still identifies the old Saphyte account and rejects the requested Eftax file. Native import and connector phase scripts are generated and syntax checked, but **not run or visually verified in Figma**. Matching live design/code cannot yet be certified. See `assets/figma/README.md`.
- No public repository, npm package, hosting, domain, or paid product has been published in this milestone.

## Reproduce

```sh
pnpm install
pnpm exec playwright install chromium webkit
pnpm check
pnpm figma:build
pnpm format:check
```

Automated checks complement manual keyboard and screen-reader review. They are not an accessibility certification.
