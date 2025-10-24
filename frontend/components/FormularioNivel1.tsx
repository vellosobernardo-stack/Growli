'use client';

import { useState } from 'react';
import InputMoeda from './ui/InputMoeda';
import Select from './ui/Select';
import { SETORES, ESTADOS, MESES, MetaDados, DadosNivel1 } from '@/types/analise';

interface FormularioNivel1Props {
  onSubmit: (meta: MetaDados, dados: DadosNivel1) => void;
  loading?: boolean;
}

export default function FormularioNivel1({ onSubmit, loading = false }: FormularioNivel1Props) {
  // Estados do formulário
  const [setor, setSetor] = useState<string>('');
  const [estado, setEstado] = useState<string>('');
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());

  const [receitaBruta, setReceitaBruta] = useState<number>(0);
  const [custoVendas, setCustoVendas] = useState<number>(0);
  const [despesasFixas, setDespesasFixas] = useState<number>(0);
  const [caixa, setCaixa] = useState<number>(0);
  const [contaCorrente, setContaCorrente] = useState<number>(0);
  const [contasReceber, setContasReceber] = useState<number>(0);
  const [contasPagar, setContasPagar] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!setor || !estado) {
      alert('Por favor, preencha o setor e o estado.');
      return;
    }

    if (receitaBruta === 0 || despesasFixas === 0) {
      alert('Por favor, preencha os campos essenciais (Receita Bruta e Despesas Fixas).');
      return;
    }

    const meta: MetaDados = {
      setor: setor as any,
      estado: estado as any,
      mes,
      ano,
      nivel_maximo_preenchido: 1,
    };

    const dados: DadosNivel1 = {
      receita_bruta_mensal: receitaBruta,
      custo_vendas_mensal: custoVendas > 0 ? custoVendas : undefined,
      despesas_fixas_mensais: despesasFixas,
      caixa,
      conta_corrente: contaCorrente,
      contas_a_receber_30d: contasReceber > 0 ? contasReceber : undefined,
      contas_a_pagar_30d: contasPagar > 0 ? contasPagar : undefined,
    };

    onSubmit(meta, dados);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seção: Informações Gerais */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          📋 Informações Gerais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Setor de Atuação"
            value={setor}
            onChange={setSetor}
            options={SETORES}
            placeholder="Selecione o setor"
          />
          
          <Select
            label="Estado (UF)"
            value={estado}
            onChange={setEstado}
            options={ESTADOS}
            placeholder="Selecione o estado"
          />
          
          <Select
            label="Mês de Referência"
            value={mes}
            onChange={(val) => setMes(Number(val))}
            options={MESES}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ano de Referência <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(Number(e.target.value))}
              min={2020}
              max={2030}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Seção: Receitas e Custos */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          💰 Receitas e Custos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="Receita Bruta Mensal"
            value={receitaBruta}
            onChange={setReceitaBruta}
            tooltip="Total faturado no mês de referência"
            placeholder="100.000,00"
          />
          
          <InputMoeda
            label="Custo das Vendas (CMV/CSP)"
            value={custoVendas}
            onChange={setCustoVendas}
            opcional
            tooltip="Custos diretamente ligados à venda/entrega. Se não informado, será estimado em 65% da receita."
            placeholder="65.000,00"
          />
          
          <InputMoeda
            label="Despesas Fixas Mensais"
            value={despesasFixas}
            onChange={setDespesasFixas}
            tooltip="Gastos que não variam com o volume: aluguel, folha, energia, contador, internet."
            placeholder="25.000,00"
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Seção: Disponibilidades */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          🏦 Disponibilidades
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="Caixa"
            value={caixa}
            onChange={setCaixa}
            tooltip="Dinheiro físico em espécie"
            placeholder="15.000,00"
          />
          
          <InputMoeda
            label="Conta Corrente"
            value={contaCorrente}
            onChange={setContaCorrente}
            tooltip="Saldos bancários disponíveis"
            placeholder="35.000,00"
          />
        </div>
      </div>

      {/* Seção: Contas a Receber e Pagar */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          📊 Contas a Receber e Pagar (30 dias)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="Contas a Receber (30 dias)"
            value={contasReceber}
            onChange={setContasReceber}
            opcional
            tooltip="Valores que entrarão no caixa nos próximos 30 dias"
            placeholder="30.000,00"
          />
          
          <InputMoeda
            label="Contas a Pagar (30 dias)"
            value={contasPagar}
            onChange={setContasPagar}
            opcional
            tooltip="Valores que sairão do caixa nos próximos 30 dias"
            placeholder="20.000,00"
          />
        </div>
      </div>

      {/* Botão de Submit */}
      <div className="flex justify-center pt-4">
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
            'Gerar Análise Nível 1'
          )}
        </button>
      </div>

      {/* Informações adicionais */}
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Campos com <span className="text-red-500">*</span> são essenciais</p>
        <p>Campos opcionais podem ser estimados automaticamente</p>
      </div>
    </form>
  );
}