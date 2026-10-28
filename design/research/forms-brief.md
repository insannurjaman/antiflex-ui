# Chamfer /ui — Form foundation

The user approved continuing the researched roadmap, beginning with ten form families. This is a local extension of the established Chamfer UI world. The standalone collection/Formlane work is cancelled and its comps do not apply.

## Scope

Input, Label, Field (including FieldSet/FieldLegend), Textarea, Native Select, Checkbox, Radio Group, Switch, Button Group, and Input Group (including InputGroupAddon). Preserve TextField's public props and native ref. Shared source, docs, Storybook, installer, token names, and native Figma components remain aligned. Demo data stays synthetic; no backend, live payment, publication, or deployment is added.

## Direction contract

THESIS: Composable native form controls extend the shared SaaS foundation.
OWN-WORLD: Existing neutral gray light/dark surfaces, mint actions, thin seams, near-square controls, DM Sans interface text, and tokenized sizing.
STORY: Read the API, try a control, compose a form, validate, save sample preferences, and reset.
FIRST VIEWPORT: Existing docs navigation and reading column; a clear page title and short lead precede the working workspace-preferences form. Desktop name/email fields share a row; mobile stacks them. Help, errors, and visible focus stay adjacent to controls.
FORM: Local component/docs extension; inherit the existing composition and identity. No new-world roll or generated comp applies.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md

## Implementation evidence

- Shared inventory: packages/ui/src/catalog.json (18 component families).
- Shared form helper: packages/ui/src/form-utils.ts. Legacy utils.ts remains compatible, and the source installer resolves the new helper separately.
- Native controls and normal form submission/reset; controlled values remain owned by consumers.
- New docs routes: /docs/components/{input,label,field,textarea,native-select,checkbox,radio-group,switch,button-group,input-group} and /docs/forms.
- Visual checks: design/previews/forms contains desktop/mobile/tablet in light/dark and a mobile controls viewport. Screenshot names refer to real viewport dimensions, verified through the rendered DOM. A stale development module warning was cleared by restarting the local dev server; older captured console entries remain in the browser log history.
- Native Figma: Chamfer / Forms page 47:16; 119 variants across the ten new families, 14 component tokens, and light/dark instance review frames. Exact IDs are recorded in assets/figma/forms-state.json.

## Verification limits

Browser, installer-consumer, and Figma validation results are recorded separately after final checks. This milestone does not claim completeness against the entire shadcn catalog. The 2026-10-17 comparison remains a historical pre-expansion snapshot.
