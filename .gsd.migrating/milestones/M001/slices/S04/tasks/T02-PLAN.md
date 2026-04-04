---
estimated_steps: 1
estimated_files: 2
skills_used: []
---

# T02: Scripts: Bid Adjuster + Budget Pacer

1) Bid Adjuster: ajusta bids baseado em CPA target. Keywords com CPA < target recebem +15%, keywords com CPA > 2x target recebem -20%. Thresholds configuráveis. 2) Budget Pacer: calcula gasto ideal diário baseado em meta mensal e dias restantes, ajusta budget automaticamente, alerta se pace > 110% ou < 80%. Log em Sheets.

## Inputs

- `Google Ads Scripts API docs`

## Expected Output

- `google-ads-scripts/03-bid-adjuster.js`
- `google-ads-scripts/04-budget-pacer.js`

## Verification

node -c google-ads-scripts/03-bid-adjuster.js && node -c google-ads-scripts/04-budget-pacer.js && echo 'Syntax OK'
