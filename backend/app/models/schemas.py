"""
Schemas (Modelos de Dados)
Define a estrutura dos dados que a API recebe e retorna
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, validator
from enum import Enum


# ============= ENUMS =============

class SetorEnum(str, Enum):
    """Setores de atuação disponíveis"""
    AGRICULTURA = "agricultura"
    PECUARIA = "pecuaria"
    EXTRATIVAS = "extrativas"
    TRANSFORMACAO = "transformacao"
    ELETRICIDADE_GAS = "eletricidade_gas"
    AGUA_RESIDUOS = "agua_residuos"
    CONSTRUCAO = "construcao"
    COMERCIO_VEICULOS = "comercio_veiculos"
    TRANSPORTE = "transporte"
    ALOJAMENTO_ALIMENTACAO = "alojamento_alimentacao"
    INFORMACAO_COMUNICACAO = "informacao_comunicacao"
    FINANCEIRAS = "financeiras"
    IMOBILIARIAS = "imobiliarias"
    PROFISSIONAIS = "profissionais"
    ADMINISTRATIVAS = "administrativas"
    ADMINISTRACAO_PUBLICA = "administracao_publica"
    EDUCACAO = "educacao"
    SAUDE = "saude"
    ARTES_CULTURA = "artes_cultura"
    OUTRAS_ATIVIDADES = "outras_atividades"
    SERVICOS_DOMESTICOS = "servicos_domesticos"


class EstadoEnum(str, Enum):
    """Estados brasileiros (UF)"""
    AC = "AC"; AL = "AL"; AP = "AP"; AM = "AM"; BA = "BA"
    CE = "CE"; DF = "DF"; ES = "ES"; GO = "GO"; MA = "MA"
    MT = "MT"; MS = "MS"; MG = "MG"; PA = "PA"; PB = "PB"
    PR = "PR"; PE = "PE"; PI = "PI"; RJ = "RJ"; RN = "RN"
    RS = "RS"; RO = "RO"; RR = "RR"; SC = "SC"; SP = "SP"
    SE = "SE"; TO = "TO"


# ============= DADOS DE ENTRADA =============

class MetaDados(BaseModel):
    """Informações gerais presentes em todos os níveis"""
    email: Optional[str] = Field(None, description="Email do usuário (opcional)")  
    empresa: Optional[str] = Field(None, description="Nome da empresa (opcional)")
    setor: SetorEnum = Field(..., description="Setor de atuação da empresa")
    estado: EstadoEnum = Field(..., description="Estado (UF) onde a empresa opera")
    mes: int = Field(..., ge=1, le=12, description="Mês de referência (1-12)")
    ano: int = Field(..., ge=2020, le=2030, description="Ano de referência")
    nivel_maximo_preenchido: int = Field(..., ge=1, le=3, description="Até qual nível o usuário preencheu")


class DadosNivel1(BaseModel):
    """Dados do Nível 1 - Básico"""
    receita_bruta_mensal: float = Field(..., ge=0, description="Receita bruta do mês")
    custo_vendas_mensal: Optional[float] = Field(None, ge=0, description="CMV/CSP")
    despesas_fixas_mensais: float = Field(..., ge=0, description="Despesas fixas")
    caixa: float = Field(..., ge=0, description="Dinheiro em espécie")
    conta_corrente: float = Field(..., ge=0, description="Saldo bancário")
    contas_a_receber_30d: Optional[float] = Field(None, ge=0, description="A receber em 30 dias")
    contas_a_pagar_30d: Optional[float] = Field(None, ge=0, description="A pagar em 30 dias")


class DadosNivel2(BaseModel):
    """Dados do Nível 2 - Intermediário"""
    prazo_medio_recebimento_dias: Optional[float] = Field(None, ge=0, description="DSO - Dias")
    prazo_medio_pagamento_dias: Optional[float] = Field(None, ge=0, description="DPO - Dias")
    estoque_custo: Optional[float] = Field(None, ge=0, description="Valor do estoque")
    dividas_totais: float = Field(..., ge=0, description="Dívidas totais")
    despesas_financeiras_mensais: Optional[float] = Field(None, ge=0, description="Juros pagos")
    impostos_mensais: Optional[float] = Field(None, ge=0, description="Impostos do mês")
    numero_funcionarios: Optional[int] = Field(None, ge=0, description="Número de funcionários")


class DadosNivel3(BaseModel):
    """Dados do Nível 3 - Avançado"""
    receita_ultimos_3_meses: List[float] = Field(..., min_items=3, max_items=3, description="Receitas dos últimos 3 meses")
    aliquota_impostos_percentual: Optional[float] = Field(None, ge=0, le=100, description="Alíquota média de impostos (%)")
    despesas_variaveis_percentual_receita: Optional[float] = Field(None, ge=0, le=100, description="Despesas variáveis (%)")
    capex_planejado_prox_6m: Optional[float] = Field(None, ge=0, description="CAPEX planejado")
    imobilizado: Optional[float] = Field(None, ge=0, description="Ativo imobilizado")
    patrimonio_liquido: Optional[float] = Field(None, description="Patrimônio líquido")
    meta_margem_bruta_percentual: float = Field(..., ge=0, le=100, description="Meta de margem bruta (%)")
    meta_prazo_recebimento_dias: Optional[float] = Field(None, ge=0, description="Meta de DSO")

    @validator('receita_ultimos_3_meses')
    def validar_receitas_positivas(cls, v):
        """Garante que todas as receitas são não-negativas"""
        if any(r < 0 for r in v):
            raise ValueError("Todas as receitas devem ser não-negativas")
        return v


class AnaliseRequest(BaseModel):
    """Requisição completa de análise"""
    meta: MetaDados
    nivel1: DadosNivel1
    nivel2: Optional[DadosNivel2] = None
    nivel3: Optional[DadosNivel3] = None


# ============= DADOS DE SAÍDA =============

class KPI(BaseModel):
    """Estrutura de um indicador (KPI)"""
    nome: str
    valor: float
    formato: str  # "moeda", "percentual", "numero", "dias"
    classificacao: Optional[str] = None  # "verde", "amarelo", "vermelho"


class GraficoBarras(BaseModel):
    """Dados para gráfico de barras"""
    tipo: str = "barras"
    titulo: str
    labels: List[str]
    valores: List[float]
    cores: Optional[List[str]] = None


class GraficoLinha(BaseModel):
    """Dados para gráfico de linha"""
    tipo: str = "linha"
    titulo: str
    labels: List[str]
    series: List[Dict[str, Any]]  # [{"nome": "Serie 1", "valores": [1,2,3]}]


class Tabela(BaseModel):
    """Dados para tabela"""
    titulo: str
    colunas: List[str]
    linhas: List[List[Any]]


class ResultadoNivel(BaseModel):
    """Resultado de um nível de análise"""
    kpis: List[KPI]
    graficos: List[Any]  # GraficoBarras ou GraficoLinha
    tabelas: List[Tabela]
    mensagem: str
    convite_proximo_nivel: Optional[str] = None
    assumptions: List[str]  # Lista de campos estimados
    missing: List[str]  # Lista de campos opcionais não preenchidos

class AcaoPlano(BaseModel):
    """Estrutura de uma ação do plano 30-60-90 dias"""
    titulo: str
    descricao: str
    resultado_esperado: str
    prioridade: str

class DiagnosticoEstrategia(BaseModel):
    """Diagnóstico final e plano de ação (só no Nível 3)"""
    diagnostico: List[str]  # 3-5 frases principais
    oportunidades: List[Dict[str, Any]]  # {"descricao": "...", "impacto_r": 1000, "impacto_percentual": 5}
    plano_30_60_90: Dict[str, List[AcaoPlano]]  # {"30_dias": [...], "60_dias": [...], "90_dias": [...]}


class AnaliseResponse(BaseModel):
    """Resposta completa da análise"""
    nivel1: ResultadoNivel
    nivel2: Optional[ResultadoNivel] = None
    nivel3: Optional[ResultadoNivel] = None
    diagnostico_estrategia: Optional[DiagnosticoEstrategia] = None
    status_validacao: Dict[str, Any]
