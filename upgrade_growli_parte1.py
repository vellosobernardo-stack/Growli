"""
🌱 GROWLI 2.0 - PARTE 1: Setores CNAE + Estados
Salve como: upgrade_growli_parte1.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🌱 GROWLI 2.0 - Parte 1: Expandindo setores e estados...\n")

# ============================================
# 1. SCHEMAS.PY - ATUALIZAR COM 21 SETORES + ESTADO
# ============================================
schemas_updated = """from pydantic import BaseModel, Field, validator
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
"""
criar_arquivo("backend/app/models/schemas.py", schemas_updated)

# ============================================
# 2. SECTOR_BENCHMARKS.PY - 21 SETORES COMPLETOS
# ============================================
benchmarks_21 = """from typing import Dict, List

class SectorBenchmarks:
    BENCHMARKS = {
        "agricultura": {
            "nome": "Agricultura, Pecuária, Produção Florestal",
            "liquidez_corrente": 1.4, "margem_liquida": 8.0, "endividamento_geral": 50.0,
            "ciclo_caixa": 120, "giro_estoque": 4
        },
        "pecuaria": {
            "nome": "Pecuária",
            "liquidez_corrente": 1.3, "margem_liquida": 10.0, "endividamento_geral": 55.0,
            "ciclo_caixa": 180, "giro_estoque": 2
        },
        "extrativas": {
            "nome": "Indústrias Extrativas",
            "liquidez_corrente": 1.8, "margem_liquida": 12.0, "endividamento_geral": 45.0,
            "ciclo_caixa": 90, "giro_estoque": 6
        },
        "transformacao": {
            "nome": "Indústrias de Transformação",
            "liquidez_corrente": 1.5, "margem_liquida": 7.0, "endividamento_geral": 52.0,
            "ciclo_caixa": 75, "giro_estoque": 8
        },
        "eletricidade_gas": {
            "nome": "Eletricidade e Gás",
            "liquidez_corrente": 1.2, "margem_liquida": 15.0, "endividamento_geral": 60.0,
            "ciclo_caixa": 30, "giro_estoque": 12
        },
        "agua_residuos": {
            "nome": "Água, Esgoto e Gestão de Resíduos",
            "liquidez_corrente": 1.3, "margem_liquida": 10.0, "endividamento_geral": 55.0,
            "ciclo_caixa": 45, "giro_estoque": 10
        },
        "construcao": {
            "nome": "Construção",
            "liquidez_corrente": 1.4, "margem_liquida": 5.0, "endividamento_geral": 60.0,
            "ciclo_caixa": 150, "giro_estoque": 3
        },
        "comercio_veiculos": {
            "nome": "Comércio e Reparação de Veículos",
            "liquidez_corrente": 1.3, "margem_liquida": 4.0, "endividamento_geral": 55.0,
            "ciclo_caixa": 60, "giro_estoque": 6
        },
        "transporte": {
            "nome": "Transporte, Armazenagem e Correio",
            "liquidez_corrente": 1.1, "margem_liquida": 6.0, "endividamento_geral": 58.0,
            "ciclo_caixa": 40, "giro_estoque": 20
        },
        "alojamento_alimentacao": {
            "nome": "Alojamento e Alimentação",
            "liquidez_corrente": 1.2, "margem_liquida": 5.0, "endividamento_geral": 50.0,
            "ciclo_caixa": 15, "giro_estoque": 15
        },
        "informacao_comunicacao": {
            "nome": "Informação e Comunicação",
            "liquidez_corrente": 2.0, "margem_liquida": 15.0, "endividamento_geral": 35.0,
            "ciclo_caixa": 45, "giro_estoque": 25
        },
        "financeiras": {
            "nome": "Atividades Financeiras e Seguros",
            "liquidez_corrente": 2.5, "margem_liquida": 20.0, "endividamento_geral": 70.0,
            "ciclo_caixa": 20, "giro_estoque": 50
        },
        "imobiliarias": {
            "nome": "Atividades Imobiliárias",
            "liquidez_corrente": 1.8, "margem_liquida": 18.0, "endividamento_geral": 55.0,
            "ciclo_caixa": 180, "giro_estoque": 1
        },
        "profissionais": {
            "nome": "Atividades Profissionais, Científicas e Técnicas",
            "liquidez_corrente": 2.2, "margem_liquida": 12.0, "endividamento_geral": 30.0,
            "ciclo_caixa": 60, "giro_estoque": 30
        },
        "administrativas": {
            "nome": "Atividades Administrativas e Serviços Complementares",
            "liquidez_corrente": 1.6, "margem_liquida": 8.0, "endividamento_geral": 45.0,
            "ciclo_caixa": 50, "giro_estoque": 20
        },
        "administracao_publica": {
            "nome": "Administração Pública, Defesa e Seguridade Social",
            "liquidez_corrente": 1.5, "margem_liquida": 3.0, "endividamento_geral": 80.0,
            "ciclo_caixa": 30, "giro_estoque": 15
        },
        "educacao": {
            "nome": "Educação",
            "liquidez_corrente": 1.8, "margem_liquida": 12.0, "endividamento_geral": 40.0,
            "ciclo_caixa": 30, "giro_estoque": 30
        },
        "saude": {
            "nome": "Saúde Humana e Serviços Sociais",
            "liquidez_corrente": 1.7, "margem_liquida": 10.0, "endividamento_geral": 40.0,
            "ciclo_caixa": 45, "giro_estoque": 12
        },
        "artes_cultura": {
            "nome": "Artes, Cultura, Esporte e Recreação",
            "liquidez_corrente": 1.3, "margem_liquida": 8.0, "endividamento_geral": 45.0,
            "ciclo_caixa": 30, "giro_estoque": 20
        },
        "outras_atividades": {
            "nome": "Outras Atividades de Serviços",
            "liquidez_corrente": 1.5, "margem_liquida": 9.0, "endividamento_geral": 45.0,
            "ciclo_caixa": 40, "giro_estoque": 18
        },
        "servicos_domesticos": {
            "nome": "Serviços Domésticos",
            "liquidez_corrente": 2.0, "margem_liquida": 5.0, "endividamento_geral": 20.0,
            "ciclo_caixa": 15, "giro_estoque": 40
        }
    }
    
    STRATEGIES = {
        "agricultura": [
            "Otimize ciclo de produção para reduzir tempo de caixa",
            "Diversifique culturas para reduzir riscos climáticos",
            "Negocie contratos futuros para garantir preços",
            "Invista em tecnologia para aumentar produtividade",
            "Busque linhas de crédito rural com juros subsidiados"
        ],
        "transformacao": [
            "Otimize processo produtivo para reduzir custos",
            "Negocie volumes maiores com fornecedores",
            "Invista em automação e tecnologia",
            "Reduza perdas e retrabalho",
            "Busque certificações de qualidade"
        ],
        "informacao_comunicacao": [
            "Invista em inovação constante",
            "Busque modelo de receita recorrente (SaaS)",
            "Controle burn rate rigorosamente",
            "Invista em captação e retenção de talentos",
            "Expanda base de clientes com marketing digital"
        ],
        "educacao": [
            "Reduza inadimplência com cobranças automatizadas",
            "Invista em qualidade do ensino",
            "Diversifique fontes de receita (cursos, consultorias)",
            "Otimize ocupação de salas e turnos",
            "Busque parcerias com empresas para treinamentos"
        ],
        "saude": [
            "Negocie melhores condições com convênios",
            "Otimize agenda médica para reduzir ociosidade",
            "Invista em equipamentos modernos",
            "Implante protocolos de qualidade",
            "Reduza glosas com documentação adequada"
        ],
        "construcao": [
            "Controle rigoroso de custos por obra",
            "Negocie prazos estendidos com fornecedores",
            "Mantenha capital de giro robusto",
            "Diversifique entre obras públicas e privadas",
            "Invista em gestão de projetos"
        ],
        "comercio_veiculos": [
            "Negocie melhores condições com montadoras",
            "Invista em pós-venda e serviços",
            "Otimize giro de estoque",
            "Diversifique mix (novos, seminovos, serviços)",
            "Fortaleça relacionamento com clientes"
        ],
        "transporte": [
            "Otimize rotas para reduzir custos",
            "Invista em manutenção preventiva",
            "Negocie contratos de longo prazo",
            "Diversifique modal de transporte",
            "Controle consumo de combustível"
        ],
        "alojamento_alimentacao": [
            "Controle perdas e validade de produtos",
            "Otimize cardápio baseado em margem",
            "Invista em experiência do cliente",
            "Negocie compras à vista com desconto",
            "Busque canais de vendas online"
        ],
        "financeiras": [
            "Diversifique carteira de produtos",
            "Invista em tecnologia e segurança",
            "Mantenha índices de inadimplência baixos",
            "Cumpra regulamentações rigorosamente",
            "Expanda base de clientes digitalmente"
        ]
    }
    
    @classmethod
    def get_benchmarks(cls, setor: str) -> Dict:
        return cls.BENCHMARKS.get(setor.lower(), cls.BENCHMARKS["outras_atividades"])
    
    @classmethod
    def get_sector_strategies(cls, setor: str) -> List[str]:
        return cls.STRATEGIES.get(setor.lower(), [
            "Mantenha controle rigoroso do fluxo de caixa",
            "Invista em diferenciação competitiva",
            "Busque eficiência operacional",
            "Fortaleça relacionamento com clientes",
            "Monitore indicadores mensalmente"
        ])
"""
criar_arquivo("backend/app/services/sector_benchmarks.py", benchmarks_21)

print("\n✅ PARTE 1 CONCLUÍDA!")
print("\n📋 O que foi atualizado:")
print("  ✅ 21 setores CNAE completos")
print("  ✅ Campo de Estado adicionado")
print("  ✅ Estratégias específicas por setor")
print("  ✅ Novos indicadores (PMR, PMP, Ciclo de Caixa)")
print("\n⏳ Reinicie o backend para aplicar:")
print("  Ctrl+C no terminal do backend")
print("  uvicorn app.main:app --reload")