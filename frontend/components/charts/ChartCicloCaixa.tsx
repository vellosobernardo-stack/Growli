'use client'
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
