# antiflex/ui browser and sharing assets

Canonical name: **antiflex/ui**. Tagline: **less flex. More function.**

A design system that favors familiar patterns, thoughtful defaults, and intuitive experiences over unnecessary complexity.

The neutral A mark retains the existing geometric frame, with an A replacing the previous C inset. The OG image uses neutral charcoal and off-white, Anybody display, DM Sans supporting text, and Space Mono technical labels. Tokens, component APIs and typography remain unchanged.

- `antiflex-mark.svg` and `antiflex-wordmark.svg`: editable canonical identity assets. The wordmark uses Anybody and requires that font when rendered as editable text.
- `antiflex-favicon.svg` and `antiflex-favicon.ico`: SVG and 16/32/48px browser icons.
- `antiflex-favicon-{16,32,48}.png`: individual raster exports.
- `antiflex-apple-touch.png`: opaque 180px home-screen icon.
- `antiflex-og.png`: 1200 × 630 social sharing card.

Run `pnpm brand:build` to regenerate from `scripts/build-brand-assets.mjs`. The script uses local Fontsource files, Next ImageResponse and Sharp; no image-generation service or added runtime dependency. Delivery copies go to the Next.js icon conventions/public OG path and Storybook public brand directory. Metadata and Storybook manager branding use the new identity.
