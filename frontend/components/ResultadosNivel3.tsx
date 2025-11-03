'use client';
import CardKPI from './ui/CardKPI';
import GraficoLinha from './ui/GraficoLinha';
import { ResultadoNivel } from '@/types/analise';

interface ResultadosNivel3Props {
  resultado: ResultadoNivel;
}

export default function ResultadosNivel3({ resultado }: ResultadosNivel3Props) {
  return (
    <div className="p-8 space-y-8">
      {/* Mensagem Principal */}
      <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-accent mb-4 flex items-center gap-2">
          🎯 Análise Nível 3 - Projeções e Estratégia
        </h2>
        <p className="text-foreground leading-relaxed">
          {resultado.mensagem}
        </p>
      </div>

      {/* KPIs */}
      {resultado.kpis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-scale-in">
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
      <div className="space-y-6">
        {resultado.graficos.map((grafico, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-lg p-6 shadow-medium animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {grafico.tipo === 'linha' && (
              <GraficoLinha
                titulo={grafico.titulo}
                labels={grafico.labels}
                series={grafico.series}
              />
            )}
          </div>
        ))}
      </div>

      {/* Assumptions */}
      {resultado.assumptions.length > 0 && (
        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-lg animate-scale-in">
          <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
            ℹ️ Premissas das Projeções
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {resultado.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Call to Action Final */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-lg text-white shadow-strong animate-scale-in">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
          ✨ Análise Completa Finalizada!
        </h3>
        <p className="mb-6 text-lg">
          Você completou todos os níveis de análise. Use esses insights para tomar decisões estratégicas e impulsionar o crescimento do seu negócio!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-medium">
            📥 Baixar Relatório PDF
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
            🔄 Nova Análise
          </button>
        </div>
      </div>
    </div>
  );
}