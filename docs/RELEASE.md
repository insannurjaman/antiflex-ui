# antiflex/ui release guide

Current source installer: antiflex-ui0.1.0-alpha.2. Binary: antiflex. The complete catalog includes50component families and304stories.

## Verify

```sh
pnpm install --frozen-lockfile
pnpm tokens:check
pnpm tokens:test
pnpm registry:check
pnpm installer:test
pnpm typecheck
pnpm build
pnpm storybook:build
pnpm test
pnpm installer:smoke
pnpm release:prepare
```

The packed tarball is artifacts/antiflex-ui-0.1.0-alpha.2.tgz. Verify SHA-256 and install it in an independent React19/Tailwind4 app before publishing. The package bundles only original source, registry, README and MIT license. No user credentials, private Pro assets or Figma files are included.

## Publish

Authenticate as the authorized npm owner using npm login. Publish the exact verified tarball with npm publish --access public --tag alpha --ignore-scripts. Confirm the registry's name, version, owner and tarball integrity before advertising npm install commands. Do not put credentials into source or shell arguments.

## Production targets

- Documentation: https://antiflex-ui.vercel.app — project prj_v6zRKTVNzXbHrV6s0Z6Ro8XQhgtz, root apps/docs.
- Storybook: https://antiflex-storybook.vercel.app — project prj_14YzPP3ojmyymMMqV1aXC90QjYPy, root apps/storybook.
- Source: https://github.com/insannurjaman/antiflex-ui.

Both Vercel projects belong to insans-projects-1a9cbf77 and use Node24.x. Preserve project IDs, Analytics, protection, domains and Git integration settings. Source-only deployment payloads exclude private Pro material, env files, authentication state and test artifacts. Inspect READY state, public routes, icons, download integrity, navigation and Storybook after deployment.

Historical evidence remains under docs/archive and design/research; it is not current installation guidance.
