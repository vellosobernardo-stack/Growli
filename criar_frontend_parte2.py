"""
🌱 GROWLI - FRONTEND PARTE 2
Charts + Forms + Páginas
Salve como: criar_frontend_parte2.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🌱 GROWLI - Criando Frontend Parte 2...\n")

# ============================================
# CHART - Revenue Scenario (usando r-string)
# ============================================
chart = r"""'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatBRL } from '@/utils/format'
import { Cenario } from '@/types'

export function ChartRevenueScenario({ cenarios, receitaAtual }: { cenarios: Cenario[], receitaAtual: number }) {
  const data = [
    { name: 'Atual', receita: receitaAtual },
    ...cenarios.map(c => ({ name: c.tipo, receita: c.receita_projetada }))
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => formatBRL(v)} />
        <Tooltip formatter={(v: number) => formatBRL(v)} />
        <Bar dataKey="receita" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}"""
criar_arquivo("frontend/components/charts/ChartRevenueScenario.tsx", chart)

# ============================================
# FORM - Manual Input (simplificado)
# ============================================
form = r"""'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { DadosFinanceiros } from '@/types'

const SETORES = [
  { value: 'comercio_varejo', label: 'Comércio Varejista' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'tecnologia', label: 'Tecnologia' }
]

export function FormularioManual({ onSubmit, loading }: { onSubmit: (d: any) => void, loading?: boolean }) {
  const { register, handleSubmit } = useForm<DadosFinanceiros>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Balanço Patrimonial</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Caixa" type="number" step="0.01" {...register('caixa', { valueAsNumber: true })} />
          <Input label="Contas a Receber" type="number" step="0.01" {...register('contas_receber', { valueAsNumber: true })} />
          <Input label="Estoque" type="number" step="0.01" {...register('estoque', { valueAsNumber: true })} />
          <Input label="Imobilizado" type="number" step="0.01" {...register('imobilizado', { valueAsNumber: true })} />
          <Input label="Fornecedores" type="number" step="0.01" {...register('fornecedores', { valueAsNumber: true })} />
          <Input label="Empréstimos CP" type="number" step="0.01" {...register('emprestimos_cp', { valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">DRE</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Receita Bruta" type="number" step="0.01" {...register('receita_bruta', { valueAsNumber: true })} />
          <Input label="Custo Vendas" type="number" step="0.01" {...register('custo_vendas', { valueAsNumber: true })} />
          <Input label="Despesas Operacionais" type="number" step="0.01" {...register('despesas_operacionais', { valueAsNumber: true })} />
          <Input label="Despesas Financeiras" type="number" step="0.01" {...register('despesas_financeiras', { valueAsNumber: true })} />
        </div>
      </div>

      <Select label="Setor" {...register('setor')} options={SETORES} />
      <Input label="Período" placeholder="2024-12" {...register('periodo_referencia')} />

      <Button type="submit" loading={loading} className="w-full">
        Calcular Análise
      </Button>
    </form>
  )
}"""
criar_arquivo("frontend/components/forms/FormularioManual.tsx", form)

# ============================================
# APP - Layout
# ============================================
layout = """import './globals.css'

export const metadata = {
  title: 'Growli - Análise Financeira',
  description: 'Análise financeira inteligente'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-100">
        <header className="bg-white border-b p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Growli</h1>
            <nav className="space-x-4">
              <a href="/" className="text-neutral-600 hover:text-neutral-900">Início</a>
              <a href="/analise" className="text-neutral-600 hover:text-neutral-900">Análise</a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-neutral-900 text-white py-8 text-center">
          <p>© 2025 Growli</p>
        </footer>
      </body>
    </html>
  )
}"""
criar_arquivo("frontend/app/layout.tsx", layout)

# ============================================
# APP - Globals CSS
# ============================================
css = """@tailwind base;
@tailwind components;
@tailwind utilities;"""
criar_arquivo("frontend/app/globals.css", css)

# ============================================
# APP - Home Page
# ============================================
home = """import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Análise Financeira Inteligente
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Entenda seus números em 5 minutos
        </p>
        <Link href="/analise">
          <Button className="text-lg px-8 py-3">Começar Análise</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-semibold mb-2">Indicadores</h3>
          <p className="text-sm text-neutral-600">12 indicadores essenciais</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="font-semibold mb-2">Cenários</h3>
          <p className="text-sm text-neutral-600">3 projeções automáticas</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="font-semibold mb-2">Estratégias</h3>
          <p className="text-sm text-neutral-600">Ações personalizadas</p>
        </Card>
      </div>
    </div>
  )
}"""
criar_arquivo("frontend/app/page.tsx", home)

# ============================================
# APP - Análise Page
# ============================================
analise = r"""'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { FormularioManual } from '@/components/forms/FormularioManual'
import { useIndicators } from '@/hooks/useIndicators'

export default function AnalisePage() {
  const { calcular, loading } = useIndicators()
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    const result = await calcular(data)
    localStorage.setItem('resultado', JSON.stringify(result))
    router.push('/resultado')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Nova Análise Financeira</h1>
      <Card>
        <FormularioManual onSubmit={handleSubmit} loading={loading} />
      </Card>
    </div>
  )
}"""
criar_arquivo("frontend/app/analise/page.tsx", analise)

# ============================================
# APP - Resultado Page (usando r-string)
# ============================================
resultado = r"""'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { KPI } from '@/components/ui/KPI'
import { Button } from '@/components/ui/Button'
import { ChartRevenueScenario } from '@/components/charts/ChartRevenueScenario'
import { formatBRL, formatPercent } from '@/utils/format'
import { ResultadoAnalise } from '@/types'

export default function ResultadoPage() {
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('resultado')
    if (!data) {
      router.push('/analise')
      return
    }
    setResultado(JSON.parse(data))
  }, [router])

  if (!resultado) return <div className="p-12 text-center">Carregando...</div>

  const { indicadores, cenarios, pontos_fortes, acoes_prioritarias, saude_financeira_score } = resultado

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resultado da Análise</h1>
          <p className="text-neutral-600">{resultado.setor}</p>
        </div>
        <Button onClick={() => router.push('/analise')}>Nova Análise</Button>
      </div>

      <Card>
        <div className="text-center">
          <div className="text-6xl font-bold text-primary-600 mb-2">
            {saude_financeira_score}/100
          </div>
          <p className="text-lg text-neutral-600">Score de Saúde Financeira</p>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Indicadores Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI 
            label="Liquidez Corrente" 
            value={indicadores.liquidez_corrente.toFixed(2)} 
            status={indicadores.liquidez_corrente >= 1.5 ? 'ok' : 'warning'} 
          />
          <KPI 
            label="Margem Líquida" 
            value={formatPercent(indicadores.margem_liquida)} 
            status={indicadores.margem_liquida >= 10 ? 'ok' : 'warning'} 
          />
          <KPI 
            label="Capital de Giro" 
            value={formatBRL(indicadores.capital_giro)} 
            status={indicadores.capital_giro > 0 ? 'ok' : 'critical'} 
          />
          <KPI 
            label="Endividamento" 
            value={formatPercent(indicadores.endividamento_geral)} 
            status={indicadores.endividamento_geral <= 50 ? 'ok' : 'warning'} 
          />
        </div>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Projeções de Cenários</h2>
        <ChartRevenueScenario 
          cenarios={cenarios} 
          receitaAtual={50000} 
        />
      </Card>

      {pontos_fortes.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Pontos Fortes</h2>
          <ul className="space-y-2">
            {pontos_fortes.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {acoes_prioritarias.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Ações Prioritárias</h2>
          <ol className="space-y-2">
            {acoes_prioritarias.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="font-bold text-primary-600">{i + 1}.</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  )
}"""
criar_arquivo("frontend/app/resultado/page.tsx", resultado)

print("\n✅ PARTE 2 CONCLUÍDA!")
print("\n🎉 FRONTEND COMPLETO!")
print("\n📝 Próximos passos:")
print("1. cd frontend")
print("2. npm install")
print("3. npm run dev")