"""
🌱 GROWLI 2.0 - FRONTEND PARTE 3B
Formulário + Página de Resultados
Salve como: upgrade_frontend_parte3b.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🎨 GROWLI 2.0 - Frontend Parte 3B: Formulário + Resultados...\n")

# ============================================
# 1. FORMULÁRIO - 21 SETORES + ESTADO
# ============================================
form_v2 = r"""'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { DadosFinanceiros } from '@/types'

const SETORES = [
  { value: 'agricultura', label: 'Agricultura, Pecuária, Produção Florestal' },
  { value: 'pecuaria', label: 'Pecuária' },
  { value: 'extrativas', label: 'Indústrias Extrativas' },
  { value: 'transformacao', label: 'Indústrias de Transformação' },
  { value: 'eletricidade_gas', label: 'Eletricidade e Gás' },
  { value: 'agua_residuos', label: 'Água, Esgoto e Gestão de Resíduos' },
  { value: 'construcao', label: 'Construção' },
  { value: 'comercio_veiculos', label: 'Comércio e Reparação de Veículos' },
  { value: 'transporte', label: 'Transporte, Armazenagem e Correio' },
  { value: 'alojamento_alimentacao', label: 'Alojamento e Alimentação' },
  { value: 'informacao_comunicacao', label: 'Informação e Comunicação' },
  { value: 'financeiras', label: 'Atividades Financeiras e Seguros' },
  { value: 'imobiliarias', label: 'Atividades Imobiliárias' },
  { value: 'profissionais', label: 'Atividades Profissionais, Científicas e Técnicas' },
  { value: 'administrativas', label: 'Atividades Administrativas' },
  { value: 'administracao_publica', label: 'Administração Pública' },
  { value: 'educacao', label: 'Educação' },
  { value: 'saude', label: 'Saúde Humana e Serviços Sociais' },
  { value: 'artes_cultura', label: 'Artes, Cultura, Esporte e Recreação' },
  { value: 'outras_atividades', label: 'Outras Atividades de Serviços' },
  { value: 'servicos_domesticos', label: 'Serviços Domésticos' },
]

const ESTADOS = [
  { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' }, { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' }, { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' }, { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' }, { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
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
          <Input label="Impostos a Pagar" type="number" step="0.01" {...register('impostos', { valueAsNumber: true })} />
          <Input label="Empréstimos LP" type="number" step="0.01" {...register('emprestimos_lp', { valueAsNumber: true })} />
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

      <div className="grid grid-cols-2 gap-4">
        <Select label="Setor de Atuação" {...register('setor')} options={SETORES} />
        <Select label="Estado (Opcional)" {...register('estado')} options={[{ value: '', label: 'Selecione...' }, ...ESTADOS]} />
      </div>
      
      <Input label="Período" placeholder="2024-12" {...register('periodo_referencia')} />

      <Button type="submit" loading={loading} className="w-full">
        Calcular Análise
      </Button>
    </form>
  )
}
"""
criar_arquivo("frontend/components/forms/FormularioManual.tsx", form_v2)

# ============================================
# 2. PÁGINA DE RESULTADOS - COM NOVOS GRÁFICOS
# ============================================
resultado_v2 = r"""'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { KPI } from '@/components/ui/KPI'
import { Button } from '@/components/ui/Button'
import { ChartRevenueScenario } from '@/components/charts/ChartRevenueScenario'
import { ChartCicloCaixa } from '@/components/charts/ChartCicloCaixa'
import { ChartMargens } from '@/components/charts/ChartMargens'
import { ChartRentabilidade } from '@/components/charts/ChartRentabilidade'
import { ChartPatrimonial } from '@/components/charts/ChartPatrimonial'
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

  const { indicadores, cenarios, pontos_fortes, pontos_atencao, acoes_prioritarias, estrategias_personalizadas, saude_financeira_score, dados_input } = resultado

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resultado da Análise</h1>
          <p className="text-neutral-600">{resultado.setor} {resultado.estado && `| ${resultado.estado}`}</p>
        </div>
        <Button onClick={() => router.push('/analise')}>Nova Análise</Button>
      </div>

      {/* Score */}
      <Card>
        <div className="text-center">
          <div className="text-6xl font-bold text-primary-600 mb-2">
            {saude_financeira_score}/100
          </div>
          <p className="text-lg text-neutral-600">Score de Saúde Financeira</p>
        </div>
      </Card>

      {/* KPIs Principais */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Indicadores Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI 
            label="Liquidez Corrente" 
            value={indicadores.liquidez_corrente.toFixed(2)} 
            status={indicadores.liquidez_corrente >= 1.5 ? 'ok' : indicadores.liquidez_corrente >= 1.0 ? 'warning' : 'critical'} 
          />
          <KPI 
            label="Margem Líquida" 
            value={formatPercent(indicadores.margem_liquida)} 
            status={indicadores.margem_liquida >= 10 ? 'ok' : indicadores.margem_liquida >= 5 ? 'warning' : 'critical'} 
          />
          <KPI 
            label="Capital de Giro" 
            value={formatBRL(indicadores.capital_giro)} 
            status={indicadores.capital_giro > 0 ? 'ok' : 'critical'} 
          />
          <KPI 
            label="Ciclo de Caixa" 
            value={`${Math.round(indicadores.ciclo_caixa)} dias`}
            status={indicadores.ciclo_caixa <= 60 ? 'ok' : 'warning'} 
          />
        </div>
      </div>

      {/* Gráficos em Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ciclo de Caixa */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Ciclo de Caixa</h2>
          <ChartCicloCaixa
            pmr={indicadores.prazo_medio_recebimento}
            pme={indicadores.ciclo_operacional - indicadores.prazo_medio_recebimento}
            pmp={indicadores.prazo_medio_pagamento}
            ciclo_caixa={indicadores.ciclo_caixa}
          />
        </Card>

        {/* Margens */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Evolução das Margens</h2>
          <ChartMargens
            margem_bruta={indicadores.margem_bruta}
            margem_operacional={indicadores.margem_operacional}
            margem_liquida={indicadores.margem_liquida}
          />
        </Card>

        {/* Rentabilidade */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Rentabilidade</h2>
          <ChartRentabilidade
            roe={indicadores.rentabilidade_patrimonio}
            roa={indicadores.rentabilidade_ativo}
          />
        </Card>

        {/* Composição Patrimonial */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Composição do Ativo</h2>
          <ChartPatrimonial
            caixa={dados_input.caixa}
            receber={dados_input.contas_receber}
            estoque={dados_input.estoque}
            imobilizado={dados_input.imobilizado}
          />
        </Card>
      </div>

      {/* Cenários */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Projeções de Cenários</h2>
        <ChartRevenueScenario 
          cenarios={cenarios} 
          receitaAtual={dados_input.receita_bruta} 
        />
      </Card>

      {/* Estratégias Personalizadas */}
      {estrategias_personalizadas && estrategias_personalizadas.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">🎯 Estratégias Personalizadas</h2>
          <div className="space-y-3">
            {estrategias_personalizadas.map((est, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                <span className="font-bold text-primary-600">{i + 1}.</span>
                <span className="text-neutral-700">{est}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Pontos Fortes e Atenção */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {pontos_fortes.length > 0 && (
          <Card>
            <h2 className="text-xl font-semibold mb-4">✅ Pontos Fortes</h2>
            <ul className="space-y-2">
              {pontos_fortes.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {pontos_atencao.length > 0 && (
          <Card>
            <h2 className="text-xl font-semibold mb-4">⚠️ Pontos de Atenção</h2>
            <ul className="space-y-2">
              {pontos_atencao.map((p, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Ações Prioritárias */}
      {acoes_prioritarias.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold mb-4">🚀 Ações Prioritárias</h2>
          <ol className="space-y-2">
            {acoes_prioritarias.map((acao, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{acao}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}
    </div>
  )
}
"""
criar_arquivo("frontend/app/resultado/page.tsx", resultado_v2)

print("\n✅ PARTE 3B CONCLUÍDA!")
print("\n📋 Frontend atualizado:")
print("  ✅ Formulário com 21 setores CNAE")
print("  ✅ Campo de Estado (27 UFs)")
print("  ✅ Página de resultados com 5 novos gráficos")
print("  ✅ Estratégias personalizadas exibidas")
print("\n🔄 O frontend vai recarregar automaticamente!")
print("\n🎉 GROWLI 2.0 COMPLETO!")