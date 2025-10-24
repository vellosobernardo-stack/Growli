'use client';

import { useState } from 'react';
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

    if (dividas === 0) {
      alert('Por favor, informe o total de dívidas (pode ser 0 se não houver).');
      return;
    }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seção: Prazos Operacionais */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          ⏱️ Prazos Operacionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputNumero
            label="Prazo Médio de Recebimento (DSO)"
            value={dso}
            onChange={setDso}
            opcional
            tooltip="Média de dias que seus clientes levam para pagar. Se não informado, será estimado pelo setor."
            placeholder="30"
            sufixo="dias"
            min={0}
          />
          
          <InputNumero
            label="Prazo Médio de Pagamento (DPO)"
            value={dpo}
            onChange={setDpo}
            opcional
            tooltip="Média de dias para pagar fornecedores. Se não informado, será estimado pelo setor."
            placeholder="25"
            sufixo="dias"
            min={0}
          />
        </div>
      </div>

      {/* Seção: Estoques e Dívidas */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          📦 Estoques e Dívidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="Estoque (ao custo)"
            value={estoque}
            onChange={setEstoque}
            opcional
            tooltip="Valor total de produtos em estoque ao custo de aquisição/produção"
            placeholder="40.000,00"
          />
          
          <InputMoeda
            label="Dívidas Totais"
            value={dividas}
            onChange={setDividas}
            tooltip="Somatório de empréstimos e financiamentos (curto + longo prazo)"
            placeholder="80.000,00"
          />
        </div>
      </div>

      {/* Seção: Despesas Financeiras e Impostos */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          💳 Despesas Financeiras e Impostos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="Despesas Financeiras Mensais"
            value={despesasFinanceiras}
            onChange={setDespesasFinanceiras}
            opcional
            tooltip="Juros pagos no mês (empréstimos, financiamentos, cartões)"
            placeholder="2.000,00"
          />
          
          <InputMoeda
            label="Impostos Mensais"
            value={impostos}
            onChange={setImpostos}
            opcional
            tooltip="Tributos pagos/estimados no mês (federais, estaduais, municipais)"
            placeholder="8.000,00"
          />
        </div>
      </div>

      {/* Seção: Recursos Humanos */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          👥 Recursos Humanos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputNumero
            label="Número de Funcionários"
            value={funcionarios}
            onChange={setFuncionarios}
            opcional
            tooltip="Total de colaboradores (incluindo sócios ativos)"
            placeholder="5"
            min={0}
            step={1}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onVoltar}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Voltar
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processando...
            </span>
          ) : (
            'Gerar Análise Nível 2'
          )}
        </button>
      </div>

      {/* Informações adicionais */}
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Campos opcionais serão estimados com base no seu setor</p>
      </div>
    </form>
  );
}