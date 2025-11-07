'use client';

import { DiagnosticoEstrategia } from '@/types/analise';
import { Lightbulb, Target, AlertCircle, TrendingUp, Zap, Shield } from 'lucide-react';

interface DiagnosticoFinalProps {
  diagnostico: DiagnosticoEstrategia;
  // Props adicionais para análise inteligente (opcional)
  nivel1?: any;
  nivel2?: any;
  resultado?: any;
}

export default function DiagnosticoFinal({ 
  diagnostico, 
  nivel1, 
  nivel2, 
  resultado 
}: DiagnosticoFinalProps) {

  // ============ DIAGNÓSTICO INTELIGENTE (OPCIONAL - SE TIVER OS DADOS) ============
  const gerarDiagnosticoInteligente = () => {
    if (!nivel1 || !nivel2 || !resultado) {
      // Se não tiver os dados, usar o diagnóstico da API normalmente
      return {
        visaoGeral: diagnostico.diagnostico.join(' '),
        temAnaliseInteligente: false,
      };
    }

    // Pegar valores dos 3 níveis
    const margemBruta = nivel1.kpis.find((k: any) => k.nome === 'Margem Bruta')?.valor || 0;
    const folegoCaixa = nivel1.kpis.find((k: any) => k.nome === 'Fôlego de Caixa')?.valor || 0;
    const cicloFinanceiro = nivel2.kpis.find((k: any) => k.nome === 'Ciclo Financeiro')?.valor || 0;
    const roa = resultado.kpis.find((k: any) => k.nome === 'ROA (Anual)')?.valor || 0;
    const roe = resultado.kpis.find((k: any) => k.nome === 'ROE (Anual)')?.valor || 0;

    let visaoGeral = '';
    
    // Analisar Margem Bruta
    if (margemBruta < 20) {
      visaoGeral += `🔴 Margem bruta crítica de ${margemBruta.toFixed(1)}% - priorize revisão de preços e custos urgentemente. `;
    } else if (margemBruta < 30) {
      visaoGeral += `🟡 Margem bruta moderada de ${margemBruta.toFixed(1)}% - há espaço significativo para otimização. `;
    } else {
      visaoGeral += `🟢 Margem bruta saudável de ${margemBruta.toFixed(1)}% - continue monitorando. `;
    }
    
    // Analisar Fôlego de Caixa
    if (folegoCaixa <= 0) {
      visaoGeral += `🔴 Fôlego de caixa crítico (${Math.round(folegoCaixa)} dias) - ação imediata necessária para evitar problemas de liquidez. `;
    } else if (folegoCaixa < 30) {
      visaoGeral += `🟡 Fôlego de caixa baixo (${Math.round(folegoCaixa)} dias) - recomendável aumentar reserva de segurança. `;
    } else {
      visaoGeral += `🟢 Fôlego de caixa adequado (${Math.round(folegoCaixa)} dias) - posição confortável. `;
    }
    
    // Analisar ROE
    if (roe < 0) {
      visaoGeral += `ROE negativo de ${roe.toFixed(1)}% indica que o negócio está destruindo valor para os sócios - revisão estratégica urgente.`;
    } else if (roe < 15) {
      visaoGeral += `ROE de ${roe.toFixed(1)}% mostra retorno moderado - há potencial para melhorar a lucratividade.`;
    } else {
      visaoGeral += `ROE de ${roe.toFixed(1)}% demonstra excelente retorno sobre o patrimônio investido.`;
    }

    return {
      visaoGeral,
      temAnaliseInteligente: true,
    };
  };

  const diagnosticoInteligente = gerarDiagnosticoInteligente();

  // ============ GERAR PLANO COM 4 AÇÕES POR PERÍODO ============
  const gerarPlanoCompleto = () => {
    // Ações base inteligentes e práticas
    const acoesBase = {
      dias30: [
        {
          titulo: "Revisar Política de Cobrança",
          descricao: "Implementar régua de cobrança automatizada e oferecer descontos para pagamento antecipado (2% para 10 dias, 5% à vista).",
          prioridade: "Alta",
        },
        {
          titulo: "Negociar Prazos com Fornecedores",
          descricao: "Conversar com os 5 principais fornecedores para estender prazo de pagamento de 30 para 45-60 dias sem perder descontos.",
          prioridade: "Alta",
        },
        {
          titulo: "Mapear Custos Variáveis",
          descricao: "Levantar todos os custos que sobem com as vendas (comissões, frete, taxas, embalagens) e buscar otimizações.",
          prioridade: "Média",
        },
        {
          titulo: "Implementar Controle Diário de Caixa",
          descricao: "Criar planilha simples para registrar todas as entradas e saídas de dinheiro diariamente.",
          prioridade: "Alta",
        },
      ],
      dias60: [
        {
          titulo: "Implementar Dashboard de KPIs",
          descricao: "Criar acompanhamento semanal de Margem Bruta, PMR, PMP, Liquidez e Fôlego de Caixa no Google Sheets ou Excel.",
          prioridade: "Alta",
        },
        {
          titulo: "Otimizar Giro de Estoque",
          descricao: "Revisar itens parados há mais de 30 dias e fazer promoções. Ajustar curva ABC de compras.",
          prioridade: "Média",
        },
        {
          titulo: "Avaliar Rentabilidade por Canal",
          descricao: "Analisar margem de cada canal de venda (online, loja física, marketplace) e focar nos mais lucrativos.",
          prioridade: "Alta",
        },
        {
          titulo: "Revisar Contratos e Despesas Fixas",
          descricao: "Analisar todos os contratos (aluguel, energia, telefone, software) e negociar redução ou trocar fornecedores.",
          prioridade: "Média",
        },
      ],
      dias90: [
        {
          titulo: "Estruturar Captação de Capital",
          descricao: "Avaliar necessidade de injeção de capital próprio, buscar investidor-anjo ou linha de crédito para crescimento sustentável.",
          prioridade: "Alta",
        },
        {
          titulo: "Criar Reserva de Emergência",
          descricao: "Separar mensalmente 10% do lucro líquido para formar reserva equivalente a 3 meses de despesas fixas.",
          prioridade: "Alta",
        },
        {
          titulo: "Desenvolver Plano de Crescimento",
          descricao: "Criar estratégia de expansão baseada nos números: novos produtos/serviços, canais ou regiões.",
          prioridade: "Média",
        },
        {
          titulo: "Treinar Equipe em Gestão Financeira",
          descricao: "Capacitar colaboradores-chave para entender os KPIs do negócio e contribuir com melhorias.",
          prioridade: "Baixa",
        },
      ],
    };

    // Função para mesclar com dados da API
    const mesclarComAPI = (acoesBase: any[], acoesAPI: string[] = []) => {
      const resultado = [...acoesBase];
      
      // Substituir as 2 primeiras ações pelas da API se existirem e forem úteis
      if (acoesAPI && acoesAPI.length > 0) {
        acoesAPI.slice(0, 2).forEach((item, idx) => {
          if (item && item.trim()) {
            // Tentar extrair título e descrição
            const partes = item.split(':');
            let titulo = '';
            let descricao = '';
            
            if (partes.length >= 2) {
              titulo = partes[0].trim();
              descricao = partes.slice(1).join(':').trim();
            } else {
              // Se não tiver ":", usar a primeira frase como título
              const frases = item.split('.');
              titulo = frases[0].trim();
              descricao = frases.slice(1).join('.').trim() || titulo;
            }
            
            if (titulo && descricao) {
              resultado[idx] = {
                titulo: titulo,
                descricao: descricao,
                prioridade: 'Alta',
              };
            }
          }
        });
      }
      
      return resultado;
    };

    return {
      dias30: mesclarComAPI(
        acoesBase.dias30, 
        diagnostico.plano_30_60_90 ? diagnostico.plano_30_60_90["30_dias"] : []
      ),
      dias60: mesclarComAPI(
        acoesBase.dias60, 
        diagnostico.plano_30_60_90 ? diagnostico.plano_30_60_90["60_dias"] : []
      ),
      dias90: mesclarComAPI(
        acoesBase.dias90, 
        diagnostico.plano_30_60_90 ? diagnostico.plano_30_60_90["90_dias"] : []
      ),
    };
  };

  const planoCompleto = gerarPlanoCompleto();

  // ============ GERAR PONTOS DE ATENÇÃO INTELIGENTES ============
  const pontosAtencao = () => {
    const pontos = [];
    
    if (resultado && resultado.kpis) {
      const kpisCriticos = resultado.kpis.filter(
        (kpi: any) => kpi.classificacao === 'vermelho' || kpi.classificacao === 'amarelo'
      );
      
      kpisCriticos.slice(0, 3).forEach((kpi: any) => {
        pontos.push({
          nome: kpi.nome,
          valor: kpi.valor,
          nivel: kpi.classificacao === 'vermelho' ? 'Crítico' : 'Atenção',
        });
      });
    }
    
    // Se não tiver pontos de atenção, adicionar genéricos
    if (pontos.length === 0) {
      pontos.push(
        { nome: 'Liquidez', valor: null, nivel: 'Monitorar' },
        { nome: 'Margem', valor: null, nivel: 'Monitorar' }
      );
    }
    
    return pontos;
  };

  const pontosDeAtencao = pontosAtencao();

  return (
    <div className="space-y-6">
      {/* ========== DIAGNÓSTICO E OPORTUNIDADES ========== */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-900">Diagnóstico e Oportunidades</h2>
            <p className="text-sm text-orange-700">Insights estratégicos baseados na análise completa</p>
          </div>
        </div>

        {/* Visão Geral */}
        <div className="bg-white rounded-lg p-5 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">📊</span>
            </div>
            <h3 className="font-bold text-gray-800">Visão Geral</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {diagnosticoInteligente.visaoGeral}
          </p>
        </div>

        {/* Principais Oportunidades */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="font-bold text-gray-800">Principais Oportunidades</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnostico.oportunidades.slice(0, 2).map((oport, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-green-500 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold text-green-900 mb-2 text-sm">
                  {oport.descricao.split('.')[0] || oport.descricao.substring(0, 60)}
                </h4>
                <div className="flex items-center gap-3 text-xs text-green-700 mb-2">
                  <span className="font-bold">
                    Impacto: {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(oport.impacto_r)}
                  </span>
                  <span className="bg-green-100 px-2 py-1 rounded font-semibold">
                    {oport.impacto_percentual.toFixed(1)}%
                  </span>
                </div>
                {oport.acao && (
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Como fazer:</strong> {oport.acao.substring(0, 120)}
                    {oport.acao.length > 120 && '...'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pontos de Atenção */}
        {pontosDeAtencao.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">Pontos de Atenção</h3>
            </div>
            <div className="space-y-2">
              {pontosDeAtencao.map((ponto, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-orange-400 rounded-lg p-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      ponto.nivel === 'Crítico' ? 'bg-red-500' : 
                      ponto.nivel === 'Atenção' ? 'bg-yellow-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <span className="font-semibold text-gray-800 text-sm">{ponto.nome}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    ponto.nivel === 'Crítico' ? 'bg-red-100 text-red-700' :
                    ponto.nivel === 'Atenção' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {ponto.nivel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========== PLANO 30-60-90 COM 4 AÇÕES (2x2) POR PERÍODO ========== */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-plano-final" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-plano-final)" />
          </svg>
        </div>

        <div className="relative z-10 p-8 sm:p-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              Seu Plano de Ação 30-60-90 Dias
            </h3>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              12 ações práticas para transformar sua empresa nos próximos 3 meses
            </p>
          </div>

          {/* ========== 30 DIAS - 4 AÇÕES ========== */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-5 py-2 bg-green-500 rounded-full shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">30 dias</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">Fundamentos e Otimizações Rápidas</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {planoCompleto.dias30.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-xl hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-base flex-1">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {acao.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========== 60 DIAS - 4 AÇÕES ========== */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-5 py-2 bg-blue-500 rounded-full shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">60 dias</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">Implementação e Expansão</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {planoCompleto.dias60.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-xl hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-base flex-1">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {acao.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========== 90 DIAS - 4 AÇÕES ========== */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-5 py-2 bg-purple-500 rounded-full shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">90 dias</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">Consolidação e Crescimento</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {planoCompleto.dias90.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-xl hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-base flex-1">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {acao.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Final */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <p className="text-lg font-semibold text-white">
              💡 Dica: Revise este plano semanalmente e ajuste conforme necessário para maximizar os resultados!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}