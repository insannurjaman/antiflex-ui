# Chamfer source installer

An original installer for the Chamfer foundation. It copies editable React/TypeScript components and connects your existing Tailwind CSS 4 entry stylesheet to local tokens, styles, and IBM Plex fonts.

This alpha is distributed as a local tarball; it has not been published to npm.

```sh
# From the Chamfer repository
pnpm installer:pack

# From your independent React app
pnpm add -D /absolute/path/to/chamfer-cli-0.1.0.tgz
pnpm exec chamfer init --css src/index.css
pnpm exec chamfer add button text-field
```

```tsx
import { Button } from './components/chamfer/button';
import { TextField } from './components/chamfer/text-field';
```

Use React 19 and a configured Tailwind CSS 4 pipeline. The installer adds Fontsource dependencies and runs the detected package manager's install command. `--skip-install` prepares the files without that step.

Default locations are `src/components/chamfer` and `src/styles/chamfer` when `src` exists; otherwise `components/chamfer` and `styles/chamfer`. Next.js app-directory and common Vite stylesheet paths are discovered automatically. `--css`, `--components-dir`, and `--styles-dir` allow deliberate path selection during initialization. Paths are saved in `chamfer.json`.

- `chamfer list`: inspect the eight bundled components.
- `chamfer add --all`: copy the full foundation.
- `chamfer add app-shell`: also include Button, its required dependency.
- `--cwd <path>`: target a specific React app.
- `--dry-run`: inspect changes without writing files or installing packages.
- `--force`: replace explicitly requested customized components and keep their original files under `.chamfer/backups`.

Repeated installs are idempotent. Customized transitive dependencies and shared helpers are preserved. Unknown items, escaping paths, symlinks, invalid configuration, and style conflicts fail before writes. File operations are staged together and rolled back on write failure; dependency-install failure preserves the prepared source and tells you how to finish.

The registry is bundled with the release, so component installation does not fetch arbitrary source URLs. It is generated from the same UI and token source used by the documentation and Storybook. There are no shadcn or third-party behavior dependencies.
