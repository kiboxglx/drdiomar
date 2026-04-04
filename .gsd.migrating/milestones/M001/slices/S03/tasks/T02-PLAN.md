---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T02: Criar Thank You Page /obrigado

Criar página /obrigado com: 1) Confirmação visual do agendamento, 2) Próximos passos para o paciente, 3) Disparo de conversões Google Ads + Meta Pixel (gtag conversion + fbq Schedule), 4) Redirect automático se acessar direto sem submit. Visual premium consistente com LP.

## Inputs

- `src/hooks/useTracking.ts`
- `src/app/layout.tsx`

## Expected Output

- `src/app/obrigado/page.tsx`

## Verification

npx next build && echo 'Thank You page created'
