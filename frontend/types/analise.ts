// Tipos para a análise financeira

export type SetorEnum = 
  | "agricultura" | "pecuaria" | "extrativas" | "transformacao"
  | "eletricidade_gas" | "agua_residuos" | "construcao" | "comercio_veiculos"
  | "transporte" | "alojamento_alimentacao" | "informacao_comunicacao"
  | "financeiras" | "imobiliarias" | "profissionais" | "administrativas"
  | "administracao_publica" | "educacao" | "saude" | "artes_cultura"
  | "outras_atividades" | "servicos_domesticos";

export type EstadoEnum = 
  | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA"
  | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" | "RJ" | "RN"
  | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO";

export interface MetaDados {
  setor: SetorEnum;
  estado: EstadoEnum;
  mes: number;
  ano: number;
  nivel_maximo_preenchido: 1 | 2 | 3;
}

export interface DadosNivel1 {
  receita_bruta_mensal: number;
  custo_vendas_mensal?: number;
  despesas_fixas_mensais: number;
  caixa: number;
  conta_corrente: number;
  contas_a_receber_30d?: number;
  contas_a_pagar_30d?: number;
}

export interface DadosNivel2 {
  prazo_medio_recebimento_dias?: number;
  prazo_medio_pagamento_dias?: number;
  estoque_custo?: number;
  dividas_totais: number;
  despesas_financeiras_mensais?: number;
  impostos_mensais?: number;
  numero_funcionarios?: number;
}

export interface DadosNivel3 {
  receita_ultimos_3_meses: [number, number, number];
  aliquota_impostos_percentual?: number;
  despesas_variaveis_percentual_receita?: number;
  capex_planejado_prox_6m?: number;
  imobilizado?: number;
  patrimonio_liquido?: number;
  meta_margem_bruta_percentual: number;
  meta_prazo_recebimento_dias?: number;
}

export interface AnaliseRequest {
  meta: MetaDados;
  nivel1: DadosNivel1;
  nivel2?: DadosNivel2;
  nivel3?: DadosNivel3;
}

// Tipos de resposta
export interface KPI {
  nome: string;
  valor: number;
  formato: "moeda" | "percentual" | "numero" | "dias";
  classificacao?: "verde" | "amarelo" | "vermelho";
}

export interface GraficoBarras {
  tipo: "barras";
  titulo: string;
  labels: string[];
  valores: number[];
  cores?: string[];
}

export interface GraficoLinha {
  tipo: "linha";
  titulo: string;
  labels: string[];
  series: {
    nome: string;
    valores: number[];
    cor?: string;
  }[];
}

export interface Tabela {
  titulo: string;
  colunas: string[];
  linhas: any[][];
}

export interface ResultadoNivel {
  kpis: KPI[];
  graficos: (GraficoBarras | GraficoLinha)[];
  tabelas: Tabela[];
  mensagem: string;
  convite_proximo_nivel?: string;
  assumptions: string[];
  missing: string[];
}

export interface DiagnosticoEstrategia {
  diagnostico: string[];
  oportunidades: {
    descricao: string;
    impacto_r: number;
    impacto_percentual: number;
    acao?: string;
  }[];
  plano_30_60_90: {
    "30_dias": string[];
    "60_dias": string[];
    "90_dias": string[];
  };
}

export interface AnaliseResponse {
  nivel1: ResultadoNivel;
  nivel2?: ResultadoNivel;
  nivel3?: ResultadoNivel;
  diagnostico_estrategia?: DiagnosticoEstrategia;
  status_validacao: {
    assumptions: string[];
    avisos: string[];
  };
}

// Constantes
export const SETORES: { value: SetorEnum; label: string }[] = [
  { value: "agricultura", label: "Agricultura, pecuária e produção florestal" },
  { value: "pecuaria", label: "Pecuária" },
  { value: "extrativas", label: "Indústrias extrativas" },
  { value: "transformacao", label: "Indústrias de transformação" },
  { value: "eletricidade_gas", label: "Eletricidade e gás" },
  { value: "agua_residuos", label: "Água, esgoto e gestão de resíduos" },
  { value: "construcao", label: "Construção" },
  { value: "comercio_veiculos", label: "Comércio e reparação de veículos" },
  { value: "transporte", label: "Transporte, armazenagem e correio" },
  { value: "alojamento_alimentacao", label: "Alojamento e alimentação" },
  { value: "informacao_comunicacao", label: "Informação e comunicação" },
  { value: "financeiras", label: "Atividades financeiras e seguros" },
  { value: "imobiliarias", label: "Atividades imobiliárias" },
  { value: "profissionais", label: "Atividades profissionais e técnicas" },
  { value: "administrativas", label: "Atividades administrativas" },
  { value: "administracao_publica", label: "Administração pública" },
  { value: "educacao", label: "Educação" },
  { value: "saude", label: "Saúde humana e serviços sociais" },
  { value: "artes_cultura", label: "Artes, cultura e esporte" },
  { value: "outras_atividades", label: "Outras atividades de serviços" },
  { value: "servicos_domesticos", label: "Serviços domésticos" },
];

export const ESTADOS: { value: EstadoEnum; label: string }[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const MESES = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];