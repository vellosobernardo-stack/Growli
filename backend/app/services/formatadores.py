"""
Formatadores - Funções para formatar números no padrão brasileiro
"""

def formatar_moeda_br(valor: float) -> str:
    """
    Formata valor monetário no padrão brasileiro
    Ex: 10000.50 -> R$ 10.000,50
    """
    if valor < 0:
        sinal = "-"
        valor = abs(valor)
    else:
        sinal = ""
    
    # Separa parte inteira e decimal
    partes = f"{valor:.2f}".split('.')
    inteiro = partes[0]
    decimal = partes[1]
    
    # Adiciona pontos nos milhares
    inteiro_formatado = ""
    for i, digito in enumerate(reversed(inteiro)):
        if i > 0 and i % 3 == 0:
            inteiro_formatado = "." + inteiro_formatado
        inteiro_formatado = digito + inteiro_formatado
    
    return f"{sinal}R$ {inteiro_formatado},{decimal}"


def formatar_numero_br(valor: float, casas_decimais: int = 2) -> str:
    """
    Formata número no padrão brasileiro
    Ex: 10000.5 -> 10.000,50
    """
    if valor < 0:
        sinal = "-"
        valor = abs(valor)
    else:
        sinal = ""
    
    # Formata com casas decimais
    formato = f"{{:.{casas_decimais}f}}"
    partes = formato.format(valor).split('.')
    inteiro = partes[0]
    decimal = partes[1] if len(partes) > 1 else ""
    
    # Adiciona pontos nos milhares
    inteiro_formatado = ""
    for i, digito in enumerate(reversed(inteiro)):
        if i > 0 and i % 3 == 0:
            inteiro_formatado = "." + inteiro_formatado
        inteiro_formatado = digito + inteiro_formatado
    
    if decimal:
        return f"{sinal}{inteiro_formatado},{decimal}"
    else:
        return f"{sinal}{inteiro_formatado}"


def formatar_percentual_br(valor: float, casas_decimais: int = 1) -> str:
    """
    Formata percentual no padrão brasileiro
    Ex: 35.5 -> 35,5%
    """
    numero = formatar_numero_br(valor, casas_decimais)
    return f"{numero}%"