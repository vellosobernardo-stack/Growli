'use client';

import { useState } from 'react';
import { Clock, Package, DollarSign, Users, Info } from 'lucide-react';
import InputMoeda from './ui/InputMoeda';
import InputNumero from './ui/InputNumero';
import { DadosNivel2 } from '@/types/analise';

interface FormularioNivel2Props {
  onSubmit: (dados: DadosNivel2) => void;
  onVoltar: () => void;
  loading?: boolean;
}

export default function FormularioNivel2({ onSubmit, onVoltar, loading = false }: FormularioNivel2Props) {
  const [dso, setDso] = useState<number>(0);
  const [dpo, setDpo] = useState<number>(0);
  const [estoque, setEstoque] = useState<number>(0);
  const [dividas, setDividas] = useState<number>(0);
  const [despesasFinanceiras, setDespesasFinanceiras] = useState<number>(0);
  const [impostos, setImpostos] = useState<number>(0);
  const [funcionarios, setFuncionarios] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dados: DadosNivel2 = {
      prazo_medio_recebimento_dias: dso > 0 ? dso : undefined,
      prazo_medio_pagamento_dias: dpo > 0 ? dpo : undefined,
      estoque_custo: estoque > 0 ? estoque : undefined,
      dividas_totais: dividas,
      despesas_financeiras_mensais: despesasFinanceiras > 0 ? despesasFinanceiras : undefined,
      impostos_mensais: impostos > 0 ? impostos : undefined,
      numero_funcionarios: funcionarios > 0 ? funcionarios : undefined,
    };

    onSubmit(dados);
  };

  return (
    <div className="space-y-8">
      
      {/* ========== CABEÇALHO ========== */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Análise Intermediária
        </h2>
        <p className="text-gray-600">
          Preencha as informações para continuarmos com a sua análise financeira
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ========== SEÇÃO 1: PRAZOS OPERACIONAIS ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Prazos Operacionais</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputNumero
              label="Prazo Médio de Recebimento (DSO)"
              value={dso}
              onChange={setDso}
              opcional
              tooltip="Média de dias que os clientes levam para pagar. Se não souber, use a média mais comum no seu setor (ex.: 30 dias)."
              placeholder="30"
              sufixo="dias"
              min={0}
            />
            <InputNumero
              label="Prazo Médio de Pagamento (DPO)"
              value={dpo}
              onChange={setDpo}
              opcional
              tooltip="Média de dias que sua empresa leva para pagar fornecedores."
              placeholder="25"
              sufixo="dias"
              min={0}
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Como calcular:</strong> Esses prazos ajudam a entender o tempo que o dinheiro leva para entrar e sair do caixa.
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 2: ESTOQUES E DÍVIDAS ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Estoques e Dívidas</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputMoeda
              label="Estoque (ao custo)"
              value={estoque}
              onChange={setEstoque}
              opcional
              tooltip="Valor total dos produtos e insumos armazenados, considerando o custo de compra."
              placeholder="40.000,00"
            />
            <InputMoeda
              label="Dívidas Totais"
              value={dividas}
              onChange={setDividas}
              tooltip="Valor total devido em financiamentos e empréstimos."
              placeholder="80.000,00"
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Importante:</strong> O estoque e as dívidas mostram quanto do seu capital está "parado" ou comprometido com obrigações financeiras.
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 3: DESPESAS FINANCEIRAS E IMPOSTOS ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Despesas Financeiras e Impostos</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputMoeda
              label="Despesas Financeiras Mensais"
              value={despesasFinanceiras}
              onChange={setDespesasFinanceiras}
              opcional
              tooltip="Total gasto com juros e taxas bancárias no mês."
              placeholder="2.000,00"
            />
            <InputMoeda
              label="Impostos Mensais"
              value={impostos}
              onChange={setImpostos}
              opcional
              tooltip="Valor médio pago ou previsto de tributos sobre vendas."
              placeholder="8.000,00"
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Atenção:</strong> Esses valores ajudam a avaliar o peso dos juros e impostos sobre o resultado da empresa.
              </p>
            </div>
          </div>
        </div>

        {/* ========== SEÇÃO 4: RECURSOS HUMANOS ========== */}
        <div className="bg-muted/30 border border-border/50 rounded-lg p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Recursos Humanos</h3>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputNumero
              label="Número de Funcionários"
              value={funcionarios}
              onChange={setFuncionarios}
              opcional
              tooltip="Quantidade total de colaboradores diretos da empresa (incluindo estagiários e Jovens Aprendiz)."
              placeholder="5"
              min={0}
              step={1}
            />
          </div>

          {/* Box de Informação */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Dica:</strong> Esse dado é usado para calcular a produtividade média por funcionário.
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
            className="w-full sm:w-auto px-8 py-4 bg-[#112d4e] hover:bg-[#0f2640] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Processando...
              </>
            ) : (
              'Gerar Análise Nível 2'
            )}
          </button>
        </div>

        {/* Nota explicativa */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-3 mt-6">
          <p className="text-xs text-gray-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-gray-900">Lembrete:</strong> Campos opcionais serão estimados com base no seu setor
            </span>
          </p>
        </div>

      </form>
    </div>
  );
}