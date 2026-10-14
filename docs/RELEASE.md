# Chamfer UI public alpha release

## Targets

- GitHub: `insannurjaman/chamfer-ui`, public MIT core.
- npm: `chamfer-ui@0.1.0-alpha.1`, distributed under the `alpha` tag. Only the source installer is publishable; UI and token packages remain workspace internals.
- Vercel: `chamfer-ui-docs` and `chamfer-ui-storybook`, under the owner's personal scope `insans-projects-1a9cbf77`.

Account ownership and successful external publication must be verified before marking a target live. Package-name availability was checked before preparation; it is not reserved until publication succeeds.

## Current status — 2026-10-15

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
