# 🤖 Passo-a-Passo — Execução pelo Claude in Chrome

**Este documento foi otimizado para ser executado por um agente de navegador (Claude in Chrome) passo a passo no Google Ads.**

---

## 📌 Contexto que o agente precisa saber antes de começar

- **Conta Google Ads a operar:** `144-680-3197` (Nome: Dr. Diomar — sub-conta da MCC 620-716-8203)
- **Login:** `drdiomarcangussunutrologia@gmail.com`
- **URL inicial:** https://ads.google.com/aw/campaigns?ocid=&ascid=&authuser=0
- **Budget total mensal:** R$ 800 (R$ 26/dia)
- **Site de destino:** https://drdiomarcangussu.com.br
- **Telefone da clínica:** (38) 99826-9290
- **Hubs de atendimento:** Brasília de Minas (Av. Rui Barbosa, 365) + Varzelândia (Rua Lucas Alkimin, 190)

**Antes de iniciar qualquer fase:** confirme que está logado com `drdiomarcangussunutrologia@gmail.com` e que o seletor de conta no topo mostra **`144-680-3197`** (Dr Diomar). Se mostrar outra conta, trocar no seletor antes de continuar.

**Regra de ouro durante a execução:**
- Antes de clicar em "Salvar" em qualquer tela, listar ao usuário o que vai salvar e aguardar confirmação.
- Se encontrar uma tela diferente da descrita (UI do Google Ads muda), descrever a tela atual e perguntar como prosseguir — **nunca chutar cliques**.
- Campos em branco nunca devem ser preenchidos com valores não listados aqui.

---

## FASE 1 — Limpeza da conta (Dia 1, ~20 min)

### 1.1 Verificação do anunciante
1. Ir em **⚙️ Ferramentas e configurações** → **Faturamento** → **Verificação do anunciante**
2. Verificar status:
   - ✅ Se "Verificado" → pular para 1.2
   - ⛔ Se "Pendente" ou "Expirou" → iniciar processo (documento, CNPJ, etc.). **Esse processo pode levar dias** — informar ao usuário e continuar com as demais fases (as campanhas só vão rodar após aprovação).

### 1.2 Pausar campanha `Leads-Search-1`
1. Menu lateral → **Campanhas**
2. Localizar linha **Leads-Search-1**
3. Clicar no ícone de status (círculo verde/cinza à esquerda do nome) → selecionar **Pausar**
4. Confirmar que o status mudou para "Pausada"

### 1.3 Remover campanha Smart `Serviços Médicos Alternativos`
1. Ainda em **Campanhas**
2. Localizar **Serviços Médicos Alternativos**
3. Marcar o checkbox da linha
4. No topo, clicar **Editar** → **Remover**
5. Confirmar

### 1.4 Criar conversão NATIVA "WhatsApp Click" (gtag direto)
⚠️ **Importante:** criar como conversão nativa do Google Ads, NÃO importar do GA4.

1. **⚙️ Ferramentas e configurações** → **Medição** → **Conversões**
2. Clicar **+ Nova ação de conversão**
3. Selecionar **Site**
4. Campo "URL do site": digitar `drdiomarcangussu.com.br` → **Verificar**
5. Escolher **+ Adicionar uma ação de conversão manualmente** (rolar até o final)
6. Preencher:

| Campo | Valor |
|---|---|
| Nome da ação de conversão | `WhatsApp Click` |
| Meta e otimização | **Enviar formulário de lead** |
| Valor | Usar o mesmo valor para cada conversão: **R$ 25,00** (BRL) |
| Contagem | **Uma** |
| Janela de conversão (cliques) | **30 dias** |
| Janela de conversão (engajamento) | 3 dias |
| Janela de conversão (visualização) | 1 dia |
| Modelo de atribuição | **Baseada em dados** (se indisponível, usar "Último clique") |
| Incluir em "Conversões" | ✅ Sim |

7. Clicar **Concluído** → **Salvar e continuar**
8. Na próxima tela, escolher **Instalar a tag manualmente** (não usar GTM agora)
9. **Copiar e registrar para o usuário:**
   - `send_to` ID (formato `AW-XXXXXXXXXX/YYYYYYYYY`)
   - Conversion ID
   - Conversion Label
10. Avisar o usuário: *"Copiei o Conversion ID e Label. Você precisa colar no arquivo `src/lib/tracking.ts` do site no lugar da label atual (`ads_conversion_Reservar_hor_rio_1`). Me avise quando atualizar o código e fizer deploy para eu continuar."*

### 1.5 Remover das metas as conversões inúteis
1. Voltar em **⚙️ Ferramentas** → **Medição** → **Conversões**
2. Para **cada uma** das ações abaixo, clicar na linha → **Editar configurações** → desmarcar "Incluir em Conversões" → **Salvar**:
   - `Smart campaign ad clicks to call`
   - `Smart campaign map clicks to call`
   - `Clicks to call`
   - `Local actions - Directions`
   - `Smart campaign map directions`
   - `Calls from Smart Campaign Ads`
3. **NÃO mexer em:**
   - `Reservar horário` (manter ativa como secundária)
   - `WhatsApp Click` (recém-criada, principal)

### 1.6 Definir meta primária da conta
1. Ainda em **Medição → Conversões** → aba **Metas** (ou "Resumo")
2. Configurar **WhatsApp Click** como ação primária da conta
3. `Reservar horário` → secundária

---

## FASE 2 — Lista de Negativas (Dia 2, ~10 min)

### 2.1 Criar lista compartilhada
1. **⚙️ Ferramentas** → **Biblioteca compartilhada** → **Listas de palavras-chave negativas**
2. Clicar **+ Nova lista**
3. Nome: `Negativas Dr. Diomar`
4. No campo "Adicionar palavras-chave negativas", colar **EXATAMENTE** o bloco abaixo (uma por linha, respeitando aspas e colchetes):

```
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
"10kg em 7 dias"
"10kg em 10 dias"
"5 quilos em uma semana"
"emagrecer em 3 dias"
"emagrecer rápido 1 semana"
"perder peso em 1 dia"
"3 dias sem comer"
"treino para"
"exercício para"
"exercícios para"
"treino em casa"
"exercício em casa"
"musculação para"
"academia para"
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
"dr renan botelho"
"dr corassa"
"dr turi souza"
"nutri inteligente"
aplicativo
"app para emagrecer"
smartwatch
```

5. Clicar **Salvar**
6. **NÃO aplicar a campanhas ainda** (as campanhas ainda não existem). Será aplicado automaticamente em cada campanha nova na Fase 4-6.

---

## FASE 3 — Extensões no nível da Conta (Dia 2, ~15 min)

### 3.1 Sitelinks (4)
1. Menu lateral → **Anúncios e recursos** → **Recursos** (aba superior)
2. Botão **+** (azul) → **Sitelink**
3. Nível: **Conta**
4. Criar **4 sitelinks** (um de cada vez):

**Sitelink 1:**
- Texto: `Emagrecimento Científico`
- Descrição 1: `Protocolo personalizado`
- Descrição 2: `Resultados em semanas`
- URL final: `https://drdiomarcangussu.com.br/#protocols`

**Sitelink 2:**
- Texto: `Implantes Hormonais`
- Descrição 1: `Mais energia e disposição`
- Descrição 2: `Procedimento rápido`
- URL final: `https://drdiomarcangussu.com.br/#protocols`

**Sitelink 3:**
- Texto: `Onde Atendemos`
- Descrição 1: `Brasília de Minas`
- Descrição 2: `Varzelândia e região`
- URL final: `https://drdiomarcangussu.com.br/#hubs`

**Sitelink 4:**
- Texto: `Agendar pelo WhatsApp`
- Descrição 1: `Resposta em até 2 horas`
- Descrição 2: `Avaliação inicial`
- URL final: `https://drdiomarcangussu.com.br`

### 3.2 Frases de destaque (Callouts)
1. **+** → **Frases de destaque** → Nível: **Conta**
2. Adicionar as 6 frases (uma por linha):
```
+2.000 Pacientes Atendidos
Avaliação Inicial
Parcelamento Disponível
Acompanhamento por WhatsApp
CRM 60.143 MG
Resultados em 30 Dias
```
⚠️ **Nota:** não usar "Avaliação Gratuita" — risco de política médica. Usamos "Avaliação Inicial".

### 3.3 Snippets estruturados
1. **+** → **Snippets estruturados** → Nível: **Conta**
2. Cabeçalho: **Serviços**
3. Valores (um por linha):
```
Emagrecimento
Implantes Hormonais
Longevidade
Bioimpedância
Soroterapia
Check-up Metabólico
```

### 3.4 Extensão de Chamada
1. **+** → **Chamadas** → Nível: **Conta**
2. País: **Brasil**
3. Número: `38 99826-9290`
4. ✅ Marcar **Mostrar esse recurso apenas em dispositivos móveis**

### 3.5 Extensão de Local
1. **+** → **Locais** → Nível: **Conta**
2. Se houver Google Meu Negócio vinculado → selecionar a conta
3. Se não → pular (o usuário precisa configurar GMN depois)

---

## FASE 4 — Campanha 1: Emagrecimento (Dia 3, ~15 min)

### 4.1 Criar campanha
1. Menu **Campanhas** → **+** → **Nova campanha**
2. **Meta:** Leads
3. **Tipo de campanha:** Pesquisa
4. **Formas de conversão:** marcar apenas **Visita ao site** (desmarcar "Chamadas" aqui — temos a extensão global)
5. Campo URL: `https://drdiomarcangussu.com.br`
6. **Nome da campanha:** `[Search] Emagrecimento — Norte MG`
7. Clicar **Continuar**

### 4.2 Configurações de lance
- Em "Do que você quer se concentrar?" → selecionar **Cliques**
- ✅ Marcar **Definir um lance de custo máximo por clique**
- Limite de lance de CPC máx: **R$ 4,00**

### 4.3 Configurações de campanha
| Campo | Valor |
|---|---|
| **Redes → Rede de Pesquisa** | ✅ Marcado |
| **Redes → Parceiros de pesquisa do Google** | ❌ **DESMARCAR** |
| **Redes → Rede de Display** | ❌ **DESMARCAR** |
| **Locais** | Escolher "Inserir outro local" → adicionar: **Brasília de Minas, MG** (raio 50km) + **Varzelândia, MG** (raio 50km) |
| **Opções de local (avançado)** | **Presença: pessoas nos locais específicos** (NÃO "interesse nos locais") |
| **Idiomas** | Português |
| **Segmentos por público** | Deixar em branco (Observação, não Segmentação) |
| **Expansão automática de URL** | ❌ **DESMARCAR** |
| **Orçamento médio diário** | **R$ 15,00** |

### 4.4 Programação de anúncios
1. Expandir **Programação de anúncios**
2. Configurar:
   - Segunda a Sexta: 06:00 – 22:00
   - Sábado: 06:00 – 22:00
   - Domingo: ❌ (não rodar)

### 4.5 Aplicar lista de negativas
1. Expandir **Palavras-chave negativas** (dentro das configurações da campanha) → **Usar lista de palavras-chave negativas** → selecionar `Negativas Dr. Diomar`

### 4.6 Grupo de anúncios 1: `Emagrecimento - Intenção Alta`
1. Clicar **Próxima** → tela de Grupo de anúncios
2. Nome: `Emagrecimento - Intenção Alta`
3. Lance padrão: deixar automático (vai seguir o CPC máx da campanha)
4. Campo "Inserir ou colar palavras-chave" → colar EXATAMENTE:
```
"médico para emagrecer"
"clínica de emagrecimento"
"tratamento para emagrecer"
"emagrecer com médico"
"protocolo de emagrecimento"
"emagrecer com acompanhamento médico"
[nutrólogo perto de mim]
[nutrólogo brasília de minas]
[médico emagrecimento]
[clínica emagrecimento norte de minas]
```

### 4.7 Criar RSA (Anúncio Responsivo de Pesquisa) do Grupo 1
1. Clicar **Próxima** → tela de Anúncio
2. **URL final:** `https://drdiomarcangussu.com.br`
3. **Caminho de exibição 1:** `emagrecimento`
4. **Caminho de exibição 2:** (vazio)
5. **Títulos (adicionar os 15 abaixo, um por campo):**

| # | Título | Pin |
|---|---|---|
| 1 | Emagreça de Verdade com Protocolo Médico | Posição 1 |
| 2 | Dr. Diomar — Especialista em Emagrecimento | Posição 1 |
| 3 | Perca Peso Sem Dietas Restritivas | — |
| 4 | Resultados Visíveis em 30 Dias | — |
| 5 | Agende Sua Avaliação Agora | Posição 2 |
| 6 | Brasília de Minas e Varzelândia | Posição 3 |
| 7 | +2.000 Pacientes Atendidos | — |
| 8 | Sem Efeito Sanfona — Método Científico | — |
| 9 | Emagrecimento com Acompanhamento Médico | — |
| 10 | Agende pelo WhatsApp — Resposta Rápida | Posição 2 |
| 11 | Protocolo Personalizado para Você | — |
| 12 | CRM 60.143 MG — Atendimento Humanizado | — |
| 13 | Perto de Você — Norte de Minas | Posição 3 |
| 14 | Chega de Dietas que Não Funcionam | — |
| 15 | Exames + Plano Individual | — |

6. **Descrições (4):**

| # | Descrição |
|---|---|
| 1 | Protocolo médico personalizado com exames, nutrição e acompanhamento por WhatsApp. Resultados reais em semanas. Agende sua avaliação. |
| 2 | +2.000 pacientes atendidos em Brasília de Minas e Varzelândia. Emagrecimento científico sem dietas malucas. Agende hoje mesmo. |
| 3 | Médico especialista em emagrecimento e nutrologia. Atendimento particular com opção de parcelamento. Avaliação inicial sem compromisso. |
| 4 | Chega de efeito sanfona. Tratamento que trata a causa, não os sintomas. Bioimpedância e protocolo personalizado. |

7. Verificar que o **indicador de qualidade** (lateral direita) está em "Bom" ou "Excelente". Se estiver "Ruim", aguardar instrução do usuário antes de salvar.

### 4.8 Criar Grupo 2: `Emagrecimento - Intenção Média`
1. Após finalizar o Grupo 1, ir em **Grupos de anúncios** da campanha → **+ Novo grupo de anúncios**
2. Nome: `Emagrecimento - Intenção Média`
3. Keywords:
```
"como emagrecer de verdade"
"tratamento para obesidade"
"médico para perder peso"
"consulta para emagrecer"
"acompanhamento médico emagrecimento"
"emagrecer sem efeito sanfona"
```
4. Criar RSA idêntico ao do Grupo 1 (mesmos títulos e descrições)

### 4.9 Publicar campanha
1. Revisar resumo final
2. Clicar **Publicar campanha**
3. ⚠️ **Confirmar ao usuário antes de publicar.** Mostrar: "Vou publicar a Campanha 1 (Emagrecimento) com R$ 15/dia, 2 grupos, 16 keywords. OK?"

---

## FASE 5 — Campanha 3: Marca + Região (Dia 3, ~10 min)

### 5.1 Criar campanha
1. **+ Nova campanha** → Meta: **Leads** → Tipo: **Pesquisa**
2. Nome: `[Search] Marca + Região — Norte MG`
3. URL: `https://drdiomarcangussu.com.br`

### 5.2 Configurações
| Campo | Valor |
|---|---|
| Estratégia de lance | **Maximizar cliques** com CPC máx **R$ 2,00** |
| Redes Display/Parceiros | ❌ DESMARCAR ambos |
| Locais | Mesmas 2 regiões (50km) |
| Idiomas | Português |
| Orçamento diário | **R$ 3,00** |
| Programação | **Todos os dias** 06:00-22:00 |
| Expansão automática de URL | ❌ DESMARCAR |
| Lista de negativas | Aplicar `Negativas Dr. Diomar` |

### 5.3 Grupo 1: `Marca`
Keywords:
```
[dr diomar]
[dr diomar cangussu]
[doutor diomar]
[doutor diomar cangussu]
"dr diomar cangussu"
"dr diomar brasília de minas"
"dr diomar varzelândia"
```

### 5.4 Grupo 2: `Médico + Região`
Keywords:
```
"médico brasília de minas"
"nutrólogo brasília de minas"
"nutrólogo varzelândia"
"clínica médica brasília de minas"
"médico varzelândia"
"nutrologia norte de minas"
"médico nutrólogo norte de minas"
```

### 5.5 RSA (usar para ambos os grupos)

**Títulos (12):**
| # | Título |
|---|---|
| 1 | Dr. Diomar Cangussu — Nutrologista |
| 2 | Brasília de Minas e Varzelândia |
| 3 | Agende Sua Consulta Agora |
| 4 | +2.000 Pacientes Atendidos |
| 5 | Emagrecimento e Saúde Integrativa |
| 6 | CRM 60.143 MG — Pós em Nutrologia |
| 7 | Agende pelo WhatsApp |
| 8 | Atendimento Humanizado na Região |
| 9 | Referência em Saúde no Norte de MG |
| 10 | Resultados Reais Sem Efeito Sanfona |
| 11 | Seg a Sex 8h-18h |
| 12 | Parcelamento Disponível |

**Descrições (4):**
| # | Descrição |
|---|---|
| 1 | Médico nutrologista com +2.000 pacientes. Protocolos de emagrecimento, otimização e longevidade. Agende pelo WhatsApp. |
| 2 | Referência em emagrecimento e performance no Norte de Minas. Atendimento em Brasília de Minas e Varzelândia. |
| 3 | Especialista em protocolos de emagrecimento científico. Acompanhamento completo com exames e bioimpedância. |
| 4 | Atendimento particular com parcelamento. Brasília de Minas (Av. Rui Barbosa, 365) e Varzelândia (Rua Lucas Alkimin, 190). |

**URL final:** `https://drdiomarcangussu.com.br`

### 5.6 Publicar
Confirmar com usuário → **Publicar campanha**.

---

## ⏸ PAUSA — Aguardar validação (Dia 4-7)

Após Fase 4 e 5, **PARAR a execução** e aguardar 48-72h. Relatar ao usuário:

> "Campanhas 1 (Emagrecimento) e 3 (Marca) publicadas. Agora é esperar 48h para:
> 1. Confirmar que anúncios foram aprovados (verificar em **Anúncios** → coluna Status)
> 2. Validar que a conversão **WhatsApp Click** está sendo registrada (precisa aparecer status "Gravando conversões" em **Ferramentas → Conversões**)
> 3. Fazer primeiro passe em **Termos de pesquisa** e adicionar negativas novas
>
> Me chame de volta no **Dia 5** para revisar métricas e no **Dia 8** para criar a Campanha 2 (Implante Hormonal) com cuidado."

---

## FASE 6 — Campanha 2: Implante Hormonal (Dia 8, ~15 min)

### 6.1 Pré-checagem (OBRIGATÓRIA antes de criar)
Antes de criar a Campanha 2, verificar:
1. Campanha 1 acumulou ≥50 impressões? Se não, aguardar mais 48h.
2. Houve algum anúncio reprovado por política na Camp 1? Se sim, informar usuário antes de criar Camp 2.
3. Conversão WhatsApp Click está registrando? Se não, pausar tudo e debugar.

### 6.2 Criar campanha
1. **+ Nova campanha** → Meta: **Leads** → Tipo: **Pesquisa**
2. Nome: `[Search] Implante Hormonal — Norte MG`
3. URL: `https://drdiomarcangussu.com.br`

### 6.3 Configurações
| Campo | Valor |
|---|---|
| Estratégia de lance | **Maximizar cliques** com CPC máx **R$ 5,00** |
| Redes | Só Pesquisa (Display/Parceiros DESMARCADOS) |
| Locais | Mesmas 2 regiões (50km) |
| Idiomas | Português |
| Orçamento diário | ⚠️ **R$ 5,00** (teste — subir para R$ 8 só após aprovação) |
| Programação | Seg-Sáb 06:00-22:00 |
| Expansão automática de URL | ❌ DESMARCAR |
| Lista de negativas | Aplicar `Negativas Dr. Diomar` |

### 6.4 Grupo 1: `Implante Hormonal`
Keywords:
```
"implante hormonal"
"chip hormonal"
"reposição hormonal"
"implante hormonal feminino"
[implante hormonal perto de mim]
[implante hormonal norte de minas]
[reposição hormonal brasília de minas]
```

⚠️ **Removidas da versão original:** "implante hormonal masculino" e "implante testosterona" (alto risco de bloqueio por política).

### 6.5 Grupo 2: `Sintomas / Performance`
Keywords:
```
"tratamento fadiga crônica"
"falta de disposição médico"
"cansaço extremo tratamento"
"recuperar energia médico"
"médico performance norte de minas"
```

### 6.6 RSA (SEM termos proibidos)

**Títulos (15):**
| # | Título | Pin |
|---|---|---|
| 1 | Recupere Sua Energia e Disposição | Posição 1 |
| 2 | Dr. Diomar — Especialista em Performance | Posição 1 |
| 3 | Equilíbrio e Bem-Estar em até 30 Dias | — |
| 4 | +2.000 Pacientes — CRM 60.143 MG | — |
| 5 | Agende Avaliação — WhatsApp Direto | Posição 2 |
| 6 | Brasília de Minas e Varzelândia | Posição 3 |
| 7 | Tecnologia Absorvível e Moderna | — |
| 8 | Mais Energia para o Seu Dia a Dia | — |
| 9 | Avaliação com Exames Completos | — |
| 10 | Médico Especialista em Otimização | Posição 1 |
| 11 | Protocolo Individual — Agende Agora | Posição 2 |
| 12 | Chega de Fadiga e Cansaço | — |
| 13 | Norte de Minas — Perto de Você | Posição 3 |
| 14 | Acompanhamento Contínuo por WhatsApp | — |
| 15 | Procedimento Rápido — Mesmo Dia | — |

**⛔ PROIBIDO incluir nos títulos:** testosterona, estrogênio, libido, chip hormonal masculino, hormônio masculino, hormônio feminino, TRT, anabolizante.

**Descrições (4):**
| # | Descrição |
|---|---|
| 1 | Protocolo personalizado com acompanhamento médico contínuo. Procedimento rápido com anestesia local. Agende sua avaliação completa. |
| 2 | Cansaço, falta de disposição, dificuldade para manter peso? Avaliação médica completa com exames em Brasília de Minas e Varzelândia. |
| 3 | Médico especialista em otimização e bem-estar. Tecnologia moderna e segura. Resultados em até 30 dias. Parcelamento disponível. |
| 4 | Recupere sua energia com protocolo personalizado. +2.000 pacientes atendidos. Agende pelo WhatsApp hoje mesmo. |

### 6.7 Publicar e monitorar
1. Publicar (confirmar com usuário antes)
2. **Aguardar 24h** e verificar em **Anúncios** a coluna "Status":
   - ✅ Todos "Aprovados" → no **Dia 10**, subir orçamento para R$ 8/dia
   - ⚠️ Algum "Aprovado com limitações" → aceitável, manter R$ 5/dia por 1 semana
   - ⛔ Mais de 20% "Reprovados" → **pausar campanha**, relatar ao usuário e realocar orçamento pra Campanha 1

---

## FASE 7 — Checklist Final (Dia 3 + Dia 8)

### Após Fase 5 (Dia 3):
- [ ] Verificação do anunciante OK ou em andamento
- [ ] Leads-Search-1 pausada
- [ ] Smart Campaign removida
- [ ] Conversão WhatsApp Click criada (nativa Ads, não GA4)
- [ ] 6 conversões Smart/Google-hosted removidas das metas
- [ ] Lista Negativas Dr. Diomar criada
- [ ] 4 sitelinks + 6 callouts + snippets + chamada criados em nível de conta
- [ ] Campanha 1 (Emagrecimento) publicada — 2 grupos, 16 kw, RSA aprovado
- [ ] Campanha 3 (Marca) publicada — 2 grupos, 14 kw, RSA aprovado
- [ ] Display e Parceiros DESMARCADOS em todas
- [ ] Expansão automática de URL DESMARCADA em todas
- [ ] Lista de negativas aplicada nas 2 campanhas
- [ ] Budget total rodando: R$ 15 + R$ 3 = R$ 18/dia

### Após Fase 6 (Dia 8):
- [ ] Campanha 2 (Implante) publicada com R$ 5/dia teste
- [ ] Todos os anúncios revisados — nenhum com termos proibidos
- [ ] Budget total: R$ 15 + R$ 3 + R$ 5 = R$ 23/dia (reserva R$ 3)

### Após Dia 10:
- [ ] Se Camp 2 aprovada → subir para R$ 8/dia
- [ ] Budget final: R$ 26/dia = R$ 800/mês ✅

---

## Manutenção Semanal (pós-lançamento)

| Dia da semana | Tarefa | Tempo |
|---|---|---|
| **Segunda** | Relatório de termos de pesquisa (7d) → adicionar novas negativas | 15 min |
| **Quarta** | Verificar CTR por keyword → pausar <1% CTR + 0 conv após 100 impressões | 10 min |
| **Sexta** | Comparar CPA por campanha → realocar budget se uma estiver >50% mais eficiente | 10 min |

### Marcos de evolução:
- **Semana 3:** Se mobile >70% do tráfego → ajuste +20% lance mobile
- **Semana 5-6:** Se Camp 1 ≥20 conv WhatsApp → migrar de **Max Clicks** para **Max Conversões**
- **Mês 2:** Se Max Conv estabilizou ≥15 conv/semana → testar **CPA Desejado R$ 25**
- **Mês 3:** Considerar criar LPs dedicadas (`/emagrecimento`, `/implante-hormonal`) para dobrar taxa de conversão

---

## 🚨 Regras de Segurança para o Agente

1. **NUNCA** publicar uma campanha sem confirmação explícita do usuário.
2. **NUNCA** mudar o orçamento de uma campanha já rodando sem confirmação.
3. **NUNCA** ativar Display Network ou Parceiros de Pesquisa — deve ficar sempre desmarcado.
4. **NUNCA** usar os termos proibidos na Fase 6.6 em qualquer anúncio.
5. Se a UI do Google Ads mostrar alerta amarelo/vermelho antes de salvar → **parar, descrever o alerta, aguardar instrução**.
6. Se o sistema sugerir "Recomendações" automáticas (optimization score) → **ignorar todas** — o plano é o que manda.
7. Se uma keyword for marcada "Baixo volume de pesquisas" → **deixar ativa** (pode voltar a ter volume).
8. Se o Google pedir para aceitar "Correspondência ampla em vez de frase" → **recusar sempre**.
