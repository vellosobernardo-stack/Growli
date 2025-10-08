from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class SetorEnum(str, Enum):
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
    AC = "AC"; AL = "AL"; AP = "AP"; AM = "AM"; BA = "BA"
    CE = "CE"; DF = "DF"; ES = "ES"; GO = "GO"; MA = "MA"
    MT = "MT"; MS = "MS"; MG = "MG"; PA = "PA"; PB = "PB"
    PR = "PR"; PE = "PE"; PI = "PI"; RJ = "RJ"; RN = "RN"
    RS = "RS"; RO = "RO"; RR = "RR"; SC = "SC"; SP = "SP"
    SE = "SE"; TO = "TO"

class TipoCenario(str, Enum):
    OTIMISTA = "otimista"
    NEUTRO = "neutro"
    PESSIMISTA = "pessimista"

class DadosFinanceirosInput(BaseModel):
    caixa: float = Field(..., ge=0)
    contas_receber: float = Field(..., ge=0)
    estoque: float = Field(..., ge=0)
    imobilizado: float = Field(..., ge=0)
    fornecedores: float = Field(..., ge=0)
    emprestimos_cp: float = Field(..., ge=0)
    impostos: float = Field(..., ge=0)
    emprestimos_lp: float = Field(..., ge=0)
    receita_bruta: float = Field(..., gt=0)
    custo_vendas: float = Field(..., ge=0)
    despesas_operacionais: float = Field(..., ge=0)
    despesas_financeiras: float = Field(..., ge=0)
    setor: SetorEnum
    estado: Optional[EstadoEnum] = None
    periodo_referencia: str
    
    @validator('receita_bruta')
    def receita_deve_ser_positiva(cls, v):
        if v <= 0:
            raise ValueError('Receita bruta deve ser maior que zero')
        return v

class IndicadoresFinanceiros(BaseModel):
    liquidez_corrente: float
    liquidez_seca: float
    liquidez_imediata: float
    margem_bruta: float
    margem_operacional: float
    margem_liquida: float
    endividamento_geral: float
    composicao_endividamento: float
    giro_estoque: float
    prazo_medio_recebimento: float
    prazo_medio_pagamento: float
    ciclo_operacional: float
    ciclo_caixa: float
    capital_giro: float
    necessidade_capital_giro: float
    rentabilidade_patrimonio: float
    rentabilidade_ativo: float

class Cenario(BaseModel):
    tipo: TipoCenario
    taxa_crescimento: float
    receita_projetada: float
    lucro_projetado: float
    necessidade_capital: float
    recomendacoes: List[str] = Field(default_factory=list)

class ResultadoAnalise(BaseModel):
    id_analise: str
    data_analise: datetime = Field(default_factory=datetime.now)
    setor: SetorEnum
    estado: Optional[EstadoEnum] = None
    dados_input: DadosFinanceirosInput
    indicadores: IndicadoresFinanceiros
    cenarios: List[Cenario]
    pontos_fortes: List[str]
    pontos_atencao: List[str]
    acoes_prioritarias: List[str]
    estrategias_personalizadas: List[str]
    saude_financeira_score: int = Field(..., ge=0, le=100)

class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None
