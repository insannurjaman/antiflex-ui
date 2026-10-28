# antiflex/ui verification

The full namespace migration retains the existing neutral visual system and native component behavior. Canonical packages use @antiflex; CSS, data attributes and Tailwind namespaces use af-; installation uses antiflex-ui with the antiflex executable and antiflex.json configuration.

## Current checks

- All 292 browser scenarios passed in Chromium and WebKit, including all 304 Storybook specimens, light/dark accessibility, keyboard behavior, forms, filtering, sorting, pagination, workspace routes, responsive layouts and saved-state migration.
- All 19 installer unit tests passed, including safe paths, symlink refusal, idempotence, conflict handling and backups.
- The packaged installer was tested in an independent React 19/Tailwind 4 app: typecheck and production build passed, no axe violations, no mobile overflow or page errors. Computed primary fills remain neutral in both themes.
- Primitive, semantic and component token values are identical to the previously deployed source; only namespaces change.
- Six installation screenshots cover 1440/768/390 widths in both themes. Current user-facing instructions contain no obsolete product names.

Run `pnpm check` and `pnpm installer:smoke` to reproduce. Deployment, registry and public download checks are recorded separately for the final release. Automated checks and visual review complement, rather than certify, full accessibility conformance.
