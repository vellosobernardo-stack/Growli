'use client';

import CardKPI from './ui/CardKPI';
import GraficoLinha from './ui/GraficoLinha';
import { ResultadoNivel } from '@/types/analise';

interface ResultadosNivel3Props {
  resultado: ResultadoNivel;
}

export default function ResultadosNivel3({ resultado }: ResultadosNivel3Props) {
  return (
    <div className="space-y-6">
      {/* Mensagem Principal */}
      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          🎯 Análise Nível 3 - Projeções e Estratégia
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {resultado.mensagem}
        </p>
      </div>

      {/* KPIs */}
      {resultado.kpis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultado.kpis.map((kpi, index) => (
            <CardKPI
              key={index}
              nome={kpi.nome}
              valor={kpi.valor}
              formato={kpi.formato}
              classificacao={kpi.classificacao}
            />
          ))}
        </div>
      )}

      {/* Gráficos de Projeção */}
      {resultado.graficos.map((grafico, index) => (
        <div key={index}>
          {grafico.tipo === 'linha' && (
            <GraficoLinha
              titulo={grafico.titulo}
              labels={grafico.labels}
              series={grafico.series}
            />
          )}
        </div>
      ))}

      {/* Assumptions (se houver) */}
      {resultado.assumptions.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h4 className="font-semibold text-yellow-800 mb-2">ℹ️ Estimativas Aplicadas</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
            {resultado.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}