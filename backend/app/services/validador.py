"""
Validador - Aplica defaults e valida dados
"""
from typing import Dict, List, Tuple


# Defaults de prazo por setor (DSO, DPO em dias)
DEFAULTS_PRAZOS = {
    "agricultura": {"dso": 45, "dpo": 30},
    "pecuaria": {"dso": 45, "dpo": 30},
    "extrativas": {"dso": 60, "dpo": 45},
    "transformacao": {"dso": 45, "dpo": 35},
    "eletricidade_gas": {"dso": 30, "dpo": 30},
    "agua_residuos": {"dso": 30, "dpo": 30},
    "construcao": {"dso": 60, "dpo": 45},
    "comercio_veiculos": {"dso": 30, "dpo": 30},
    "transporte": {"dso": 30, "dpo": 20},
    "alojamento_alimentacao": {"dso": 15, "dpo": 20},
    "informacao_comunicacao": {"dso": 20, "dpo": 15},
    "financeiras": {"dso": 30, "dpo": 15},
    "imobiliarias": {"dso": 45, "dpo": 30},
    "profissionais": {"dso": 20, "dpo": 15},
    "administrativas": {"dso": 30, "dpo": 20},
    "administracao_publica": {"dso": 60, "dpo": 30},
    "educacao": {"dso": 30, "dpo": 20},
    "saude": {"dso": 30, "dpo": 20},
    "artes_cultura": {"dso": 30, "dpo": 20},
    "outras_atividades": {"dso": 30, "dpo": 20},
    "servicos_domesticos": {"dso": 15, "dpo": 10},
}


def aplicar_defaults_nivel1(dados: dict, setor: str) -> Tuple[dict, List[str]]:
    """
    Aplica valores default para campos ausentes do Nível 1
    
    Args:
        dados: Dicionário com os dados do nível 1
        setor: Setor de atuação (valor do enum)
    
    Returns:
        (dados_completos, lista_de_assumptions)
    """
    assumptions = []
    
    # Se custo_vendas não informado, estima como 65% da receita
    if dados.get("custo_vendas_mensal") is None:
        receita = dados.get("receita_bruta_mensal", 0)
        dados["custo_vendas_mensal"] = receita * 0.65
        assumptions.append("Custo das vendas estimado em 65% da receita (padrão inicial)")
    
    # Se contas a receber não informadas, assume 0
    if dados.get("contas_a_receber_30d") is None:
        dados["contas_a_receber_30d"] = 0
        assumptions.append("Contas a receber não informadas - assumido R$ 0")
    
    # Se contas a pagar não informadas, assume 0
    if dados.get("contas_a_pagar_30d") is None:
        dados["contas_a_pagar_30d"] = 0
        assumptions.append("Contas a pagar não informadas - assumido R$ 0")
    
    return dados, assumptions


def aplicar_defaults_nivel2(dados: dict, setor: str) -> Tuple[dict, List[str]]:
    """
    Aplica valores default para campos ausentes do Nível 2
    
    Args:
        dados: Dicionário com os dados do nível 2
        setor: Setor de atuação (valor do enum)
    """
    assumptions = []
    
    # Busca defaults específicos do setor (já está em lowercase)
    default_setor = DEFAULTS_PRAZOS.get(setor, {"dso": 30, "dpo": 30})
    
    # Prazos médios por setor
    if dados.get("prazo_medio_recebimento_dias") is None:
        dados["prazo_medio_recebimento_dias"] = default_setor["dso"]
        assumptions.append(f"DSO estimado em {default_setor['dso']} dias (padrão para o setor)")
    
    if dados.get("prazo_medio_pagamento_dias") is None:
        dados["prazo_medio_pagamento_dias"] = default_setor["dpo"]
        assumptions.append(f"DPO estimado em {default_setor['dpo']} dias (padrão para o setor)")
    
    # Outros campos opcionais
    if dados.get("estoque_custo") is None:
        dados["estoque_custo"] = 0
        assumptions.append("Estoque não informado - assumido R$ 0")
    
    if dados.get("despesas_financeiras_mensais") is None:
        dados["despesas_financeiras_mensais"] = 0
    
    if dados.get("impostos_mensais") is None:
        dados["impostos_mensais"] = 0
    
    return dados, assumptions


def aplicar_defaults_nivel3(dados: dict) -> Tuple[dict, List[str]]:
    """
    Aplica valores default para campos ausentes do Nível 3
    """
    assumptions = []
    
    if dados.get("aliquota_impostos_percentual") is None:
        dados["aliquota_impostos_percentual"] = 10.0  # Simples Nacional médio
        assumptions.append("Alíquota de impostos estimada em 10% (média Simples Nacional)")
    
    if dados.get("despesas_variaveis_percentual_receita") is None:
        dados["despesas_variaveis_percentual_receita"] = 5.0
        assumptions.append("Despesas variáveis estimadas em 5% da receita")
    
    if dados.get("capex_planejado_prox_6m") is None:
        dados["capex_planejado_prox_6m"] = 0
    
    if dados.get("imobilizado") is None:
        dados["imobilizado"] = 0
    
    if dados.get("patrimonio_liquido") is None:
        dados["patrimonio_liquido"] = 0
    
    if dados.get("meta_prazo_recebimento_dias") is None:
        dados["meta_prazo_recebimento_dias"] = 15
        assumptions.append("Meta de DSO definida em 15 dias")
    
    return dados, assumptions


def validar_coerencia(dados_completos: dict) -> List[str]:
    """
    Valida coerência entre os dados (avisos, não erros)
    
    Returns:
        Lista de avisos
    """
    avisos = []
    
    nivel1 = dados_completos.get("nivel1", {})
    
    # Verifica se custo > receita (problema!)
    receita = nivel1.get("receita_bruta_mensal", 0)
    custo = nivel1.get("custo_vendas_mensal", 0)
    
    if receita > 0 and custo > receita:
        avisos.append("⚠️ Atenção: Custo das vendas maior que a receita - verifique os valores")
    
    # Verifica margem muito baixa
    if receita > 0:
        margem = (receita - custo) / receita * 100
        if margem < 10:
            avisos.append("⚠️ Margem bruta abaixo de 10% - situação crítica")
    
    return avisos