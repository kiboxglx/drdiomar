---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T01: Instalar Meta Pixel + Criar hook useTracking.ts

1) Adicionar Meta Pixel SDK no layout.tsx (com ID configurável via env), 2) Criar hook useTracking.ts centralizado para disparar eventos GA4 + Meta + Google Ads de forma unificada, 3) Configurar eventos: PageView, ViewContent (scroll 50%), Lead (form submit), Contact (WhatsApp click), Schedule (thank you page).

## Inputs

- `src/app/layout.tsx (atual)`

## Expected Output

- `src/hooks/useTracking.ts`
- `src/lib/tracking.ts`
- `src/app/layout.tsx (atualizado)`

## Verification

npx next build && echo 'Tracking installed'
