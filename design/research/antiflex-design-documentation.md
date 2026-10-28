# antiflex/ui design documentation — 2026-10-28

Completed locally using Impeccable's degraded documenter workflow after the delegated documenter failed with a usage limit. The independent finish reviewer completed separately; its final ship verdict scores two material fixes resolved.

## Paths and evidence

Reconciled PRODUCT.md, DESIGN.md and .impeccable/design.json to the approved antiflex/ui name, exact tagline and description. DESIGN.md retains its canonical eight top-level sections; identity migration is recorded under Overview. Sidecar narrative and identity-only extension prose mirror the implemented rename. No CSS/HTML snippets or normative token objects changed during documentation.

Checked apps/docs/app/page.tsx and layout.tsx, components/brand.tsx and site-header.tsx, installation guidance, the Storybook manager/head, scripts/build-brand-assets.mjs, assets/brand/antiflex-mark.svg, packages/tokens/src/tokens.json, packages/ui/src/styles.css, artifacts/antiflex/token-baseline.json, the final 25 web captures, the 84 example captures, the independent finish review, and assets/figma/antiflex-brand-state.json. Source token/style SHA-256 values match the pre-rename baseline. No Figma variable API writes were used;536 variables remain. Figma page names and five logo insets changed; the file title was not changed.

## Five-line system summary

- Palette: existing neutral light/dark semantic roles, charcoal/light actions and restrained status colors.
- Typography: Anybody display, DM Sans interface, Space Mono technical; existing sizes and weights.
- Shape: square panels and nearly square controls; geometric frame now contains the approved A inset.
- Named rules: Action and Link, Semantic Color, Three Voices, and One Control continue unchanged.
- Identity: antiflex/ui; less flex. More function.; familiar patterns, thoughtful defaults and intuitive experiences.

## Boundaries

Existing @chamfer packages, ch- tokens/classes, browser storage, installer configuration, npm alpha and GitHub repository retain compatible identifiers. No new package release, Git push or broader redesign is implied. The foundation and desktop dashboard Figma screenshots were inspected locally after inline fallback; these checks remain separate from the finish review's two-fix ship verdict.

Unrelated historical brand evidence and old source asset exports remain provenance records; they are not canonized as current identity or silently rewritten.
