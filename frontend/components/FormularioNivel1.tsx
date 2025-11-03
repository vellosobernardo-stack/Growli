'use client';

import { useState } from 'react';
import { FileText, Flame, Wallet, BarChart3 } from 'lucide-react';
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
      alert('Por favor, preencha os campos essenciais (Receita Total do Mês e Despesas Fixas).');
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
    <form onSubmit={handleSubmit} className="space-y-12">
      
      {/* SEÇÃO 1: Informações Gerais */}
      <div 
        className="p-6 rounded-lg"
        style={{
          backgroundColor: 'hsl(210 15% 95% / 0.3)',
          border: '1px solid hsl(215 20% 88% / 0.5)'
        }}
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'hsl(142 70% 45% / 0.1)' }}
          >
            <FileText 
              className="w-5 h-5" 
              style={{ color: 'hsl(142 70% 45%)' }}
            />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(215 25% 15%)' }}>
            Informações Gerais
          </h3>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Setor de Atuação"
            value={setor}
            onChange={setSetor}
            options={SETORES}
            placeholder="Selecione..."
            tooltip="Escolha o setor que mais representa sua empresa. Usado para comparar com médias do mercado."
          />
          
          <Select
            label="Estado (UF)"
            value={estado}
            onChange={setEstado}
            options={ESTADOS}
            placeholder="Selecione..."
          />
          
          <Select
            label="Mês de Referência"
            value={mes}
            onChange={(val) => setMes(Number(val))}
            options={MESES}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium" style={{ color: 'hsl(215 25% 15%)' }}>
              Ano de Referência <span style={{ color: 'hsl(0 84.2% 60.2%)' }}>*</span>
            </label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(Number(e.target.value))}
              min={2020}
              max={2030}
              className="w-full h-11 px-4 rounded-lg transition-all focus:outline-none focus:ring-2"
              style={{
                border: '1px solid hsl(215 20% 88%)',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: Receitas e Custos */}
      <div 
        className="p-6 rounded-lg"
        style={{
          backgroundColor: 'hsl(210 15% 95% / 0.3)',
          border: '1px solid hsl(215 20% 88% / 0.5)'
        }}
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'hsl(25 95% 55% / 0.1)' }}
          >
            <Flame 
              className="w-5 h-5" 
              style={{ color: 'hsl(25 95% 55%)' }}
            />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(215 25% 15%)' }}>
            Receitas e Custos
          </h3>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputMoeda
            label="Receita Bruta Mensal"
            value={receitaBruta}
            onChange={setReceitaBruta}
            tooltip="Valor total vendido no mês — inclua tanto vendas à vista quanto a prazo. Ex: consultorias, produtos, serviços, notas emitidas."
            placeholder="100.000,00"
          />
          
          <InputMoeda
            label="Custo das Vendas (CMV/CSP)"
            value={custoVendas}
            onChange={setCustoVendas}
            opcional
            tooltip="Gastos diretamente ligados à entrega do produto ou serviço. Ex: mercadorias, comissões, insumos, fretes."
            placeholder="65.000,00"
          />
          
          <div className="md:col-span-2">
            <InputMoeda
              label="Despesas Fixas Mensais"
              value={despesasFixas}
              onChange={setDespesasFixas}
              tooltip="Gastos que se repetem todo mês, mesmo sem vendas. Ex: aluguel, energia, contador, folha de pagamento."
              placeholder="25.000,00"
            />
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: Disponibilidades */}
      <div 
        className="p-6 rounded-lg"
        style={{
          backgroundColor: 'hsl(210 15% 95% / 0.3)',
          border: '1px solid hsl(215 20% 88% / 0.5)'
        }}
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'hsl(200 80% 50% / 0.1)' }}
          >
            <Wallet 
              className="w-5 h-5" 
              style={{ color: 'hsl(200 80% 50%)' }}
            />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(215 25% 15%)' }}>
            Disponibilidades
          </h3>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputMoeda
            label="Caixa"
            value={caixa}
            onChange={setCaixa}
            tooltip="Dinheiro disponível na empresa, incluindo físico. Ex: troco no caixa, valores recebidos em espécie."
            placeholder="15.000,00"
          />
          
          <InputMoeda
            label="Conta Corrente"
            value={contaCorrente}
            onChange={setContaCorrente}
            tooltip="Saldo disponível nas contas bancárias da empresa (PJ)."
            placeholder="35.000,00"
          />
        </div>
      </div>

      {/* SEÇÃO 4: Contas a Receber e Pagar */}
      <div 
        className="p-6 rounded-lg"
        style={{
          backgroundColor: 'hsl(210 15% 95% / 0.3)',
          border: '1px solid hsl(215 20% 88% / 0.5)'
        }}
      >
        {/* Header da Seção */}
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'hsl(142 70% 45% / 0.1)' }}
          >
            <BarChart3 
              className="w-5 h-5" 
              style={{ color: 'hsl(142 70% 45%)' }}
            />
          </div>
          <h3 className="text-xl font-semibold" style={{ color: 'hsl(215 25% 15%)' }}>
            Contas a Receber e Pagar (30 dias)
          </h3>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputMoeda
            label="Contas a Receber (30 dias)"
            value={contasReceber}
            onChange={setContasReceber}
            opcional
            tooltip="Valores que seus clientes ainda vão pagar nos próximos 30 dias. Ex: boletos, duplicatas, vendas parceladas."
            placeholder="30.000,00"
          />
          
          <InputMoeda
            label="Contas a Pagar (30 dias)"
            value={contasPagar}
            onChange={setContasPagar}
            opcional
            tooltip="Contas que precisam ser pagas nos próximos 30 dias. Ex: fornecedores, aluguel, impostos, folha."
            placeholder="20.000,00"
          />
        </div>
      </div>

      {/* Botão de Submit */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 text-base font-semibold text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: loading ? 'hsl(215 15% 65%)' : 'hsl(142 70% 45%)',
            boxShadow: loading 
              ? 'none' 
              : '0 10px 25px -5px rgba(34, 197, 94, 0.3), 0 8px 10px -6px rgba(34, 197, 94, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = 'hsl(142 70% 40%)';
              e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(34, 197, 94, 0.4), 0 10px 15px -6px rgba(34, 197, 94, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = 'hsl(142 70% 45%)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(34, 197, 94, 0.3), 0 8px 10px -6px rgba(34, 197, 94, 0.3)';
            }
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
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

        {/* Nota explicativa */}
        <div className="text-center text-sm mt-4" style={{ color: 'hsl(215 15% 45%)' }}>
          <p>
            Campos marcados com <span style={{ color: 'hsl(0 84.2% 60.2%)' }}>*</span> são obrigatórios
          </p>
          <p>Campos opcionais podem ser estimados automaticamente</p>
        </div>
      </div>

    </form>
  );
}
