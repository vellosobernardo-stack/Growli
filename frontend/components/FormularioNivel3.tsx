'use client';

import { useState } from 'react';
import InputMoeda from './ui/InputMoeda';
import InputNumero from './ui/InputNumero';
import { DadosNivel3 } from '@/types/analise';

interface FormularioNivel3Props {
  onSubmit: (dados: DadosNivel3) => void;
  onVoltar: () => void;
  loading?: boolean;
}

export default function FormularioNivel3({ onSubmit, onVoltar, loading = false }: FormularioNivel3Props) {
  // Receitas dos últimos 3 meses
  const [receita3MesesAtras, setReceita3MesesAtras] = useState<number>(0);
  const [receita2MesesAtras, setReceita2MesesAtras] = useState<number>(0);
  const [receita1MesAtras, setReceita1MesAtras] = useState<number>(0);
  
  const [aliquotaImpostos, setAliquotaImpostos] = useState<number>(0);
  const [despesasVariaveis, setDespesasVariaveis] = useState<number>(0);
  const [capex, setCapex] = useState<number>(0);
  const [imobilizado, setImobilizado] = useState<number>(0);
  const [patrimonioLiquido, setPatrimonioLiquido] = useState<number>(0);
  const [metaMargemBruta, setMetaMargemBruta] = useState<number>(40);
  const [metaPrazoRecebimento, setMetaPrazoRecebimento] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (receita1MesAtras === 0 || receita2MesesAtras === 0 || receita3MesesAtras === 0) {
      alert('Por favor, informe as receitas dos últimos 3 meses.');
      return;
    }

    if (metaMargemBruta === 0) {
      alert('Por favor, defina uma meta de margem bruta.');
      return;
    }

    const dados: DadosNivel3 = {
      receita_ultimos_3_meses: [receita3MesesAtras, receita2MesesAtras, receita1MesAtras],
      aliquota_impostos_percentual: aliquotaImpostos > 0 ? aliquotaImpostos : undefined,
      despesas_variaveis_percentual_receita: despesasVariaveis > 0 ? despesasVariaveis : undefined,
      capex_planejado_prox_6m: capex > 0 ? capex : undefined,
      imobilizado: imobilizado > 0 ? imobilizado : undefined,
      patrimonio_liquido: patrimonioLiquido !== 0 ? patrimonioLiquido : undefined,
      meta_margem_bruta_percentual: metaMargemBruta,
      meta_prazo_recebimento_dias: metaPrazoRecebimento > 0 ? metaPrazoRecebimento : undefined,
    };

    onSubmit(dados);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Seção: Histórico de Receitas */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          📈 Receitas dos Últimos 3 Meses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputMoeda
            label="3 Meses Atrás"
            value={receita3MesesAtras}
            onChange={setReceita3MesesAtras}
            tooltip="Receita bruta de 3 meses atrás"
            placeholder="95.000,00"
          />
          
          <InputMoeda
            label="2 Meses Atrás"
            value={receita2MesesAtras}
            onChange={setReceita2MesesAtras}
            tooltip="Receita bruta de 2 meses atrás"
            placeholder="98.000,00"
          />
          
          <InputMoeda
            label="Mês Passado"
            value={receita1MesAtras}
            onChange={setReceita1MesAtras}
            tooltip="Receita bruta do mês anterior ao de referência"
            placeholder="100.000,00"
          />
        </div>
      </div>

      {/* Seção: Estrutura Tributária */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          📊 Estrutura Tributária e Variável
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputNumero
            label="Alíquota de Impostos (%)"
            value={aliquotaImpostos}
            onChange={setAliquotaImpostos}
            opcional
            tooltip="Percentual médio de impostos sobre as vendas (ex: 8% no Simples Nacional)"
            placeholder="8"
            sufixo="%"
            min={0}
            max={100}
            step={0.1}
          />
          
          <InputNumero
            label="Despesas Variáveis (% da Receita)"
            value={despesasVariaveis}
            onChange={setDespesasVariaveis}
            opcional
            tooltip="Despesas que crescem com as vendas: fretes, comissões, embalagens"
            placeholder="5"
            sufixo="%"
            min={0}
            max={100}
            step={0.1}
          />
        </div>
      </div>

      {/* Seção: Investimentos e Patrimônio */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-purple-900 mb-4">
          💼 Investimentos e Patrimônio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputMoeda
            label="CAPEX Planejado (próximos 6 meses)"
            value={capex}
            onChange={setCapex}
            opcional
            tooltip="Investimentos planejados em máquinas, equipamentos ou sistemas"
            placeholder="50.000,00"
          />
          
          <InputMoeda
            label="Imobilizado"
            value={imobilizado}
            onChange={setImobilizado}
            opcional
            tooltip="Bens permanentes: máquinas, equipamentos, veículos, imóveis"
            placeholder="150.000,00"
          />
          
          <InputMoeda
            label="Patrimônio Líquido"
            value={patrimonioLiquido}
            onChange={setPatrimonioLiquido}
            opcional
            tooltip="Ativos totais menos Passivos (capital próprio)"
            placeholder="120.000,00"
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Seção: Metas */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">
          🎯 Metas de Gestão
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputNumero
            label="Meta de Margem Bruta (%)"
            value={metaMargemBruta}
            onChange={setMetaMargemBruta}
            tooltip="Margem bruta desejada (será usada nas projeções otimistas)"
            placeholder="40"
            sufixo="%"
            min={0}
            max={100}
            step={0.1}
          />
          
          <InputNumero
            label="Meta de Prazo de Recebimento (dias)"
            value={metaPrazoRecebimento}
            onChange={setMetaPrazoRecebimento}
            opcional
            tooltip="Prazo de recebimento ideal (DSO desejado)"
            placeholder="20"
            sufixo="dias"
            min={0}
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
            'Gerar Análise Completa'
          )}
        </button>
      </div>

      {/* Informações adicionais */}
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Ao concluir o Nível 3, você receberá projeções em 3 cenários e um plano de ação 30-60-90 dias</p>
      </div>
    </form>
  );
}