---
estimated_steps: 1
estimated_files: 9
skills_used: []
---

# T03: Integrar Tracking em todos os componentes + FAQ Schema

1) Adicionar useTracking em: Hero (cta_click), Protocols (protocol_interest), FAQ (faq_opened), LeadForm (form_start/submit), ExitIntent (shown/converted), WhatsApp (whatsapp_click), StickyCTA (sticky_cta_click). 2) Adicionar FAQ Schema JSON-LD no layout.tsx para rich snippets. 3) Atualizar API /api/lead para redirecionar para /obrigado após submit.

## Inputs

- `src/hooks/useTracking.ts`
- `Todos os componentes existentes`

## Expected Output

- `Todos os componentes atualizados com tracking`
- `FAQ Schema JSON-LD no layout.tsx`

## Verification

npx next build && echo 'Tracking integrated + FAQ Schema added'
