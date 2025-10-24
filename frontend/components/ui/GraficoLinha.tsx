'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Serie {
  nome: string;
  valores: number[];
  cor?: string;
}

interface GraficoLinhaProps {
  titulo: string;
  labels: string[];
  series: Serie[];
}

export default function GraficoLinha({ titulo, labels, series }: GraficoLinhaProps) {
  // Transformar dados para formato do Recharts
  const data = labels.map((label, index) => {
    const ponto: any = { name: label };
    series.forEach((serie) => {
      ponto[serie.nome] = serie.valores[index];
    });
    return ponto;
  });

  const coresPadrao = ['#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#f59e0b'];

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value: any) => formatarValor(value)} />
          <Legend />
          {series.map((serie, index) => (
            <Line
              key={serie.nome}
              type="monotone"
              dataKey={serie.nome}
              stroke={serie.cor || coresPadrao[index % coresPadrao.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}