# S04: Google Ads Scripts — 6 Scripts de Automação

**Goal:** Criar 6 Google Ads Scripts prontos para deploy no editor do Google Ads, cada um com documentação de uso, configuração parametrizável e instruções de instalação
**Demo:** After this: 6 arquivos .js com scripts documentados, testáveis no editor Google Ads

## Tasks
- [ ] **T01: Scripts: Anomaly Detector + Negative Keywords Manager** — 1) Anomaly Detector: detecta quedas >30% em CTR, conversions, ou aumento >50% em CPC vs média 7 dias. Envia email de alerta. 2) Negative Keywords Manager: analisa search terms dos últimos 30 dias, identifica termos com >R$20 gasto e 0 conversões, adiciona como negative keywords. Log em Sheets. Ambos com configurações parametrizáveis no topo.
  - Estimate: 20min
  - Files: google-ads-scripts/01-anomaly-detector.js, google-ads-scripts/02-negative-keywords.js
  - Verify: node -c google-ads-scripts/01-anomaly-detector.js && node -c google-ads-scripts/02-negative-keywords.js && echo 'Syntax OK'
- [ ] **T02: Scripts: Bid Adjuster + Budget Pacer** — 1) Bid Adjuster: ajusta bids baseado em CPA target. Keywords com CPA < target recebem +15%, keywords com CPA > 2x target recebem -20%. Thresholds configuráveis. 2) Budget Pacer: calcula gasto ideal diário baseado em meta mensal e dias restantes, ajusta budget automaticamente, alerta se pace > 110% ou < 80%. Log em Sheets.
  - Estimate: 20min
  - Files: google-ads-scripts/03-bid-adjuster.js, google-ads-scripts/04-budget-pacer.js
  - Verify: node -c google-ads-scripts/03-bid-adjuster.js && node -c google-ads-scripts/04-budget-pacer.js && echo 'Syntax OK'
- [ ] **T03: Scripts: Link Checker + Performance Report + README** — 1) Link Checker: verifica se URLs de destino retornam 200, pausa anúncios com URLs quebradas, envia alerta. 2) Performance Report: exporta métricas diárias (Impressions, Clicks, CTR, CPC, Conversions, CPA, Cost) para Google Sheets, formata como dashboard. 3) README.md: instruções de instalação passo-a-passo, frequência recomendada, screenshots do editor.
  - Estimate: 25min
  - Files: google-ads-scripts/05-link-checker.js, google-ads-scripts/06-performance-report.js, google-ads-scripts/README.md
  - Verify: node -c google-ads-scripts/05-link-checker.js && node -c google-ads-scripts/06-performance-report.js && echo 'Syntax OK'
