# agents.md — Contexto do Projeto para IAs

> Este arquivo descreve o propósito, stack, arquitetura, regras de design e convenções do projeto para que qualquer assistente de IA possa entender o contexto rapidamente antes de contribuir.

---

## 1. O Que É Este Projeto

**Painel ABRINT / MHNet — Dashboard Bemobi**

Um dashboard de alta fidelidade desenvolvido para exibição em **totem touchscreen** em feiras e exposições. O painel apresenta os resultados financeiros que o sistema **Bemobi** entregou para um cliente real — a **MHNet** (provedor de internet). O objetivo principal é causar impacto visual imediato ("wow factor") e transmitir robustez financeira de forma moderna e não-monótona.

**Contexto de uso:** Visitantes de feira interagem em pé, ambiente movimentado e iluminado, por meio de monitor touchscreen. A interface deve ser legível à distância, com áreas de toque generosas.

---

## 2. Stack Técnica

| Tecnologia | Uso |
|---|---|
| **HTML5** (`index.html`) | Estrutura principal da aplicação |
| **Tailwind CSS** (via CDN) | Sistema de utilitários + tokens de design customizados |
| **CSS customizado** (`css/style.css`) | Animações, glassmorphism, noise texture, overrides do ApexCharts |
| **ApexCharts** (via CDN) | Gráficos interativos (barras, pizza, séries temporais) |
| **JavaScript** (`js/dashboard.js`) | Lógica dos gráficos, animações de contadores, scroll reveal |
| **Iconify** (`iconify-icon`) | Ícones SVG (prefixo `solar:`) |
| **Google Fonts** | Poppins (brand) + JetBrains Mono (dados/números) |

> **Sem bundler, sem framework JS.** Tudo é HTML puro + arquivos estáticos. Para abrir, basta servir a pasta com um servidor local (ex: Live Server do VS Code).

---

## 3. Estrutura de Arquivos

```
painel_abrint_mhnet/
├── index.html                  # Ponto de entrada principal
├── agents.md                   # Este arquivo — contexto para IAs
├── sessoes.md                  # Planejamento das seções do dashboard
├── .impeccable.md              # Briefing de design (usuários, voz de marca, direção estética)
├── grafana_mhnet.json          # Fonte original dos dados (export do Grafana)
│
├── css/
│   └── style.css               # Estilos customizados, animações, overrides
│
├── js/
│   └── dashboard.js            # Lógica JS (gráficos ApexCharts, contadores, observers)
│
├── charts/
│   └── *.csv                   # Dados brutos extraídos do Grafana (15 arquivos CSV)
│
├── design-system/
│   ├── bemobi_design_system.md # Design System oficial da Bemobi (cores, tipografia, regras)
│   ├── design-system.html      # Implementação visual do Design System
│   ├── index_bemobi.html       # Referência de layout alternativa
│   └── assets/
│       └── bemobi_logo.svg     # Logo oficial da Bemobi
│
└── .agents/
    └── skills/                 # Skills de design disponíveis (animate, bolder, layout, etc.)
```

---

## 4. Seções do Dashboard (Navegação)

O dashboard é dividido em **4 seções principais** + **1 visão geral** no topo:

### Visão Geral (Hero — sempre visível)
KPIs globais fixos no topo:
- **Total Recuperado** (Abr/25 – Fev/26): R$ 58.960 | 652 acordos
- **Total de Faturas**: 14.224 (último mês)
- **Inadimplência Média**: 6,8%
- **Taxa de Retenção**: 80%

### Seção 1 — Faturas & Formas de Pagamento (`#faturas`)
- Número de Faturas no Mês — Gráfico de Barras
- Porcentagem de Pagamentos — Gráfico de Pizza
- Porcentagem de Pagamentos por Forma — Série Temporal

### Seção 2 — Inadimplência e Comportamento (`#inadimplencia`)
- Inadimplência do Mês — Barras (Pagos em dia vs Atrasados vs Em aberto)
- Ciclo de Pagamento — Pizza e Série Temporal
- Ciclo de Pagamento do Último Mês — Tabela detalhada por faixa de atraso

### Seção 3 — Negociações (`#negociacoes`)
- Número de Negociações — Barras
- Valor em Negociações — Barras
- Agrupado por Origem — Tabela
- Agrupado por Forma de Pagamento — Tabela

### Seção 4 — Recorrência (`#recorrencia`)
- Inadimplência Recuperada com Recorrência
- Retenção de Recorrência
- Eficiência de Cobrança por Tentativa

---

## 5. Design System Bemobi

### Paleta de Cores (tokens Tailwind configurados)

| Token Tailwind | Hex | Uso |
|---|---|---|
| `b_blue_pure` | `#062EED` | Ações primárias, destaques principais |
| `b_blue_light` | `#B6D5FF` | Superfícies secundárias, tints glassmorphism |
| `b_purple_pure` | `#6924E1` | Acento, identidade de marca |
| `b_purple_light` | `#CCC8FF` | Fundos suaves, efeitos vidro |
| `b_deep_blue` | `#020F5B` | Texto principal |
| `b_ocean_blue` | `#0B1B73` | Texto secundário escuro |
| `b_grey_blue` | `#5561A6` | Texto de metadados, labels |
| `b_white` | `#FFFFFF` | Cards, superfícies |
| `b_bone` | `#F0F1FA` | Fundo da página (Snow Blue) |
| `b_success` | `#40D39E` | Indicadores positivos |
| `b_danger` | `#F5326F` | Inadimplência, alertas negativos |

**Gradiente principal dos cards hero:**
```css
background: linear-gradient(135deg, #6924E1 0%, #062EED 100%);
```

### Tipografia

| Família | Uso |
|---|---|
| **Poppins** | Todos os textos de interface, títulos, corpo |
| **JetBrains Mono** | Números financeiros, labels de dados, metadados (`font-mono`) |

**Regra crítica:** Números financeiros são os **heróis da tela**. Devem usar tipografia grande (`text-6xl` / `text-7xl`), com `tracking-tighter`.

### Bordas & Formas

Todos os cards usam `rounded-[2rem]` (border-radius 32px). Nada de bordas retas ou quadradas.

### Sombras

```css
shadow-glass → box-shadow: 0 8px 32px 0 rgba(2, 15, 91, 0.05)
shadow-hover → box-shadow: 0 20px 40px -15px rgba(6, 46, 237, 0.25)
```

---

## 6. Animações e Interações

### Classes de Animação

| Classe | Comportamento |
|---|---|
| `.reveal` | Fade + translateY(30px) ao entrar na viewport (IntersectionObserver) |
| `.reveal.active` | Estado visível — opacity: 1, transform: none |
| `.draw-line` | Linha que se desenha horizontalmente (width: 0 → 100%) |
| `.counter` | Números com animação de contagem progressiva (atributo `data-target`) |
| `.bg-noise` | Textura SVG fractal fixada como overlay de fundo |

### Atributos dos Contadores

```html
<span class="counter"
  data-target="58960"      <!-- valor final -->
  data-prefix="R$ "        <!-- prefixo opcional -->
  data-suffix="%"          <!-- sufixo opcional -->
  data-decimals="1">       <!-- casas decimais (padrão: 0) -->
  R$ 0
</span>
```

### CSS Scroll-Driven Animations (Overdrive)

O projeto usa `animation-timeline: view()` para animações cinematic quando o browser suportar:
```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: cinematic-reveal linear both;
    animation-timeline: view();
    animation-range: entry 5% cover 25%;
  }
}
```

**Easing padrão do projeto:** `cubic-bezier(0.16, 1, 0.3, 1)` (nomeado `ease-swiss` no config Tailwind).

---

## 7. Princípios de Design (Regras Críticas)

1. **Touch-First:** Áreas de clique generosas (mínimo 48px de touch target). Feedback visual imediato em interações.

2. **Ritmo e Assimetria:** Evitar grids completamente simétricos. Usar destaques assimétricos (`col-span-5` / `col-span-7`) para guiar o olhar ao número mais importante primeiro.

3. **Dados como Arte:** Números financeiros em tipografia grande (`text-6xl`+), contrastante e perfeitamente alinhada. Nunca comprima ou diminua os KPIs heróis.

4. **Micro-interações de Delight:** Cada scroll deve ser recompensado com animações fluidas. Linhas se desenham, números sobem, cards deslizam.

5. **Glassmorphism:** Usar `backdrop-blur` + `bg-white/10` para elementos sobrepostos. Borda sutil `border border-white/10` em elementos sobre gradiente.

6. **Proibido:**
   - Admin templates genéricos ou "AI slop" simplista
   - Grids 100% simétricos sem hierarquia visual
   - Texto branco em fundo claro / texto escuro em fundo escuro
   - Efeitos de glow, reflexo ou gradientes não oficiais na logo
   - Fontes fora de Poppins / JetBrains Mono

---

## 8. Dados e Fonte

Os dados exibidos no dashboard foram **extraídos do Grafana** (`grafana_mhnet.json`) — um painel de monitoramento real do cliente MHNet. Os CSVs em `charts/` são os exports brutos de cada painel do Grafana.

**Período de dados:** Abril/2025 a Fevereiro/2026 (12 meses)

Os dados estão **hardcoded** no `js/dashboard.js` (sem chamadas de API) para funcionar como demo offline em feira.

---

## 9. Convenções de Código

- **HTML:** Semântico (`<nav>`, `<main>`, `<section>`, `<h2>`, etc.). `lang="pt-BR"` no `<html>`.
- **IDs de seções:** `#faturas`, `#inadimplencia`, `#negociacoes`, `#recorrencia` — usados na navegação.
- **IDs dos gráficos ApexCharts:** padrão `chart-{nome-do-grafico}` (ex: `chart-volume-faturas`, `chart-distribuicao`).
- **Classes Tailwind:** Preferir tokens customizados (`text-b_deep_blue`) aos genéricos (`text-blue-900`).
- **Ícones:** Sempre do pacote `solar:` via Iconify (ex: `solar:graph-up-linear`, `solar:arrow-right-up-linear`).
- **Comentários:** Em português, descritivos. Seções separadas por blocos `<!-- Nome da Seção -->`.

---

## 10. O Que Ainda Falta Implementar

Com base no `sessoes.md`, as seções que ainda precisam ser construídas:

- [x] **Visão Geral (Hero)** — KPIs com dados reais atualizados
- [x] **Seção 1 — Faturas & Formas de Pagamento** (`#faturas`) — Gráfico de barras e donut implementados com dados reais
- [x] **Seção 2 — Inadimplência e Comportamento** (`#inadimplencia`)
  - Gráfico de barras: Inadimplência do Mês
  - Gráfico de pizza: Ciclo de Pagamento
  - Tabela: Ciclo por faixa de atraso
  - Série temporal: Ciclo de Pagamento
- [x] **Seção 3 — Negociações** (`#negociacoes`)
  - Barras: Número e Valor de Negociações
  - Tabelas: Por Origem e Por Forma de Pagamento
- [x] **Seção 4 — Recorrência** (`#recorrencia`)
  - Inadimplência Recuperada com Recorrência
  - Retenção de Recorrência
  - Eficiência de Cobrança por Tentativa

---

## 11. Como Servir Localmente

```bash
# Opção 1: VS Code — instale a extensão "Live Server" e clique em "Go Live"

# Opção 2: Python
python -m http.server 8080

# Opção 3: Node.js (sem instalação)
npx serve .
```

Acesse `http://localhost:8080` (ou a porta indicada).

---

## 12. Skills de Design Disponíveis

O projeto possui skills de agentes em `.agents/skills/`. Antes de trabalhar em animações, layout ou visual, consulte:

- **`animate`** — Para adicionar micro-interações e motion effects
- **`overdrive`** — Para implementações técnicas ambiciosas (shaders, spring physics, 60fps)
- **`layout`** — Para corrigir ritmo visual, espaçamento e hierarquia
- **`bolder`** — Para amplificar o impacto visual quando o design estiver muito seguro/genérico
- **`polish`** — Para o passe final de qualidade antes de apresentar

---

## 13. Fonte da Verdade — Dados Reais (pasta `charts/`)

> **REGRA CRÍTICA:** Todos os dados exibidos no dashboard **devem** ser extraídos dos CSVs da pasta `charts/`. Não usar valores mockados ou inventados. Se um dado não estiver nos CSVs, ele não deve ser exibido como fato.

### Período dos Dados
**Janeiro/2026 a Março/2026** (3 meses). Nenhum CSV contém dados anteriores a Jan/26. Labels de período no HTML devem sempre referenciar `Jan/26 – Mar/26`.

### Mapeamento Completo dos CSVs

| Arquivo CSV | Seção | Tipo | Colunas Principais |
|---|---|---|---|
| `Numero de Faturas no Mês` | Seção 1 | Barras | Mês, Faturas |
| `Porcentagem de pagamentos` | Seção 1 | Donut | Tipo de Recebimento, (%) |
| `Porcentagem de pagamentos por Forma` | Seção 1 | Linha temporal | time, Tipo de Recebimento, (%) |
| `Inadimplência do Mês` | Seção 2 | Barras agrupadas | Mês de Vencimento, % Pagas no Mês, % Pagas Posteriormente, % Ainda em Aberto |
| `Ciclo de Pagamento` (85 bytes) | Seção 2 | Donut | Ciclo de Pagamento, % |
| `Ciclo de Pagamento` (430 bytes) | Seção 2 | Linha temporal | Período, Ciclo de Pagamento, (%) |
| `Ciclo de Pagamento do Ultimo Mês` | Seção 2 | Tabela | Ciclo de Pagamento, Quantidade, % |
| `Numero de Negociação` | Seção 3 | Barras | Mês, Quantidade |
| `Valor em Negociações` | Seção 3 | Barras | Mês, Valor Final |
| `Negociação - Agrupado por Origem` | Seção 3 | Tabela | Orig. Negociação, Total Geradas, Total Pagas, % Pago, Multa, Juros, Desconto, Valor Final |
| `Negociação - Agrupado por Forma de Pagamento` | Seção 3 | Tabela | Origem da Negociação, Qtd/Valor Boleto, Qtd/Valor Pix, Qtd/Valor Cartão |
| `Origem da Negociação` | Seção 3 | Barras empilhadas | Mês, Origem da Negociação, Quantidade |
| `Inadimplência recuperada com a Recorrência` | Seção 4 | Barras | Mês Base, Taxa de Recuperação (%) |
| `Retenção de Recorrência` | Seção 4 | KPI / Barras | Mês, Taxa de Retenção (%) |
| `Recorrência - Eficiência de Cobrança por Tentativa` | Seção 4 | Barras horizontais | n.º Tentativa, Tentativas (%) |

### Valores Reais Extraídos (referência rápida)

#### Volume de Faturas
| Mês | Faturas |
|---|---|
| Jan/26 | 247.206 |
| Fev/26 | 247.721 |
| Mar/26 | 245.423 |

#### Formas de Pagamento (acumulado do período)
| Forma | % |
|---|---|
| Pix | 49,75% |
| Boleto | 42,04% |
| Cartão de Crédito | 5,97% |
| POS | 2,16% |
| Pix Automático | 0,07% |

#### Inadimplência do Mês
| Mês | Pagas no Mês | Pagas Posteriormente | Em Aberto |
|---|---|---|---|
| Jan/26 | 92,1% | 2,2% | 5,7% |
| Fev/26 | 90,6% | 3,0% | 6,4% |
| Mar/26 | 91,9% | 0,0% | 8,1% |

#### Ciclo de Pagamento (acumulado)
- Pago até o vencimento: **70,58%**
- Pago após o vencimento: **29,42%**

#### Ciclo de Pagamento do Último Mês (Mar/26) — Tabela detalhada
| Faixa | Quantidade | % |
|---|---|---|
| Pago antes do vencimento | 136.089 | 53,05% |
| Pago no vencimento | 53.459 | 20,84% |
| Pagos em até 10 dias após | 56.769 | 22,13% |
| Pagos em até 20 dias após | 7.642 | 2,98% |
| Pagos em até 30 dias após | 1.529 | 0,60% |
| Pagos em até 45 dias após | 495 | 0,19% |
| Pgto após 45 dias depois do vencimento | 569 | 0,22% |

#### Negociações (Régua de Cobrança)
| Mês | Acordos | Valor Recuperado |
|---|---|---|
| Jan/26 | 4.300 | R$ 535.476,33 |
| Fev/26 | 5.160 | R$ 650.115,97 |
| Mar/26 | 8.350 | R$ 1.033.906,93 |
| **Total** | **17.810** | **R$ 2.219.499,23** |
| Crescimento Jan→Mar | **+94%** acordos | **+93%** em valor |

#### Negociações por Origem (acumulado 3 meses)
| Origem | Geradas | Pagas | % Pago | Valor Final |
|---|---|---|---|---|
| Portal do Cliente | 1.819 | 538 | 29,58% | R$ 82.056,68 |
| Regra de Notificação | 1.158 | 475 | 41,02% | R$ 60.303,78 |
| Grace (automático) | 12.086 | 7.337 | 60,71% | R$ 891.546,47 |

#### Recorrência
| Métrica | Jan/26 | Fev/26 | Mar/26 |
|---|---|---|---|
| Inadimplência Recuperada | 56% | 56% | 51% |
| Taxa de Retenção | — | 88% | 88% |

#### Eficiência de Cobrança por Tentativa
A 1ª tentativa resolve **~94%** dos casos. A partir da 2ª tentativa, a taxa cai drasticamente (2%). Dados com 35 linhas por mês (múltiplos registros por nº de tentativa — agrupar pela mediana).

---

## 14. Decisões de Implementação Tomadas

### KPIs do Hero
- **Total Recuperado** = soma do `Valor Final` dos 3 meses de negociações = **R$ 2.219.499,23**
- **Acordos** = soma mensal de `Numero de Negociação` = **17.810**
- **Média mensal** = R$ 2.219.499,23 ÷ 3 = **R$ 739.833/mês**
- **Badge de crescimento** = variação Jan→Mar em acordos = **+94%**
- **Inadimplência exibida** = % em aberto do mês mais recente (Mar/26) = **8,1%**
- **Taxa de Retenção** = dados de Fev–Mar/26 = **88%** (estável)

### Gráficos da Seção 1
- Gráfico de barras de faturas: eixo Y começa em 240.000 (não em zero) para amplificar visualmente as variações mínimas entre os meses
- Donut de formas: paleta Bemobi expandida para 5 categorias — `#6924E1` (Pix) · `#062EED` (Boleto) · `#B6D5FF` (Cartão) · `#5561A6` (POS) · `#CCC8FF` (Pix Auto)
- Gráfico de linha temporal (`#chart-forma-tempo`) já implementado no JS — aguarda div no HTML

### Narrativa do Dashboard
A história dos dados segue 4 atos:
1. **Escala** — ~245k faturas/mês (Seção 1)
2. **Problema** — inadimplência ~8% (Seção 2)
3. **Solução** — régua de cobrança recupera R$2,2M em 3 meses com crescimento de 94% (Seção 3)
4. **Retenção** — 88% dos clientes em recorrência permanecem (Seção 4)

---

*Última atualização: 27 de Abril de 2026*
