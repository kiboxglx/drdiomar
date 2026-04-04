---
estimated_steps: 1
estimated_files: 3
skills_used: []
---

# T03: Scripts: Link Checker + Performance Report + README

1) Link Checker: verifica se URLs de destino retornam 200, pausa anúncios com URLs quebradas, envia alerta. 2) Performance Report: exporta métricas diárias (Impressions, Clicks, CTR, CPC, Conversions, CPA, Cost) para Google Sheets, formata como dashboard. 3) README.md: instruções de instalação passo-a-passo, frequência recomendada, screenshots do editor.

## Inputs

- `Google Ads Scripts API docs`

## Expected Output

- `google-ads-scripts/05-link-checker.js`
- `google-ads-scripts/06-performance-report.js`
- `google-ads-scripts/README.md`

## Verification

node -c google-ads-scripts/05-link-checker.js && node -c google-ads-scripts/06-performance-report.js && echo 'Syntax OK'
