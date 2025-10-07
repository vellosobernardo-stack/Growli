from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class SetorEnum(str, Enum):
    COMERCIO_VAREJO = "comercio_varejo"
    SERVICOS = "servicos"
    INDUSTRIA = "industria"
    TECNOLOGIA = "tecnologia"
    ALIMENTACAO = "alimentacao"
    SAUDE = "saude"
    EDUCACAO = "educacao"
    CONSTRUCAO = "construcao"

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
    capital_giro: float
    necessidade_capital_giro: float

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
    dados_input: DadosFinanceirosInput
    indicadores: IndicadoresFinanceiros
    cenarios: List[Cenario]
    pontos_fortes: List[str]
    pontos_atencao: List[str]
    acoes_prioritarias: List[str]
    saude_financeira_score: int = Field(..., ge=0, le=100)

class SuccessResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[Dict] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    details: Optional[str] = None
