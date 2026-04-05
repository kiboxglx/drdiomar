# 📋 Passo-a-Passo — Implementação no Google Ads

Guia para implementar todas as mudanças via interface do Google Ads.
Siga na ordem. Tempo estimado: 45-60 minutos.

---

## FASE 1: Limpeza (15 min)

### 1.1 Resolver verificação do anunciante
1. Google Ads → ⚙️ **Configurações e faturamento** → **Verificação do anunciante**
2. Siga o processo de verificação (pode pedir documento, CNPJ, etc.)
3. Sem isso, NADA vai rodar

### 1.2 Pausar campanhas atuais
1. Vá em **Campanhas** no menu lateral
2. `Leads-Search-1` → clique no botão verde de status → **Pausar**
3. `Serviços Médicos Alternativos` → já está pausada, pode **Remover** (excluir)

### 1.3 Criar lista de palavras-chave negativas
1. **Ferramentas** (🔧) → **Biblioteca compartilhada** → **Listas de palavras-chave negativas**
2. Clique **+** → Nome: `Negativas Dr. Diomar`
3. Cole TODAS as palavras abaixo (uma por linha):

```
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
nutricionista online
teleconsulta
online
ead
a distância
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
são paulo
rio de janeiro
belo horizonte
curitiba
brasília df
goiânia
salvador
recife
fortaleza
o que é
o que faz
quanto ganha
como ser
diferença entre
wikipedia
significado
pdf
download
youtube
vídeo
diy
secar pochete
coco
canela
chá verde
vinagre
limão
remédio caseiro
simpatia
frequência
3 dias sem comer
10kg em 7 dias
10kg em 10 dias
```

4. **Salvar**
5. Clique em **Aplicar a campanhas** → selecione TODAS as campanhas que criar

### 1.4 Limpar ações de conversão
1. **Ferramentas** → **Medição** → **Conversões**
2. Para cada uma destas, clique → **Editar configurações** → desmarque "Incluir em conversões":
   - Smart campaign ad clicks to call
   - Smart campaign map clicks to call
   - Clicks to call
   - Local actions - Directions
   - Smart campaign map directions
   - Calls from Smart Campaign Ads
3. **Manter ativa:** "Reservar horário" (GA4)

---

## FASE 2: Extensões de Anúncio (10 min)

Criar no **nível da conta** para que todas as campanhas usem.

### 2.1 Sitelinks
1. **Anúncios e recursos** → **Recursos** → **+** → **Sitelink**
2. Nível: **Conta**
3. Criar 4 sitelinks:

| Texto do link | Descrição linha 1 | Descrição linha 2 | URL final |
|---|---|---|---|
| Emagrecimento Científico | Protocolo personalizado | Resultados em semanas | https://drdiomarcangussu.com.br/#protocols |
| Implantes Hormonais | Mais energia e disposição | Procedimento rápido | https://drdiomarcangussu.com.br/#protocols |
| Onde Atendemos | Brasília de Minas | Varzelândia e região | https://drdiomarcangussu.com.br/#hubs |
| Agendar pelo WhatsApp | Resposta em até 2 horas | Avaliação gratuita | https://drdiomarcangussu.com.br |

### 2.2 Callouts (Frases de destaque)
1. **+** → **Frase de destaque** → Nível: **Conta**
2. Criar 6:
   - `+2.000 Pacientes Atendidos`
   - `Avaliação Gratuita`
   - `Parcelamento Disponível`
   - `Acompanhamento por WhatsApp`
   - `CRM 60.143 MG`
   - `Resultados em 30 Dias`

### 2.3 Snippets Estruturados
1. **+** → **Snippet estruturado** → Nível: **Conta**
2. Cabeçalho: **Serviços**
3. Valores: `Emagrecimento`, `Implantes Hormonais`, `Longevidade`, `Bioimpedância`, `Soroterapia`, `Check-up Metabólico`

### 2.4 Extensão de Chamada
1. **+** → **Chamada** → Nível: **Conta**
2. Telefone: `(38) 99826-9295`
3. ✅ Mostrar somente em dispositivos móveis

---

## FASE 3: Campanha 1 — Emagrecimento (10 min)

1. **Campanhas** → **+** → **Nova campanha**
2. Meta: **Leads**
3. Tipo: **Pesquisa** (Search)
4. Nome: `[Search] Emagrecimento — Norte MG`

### Configurações:
| Campo | Valor |
|-------|-------|
| Redes | ❌ DESMARCAR "Rede de Display" e "Parceiros de pesquisa" |
| Localização | Adicionar as mesmas 2 regiões (50km de cada hub) |
| Idiomas | Português |
| Estratégia de lance | Maximizar conversões |
| Orçamento | R$ 15,00/dia |
| Programação | Seg-Sáb, 6h-22h |

### Grupo 1: `Emagrecimento — Intenção Alta`
Adicione estas keywords (escolha "Correspondência de frase" para cada):
```
"médico para emagrecer"
"clínica de emagrecimento"
"tratamento para emagrecer"
"emagrecer com médico"
"protocolo de emagrecimento"
"emagrecer rápido com acompanhamento"
```

E estas em correspondência exata:
```
[nutrólogo perto de mim]
[nutrólogo brasília de minas]
[médico emagrecimento]
[clínica emagrecimento norte de minas]
```

### Anúncio RSA:
Copie os 15 títulos e 4 descrições do arquivo `PLANO-CAMPANHAS.md` seção "Campanha 1".

URL final: `https://drdiomarcangussu.com.br`
Caminho de exibição 1: `emagrecimento`

### Grupo 2: `Emagrecimento — Intenção Média`
Crie um segundo grupo com:
```
"como emagrecer de verdade"
"tratamento para obesidade"
"médico para perder peso"
"consulta para emagrecer"
"acompanhamento médico emagrecimento"
"emagrecer sem efeito sanfona"
```

Copie o mesmo RSA (ou crie variação).

---

## FASE 4: Campanha 2 — Implante Hormonal (10 min)

1. **+** → **Nova campanha** → **Leads** → **Pesquisa**
2. Nome: `[Search] Implante Hormonal — Norte MG`

| Campo | Valor |
|-------|-------|
| Redes | ❌ DESMARCAR Display e Parceiros |
| Localização | Mesmas 2 regiões |
| Estratégia | Maximizar cliques (CPC máx R$ 5,00) |
| Orçamento | R$ 8,00/dia |
| Programação | Seg-Sáb, 6h-22h |

### Grupo 1: `Implante Hormonal`
```
"implante hormonal"
"chip hormonal"
"reposição hormonal"
"implante hormonal masculino"
"implante hormonal feminino"
"implante testosterona"
```

Exatas:
```
[implante hormonal perto de mim]
[implante hormonal norte de minas]
[reposição hormonal brasília de minas]
```

### Grupo 2: `Sintomas Hormonais`
```
"tratamento fadiga crônica"
"perda de libido tratamento"
"falta de disposição médico"
"ganhar massa muscular médico"
"testosterona baixa tratamento"
```

### RSA: Copie títulos e descrições do `PLANO-CAMPANHAS.md` seção "Campanha 2".

---

## FASE 5: Campanha 3 — Marca + Região (5 min)

1. **+** → **Nova campanha** → **Leads** → **Pesquisa**
2. Nome: `[Search] Marca + Região — Norte MG`

| Campo | Valor |
|-------|-------|
| Redes | ❌ DESMARCAR Display e Parceiros |
| Localização | Mesmas 2 regiões |
| Estratégia | Maximizar cliques (CPC máx R$ 2,00) |
| Orçamento | R$ 3,00/dia |
| Programação | Todos os dias, 6h-22h |

### Grupo 1: `Marca`
```
[dr diomar]
[dr diomar cangussu]
[doutor diomar]
"dr diomar cangussu"
"dr diomar brasília de minas"
"dr diomar varzelândia"
```

### Grupo 2: `Médico + Região`
```
"médico brasília de minas"
"nutrólogo brasília de minas"
"nutrólogo varzelândia"
"clínica médica brasília de minas"
"médico varzelândia"
"nutrologia norte de minas"
```

### RSA: Copie títulos e descrições do `PLANO-CAMPANHAS.md` seção "Campanha 3".

---

## FASE 6: Verificação Final (5 min)

- [ ] Verificação do anunciante concluída
- [ ] Campanhas antigas pausadas/removidas
- [ ] Lista de negativas criada e aplicada às 3 campanhas novas
- [ ] Conversões de Smart Campaign removidas das metas
- [ ] 4 sitelinks criados no nível da conta
- [ ] 6 callouts criados
- [ ] Snippet estruturado criado (Serviços)
- [ ] Extensão de chamada criada
- [ ] Campanha 1 (Emagrecimento) ativa com 2 grupos + RSA
- [ ] Campanha 2 (Implante) ativa com 2 grupos + RSA
- [ ] Campanha 3 (Marca) ativa com 2 grupos + RSA
- [ ] Display DESMARCADO em todas as campanhas
- [ ] Parceiros de pesquisa DESMARCADOS em todas
- [ ] Programação Seg-Sáb 6h-22h em todas (exceto Marca = todos os dias)
- [ ] Budget total: R$ 15 + R$ 8 + R$ 3 = R$ 26/dia

---

## Manutenção Semanal (pós-lançamento)

| Dia | Tarefa |
|-----|--------|
| **Seg** | Revisar termos de pesquisa → adicionar negativas |
| **Qua** | Verificar CTR por keyword → pausar < 1% CTR sem conversões |
| **Sex** | Verificar CPA por campanha → realocar budget se necessário |
| **Semana 3** | Ajuste +20% lance mobile se dados confirmarem |
| **Mês 2** | Migrar Emagrecimento para CPA desejado R$ 25 (se >20 conv) |
