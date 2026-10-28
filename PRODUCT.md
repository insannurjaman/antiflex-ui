# antiflex/ui

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

User-approved: React, TypeScript, Tailwind CSS, Next.js documentation, Storybook, pnpm workspace.

## Users

SaaS designers and React developers creating compact operational interfaces.

## Product Purpose

An original design system with matching Figma and code, public documentation, and a reusable component foundation.

## Positioning

less flex. More function. A design system that favors familiar patterns, thoughtful defaults, and intuitive experiences over unnecessary complexity. Free core; future antiflex Pro adds separately licensed Figma assets, blocks, and templates.

## Capabilities and Constraints

Expansion direction (2026-10-17): the user wants the component catalog to become as complete as practical, using the current shadcn/ui catalog as a breadth benchmark. The original eight-component foundation has expanded locally to 50 families: ten form families, fifteen feedback/navigation/disclosure families, two native modal families, two anchored floating families, two edge-panel families, two action-menu families, Toast, three workspace-navigation families, and five search/date families join the original eight. The catalog remains open for further expansion. Follow docs/COMPONENT-ROADMAP.md and the source-based audit in design/research/shadcn-component-audit.md. Planned components must not be advertised as implemented.

Foundation milestone: eight components, tokens, documentation, Storybook, and a responsive dashboard demonstration. Own styling and behavior. No shadcn, Radix, Base UI, or third-party behavior libraries. The local source installer copies editable components into independent React apps. The public alpha adds hosted documentation and Storybook plus prepared GitHub/npm release workflows. Commerce is a later milestone.

Showcase expansion (2026-10-28): the confirmed Orbit SaaS workspace is implemented as a searchable `/examples` gallery and thirteen connected `/demo` screens: overview, analytics, orders, customers, projects, activity, team, settings, profile, billing, checkout, sign-in, and onboarding. Sidebar and top navigation, responsive light/dark layouts, shared activity, editable sample records and browser-local saved state demonstrate the incumbent antiflex Neutral system. `/dashboard` remains the original foundation example. Authentication and checkout are illustrative local flows: no real account, recovery email, payment, subscription, or backend service is created. Real commerce integration remains a later milestone. This extension adds no global tokens, component API, npm release, or Figma screen library; see docs/EXAMPLES.md for working flows and boundaries.

## Brand Commitments

antiflex/ui. Technical and compact. Neutral default theme inspired by shadcn/ui: white and gray surfaces, charcoal/light actions, nearly square controls, thin ruled borders, DM Sans interfaces, Space Mono labels, and Anybody display typography. Use the approved antiflex/ui name and geometric A mark in the established cut-corner frame. Horizontal app navigation follows the reference.

## Evidence on Hand

Dashboard data is synthetic and must be labeled. No customers, testimonials, revenue, or production benchmarks have been supplied.

## Product Principles

Current project focus (2026-10-17): continue building antiflex/ui. The proposed standalone collection website (Formlane) is cancelled for now; its concepts are historical exploration and are not the implementation direction.

- Keep Figma and code aligned through named tokens.
- Native semantics and keyboard access first.
- Small complete components before breadth.
- Working examples, honest product claims.

Foundation expansion (2026-10-19): provide Tailwind CSS 4.3.3 reference breadth through 26 color ramps × 11 steps and a complete xs–9xl/100–900 typography scale, while preserving antiflex's existing semantic theme and legacy type values. Reference primitives live under palette/typography namespaces, use af-prefixed Tailwind utilities, and retain MIT provenance. Figma and browser share canonical names; Figma uses clipped sRGB color previews and native typography unit conversions. This adds foundation assets, not new component families.

Action-menu expansion (2026-10-20): Dropdown Menu and Context Menu share original native top-layer behavior, nested menus, discoverable disabled actions, checkbox/radio choices, buffered typeahead, RTL keys, and explicit Tab exit. Context actions also have a visible touch alternative. No hover-open submenu, custom long-press, or shortcut-binding service is promised.

Workspace tools expansion (2026-10-23): complete the eight agreed families — Hover Card, Menubar, Navigation Menu, Select, Combobox, Command, Calendar and Date Picker. The local catalog has 50 families and 304 stories. Date tools support a single Gregorian date; range selection and alternative calendars are future work. Command runs consumer-owned local actions with no global shortcut service.

## Identity and namespace — 2026-10-28

The product is **antiflex/ui**, with the exact tagline **less flex. More function.** Public docs: https://antiflex-ui.vercel.app. Storybook: https://antiflex-storybook.vercel.app. The repository is insannurjaman/antiflex-ui.

The published source installer is `antiflex-ui@0.1.0-alpha.2`, with the `antiflex` executable and all 50 component families. Its registry bytes match the tested package. Configuration uses `antiflex.json`; default source locations are `components/antiflex` and `styles/antiflex`, beneath `src/` when that directory exists. `@antiflex/ui` and `@antiflex/tokens` are private workspace packages, not the public installation path.

Current CSS classes, custom properties, component data attributes, and optional reference Tailwind utilities use the `af-` namespace. Semantic utilities such as `bg-surface` remain unprefixed, and `data-theme` still selects a theme. Earlier technical-name retention is superseded. The only runtime legacy-name exception is the private one-time browser-storage reader, which preserves existing theme and demo state; historical evidence retains its original facts.

The approved geometric A mark, neutral palette, typography, dimensions, and component behavior remain unchanged. Figma collections, style labels, and WEB syntax are renamed in place, preserving IDs, values, and bindings. Final public deployment and source synchronization are release steps recorded separately from the local implementation and package evidence.
