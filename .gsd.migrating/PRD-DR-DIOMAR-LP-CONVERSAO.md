# PRD — Landing Page de Alta Conversão + Automação Google Ads
## Dr. Diomar Cangussu | drdiomarcangussu.com.br

---

## 1. DIAGNÓSTICO DO SITE ATUAL

### 🔴 Problemas Críticos de Conversão Identificados

| # | Problema | Impacto | Severidade |
|---|---------|---------|-----------|
| 1 | **Sem Meta Pixel** — Não há Facebook/Instagram Pixel instalado | Impossível retargetar visitantes no Meta Ads, zero dados de conversão | 🔴 Crítico |
| 2 | **Sem formulário de captura de leads** — Só WhatsApp | Perde 70-80% dos leads que não estão prontos para ligar agora | 🔴 Crítico |
| 3 | **Sem página de obrigado/conversão** — Impossível trackear conversões reais | Google Ads e Meta não sabem quem converteu de verdade | 🔴 Crítico |
| 4 | **Sem seção de "Problema/Dor"** — Vai direto para solução | Visitante não se identifica, não cria urgência emocional | 🔴 Crítico |
| 5 | **CTA genérico** — "Agendar Agora" sem proposta de valor | Não diferencia de qualquer outro médico, sem gatilho de ação | 🟡 Alto |
| 6 | **Apenas 3 depoimentos genéricos** — Sem fotos, sem antes/depois | Prova social fraca, não gera confiança suficiente | 🟡 Alto |
| 7 | **Sem urgência/escassez** — Nenhum elemento de limitação | Visitante pensa "depois eu volto" e nunca volta | 🟡 Alto |
| 8 | **Sem reversão de risco** — Nenhuma garantia ou segurança | Barreira de compra alta para consulta particular | 🟡 Alto |
| 9 | **FAQ não trata objeções reais** — Perguntas básicas | Não quebra objeções de preço, medo, confiança | 🟡 Alto |
| 10 | **Ordem das seções não é funil** — Locations antes de Protocols | Não segue a jornada mental do paciente | 🟡 Alto |
| 11 | **Vídeo no Hero pesado** — hero-bg.mp4 carregando autoplay | Aumenta LCP, gasta dados mobile, sem valor de conversão | 🟡 Alto |
| 12 | **Sem Google Ads Enhanced Conversions** — Tracking básico | Algoritmo do Google não otimiza para conversões reais | 🟡 Alto |
| 13 | **Sem exit intent popup** — Visitante sai sem ser capturado | Perde tráfego pago caro sem nenhum fallback | 🟡 Médio |
| 14 | **Sem FAQ Schema markup** — Perde rich snippets no Google | Menos visibilidade orgânica, CPC mais alto | 🟡 Médio |
| 15 | **Sem A/B testing** — Impossível otimizar continuamente | Decisões baseadas em achismo, não dados | 🟡 Médio |
| 16 | **Sem landing pages por campanha** — Mesmo destino p/ tudo | Ad relevance baixa, Quality Score cai, CPC sobe | 🟡 Médio |
| 17 | **Sem Google Ads Scripts** — Gestão 100% manual | Oportunidades de otimização perdidas diariamente | 🟡 Médio |

### 📊 Análise Técnica do Código Atual

**Stack:** Next.js 16.1.3 + React 19 + Tailwind CSS 4 + Framer Motion  
**Deploy:** Netlify  
**Analytics:** GA4 (G-CN78RTJQKZ) + Google Ads (AW-17885917270)  
**Tracking:** Apenas `gtag("event", "ads_conversion_Reservar_hor_rio_1")` em 3 lugares  
**Conversão atual:** Apenas click em WhatsApp → nenhuma thank you page  
**Schema:** Apenas Physician schema, sem FAQ schema  

---

## 2. ESTRATÉGIA DE CONVERSÃO

### Funil de Conversão Proposto

```
[Tráfego Pago] ──→ [LP Otimizada] ──→ [Lead Capture / WhatsApp] ──→ [Thank You Page]
     ↓                    ↓                      ↓                         ↓
  Meta Ads          Retargeting           Conversion Event          Enhanced Conv.
  Google Ads        Exit Intent           Lead + Phone Form         Relatório Sheets
                    Scroll Tracking       WhatsApp API msg          
```

### Nova Ordem das Seções (Funil Psicológico)

```
1. HERO           → Hook emocional + CTA principal + social proof numbers
2. PROBLEMA       → [NOVA] Agitação da dor — "Você já tentou de tudo?"
3. SOLUÇÃO        → [NOVA] Como o Dr. Diomar resolve — método único
4. PROTOCOLOS     → Detalhamento dos protocolos com resultados
5. RESULTADOS     → [NOVA] Antes/Depois + números de transformação
6. AUTORIDADE     → Sobre o Dr. Diomar (renomeado de "Specialist")
7. DEPOIMENTOS    → Expandido com fotos e mais depoimentos
8. OFERTA         → [NOVA] CTA final com urgência + reversão de risco
9. FAQ            → Reestruturado para quebrar objeções
10. FOOTER        → Compacto com CTAs finais
```

---

## 3. COMPONENTES NOVOS A CRIAR

### 3.1 Seção "Problema" (ProblemSection.tsx)
- Headline: "Você já tentou de tudo e nada funciona?"
- 3-4 bullets de dores comuns (cansaço, sobrepeso, hormônios, disposição)
- Gera identificação emocional antes de mostrar a solução
- Gatilhos: "Se você se identifica com pelo menos 1..."

### 3.2 Seção "Método/Solução" (MethodSection.tsx)
- "O Método do Dr. Diomar é Diferente"
- 3 etapas visuais: Avaliação → Protocolo → Acompanhamento
- Diferenciação: "Não é receita de bolo, é medicina de precisão"

### 3.3 Seção "Resultados" (ResultsSection.tsx)
- Números de transformação (+ de 2000 vidas, X kg perdidos em média)
- Espaço para fotos de antes/depois (placeholder até ter fotos reais)
- Contador animado de resultados

### 3.4 Seção "Oferta Final" (FinalCTA.tsx)
- "Vagas Limitadas para Este Mês"
- Reversão de risco: "Se na primeira consulta você não sentir que estamos no caminho certo, devolvemos 100% do valor"
- CTA duplo: Formulário rápido (Nome + WhatsApp) + Botão WhatsApp
- Urgência: Contador de vagas ou prazo

### 3.5 Lead Capture Form (LeadForm.tsx)
- Formulário flutuante lateral ou inline
- Campos: Nome, WhatsApp, Interesse (select: Emagrecimento/Hormonal/Longevidade)
- Validação em tempo real
- Envia dados via API route → Google Sheets + disparar evento de conversão

### 3.6 Exit Intent Popup (ExitIntent.tsx)
- Detecta intenção de saída (mouse saindo do viewport no desktop)
- Oferta: "Espere! Baixe nosso guia gratuito de emagrecimento"
- Captura: Nome + WhatsApp
- Alternativa: Desconto na primeira consulta

### 3.7 Thank You Page (/obrigado/page.tsx)
- Confirmação do agendamento
- Dispara conversion events (Google Ads + Meta Pixel)
- Instruções de próximos passos
- Pixel de conversão fica AQUI (não no clique do botão)

### 3.8 Sticky CTA Bar (StickyCTA.tsx)
- Barra fixa no bottom do mobile
- "Agendar Avaliação Gratuita" + ícone WhatsApp
- Aparece após scroll de 30%

---

## 4. TRACKING & PIXELS

### 4.1 Meta Pixel (Facebook/Instagram)
```javascript
// Eventos a implementar:
fbq('track', 'PageView');           // Toda página
fbq('track', 'ViewContent');        // Scroll 50%
fbq('track', 'Lead');               // Formulário enviado
fbq('track', 'Contact');            // Click WhatsApp
fbq('track', 'Schedule');           // Thank You Page
fbq('track', 'CompleteRegistration'); // Exit intent form
```

### 4.2 Google Ads Enhanced Conversions
```javascript
// Converter o tracking atual de click-based para page-based
// Thank You Page dispara conversão real
// Enhanced Conversions com dados do formulário (hashed)
gtag('event', 'conversion', {
  'send_to': 'AW-17885917270/XXXXX',
  'value': 350.0,  // Valor médio da consulta
  'currency': 'BRL'
});
```

### 4.3 GA4 Events Expandidos
```javascript
// Micro-conversions para otimizar campanhas
gtag('event', 'scroll_50');
gtag('event', 'cta_click', { cta_location: 'hero' });
gtag('event', 'protocol_interest', { protocol: 'emagrecimento' });
gtag('event', 'faq_opened', { question: '...' });
gtag('event', 'form_start');
gtag('event', 'form_submit');
gtag('event', 'whatsapp_click', { source: 'hero' });
gtag('event', 'exit_intent_shown');
gtag('event', 'exit_intent_converted');
```

---

## 5. GOOGLE ADS SCRIPTS — AUTOMAÇÃO

### 5.1 Script: Anomaly Detector (Alerta de Anomalias)
- Detecta quedas bruscas em CTR, conversões ou CPC
- Envia alerta por email ao gestor
- Roda: diariamente às 8h

### 5.2 Script: Negative Keywords Manager
- Analisa search terms report automaticamente
- Identifica termos irrelevantes com alto gasto e zero conversão
- Adiciona como negative keywords automaticamente
- Roda: diariamente

### 5.3 Script: Bid Adjuster por Performance
- Ajusta bids baseado em CPA target
- Aumenta bid em keywords com CPA < target
- Diminui bid em keywords com CPA > 2x target
- Roda: diariamente

### 5.4 Script: Budget Pacer
- Monitora gasto diário vs. meta mensal
- Ajusta daily budget para não estourar no início do mês
- Alerta quando gasto acumula rápido demais
- Roda: a cada 6 horas

### 5.5 Script: Landing Page Link Checker
- Verifica se as URLs de destino estão retornando 200
- Pausa anúncios com landing pages quebradas
- Envia alerta imediato
- Roda: a cada 6 horas

### 5.6 Script: Performance Report → Google Sheets
- Exporta métricas diárias para uma planilha
- Gera dashboard automático com gráficos
- Métricas: Impressions, Clicks, CTR, CPC, Conversions, CPA, ROAS
- Roda: diariamente às 7h

---

## 6. META ADS — ESTRUTURA SUGERIDA

### Campanhas Sugeridas
1. **Conversão — Emagrecimento** (topo)
   - Público: Mulheres 25-55, interesse em emagrecimento, Norte de MG
   - LP destino: drdiomarcangussu.com.br (com UTM)
   
2. **Conversão — Implantes Hormonais** (topo)
   - Público: Homens 30-55, interesse em academia/saúde masculina
   - LP destino: drdiomarcangussu.com.br (com UTM)

3. **Retargeting — Visitaram mas não converteram**
   - Público: Custom Audience do Pixel (visitou LP, não converteu)
   - Criativos: Depoimentos + urgência

4. **Lookalike — Baseado em conversões**
   - Público: Lookalike 1-3% dos que converteram
   - Criativos: Resultado + CTA direto

---

## 7. SEO TÉCNICO — MELHORIAS

- [ ] Adicionar FAQ Schema (JSON-LD) para rich snippets
- [ ] Melhorar meta descriptions por protocolo  
- [ ] Adicionar páginas de protocolo individual (/emagrecimento, /implantes)
- [ ] Otimizar imagens (WebP, lazy loading correto)
- [ ] Substituir vídeo autoplay por imagem otimizada no mobile
- [ ] Adicionar sitemap dinâmico para novas páginas
- [ ] Melhorar Core Web Vitals (LCP do vídeo)

---

## 8. MÉTRICAS DE SUCESSO

| Métrica | Atual (estimado) | Meta 30 dias | Meta 90 dias |
|---------|------------------|-------------|-------------|
| Taxa de Conversão LP | ~1-2% | 5-8% | 10-15% |
| Leads/mês via formulário | 0 | 30+ | 80+ |
| Leads/mês via WhatsApp | ~10-20 | 40+ | 60+ |
| CPA Google Ads | Desconhecido | < R$80 | < R$50 |
| Quality Score médio | Desconhecido | > 7 | > 8 |
| Bounce Rate | ~70%+ | < 45% | < 35% |
| Tempo na página | ~30s | > 2min | > 3min |

---

## 9. STACK TÉCNICA

- **Framework:** Next.js 16 (App Router) — já existente
- **Styling:** Tailwind CSS 4 — já existente
- **Animations:** Framer Motion — já existente
- **Forms:** React Hook Form + Zod validation (novo)
- **API:** Next.js API Routes para form handling (novo)
- **Data:** Google Sheets API para armazenar leads (novo)
- **Tracking:** Meta Pixel SDK + GA4 + Google Ads tags (expandir)
- **Google Ads Scripts:** JavaScript puro no editor do Google Ads
- **Deploy:** Netlify — já existente

---

## 10. RISCOS E MITIGAÇÕES

| Risco | Mitigação |
|-------|----------|
| CFM proíbe antes/depois | Usar "Histórias de Transformação" com texto, não fotos |
| Meta Pixel depende de ID | Coletar Pixel ID do gestor de ads |
| Google Ads Scripts precisa de acesso | Documentar scripts prontos para colar no painel |
| Formulário pode desengajar | A/B test: versão com form vs. versão só WhatsApp |
| Excesso de popups | Frequency cap: 1 popup por sessão, delay de 30s |
