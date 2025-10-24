'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GraficoBarrasProps {
  titulo: string;
  labels: string[];
  valores: number[];
  cores?: string[];
}

export default function GraficoBarras({ titulo, labels, valores, cores }: GraficoBarrasProps) {
  // Transformar dados para formato do Recharts
  const data = labels.map((label, index) => ({
    name: label,
    valor: valores[index],
  }));

  const coresPadrao = cores || ['#3b82f6', '#10b981', '#f59e0b'];

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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value: any) => formatarValor(value)} />
          <Bar dataKey="valor" fill={coresPadrao[0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}