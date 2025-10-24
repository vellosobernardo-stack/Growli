'use client';

import CardKPI from './ui/CardKPI';
import GraficoBarras from './ui/GraficoBarras';
import TabelaResultados from './ui/TabelaResultados';
import { ResultadoNivel } from '@/types/analise';

interface ResultadosNivel2Props {
  resultado: ResultadoNivel;
  onAvancar: () => void;
}

export default function ResultadosNivel2({ resultado, onAvancar }: ResultadosNivel2Props) {
  return (
    <div className="space-y-6">
      {/* Mensagem Principal */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          📈 Análise Nível 2 - Capital de Giro e Prazos
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {resultado.mensagem}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Gráficos */}
      {resultado.graficos.map((grafico, index) => (
        <div key={index}>
          {grafico.tipo === 'barras' && (
            <GraficoBarras
              titulo={grafico.titulo}
              labels={grafico.labels}
              valores={grafico.valores}
              cores={grafico.cores}
            />
          )}
        </div>
      ))}

      {/* Tabelas */}
      {resultado.tabelas.map((tabela, index) => (
        <TabelaResultados
          key={index}
          titulo={tabela.titulo}
          colunas={tabela.colunas}
          linhas={tabela.linhas}
        />
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

      {/* Convite para próximo nível */}
      {resultado.convite_proximo_nivel && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-3">🎯 Quer ver o futuro do seu negócio?</h3>
          <p className="mb-4">{resultado.convite_proximo_nivel}</p>
          <button
            onClick={onAvancar}
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Avançar para Nível 3 →
          </button>
        </div>
      )}
    </div>
  );
}