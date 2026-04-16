# 🎯 Plano de Campanhas Google Ads — Dr. Diomar

**Budget:** R$ 800/mês (~R$ 26/dia)
**Objetivo:** Maximizar leads qualificados (cliques WhatsApp + ligações)
**URL destino:** drdiomarcangussu.com.br (LP otimizada M002)

---

## Ações Imediatas (Antes de Criar Campanhas)

### 1. Resolver verificação do anunciante
A conta está pausada. Ir em **Configurações → Verificação do anunciante** e completar o processo.

### 2. Pausar/Excluir campanhas atuais
- **Leads-Search-1** → PAUSAR (vamos substituir por campanhas novas)
- **Serviços Médicos Alternativos** (Smart) → EXCLUIR (nunca ativar Smart campaigns com R$800/mês)

### 3. Corrigir ações de conversão
**Remover das metas da conta:**
- Todas as ações "Hospedado pelo Google" (Smart campaign map clicks, directions, etc.)
- "Calls from Smart Campaign Ads"

**Criar nova ação de conversão:**
- **Nome:** WhatsApp Click
- **Tipo:** Ação do site (Website)
- **Tag:** Configurar no GTM ou via gtag (já temos tracking no código)
- **Valor:** R$ 25 (valor estimado por lead)
- **Contagem:** Uma (por sessão)
- **Janela:** 30 dias
- **Incluir nas metas:** Sim

**Manter:**
- "Reservar horário" (GA4) — mas verificar se está disparando corretamente com a LP nova

### 4. Adicionar palavras-chave negativas (LISTA REVISADA)
Criar lista compartilhada "Negativas Dr. Diomar" e aplicar a todas as campanhas.

**⚠️ Formato importante:**
- Termos em `[colchetes]` = correspondência **exata** (bloqueia exatamente aquilo)
- Termos entre `"aspas"` = correspondência de **frase** (bloqueia qualquer busca que contenha a frase)
- Sem pontuação = correspondência **ampla** (uso restrito pra palavras isoladas inequívocas)

**Ajustes vs versão anterior:** removidos `exercício`, `treino`, `online`, `natural`, `o que faz`, `como fazer` como ampla — bloqueavam tráfego válido. Foram convertidos para phrase match onde fazem sentido.

```
# Conteúdo informacional (phrase match)
"dieta pdf"
"receita grátis"
"receita caseira"
"cardápio grátis"
"como fazer dieta"
"como perder barriga"
"como emagrecer rapido"
"como emagrecer em"
"como ficar magra"
"como limpar o fígado"
"como acelerar o metabolismo"
"dieta para emagrecer"
"dieta simples"
"dieta da sopa"
"dieta dukan"
"dieta cetogênica receita"
"jejum intermitente como"
"jejum 36 horas"
"remédio caseiro"
"chá para emagrecer"
"suco para emagrecer"
"canela para emagrecer"
"limão para emagrecer"
"vinagre para emagrecer"
"subliminal emagrecer"
"frequência emagrecer"
"simpatia para emagrecer"

# Promessas irreais (phrase)
"10kg em 7 dias"
"10kg em 10 dias"
"5 quilos em uma semana"
"emagrecer em 3 dias"
"emagrecer rápido 1 semana"
"perder peso em 1 dia"
"3 dias sem comer"

# Exercício / treino / academia (phrase — só quando informacional)
"treino para"
"exercício para"
"exercícios para"
"treino em casa"
"exercício em casa"
"musculação para"
"academia para"

# Profissões / modalidades erradas
nutricionista
"nutricionista online"
"nutricionista grátis"
"nutricionista barato"
teleconsulta
"consulta online"
"atendimento online"
"a distância"
ead
psicólogo
psicologa
dentista
dermatologista
fisioterapia
fisioterapeuta
"personal trainer"

# Fora do escopo médico
"cirurgia bariátrica"
bariátrica
lipoaspiração
lipo
"cirurgia plástica"
botox
"harmonização facial"
"preenchimento facial"
mounjaro
ozempic
"injeção para emagrecer"
"remédio para emagrecer"

# Conteúdo educacional / top-funnel
"o que é nutrologia"
"o que é nutrólogo"
"o que faz o nutrólogo"
"o que faz o nutrologista"
"quanto ganha"
"como ser nutrólogo"
"faculdade de nutrologia"
"curso de nutrologia"
"diferença entre nutrólogo e"
wikipedia
pdf
download
youtube

# Localidades fora da região (phrase)
"são paulo"
"rio de janeiro"
"belo horizonte"
"brasília df"
"brasilia df"
curitiba
goiânia
salvador
recife
fortaleza
"distrito federal"

# Concorrentes diretos identificados nos search terms
"dr renan botelho"
"dr corassa"
"dr turi souza"
"nutri inteligente"

# Apps / gadgets
aplicativo
"app para emagrecer"
smartwatch
```

**Observação:** essa lista deve ser revisada semanalmente adicionando novos termos irrelevantes que aparecerem no relatório de termos de pesquisa.

---

## Estrutura de Campanhas

### Campanha 1: `[Search] Emagrecimento — Norte MG`
**Objetivo:** Capturar quem busca ativamente emagrecer com médico na região
**Budget:** R$ 15/dia (R$ 450/mês — ~56% do budget)
**Estratégia de lance:** 🟡 **Maximizar Cliques com CPC máx R$ 4,00** durante o período de aprendizado (4–6 semanas). Migrar para **Maximizar Conversões** somente após acumular ≥20 conversões reais de WhatsApp Click.
**Rede:** ⚠️ SOMENTE Pesquisa Google (DESMARCAR Display e Parceiros de pesquisa)
**Dispositivos:** Todos (ajuste +20% mobile depois de 2 semanas de dados)
**Programação:** Segunda a Sábado, 6h-22h (sem madrugada)
**Localização:** Mesmo raio atual (50km de cada hub)

#### Grupo 1: `Emagrecimento — Intenção Alta`
Keywords (correspondência de frase):
```
"médico para emagrecer"
"clínica de emagrecimento"
"tratamento para emagrecer"
"emagrecer com médico"
"protocolo de emagrecimento"
"emagrecer rápido com acompanhamento"
```

Keywords (correspondência exata):
```
[nutrólogo perto de mim]
[nutrólogo brasília de minas]
[médico emagrecimento]
[clínica emagrecimento norte de minas]
```

#### Grupo 2: `Emagrecimento — Intenção Média`
Keywords (correspondência de frase):
```
"como emagrecer de verdade"
"tratamento para obesidade"
"médico para perder peso"
"consulta para emagrecer"
"acompanhamento médico emagrecimento"
"emagrecer sem efeito sanfona"
```

#### Anúncio Responsivo (RSA) — Emagrecimento:

**Títulos (15):**
| # | Título | Pin |
|---|--------|-----|
| 1 | Emagreça de Verdade com Protocolo Médico | Pin 1 |
| 2 | Dr. Diomar — Especialista em Emagrecimento | Pin 1 |
| 3 | Perca Peso Sem Dietas Restritivas | — |
| 4 | Resultados Visíveis em 30 Dias | — |
| 5 | Avaliação Gratuita — Agende Agora | Pin 2 |
| 6 | Brasília de Minas e Varzelândia | Pin 3 |
| 7 | +2.000 Pacientes Atendidos | — |
| 8 | Sem Efeito Sanfona — Protocolo Científico | — |
| 9 | Emagrecimento com Acompanhamento Médico | — |
| 10 | Agende pelo WhatsApp — Resposta Rápida | Pin 2 |
| 11 | Protocolo Personalizado para Você | — |
| 12 | CRM 60.143 MG — Atendimento Humanizado | — |
| 13 | Perto de Você — Norte de Minas | Pin 3 |
| 14 | Pare de Sofrer com Dietas que Não Funcionam | — |
| 15 | Exames + Plano Individual | — |

**Descrições (4):**
| # | Descrição |
|---|-----------|
| 1 | Protocolo médico personalizado com exames, nutrição e acompanhamento por WhatsApp. Resultados reais em semanas. Agende sua avaliação gratuita. |
| 2 | +2.000 pacientes atendidos em Brasília de Minas e Varzelândia. Emagrecimento científico sem dietas malucas. Agende hoje mesmo! |
| 3 | Médico especialista em emagrecimento e nutrologia. Atendimento particular com opção de parcelamento. Avaliação inicial sem compromisso. |
| 4 | Chega de efeito sanfona. Tratamento que trata a causa, não os sintomas. Bioimpedância + protocolo personalizado. |

**URL final:** `https://drdiomarcangussu.com.br`
**URL de exibição:** drdiomarcangussu.com.br/emagrecimento

---

### Campanha 2: `[Search] Implante Hormonal — Norte MG`
**Objetivo:** Capturar quem busca implante hormonal / reposição
**Budget inicial (semana 1-2):** 🟡 **R$ 5/dia (R$ 150/mês)** como teste. Subir para R$ 8/dia apenas se ≥80% dos anúncios forem aprovados.
**Budget alvo:** R$ 8/dia (R$ 240/mês — 30%)
**Estratégia de lance:** Maximizar cliques (CPC máx R$ 5,00). Migrar para conversões após ≥20 conv.
**Rede:** SOMENTE Pesquisa Google
**Programação:** Segunda a Sábado, 6h-22h
**Localização:** 50km de cada hub
**Lançar:** ⚠️ **Somente no Dia 8** (após Campanhas 1 e 3 estarem rodando e validadas). Se Campanha 2 for reprovada por política, realocar os R$ 240/mês para Campanha 1.

⚠️ **CUIDADO COM POLÍTICAS:** Evitar termos que disparem a política de "métodos anticoncepcionais, fertilidade, hormônios". **NUNCA usar nos títulos:** "testosterona", "estrogênio", "chip hormonal masculino", "libido". Focar em "performance", "disposição", "equilíbrio", "energia", "bem-estar".

#### Grupo 1: `Implante Hormonal`
Keywords (correspondência de frase):
```
"implante hormonal"
"chip hormonal"
"reposição hormonal"
"implante hormonal masculino"
"implante hormonal feminino"
"implante testosterona"
```

Keywords (correspondência exata):
```
[implante hormonal perto de mim]
[implante hormonal norte de minas]
[reposição hormonal brasília de minas]
```

#### Grupo 2: `Sintomas Hormonais`
Keywords (correspondência de frase):
```
"tratamento fadiga crônica"
"perda de libido tratamento"
"falta de disposição médico"
"ganhar massa muscular médico"
"testosterona baixa tratamento"
```

#### Anúncio Responsivo (RSA) — Implante (SEM termos proibidos):

**Títulos (15):**
| # | Título | Pin |
|---|--------|-----|
| 1 | Recupere Sua Energia e Disposição | Pin 1 |
| 2 | Dr. Diomar — Especialista em Performance | Pin 1 |
| 3 | Equilíbrio e Bem-Estar em até 30 Dias | — |
| 4 | +2.000 Pacientes — CRM 60.143 MG | — |
| 5 | Agende Avaliação — WhatsApp Direto | Pin 2 |
| 6 | Brasília de Minas e Varzelândia | Pin 3 |
| 7 | Tecnologia Absorvível e Moderna | — |
| 8 | Mais Energia para o Seu Dia a Dia | — |
| 9 | Avaliação com Exames Completos | — |
| 10 | Médico Especialista em Otimização | Pin 1 |
| 11 | Protocolo Individual — Agende Agora | Pin 2 |
| 12 | Chega de Fadiga e Cansaço | — |
| 13 | Norte de Minas — Perto de Você | Pin 3 |
| 14 | Acompanhamento Contínuo por WhatsApp | — |
| 15 | Procedimento Rápido — Mesmo Dia | — |

**Descrições (4):**
| # | Descrição |
|---|-----------|
| 1 | Protocolo personalizado com acompanhamento médico contínuo. Procedimento rápido com anestesia local. Agende sua avaliação completa. |
| 2 | Cansaço, falta de disposição, dificuldade para manter peso? Avaliação médica completa com exames em Brasília de Minas e Varzelândia. |
| 3 | Médico especialista em otimização e bem-estar. Tecnologia moderna e segura. Resultados em até 30 dias. Parcelamento disponível. |
| 4 | Recupere sua energia com protocolo personalizado. +2.000 pacientes atendidos. Agende pelo WhatsApp hoje mesmo. |

**URL final:** `https://drdiomarcangussu.com.br`
**URL de exibição:** drdiomarcangussu.com.br/implante-hormonal

---

### Campanha 3: `[Search] Marca + Região — Norte MG`
**Objetivo:** Capturar buscas diretas por nome e região (CPC baixo, conversão alta)
**Budget:** R$ 3/dia (R$ 90/mês — ~11%)
**Estratégia de lance:** Maximizar Cliques com CPC máx R$ 2,00
**Rede:** SOMENTE Pesquisa Google
**Programação:** Todos os dias, 6h-22h

#### Grupo 1: `Marca`
Keywords (correspondência exata + frase):
```
[dr diomar]
[dr diomar cangussu]
[doutor diomar]
"dr diomar cangussu"
"dr diomar brasília de minas"
"dr diomar varzelândia"
```

#### Grupo 2: `Médico + Região`
Keywords (correspondência de frase):
```
"médico brasília de minas"
"nutrólogo brasília de minas"
"nutrólogo varzelândia"
"clínica médica brasília de minas"
"médico varzelândia"
"nutrologia norte de minas"
```

#### Anúncio Responsivo — Marca/Região:

**Títulos (12):**
| # | Título |
|---|--------|
| 1 | Dr. Diomar Cangussu — Nutrologista |
| 2 | Brasília de Minas e Varzelândia |
| 3 | Agende Sua Consulta Agora |
| 4 | +2.000 Pacientes Atendidos |
| 5 | Emagrecimento e Implantes Hormonais |
| 6 | CRM 60.143 MG — Pós em Nutrologia |
| 7 | Avaliação Gratuita pelo WhatsApp |
| 8 | Atendimento Humanizado na Região |
| 9 | Referência em Saúde no Norte de MG |
| 10 | Resultados Reais — Sem Efeito Sanfona |
| 11 | Seg a Sex 8h-18h — Agende Agora |
| 12 | Parcelamento Disponível |

**Descrições (4):**
| # | Descrição |
|---|-----------|
| 1 | Médico nutrologista com +2.000 pacientes. Protocolos de emagrecimento, implantes hormonais e longevidade. Agende pelo WhatsApp. |
| 2 | Referência em emagrecimento e performance no Norte de Minas. Atendimento em Brasília de Minas e Varzelândia. Avaliação gratuita. |
| 3 | Especialista em protocolos de emagrecimento científico e reposição hormonal. Acompanhamento completo com exames. |
| 4 | Atendimento particular com parcelamento. Brasília de Minas (Av. Rui Barbosa, 365) e Varzelândia (Rua Lucas Alkimin, 190). |

**URL final:** `https://drdiomarcangussu.com.br`

---

## Extensões de Anúncio (aplicar a TODAS as campanhas)

### Sitelinks (4):
| Texto do sitelink | Descrição 1 | Descrição 2 | URL final |
|---|---|---|---|
| Emagrecimento Científico | Protocolo personalizado | Resultados em semanas | drdiomarcangussu.com.br/#protocols |
| Implantes Hormonais | Mais energia e disposição | Procedimento rápido | drdiomarcangussu.com.br/#protocols |
| Onde Atendemos | Brasília de Minas | Varzelândia e região | drdiomarcangussu.com.br/#hubs |
| Agendar pelo WhatsApp | Resposta em até 2 horas | Avaliação gratuita | drdiomarcangussu.com.br |

### Callouts (6):
```
✓ +2.000 Pacientes Atendidos
✓ Avaliação Gratuita
✓ Parcelamento Disponível
✓ Acompanhamento por WhatsApp
✓ CRM 60.143 MG
✓ Resultados em 30 Dias
```

### Snippets Estruturados:
**Cabeçalho:** Serviços
**Valores:** Emagrecimento, Implantes Hormonais, Longevidade, Bioimpedância, Soroterapia, Check-up Metabólico

### Extensão de Chamada:
**Telefone:** (38) 99826-9295
**Preferência:** Mostrar em dispositivos móveis

### Extensão de Local:
Vincular ao Google Meu Negócio (se existir) para mostrar endereço e mapa.

---

## Distribuição de Budget

| Campanha | Budget/dia | Budget/mês | % Total | Justificativa |
|----------|-----------|------------|---------|---------------|
| Emagrecimento | R$ 15 | R$ 450 | 56% | Maior volume de busca, core business |
| Implante Hormonal | R$ 8 | R$ 240 | 30% | Alto ticket, público específico |
| Marca + Região | R$ 3 | R$ 90 | 11% | CPC baixo, conversão alta, proteção de marca |
| **Reserva** | — | R$ 20 | 3% | Buffer para dias de pico |
| **Total** | **R$ 26** | **R$ 800** | **100%** | |

---

## Configurações Importantes em Todas as Campanhas

| Configuração | Valor | Por quê |
|---|---|---|
| Rede de Display | ❌ DESMARCAR | Desperdiça 62% do budget atual |
| Parceiros de pesquisa | ❌ DESMARCAR | Tráfego de baixa qualidade |
| Rotação de anúncios | Otimizar | Deixar Google priorizar melhor RSA |
| Idioma | Português | Não "Todos os idiomas" |
| Programação | Seg-Sáb 6h-22h | Sem madrugada |
| Ajuste mobile | +20% (após 2 semanas) | 70-80% do público |
| Expansão de URL | ❌ DESMARCAR | Forçar tráfego para LP principal |

---

## Cronograma de Implementação (REVISADO)

| Dia | Ação |
|--------|------|
| **Dia 1** | Verificação do anunciante. Pausar Leads-Search-1. Deletar Smart Campaign. Criar conversão WhatsApp Click **nativa Ads** (gtag direto). Remover das metas as 6 ações Smart/Google-hosted. |
| **Dia 2** | Criar lista negativas (revisada). Criar 4 sitelinks + 6 callouts + snippets + extensão chamada no nível de conta. |
| **Dia 3** | Criar Campanha 1 (Emagrecimento) com **Max Clicks CPC R$ 4**. Criar Campanha 3 (Marca) com **Max Clicks CPC R$ 2**. Ativar ambas. |
| **Dia 5** | Validar que conversões WhatsApp Click estão chegando no Ads. Primeiro passe em termos de pesquisa → adicionar negativas novas. |
| **Dia 8** | Criar Campanha 2 (Implante) com R$ 5/dia e RSA sem termos proibidos. Monitorar aprovação dos anúncios em 24h. |
| **Dia 10** | Se ≥80% dos anúncios da Camp. 2 aprovados → subir pra R$ 8/dia. Se <80% → pausar e realocar orçamento pra Camp. 1. |
| **Semana 2** | Revisão diária de termos de pesquisa. Adicionar negativas. |
| **Semana 3** | Pausar keywords com CTR < 1% e zero conversões. Avaliar ajuste +20% lance mobile com base em dados reais. |
| **Semana 4** | Relatório de performance. Comparar CPA por campanha. Realocar budget. |
| **Semana 5-6** | Se Camp. 1 acumulou ≥20 conversões reais de WhatsApp Click → migrar de Max Clicks para **Maximizar Conversões**. |
| **Mês 2** | Se Max Conversões estabilizar ≥15 conversões por semana → testar **CPA desejado R$ 25**. |
