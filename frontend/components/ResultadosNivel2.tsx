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
    <div className="p-8 space-y-8">
      {/* Mensagem Principal */}
      <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-lg animate-fade-in">
        <h2 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
          📈 Análise Nível 2 - Capital de Giro e Prazos
        </h2>
        <p className="text-foreground leading-relaxed">
          {resultado.mensagem}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-scale-in">
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
      <div className="space-y-6">
        {resultado.graficos.map((grafico, index) => (
          <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
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
      </div>

      {/* Tabelas */}
      <div className="space-y-6">
        {resultado.tabelas.map((tabela, index) => (
          <TabelaResultados
            key={index}
            titulo={tabela.titulo}
            colunas={tabela.colunas}
            linhas={tabela.linhas}
          />
        ))}
      </div>

      {/* Assumptions */}
      {resultado.assumptions.length > 0 && (
        <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-lg">
          <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
            ℹ️ Estimativas Aplicadas
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            {resultado.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Convite Próximo Nível */}
      {resultado.convite_proximo_nivel && (
        <div className="bg-gradient-to-r from-secondary to-accent p-8 rounded-lg text-white shadow-strong animate-scale-in">
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
            🎯 Quer ver o futuro do seu negócio?
          </h3>
          <p className="mb-6 text-lg">{resultado.convite_proximo_nivel}</p>
          <button
            onClick={onAvancar}
            className="px-8 py-4 bg-white text-secondary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-medium"
          >
            Avançar para Nível 3 →
          </button>
        </div>
      )}
    </div>
  );
}