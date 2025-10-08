export type SetorEnum = 
  | 'agricultura'
  | 'pecuaria'
  | 'extrativas'
  | 'transformacao'
  | 'eletricidade_gas'
  | 'agua_residuos'
  | 'construcao'
  | 'comercio_veiculos'
  | 'transporte'
  | 'alojamento_alimentacao'
  | 'informacao_comunicacao'
  | 'financeiras'
  | 'imobiliarias'
  | 'profissionais'
  | 'administrativas'
  | 'administracao_publica'
  | 'educacao'
  | 'saude'
  | 'artes_cultura'
  | 'outras_atividades'
  | 'servicos_domesticos'

export type EstadoEnum = 
  | 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA'
  | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN'
  | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

export interface DadosFinanceiros {
  caixa: number
  contas_receber: number
  estoque: number
  imobilizado: number
  fornecedores: number
  emprestimos_cp: number
  impostos: number
  emprestimos_lp: number
  receita_bruta: number
  custo_vendas: number
  despesas_operacionais: number
  despesas_financeiras: number
  setor: SetorEnum
  estado?: EstadoEnum
  periodo_referencia: string
}

export interface Indicadores {
  liquidez_corrente: number
  liquidez_seca: number
  liquidez_imediata: number
  margem_bruta: number
  margem_operacional: number
  margem_liquida: number
  endividamento_geral: number
  composicao_endividamento: number
  giro_estoque: number
  prazo_medio_recebimento: number
  prazo_medio_pagamento: number
  ciclo_operacional: number
  ciclo_caixa: number
  capital_giro: number
  necessidade_capital_giro: number
  rentabilidade_patrimonio: number
  rentabilidade_ativo: number
}

export interface Cenario {
  tipo: 'otimista' | 'neutro' | 'pessimista'
  taxa_crescimento: number
  receita_projetada: number
  lucro_projetado: number
  necessidade_capital: number
  recomendacoes: string[]
}

export interface ResultadoAnalise {
  id_analise: string
  data_analise: string
  setor: SetorEnum
  estado?: EstadoEnum
  dados_input: DadosFinanceiros
  indicadores: Indicadores
  cenarios: Cenario[]
  pontos_fortes: string[]
  pontos_atencao: string[]
  acoes_prioritarias: string[]
  estrategias_personalizadas: string[]
  saude_financeira_score: number
}
