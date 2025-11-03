"""
Calculadora - Todas as fórmulas e cálculos financeiros
"""
from typing import Dict, List, Optional, Tuple
import statistics


# ============= CÁLCULOS NÍVEL 1 =============
from typing import Optional

def calcular_margem_bruta(receita: float, custo: float) -> float:
    """
    Margem Bruta = (Receita - Custo) / Receita
    
    Returns:
        Percentual (0-100)
    """
    if receita == 0:
        return 0.0
    return ((receita - custo) / receita) * 100


def calcular_resultado_operacional(receita: float, custo: float, despesas_fixas: float) -> float:
    """
    Resultado Operacional = Receita - Custo - Despesas Fixas
    
    Returns:
        Valor em R$
    """
    return receita - custo - despesas_fixas


def calcular_ponto_equilibrio(despesas_fixas: float, receita: float, custo: float) -> Optional[float]:
    """
    Ponto de Equilíbrio = Despesas Fixas / (1 - (Custo/Receita))
    
    Returns:
        Valor em R$ ou None se não for possível calcular
    """
    if receita == 0:
        return None
    
    margem_contribuicao = 1 - (custo / receita)
    
    if margem_contribuicao <= 0:
        return None  # Empresa não tem margem para cobrir despesas fixas
    
    return despesas_fixas / margem_contribuicao


def calcular_liquidez_imediata(disponibilidades: float, contas_a_pagar: float) -> float:
    """
    Liquidez Imediata = Disponibilidades / Contas a Pagar
    
    Args:
        disponibilidades: caixa + conta_corrente
        contas_a_pagar: contas a pagar em 30 dias
    
    Returns:
        Índice (valor absoluto)
    """
    if contas_a_pagar == 0:
        return 999.99  # Liquidez "infinita" (não tem dívidas de curto prazo)
    
    return disponibilidades / contas_a_pagar


def calcular_folego_caixa(
    disponibilidades: float,
    contas_a_receber: float,
    contas_a_pagar: float,
    despesas_fixas: float
) -> float:
    """
    Fôlego de Caixa = (Disponibilidades + A Receber - A Pagar) / (Despesas Fixas/30)
    
    Returns:
        Número de dias
    """
    caixa_liquido = disponibilidades + contas_a_receber - contas_a_pagar
    
    if despesas_fixas == 0:
        return 999.0  # Sem despesas fixas = fôlego "infinito"
    
    despesa_diaria = despesas_fixas / 30
    
    return caixa_liquido / despesa_diaria


# ============= CLASSIFICAÇÕES (PARA CORES DOS CARDS) =============

def classificar_margem_bruta(margem_percentual: float) -> str:
    """
    Classifica a margem bruta
    
    Args:
        margem_percentual: Valor de 0 a 100
    
    Returns:
        "bom" (verde) | "alerta" (amarelo) | "critico" (vermelho)
    """
    if margem_percentual >= 40:
        return "bom"
    elif margem_percentual >= 20:
        return "alerta"
    else:
        return "critico"


def classificar_resultado_operacional(resultado: float, receita: float) -> str:
    """
    Classifica o resultado operacional
    
    Args:
        resultado: Valor em R$
        receita: Receita total em R$
    
    Returns:
        "bom" (verde) | "alerta" (amarelo) | "critico" (vermelho)
    """
    if resultado <= 0:
        return "critico"
    
    if receita == 0:
        return "critico"
    
    percentual = (resultado / receita) * 100
    
    if percentual > 10:
        return "bom"
    else:
        return "alerta"


def classificar_folego_caixa(dias: float) -> str:
    """
    Classifica o fôlego de caixa
    
    Args:
        dias: Número de dias
    
    Returns:
        "bom" (verde) | "alerta" (amarelo) | "critico" (vermelho)
    """
    if dias >= 90:
        return "bom"
    elif dias >= 30:
        return "alerta"
    else:
        return "critico"


def classificar_liquidez_imediata(liquidez: float) -> str:
    """
    Classifica a liquidez imediata
    
    Args:
        liquidez: Índice de liquidez
    
    Returns:
        "bom" (verde) | "alerta" (amarelo) | "critico" (vermelho)
    """
    if liquidez >= 1.0:
        return "bom"
    elif liquidez >= 0.5:
        return "alerta"
    else:
        return "critico"


def classificar_ponto_equilibrio(ponto_equilibrio: float, receita_atual: float) -> str:
    """
    Classifica o ponto de equilíbrio
    
    Args:
        ponto_equilibrio: Valor em R$
        receita_atual: Receita atual em R$
    
    Returns:
        "bom" (verde) | "alerta" (amarelo) | "critico" (vermelho)
    """
    if receita_atual == 0 or ponto_equilibrio is None:
        return "critico"
    
    percentual = (ponto_equilibrio / receita_atual) * 100
    
    if percentual < 70:
        return "bom"
    elif percentual < 100:
        return "alerta"
    else:
        return "critico"
# ============= CÁLCULOS NÍVEL 2 =============

def calcular_dio(estoque: float, custo_mensal: float) -> Optional[float]:
    """
    DIO = Dias de Inventário = (Estoque / Custo Mensal) * 30
    
    Returns:
        Dias ou None se não aplicável
    """
    if custo_mensal == 0 or estoque == 0:
        return None
    
    return (estoque / custo_mensal) * 30


def calcular_ciclo_operacional(dio: Optional[float], dso: float) -> float:
    """
    Ciclo Operacional = DIO + DSO
    
    Args:
        dio: Dias de inventário (pode ser None)
        dso: Dias de recebimento
    """
    dio_valor = dio if dio is not None else 0
    return dio_valor + dso


def calcular_ciclo_financeiro(ciclo_operacional: float, dpo: float) -> float:
    """
    Ciclo Financeiro = Ciclo Operacional - DPO
    """
    return ciclo_operacional - dpo


def calcular_ncg_estimada(
    estoque: float,
    contas_a_receber: float,
    contas_a_pagar: float
) -> float:
    """
    Necessidade de Capital de Giro (NCG) = Estoque + A Receber - A Pagar
    
    Returns:
        Valor em R$
    """
    return estoque + contas_a_receber - contas_a_pagar


def calcular_alavancagem(dividas_totais: float, receita: float) -> float:
    """
    Alavancagem = Dívidas Totais / Receita
    
    Returns:
        Índice (quanto maior, mais alavancado)
    """
    if receita == 0:
        return 999.99  # Alavancagem "infinita"
    
    return dividas_totais / receita


def calcular_cobertura_juros(resultado_operacional: float, despesas_financeiras: float) -> Optional[float]:
    """
    Cobertura de Juros = Resultado Operacional / Despesas Financeiras
    
    Returns:
        Índice ou None se não houver despesas financeiras
    """
    if despesas_financeiras == 0:
        return None  # Não tem juros para cobrir
    
    return resultado_operacional / despesas_financeiras


def calcular_produtividade(receita: float, numero_funcionarios: int) -> Optional[float]:
    """
    Produtividade = Receita / Número de Funcionários
    
    Returns:
        Receita por funcionário (R$) ou None
    """
    if numero_funcionarios == 0:
        return None
    
    return receita / numero_funcionarios


def classificar_ciclo_financeiro(ciclo_financeiro: float) -> str:
    """
    Classifica o ciclo financeiro em verde/amarelo/vermelho
    """
    if ciclo_financeiro <= 10:
        return "verde"
    elif ciclo_financeiro <= 30:
        return "amarelo"
    else:
        return "vermelho"


def classificar_cobertura_juros(cobertura: Optional[float]) -> str:
    """
    Classifica a cobertura de juros
    """
    if cobertura is None:
        return "verde"  # Sem dívidas com juros
    
    if cobertura >= 3.0:
        return "verde"
    elif cobertura >= 1.5:
        return "amarelo"
    else:
        return "vermelho"


def simular_reducao_dso(
    receita_mensal: float,
    delta_dias: float,
    inadimplencia: float = 0.05
) -> float:
    """
    Simula quanto capital é liberado ao reduzir o DSO
    
    Args:
        receita_mensal: Receita do mês
        delta_dias: Quantos dias reduzir no DSO
        inadimplencia: Taxa de inadimplência estimada (default 5%)
    
    Returns:
        Capital liberado em R$
    """
    receita_diaria = receita_mensal / 30
    caixa_liberado = receita_diaria * delta_dias * (1 - inadimplencia)
    return caixa_liberado


def simular_aumento_dpo(custo_mensal: float, delta_dias: float) -> float:
    """
    Simula quanto capital é liberado ao aumentar o DPO
    
    Args:
        custo_mensal: Custo mensal
        delta_dias: Quantos dias aumentar no DPO
    
    Returns:
        Capital liberado em R$
    """
    custo_diario = custo_mensal / 30
    caixa_liberado = custo_diario * delta_dias
    return caixa_liberado


# ============= CÁLCULOS NÍVEL 3 =============

def calcular_tendencia_receita(receitas_ultimos_3_meses: List[float]) -> Dict[str, float]:
    """
    Calcula a tendência de crescimento das receitas
    
    Returns:
        {
            "media": média das receitas,
            "variacao_percentual_media": variação média entre meses,
            "tendencia": "crescimento", "estabilidade" ou "queda"
        }
    """
    if len(receitas_ultimos_3_meses) < 2:
        return {
            "media": receitas_ultimos_3_meses[0] if receitas_ultimos_3_meses else 0,
            "variacao_percentual_media": 0,
            "tendencia": "estabilidade"
        }
    
    media = statistics.mean(receitas_ultimos_3_meses)
    
    # Calcular variações mês a mês
    variacoes = []
    for i in range(1, len(receitas_ultimos_3_meses)):
        if receitas_ultimos_3_meses[i-1] > 0:
            variacao = ((receitas_ultimos_3_meses[i] - receitas_ultimos_3_meses[i-1]) / 
                       receitas_ultimos_3_meses[i-1]) * 100
            variacoes.append(variacao)
    
    variacao_media = statistics.mean(variacoes) if variacoes else 0
    
    # Determinar tendência
    if variacao_media > 2:
        tendencia = "crescimento"
    elif variacao_media < -2:
        tendencia = "queda"
    else:
        tendencia = "estabilidade"
    
    return {
        "media": media,
        "variacao_percentual_media": variacao_media,
        "tendencia": tendencia
    }


def projetar_cenarios(
    receita_base: float,
    custo_base: float,
    despesas_fixas: float,
    despesas_variaveis_percentual: float,
    impostos_mensais: float,
    despesas_financeiras: float,
    dso_atual: float,
    dpo_atual: float,
    caixa_inicial: float,
    meta_margem_bruta: float,
    num_meses: int = 6
) -> Dict[str, List[Dict]]:
    """
    Projeta 3 cenários (Otimista, Neutro, Pessimista) para os próximos meses
    
    Returns:
        {
            "otimista": [...],
            "neutro": [...],
            "pessimista": [...]
        }
    """
    
    # Definir parâmetros dos cenários
    cenarios_params = {
        "otimista": {
            "crescimento_receita": 0.08,  # +8% ao mês
            "delta_dso": -10,  # melhora 10 dias
            "delta_dpo": 5,    # melhora 5 dias
            "margem_melhoria": meta_margem_bruta / 100
        },
        "neutro": {
            "crescimento_receita": 0.0,
            "delta_dso": 0,
            "delta_dpo": 0,
            "margem_melhoria": (custo_base / receita_base) if receita_base > 0 else 0.65
        },
        "pessimista": {
            "crescimento_receita": -0.10,  # -10% ao mês
            "delta_dso": 10,   # piora 10 dias
            "delta_dpo": -5,   # piora 5 dias
            "margem_melhoria": None  # Piora 2 p.p.
        }
    }
    
    resultados = {}
    
    for nome_cenario, params in cenarios_params.items():
        projecoes = []
        receita_proj = receita_base
        caixa_proj = caixa_inicial
        
        for mes in range(1, num_meses + 1):
            # Receita projetada
            receita_proj = receita_proj * (1 + params["crescimento_receita"])
            
            # Custo projetado
            if params["margem_melhoria"] is not None:
                custo_proj = receita_proj * (1 - params["margem_melhoria"])
            else:
                # Cenário pessimista: margem cai 2 p.p.
                margem_atual = (receita_base - custo_base) / receita_base if receita_base > 0 else 0.35
                nova_margem = max(0.05, margem_atual - 0.02)  # Não deixa ficar negativa
                custo_proj = receita_proj * (1 - nova_margem)
            
            # Despesas variáveis
            desp_variaveis = receita_proj * (despesas_variaveis_percentual / 100)
            
            # Margem bruta
            margem_bruta_proj = ((receita_proj - custo_proj) / receita_proj * 100) if receita_proj > 0 else 0
            
            # Resultado operacional
            resultado_op = receita_proj - custo_proj - despesas_fixas - desp_variaveis
            
            # Efeito dos prazos no caixa (simplificado)
            efeito_dso = simular_reducao_dso(receita_proj, params["delta_dso"])
            efeito_dpo = simular_aumento_dpo(custo_proj, params["delta_dpo"])
            
            # Caixa projetado
            caixa_proj = caixa_proj + resultado_op - impostos_mensais - despesas_financeiras
            
            # Aplicar efeito dos prazos apenas no primeiro mês (oneoff)
            if mes == 1:
                caixa_proj += efeito_dso + efeito_dpo
            
            projecoes.append({
                "mes": mes,
                "receita": round(receita_proj, 2),
                "custo": round(custo_proj, 2),
                "margem_bruta": round(margem_bruta_proj, 2),
                "resultado_operacional": round(resultado_op, 2),
                "caixa": round(caixa_proj, 2)
            })
        
        resultados[nome_cenario] = projecoes
    
    return resultados


def calcular_roa(resultado_operacional_mensal: float, ativos_totais: float) -> Optional[float]:
    """
    ROA = Resultado Operacional Anualizado / Ativos Totais
    
    Returns:
        Percentual ou None
    """
    if ativos_totais == 0:
        return None
    
    resultado_anualizado = resultado_operacional_mensal * 12
    return (resultado_anualizado / ativos_totais) * 100


def calcular_roe(
    resultado_operacional_mensal: float,
    despesas_financeiras: float,
    impostos: float,
    patrimonio_liquido: float
) -> Optional[float]:
    """
    ROE = Resultado Líquido Anualizado / Patrimônio Líquido
    
    Returns:
        Percentual ou None
    """
    if patrimonio_liquido == 0:
        return None
    
    resultado_liquido_mensal = resultado_operacional_mensal - despesas_financeiras - impostos
    resultado_liquido_anualizado = resultado_liquido_mensal * 12
    
    return (resultado_liquido_anualizado / patrimonio_liquido) * 100


def calcular_payback_capex(capex: float, incremento_lucro_anual: float) -> Optional[float]:
    """
    Payback = CAPEX / Incremento de Lucro Anual
    
    Returns:
        Anos ou None
    """
    if incremento_lucro_anual <= 0 or capex == 0:
        return None
    
    return capex / incremento_lucro_anual


# ============= FUNÇÕES AUXILIARES =============

def formatar_moeda(valor: float) -> str:
    """Formata valor para moeda brasileira"""
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def formatar_percentual(valor: float) -> str:
    """Formata valor como percentual"""
    return f"{valor:.1f}%"


def formatar_numero(valor: float, casas_decimais: int = 2) -> str:
    """Formata número com separadores"""
    return f"{valor:,.{casas_decimais}f}".replace(",", "X").replace(".", ",").replace("X", ".")