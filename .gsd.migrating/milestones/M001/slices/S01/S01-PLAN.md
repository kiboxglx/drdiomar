# S01: Novas Seções de Conversão (Problema, Método, Resultados, Oferta Final)

**Goal:** Criar as 4 seções novas (ProblemSection, MethodSection, ResultsSection, FinalCTA) e reestruturar page.tsx com funil psicológico completo
**Demo:** After this: LP renderiza com Hero → Problema → Método → Protocolos → Resultados → Autoridade → Depoimentos → Oferta → FAQ na ordem correta

## Tasks
- [ ] **T01: Criar ProblemSection.tsx — Seção de Agitação de Dor** — Criar componente com headline 'Você já tentou de tudo e nada funciona?', 4 bullets de dores (cansaço, sobrepeso, hormônios desregulados, baixa disposição), visual dark com ícones e animações Framer Motion. Gatilho: 'Se você se identifica com pelo menos 1 desses sinais...'
  - Estimate: 15min
  - Files: src/components/ProblemSection.tsx
  - Verify: npx next build && echo 'ProblemSection created'
- [ ] **T02: Criar MethodSection.tsx — O Método Diferenciado do Dr. Diomar** — Criar componente com 3 etapas visuais: 1) Avaliação Completa 2) Protocolo Personalizado 3) Acompanhamento Contínuo. Visual de timeline/steps com ícones, highlight de 'Medicina de Precisão, não receita de bolo'. Framer Motion animations on scroll.
  - Estimate: 15min
  - Files: src/components/MethodSection.tsx
  - Verify: npx next build && echo 'MethodSection created'
- [ ] **T03: Criar ResultsSection.tsx — Números e Transformações** — Criar componente com contadores animados (+2000 vidas, X% satisfação, 2 unidades), espaço para cards de transformação com texto (compliance CFM), visual impactante com gradients e motion.
  - Estimate: 15min
  - Files: src/components/ResultsSection.tsx
  - Verify: npx next build && echo 'ResultsSection created'
- [ ] **T04: Criar FinalCTA.tsx — Oferta Final com Urgência** — Criar componente de CTA final com: headline de urgência ('Vagas Limitadas'), reversão de risco, CTA duplo (formulário rápido + WhatsApp), badge de confiança CRM. Visual premium com gradient background.
  - Estimate: 15min
  - Files: src/components/FinalCTA.tsx
  - Verify: npx next build && echo 'FinalCTA created'
- [ ] **T05: Reestruturar page.tsx + melhorar Hero e Depoimentos** — 1) Reordenar page.tsx: Hero → ProblemSection → MethodSection → Protocols → ResultsSection → Specialist → Testimonials → FinalCTA → FAQ → Footer. 2) Melhorar Hero com headline mais emocional e trust badges. 3) Expandir Testimonials com mais depoimentos e formato melhorado. 4) Melhorar FAQ com perguntas que quebram objeções reais.
  - Estimate: 20min
  - Files: src/app/page.tsx, src/components/Hero.tsx, src/components/Testimonials.tsx, src/components/FAQ.tsx
  - Verify: npx next build && echo 'Page restructured'
