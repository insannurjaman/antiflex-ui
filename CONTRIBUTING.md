# Contributing to antiflex/ui

Use Node.js 22+ and pnpm 10. Install with `pnpm install`.

Keep styling and behavior original. Reuse native HTML semantics before introducing custom interactions. Component behavior libraries are outside the foundation architecture.

Edit `packages/tokens/src/tokens.json`, then run `pnpm tokens:build`. Generated CSS and Tailwind mappings must stay synchronized. Update the Figma generation source when a component changes.

Every public component needs typed native props, ref support, useful examples, light/dark state coverage, a Storybook story, and accessibility guidance. Interactive behavior changes require focused browser tests.

Run `pnpm check` before proposing a change. The default macOS browser suite uses Chromium and WebKit; CI includes Firefox. To explicitly try Firefox locally, use `ANTIFLEX_TEST_FIREFOX=1 pnpm test`.

Use `pnpm format` for maintained source, and update CHANGELOG.md for user-visible behavior changes. Do not commit generated builds, test reports, secrets, or paid Pro assets into the core repository.
