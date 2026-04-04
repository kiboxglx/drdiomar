---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T01: Scripts: Anomaly Detector + Negative Keywords Manager

1) Anomaly Detector: detecta quedas >30% em CTR, conversions, ou aumento >50% em CPC vs média 7 dias. Envia email de alerta. 2) Negative Keywords Manager: analisa search terms dos últimos 30 dias, identifica termos com >R$20 gasto e 0 conversões, adiciona como negative keywords. Log em Sheets. Ambos com configurações parametrizáveis no topo.

## Inputs

- `Google Ads Scripts API docs`

## Expected Output

- `google-ads-scripts/01-anomaly-detector.js`
- `google-ads-scripts/02-negative-keywords.js`

## Verification

node -c google-ads-scripts/01-anomaly-detector.js && node -c google-ads-scripts/02-negative-keywords.js && echo 'Syntax OK'
