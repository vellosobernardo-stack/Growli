'use client'
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
}