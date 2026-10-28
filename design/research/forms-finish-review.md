# Form foundation — independent finish review

Reviewed on 2026-10-17 using the shipped Impeccable finish reviewer in a fresh context. This was a local extension; no generated comp or new identity applied. The reviewer inspected desktop, tablet, and mobile evidence plus the native form implementation. The mechanical detector returned no findings.

## Initial disposition: fix

The inherited typography, material, documentation shell, responsive form, native controls, reset, validation, and visible focus matched the contract. One material issue remained: an explicit Input id could disagree with Field’s generated label target, including inside InputGroup.

## Verdict pass

| Material finding              | Verdict  | Evidence                                                                                                                                                                                                                                                                         |
| ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Field explicit-ID association | Resolved | Field resolves native/Chamfer control IDs through transparent wrappers; label/help/error associations share that ID. Chromium and WebKit verify direct and nested label activation, focus, names, and descriptions. Recaptures: field-explicit-id.png and group-explicit-id.png. |

Remaining: clear.

**disposition: ship**

The root DESIGN.md and .impeccable/design.json were updated by the shipped documenter, preserving the established Chamfer world and recording only durable form rules.
