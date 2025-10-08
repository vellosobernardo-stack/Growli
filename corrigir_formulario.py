"""
🔧 CORRIGIR FORMULÁRIO - Adicionar campos faltantes
Salve como: corrigir_formulario.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho}")

print("🔧 Corrigindo formulário...\n")

# ============================================
# FORMULÁRIO COMPLETO COM TODOS OS CAMPOS
# ============================================
form_corrigido = r"""'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { DadosFinanceiros } from '@/types'

const SETORES = [
  { value: 'comercio_varejo', label: 'Comércio Varejista' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'tecnologia', label: 'Tecnologia' }
]

export function FormularioManual({ onSubmit, loading }: { onSubmit: (d: any) => void, loading?: boolean }) {
  const { register, handleSubmit } = useForm<DadosFinanceiros>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Balanço Patrimonial</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Caixa" type="number" step="0.01" {...register('caixa', { valueAsNumber: true })} />
          <Input label="Contas a Receber" type="number" step="0.01" {...register('contas_receber', { valueAsNumber: true })} />
          <Input label="Estoque" type="number" step="0.01" {...register('estoque', { valueAsNumber: true })} />
          <Input label="Imobilizado" type="number" step="0.01" {...register('imobilizado', { valueAsNumber: true })} />
          <Input label="Fornecedores" type="number" step="0.01" {...register('fornecedores', { valueAsNumber: true })} />
          <Input label="Empréstimos CP" type="number" step="0.01" {...register('emprestimos_cp', { valueAsNumber: true })} />
          <Input label="Impostos a Pagar" type="number" step="0.01" {...register('impostos', { valueAsNumber: true })} />
          <Input label="Empréstimos LP" type="number" step="0.01" {...register('emprestimos_lp', { valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">DRE</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Receita Bruta" type="number" step="0.01" {...register('receita_bruta', { valueAsNumber: true })} />
          <Input label="Custo Vendas" type="number" step="0.01" {...register('custo_vendas', { valueAsNumber: true })} />
          <Input label="Despesas Operacionais" type="number" step="0.01" {...register('despesas_operacionais', { valueAsNumber: true })} />
          <Input label="Despesas Financeiras" type="number" step="0.01" {...register('despesas_financeiras', { valueAsNumber: true })} />
        </div>
      </div>

      <Select label="Setor" {...register('setor')} options={SETORES} />
      <Input label="Período" placeholder="2024-12" {...register('periodo_referencia')} />

      <Button type="submit" loading={loading} className="w-full">
        Calcular Análise
      </Button>
    </form>
  )
}"""
criar_arquivo("frontend/components/forms/FormularioManual.tsx", form_corrigido)

print("\n✅ FORMULÁRIO CORRIGIDO!")
print("\n🔄 AGORA:")
print("1. O terminal do frontend vai recarregar automaticamente")
print("2. Atualize a página (F5)")
print("3. Preencha TODOS os campos")
print("4. Clique em 'Calcular Análise'")
print("\n⚠️ IMPORTANTE: Preencha IMPOSTOS e EMPRÉSTIMOS LP mesmo que sejam ZERO!")