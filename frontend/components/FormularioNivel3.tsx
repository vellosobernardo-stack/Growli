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
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Nível 3: Análise Avançada
        </h2>
        <p className="text-gray-600">
          Complete sua análise com projeções e planejamento estratégico
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Histórico */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
            📈 Receitas dos Últimos 3 Meses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputMoeda 
              label="3 Meses Atrás" 
              value={receita3MesesAtras} 
              onChange={setReceita3MesesAtras} 
              placeholder="95.000,00" 
            />
            <InputMoeda 
              label="2 Meses Atrás" 
              value={receita2MesesAtras} 
              onChange={setReceita2MesesAtras} 
              placeholder="98.000,00" 
            />
            <InputMoeda 
              label="Mês Passado" 
              value={receita1MesAtras} 
              onChange={setReceita1MesAtras} 
              placeholder="100.000,00" 
            />
          </div>
        </div>

        {/* Estrutura */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-green-500 pl-3">
            📊 Estrutura Tributária e Variável
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputNumero 
              label="Alíquota de Impostos (%)" 
              value={aliquotaImpostos} 
              onChange={setAliquotaImpostos} 
              opcional 
              placeholder="8" 
              sufixo="%" 
              min={0} 
              max={100} 
              step={0.1} 
            />
            <InputNumero 
              label="Despesas Variáveis (% Receita)" 
              value={despesasVariaveis} 
              onChange={setDespesasVariaveis} 
              opcional 
              placeholder="5" 
              sufixo="%" 
              min={0} 
              max={100} 
              step={0.1} 
            />
          </div>
        </div>

        {/* Patrimônio */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-purple-500 pl-3">
            💼 Investimentos e Patrimônio
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputMoeda 
              label="CAPEX Planejado (6 meses)" 
              value={capex} 
              onChange={setCapex} 
              opcional 
              placeholder="50.000,00" 
            />
            <InputMoeda 
              label="Imobilizado" 
              value={imobilizado} 
              onChange={setImobilizado} 
              opcional 
              placeholder="150.000,00" 
            />
            <div className="md:col-span-2">
              <InputMoeda 
                label="Patrimônio Líquido" 
                value={patrimonioLiquido} 
                onChange={setPatrimonioLiquido} 
                opcional 
                placeholder="120.000,00" 
              />
            </div>
          </div>
        </div>

        {/* Metas */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-orange-500 pl-3">
            🎯 Metas de Gestão
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputNumero 
              label="Meta de Margem Bruta (%)" 
              value={metaMargemBruta} 
              onChange={setMetaMargemBruta} 
              placeholder="40" 
              sufixo="%" 
              min={0} 
              max={100} 
              step={0.1} 
            />
            <InputNumero 
              label="Meta de Prazo Recebimento (dias)" 
              value={metaPrazoRecebimento} 
              onChange={setMetaPrazoRecebimento} 
              opcional 
              placeholder="20" 
              sufixo="dias" 
              min={0} 
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button 
            type="button" 
            onClick={onVoltar} 
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all"
          >
            ← Voltar
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando...' : 'Gerar Análise Completa'}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-4">
          <p>Ao concluir, você receberá projeções em 3 cenários e um plano 30-60-90 dias</p>
        </div>
      </form>
    </div>
  );
}