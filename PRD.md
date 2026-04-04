# PRD — Otimização de UX/UI e Conversão
## Landing Page Dr. Diomar Cangussu

**Versão:** 1.0  
**Data:** Abril 2026  
**Objetivo:** Polir a experiência visual, alinhar gatilhos psicológicos e maximizar conversões (agendamentos via WhatsApp).  
**Filosofia de Design:** Mobile-First — toda decisão parte do celular Android com 4G instável.

---

## 1. Contexto e Diagnóstico

### 1.1 O que existe hoje

Landing page em Next.js 16 + React 19 + Tailwind 4 + Framer Motion. Fluxo de seções:

```
Navbar → Hero → Problemas → Método → Protocolos → Resultados → Especialista → Depoimentos → CTA Final → FAQ → Footer
```

**Assets disponíveis:** logo, foto hero (dr-hero.png), foto especialista (dr-specialist.png), vídeo de fundo (hero-bg.mp4), poster (bg-hero.webp).

### 1.2 Realidade do Público — Por que Mobile-First é Obrigatório

| Dado | Implicação |
|---|---|
| Público: Norte de Minas, cidades pequenas | **70-80% acessa via celular** (Android, tela 360-412px) |
| Conexão: 4G instável, muitas áreas com 3G | **Página precisa carregar em < 3s** ou perde o visitante |
| Origem: Instagram Stories/Reels → clique no link | **Chega em modo retrato, polegar na parte inferior da tela** |
| Letramento digital: médio-baixo | **Botões grandes, linguagem simples, fluxo óbvio** |
| Contexto de uso: fila do banco, intervalo do trabalho | **Decisão rápida — se não convencer em 2 telas, perdeu** |

**Regra de ouro:** se funciona bem num Samsung Galaxy A14 com 4G em Brasília de Minas, funciona em qualquer lugar.

### 1.3 Problemas Identificados

#### Performance (Crítico — Mobile sofre mais)
| Problema | Impacto Mobile |
|---|---|
| `dr-hero.png` com **2.6MB** sem compressão | **LCP > 8s em 4G** — visitante fecha antes de ver |
| `dr-specialist.png` com **421KB** | Imagem pesada carregada antes de scroll chegar |
| `logo-diomar.png` com **177KB** (PNG) | Deveria ser SVG ou WebP (~20KB) |
| Vídeo duplicado no Hero (mobile + desktop) | Payload dobrado — **mobile carrega vídeo que nunca precisava** |
| Framer Motion em todas as seções | **Bundle JS pesado no primeiro paint** — delays interatividade |

#### UX / Fluxo Psicológico
| Problema | Impacto na Conversão |
|---|---|
| Hero não tem prova social imediata | Visitante não confia nos primeiros 3 segundos |
| **6 seções antes do CTA final** — funil longo demais | Em mobile = **18+ scrolls** até poder agendar |
| Nenhum CTA entre Hero e seção final | Quem se convenceu na seção 2 **não tem onde clicar** |
| Componente `Locations` existe mas NÃO está na página | Visitantes locais não se veem representados |
| FAQ com apenas 4 perguntas | Não trata objeções críticas (dói? quanto custa? parcela?) |
| Depoimentos sem foto, sem verificação | Parecem fabricados — reduz confiança |
| Seção "Resultados" repete dados da "Especialista" | Redundância dilui impacto |
| Footer com CNPJ placeholder `00.000.000/0001-00` | Sinal de página fake — destrói confiança |

#### UI / Mobile-Specific Issues
| Problema | Impacto Mobile |
|---|---|
| Cards de Protocolos empilhados = **3 telas de scroll** | Fadiga, abandono antes de ver todos |
| 6 Depoimentos em grid = **6 telas de scroll** | Ninguém lê todos |
| Botões com `hover:scale-105` | **Hover não existe em touch** — efeito desperdiçado |
| Padding `py-20 md:py-28` em TODAS as seções | **Espaço vazio excessivo** em telas pequenas |
| Sem barra de ação fixa no bottom | **Polegar não alcança** o CTA do hero depois de scrollar |
| WhatsApp flutuante com ping infinito | **Distrai** e compete com conteúdo em tela pequena |
| Textos com `text-lg md:text-xl` em mobile | Parágrafos longos ocupam tela inteira |
| Seção Method com `gap-7` entre steps | Espaçamento generoso demais em mobile |
| Hero image `h-[65vh]` em mobile | Imagem ocupa 65% da tela, empurra conteúdo para baixo |

#### Consistência Visual
| Problema | Detalhe |
|---|---|
| Cor de acento inconsistente | Hero usa `stone-300/400`, restante usa `wheat-500` |
| CTA buttons com 4+ estilos | `rounded-full`, `rounded-lg`, `rounded-xl` misturados |
| Sem hierarquia de botões | Primário, secundário e terciário se confundem |
| Seções alternam `slate-950` e `slate-900` sem contraste | Seções se fundem — sem separação visual |

#### Psicologia de Conversão
| Ausência | Princípio Violado |
|---|---|
| Sem antes/depois visual | **Prova de transformação** — gatilho #1 em saúde |
| Sem urgência real | **Escassez** — "vagas limitadas" é genérico |
| Sem âncora de preço | **Ancoragem** — visitante não sabe se é R$200 ou R$2000 |
| Depoimentos todos 5 estrelas | **Efeito Pratfall** — perfeição gera desconfiança |
| Sem reciprocidade | Nenhum conteúdo gratuito oferecido |

---

## 2. Público-Alvo

### Persona Primária: Mulher, 28-50 anos, Norte de Minas
- **Dispositivo:** Samsung Galaxy A14 / Moto G (360-412px, Android)
- **Conexão:** 4G instável, às vezes 3G
- **Origem:** Instagram Stories/Reels do Dr. Diomar ou Google Ads mobile
- **Contexto:** vendo o celular rapidamente, pouca paciência
- **Medo:** gastar dinheiro e não ver resultado (já tentou dietas)
- **Gatilho:** ver resultado de alguém parecida, da mesma cidade

### Persona Secundária: Homem, 30-55 anos
- Busca implante hormonal, ganho de massa, performance
- Mais objetivo — quer saber o quê, quanto, e agendar
- **Gatilho:** credenciais do médico + resultados mensuráveis

---

## 3. Objetivos Mensuráveis

| Métrica | Atual (estimado) | Meta |
|---|---|---|
| LCP mobile (4G) | > 6s | **< 2.5s** |
| LCP desktop | > 4s | **< 1.5s** |
| Peso total first load | ~3.2MB | **< 600KB mobile** |
| Taxa de clique no WhatsApp | ~2-4% | **6-8%** |
| Scroll depth (mobile) | ~30% | **65%+** |
| Scroll depth (desktop) | ~45% | **75%+** |
| Bounce rate mobile | ~70% | **< 50%** |
| Bounce rate desktop | ~50% | **< 40%** |
| Tempo na página | ~45s | **90s+** |

---

## 4. Princípios Mobile-First

### 4.1 Regras de Design

```
1. THUMB ZONE FIRST
   Todo CTA, botão e interação primária deve estar
   na zona do polegar (metade inferior da tela).
   
   ┌─────────────┐
   │  Hard to     │  ← Informação, headings
   │  reach       │
   ├─────────────┤
   │  Easy to     │  ← CTAs, botões, interações
   │  reach       │
   │  🫰 THUMB    │
   └─────────────┘

2. CONTENT DENSITY OVER WHITESPACE
   Em mobile, espaço é premium. Cada pixel deve justificar
   sua existência. Padding vertical reduzido. Sem gaps gigantes.
   
   Desktop: py-28 gap-8
   Mobile:  py-12 gap-4

3. ONE SCREEN = ONE MESSAGE
   Cada viewport mobile (667px de altura) deve comunicar
   UMA ideia completa + um CTA visível. Se o visitante
   para de scrollar ali, entendeu algo e pode agir.

4. PROGRESSIVE DISCLOSURE
   Não mostrar tudo de uma vez. Carousels > grids.
   Accordions > listas longas. Cards colapsáveis > paredes de texto.

5. TOUCH TARGETS
   Mínimo 48x48px para qualquer elemento clicável.
   Espaço entre targets: mínimo 8px.
   
6. PERFORMANCE IS UX
   Em 4G instável, 1 segundo de delay = 7% perda de conversão.
   Imagens em WebP, lazy load agressivo, JS mínimo no first paint.
```

### 4.2 Breakpoints

```
Mobile:  < 640px  (default — onde tudo começa)
Tablet:  640-1024px (sm/md)
Desktop: > 1024px (lg+)
```

### 4.3 Mobile Touch Patterns

| Padrão | Onde usar |
|---|---|
| **Swipe horizontal** | Carousel de depoimentos, protocolos |
| **Tap to expand** | FAQ accordion, cards de protocolo |
| **Scroll snap** | Seções de depoimento, antes/depois |
| **Pull-to-action** | (não — comportamento nativo do browser) |
| **Sticky bottom bar** | CTA WhatsApp fixo no bottom |
| **Scroll-triggered** | Animações leves de fade-in |

---

## 5. Estratégia Psicológica — Fluxo PASTOR

```
Mobile: cada "bloco" = 1-2 scrolls máximo

┌─────────────────────────────────────────────────────┐
│  NAVBAR — Fixo, compacto, CTA visível               │
│  Mobile: logo menor + hamburger + CTA pill           │
├─────────────────────────────────────────────────────┤
│  HERO — Promessa + Prova Social + CTA               │  ← PROBLEM
│  Mobile: imagem menor, texto primeiro, CTA na        │
│  thumb zone, prova social como barra horizontal      │
├─────────────────────────────────────────────────────┤
│  PROBLEMAS — Identificação emocional                 │  ← AMPLIFY
│  Mobile: 2 colunas compactas ou stacked cards        │
├─────────────────────────────────────────────────────┤
│  🆕 INLINE CTA — Captura rápida                     │  ← CATCH EARLY
│  Mobile: full-width banner, botão grande             │
├─────────────────────────────────────────────────────┤
│  MÉTODO — 3 passos                                   │  ← STORY
│  Mobile: timeline vertical compacta                  │
├─────────────────────────────────────────────────────┤
│  RESULTADOS — Stats em faixa                         │  ← PROOF
│  Mobile: 2x2 grid compacto                           │
├─────────────────────────────────────────────────────┤
│  PROTOCOLOS — Oferta                                 │  ← OFFER
│  Mobile: carousel horizontal com snap                │
├─────────────────────────────────────────────────────┤
│  🆕 TRANSFORMAÇÕES — Resultados reais                │  ← TRANSFORMATION
│  Mobile: carousel horizontal                         │
├─────────────────────────────────────────────────────┤
│  ESPECIALISTA — Autoridade                           │  ← AUTHORITY
│  Mobile: foto acima, credenciais em lista            │
├─────────────────────────────────────────────────────┤
│  DEPOIMENTOS — Prova social                          │  ← SOCIAL PROOF
│  Mobile: carousel horizontal com snap                │
├─────────────────────────────────────────────────────┤
│  LOCAIS — Proximidade (reativar)                     │  ← PROXIMITY
│  Mobile: cards stacked com tap-to-expand             │
├─────────────────────────────────────────────────────┤
│  FAQ — Objeções (expandido)                          │  ← OBJECTIONS
│  Mobile: accordion nativo, categorizado              │
├─────────────────────────────────────────────────────┤
│  CTA FINAL — Urgência + ação                         │  ← RESPONSE
│  Mobile: card simplificado, 1 botão dominante        │
├─────────────────────────────────────────────────────┤
│  FOOTER — Completo, CNPJ real                        │
├─────────────────────────────────────────────────────┤
│  🆕 MOBILE BOTTOM BAR — CTA fixo (mobile only)      │
│  WhatsApp Flutuante — Desktop only ou acima da bar   │
└─────────────────────────────────────────────────────┘
```

---

## 6. Especificações por Componente

### 6.1 Navbar

**Mobile (prioridade):**
- [ ] Layout: `[Logo compacto] [═══] [CTA pill]`
- [ ] Logo reduzido: max `h-10 w-40` (mobile) vs `h-16 w-64` (desktop)
- [ ] Hamburger menu → drawer full-screen com links + CTA grande no bottom
- [ ] CTA pill: `"Agendar"` (texto curto) com `bg-wheat-500 rounded-full px-4 py-2 text-sm`
- [ ] Transição scroll: `py-4 → py-2` com logo shrink suave
- [ ] **Sem links de navegação visíveis** em mobile — só hamburger + CTA

**Desktop:**
- [ ] Manter estrutura atual com 3 links + CTA
- [ ] Adicionar active state via Intersection Observer (highlight sutil na seção visível)
- [ ] Padronizar CTA para estilo global wheat-500

**Ambos:**
- [ ] Unificar cor de CTA: `stone-300` → `wheat-500`

---

### 6.2 Hero

**Mobile (prioridade):**
- [ ] **Ordem invertida**: Texto primeiro, imagem depois (texto é o que convence, não a foto)
- [ ] **Reduzir imagem**: `h-[65vh]` → `h-[40vh]` em mobile, com mask-gradient mais agressivo
- [ ] **Prova social como barra horizontal** logo abaixo do headline:
  ```
  +2.000 pacientes · 2 unidades · CRM 60.143
  ```
  (font `text-xs`, inline, sem ícones em mobile — economia de espaço)
- [ ] **CTA único e grande**: botão full-width na thumb zone
  ```
  [📱 Agendar Minha Avaliação] ← full-width, py-4, text-lg
  ```
- [ ] **Remover CTA secundário** ("Conhecer Protocolos") — dispersa o foco em tela pequena
- [ ] **Remover vídeo em mobile** — usar apenas poster estático (bg-hero.webp)
  - Economia de ~2-5MB de dados
  - Vídeo em mobile com autoplay gasta bateria e dados do usuário
- [ ] **Badge mais curto**: "Emagrecimento + Implantes" em vez de "Medicina de Alta Performance"

**Desktop:**
- [ ] Manter layout 2 colunas (texto | imagem)
- [ ] Vídeo de fundo apenas em desktop (uma única tag `<video>`)
- [ ] Prova social com ícones (como os trust badges atuais, mas mais proeminentes)
- [ ] 2 CTAs OK em desktop (mais espaço)

**Copy (ambos):**
- [ ] Headline: "Emagreça com Ciência, Não com Sofrimento." → **"Emagreça de Verdade — Sem Dietas Malucas, Sem Efeito Sanfona."**
- [ ] Sub: enfatizar "resultados em X semanas" + "acompanhamento via WhatsApp"

**Performance:**
- [ ] `dr-hero.png` → WebP, max **150KB** (quality 75-80)
- [ ] `srcSet` com versão mobile (640w) e desktop (1280w)
- [ ] `fetchPriority="high"` + `sizes` corretos

---

### 6.3 ProblemSection

**Mobile:**
- [ ] **Grid 1 coluna** (não 2) — cards são longos demais lado a lado em 360px
- [ ] **Padding reduzido**: `p-7` → `p-5` em mobile
- [ ] **Ícones menores**: `w-12 h-12` → `w-10 h-10` em mobile
- [ ] **Bridge final mais curto**: 2 linhas máximo, sem `<br>` escondidos

**Desktop:**
- [ ] Manter grid 2x2
- [ ] Destacar "Peso que não sai" com borda wheat (é o problema mais comum)

**Ambos:**
- [ ] Simplificar bridge: "Se marcou pelo menos 1 → o problema não é você. É o método."
- [ ] Tom mais empático e menos clínico

---

### 6.4 🆕 InlineCTA (Novo Componente)

**Justificativa:** Em mobile, após a seção de problemas o visitante scrollou ~4 telas. Se está convencido, precisa de um CTA AGORA — não daqui a 12 telas.

**Mobile:**
```
┌──────────────────────────────┐
│  Já se identificou?          │
│  Fale com a gente agora.     │
│                              │
│  [📱 Agendar via WhatsApp]   │  ← full-width, verde, grande
│                              │
│  Resposta em até 2h          │
└──────────────────────────────┘
```
- [ ] Componente `InlineCTA.tsx`
- [ ] Background: gradiente sutil wheat/slate ou destaque com borda
- [ ] Full-width button com `min-height: 56px`
- [ ] Micro-copy embaixo: "Resposta em até 2 horas"
- [ ] Animação: fade-in simples (sem slide — economiza CPU mobile)

**Desktop:**
- [ ] Faixa horizontal mais elegante, button centrado (não full-width)

---

### 6.5 MethodSection

**Mobile:**
- [ ] **Timeline vertical compacta**: reduzir gap de `space-y-8` → `space-y-4`
- [ ] **Padding dos cards**: `p-8` → `p-5`
- [ ] **Ícones inline** com texto (não empilhados) — economiza altura
- [ ] **Remover CTA do final** — já tem InlineCTA antes
- [ ] **Adicionar estimativa**: "~60min" ao lado de cada step (reduz ansiedade)
- [ ] **Frase de continuidade**: "Conheça os protocolos ↓" (micro-text, seta)

**Desktop:**
- [ ] Manter layout atual mas com padding refinado
- [ ] Números (01, 02, 03) mais proeminentes

---

### 6.6 ResultsSection (Stats) — Mover antes de Protocols

**Justificativa:** Mostrar credibilidade ANTES da oferta. Números de prova social preparam o terreno para os protocolos.

**Mobile:**
- [ ] **Grid 2x2 compacto**: cards com `p-4` (não `p-8`)
- [ ] **Sem descrição extra** — apenas número + label
  ```
  +2.347       98%
  Pacientes    Satisfação
  
  +11          8+
  Municípios   Anos
  ```
- [ ] **Counters animados mantidos** — são leves e eficazes
- [ ] **Remover cards de "transformação"** desta seção → mover para 6.8

**Desktop:**
- [ ] Faixa horizontal full-width, 4 stats em linha
- [ ] Background diferenciado (gradiente wheat sutil)

**Números ajustados** (mais críveis):
- "+2000" → "+2.347 Pacientes Atendidos" (quebrado = real)
- "98% Satisfação" → manter
- "+11 Municípios" → manter
- "8 anos" → "8+ Anos em Nutrologia"

---

### 6.7 Protocols

**Mobile (mudança principal):**
- [ ] **Carousel horizontal com scroll-snap** em vez de 3 cards empilhados
  ```css
  .protocols-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 16px;
    padding: 0 16px;
  }
  .protocol-card {
    scroll-snap-align: center;
    min-width: 85vw;
    flex-shrink: 0;
  }
  ```
- [ ] **Indicadores de pagination** (dots) abaixo do carousel
- [ ] **Swipe hint**: seta sutil ou card parcialmente visível na borda

**Desktop:**
- [ ] Grid 3 colunas (manter)
- [ ] Reduzir hover scale: `hover:scale-105` → `hover:scale-[1.02]`

**Conteúdo (ambos):**
- [ ] Adicionar **"Ideal para:"** — ex: "Quem quer perder 5-20kg com acompanhamento"
- [ ] Adicionar **"Resultado esperado:"** — ex: "Primeiros resultados em 30-60 dias"
- [ ] CTA: "Saiba Mais" → **"Agendar Avaliação"** (mais honesto)
- [ ] Badge **"Mais Procurado"** no card de Implantes

---

### 6.8 🆕 TransformationSection (Novo — Placeholder)

**Justificativa:** Gatilho #1 em saúde = prova visual. Sem fotos reais, usamos dados textuais impactantes.

**Mobile:**
- [ ] **Carousel horizontal** de cards de resultado:
  ```
  ┌────────────────────────────┐
  │  📍 Brasília de Minas      │
  │                            │
  │  -12kg em 90 dias          │  ← número grande, bold
  │  Protocolo: Reativação     │
  │                            │
  │  "Voltei a usar roupas     │
  │   que estavam no fundo     │
  │   do armário."             │
  │                            │
  │  — Maria S.                │
  └────────────────────────────┘
  ```
- [ ] Scroll-snap com dots de pagination
- [ ] `min-width: 80vw` por card

**Desktop:**
- [ ] Grid 3 colunas

**Fase futura:**
- [ ] Slider antes/depois com fotos reais (quando disponíveis)
- [ ] Nota legal: "Resultados variam. Fotos autorizadas."

---

### 6.9 Specialist

**Mobile:**
- [ ] **Foto acima, texto abaixo** (já é assim, mas refinar)
- [ ] **Foto height**: `h-[500px]` → `h-[300px]` em mobile (menos scroll)
- [ ] **Credenciais em lista compacta** (não cards com stats):
  ```
  ✓ CRM 60.143 MG
  ✓ Pós-Graduação em Nutrologia
  ✓ +8 anos de prática clínica
  ✓ +2.347 pacientes atendidos
  ```
- [ ] **Texto**: 2 parágrafos curtos máximo (mobile não lê paredes de texto)
- [ ] **Remover stats em cards** (redundante com ResultsSection)

**Desktop:**
- [ ] Manter 2 colunas (foto | texto)
- [ ] Adicionar link Instagram (prova social em tempo real)
- [ ] Moldura sutil na foto (borda wheat gradient)

---

### 6.10 Testimonials

**Mobile (mudança principal):**
- [ ] **Carousel horizontal com scroll-snap** (NÃO grid 3x2)
  - `min-width: 85vw` por card
  - Dots de pagination
  - Swipe gesture nativa
- [ ] **Reduzir para 4 depoimentos** (os mais variados por cidade e protocolo)
- [ ] **Padding**: `p-8` → `p-5`

**Desktop:**
- [ ] Grid 2x2 (não 3x2 — 4 depoimentos)

**Conteúdo (ambos):**
- [ ] Adicionar **tempo de tratamento**: "Paciente há 6 meses"
- [ ] **1 depoimento com 4 estrelas** + "A agenda é concorrida, mas vale a pena" (Efeito Pratfall)
- [ ] **CTA no final**: "Quer ser o próximo? [Agendar Avaliação]"

---

### 6.11 Locations (Reativar)

**Problema:** Componente existe pronto mas não está no `page.tsx`.

**Mobile:**
- [ ] **Cards stacked** (1 coluna)
- [ ] **Cidades em pills** com line-wrap (já funciona bem)
- [ ] **CTA por hub**: "Agendar em Brasília de Minas" (full-width, wheat)
- [ ] **MapPin icon menor** no background

**Desktop:**
- [ ] Grid 2 colunas (já existe)

**Ambos:**
- [ ] **Importar no page.tsx** — inserir entre Depoimentos e FAQ
- [ ] Headline: "Provavelmente a menos de 1h de você"

---

### 6.12 FAQ (Expandir)

**Mobile:**
- [ ] **Accordion nativo** — manter, mas com transição mais rápida
- [ ] **Padding**: `p-8` → `p-5` em mobile
- [ ] **Categorias opcionais** (tabs ou headers): "Consulta" | "Protocolos" | "Logística"

**Adicionar perguntas novas:**
- [ ] "Quanto custa uma consulta?" — objeção #1
- [ ] "Posso parcelar o tratamento?" — realidade financeira
- [ ] "O implante hormonal dói?" — medo físico
- [ ] "Em quanto tempo vejo resultado?" — ansiedade
- [ ] "Tem teleconsulta?" — conveniência
- [ ] "Tem estacionamento?" — logística prática (mostra cuidado)

**SEO:**
- [ ] Adicionar **FAQ Schema (JSON-LD)** para rich snippets no Google

---

### 6.13 FinalCTA

**Mobile:**
- [ ] **Simplificar radicalmente** — em mobile, menos é mais:
  ```
  ┌──────────────────────────────┐
  │  Pronto(a) para mudar?       │
  │                              │
  │  Agende sua avaliação e      │
  │  descubra o protocolo ideal. │
  │                              │
  │  [📱 Agendar via WhatsApp]   │  ← full-width, verde, GRANDE
  │                              │
  │  ou ligue: (38) 99826-9295   │  ← link tel:, text-sm
  │                              │
  │  Resposta em até 2h · Sem    │
  │  compromisso                 │
  └──────────────────────────────┘
  ```
- [ ] **Remover**: card com borda, avatares genéricos, trust points redundantes
- [ ] **1 botão dominante** (WhatsApp) + link de telefone sutil

**Desktop:**
- [ ] Card mais elaborado é OK, mas reduzir cognitive overload
- [ ] Remover avatares "A, C, M, R, L" → "Junte-se a +2.000 pacientes"

**Urgência:**
- [ ] "Vagas Limitadas para Este Mês" → remover se não for real, ou usar data específica

---

### 6.14 🆕 Mobile Bottom Bar (Novo — Mobile Only)

**Justificativa:** Depois que o visitante scrolla para baixo do Hero, o CTA some. Barra fixa no bottom mantém a ação sempre acessível na thumb zone.

**Especificação:**
```
┌──────────────────────────────────────┐
│  [📱 Agendar Consulta]               │  ← full-width ou 90%, verde
└──────────────────────────────────────┘
```
- [ ] Componente `MobileBottomBar.tsx`
- [ ] **Aparece após scroll de 400px** (não no hero — competiria)
- [ ] **Desaparece na seção FinalCTA** (não duplicar)
- [ ] `fixed bottom-0 left-0 right-0 z-40`
- [ ] Background: `bg-slate-950/95 backdrop-blur-sm border-t border-slate-800`
- [ ] Botão: `bg-green-600 text-white font-bold py-3 w-full rounded-xl`
- [ ] **Padding-bottom no body** para compensar a barra (evitar overlap com footer)
- [ ] **Desktop: hidden** — `md:hidden`

---

### 6.15 WhatsApp Flutuante

**Mobile:**
- [ ] **Reposicionar acima da bottom bar**: `bottom-20` (não `bottom-6`)
- [ ] **Reduzir tamanho**: `w-14 h-14` → `w-12 h-12` em mobile
- [ ] **Remover ping animation** em mobile (distrai, gasta bateria)
- [ ] Ou: **esconder em mobile** se a bottom bar existir (redundante)

**Desktop:**
- [ ] Manter, mas **limitar ping a 5 segundos** (depois para)
- [ ] Adicionar **tooltip** no hover: "Fale com a equipe" (aparece 1x)
- [ ] Adicionar micro-copy: "~2h de resposta"

---

### 6.16 Sistema de Design — Padronização Global

#### Paleta de Cores
```
Primário (acento):   wheat-500 (#F5DEB3) — CTAs, destaques, badges
WhatsApp:            green-600 — CTAs de agendamento
Problema:            red-400/red-950 — seção de problemas
Background 1:        slate-950 — seções padrão
Background 2:        slate-900 — seções de destaque
Texto principal:     slate-50 — headings
Texto secundário:    slate-300-400 — body
Texto terciário:     slate-500 — captions, micro-copy
```
- [ ] **Eliminar stone-300/400** do Hero — usar wheat-500 em toda a página

#### Botões (Token System)
```
Primário:    bg-wheat-500 text-slate-950 font-bold rounded-xl
WhatsApp:    bg-green-600 text-white font-bold rounded-xl
Secundário:  bg-slate-800 text-slate-200 font-medium rounded-xl border border-slate-700
Ghost:       text-wheat-500 underline
```
| Tamanho | Mobile | Desktop |
|---|---|---|
| Large (CTAs) | `py-4 px-6 text-base w-full` | `py-4 px-8 text-lg w-auto` |
| Medium | `py-3 px-5 text-sm` | `py-3 px-6 text-base` |
| Small (pills) | `py-2 px-4 text-xs` | `py-2 px-4 text-sm` |

- [ ] **Eliminar** `rounded-full` e `rounded-lg` — tudo `rounded-xl`
- [ ] **Min-height 48px** em todos os botões (touch target)

#### Tipografia
```
H1 (Hero only):  text-3xl → md:text-5xl → lg:text-6xl
H2 (seções):     text-2xl → md:text-4xl → lg:text-5xl
H3 (sub):        text-lg → md:text-xl → lg:text-2xl
Body:             text-sm → md:text-base → lg:text-lg
Caption:          text-xs → md:text-sm
```
- [ ] **Mobile font-sizes menores** que o atual — texto atual é grande demais em 360px
- [ ] `leading-tight` para headings, `leading-relaxed` para body

#### Espaçamento (Mobile-First)
```
Seções:  py-12 → md:py-20 → lg:py-28  (mobile reduzido!)
Cards:   p-5 → md:p-7 → lg:p-8
Gaps:    gap-4 → md:gap-6 → lg:gap-8
```

#### Separadores de Seção
- [ ] Adicionar no topo de cada seção:
  ```html
  <div className="h-px bg-gradient-to-r from-transparent via-wheat-500/20 to-transparent" />
  ```

---

## 7. Performance — Mobile-First Budget

### Orçamento de Performance

| Recurso | Budget Mobile | Budget Desktop |
|---|---|---|
| HTML | < 50KB | < 50KB |
| CSS | < 30KB | < 30KB |
| JS (first load) | < 150KB | < 200KB |
| Imagens (above fold) | < 200KB | < 300KB |
| Vídeo | **0 (mobile)** | < 2MB |
| **Total first load** | **< 430KB** | **< 2.6MB** |
| Fontes | < 60KB (subset) | < 80KB |

### Ações Técnicas

- [ ] **Imagens WebP** com `srcSet` responsivo:
  ```
  dr-hero.png    → hero-640.webp (100KB) + hero-1280.webp (200KB)
  dr-specialist  → specialist-640.webp (50KB) + specialist-1280.webp (100KB)
  logo           → logo.webp (15KB) ou SVG
  ```
- [ ] **Vídeo**: `<source>` com media query — mobile recebe apenas poster
  ```html
  <video poster="/assets/bg-hero.webp">
    <source src="/assets/hero-bg.mp4" type="video/mp4" media="(min-width: 768px)" />
  </video>
  ```
- [ ] **Lazy load** agressivo: tudo abaixo do fold com `loading="lazy"` ou dynamic import
- [ ] **Framer Motion**: dynamic import para seções below fold
  ```tsx
  const MotionDiv = dynamic(() => import('framer-motion').then(m => m.motion.div))
  ```
- [ ] **Preload** do poster hero: `<link rel="preload" as="image" href="/assets/bg-hero.webp">`
- [ ] **Font display: swap** — texto visível antes das fontes custom
- [ ] **Font subsetting** — Montserrat só precisa de Latin (sem Cyrillic, etc.)

---

## 8. Novo Fluxo de Seções (Final)

```
Mobile Experience (cada bloco ≈ 1-2 scrolls):

 1. Navbar          — fixo, compacto, CTA pill
 2. Hero            — texto + CTA full-width + prova social inline
 3. Problems        — 4 cards stacked, bridge curto
 4. 🆕 InlineCTA   — banner de captura rápida
 5. Method          — 3 steps compactos, timeline vertical
 6. Results/Stats   — 2x2 grid de números (movido antes de Protocols)
 7. Protocols       — 🆕 carousel horizontal com snap
 8. 🆕 Transform.  — carousel de resultados textuais
 9. Specialist      — foto + credenciais em lista
10. Testimonials    — 🆕 carousel horizontal (4 depoimentos)
11. Locations       — 🆕 reativado, cards stacked
12. FAQ             — expandido (8-10), accordion
13. Final CTA       — simplificado, 1 botão dominante
14. Footer          — CNPJ real, links
─── Bottom Bar ──── — fixo, "Agendar Consulta" (mobile only)
```

---

## 9. Priorização de Implementação

### Fase 1 — Quick Wins (Alto impacto, baixo esforço)
| # | Item | Impacto Principal |
|---|---|---|
| 1 | Converter imagens para WebP + srcSet | **LCP mobile cai de 6s → 2s** |
| 2 | Remover vídeo em mobile (só poster) | **-2MB de dados mobile** |
| 3 | Unificar stone → wheat em toda a página | Consistência visual |
| 4 | Padronizar botões (rounded-xl, tamanhos) | Hierarquia de ação clara |
| 5 | Reativar Locations no page.tsx | Presença regional (já pronto!) |
| 6 | Fix CNPJ placeholder no footer | Credibilidade |
| 7 | Adicionar prova social no Hero | Confiança imediata |
| 8 | Reduzir padding mobile (py-20 → py-12) | **-30% de scroll necessário** |

### Fase 2 — Melhorias Estruturais (Alto impacto, médio esforço)
| # | Item | Impacto Principal |
|---|---|---|
| 9 | Novo `InlineCTA.tsx` | Captura visitantes convencidos cedo |
| 10 | Novo `MobileBottomBar.tsx` | CTA sempre na thumb zone |
| 11 | Carousel para Protocolos (mobile) | -2 telas de scroll |
| 12 | Carousel para Depoimentos (mobile) | -3 telas de scroll |
| 13 | Expandir FAQ (8-10 perguntas + schema) | SEO + objeções tratadas |
| 14 | Reordenar: Stats antes de Protocols | Credibilidade antes da oferta |
| 15 | Navbar mobile refinada (hamburger + CTA pill) | UX mobile profissional |
| 16 | Refinar copy (Hero, Problems, CTAs) | Conversão |

### Fase 3 — Diferenciação (Médio impacto, maior esforço)
| # | Item | Impacto Principal |
|---|---|---|
| 17 | `TransformationSection.tsx` (placeholder) | Prova de resultado |
| 18 | Refinar Protocolos (ideal para + resultado) | Decisão informada |
| 19 | WhatsApp tooltip + ping limitado | UX polida |
| 20 | Separadores visuais entre seções | Clareza de navegação |
| 21 | Active state navbar scroll | UX profissional |
| 22 | Depoimento com 4 estrelas (Pratfall) | Confiança |
| 23 | Hero image menor em mobile (40vh) | Texto visível first |
| 24 | Dynamic import Framer Motion | Performance |

---

## 10. Métricas de Sucesso

| Indicador | Como medir | Meta |
|---|---|---|
| Cliques WhatsApp | GA4 `ads_conversion_Reservar_hor_rio_1` | +100% |
| LCP mobile | PageSpeed Insights (mobile) | < 2.5s |
| CLS | PageSpeed Insights | < 0.1 |
| Scroll depth mobile | GA4 scroll (25/50/75/90%) | 65%+ chega a 50% |
| Bounce rate mobile | GA4 | < 50% |
| Page weight (mobile) | DevTools Network | < 600KB |
| Conversão (agendamentos) | WhatsApp Business | Acompanhar semanal |

---

## 11. Fora de Escopo

- Redesign de identidade visual (logo, marca)
- Sistema de agendamento online (substituto do WhatsApp)
- Blog ou seção de conteúdo
- Área do paciente
- Troca de framework ou stack
- Versão em outro idioma

---

*Este PRD é o contrato de execução. Cada item será implementado como tarefa verificável, mobile-first, testada em viewport 360px antes de escalar para desktop.*
