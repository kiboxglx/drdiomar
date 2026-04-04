---
estimated_steps: 1
estimated_files: 1
skills_used: []
---

# T03: Criar ExitIntent.tsx — Popup de Intenção de Saída

Criar popup que: 1) Detecta mouseleave no viewport (desktop), 2) Mostra após 15s de permanência mínima, 3) Frequency cap: 1x por sessão (sessionStorage), 4) Conteúdo: 'Espere! Não perca essa oportunidade' + mini formulário Nome/WhatsApp, 5) Overlay com backdrop blur, animação Framer Motion.

## Inputs

- `src/components/LeadForm.tsx (form reutilizável)`

## Expected Output

- `src/components/ExitIntent.tsx`

## Verification

npx next build && echo 'ExitIntent created'
