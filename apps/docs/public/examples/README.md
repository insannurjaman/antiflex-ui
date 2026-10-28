# Orbit demo previews

These are actual browser screenshots of the authored local Orbit demo, using synthetic data. They are not client testimonials, customer screenshots, or generated artwork.

`node scripts/capture-showcase.mjs` captures each demo in light and dark at desktop width, then exports WebP previews. Full desktop/tablet/mobile evidence is kept under `.impeccable/review/showcase/`; the capture inventory is `artifacts/showcase/captures.json`. Theme-specific previews follow `PAGE-light.webp` / `PAGE-dark.webp`.

Each `.webp.json` sidecar records its origin through Impeccable's supported sidecar fallback. Regenerate previews only after the corresponding page passes interaction and layout checks.

The antiflex- filename prefix separates these renamed previews from cached pre-rename images.
