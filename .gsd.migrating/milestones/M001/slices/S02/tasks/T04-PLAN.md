---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T04: Criar StickyCTA.tsx — Barra Fixa Mobile + Integrar tudo no page.tsx

1) Criar StickyCTA: barra fixa no bottom do mobile com 'Agendar Avaliação' + WhatsApp icon, aparece após 30% scroll, esconde quando form está visível. 2) Integrar ExitIntent e StickyCTA no page.tsx. 3) Atualizar WhatsAppButton para não conflitar com StickyCTA.

## Inputs

- `src/app/page.tsx`
- `src/components/WhatsAppButton.tsx`

## Expected Output

- `src/components/StickyCTA.tsx`
- `src/app/page.tsx (atualizado)`

## Verification

npx next build && echo 'StickyCTA + integration done'
