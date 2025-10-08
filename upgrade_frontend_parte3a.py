"""
🌱 GROWLI 2.0 - FRONTEND PARTE 3A
Types + Novos Gráficos
Salve como: upgrade_frontend_parte3a.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🎨 GROWLI 2.0 - Frontend Parte 3A: Types + Gráficos...\n")

# ============================================
# 1. TYPES - 21 SETORES + ESTADO
# ============================================
types_v2 = """export type SetorEnum = 
  | 'agricultura'
  | 'pecuaria'
  | 'extrativas'
  | 'transformacao'
  | 'eletricidade_gas'
  | 'agua_residuos'
  | 'construcao'
  | 'comercio_veiculos'
  | 'transporte'
  | 'alojamento_alimentacao'
  | 'informacao_comunicacao'
  | 'financeiras'
  | 'imobiliarias'
  | 'profissionais'
  | 'administrativas'
  | 'administracao_publica'
  | 'educacao'
  | 'saude'
  | 'artes_cultura'
  | 'outras_atividades'
  | 'servicos_domesticos'

export type EstadoEnum = 
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA'
  | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN'
  | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

export interface DadosFinanceiros {
  caixa: number
  contas_receber: number
  estoque: number
  imobilizado: number
  fornecedores: number
  emprestimos_cp: number
  impostos: number
  emprestimos_lp: number
  receita_bruta: number
  custo_vendas: number
  despesas_operacionais: number
  despesas_financeiras: number
  setor: SetorEnum
  estado?: EstadoEnum
  periodo_referencia: string
}

export interface Indicadores {
  liquidez_corrente: number
  liquidez_seca: number
  liquidez_imediata: number
  margem_bruta: number
  margem_operacional: number
  margem_liquida: number
  endividamento_geral: number
  composicao_endividamento: number
  giro_estoque: number
  prazo_medio_recebimento: number
  prazo_medio_pagamento: number
  ciclo_operacional: number
  ciclo_caixa: number
  capital_giro: number
  necessidade_capital_giro: number
  rentabilidade_patrimonio: number
  rentabilidade_ativo: number
}

export interface Cenario {
  tipo: 'otimista' | 'neutro' | 'pessimista'
  taxa_crescimento: number
  receita_projetada: number
  lucro_projetado: number
  necessidade_capital: number
  recomendacoes: string[]
}

export interface ResultadoAnalise {
  id_analise: string
  data_analise: string
  setor: SetorEnum
  estado?: EstadoEnum
  dados_input: DadosFinanceiros
  indicadores: Indicadores
  cenarios: Cenario[]
  pontos_fortes: string[]
  pontos_atencao: string[]
  acoes_prioritarias: string[]
  estrategias_personalizadas: string[]
  saude_financeira_score: number
}
"""
criar_arquivo("frontend/types/index.ts", types_v2)

# ============================================
# 2. GRÁFICO - CICLO DE CAIXA (PMR, PME, PMP)
# ============================================
chart_ciclo = r"""'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Props {
  pmr: number
  pme: number
  pmp: number
  ciclo_caixa: number
}

export function ChartCicloCaixa({ pmr, pme, pmp, ciclo_caixa }: Props) {
  const data = [
    { name: 'PMR', dias: Math.round(pmr), fill: '#3b82f6' },
    { name: 'PME', dias: Math.round(pme), fill: '#8b5cf6' },
    { name: 'PMP', dias: Math.round(pmp), fill: '#ef4444' },
  ]

  return (
    <div>
      <div className="mb-4 p-4 bg-primary-50 rounded-lg">
        <div className="text-sm text-neutral-600">Ciclo de Caixa (CCC)</div>
        <div className="text-3xl font-bold text-primary-700">{Math.round(ciclo_caixa)} dias</div>
        <div className="text-xs text-neutral-500 mt-1">
          PMR + PME - PMP = {Math.round(pmr)} + {Math.round(pme)} - {Math.round(pmp)}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `${v}d`} />
          <Tooltip formatter={(v: number) => `${v} dias`} />
          <Bar dataKey="dias" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartCicloCaixa.tsx", chart_ciclo)

# ============================================
# 3. GRÁFICO - MARGENS (BRUTA, OPERACIONAL, LÍQUIDA)
# ============================================
chart_margens = r"""'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Props {
  margem_bruta: number
  margem_operacional: number
  margem_liquida: number
}

export function ChartMargens({ margem_bruta, margem_operacional, margem_liquida }: Props) {
  const data = [
    { name: 'Margem Bruta', valor: margem_bruta },
    { name: 'Margem Operacional', valor: margem_operacional },
    { name: 'Margem Líquida', valor: margem_liquida },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
        <Legend />
        <Line type="monotone" dataKey="valor" stroke="#22c55e" strokeWidth={3} name="Margem (%)" />
      </LineChart>
    </ResponsiveContainer>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartMargens.tsx", chart_margens)

# ============================================
# 4. GRÁFICO - RENTABILIDADE (ROE, ROA)
# ============================================
chart_rentabilidade = r"""'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Props {
  roe: number
  roa: number
}

export function ChartRentabilidade({ roe, roa }: Props) {
  const data = [
    { name: 'ROE', valor: roe, fill: '#22c55e' },
    { name: 'ROA', valor: roa, fill: '#3b82f6' },
  ]

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-neutral-600">ROE (Return on Equity)</div>
          <div className="text-2xl font-bold text-green-700">{roe.toFixed(1)}%</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-neutral-600">ROA (Return on Assets)</div>
          <div className="text-2xl font-bold text-blue-700">{roa.toFixed(1)}%</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
          <Bar dataKey="valor" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartRentabilidade.tsx", chart_rentabilidade)

# ============================================
# 5. GRÁFICO - COMPOSIÇÃO PATRIMONIAL
# ============================================
chart_patrimonial = r"""'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface Props {
  caixa: number
  receber: number
  estoque: number
  imobilizado: number
}

export function ChartPatrimonial({ caixa, receber, estoque, imobilizado }: Props) {
  const data = [
    { name: 'Caixa', value: caixa, color: '#22c55e' },
    { name: 'Contas a Receber', value: receber, color: '#3b82f6' },
    { name: 'Estoque', value: estoque, color: '#f59e0b' },
    { name: 'Imobilizado', value: imobilizado, color: '#8b5cf6' },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => `${entry.name}: ${((entry.value / (caixa + receber + estoque + imobilizado)) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartPatrimonial.tsx", chart_patrimonial)

print("\n✅ PARTE 3A CONCLUÍDA!")
print("\n📊 Gráficos criados:")
print("  ✅ ChartCicloCaixa (PMR, PME, PMP)")
print("  ✅ ChartMargens (Bruta, Operacional, Líquida)")
print("  ✅ ChartRentabilidade (ROE, ROA)")
print("  ✅ ChartPatrimonial (Pizza - composição ativo)")
print("\n⏳ Execute para criar os novos gráficos...")
print("⏳ Depois rode a Parte 3B para atualizar formulário e resultados!")