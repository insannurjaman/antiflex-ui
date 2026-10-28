# antiflex/ui namespace documentation — 2026-10-28

The approved complete namespace migration supersedes the earlier technical-identifier retention policy. This pass reconciles PRODUCT.md, DESIGN.md, and `.impeccable/design.json` with the implemented installation page and current source/package evidence. It preserves the incumbent design system rather than introducing a new visual world.

Authority: `design/briefs/antiflex-namespace-migration.md`, its user screenshot at `/var/folders/5w/6l0fxsb50nz53npjd2fp1hg00000gn/T/codex-clipboard-1aa76caa-39af-41aa-9f7d-dd5888096df5.png`, and the existing product/design records. The screenshot and all six `installation-{light,dark}-{desktop,tablet,mobile}.png` captures under `.impeccable/review/antiflex-technical/` were opened for this pass. The installation captures show the current brand, versioned commands, default paths, private-workspace distinction, and flat neutral reading surface at the three widths. Long code remains inside its bounded horizontal region; mobile retains the documentation-menu disclosure.

Canonical product truth:

- Brand: **antiflex/ui**. Exact tagline: **less flex. More function.** The original geometric A artwork remains authoritative.
- Published source installer: `antiflex-ui@0.1.0-alpha.2`; executable: `antiflex`; configuration: `antiflex.json`. The alpha contains all 50 component families.
- Default source locations: `components/antiflex` and `styles/antiflex`, beneath `src/` when present. `@antiflex/ui` and `@antiflex/tokens` remain private workspace dependencies.
- Current classes, custom properties, component data attributes, and optional reference Tailwind utilities use `af-`. Semantic utilities such as `bg-surface` remain unprefixed; `data-theme` retains its theme-boundary role.
- The private one-time browser-storage reader and its tests retain legacy read keys so existing theme/demo state survives. Historical evidence remains factual. Neither exception supplies current installation names.

Source read: `apps/docs/app/docs/installation/page.tsx`, `packages/ui/src/styles.css`, `packages/tokens/src/tokens.json`, and the private storage-reader boundary. DESIGN.md frontmatter values are unchanged by this pass. Sidecar extension data, component HTML/CSS snippets, and all component values are unchanged; its overview now matches DESIGN.md verbatim and no longer describes a nonsensical replacement of a former antiflex identity. PRODUCT.md now distinguishes the published installer from private workspace packages and records complete canonical paths and naming exceptions.

Supplied verification evidence, read without re-execution:

| Record | Supported result |
| --- | --- |
| `artifacts/antiflex-technical/browser-tests-verified.log` | 292 passing Chromium/WebKit cases, including the complete 304-story catalog coverage. |
| `artifacts/antiflex-technical/installer-tests.log` | 19 passing installer units, zero failures. |
| `artifacts/antiflex-technical/registry-consumer-full.log` | Published alpha installed all 50 families in an independent consumer; typecheck, production build, and installer passed; zero accessibility violations, mobile overflow, or page errors. This full consumer record is newer evidence than the smaller registry sample described in the finish review. |
| `artifacts/antiflex-technical/package-proof.json` and `registry-integrity.json` | Published `antiflex-ui@0.1.0-alpha.2` bytes match the tested tarball; SHA-256 `ba9c63d87d4e47bfdb9b9db13a1ccfb6926f89ed340b53d86f08d1e26b18e69d`; zero obsolete names in the package proof. |
| `assets/figma/antiflex-namespace-state.json` | Three collections, 55 text styles, one effect style, and 536 WEB syntax entries renamed in place; IDs, values, and bindings preserved. This pass reads the recorded Figma result and does not claim a new remote inspection. |
| `design/research/antiflex-namespace-finish-review.md` | Ship for the local implementation and package evidence; final hosted deployment and source synchronization remain release steps. |

Five-line system summary:

1. Palette: unchanged Neutral light/dark surfaces, charcoal/light action pairs, semantic status colors, and independent focus roles.
2. Typography: Anybody display, DM Sans reading/controls, and Space Mono technical roles retain the existing hierarchy and responsive reductions.
3. Layout and shape: compact spacing, square panels, nearly square controls, thin seams, and responsive reading navigation remain intact.
4. Material and motion: The Ruled Surface Rule preserves flat resting regions; existing motion and reduced-motion behavior remain unchanged.
5. Behavior and naming: The Action and Link, Three Voices, and ownership rules remain authoritative; current public/source namespaces consistently use antiflex and af-.

Not canonized or repaired: the two inherited 11px/10px detector font advisories remain out-of-scope observations, not new typography tokens or recommendations. No build, test suite, browser session, detector, implementation, or asset changes were performed in this documentation pass. Final public deployment and GitHub source synchronization are not claimed complete here.
