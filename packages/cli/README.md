# antiflex source installer

An original installer for the antiflex foundation. It copies editable React/TypeScript components and connects your existing Tailwind CSS 4 entry stylesheet to local tokens, styles, and DM Sans, Space Mono, and Anybody fonts.

The alpha installer copies original components into an existing React 19 / Tailwind CSS 4 project. Use Node.js 22.18 or newer.

```sh
npx --package=https://antiflex-ui.vercel.app/downloads/antiflex-ui-0.1.0-alpha.2.tgz antiflex init --css src/index.css
npx --package=https://antiflex-ui.vercel.app/downloads/antiflex-ui-0.1.0-alpha.2.tgz antiflex add button text-field
```

You can also build and install the tarball from a local checkout:

```sh
# From the antiflex repository
pnpm installer:pack

# From your independent React app
pnpm add -D /absolute/path/to/antiflex-ui-0.1.0-alpha.2.tgz
pnpm exec antiflex init --css src/index.css
pnpm exec antiflex add button text-field
```

```tsx
import { Button } from './components/antiflex/button';
import { TextField } from './components/antiflex/text-field';
```

Use React 19 and a configured Tailwind CSS 4 pipeline. The installer adds Fontsource dependencies and runs the detected package manager's install command. `--skip-install` prepares the files without that step.

Default locations are `src/components/antiflex` and `src/styles/antiflex` when `src` exists; otherwise `components/antiflex` and `styles/antiflex`. Next.js app-directory and common Vite stylesheet paths are discovered automatically. `--css`, `--components-dir`, and `--styles-dir` allow deliberate path selection during initialization. Paths are saved in `antiflex.json`.

- `antiflex list`: inspect all 50 bundled component families.
- `antiflex add --all`: copy the full foundation.
- `antiflex add app-shell`: also include Button, its required dependency.
- `--cwd <path>`: target a specific React app.
- `--dry-run`: inspect changes without writing files or installing packages.
- `--force`: replace explicitly requested customized components and keep their original files under `.antiflex/backups`.

Repeated installs are idempotent. Customized transitive dependencies and shared helpers are preserved. Unknown items, escaping paths, symlinks, invalid configuration, and style conflicts fail before writes. File operations are staged together and rolled back on write failure; dependency-install failure preserves the prepared source and tells you how to finish.

The registry is bundled with the release, so component installation does not fetch arbitrary source URLs. It is generated from the same UI and token source used by the documentation and Storybook. There are no shadcn or third-party behavior dependencies.

The form families are included in the current antiflex installer. Adding Field, TextField, or a form control also includes its required components and shared form helpers.

The current workspace registry contains 50 original families, including Hover Card, Menubar, Navigation Menu, Select, Combobox, Command, Calendar and Date Picker. Pack this source locally to install the expanded catalog. The versioned installer download contains the complete current catalog.
