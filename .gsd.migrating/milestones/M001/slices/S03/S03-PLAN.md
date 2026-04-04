# S03: Tracking Completo (Meta Pixel + GA4 Events + Thank You Page + FAQ Schema)

**Goal:** Instalar tracking completo (Meta Pixel + GA4 expandido + Google Ads Enhanced Conversions), criar Thank You Page, e adicionar FAQ Schema markup
**Demo:** After this: Meta Pixel Helper mostra eventos, GA4 Debug View mostra micro-conversões, /obrigado dispara conversões

## Tasks
- [ ] **T01: Instalar Meta Pixel + Criar hook useTracking.ts** — 1) Adicionar Meta Pixel SDK no layout.tsx (com ID configurável via env), 2) Criar hook useTracking.ts centralizado para disparar eventos GA4 + Meta + Google Ads de forma unificada, 3) Configurar eventos: PageView, ViewContent (scroll 50%), Lead (form submit), Contact (WhatsApp click), Schedule (thank you page).
  - Estimate: 20min
  - Files: src/app/layout.tsx, src/hooks/useTracking.ts, src/lib/tracking.ts
  - Verify: npx next build && echo 'Tracking installed'
- [ ] **T02: Criar Thank You Page /obrigado** — Criar página /obrigado com: 1) Confirmação visual do agendamento, 2) Próximos passos para o paciente, 3) Disparo de conversões Google Ads + Meta Pixel (gtag conversion + fbq Schedule), 4) Redirect automático se acessar direto sem submit. Visual premium consistente com LP.
  - Estimate: 15min
  - Files: src/app/obrigado/page.tsx
  - Verify: npx next build && echo 'Thank You page created'
- [ ] **T03: Integrar Tracking em todos os componentes + FAQ Schema** — 1) Adicionar useTracking em: Hero (cta_click), Protocols (protocol_interest), FAQ (faq_opened), LeadForm (form_start/submit), ExitIntent (shown/converted), WhatsApp (whatsapp_click), StickyCTA (sticky_cta_click). 2) Adicionar FAQ Schema JSON-LD no layout.tsx para rich snippets. 3) Atualizar API /api/lead para redirecionar para /obrigado após submit.
  - Estimate: 25min
  - Files: src/components/Hero.tsx, src/components/Protocols.tsx, src/components/FAQ.tsx, src/components/LeadForm.tsx, src/components/ExitIntent.tsx, src/components/WhatsAppButton.tsx, src/components/StickyCTA.tsx, src/app/layout.tsx, src/app/api/lead/route.ts
  - Verify: npx next build && echo 'Tracking integrated + FAQ Schema added'
