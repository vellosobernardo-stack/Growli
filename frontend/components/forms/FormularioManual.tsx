'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { DadosFinanceiros } from '@/types'

const SETORES = [
  { value: 'agricultura', label: 'Agricultura, Pecuária, Produção Florestal' },
  { value: 'pecuaria', label: 'Pecuária' },
  { value: 'extrativas', label: 'Indústrias Extrativas' },
  { value: 'transformacao', label: 'Indústrias de Transformação' },
  { value: 'eletricidade_gas', label: 'Eletricidade e Gás' },
  { value: 'agua_residuos', label: 'Água, Esgoto e Gestão de Resíduos' },
  { value: 'construcao', label: 'Construção' },
  { value: 'comercio_veiculos', label: 'Comércio e Reparação de Veículos' },
  { value: 'transporte', label: 'Transporte, Armazenagem e Correio' },
  { value: 'alojamento_alimentacao', label: 'Alojamento e Alimentação' },
  { value: 'informacao_comunicacao', label: 'Informação e Comunicação' },
  { value: 'financeiras', label: 'Atividades Financeiras e Seguros' },
  { value: 'imobiliarias', label: 'Atividades Imobiliárias' },
  { value: 'profissionais', label: 'Atividades Profissionais, Científicas e Técnicas' },
  { value: 'administrativas', label: 'Atividades Administrativas' },
  { value: 'administracao_publica', label: 'Administração Pública' },
  { value: 'educacao', label: 'Educação' },
  { value: 'saude', label: 'Saúde Humana e Serviços Sociais' },
  { value: 'artes_cultura', label: 'Artes, Cultura, Esporte e Recreação' },
  { value: 'outras_atividades', label: 'Outras Atividades de Serviços' },
  { value: 'servicos_domesticos', label: 'Serviços Domésticos' },
]

const ESTADOS = [
  { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' }, { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' }, { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' }, { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' }, { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
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

      <div className="grid grid-cols-2 gap-4">
        <Select label="Setor de Atuação" {...register('setor')} options={SETORES} />
        <Select label="Estado (Opcional)" {...register('estado')} options={[{ value: '', label: 'Selecione...' }, ...ESTADOS]} />
      </div>
      
      <Input label="Período" placeholder="2024-12" {...register('periodo_referencia')} />

      <Button type="submit" loading={loading} className="w-full">
        Calcular Análise
      </Button>
    </form>
  )
}
