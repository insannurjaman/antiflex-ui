# Orbit SaaS showcase

The public showcase is a connected, interactive sample application built with antiflex/ui. It extends the existing Neutral visual system and original native components; it introduces no component behavior dependency.

## Explore

Start at `/examples` to search or filter thirteen screens, or open `/demo` directly. The site header and homepage link to the gallery. `/dashboard` remains the original standalone foundation example.

| Route              | Example and working flows                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/demo`            | Overview: shared customer count/activity, sample revenue, searchable/sortable/paginated orders, refresh and CSV export                        |
| `/demo/analytics`  | Revenue/order chart, sample date-period selection, acquisition channels, conversion funnel, CSV report                                        |
| `/demo/orders`     | Dedicated records view with status/query filters, sort, pagination and record export                                                          |
| `/demo/customers`  | Search/plan/status filters, name/revenue sort, pagination, add customer, duplicate validation, detail Sheet, status editing, CSV/JSON exports |
| `/demo/projects`   | Board/list views, search, new-project Dialog with Date Picker, detail Sheet, stage updates and task completion                                |
| `/demo/activity`   | Shared workspace history and category filtering                                                                                               |
| `/demo/team`       | Sample invitations, duplicate validation, role selection, protected removal; owner stays protected                                            |
| `/demo/settings`   | General settings, notification choices, density preference, week start/timezone, native validation, save/discard, JSON export                 |
| `/demo/profile`    | Saved profile preview, account/menu synchronization, editable fields, JSON export                                                             |
| `/demo/billing`    | Illustrative plans, monthly/yearly choice, usage, billing email, invoice preview/download                                                     |
| `/demo/checkout`   | Plan/cycle/seats, one-checkout demo discount, billing form, sample payment methods, consent, loading state, local receipt/download            |
| `/demo/sign-in`    | Sign-in, sign-up and password-recovery confirmation previews                                                                                  |
| `/demo/onboarding` | Three-step sample workspace configuration, optional sample invitations, review and launch                                                     |

Choose **Side navigation** or **Top navigation** from the demo toolbar. Top navigation uses `?layout=top`, which is retained by internal links and can be shared directly. Layout switching preserves the current route and form draft. Both layouts use the AppShell's native mobile disclosure, Escape handling and ordinary links. The page finder is a scoped Command Dialog with real destinations.

Use the antiflex header theme button for light/dark. Preferences are saved in the existing theme provider. The showcase uses the existing token source without changing its default values.

## Data and release boundaries

All people, companies, orders, analytics, invoices and prices are illustrative. Sample prices belong to the fictional Orbit product, not antiflex/ui. Checkout creates a local receipt and updates the sample billing state; it does not collect card details, process a payment, create a subscription, calculate real tax or connect to Lemon Squeezy. The authentication preview does not authenticate, create a real account or send recovery email. Password input stays in the mounted form and is never stored in the shared demo state.

The versioned `antiflex-orbit-demo-v1` browser storage entry contains only this demo's state. It is restored after hydration and validated before use. Unavailable storage leaves an in-memory demo with a visible explanation. **Reset demo** requires confirmation and restores only this sample dataset, preserving unrelated browser settings and the global theme.

Customer/project/team changes update shared activity. Profile edits update the owner record and account menu. Checkout updates the current sample billing plan and invoice history. Existing historic order amounts remain synthetic fixtures; their plan labels map to the connected demo's vocabulary.

No backend, customer account service, email delivery, payment integration, public npm release, or new Figma screen library is part of this showcase update.

## Local development and verification

Run `pnpm dev` (or `npm run dev` after the workspace dependencies are installed), then visit `/examples`. Source lives in `apps/docs/components/demo/` and `apps/docs/app/demo/`; the shared provider and shell persist across routes. The canonical page inventory is `components/demo/catalog.ts`.

```sh
pnpm build
pnpm typecheck
ANTIFLEX_DOCS_URL=http://127.0.0.1:3000 ANTIFLEX_STORYBOOK_URL=http://127.0.0.1:6106 pnpm exec playwright test tests/showcase.spec.ts --trace=off
```

Set `ANTIFLEX_DOCS_URL` to a fresh server for the build under test. Avoid rebuilding `.next` beneath a previously started production server and then treating its stale chunk responses as feature failures.

`node scripts/capture-showcase.mjs` produces actual theme-specific preview images and desktop/tablet/mobile evidence. `node scripts/capture-showcase-states.mjs` adds gallery and interaction-state captures. Set `ANTIFLEX_DOCS_URL` to the intended local server before either command. Previews are browser screenshots of authored code and synthetic data, with origin sidecars in `apps/docs/public/examples/`.

Browser storage is scoped to its hostname. The new antiflex-ui.vercel.app address starts separate demo state; previously saved samples remain on the old address. The legacy storage key is retained for compatibility.
