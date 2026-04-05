# 📱 Configuração da Conversão WhatsApp Click

O site já rastreia `whatsapp_click` via gtag (tracking.ts). Falta configurar no Google Ads para o algoritmo otimizar.

---

## Opção A: Via Google Ads (recomendada)

1. Google Ads → **Ferramentas** (🔧) → **Medição** → **Conversões**
2. Clique **+ Nova ação de conversão**
3. Selecione **Site**
4. Digite a URL: `drdiomarcangussu.com.br` → **Verificar**
5. Escolha **Adicionar uma ação de conversão manualmente**
6. Preencha:

| Campo | Valor |
|-------|-------|
| Nome | WhatsApp Click |
| Meta e otimização | Enviar formulário de lead |
| Valor | Usar o mesmo valor: R$ 25,00 |
| Contagem | Uma |
| Janela de conversão (clique) | 30 dias |
| Janela de conversão (view) | 1 dia |
| Modelo de atribuição | Data-driven (ou Último clique) |
| Incluir em "Conversões" | ✅ Sim |

7. Clique **Criar e continuar**
8. Escolha **Usar o Google Tag Manager** ou **Instalar a tag manualmente**
9. Copie o **Conversion ID** e **Conversion Label**

---

## Opção B: Já temos o gtag no código

No `tracking.ts`, o evento `whatsapp_click` já dispara:
```javascript
gtagConversion('ads_conversion_Reservar_hor_rio_1');
```

Se a conversion label `ads_conversion_Reservar_hor_rio_1` já está vinculada no Google Ads como "Reservar horário", as conversões WhatsApp já estão sendo rastreadas (as 21 conversões provavelmente são dessas).

**Verificar:** No Google Ads, checar se a ação "Reservar horário" tem a label `ads_conversion_Reservar_hor_rio_1`. Se sim, está funcionando — apenas renomear para clareza.

---

## Verificação pós-configuração

1. Abrir `drdiomarcangussu.com.br` no Chrome
2. Abrir DevTools → Console
3. Clicar em qualquer botão WhatsApp
4. Verificar que aparece: `gtag('event', 'conversion', {send_to: 'AW-17885917270/...'})` no dataLayer
5. No Google Ads, após 24-48h, verificar que conversões estão chegando

---

## Conversões para DESATIVAR das metas

Ir em **Ferramentas → Conversões** e remover destas das metas da conta:

- [ ] Smart campaign ad clicks to call → **Remover das metas** (ou excluir)
- [ ] Smart campaign map clicks to call → **Remover das metas**
- [ ] Clicks to call → **Remover das metas**
- [ ] Smart campaign map directions → **Remover das metas**
- [ ] Local actions - Directions → **Remover das metas**
- [ ] Calls from Smart Campaign Ads → **Remover das metas**

**Manter incluída:** "Reservar horário" (GA4) — esta é que está capturando as 21 conversões.
