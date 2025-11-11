'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Flame,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { ResultadoNivel } from '@/types/analise';
import GraficoBarras from './ui/GraficoBarras';

interface ResultadosNivel2Props {
  resultado: ResultadoNivel;
  onAvancar: () => void;
}

export default function ResultadosNivel2({
  resultado,
  onAvancar,
}: ResultadosNivel2Props) {
  const [hoveredIndicador, setHoveredIndicador] = useState<string | null>(null);

  // ========== EXTRAIR DADOS DOS KPIs ==========
  const kpisMap = useMemo(() => {
    const map: Record<string, { valor: number; classificacao?: string }> = {};
    resultado.kpis.forEach(kpi => {
      map[kpi.nome] = {
        valor: kpi.valor,
        classificacao: kpi.classificacao
      };
    });
    return map;
  }, [resultado.kpis]);

  // ========== EXTRAIR PRAZOS DO GRÁFICO ==========
  const prazosData = useMemo(() => {
    const graficoPrazos = resultado.graficos.find(
      g => g.tipo === 'barras' && g.titulo.toLowerCase().includes('praz')
    );
    
    if (!graficoPrazos || graficoPrazos.tipo !== 'barras') {
      return { PMR: 30, PMP: 20, PME: 0 };
    }

    const prazos: Record<string, number> = {};
    graficoPrazos.labels.forEach((label, idx) => {
      prazos[label] = graficoPrazos.valores[idx];
    });

    return {
      PMR: Math.round(prazos['DSO'] || 30),
      PMP: Math.round(prazos['DPO'] || 20),
      PME: Math.round(prazos['DIO'] || 0),
    };
  }, [resultado.graficos]);

  const { PMR, PMP, PME } = prazosData;

  // ========== EXTRAIR SIMULAÇÕES DA TABELA ==========
  const simulacoesData = useMemo(() => {
    const tabelaSimulacoes = resultado.tabelas.find(
      t => t.titulo.toLowerCase().includes('simula')
    );
    
    if (!tabelaSimulacoes || tabelaSimulacoes.linhas.length < 2) {
      return {
        reduzirPMR: 0,
        aumentarPMP: 0,
        total: 0
      };
    }

    return {
      reduzirPMR: tabelaSimulacoes.linhas[0][1] || 0,
      aumentarPMP: tabelaSimulacoes.linhas[1][1] || 0,
      total: tabelaSimulacoes.linhas[2]?.[1] || 0
    };
  }, [resultado.tabelas]);

  // ========== MONTAR INDICADORES COM DADOS REAIS ==========
  const indicadores = [
    {
      id: 'ciclo',
      nome: 'Ciclo Financeiro',
      valor: kpisMap['Ciclo Financeiro']?.valor || 0,
      formato: 'dias',
      cor: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      icone: Clock,
      classificacao: kpisMap['Ciclo Financeiro']?.classificacao,
      tooltip: 'Tempo entre pagamento a fornecedores e recebimento de clientes. Quanto menor, melhor para o caixa.',
    },
    {
      id: 'ncg',
      nome: 'NCG Estimada',
      valor: kpisMap['NCG Estimada']?.valor || 0,
      formato: 'moeda',
      cor: 'emerald',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      icone: DollarSign,
      tooltip: 'Necessidade de Capital de Giro: valor mínimo necessário para manter as operações do dia a dia.',
    },
    {
      id: 'alavancagem',
      nome: 'Alavancagem',
      valor: kpisMap['Alavancagem']?.valor || 0,
      formato: 'numero',
      cor: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      icone: TrendingUp,
      classificacao: kpisMap['Alavancagem']?.classificacao,
      tooltip: 'Relação entre dívidas e receita. Valores acima de 2x indicam alto endividamento.',
    },
  ];

  // Adicionar Cobertura de Juros se existir
  if (kpisMap['Cobertura de Juros']) {
    indicadores.push({
      id: 'cobertura',
      nome: 'Cobertura de Juros',
      valor: kpisMap['Cobertura de Juros'].valor,
      formato: 'numero',
      cor: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      textColor: 'text-orange-600 dark:text-orange-400',
      icone: Flame,
      classificacao: kpisMap['Cobertura de Juros'].classificacao,
      tooltip: 'Quantas vezes o lucro operacional cobre as despesas com juros. Acima de 3x indica boa capacidade de pagamento.',
    });
  }

  // Adicionar Receita por Funcionário se existir
  if (kpisMap['Receita por Funcionário']) {
    indicadores.push({
      id: 'receita_func',
      nome: 'Receita por Funcionário',
      valor: kpisMap['Receita por Funcionário'].valor,
      formato: 'moeda',
      cor: 'indigo',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      icone: Users,
      tooltip: 'Produtividade média: quanto cada colaborador gera de receita.',
    });
  }

  // ========== FORMATAR VALORES ==========
  const formatarValor = (valor: number, formato: string) => {
    if (formato === 'moeda') {
      return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (formato === 'numero') {
      return `${valor.toFixed(1)}x`;
    } else if (formato === 'dias') {
      return `${Math.round(valor)} dias`;
    }
    return valor.toString();
  };

  // ========== GERAR DIAGNÓSTICO BASEADO EM PMR/PMP ==========
  const diagnostico = useMemo(() => {
    let situacao = '';
    let icone = CheckCircle;
    let corIcone = 'text-green-600';
    let corBg = 'bg-green-50';
    let corBorda = 'border-green-600';
    let analise = '';
    let recomendacao = '';

    if (PMR > PMP) {
      situacao = 'Descasamento de Caixa';
      icone = AlertTriangle;
      corIcone = 'text-orange-600';
      corBg = 'bg-orange-50';
      corBorda = 'border-orange-600';
      const descasamento = PMR - PMP;
      analise = `Sua empresa recebe dos clientes em ${PMR} dias, mas paga fornecedores em ${PMP} dias. Isso gera um descasamento de ${descasamento} dias no caixa, significando que você precisa antecipar pagamentos antes de receber.`;
      recomendacao = 'Reforçar capital de giro, buscar prazos maiores com fornecedores ou considerar antecipação de recebíveis.';
    } else if (PMR < PMP) {
      situacao = 'Fluxo de Caixa Positivo';
      icone = CheckCircle;
      corIcone = 'text-green-600';
      corBg = 'bg-green-50';
      corBorda = 'border-green-600';
      const folga = PMP - PMR;
      analise = `Excelente! Sua empresa recebe dos clientes em ${PMR} dias e paga fornecedores em ${PMP} dias. Você tem ${folga} dias de folga no caixa.`;
      recomendacao = 'Manter essas políticas de cobrança e pagamento. Considere utilizar o excedente para investimentos estratégicos.';
    } else {
      situacao = 'Ciclo Equilibrado';
      icone = AlertCircle;
      corIcone = 'text-blue-600';
      corBg = 'bg-blue-50';
      corBorda = 'border-blue-600';
      analise = `Seus prazos de recebimento (${PMR} dias) e pagamento (${PMP} dias) estão equilibrados.`;
      recomendacao = 'Monitorar mensalmente para evitar inversões de ciclo.';
    }

    let analisePME = '';
    if (PME > 0) {
      if (PME < 5) {
        analisePME = `O estoque gira muito rápido (${PME} dias), típico de serviços ou baixa estocagem.`;
      } else if (PME > 40) {
        analisePME = `Atenção: seu estoque permanece parado por ${PME} dias, comprometendo liquidez.`;
      } else {
        analisePME = `Seu estoque gira em ${PME} dias, considerado equilibrado.`;
      }
    }

    return { situacao, icone, corIcone, corBg, corBorda, analise, analisePME, recomendacao };
  }, [PMR, PMP, PME]);

  const Icone = diagnostico.icone;

  // ========== MONTAR ARRAY DE PRAZOS ==========
const prazos = [
  { label: 'PMR', subLabel: 'Prazo de Recebimento', valor: PMR, cor: 'bg-blue-500', textColor: 'text-blue-600' },
  { label: 'PMP', subLabel: 'Prazo de Pagamento', valor: PMP, cor: 'bg-orange-500', textColor: 'text-orange-600' },
];

if (PME > 0) {
  prazos.push({ label: 'PME', subLabel: 'Prazo de Estoque', valor: PME, cor: 'bg-emerald-500', textColor: 'text-emerald-600' });
}

  // ========== MONTAR SIMULAÇÕES ==========
  const simulacoes = [
    { acao: 'Reduzir PMR em 10 dias', impacto: simulacoesData.reduzirPMR },
    { acao: 'Aumentar PMP em 7 dias', impacto: simulacoesData.aumentarPMP },
    { acao: 'Total Potencial', impacto: simulacoesData.total, destaque: true },
  ];

  const formatarMoeda = (valor: number) => {
    const sinal = valor >= 0 ? '+' : '';
    return `${sinal}R$ ${Math.abs(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-8">
      
      {/* Badge Análise Concluída */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
          <span className="text-sm font-medium text-green-700">Análise Concluída</span>
        </div>
      </div>

      {/* MENSAGEM DO BACKEND - Análise Intermediária */}
      {resultado.mensagem && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              
              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Visão Intermediária
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Análise detalhada do ciclo financeiro e capital de giro
                </p>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {resultado.mensagem}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INDICADORES-CHAVE NÍVEL 2 */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Indicadores-chave do Nível 2</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {indicadores.map((indicador) => {
            const IconeInd = indicador.icone;
            const isHovered = hoveredIndicador === indicador.id;
            
            return (
              <div key={indicador.id} className="group relative">
                <div 
                  className={`${indicador.bgColor} border border-${indicador.cor}-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300`}
                  onMouseEnter={() => setHoveredIndicador(indicador.id)}
                  onMouseLeave={() => setHoveredIndicador(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <IconeInd className={`w-6 h-6 ${indicador.textColor}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{indicador.nome}</p>
                    <p className={`text-3xl font-bold ${indicador.textColor}`}>
                      {formatarValor(indicador.valor, indicador.formato)}
                    </p>
                  </div>
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 opacity-100 visible transition-all duration-300 z-10 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{indicador.tooltip}</p>
                      </div>
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

      {/* PRAZOS OPERACIONAIS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 to-transparent p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Prazos Operacionais (dias)</h3>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          {prazos.map((prazo, idx) => {
            const maxValor = Math.max(PMR, PMP, PME || 0);
            const percentual = maxValor > 0 ? (prazo.valor / maxValor) * 100 : 0;
            
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{prazo.subLabel}</span>
                  <span className={`font-bold ${prazo.textColor}`}>
                    {prazo.valor} dias
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`${prazo.cor} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentual}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DIAGNÓSTICO */}
      <div className={`border-l-4 ${diagnostico.corBorda} ${diagnostico.corBg} rounded-r-xl shadow-lg p-8`}>
        <div className="flex items-start gap-4">
          <Icone className={`w-7 h-7 ${diagnostico.corIcone} flex-shrink-0 mt-1`} />
          <div className="flex-1 space-y-4">
            <h4 className="text-lg font-bold text-gray-900">{diagnostico.situacao}</h4>
            <p className="text-gray-700 leading-relaxed">{diagnostico.analise}</p>
            {diagnostico.analisePME && (
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900">Estoque:</strong> {diagnostico.analisePME}
              </p>
            )}
            <div className="pt-3 border-t border-gray-300">
              <p className="text-base font-medium text-gray-900 mb-2">📌 Recomendação:</p>
              <p className="text-gray-700 leading-relaxed">{diagnostico.recomendacao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULAÇÃO DE IMPACTO */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-purple-50 to-transparent p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Simulação de Impacto no Caixa</h3>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {simulacoes.map((sim, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${
                sim.destaque ? 'bg-green-50' : ''
              }`}
            >
              <span className={`text-gray-700 ${sim.destaque ? 'font-bold' : 'font-medium'}`}>
                {sim.acao}
              </span>
              <span className={`text-gray-900 font-bold ${sim.destaque ? 'text-lg' : ''}`}>
                {formatarMoeda(sim.impacto)}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-t border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Como interpretar:</strong> Valores positivos indicam 
              liberação de caixa. Reduzir o prazo de recebimento e aumentar o prazo de pagamento 
              melhora seu fluxo de caixa.
            </p>
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="relative bg-gradient-to-r from-green-600 via-green-600 to-green-500 rounded-xl shadow-2xl overflow-hidden">
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
            Quer ver o futuro do seu negócio?
          </h3>
          
          <p className="text-white/95 text-lg leading-relaxed max-w-2xl mx-auto">
            No <strong>Nível 3</strong> você verá projeções personalizadas em 
            <strong> 30, 60 e 90 dias</strong>, cenários otimistas e pessimistas, 
            e um plano de ação estratégico completo.
          </p>
          
          <button
            onClick={onAvancar}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Avançar para Nível 3
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}