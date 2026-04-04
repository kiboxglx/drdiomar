# M001: LP Alta Conversão + Automação Google Ads — Dr. Diomar

## Vision
Transformar o site drdiomarcangussu.com.br de uma página institucional com ~1-2% de conversão em uma Landing Page de alta conversão (meta 8-15%) com funil psicológico completo, tracking avançado (Meta + Google), formulário de captura de leads, e Google Ads Scripts automatizados para otimização contínua de campanhas.

## Slice Overview
| ID | Slice | Risk | Depends | Done | After this |
|----|-------|------|---------|------|------------|
| S01 | Novas Seções de Conversão (Problema, Método, Resultados, Oferta Final) | medium | — | ⬜ | LP renderiza com Hero → Problema → Método → Protocolos → Resultados → Autoridade → Depoimentos → Oferta → FAQ na ordem correta |
| S02 | Lead Capture System (Form + Sticky CTA + Exit Intent + API) | medium | S01 | ⬜ | Formulário captura lead, Exit Intent aparece na saída, Sticky CTA no mobile, dados chegam na API |
| S03 | Tracking Completo (Meta Pixel + GA4 Events + Thank You Page + FAQ Schema) | high | S02 | ⬜ | Meta Pixel Helper mostra eventos, GA4 Debug View mostra micro-conversões, /obrigado dispara conversões |
| S04 | Google Ads Scripts — 6 Scripts de Automação | medium | — | ⬜ | 6 arquivos .js com scripts documentados, testáveis no editor Google Ads |
