# Google Ads Editor — Import Guide

CSVs para importar as **3 campanhas completas** no Google Ads Editor:
- Campanha 1: `[Search] Emagrecimento — Norte MG` (recria a atual, com estrutura correta)
- Campanha 2: `[Search] Implante Hormonal — Norte MG`
- Campanha 3: `[Search] Marca + Região — Norte MG`

## ⚠️ ANTES DE IMPORTAR: Pausar campanha atual

A campanha existente (`Leads-Search-1` ou similar com 1 ad group genérico) tem estrutura ruim:
- 1 ad group só (plano pede 2 por campanha — Intenção Alta + Intenção Média)
- Nome default "Grupo de anúncios 1" inviabiliza análise por intenção
- Sample irrelevante (144 impr / 9 cliques / 0 conversões — tag estava quebrada)

**Ação:** No Google Ads Editor, **PAUSE** a campanha existente (não delete — mantém histórico pra referência). As 3 novas entram limpas.

## Ordem de import (seguir esta ordem)

1. `01-campaigns.csv` → cria as 3 campanhas
2. `02-ad-groups.csv` → cria os 6 ad groups (2 por campanha)
3. `03-keywords.csv` → adiciona 42 keywords segmentadas
4. `04-ads-rsa.csv` → adiciona 6 anúncios responsivos
5. `05-negatives.csv` → aplicar como **lista de palavras-chave negativas compartilhada**

## Como importar no Google Ads Editor

1. Abrir Google Ads Editor → escolher a conta `620-716-8203`
2. **Account** → **Import** → **From file…** → selecionar `01-campaigns.csv`
3. Revisar o diff → clicar em **Finish and review changes**
4. Repetir para `02`, `03`, `04` na ordem
5. Para `05-negatives.csv`:
   - Em **Shared library** → **Negative keyword lists** → criar lista `Negativas Dr. Diomar`
   - Importar `05-negatives.csv` dentro dessa lista
   - Aplicar a lista às 3 campanhas

## Revisar ANTES de publicar

Checklist antes de clicar **Post** (publicar no servidor):

### Campanha 1 — Emagrecimento
- [ ] Status: **PAUSED** inicialmente; ativar no Dia 3 (junto com Marca)
- [ ] Budget: R$ 15/dia (R$ 450/mês — 56%)
- [ ] CPC máx: R$ 4,00
- [ ] Rede: SOMENTE Pesquisa Google
- [ ] Expansão de URL: DESMARCAR
- [ ] 2 ad groups criados: Intenção Alta + Intenção Média
- [ ] Localização: raio de 50km de Brasília de Minas + 50km de Varzelândia

### Campanha 2 — Implante Hormonal
- [ ] Status: **PAUSED** (só ativa no Dia 8 do cronograma)
- [ ] Budget: R$ 5/dia (teste inicial). Subir para R$ 8/dia só após 80%+ aprovação
- [ ] Rede: SOMENTE Pesquisa Google (NÃO marcar Display nem Parceiros de pesquisa)
- [ ] **Expansão de URL**: DESMARCAR
- [ ] Revisar se os títulos não contêm termos proibidos: testosterona, estrogênio, chip hormonal masculino, libido
- [ ] Localização: raio de 50km de cada hub

### Campanha 3 — Marca + Região
- [ ] Status: **PAUSED** inicialmente; ativar no Dia 3 junto com Emagrecimento
- [ ] Budget: R$ 3/dia
- [ ] CPC máx: R$ 2,00
- [ ] Rede: SOMENTE Pesquisa Google
- [ ] Expansão de URL: DESMARCAR
- [ ] Localização: raio de 50km de cada hub
- [ ] Programação: **Todos os dias** 6h-22h (única campanha que roda domingo)

## Extensões de anúncio (fazer MANUALMENTE no Editor)

O Editor não importa bem sitelinks/callouts/snippets via CSV. Criar no nível da **conta** (application level) para propagar pras 3 campanhas:

**Sitelinks (4):**
1. Emagrecimento Científico → `https://drdiomarcangussu.com.br/#protocols` | Protocolo personalizado | Resultados em semanas
2. Implantes Hormonais → `https://drdiomarcangussu.com.br/#protocols` | Mais energia e disposição | Procedimento rápido
3. Onde Atendemos → `https://drdiomarcangussu.com.br/#hubs` | Brasília de Minas | Varzelândia e região
4. Agendar pelo WhatsApp → `https://drdiomarcangussu.com.br/` | Resposta em até 2 horas | Avaliação gratuita

**Callouts (6):**
- +2.000 Pacientes Atendidos
- Avaliação Gratuita
- Parcelamento Disponível
- Acompanhamento por WhatsApp
- CRM 60.143 MG
- Resultados em 30 Dias

**Snippets Estruturados:**
Cabeçalho: **Serviços**
Valores: Emagrecimento, Implantes Hormonais, Longevidade, Bioimpedância, Soroterapia, Check-up Metabólico

**Extensão de chamada:** (38) 99826-9290 — preferência dispositivos móveis

## Após publicar

1. Validar que os anúncios estão em review (status "Under review")
2. **Dia 3:** ativar Emagrecimento + Marca (deixar Implante paused)
3. **Dia 5:** validar que conversões WhatsApp Click estão chegando no Ads. Primeiro passe em termos de pesquisa.
4. **Dia 8:** ativar Implante Hormonal com R$ 5/dia
5. **Dia 10:** se ≥80% dos anúncios da Camp. Implante aprovados → subir pra R$ 8/dia
6. **Semana 5-6:** se Emagrecimento acumular ≥20 conversões → migrar de Max Clicks pra Maximizar Conversões

## Sumário dos CSVs

| Arquivo | Entidades |
|---|---|
| 01-campaigns.csv | 3 campanhas (Emagrecimento, Implante, Marca) |
| 02-ad-groups.csv | 6 ad groups (2 por campanha) |
| 03-keywords.csv | 42 keywords (phrase + exact, segmentadas por intenção) |
| 04-ads-rsa.csv | 6 anúncios responsivos (1 por ad group) |
| 05-negatives.csv | 95 negativas (lista compartilhada) |
