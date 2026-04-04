# 🤖 Google Ads Scripts — Dr. Diomar

Coleção de 6 scripts de automação para Google Ads, prontos para deploy no editor de scripts do Google Ads. Cada script é independente, totalmente parametrizável e inclui alertas por email e logs em Google Sheets.

---

## 📋 Scripts Disponíveis

| # | Script | Arquivo | Frequência | Função |
|---|--------|---------|------------|--------|
| 1 | **Anomaly Detector** | `01-anomaly-detector.js` | Diária | Detecta quedas no CTR/conversões e aumentos no CPC |
| 2 | **Negative Keywords** | `02-negative-keywords.js` | Semanal | Adiciona termos sem conversão como palavras-chave negativas |
| 3 | **Bid Adjuster** | `03-bid-adjuster.js` | Diária | Ajusta lances automaticamente com base no CPA target |
| 4 | **Budget Pacer** | `04-budget-pacer.js` | Diária | Controla pacing do orçamento mensal |
| 5 | **Link Checker** | `05-link-checker.js` | Diária | Verifica URLs de destino e pausa anúncios com links quebrados |
| 6 | **Performance Report** | `06-performance-report.js` | Diária | Exporta métricas de desempenho para Google Sheets como dashboard |

---

## 🚀 Instalação Passo-a-Passo

### Pré-requisitos

- Conta Google Ads ativa com permissão de administrador
- Acesso ao editor de scripts do Google Ads
- Conta Google com permissão para criar planilhas Google Sheets

### 1. Acessar o Editor de Scripts

1. Faça login no [Google Ads](https://ads.google.com)
2. Clique em **Ferramentas e Configurações** (ícone de chave 🔧) no menu superior
3. Na seção **Ações em massa**, clique em **Scripts**
4. Clique no botão **+** (Criar Script) para abrir o editor

```
Google Ads → Ferramentas (🔧) → Ações em massa → Scripts → + Criar Script
```

### 2. Criar a Planilha Google Sheets (quando necessário)

Os scripts 2, 3, 4, 5 e 6 usam Google Sheets para logging. Para cada script que utilizar:

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha vazia
3. Renomeie para algo descritivo (ex: "Google Ads — Link Checker Log")
4. Copie a URL da planilha (será algo como `https://docs.google.com/spreadsheets/d/ABC123/edit`)
5. Cole esta URL no campo `SPREADSHEET_URL` do script

> **💡 Dica:** Você pode usar uma única planilha com múltiplas abas, ou planilhas separadas por script. Cada script cria sua aba automaticamente se ela não existir.

### 3. Instalar um Script

1. No editor de scripts do Google Ads, dê um nome ao script (ex: "Link Checker")
2. **Apague** todo o código existente no editor
3. **Copie** o conteúdo inteiro do arquivo `.js` desejado
4. **Cole** no editor de scripts
5. Ajuste as variáveis na seção `CONFIG` no início do script:
   - `EMAIL_RECIPIENTS` → seu email para receber alertas
   - `SPREADSHEET_URL` → URL da planilha Google Sheets
   - Demais parâmetros conforme necessidade
6. Clique em **Autorizar** quando solicitado (na primeira execução)
7. Clique em **Visualizar** para fazer um teste manual
8. Se tudo estiver OK, agende a execução (ver próxima seção)

### 4. Agendar Execução Automática

1. Na lista de scripts, clique no **ícone de lápis** ao lado do script
2. Ative a **frequência** de execução:
   - **Diária** para scripts 1, 3, 4, 5, 6
   - **Semanal** para script 2 (Negative Keywords)
3. Defina o **horário** recomendado (ver tabela abaixo)
4. Salve a configuração

```
Scripts → [Nome do Script] → Editar frequência → Diária/Semanal → Horário → Salvar
```

---

## ⏰ Frequência e Horário Recomendados

| Script | Frequência | Horário | Justificativa |
|--------|------------|---------|---------------|
| 01 — Anomaly Detector | Diária | 08:00 | Dados completos do dia anterior disponíveis |
| 02 — Negative Keywords | Semanal (seg) | 07:00 | Volume suficiente de dados acumulados |
| 03 — Bid Adjuster | Diária | 06:00 | Ajustes aplicados antes do pico de tráfego |
| 04 — Budget Pacer | Diária | 09:00 | Após consolidação dos gastos do dia anterior |
| 05 — Link Checker | Diária | 07:00 | Detecta problemas antes do horário comercial |
| 06 — Performance Report | Diária | 06:00 | Relatório pronto para revisão pela manhã |

> **⚠️ Importante:** Espalhe os horários para evitar que múltiplos scripts rodem simultaneamente. O Google Ads tem um limite de execução de 30 minutos por script.

---

## ⚙️ Configuração por Script

### 01 — Anomaly Detector (`01-anomaly-detector.js`)

Detecta variações anormais nas métricas comparando o dia anterior com a média dos últimos 7 dias.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `EMAIL_RECIPIENTS` | — | Email(s) para alertas |
| `CTR_DROP_THRESHOLD` | `0.30` | Queda de 30% no CTR dispara alerta |
| `CONVERSIONS_DROP_THRESHOLD` | `0.30` | Queda de 30% nas conversões |
| `CPC_INCREASE_THRESHOLD` | `0.50` | Aumento de 50% no CPC |
| `LOOKBACK_DAYS` | `7` | Dias para cálculo da média |
| `MIN_IMPRESSIONS` | `100` | Mínimo de impressões para considerar |
| `CAMPAIGN_NAME_CONTAINS` | `''` | Filtro por nome de campanha |

**Não requer Google Sheets.**

---

### 02 — Negative Keywords (`02-negative-keywords.js`)

Identifica termos de pesquisa que gastam sem converter e os adiciona como palavras-chave negativas.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `SPREADSHEET_URL` | — | URL da planilha para log |
| `MIN_COST_THRESHOLD` | `20.00` | Gasto mínimo (R$) sem conversão |
| `LOOKBACK_DAYS` | `30` | Período de análise |
| `NEGATIVE_MATCH_TYPE` | `'EXACT'` | Tipo de correspondência negativa |
| `DRY_RUN` | `false` | Modo teste (sem alterações) |
| `MAX_NEGATIVES_PER_RUN` | `50` | Limite de negativas por execução |

**🔒 Modo seguro:** Ative `DRY_RUN: true` na primeira execução para revisar quais termos seriam bloqueados.

---

### 03 — Bid Adjuster (`03-bid-adjuster.js`)

Ajusta lances de palavras-chave automaticamente com base no CPA target.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `CPA_TARGET` | `50.00` | CPA alvo em R$ |
| `BID_INCREASE_PERCENT` | `0.15` | Aumento para keywords com bom CPA (+15%) |
| `BID_DECREASE_PERCENT` | `0.20` | Redução para CPA muito alto (-20%) |
| `MAX_BID` | `15.00` | Bid máximo permitido (R$) |
| `MIN_BID` | `0.50` | Bid mínimo permitido (R$) |
| `LOOKBACK_DAYS` | `14` | Período de análise |
| `DRY_RUN` | `false` | Modo teste (sem alterações) |
| `MAX_ADJUSTMENTS_PER_RUN` | `100` | Limite de ajustes por execução |

**Lógica de ajuste:**
- CPA < target → Aumenta bid em +15%
- CPA entre target e 2x target → Mantém bid
- CPA > 2x target → Reduz bid em -20%

---

### 04 — Budget Pacer (`04-budget-pacer.js`)

Monitora o pacing do orçamento mensal e ajusta o budget diário para manter a meta.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `MONTHLY_BUDGET_TARGET` | `5000.00` | Meta de orçamento mensal (R$) |
| `PACE_HIGH_THRESHOLD` | `1.10` | Alerta se pace > 110% |
| `PACE_LOW_THRESHOLD` | `0.80` | Alerta se pace < 80% |
| `AUTO_ADJUST_BUDGET` | `true` | Ajustar budget automaticamente |
| `MAX_BUDGET_INCREASE_PERCENT` | `0.30` | Aumento máximo do budget (+30%) |
| `MIN_DAILY_BUDGET` | `10.00` | Budget diário mínimo (R$) |
| `MAX_DAILY_BUDGET` | `500.00` | Budget diário máximo (R$) |

---

### 05 — Link Checker (`05-link-checker.js`)

Verifica se URLs de destino dos anúncios retornam HTTP 200 e pausa anúncios com links quebrados.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `SPREADSHEET_URL` | — | URL da planilha para log |
| `EMAIL_RECIPIENTS` | — | Email(s) para alertas |
| `AUTO_PAUSE` | `true` | Pausar anúncios com URLs quebradas |
| `DRY_RUN` | `false` | Modo teste (sem alterações) |
| `REQUEST_TIMEOUT_MS` | `10000` | Timeout por requisição (10s) |
| `VALID_HTTP_CODES` | `[200, 301, 302]` | Códigos HTTP válidos |
| `MAX_URLS_PER_RUN` | `500` | Máximo de URLs por execução |
| `MAX_PAUSES_PER_RUN` | `50` | Limite de pausas por execução |
| `DELAY_BETWEEN_REQUESTS_MS` | `200` | Intervalo entre verificações |

**Verificações incluem:**
- Status HTTP (4xx, 5xx = problema)
- Timeout de conexão
- Erros de DNS
- Erros de certificado SSL

---

### 06 — Performance Report (`06-performance-report.js`)

Exporta métricas diárias para Google Sheets com formatação de dashboard.

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `SPREADSHEET_URL` | — | URL da planilha para relatório |
| `LOOKBACK_DAYS` | `30` | Período do relatório |
| `CLEAR_BEFORE_WRITE` | `true` | Limpar dados antes de reescrever |
| `CPA_TARGET` | `50.00` | CPA target para coloração |
| `CAMPAIGN_NAME_CONTAINS` | `''` | Filtro por nome de campanha |
| `EMAIL_RECIPIENTS` | `''` | Email para relatório (opcional) |

**O relatório cria 2 abas:**
- **Dados Diários** — métricas dia a dia por campanha
- **Resumo** — totais e médias do período com formatação visual

**Métricas exportadas:**
Impressões, Cliques, CTR, CPC, Conversões, CPA e Custo Total

**Formatação visual:**
- 🟢 CTR ≥ 3% (verde)
- 🟡 CTR entre 1% e 3% (amarelo)
- 🔴 CTR < 1% (vermelho)

---

## 🔒 Controles de Segurança

Todos os scripts incluem mecanismos de segurança:

| Controle | Scripts | Descrição |
|----------|---------|-----------|
| **DRY RUN** | 2, 3, 4, 5 | Modo teste sem fazer alterações reais |
| **Limites por execução** | 2, 3, 5 | Máximo de alterações por rodada |
| **Travas de valor** | 3, 4 | Bid/budget mínimo e máximo |
| **Filtro de campanhas** | Todos | Restringir a campanhas específicas |
| **Mínimos de dados** | Todos | Ignorar campanhas com poucos dados |
| **Log em Sheets** | 2, 3, 4, 5, 6 | Registro completo para auditoria |
| **Alertas por email** | Todos | Notificação de ações e anomalias |

### Recomendação de Primeiro Uso

1. **Sempre** comece com `DRY_RUN: true` nos scripts que possuem essa opção
2. Execute manualmente clicando em **Visualizar** no editor
3. Revise os logs e a planilha de registros
4. Somente após validar, altere para `DRY_RUN: false`
5. Agende a execução automática

---

## 🔧 Solução de Problemas

### "Erro: Planilha não encontrada"
- Verifique se a URL em `SPREADSHEET_URL` está correta
- Confirme que você tem permissão de edição na planilha
- O script precisa de autorização na primeira execução

### "Erro: Permissão negada"
- Clique em **Autorizar** no editor de scripts
- Aceite todas as permissões solicitadas (Sheets, Email, URL Fetch)
- Se usar conta de agência (MCC), verifique as permissões no nível da conta

### "Script excedeu o tempo limite"
- Reduza o valor de `MAX_URLS_PER_RUN`, `MAX_ADJUSTMENTS_PER_RUN`, etc.
- Use `CAMPAIGN_NAME_CONTAINS` para limitar o escopo
- Google Ads Scripts têm limite de **30 minutos** de execução

### "Nenhum dado encontrado"
- Verifique se `CAMPAIGN_NAME_CONTAINS` não está filtrando tudo
- Confirme que há campanhas ativas com dados no período
- Aumente o `LOOKBACK_DAYS` se necessário

### "Dados inconsistentes no relatório"
- Métricas do Google Ads podem ter até **3 horas de atraso**
- Execute o relatório pela manhã para dados mais completos do dia anterior
- Conversões podem levar até **72 horas** para serem atribuídas

---

## 📁 Estrutura dos Arquivos

```
google-ads-scripts/
├── 01-anomaly-detector.js    # Detecção de anomalias em métricas
├── 02-negative-keywords.js   # Gestão automática de negativas
├── 03-bid-adjuster.js        # Ajuste de lances por CPA
├── 04-budget-pacer.js        # Controle de pacing de orçamento
├── 05-link-checker.js        # Verificação de URLs de destino
├── 06-performance-report.js  # Dashboard de performance em Sheets
└── README.md                 # Este arquivo
```

---

## 📝 Notas Importantes

- **Limites do Google Ads Scripts:** 30 min de execução, 250K linhas de Sheets por conta
- **Fuso horário:** Scripts usam o fuso da conta Google Ads (`AdsApp.currentAccount().getTimeZone()`)
- **Microamounts:** Valores monetários do Google Ads são internamente em microamounts (÷ 1.000.000)
- **AWQL:** Os scripts usam AWQL (AdWords Query Language) para consultas de relatórios
- **Idempotência:** Scripts são seguros para re-execução — logs são acumulados, não duplicados

---

## 📄 Licença

Scripts desenvolvidos para uso interno da Dr. Diomar. Personalização e ajustes são encorajados.
