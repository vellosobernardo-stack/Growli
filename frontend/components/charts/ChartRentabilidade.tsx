'use client'
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
