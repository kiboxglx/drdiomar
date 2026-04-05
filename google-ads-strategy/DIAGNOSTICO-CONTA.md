# 🔴 Diagnóstico Completo — Google Ads Dr. Diomar

**Conta:** 144-680-3197 | drdiomarcangussunutrologia@gmail.com
**Período analisado:** 08/mar – 04/abr/2026 (28 dias)
**Status:** ⛔ PAUSADA — Verificação do anunciante expirou

---

## Resumo Executivo

A conta está **queimando ~62% do orçamento na Rede de Display** (irrelevante para clínica médica local), com **apenas 1 keyword gerando tráfego** e **zero palavras-chave negativas**. Os termos de pesquisa mostram que o dinheiro está indo para buscas informacionais genéricas ("dieta simples para emagrecer", "secar pochete", "coco ajuda emagrecer") — pessoas que **nunca vão agendar consulta**.

**A URL do anúncio (`/emagrecer/contato`) não existe mais no site atualizado.** Está provavelmente redirecionando ou dando 404.

---

## 🔴 Problemas Críticos (11)

### 1. Rede de Display ativada — 62% do custo desperdiçado
| Rede | Cliques | % Cliques | Custo | % Custo | CPC |
|------|---------|-----------|-------|---------|-----|
| Display | 97 | 66,4% | R$ 295,75 | 62,4% | R$ 3,05 |
| Search | 36 | 24,7% | R$ 161,64 | 34,1% | R$ 4,49 |
| Parceiros | 13 | 8,9% | R$ 16,16 | 3,4% | R$ 1,25 |

**Display Network NÃO funciona para clínica médica local.** São banners em sites aleatórios — o público não está em momento de decisão.

**Impacto:** ~R$ 295/mês jogados fora = 62% do budget.

### 2. Apenas 1 keyword gerando tráfego
Das 13 keywords, **12 têm ZERO impressões**. 8 estão marcadas "Baixo volume de pesquisas". A única ativa é:
- `nutrologo o que faz` (ampla) → 2.064 impr, 49 cliques, 5 conv, CPA R$ 35,59

Esta keyword é **informacional** — a pessoa quer saber o que um nutrólogo faz, não agendar consulta. E por ser correspondência ampla, está acionando termos completamente irrelevantes.

### 3. Zero palavras-chave negativas
Nenhuma. O Google está mostrando o anúncio para:
- "dieta da selva pdf" ← alguém buscando PDF grátis
- "secar pochete" ← busca genérica de exercício
- "coco ajuda emagrecer" ← busca informacional
- "dieta para perder gordura e ganhar massa muscular" ← vai para academia, não clínica
- "nutricionista online" ← quer teleconsulta com nutricionista, não médico presencial
- "dieta para diminuir o colesterol alto" ← busca informacional

**Cada clique nesses termos custa R$ 1-18 sem chance de conversão.**

### 4. URL de destino quebrada/obsoleta
O anúncio aponta para `drdiomarcangussu.com.br/emagrecer/contato`. A LP atualizada tem:
- `/` (página principal com funil completo)
- `/contato` (página de contato)

A URL `/emagrecer/contato` provavelmente **não existe** ou está redirecionando.

### 5. Qualidade do anúncio = "Ruim"
O Google classifica o RSA como qualidade ruim. Títulos e descrições são genéricos, sem urgência, sem diferenciação, sem CTA forte.

### 6. Conversões mal configuradas
- 7 ações de conversão, **todas com "Não há conversões recentes"**
- "Reservar horário" (GA4) mostra 21 conversões MAS status é "não há recentes"
- Nenhuma conversão de chamada registrada (0 em todas)
- **whatsapp_click** (principal CTA do site atualizado) **NÃO está configurado como conversão no Google Ads**

### 7. Restrições de política
Anúncio limitado por **"Métodos anticoncepcionais, fertilidade e testes"** — provavelmente por mencionar hormônios/implantes. 2 títulos e 1 sitelink estão limitados.

### 8. Apenas 1 extensão de anúncio
- ✅ 1 sitelink (com texto confuso: "Contato / Emagrecimento e Perfomance / Consulta especializada")
- ❌ Sem callouts
- ❌ Sem snippets estruturados
- ❌ Sem extensão de chamada (telefone)
- ❌ Sem extensão de local
- ❌ Sem extensão de imagem

### 9. Sem programação de horário
Anúncios rodando 24/7 incluindo madrugada. Clínica atende seg-sex 8h-18h. Cliques na madrugada de domingo = dinheiro jogado fora.

### 10. Budget Pacer mal configurado
O script `04-budget-pacer.js` está com `MONTHLY_BUDGET_TARGET: 5000.00` mas o budget real é R$ 800/mês. O pacer está operando com referência errada.

### 11. Conta pausada por verificação
O prazo de verificação do anunciante expirou. **Nenhum anúncio está rodando.**

---

## 🟡 Problemas Moderados

| # | Problema | Impacto |
|---|----------|---------|
| 1 | Campanha Smart "Serviços Médicos Alternativos" pausada com R$30/dia configurado | Orçamento reservado sem uso; se ativada acidentalmente, estoura budget |
| 2 | Correspondência ampla em todas as keywords | Google interpreta livremente, gerando lixo |
| 3 | Sem ajuste de lance por dispositivo | 70-80% do público é mobile mas não há priorização |
| 4 | Falta de sitelinks separados por serviço | Oportunidade perdida de segmentar interesse |

---

## 📊 O que está funcionando (pouco)

- **CPA de R$ 22,55** é aceitável para clínica médica (se as conversões forem reais)
- **Taxa de conversão 14,38%** é alta — indica que quem chega no site com alguma intenção, converte
- **Segmentação geográfica** correta (50km de cada hub)
- **GA4 + Google Ads** conectados e rastreando

---

## 💡 Diagnóstico Final

| Métrica | Atual | Meta Realista |
|---------|-------|---------------|
| Budget mensal | R$ 800 | R$ 800 |
| Gasto efetivo em Search | ~R$ 160/mês (34%) | R$ 750/mês (94%+) |
| Keywords ativas | 1 | 15-20 |
| Negativas | 0 | 50+ |
| CTR Search | ~2,4% | 5-8% |
| CPA | R$ 22,55 | R$ 15-25 |
| Conversões/mês | ~21 | 30-50 |
| Qualidade anúncio | Ruim | Bom/Excelente |
| Extensões | 1 sitelink | 4+ tipos |

**Estimativa de ganho:** Ao eliminar Display, corrigir keywords e adicionar negativas, o mesmo R$ 800/mês deve gerar **2-3x mais leads qualificados**.
