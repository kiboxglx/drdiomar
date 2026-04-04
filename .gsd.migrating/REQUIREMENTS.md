# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R001 — LP deve carregar em menos de 3 segundos no mobile (LCP < 2.5s)
- Class: non-functional
- Status: active
- Description: LP deve carregar em menos de 3 segundos no mobile (LCP < 2.5s)
- Why it matters: Tráfego pago no mobile é maioria do público — cada segundo de delay perde ~7% de conversões
- Source: PRD-DR-DIOMAR Core Web Vitals
- Validation: Lighthouse mobile score > 80, LCP < 2.5s

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | non-functional | active | none | none | Lighthouse mobile score > 80, LCP < 2.5s |

## Coverage Summary

- Active requirements: 1
- Mapped to slices: 1
- Validated: 0
- Unmapped active requirements: 0
