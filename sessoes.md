# Estrutura de Sessões do Dashboard

Com base na extração dos painéis presentes no arquivo `grafana_mhnet.json` e considerando as boas práticas de UI (conforme o print), podemos organizar os dados lógicos nas seguintes sessões principais do menu de navegação:

## 1. Faturas & Formas de Pagamento
Agrupa os dados de geração de faturas e de como os clientes estão pagando.
- **Número de Faturas no Mês** (Gráfico de Barras)
- **Porcentagem de Pagamentos** (Gráfico de Pizza)
- **Porcentagem de Pagamentos por Forma** (Série Temporal)

## 2. Inadimplência e Comportamento (Ciclo)
Focado no atraso de pagamentos e no tempo de ciclo.
- **Inadimplência do Mês** (Gráfico de Barras - Pagos em dia vs Atrasados vs Em aberto)
- **Ciclo de Pagamento** (Gráfico de Pizza - Pagos até o vencimento vs Após)
- **Ciclo de Pagamento do Último Mês** (Tabela com detalhes de faixas de atraso)
- **Ciclo de Pagamento** (Série Temporal)

## 3. Negociações
Focado nos acordos e recuperação de crédito.
- **Número de Negociações** (Gráfico de Barras)
- **Valor em Negociações** (Gráfico de Barras)
- **Negociação - Agrupado por Origem** (Tabela)
- **Origem da Negociação**
- **Negociação - Agrupado por Forma de Pagamento** (Tabela)

## 4. Recorrência
Focado em pagamentos automatizados e retenção.
- **Inadimplência recuperada com a Recorrência**
- **Retenção de Recorrência**
- **Recorrência - Eficiência de Cobrança por Tentativa**

---
*Nota:* Alguns KPIs globais (Total Recuperado, Total de Faturas, Inadimplência Média) parecem ser extrações diretas dos totais desses gráficos e podem compor uma faixa de **Visão Geral** (Overview) sempre visível no topo, assim como está no screenshot.
