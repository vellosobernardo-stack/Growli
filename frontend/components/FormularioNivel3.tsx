'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Package, Target, Info } from 'lucide-react';
import InputMoeda from './ui/InputMoeda';
import InputNumero from './ui/InputNumero';
import { DadosNivel3 } from '@/types/analise';

interface FormularioNivel3Props {
  onSubmit: (dados: DadosNivel3) => void;
  onVoltar: () => void;
  loading?: boolean;
}

export default function FormularioNivel3({ onSubmit, onVoltar, loading = false }: FormularioNivel3Props) {
  const [receita3MesesAtras, setReceita3MesesAtras] = useState<number>(0);
  const [receita2MesesAtras, setReceita2MesesAtras] = useState<number>(0);
  const [receita1MesAtras, setReceita1MesAtras] = useState<number>(0);
  const [aliquotaImpostos, setAliquotaImpostos] = useState<number>(0);
  const [despesasVariaveis, setDespesasVariaveis] = useState<number>(0);
  const [capex, setCapex] = useState<number>(0);
  const [imobilizado, setImobilizado] = useState<number>(0);
  const [patrimonioLiquido, setPatrimonioLiquido] = useState<number>(0);
  
  // NOVOS CAMPOS PARA METAS
  const [ticketMedio, setTicketMedio] = useState<number>(0);
  const [lucroDesejado, setLucroDesejado] = useState<number>(0);
  const [metaPrazoRecebimento, setMetaPrazoRecebimento] = useState<number>(0);

  // Cálculo automático da margem %
  const [margemCalculada, setMargemCalculada] = useState<number>(0);
  const [custoMaximoPermitido, setCustoMaximoPermitido] = useState<number>(0);

  useEffect(() => {
    if (ticketMedio > 0 && lucroDesejado > 0) {
      // margem_percent = (lucro_desejado / preco) * 100
      const margem = (lucroDesejado / ticketMedio) * 100;
      setMargemCalculada(margem);

      // custo_maximo_permitido = preco - lucro_desejado
      const custoMax = ticketMedio - lucroDesejado;
      setCustoMaximoPermitido(custoMax);
    } else {
      setMargemCalculada(0);
      setCustoMaximoPermitido(0);
    }
  }, [ticketMedio, lucroDesejado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (receita1MesAtras === 0 || receita2MesesAtras === 0 || receita3MesesAtras === 0) {
      alert('Por favor, informe as receitas dos últimos 3 meses.');
      return;
    }

    const dados: DadosNivel3 = {
      receita_ultimos_3_meses: [receita3MesesAtras, receita2MesesAtras, receita1MesAtras],
      aliquota_impostos_percentual: aliquotaImpostos > 0 ? aliquotaImpostos : undefined,
      despesas_variaveis_percentual_receita: despesasVariaveis > 0 ? despesasVariaveis : undefined,
      capex_planejado_prox_6m: capex > 0 ? capex : undefined,
      imobilizado: imobilizado > 0 ? imobilizado : undefined,
      patrimonio_liquido: patrimonioLiquido !== 0 ? patrimonioLiquido : undefined,
      meta_margem_bruta_percentual: margemCalculada > 0 ? margemCalculada : 40, // Usa margem calculada ou padrão 40%
      meta_prazo_recebimento_dias: metaPrazoRecebimento > 0 ? metaPrazoRecebimento : undefined,
    };

    onSubmit(dados);
  };

  return (
    <div className="space-y-8">
      
      {/* ========== CABEÇALHO ========== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Análise Avançada
        </h2>
        <p className="text-gray-600">
          Complete sua análise com projeções e planejamento estratégico
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ========== SEÇÃO 1: HISTÓRICO DE RECEITAS ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Receitas dos Últimos 3 Meses</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputMoeda
              label="3 Meses Atrás"
              value={receita3MesesAtras}
              onChange={setReceita3MesesAtras}
              tooltip="Valor total vendido há 3 meses."
              placeholder="95.000,00"
            />
            <InputMoeda
              label="2 Meses Atrás"
              value={receita2MesesAtras}
              onChange={setReceita2MesesAtras}
              tooltip="Valor total vendido há 2 meses."
              placeholder="98.000,00"
            />
            <InputMoeda
              label="Receita do Último Mês"
              value={receita1MesAtras}
              onChange={setReceita1MesAtras}
              tooltip="Valor total vendido no último mês."
              placeholder="100.000,00"
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Histórico:</strong> Esses dados ajudam a identificar tendências de crescimento ou retração no faturamento.
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 2: ESTRUTURA TRIBUTÁRIA E VARIÁVEL ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Estrutura Tributária e Variável</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputNumero
              label="Percentual de Impostos"
              value={aliquotaImpostos}
              onChange={setAliquotaImpostos}
              opcional
              tooltip="Percentual médio de impostos pagos sobre a receita. (Alíquota)"
              placeholder="8"
              sufixo="%"
              min={0}
              max={100}
              step={0.1}
            />
            <InputNumero
              label="Despesas Variáveis"
              value={despesasVariaveis}
              onChange={setDespesasVariaveis}
              opcional
              tooltip="Custos que aumentam junto com as vendas, como comissões, taxas de cartão e frete. Ex: 5% das vendas"
              placeholder="5"
              sufixo="%"
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Importante:</strong> Esses percentuais impactam diretamente a margem líquida e o lucro real da operação.
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 3: INVESTIMENTOS E PATRIMÔNIO ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Investimentos e Patrimônio</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputMoeda
              label="Investimentos Planejados"
              value={capex}
              onChange={setCapex}
              opcional
              tooltip="Valor que pretende investir nos próximos 6 meses (máquinas, reformas, sistemas, etc.). Ex: R$ 50.000 para novas máquinas"
              placeholder="50.000,00"
            />
            <InputMoeda
              label="Bens e Equipamentos"
              value={imobilizado}
              onChange={setImobilizado}
              opcional
              tooltip="Valor atual dos bens da empresa (móveis, veículos, computadores, equipamentos). Ex: R$ 150.000 em equipamentos"
              placeholder="150.000,00"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <InputMoeda
              label="Valor da Empresa"
              value={patrimonioLiquido}
              onChange={setPatrimonioLiquido}
              opcional
              tooltip="Diferença entre tudo o que a empresa possui e o que deve. Mostra o 'valor líquido' do negócio. Ex: R$ 120.000"
              placeholder="120.000,00"
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Patrimônio:</strong> Esses valores ajudam a avaliar o retorno sobre ativos (ROA) e sobre patrimônio (ROE).
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 4: METAS DE GESTÃO (NOVA VERSÃO) ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Metas de Gestão</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TICKET MÉDIO */}
            <InputMoeda
              label="Preço médio de venda (ticket médio)"
              value={ticketMedio}
              onChange={setTicketMedio}
              tooltip="Valor médio que você cobra por produto/serviço. Usado para calcular a margem desejada."
              placeholder="500,00"
            />

            {/* LUCRO DESEJADO */}
            <InputMoeda
              label="Quanto quer lucrar por cliente?"
              value={lucroDesejado}
              onChange={setLucroDesejado}
              tooltip="Informe o quanto quer que sobre das vendas, depois dos custos."
              placeholder="200,00"
            />
          </div>

          {/* CÁLCULO AUTOMÁTICO DA MARGEM */}
          {margemCalculada > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Margem de lucro calculada:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {margemCalculada.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Custo máximo permitido:</span>
                  <span className="font-semibold text-gray-900">
                    R$ {custoMaximoPermitido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="pt-2 border-t border-orange-200">
                  <p className="text-xs text-gray-600">
                    Para ter um lucro de <strong>R$ {lucroDesejado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> em 
                    vendas de <strong>R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>, 
                    seus custos não podem ultrapassar <strong>R$ {custoMaximoPermitido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PRAZO DE RECEBIMENTO */}
          <div className="grid grid-cols-1 gap-6">
            <InputNumero
              label="Em quantos dias quer receber?"
              value={metaPrazoRecebimento}
              onChange={setMetaPrazoRecebimento}
              opcional
              tooltip="Em quantos dias você quer que o dinheiro das vendas entre na conta."
              placeholder="20"
              sufixo="dias"
              min={0}
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Metas:</strong> Defina objetivos realistas para orientar decisões estratégicas e acompanhar o progresso. 
                A margem de lucro é calculada automaticamente com base no preço e lucro desejado.
              </p>
            </div>
          </div>
        </div>

        {/* ========== BOTÕES ========== */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onVoltar}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Voltar
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-4 bg-[#112d4e] hover:bg-[#0f2640] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Processando...
              </>
            ) : (
              'Gerar Análise Completa'
            )}
          </button>
        </div>

        {/* Nota explicativa */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mt-6">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-900">Ao concluir,</strong> você receberá projeções em 3 cenários (Otimista, Neutro e Pessimista) e um plano de ação 30-60-90 dias.
            </span>
          </p>
        </div>

      </form>
    </div>
  );
}