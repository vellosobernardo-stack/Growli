'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface GraficoBarrasProps {
  titulo: string;
  labels: string[];
  valores: number[];
  cores?: string[];
  mostrarPercentual?: boolean;
}

export default function GraficoBarras({ 
  titulo, 
  labels, 
  valores, 
  cores = ['#3b82f6', '#60a5fa', '#93c5fd'],
  mostrarPercentual = false 
}: GraficoBarrasProps) {
  
  // ✅ FORÇAR TODAS AS CORES PARA AZUL (independente do que vem do backend)
  const coresAzuis = ['#3b82f6', '#60a5fa', '#93c5fd', '#2563eb', '#1d4ed8'];
  
  // Preparar dados para o gráfico
  const data = labels.map((label, index) => ({
    name: label,
    valor: valores[index],
    cor: coresAzuis[index % coresAzuis.length]  // ✅ Usa apenas tons de azul
  }));

  // Calcular total para percentuais
  const total = valores.reduce((acc, val) => acc + val, 0);

  // Formatter customizado para valores monetários brasileiros
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Calcular percentual
  const calcularPercentual = (valor: number) => {
    if (total === 0) return '0%';
    return `${((valor / total) * 100).toFixed(1)}%`;
  };

  // Tooltip customizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const valor = payload[0].value;
      const percentual = calcularPercentual(valor);
      
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            {payload[0].payload.name}
          </p>
          <p className="text-base font-bold text-blue-600">
            {formatarMoeda(valor)}
          </p>
          {mostrarPercentual && (
            <p className="text-sm text-gray-600 mt-1">
              {percentual} do total
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Renderizar label customizada nas barras
  const renderCustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const percentual = calcularPercentual(value);
    
    return (
      <text 
        x={x + width / 2} 
        y={y + height / 2} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
        className="text-xs font-bold"
      >
        {percentual}
      </text>
    );
  };
 
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        {titulo}
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            tickFormatter={formatarMoeda}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
          <Bar 
            dataKey="valor" 
            radius={[8, 8, 0, 0]}
            {...(mostrarPercentual && { label: renderCustomLabel })}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.cor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {mostrarPercentual && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Total: <span className="font-semibold text-gray-900">{formatarMoeda(total)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
