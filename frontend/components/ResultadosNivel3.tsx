'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  ChevronDown, 
  ChevronUp,
  Info,
  AlertCircle,
  CheckCircle,
  Target,
  Calendar,
  FileText,
  Download,
  RotateCcw,
  Lightbulb,
  Zap,
  Shield
} from 'lucide-react';
import { gerarRelatorioPDF } from '@/utils/gerarPDF';
import { ResultadoNivel, DiagnosticoEstrategia, KPI } from '@/types/analise';

interface ResultadosNivel3Props {
  resultado: ResultadoNivel;
  nivel1: ResultadoNivel;
  nivel2: ResultadoNivel;
  diagnostico_estrategia: DiagnosticoEstrategia;
  onNovaAnalise?: () => void;
}

export default function ResultadosNivel3({ 
  resultado, 
  nivel1, 
  nivel2, 
  diagnostico_estrategia,
  onNovaAnalise
}: ResultadosNivel3Props) {
  const [dashboardAberto, setDashboardAberto] = useState(false);
  const [hoveredKPI, setHoveredKPI] = useState<string | null>(null);

  // ============ TOOLTIPS DIDÁTICOS ============
  const tooltipsKPI: { [key: string]: string } = {
    'ROA (Anual)': 'Mostra quanto a empresa ganha para cada R$ 1,00 investido em ativos (máquinas, equipamentos, estoque). Acima de 10% é considerado bom.',
    'ROE (Anual)': 'Mostra quanto você e seus sócios ganham para cada R$ 1,00 que investiram na empresa. Acima de 15% é excelente.',
    'Payback CAPEX': 'Tempo para recuperar o dinheiro investido em equipamentos e máquinas. Menos de 3 anos é considerado bom.',
    'Crescimento Médio': 'Velocidade com que sua receita está crescendo por mês. Valores positivos indicam que o negócio está expandindo.',
    'Margem Bruta': 'De cada R$ 100 vendidos, quanto sobra depois de pagar os custos diretos (produtos, materiais). Acima de 30% é saudável.',
    'Ciclo Financeiro': 'Quantos dias entre pagar fornecedores e receber dos clientes. Quanto menor, melhor para o caixa.',
    'NCG Estimada': 'Dinheiro mínimo necessário para manter as operações do dia a dia rodando.',
    'Alavancagem': 'Quanto de dívida você tem em relação à receita. Acima de 2x indica alto endividamento.',
    'Liquidez Imediata': 'Capacidade de pagar contas de curto prazo com o dinheiro em caixa. Ideal: acima de 1,0.',
    'Fôlego de Caixa': 'Quantos dias o caixa atual aguenta sem novas vendas. Ideal: acima de 30 dias.',
  };

  // ============ FUNÇÕES DE FORMATAÇÃO ============
  const formatarValor = (valor: number, formato: string): string => {
    switch (formato) {
      case 'moeda':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(valor);
      
      case 'percentual':
        return `${valor.toFixed(1)}%`;
      
      case 'dias':
        return `${Math.round(valor)} dias`;
      
      case 'numero':
        if (valor < 10) {
          return `${valor.toFixed(1)}x`;
        }
        return `${Math.round(valor).toLocaleString('pt-BR')}x`;
      
      default:
        return valor.toFixed(2);
    }
  };

  const formatarMilhares = (valor: number) => {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const obterClassificacao = (kpi: KPI): string => {
    if (kpi.classificacao === 'verde') return 'Saudável';
    if (kpi.classificacao === 'amarelo') return 'Atenção';
    if (kpi.classificacao === 'vermelho') return 'Crítico';
    return 'Saudável';
  };

  const obterCorIndicador = (kpi: KPI): { cor: string; bgColor: string; textColor: string; borderColor: string } => {
    if (kpi.classificacao === 'verde') {
      return { cor: 'green', bgColor: 'bg-green-50', textColor: 'text-green-600', borderColor: 'border-green-200' };
    } else if (kpi.classificacao === 'amarelo') {
      return { cor: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', borderColor: 'border-yellow-200' };
    } else if (kpi.classificacao === 'vermelho') {
      return { cor: 'red', bgColor: 'bg-red-50', textColor: 'text-red-600', borderColor: 'border-red-200' };
    }
    return { cor: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-200' };
  };

  const obterCorPorNome = (nome: string, nivel: number): { cor: string; bgColor: string; textColor: string } => {
    const coresPorNome: { [key: string]: any } = {
      'Margem Bruta': { cor: 'emerald', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
      'Resultado Operacional': { cor: 'amber', bgColor: 'bg-amber-50', textColor: 'text-amber-600' },
      'Fôlego de Caixa': { cor: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
      'Liquidez Imediata': { cor: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
      'Ponto de Equilíbrio': { cor: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
      
      'Ciclo Financeiro': { cor: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
      'NCG Estimada': { cor: 'emerald', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
      'Alavancagem': { cor: 'purple', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
      'Cobertura de Juros': { cor: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
      'Receita por Funcionário': { cor: 'indigo', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600' },
    };
    return coresPorNome[nome] || { cor: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-600' };
  };

  // ============ GERAR COMENTÁRIO DIDÁTICO PARA PONTOS DE ATENÇÃO ============
  const gerarComentarioPontoAtencao = (kpi: KPI): string => {
    const comentarios: { [key: string]: string } = {
      'ROE (Anual)': 'O retorno sobre o patrimônio está baixo. Isso significa que o dinheiro investido por você e seus sócios não está rendendo como deveria.',
      'ROA (Anual)': 'A rentabilidade dos ativos está abaixo do ideal. Seus equipamentos e investimentos não estão gerando lucro suficiente.',
      'Margem Bruta': 'A margem de lucro está baixa. Você está vendendo com pouco lucro depois de pagar os custos diretos.',
      'Liquidez Imediata': 'O caixa está apertado para pagar as contas de curto prazo. Risco de não ter dinheiro suficiente para emergências.',
      'Fôlego de Caixa': 'O caixa atual aguenta poucos dias sem novas vendas. É importante aumentar a reserva financeira.',
      'Alavancagem': 'O endividamento está alto em relação à receita. Cuidado para não comprometer demais o fluxo de caixa.',
      'Ciclo Financeiro': 'O tempo entre pagar fornecedores e receber dos clientes está longo. Isso pressiona o caixa.',
    };
    
    return comentarios[kpi.nome] || `O indicador ${kpi.nome} precisa de atenção e pode estar comprometendo a saúde financeira do negócio.`;
  };

  // ============ EXTRAIR KPIs DO NÍVEL 3 ============
  const kpisNivel3 = resultado.kpis.slice(0, 4);

  // ============ PROJEÇÕES DINÂMICAS DA API ============
  const graficoProjecao = resultado.graficos.find((g: any) => g.tipo === 'linha');
  
  const projecao = graficoProjecao && 'series' in graficoProjecao ? {
    labels: graficoProjecao.labels,
    otimista: graficoProjecao.series.find((s: any) => s.nome === 'Otimista')?.valores || [],
    neutro: graficoProjecao.series.find((s: any) => s.nome === 'Neutro')?.valores || [],
    pessimista: graficoProjecao.series.find((s: any) => s.nome === 'Pessimista')?.valores || [],
  } : {
    labels: ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'],
    otimista: [],
    neutro: [],
    pessimista: [],
  };

  // ============ DASHBOARD COMPLETO COM DADOS REAIS ============
  const todosIndicadores = [
    ...(nivel1.kpis.slice(0, 5).map((kpi, idx) => {
      const { cor, bgColor, textColor } = obterCorPorNome(kpi.nome, 1);
      return {
        nivel: 1,
        nome: kpi.nome,
        valor: formatarValor(kpi.valor, kpi.formato),
        cor,
        bgColor,
        textColor,
        status: obterClassificacao(kpi)
      };
    })),
    
    ...(nivel2.kpis.slice(0, 5).map((kpi, idx) => {
      const { cor, bgColor, textColor } = obterCorPorNome(kpi.nome, 2);
      return {
        nivel: 2,
        nome: kpi.nome,
        valor: formatarValor(kpi.valor, kpi.formato),
        cor,
        bgColor,
        textColor,
        status: obterClassificacao(kpi)
      };
    })),
    
    ...(resultado.kpis.slice(0, 3).map((kpi, idx) => {
      const { cor, bgColor, textColor } = obterCorIndicador(kpi);
      return {
        nivel: 3,
        nome: kpi.nome,
        valor: formatarValor(kpi.valor, kpi.formato),
        cor,
        bgColor,
        textColor,
        status: obterClassificacao(kpi)
      };
    }))
  ];

  // ============ DIAGNÓSTICO INTELIGENTE QUE ANALISA OS NÚMEROS REAIS ============
  const gerarDiagnosticoInteligente = () => {
    // Pegar valores dos 3 níveis
    const margemBruta = nivel1.kpis.find(k => k.nome === 'Margem Bruta')?.valor || 0;
    const folegoCaixa = nivel1.kpis.find(k => k.nome === 'Fôlego de Caixa')?.valor || 0;
    const cicloFinanceiro = nivel2.kpis.find(k => k.nome === 'Ciclo Financeiro')?.valor || 0;
    const roa = resultado.kpis.find(k => k.nome === 'ROA (Anual)')?.valor || 0;
    const roe = resultado.kpis.find(k => k.nome === 'ROE (Anual)')?.valor || 0;

    // ========== VISÃO GERAL ==========
    let visaoGeral = '';
    
    // Analisar Margem Bruta
    if (margemBruta < 20) {
      visaoGeral += `🔴 Margem bruta crítica de ${margemBruta.toFixed(1)}% - priorize revisão de preços e custos. `;
    } else if (margemBruta < 30) {
      visaoGeral += `🟡 Margem bruta moderada de ${margemBruta.toFixed(1)}% - há espaço para otimização. `;
    } else {
      visaoGeral += `🟢 Margem bruta saudável de ${margemBruta.toFixed(1)}%. `;
    }
    
    // Analisar Fôlego de Caixa
    if (folegoCaixa <= 0) {
      visaoGeral += `🔴 Fôlego de caixa crítico (${Math.round(folegoCaixa)} dias) - priorize geração de caixa imediatamente. `;
    } else if (folegoCaixa < 30) {
      visaoGeral += `🟡 Fôlego de caixa baixo (${Math.round(folegoCaixa)} dias) - atenção ao fluxo de caixa. `;
    } else {
      visaoGeral += `🟢 Fôlego de caixa adequado (${Math.round(folegoCaixa)} dias). `;
    }
    
    // Analisar ROA
    if (roa < 1) {
      visaoGeral += `ROA de ${roa.toFixed(1)}% indica baixa rentabilidade dos ativos - revise seus investimentos. `;
    } else if (roa < 10) {
      visaoGeral += `ROA de ${roa.toFixed(1)}% mostra rentabilidade moderada - há espaço para melhorar. `;
    } else {
      visaoGeral += `ROA de ${roa.toFixed(1)}% indica boa rentabilidade dos ativos. `;
    }
    
    // Analisar ROE
    if (roe < 0) {
      visaoGeral += `ROE negativo de ${roe.toFixed(1)}% mostra baixo retorno aos sócios - ação urgente necessária.`;
    } else if (roe < 15) {
      visaoGeral += `ROE de ${roe.toFixed(1)}% indica retorno moderado aos sócios - busque melhorias na lucratividade.`;
    } else {
      visaoGeral += `ROE de ${roe.toFixed(1)}% demonstra bom retorno aos sócios.`;
    }

    // ========== PRINCIPAIS OPORTUNIDADES ==========
    const oportunidades = [];
    
    // Oportunidade 1: Margem Bruta
    if (margemBruta < 30) {
      oportunidades.push({
        titulo: 'Revisar Precificação e Reduzir Custos',
        descricao: `Com margem bruta de ${margemBruta.toFixed(1)}%, há espaço para aumentar preços em 5-10% ou negociar melhores condições com fornecedores para ganhar 3-5 pontos percentuais na margem.`,
        prioridade: margemBruta < 20 ? 'Alto' : 'Médio',
      });
    }
    
    // Oportunidade 2: Ciclo Financeiro
    if (cicloFinanceiro > 10) {
      oportunidades.push({
        titulo: `Reduzir Ciclo Financeiro de ${Math.round(cicloFinanceiro)} dias`,
        descricao: 'Acelerar recebimentos com desconto para pagamento à vista (2% para 10 dias) e negociar extensão de prazos com fornecedores para melhorar o caixa significativamente.',
        prioridade: cicloFinanceiro > 20 ? 'Alto' : 'Médio',
      });
    }
    
    // Oportunidade 3: Fôlego de Caixa
    if (folegoCaixa < 30) {
      oportunidades.push({
        titulo: 'Aumentar Reserva de Caixa',
        descricao: `Com apenas ${Math.round(folegoCaixa)} dias de fôlego, é crítico criar uma reserva de segurança equivalente a 3 meses de despesas fixas. Comece separando 10% do lucro mensal.`,
        prioridade: folegoCaixa < 15 ? 'Alto' : 'Médio',
      });
    }
    
    // Se ainda não tiver 3 oportunidades, pegar da API
    while (oportunidades.length < 3 && diagnostico_estrategia.oportunidades && diagnostico_estrategia.oportunidades.length > oportunidades.length) {
      const op = diagnostico_estrategia.oportunidades[oportunidades.length];
      oportunidades.push({
        titulo: op.descricao.split('.')[0].trim() || op.descricao.substring(0, 60).trim(),
        descricao: op.acao || op.descricao,
        prioridade: op.impacto_percentual >= 10 ? 'Alto' : 'Médio',
      });
    }

    // Se ainda faltar oportunidades, adicionar genéricas
    const oportunidadesGenericas = [
      {
        titulo: 'Implementar Controle Diário de Caixa',
        descricao: 'Criar planilha simples para acompanhar entradas e saídas de dinheiro todos os dias, ganhando visibilidade total do fluxo financeiro.',
        prioridade: 'Alto',
      },
      {
        titulo: 'Otimizar Mix de Produtos',
        descricao: 'Analisar quais produtos/serviços têm maior margem e focar esforços comerciais neles para melhorar a lucratividade geral.',
        prioridade: 'Médio',
      },
      {
        titulo: 'Renegociar Contratos Recorrentes',
        descricao: 'Revisar todos os contratos fixos (aluguel, energia, telefone, software) e buscar economia de 10-15% através de renegociação.',
        prioridade: 'Médio',
      },
    ];

    while (oportunidades.length < 3) {
      oportunidades.push(oportunidadesGenericas[oportunidades.length % oportunidadesGenericas.length]);
    }

    // ========== PONTOS DE ATENÇÃO ==========
    const pontosAtencao = resultado.kpis
      .filter(kpi => kpi.classificacao === 'vermelho' || kpi.classificacao === 'amarelo')
      .map(kpi => ({
        indicador: kpi.nome,
        valor_atual: formatarValor(kpi.valor, kpi.formato),
        comentario: gerarComentarioPontoAtencao(kpi),
        nivel: kpi.classificacao === 'vermelho' ? 'Crítico' : 'Atenção',
      }));

    // Se não tiver pontos de atenção do nível 3, buscar dos outros níveis
    if (pontosAtencao.length === 0) {
      const pontosNivel1 = nivel1.kpis
        .filter(kpi => kpi.classificacao === 'vermelho' || kpi.classificacao === 'amarelo')
        .slice(0, 2)
        .map(kpi => ({
          indicador: kpi.nome,
          valor_atual: formatarValor(kpi.valor, kpi.formato),
          comentario: gerarComentarioPontoAtencao(kpi),
          nivel: kpi.classificacao === 'vermelho' ? 'Crítico' : 'Atenção',
        }));
      
      pontosAtencao.push(...pontosNivel1);
    }

    return {
      visaoGeral,
      principais_oportunidades: oportunidades.slice(0, 3),
      pontos_de_atencao: pontosAtencao,
    };
  };

  const diagnostico = gerarDiagnosticoInteligente();

  // ============ PLANO DE AÇÃO 30-60-90 COM 4 AÇÕES GARANTIDAS ============
  const gerarPlanoAcao = () => {
    // Ações base inteligentes por período
    const acoesBase = {
      dias30: [
        {
          titulo: "Revisar Política de Cobrança",
          descricao: "Implementar régua de cobrança automatizada e oferecer descontos para pagamento antecipado (2% para 10 dias, 5% para pagamento à vista).",
          resultado: "Reduzir prazo médio de recebimento em 10-15 dias e liberar caixa imediatamente.",
          prioridade: "Alta",
        },
        {
          titulo: "Negociar Prazos com Fornecedores",
          descricao: "Conversar com os 5 principais fornecedores para estender prazo de pagamento de 30 para 45-60 dias sem perder descontos.",
          resultado: "Melhorar descasamento de caixa e liberar capital de giro para investimentos.",
          prioridade: "Alta",
        },
        {
          titulo: "Mapear Custos Variáveis",
          descricao: "Levantar todos os custos que sobem com as vendas (comissões, frete, taxas, embalagens) e buscar otimizações em cada item.",
          resultado: "Identificar 5-8% de redução potencial em custos variáveis e aumentar margem.",
          prioridade: "Média",
        },
        {
          titulo: "Implementar Controle Diário de Caixa",
          descricao: "Criar planilha simples (ou usar app gratuito) para registrar todas as entradas e saídas de dinheiro diariamente.",
          resultado: "Maior visibilidade do fluxo de caixa, controle financeiro e prevenção de surpresas.",
          prioridade: "Alta",
        },
      ],
      dias60: [
        {
          titulo: "Implementar Dashboard de KPIs",
          descricao: "Criar acompanhamento semanal de Margem Bruta, PMR, PMP, Liquidez e Fôlego de Caixa no Google Sheets ou Excel.",
          resultado: "Visibilidade em tempo real da saúde financeira e decisões estratégicas mais rápidas.",
          prioridade: "Alta",
        },
        {
          titulo: "Otimizar Giro de Estoque",
          descricao: "Revisar itens parados há mais de 30 dias e fazer promoções. Ajustar curva ABC de compras para focar nos 20% que geram 80% da receita.",
          resultado: "Reduzir prazo de estoque em 10-20 dias e liberar capital de giro preso.",
          prioridade: "Média",
        },
        {
          titulo: "Avaliar Rentabilidade por Canal",
          descricao: "Analisar margem de cada canal de venda (online, loja física, marketplace, atacado) e focar nos mais lucrativos.",
          resultado: "Acelerar crescimento de receita nos canais certos e melhorar lucratividade geral.",
          prioridade: "Alta",
        },
        {
          titulo: "Revisar Contratos e Despesas Fixas",
          descricao: "Analisar todos os contratos (aluguel, energia, telefone, software, seguros) e negociar redução ou trocar fornecedores.",
          resultado: "Reduzir custos fixos em 10-15% e aumentar margem operacional significativamente.",
          prioridade: "Média",
        },
      ],
      dias90: [
        {
          titulo: "Estruturar Captação de Capital",
          descricao: "Avaliar necessidade de injeção de capital próprio, buscar investidor-anjo ou linha de crédito com juros competitivos para crescimento sustentável.",
          resultado: "Aumentar patrimônio líquido e melhorar ROE para patamar saudável (15%+).",
          prioridade: "Alta",
        },
        {
          titulo: "Criar Reserva de Emergência",
          descricao: "Separar mensalmente 10% do lucro líquido para formar reserva equivalente a 3 meses de despesas fixas (90 dias de fôlego).",
          resultado: "Segurança financeira, tranquilidade para tomar decisões estratégicas e proteção contra imprevistos.",
          prioridade: "Alta",
        },
        {
          titulo: "Desenvolver Plano de Crescimento",
          descricao: "Criar estratégia de expansão baseada nos números: novos produtos/serviços, canais de distribuição ou regiões geográficas.",
          resultado: "Crescimento estruturado e sustentável do negócio com base em dados reais.",
          prioridade: "Média",
        },
        {
          titulo: "Treinar Equipe em Gestão Financeira",
          descricao: "Capacitar colaboradores-chave para entender os KPIs do negócio e contribuir ativamente com ideias de melhoria.",
          resultado: "Equipe mais alinhada, engajada e consciente dos objetivos financeiros da empresa.",
          prioridade: "Baixa",
        },
      ],
    };

    // Função para mesclar com dados da API se existirem
    const mesclarComAPI = (acoesBase: any[], acoesAPI: string[] = []) => {
      const resultado = [...acoesBase];
      
      // Substituir as 2 primeiras ações pelas da API se existirem e forem úteis
      if (acoesAPI && acoesAPI.length > 0) {
        acoesAPI.slice(0, 2).forEach((item, idx) => {
          if (item && item.trim()) {
            const partes = item.split(':');
            const titulo = partes[0]?.trim();
            const descricao = partes[1]?.trim() || item;
            
            if (titulo && descricao) {
              resultado[idx] = {
                titulo: titulo,
                descricao: descricao,
                resultado: diagnostico_estrategia.oportunidades && diagnostico_estrategia.oportunidades[idx] 
                  ? (diagnostico_estrategia.oportunidades[idx].acao || `Melhoria de ${Math.round(diagnostico_estrategia.oportunidades[idx].impacto_percentual || 5)}% esperada`)
                  : 'Impacto positivo nos indicadores financeiros',
                prioridade: 'Alta',
              };
            }
          }
        });
      }
      
      return resultado;
    };

    // Retornar plano mesclado (API + base)
    return {
      dias30: mesclarComAPI(
        acoesBase.dias30, 
        diagnostico_estrategia.plano_30_60_90 ? diagnostico_estrategia.plano_30_60_90["30_dias"] : []
      ),
      dias60: mesclarComAPI(
        acoesBase.dias60, 
        diagnostico_estrategia.plano_30_60_90 ? diagnostico_estrategia.plano_30_60_90["60_dias"] : []
      ),
      dias90: mesclarComAPI(
        acoesBase.dias90, 
        diagnostico_estrategia.plano_30_60_90 ? diagnostico_estrategia.plano_30_60_90["90_dias"] : []
      ),
    };
  };

  const planoAcao = gerarPlanoAcao();

// ============ FUNÇÃO PARA BAIXAR PDF ============
  const handleBaixarPDF = async () => {
    try {
      const dadosRelatorio = {
        empresa: 'Sua Empresa',
        data: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        diagnostico: diagnostico,
        planoAcao: planoAcao,
        kpis: kpisNivel3.map(kpi => ({
          nome: kpi.nome,
          valor: formatarValor(kpi.valor, kpi.formato),
          classificacao: kpi.classificacao || 'verde'
        }))
      };

      const resultado = await gerarRelatorioPDF(dadosRelatorio);
      
      if (!resultado.success) {
        alert('Erro ao gerar PDF. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao preparar dados do PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 py-8 space-y-8">
      
      {/* ========== BADGE ANÁLISE CONCLUÍDA ========== */}
      <div className="flex justify-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">Análise Concluída</span>
        </div>
      </div>

      {/* ========== BOX DE ANÁLISE ESTRATÉGICA (MELHORADO) ========== */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Visão Estratégica
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Análise completa com projeções e recomendações estratégicas
              </p>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {resultado.mensagem}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== BOX BRANCO COM INDICADORES DENTRO ========== */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Indicadores-chave do Nível 3</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpisNivel3.map((kpi, index) => {
            const { bgColor, textColor, borderColor } = obterCorIndicador(kpi);
            const tooltip = tooltipsKPI[kpi.nome] || 'Indicador estratégico importante para avaliar a saúde do negócio.';
            const isHovered = hoveredKPI === kpi.nome;
            
            return (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredKPI(kpi.nome)}
                onMouseLeave={() => setHoveredKPI(null)}
              >
                <div className={`${bgColor} border-2 ${borderColor} rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 cursor-help`}>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-600">{kpi.nome}</p>
                    <p className={`text-3xl font-bold ${textColor} break-words`}>
                      {formatarValor(kpi.valor, kpi.formato)}
                    </p>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      kpi.classificacao === 'verde' ? 'bg-green-100 text-green-700' :
                      kpi.classificacao === 'amarelo' ? 'bg-yellow-100 text-yellow-700' :
                      kpi.classificacao === 'vermelho' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {obterClassificacao(kpi)}
                    </span>
                  </div>
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 z-10 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{tooltip}</p>
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

      {/* ========== PROJEÇÕES 6 MESES COM DADOS REAIS ========== */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-br from-purple-50 to-transparent p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Projeção de Receita (6 meses)</h3>
          </div>
        </div>
        
        <div className="p-8">
          {/* Cards Grandes com valores REAIS do último mês */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-semibold text-gray-700">Cenário Otimista</span>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {formatarValor(projecao.otimista[projecao.otimista.length - 1] || 0, 'moeda')}
              </div>
              <p className="text-xs text-gray-500 mt-1">Crescimento acelerado</p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-semibold text-gray-700">Cenário Neutro</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {formatarValor(projecao.neutro[projecao.neutro.length - 1] || 0, 'moeda')}
              </div>
              <p className="text-xs text-gray-500 mt-1">Crescimento moderado</p>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-semibold text-gray-700">Cenário Pessimista</span>
              </div>
              <div className="text-3xl font-bold text-orange-600">
                {formatarValor(projecao.pessimista[projecao.pessimista.length - 1] || 0, 'moeda')}
              </div>
              <p className="text-xs text-gray-500 mt-1">Crescimento conservador</p>
            </div>
          </div>

          {/* Gráfico de Barras */}
          <div className="h-80">
            <div className="flex justify-between items-end h-full gap-2">
              {projecao.labels.map((label, index) => {
                const otimistaValor = projecao.otimista[index] || 0;
                const neutroValor = projecao.neutro[index] || 0;
                const pessimistaValor = projecao.pessimista[index] || 0;
                
                const maxValor = Math.max(otimistaValor, neutroValor, pessimistaValor);
                const alturaOtimista = maxValor > 0 ? (otimistaValor / maxValor) * 100 : 0;
                const alturaNeutro = maxValor > 0 ? (neutroValor / maxValor) * 100 : 0;
                const alturaPessimista = maxValor > 0 ? (pessimistaValor / maxValor) * 100 : 0;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    {/* Barras */}
                    <div className="w-full flex gap-1 items-end" style={{ height: '240px' }}>
                      {/* Otimista */}
                      <div className="flex-1 bg-green-500 rounded-t hover:bg-green-600 transition-all group relative"
                           style={{ height: `${alturaOtimista}%` }}>
                        <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {formatarValor(otimistaValor, 'moeda')}
                        </div>
                      </div>
                      
                      {/* Neutro */}
                      <div className="flex-1 bg-blue-500 rounded-t hover:bg-blue-600 transition-all group relative"
                           style={{ height: `${alturaNeutro}%` }}>
                        <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {formatarValor(neutroValor, 'moeda')}
                        </div>
                      </div>
                      
                      {/* Pessimista */}
                      <div className="flex-1 bg-orange-500 rounded-t hover:bg-orange-600 transition-all group relative"
                           style={{ height: `${alturaPessimista}%` }}>
                        <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {formatarValor(pessimistaValor, 'moeda')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <span className="text-xs text-gray-600 font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ========== DASHBOARD COMPLETO COLAPSÁVEL ========== */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <button
          onClick={() => setDashboardAberto(!dashboardAberto)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900">Dashboard Completo dos 3 Níveis</h3>
              <p className="text-sm text-gray-600">Visualize todos os {todosIndicadores.length} indicadores financeiros</p>
            </div>
          </div>
          {dashboardAberto ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {dashboardAberto && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todosIndicadores.map((indicador, index) => (
                <div key={index} className={`${indicador.bgColor} border border-gray-200 rounded-lg p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded mb-2 bg-white/50">
                        Nível {indicador.nivel}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-700">{indicador.nome}</h4>
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${indicador.textColor} mb-2`}>{indicador.valor}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    indicador.status === 'Saudável' ? 'bg-green-100 text-green-700' :
                    indicador.status === 'Atenção' ? 'bg-yellow-100 text-yellow-700' :
                    indicador.status === 'Crítico' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {indicador.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========== DIAGNÓSTICO INTELIGENTE ========== */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Diagnóstico Inteligente</h3>
              <p className="text-gray-600">Análise personalizada baseada nos seus números</p>
            </div>
          </div>

          {/* Visão Geral */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Visão Geral
            </h4>
            <p className="text-gray-700 leading-relaxed">{diagnostico.visaoGeral}</p>
          </div>

          {/* Principais Oportunidades */}
          {diagnostico.principais_oportunidades.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Principais Oportunidades
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {diagnostico.principais_oportunidades.map((oportunidade, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-5 border-l-4 border-yellow-500">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-bold text-gray-900 text-sm">{oportunidade.titulo}</h5>
                      <span className={`px-2 py-1 text-xs font-semibold rounded flex-shrink-0 ml-2 ${
                        oportunidade.prioridade === 'Alto' ? 'bg-red-100 text-red-700' :
                        oportunidade.prioridade === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {oportunidade.prioridade}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{oportunidade.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pontos de Atenção */}
          {diagnostico.pontos_de_atencao.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Pontos de Atenção
              </h4>
              <div className="space-y-3">
                {diagnostico.pontos_de_atencao.map((ponto, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-bold text-gray-900 text-sm">{ponto.indicador}</h5>
                          <span className="text-sm font-semibold text-gray-600">({ponto.valor_atual})</span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            ponto.nivel === 'Crítico' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {ponto.nivel}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{ponto.comentario}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== PLANO DE AÇÃO 30-60-90 COM 4 AÇÕES CADA ========== */}
      <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-plano" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-plano)" />
          </svg>
        </div>

        <div className="relative z-10 p-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white">
              Seu Plano de Ação 30-60-90 Dias
            </h3>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12 ações práticas para transformar sua empresa nos próximos 3 meses
            </p>
          </div>

          {/* 30 dias - 4 ações */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-6 py-3 bg-green-500 rounded-full shadow-lg">
                <span className="text-2xl font-bold text-white">30 dias</span>
              </div>
              <h4 className="text-2xl font-bold text-white">Fundamentos e Otimizações Rápidas</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planoAcao.dias30.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-lg">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{acao.descricao}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-1">RESULTADO ESPERADO:</p>
                    <p className="text-sm font-semibold text-green-600">{acao.resultado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 60 dias - 4 ações */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-6 py-3 bg-blue-500 rounded-full shadow-lg">
                <span className="text-2xl font-bold text-white">60 dias</span>
              </div>
              <h4 className="text-2xl font-bold text-white">Implementação e Expansão</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planoAcao.dias60.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-lg">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{acao.descricao}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-1">RESULTADO ESPERADO:</p>
                    <p className="text-sm font-semibold text-blue-600">{acao.resultado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 90 dias - 4 ações */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="px-6 py-3 bg-purple-500 rounded-full shadow-lg">
                <span className="text-2xl font-bold text-white">90 dias</span>
              </div>
              <h4 className="text-2xl font-bold text-white">Consolidação e Crescimento</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planoAcao.dias90.map((acao, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-xl hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-bold text-gray-900 text-lg">{acao.titulo}</h5>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      acao.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                      acao.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {acao.prioridade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{acao.descricao}</p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-1">RESULTADO ESPERADO:</p>
                    <p className="text-sm font-semibold text-purple-600">{acao.resultado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========== CTA FINAL ========== */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 text-center space-y-6 animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
        <h3 className="text-3xl font-bold text-gray-900">Parabéns! Análise Completa Finalizada</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Agora você tem um diagnóstico completo e um plano de ação prático para os próximos 90 dias. 
          Use essas informações para tomar decisões mais inteligentes e fazer seu negócio crescer!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button onClick={handleBaixarPDF} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
            <Download className="w-5 h-5" />
            Baixar Relatório PDF
          </button>
          <button 
            onClick={onNovaAnalise}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Nova Análise
          </button>
        </div>
      </div>

    </div>
  );
}