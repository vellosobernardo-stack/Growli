'use client'
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
