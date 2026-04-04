# S02: Lead Capture System (Form + Sticky CTA + Exit Intent + API)

**Goal:** Implementar sistema completo de captura de leads: formulário inline, Exit Intent Popup, Sticky CTA Bar mobile e API route para processar submissions
**Demo:** After this: Formulário captura lead, Exit Intent aparece na saída, Sticky CTA no mobile, dados chegam na API

## Tasks
- [ ] **T01: Criar LeadForm.tsx — Formulário de Captura de Leads** — Criar componente de formulário com: Nome (required), WhatsApp (required, máscara), Interesse (select: Emagrecimento/Implantes/Longevidade). Validação client-side, estados loading/success/error, animações de transição. Integrar dentro do FinalCTA e como componente reutilizável.
  - Estimate: 20min
  - Files: src/components/LeadForm.tsx, src/components/FinalCTA.tsx
  - Verify: npx next build && echo 'LeadForm created'
- [ ] **T02: Criar API Route /api/lead — Processar Leads** — Criar API route Next.js que: 1) Valida dados (nome, whatsapp, interesse), 2) Salva em arquivo JSON local (ou Google Sheets futuro), 3) Retorna success/error. Incluir rate limiting básico e sanitização.
  - Estimate: 15min
  - Files: src/app/api/lead/route.ts
  - Verify: npx next build && echo 'API route created'
- [ ] **T03: Criar ExitIntent.tsx — Popup de Intenção de Saída** — Criar popup que: 1) Detecta mouseleave no viewport (desktop), 2) Mostra após 15s de permanência mínima, 3) Frequency cap: 1x por sessão (sessionStorage), 4) Conteúdo: 'Espere! Não perca essa oportunidade' + mini formulário Nome/WhatsApp, 5) Overlay com backdrop blur, animação Framer Motion.
  - Estimate: 20min
  - Files: src/components/ExitIntent.tsx
  - Verify: npx next build && echo 'ExitIntent created'
- [ ] **T04: Criar StickyCTA.tsx — Barra Fixa Mobile + Integrar tudo no page.tsx** — 1) Criar StickyCTA: barra fixa no bottom do mobile com 'Agendar Avaliação' + WhatsApp icon, aparece após 30% scroll, esconde quando form está visível. 2) Integrar ExitIntent e StickyCTA no page.tsx. 3) Atualizar WhatsAppButton para não conflitar com StickyCTA.
  - Estimate: 15min
  - Files: src/components/StickyCTA.tsx, src/app/page.tsx, src/components/WhatsAppButton.tsx
  - Verify: npx next build && echo 'StickyCTA + integration done'
