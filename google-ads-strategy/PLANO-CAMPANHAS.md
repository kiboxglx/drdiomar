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

### 4. Adicionar palavras-chave negativas (LISTA INICIAL)
Criar lista compartilhada "Negativas Dr. Diomar" e aplicar a todas as campanhas:

```
# Informacionais genéricas
dieta pdf
receita
grátis
gratuito
free
como fazer
caseiro
natural
chá
suco
exercício
treino
academia
musculação
app
aplicativo
curso
faculdade
livro

# Profissionais concorrentes
nutricionista online
teleconsulta
online
ead
a distância

# Fora do escopo
cirurgia bariátrica
bariátrica
lipoaspiração
lipo
plástica
botox
harmonização facial
dentista
dermatologista
psicólogo
fisioterapia

# Localidades fora da região
são paulo
rio de janeiro
belo horizonte
curitiba
brasília df
goiânia
salvador
recife
fortaleza

# Baixa intenção
o que é
o que faz
quanto ganha
como ser
diferença entre
wikipedia
significado
```

---

## Estrutura de Campanhas

### Campanha 1: `[Search] Emagrecimento — Norte MG`
**Objetivo:** Capturar quem busca ativamente emagrecer com médico na região
**Budget:** R$ 15/dia (R$ 450/mês — ~56% do budget)
**Estratégia de lance:** Maximizar conversões (após 15-20 conversões, testar CPA desejado de R$ 25)
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
**Budget:** R$ 8/dia (R$ 240/mês — 30%)
**Estratégia de lance:** Maximizar cliques (iniciar com CPC máx R$ 5,00, migrar para conversões após dados)
**Rede:** SOMENTE Pesquisa Google
**Programação:** Segunda a Sábado, 6h-22h
**Localização:** 50km de cada hub

⚠️ **CUIDADO COM POLÍTICAS:** Evitar termos que disparem a política de "métodos anticoncepcionais, fertilidade". Focar em "performance", "disposição", "equilíbrio hormonal" em vez de "hormônio" direto nos títulos.

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

#### Anúncio Responsivo (RSA) — Implante:

**Títulos (15):**
| # | Título | Pin |
|---|--------|-----|
| 1 | Implantes Hormonais — Dr. Diomar | Pin 1 |
| 2 | Recupere Sua Disposição e Energia | Pin 1 |
| 3 | Equilíbrio Hormonal em até 30 Dias | — |
| 4 | +2.000 Pacientes — CRM 60.143 MG | — |
| 5 | Agende Avaliação — WhatsApp Direto | Pin 2 |
| 6 | Brasília de Minas e Varzelândia | Pin 3 |
| 7 | Tecnologia Absorvível — Não É Chip | — |
| 8 | Performance, Libido e Massa Muscular | — |
| 9 | Tratamento Personalizado com Exames | — |
| 10 | Médico Especialista em Performance | Pin 1 |
| 11 | Resultados Comprovados — Agende Agora | Pin 2 |
| 12 | Mais Energia, Menos Fadiga | — |
| 13 | Norte de Minas — Perto de Você | Pin 3 |
| 14 | Acompanhamento Contínuo por WhatsApp | — |
| 15 | Procedimento Rápido — Volta no Mesmo Dia | — |

**Descrições (4):**
| # | Descrição |
|---|-----------|
| 1 | Implantes hormonais biodegradáveis com acompanhamento médico contínuo. Procedimento rápido com anestesia local. Agende sua avaliação. |
| 2 | Cansaço, perda de libido, dificuldade de ganho muscular? Pode ser hormonal. Avaliação completa com exames em Brasília de Minas e Varzelândia. |
| 3 | Médico especialista em otimização hormonal. Tecnologia absorvível (não é chip). Resultados em até 30 dias. Parcelamento disponível. |
| 4 | Recupere sua disposição com protocolo hormonal personalizado. +2.000 pacientes atendidos. Agende pelo WhatsApp hoje mesmo. |

**URL final:** `https://drdiomarcangussu.com.br`
**URL de exibição:** drdiomarcangussu.com.br/implante-hormonal

---

### Campanha 3: `[Search] Marca + Região — Norte MG`
**Objetivo:** Capturar buscas diretas por nome e região (CPC baixo, conversão alta)
**Budget:** R$ 3/dia (R$ 90/mês — ~11%)
**Estratégia de lance:** Maximizar cliques (CPC máx R$ 2,00)
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

## Cronograma de Implementação

| Semana | Ação |
|--------|------|
| **Dia 1** | Resolver verificação do anunciante. Pausar campanhas atuais. Adicionar lista de negativas. |
| **Dia 2** | Criar nova conversão WhatsApp Click. Configurar extensões. |
| **Dia 3** | Criar Campanha 1 (Emagrecimento) e Campanha 3 (Marca). Ativar. |
| **Dia 4** | Criar Campanha 2 (Implante). Ativar. |
| **Semana 2** | Revisar termos de pesquisa diariamente. Adicionar negativas. Verificar CTR. |
| **Semana 3** | Pausar keywords com CTR < 1% e zero conversões. Ajuste de lance mobile. |
| **Semana 4** | Relatório de performance. Comparar CPA por campanha. Realocar budget se necessário. |
| **Mês 2** | Se Emagrecimento tem >20 conversões, migrar para CPA desejado R$ 25. |
