'use client'
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
