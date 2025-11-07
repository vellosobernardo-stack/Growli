'use client';

import { 
  TrendingUp, DollarSign, Calendar, Wallet, BarChart3, 
  FileText, Info, TrendingDown
} from 'lucide-react';
import { ResultadoNivel } from '@/types/analise';

interface ResultadosNivel1Props {
  resultado: ResultadoNivel;
  onAvancar: () => void;
}

// Mapeamento de ícones e cores por KPI
const kpiConfig: { [key: string]: { icon: any; color: string; bgColor: string; textColor: string } } = {
  'Margem Bruta': { 
    icon: TrendingUp, 
    color: 'emerald',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    textColor: 'text-emerald-600 dark:text-emerald-400'
  },
  'Resultado Operacional': { 
    icon: DollarSign, 
    color: 'amber',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    textColor: 'text-amber-600 dark:text-amber-400'
  },
  'Fôlego de Caixa': { 
    icon: Calendar, 
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  'Liquidez Imediata': { 
    icon: Wallet, 
    color: 'purple',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    textColor: 'text-purple-600 dark:text-purple-400'
  },
  'Ponto de Equilíbrio': { 
    icon: BarChart3, 
    color: 'orange',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    textColor: 'text-orange-600 dark:text-orange-400'
  },
};

// Explicações para tooltips
const explicacoesKPI: { [key: string]: string } = {
  'Margem Bruta': 'Quanto sobra de cada R$ 100 vendidos antes das despesas fixas.',
  'Resultado Operacional': 'Diferença entre a receita e todos os custos e despesas fixas.',
  'Fôlego de Caixa': 'Quantos dias o caixa cobre suas despesas atuais sem novas vendas.',
  'Liquidez Imediata': 'Capacidade de pagar as contas de curto prazo com o dinheiro em caixa e banco.',
  'Ponto de Equilíbrio': 'Faturamento mínimo necessário para não ter prejuízo.',
};

export default function ResultadosNivel1({ resultado, onAvancar }: ResultadosNivel1Props) {
  
  // Encontrar dados do gráfico de composição
  const graficoComposicao = resultado.graficos.find(g => 
    g.titulo.includes('Entradas') || g.titulo.includes('Composição')
  );

  // Calcular saldo do mês
  let saldoMes = 0;
  if (graficoComposicao) {
    const receita = graficoComposicao.valores[0] || 0;
    const custos = graficoComposicao.valores[1] || 0;
    const despesas = graficoComposicao.valores[2] || 0;
    saldoMes = receita - custos - despesas;
  }

  // Encontrar valores da tabela resumo
  const tabelaResumo = resultado.tabelas.find(t => 
    t.titulo.includes('Resumo') || t.titulo.includes('Financeiro')
  );

  return (
    <div className="px-6 md:px-8 lg:px-12 py-8 space-y-8">

      
      {/* Badge Análise Concluída */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
          <span className="text-sm font-medium text-green-700">Análise Concluída</span>
        </div>
      </div>


      {/* Card Visão Básica */}
      <div className="bg-gradient-to-br from-white via-white to-green-50/30 border border-green-100 rounded-xl shadow-xl p-8 animate-fade-in">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <FileText className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Visão Básica</h2>
            <p className="text-base text-gray-600">Principais indicadores do período analisado</p>
          </div>
        </div>
        
        <div className="text-base text-gray-700 leading-relaxed">
          {resultado.mensagem}
        </div>
      </div>

      {/* Indicadores-chave COM TOOLTIPS */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Indicadores-chave do seu mês</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultado.kpis.slice(0, 5).map((kpi, index) => {
            const config = kpiConfig[kpi.nome] || kpiConfig['Margem Bruta'];
            const Icon = config.icon;
            const explicacao = explicacoesKPI[kpi.nome] || '';
            
            return (
              <div key={index} className="group relative">
                <div 
                  className={`${config.bgColor} border border-${config.color}-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                      <Icon className={`w-6 h-6 ${config.textColor}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{kpi.nome}</p>
                    <p className={`text-3xl font-bold ${config.textColor}`}>
                      {kpi.formato === 'moeda' && 'R$ '}
                      {kpi.valor.toLocaleString('pt-BR', { 
                        minimumFractionDigits: kpi.formato === 'moeda' ? 2 : 0,
                        maximumFractionDigits: kpi.formato === 'moeda' ? 2 : 1 
                      })}
                      {kpi.formato === 'percentual' && '%'}
                      {kpi.formato === 'dias' && ' dias'}
                      {kpi.formato === 'indice' && ''}
                    </p>
                  </div>
                </div>

                {/* Tooltip - aparece no hover */}
                {explicacao && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          {explicacao}
                        </p>
                      </div>
                      {/* Seta do tooltip */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de barras */}
      {graficoComposicao && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-semibold text-gray-900">{graficoComposicao.titulo}</h3>
          </div>
          
          <p className="text-sm text-gray-600">Distribuição dos seus valores mensais</p>

          <div className="space-y-6">
            {graficoComposicao.labels.map((label, index) => {
              const valor = graficoComposicao.valores[index];
              const maxValor = Math.max(...graficoComposicao.valores);
              const percentual = (valor / maxValor) * 100;
              
              let corBarra = 'bg-emerald-500';
              let corTexto = 'text-emerald-600';
              
              if (label.includes('Custos') || label.includes('Custo')) {
                corBarra = 'bg-orange-500';
                corTexto = 'text-orange-600';
              } else if (label.includes('Despesas')) {
                corBarra = 'bg-blue-500';
                corTexto = 'text-blue-600';
              }
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{label}</span>
                    <span className={`font-bold ${corTexto}`}>
                      R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`${corBarra} h-full rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentual}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SALDO DO MÊS */}
          <div className={`border-l-4 ${saldoMes >= 0 ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'} p-5 rounded-r-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {saldoMes >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-600">Saldo do Mês</p>
                  <p className="text-xs text-gray-500">Receita - Custos - Despesas</p>
                </div>
              </div>
              <p className={`text-3xl font-bold ${saldoMes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {Math.abs(saldoMes).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Nota explicativa */}
          <div className="border-l-4 border-green-600 bg-gray-50 p-4 rounded-r-lg">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Nota:</strong> As barras acima representam os valores absolutos. 
              A barra mais longa é sempre a Receita Bruta (100% de referência).
            </p>
          </div>
        </div>
      )}

      {/* Como interpretar */}
      <div className="bg-white border-l-4 border-green-600 rounded-r-xl shadow-lg p-8">
        <div className="flex items-start gap-4">
          <BarChart3 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Como interpretar seu gráfico
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Este gráfico mostra como o dinheiro da sua operação se distribui no mês. A receita representa 
              tudo o que entrou no caixa, enquanto o custo das vendas reflete o que foi necessário para entregar 
              o produto ou serviço. As despesas fixas são os gastos que se repetem mês a mês — como aluguel, 
              folha e energia. Ao observar a diferença entre as barras, você identifica quanto sobra realmente 
              da operação para gerar lucro ou formar reserva de caixa.
            </p>
          </div>
        </div>
      </div>

      {/* Resumo Financeiro - Tabela */}
      {tabelaResumo && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-transparent p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-semibold text-gray-900">Resumo Financeiro</h3>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tabelaResumo.linhas.map((linha, index) => {
              const item = Array.isArray(linha) ? linha[0] : (linha as any).Item || '';
              const valor = Array.isArray(linha) ? linha[1] : (linha as any).Valor || (linha as any)['Valor (R$)'] || 0;
              
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 font-medium">{item}</span>
                  <span className="text-gray-900 font-bold">
                    R$ {typeof valor === 'number' 
                      ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : valor}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Assumptions */}
      {resultado.assumptions && resultado.assumptions.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            Estimativas Aplicadas
          </h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-yellow-700">
            {resultado.assumptions.map((assumption, index) => (
              <li key={index}>{assumption}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Final */}
      <div className="relative bg-gradient-to-r from-green-600 via-green-600 to-green-500 rounded-xl shadow-2xl overflow-hidden">
        {/* Pattern decorativo */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Pronto para mais insights?
          </h3>
          
          <p className="text-white/95 text-lg leading-relaxed max-w-2xl mx-auto">
            Esta análise básica mostra seu equilíbrio financeiro atual. No <strong>Nível 2</strong>, 
            você vai entender por que o caixa aperta e quanto capital precisa para operar com folga. 
            No <strong>Nível 3</strong>, vamos mergulhar em estratégias avançadas para crescer com segurança.
          </p>
          
          <button
            onClick={onAvancar}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Avançar para Nível 2
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}