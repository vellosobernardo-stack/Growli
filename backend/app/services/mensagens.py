"""
Mensagens - Gera mensagens automáticas personalizadas baseadas nos cálculos
"""
from typing import Dict, List, Optional


from app.services.formatadores import formatar_moeda_br, formatar_numero_br, formatar_percentual_br


def gerar_mensagem_nivel1(kpis: Dict) -> str:
    """
    Gera mensagem automática do Nível 1 baseada nos KPIs
    """
    margem_bruta = kpis.get("margem_bruta", 0)
    resultado_operacional = kpis.get("resultado_operacional", 0)
    ponto_equilibrio = kpis.get("ponto_equilibrio")
    liquidez_imediata = kpis.get("liquidez_imediata", 0)
    folego_caixa = kpis.get("folego_caixa", 0)
    receita = kpis.get("receita_bruta", 0)
    despesas_fixas = kpis.get("despesas_fixas", 0)
    
    mensagens = []
    
    # 1. Margem Bruta
    sobra_por_100 = margem_bruta
    mensagens.append(
        f"Sua margem bruta é de {formatar_percentual_br(margem_bruta)}. "
        f"Isso significa que a cada R$ 100 vendidos, sobram R$ {formatar_numero_br(sobra_por_100)} "
        f"antes de pagar as despesas fixas."
    )
    
    # 2. Resultado Operacional e Ponto de Equilíbrio
    if resultado_operacional >= 0:
        mensagens.append(
            f"O resultado operacional foi positivo em {formatar_moeda_br(abs(resultado_operacional))}. "
            f"Com despesas fixas de {formatar_moeda_br(despesas_fixas)}, "
        )
    else:
        mensagens.append(
            f"O resultado operacional foi negativo em {formatar_moeda_br(abs(resultado_operacional))}. "
            f"Suas despesas fixas ({formatar_moeda_br(despesas_fixas)}) estão consumindo todo o lucro bruto. "
        )
    
    if ponto_equilibrio:
        mensagens.append(
            f"seu ponto de equilíbrio está em {formatar_moeda_br(ponto_equilibrio)} de receita mensal."
        )
    else:
        mensagens.append(
            "não foi possível calcular o ponto de equilíbrio (verifique se a margem bruta é positiva)."
        )
    
    # 3. Liquidez e Fôlego de Caixa
    if liquidez_imediata >= 1.0:
        status_liquidez = "em situação adequada"
    elif liquidez_imediata >= 0.6:
        status_liquidez = "em atenção"
    else:
        status_liquidez = "em situação crítica"
    
    mensagens.append(
        f"Seu fôlego de caixa é de {formatar_numero_br(folego_caixa, 0)} dias e sua liquidez imediata é {formatar_numero_br(liquidez_imediata)}. "
        f"O ideal é liquidez maior ou igual a 1,0. Você está {status_liquidez}."
    )
    
    return " ".join(mensagens)


def gerar_convite_nivel2() -> str:
    """Convite para avançar ao Nível 2"""
    return (
        "Deseja entender por que o caixa aperta e quanto capital de giro você precisa para operar com folga? "
        "Avance para o Nível 2 e descubra como melhorar seus prazos pode liberar milhares de reais."
    )


def gerar_mensagem_nivel2(kpis: Dict) -> str:
    """
    Gera mensagem automática do Nível 2
    """
    ciclo_financeiro = kpis.get("ciclo_financeiro", 0)
    dso = kpis.get("dso", 0)
    dio = kpis.get("dio", 0)
    dpo = kpis.get("dpo", 0)
    ncg = kpis.get("ncg_estimada", 0)
    cobertura_juros = kpis.get("cobertura_juros")
    simulacao_dso = kpis.get("simulacao_reducao_dso", 0)
    simulacao_dpo = kpis.get("simulacao_aumento_dpo", 0)
    
    mensagens = []
    
    # 1. Ciclo Financeiro (sem mostrar o cálculo)
    mensagens.append(
        f"Seu ciclo financeiro é de {formatar_numero_br(ciclo_financeiro, 0)} dias. "
    )
    
    distancia_ideal = ciclo_financeiro - 10
    if distancia_ideal <= 0:
        mensagens.append("Excelente! Você está operando abaixo do ideal de 10 dias.")
    else:
        mensagens.append(
            f"O ideal é no máximo 10 dias. Você está a {formatar_numero_br(distancia_ideal, 0)} dias do objetivo."
        )
    
    # Composição do ciclo (sem abreviações)
    if dio and dio > 0:
        mensagens.append(
            f"Esse ciclo é composto por: {formatar_numero_br(dso, 0)} dias de prazo médio de recebimento, "
            f"{formatar_numero_br(dio, 0)} dias de prazo médio de estoque, "
            f"menos {formatar_numero_br(dpo, 0)} dias de prazo médio de pagamento a fornecedores."
        )
    else:
        mensagens.append(
            f"Esse ciclo considera {formatar_numero_br(dso, 0)} dias de prazo médio de recebimento "
            f"e {formatar_numero_br(dpo, 0)} dias de prazo médio de pagamento a fornecedores."
        )
    
    # 2. NCG e Simulações
    mensagens.append(
        f"A Necessidade de Capital de Giro é de {formatar_moeda_br(ncg)}. "
    )
    
    if simulacao_dso > 0:
        mensagens.append(
            f"Se você reduzir o prazo de recebimento em 10 dias, pode liberar cerca de {formatar_moeda_br(simulacao_dso)} no caixa. "
        )
    
    if simulacao_dpo > 0:
        mensagens.append(
            f"Se negociar com fornecedores e aumentar o prazo de pagamento em 7 dias, libera aproximadamente {formatar_moeda_br(simulacao_dpo)}."
        )
    
    # 3. Cobertura de Juros
    if cobertura_juros is not None:
        if cobertura_juros >= 3.0:
            status_juros = "adequada"
        elif cobertura_juros >= 1.5:
            status_juros = "em atenção"
        else:
            status_juros = "crítica"
        
        mensagens.append(
            f"Sua cobertura de juros é {formatar_numero_br(cobertura_juros)}x. "
            f"O ideal é no mínimo 3,0x. Situação: {status_juros}."
        )
    else:
        mensagens.append(
            "Você não possui despesas financeiras significativas, o que é positivo para a saúde financeira."
        )
    
    return " ".join(mensagens)


def gerar_convite_nivel3() -> str:
    """Convite para avançar ao Nível 3"""
    return (
        "Quer transformar esse diagnóstico em metas e projeções de curto prazo? "
        "Avance para o Nível 3 e receba projeções em 3 cenários (Otimista, Neutro, Pessimista) "
        "mais um plano de ação 30-60-90 dias personalizado."
    )


def gerar_mensagem_nivel3(kpis: Dict, tendencia: Dict) -> str:
    """
    Gera mensagem automática do Nível 3
    """
    roa = kpis.get("roa")
    roe = kpis.get("roe")
    payback = kpis.get("payback_capex")
    
    mensagens = []
    
    # 1. Tendência de receita
    var_media = tendencia.get("variacao_percentual_media", 0)
    tend = tendencia.get("tendencia", "estabilidade")
    
    if tend == "crescimento":
        mensagens.append(
            f"Suas receitas estão em crescimento, com variação média de {formatar_percentual_br(var_media, 1)} ao mês. "
            "Isso é um sinal positivo de tração no mercado."
        )
    elif tend == "queda":
        mensagens.append(
            f"Suas receitas apresentam queda de {formatar_percentual_br(abs(var_media), 1)} ao mês em média. "
            "É fundamental reverter essa tendência através de ações comerciais e de retenção."
        )
    else:
        mensagens.append(
            "Suas receitas estão estáveis nos últimos 3 meses. "
            "Considere estratégias de crescimento para expandir o negócio."
        )
    
    # 2. ROA e ROE
    if roa is not None:
        mensagens.append(
            f"Seu ROA (Retorno sobre Ativos) está em {formatar_percentual_br(roa)} ao ano, "
            f"indicando {'boa' if roa >= 10 else 'baixa'} rentabilidade dos ativos investidos."
        )
    
    if roe is not None:
        mensagens.append(
            f"O ROE (Retorno sobre Patrimônio) é de {formatar_percentual_br(roe)} ao ano, "
            f"mostrando {'excelente' if roe >= 15 else 'moderado' if roe >= 8 else 'baixo'} retorno aos sócios."
        )
    
    # 3. CAPEX
    if payback is not None and payback > 0:
        mensagens.append(
            f"O payback estimado do investimento planejado é de {formatar_numero_br(payback, 1)} anos. "
            f"{'Investimento atrativo' if payback <= 3 else 'Requer análise mais detalhada'}."
        )
    
    return " ".join(mensagens)

def gerar_diagnostico_final(todos_kpis: Dict) -> List[str]:
    """
    Gera diagnóstico final (3-5 frases principais)
    """
    diagnostico = []
    
    nivel1 = todos_kpis.get("nivel1", {})
    nivel2 = todos_kpis.get("nivel2", {})
    nivel3 = todos_kpis.get("nivel3", {})
    
    # Análise de margem
    margem = nivel1.get("margem_bruta", 0)
    if margem >= 30:
        diagnostico.append(f"Margem bruta saudável de {margem:.1f}%, indicando bom controle de custos.")
    elif margem >= 20:
        diagnostico.append(f"Margem bruta de {margem:.1f}% está adequada, mas há espaço para otimização.")
    else:
        diagnostico.append(f"Margem bruta crítica de {margem:.1f}% - priorize revisão de preços e custos.")
    
    # Análise de caixa
    folego = nivel1.get("folego_caixa", 0)
    if folego >= 30:
        diagnostico.append(f"Fôlego de caixa confortável ({folego:.0f} dias).")
    elif folego >= 10:
        diagnostico.append(f"Fôlego de caixa moderado ({folego:.0f} dias) - mantenha atenção.")
    else:
        diagnostico.append(f"Fôlego de caixa crítico ({folego:.0f} dias) - priorize geração de caixa.")
    
    # Análise de ciclo financeiro
    if nivel2:
        ciclo = nivel2.get("ciclo_financeiro", 0)
        if ciclo <= 10:
            diagnostico.append("Ciclo financeiro otimizado, capital de giro bem gerido.")
        elif ciclo <= 30:
            diagnostico.append(f"Ciclo financeiro de {ciclo:.0f} dias indica oportunidade de melhoria nos prazos.")
        else:
            diagnostico.append(f"Ciclo financeiro elevado ({ciclo:.0f} dias) exige capital de giro significativo.")
    
    # Análise de endividamento
    if nivel2:
        cobertura = nivel2.get("cobertura_juros")
        if cobertura and cobertura < 2.0:
            diagnostico.append("Cobertura de juros preocupante - renegocie dívidas ou reduza custos.")
        elif cobertura and cobertura >= 3.0:
            diagnostico.append("Boa capacidade de honrar compromissos financeiros.")
    
    # Análise de tendência
    if nivel3:
        tend = nivel3.get("tendencia", "estabilidade")
        if tend == "crescimento":
            diagnostico.append("Empresa em trajetória de crescimento - invista em capacidade e controles.")
        elif tend == "queda":
            diagnostico.append("Receitas em queda - ações comerciais urgentes são necessárias.")
    
    return diagnostico[:5]  # Máximo 5 frases


def gerar_oportunidades(kpis_nivel2: Dict, receita: float) -> List[Dict]:
    """
    Gera lista de oportunidades de melhoria com impacto estimado
    """
    oportunidades = []
    
    # Oportunidade 1: Redução de DSO
    simulacao_dso = kpis_nivel2.get("simulacao_reducao_dso", 0)
    if simulacao_dso > 0:
        impacto_percentual = (simulacao_dso / receita * 100) if receita > 0 else 0
        oportunidades.append({
            "descricao": "Reduzir o prazo médio de recebimento (DSO) em 10 dias",
            "impacto_r": round(simulacao_dso, 2),
            "impacto_percentual": round(impacto_percentual, 2),
            "acao": "Implementar cobrança proativa, oferecer descontos para pagamento antecipado"
        })
    
    # Oportunidade 2: Aumento de DPO
    simulacao_dpo = kpis_nivel2.get("simulacao_aumento_dpo", 0)
    if simulacao_dpo > 0:
        impacto_percentual = (simulacao_dpo / receita * 100) if receita > 0 else 0
        oportunidades.append({
            "descricao": "Negociar aumento do prazo de pagamento (DPO) em 7 dias",
            "impacto_r": round(simulacao_dpo, 2),
            "impacto_percentual": round(impacto_percentual, 2),
            "acao": "Renegociar com fornecedores principais, consolidar compras"
        })
    
    # Oportunidade 3: Melhoria de margem
    margem_atual = kpis_nivel2.get("margem_bruta", 0)
    if margem_atual < 30:
        ganho_1pp = receita * 0.01  # 1 ponto percentual
        oportunidades.append({
            "descricao": "Aumentar margem bruta em 1 ponto percentual",
            "impacto_r": round(ganho_1pp, 2),
            "impacto_percentual": 1.0,
            "acao": "Revisar preços, negociar custos, eliminar produtos de baixa margem"
        })
    
    return oportunidades


def gerar_plano_30_60_90(kpis: Dict) -> Dict[str, List[str]]:
    """
    Gera plano de ação 30-60-90 dias (VERSÃO ANTIGA - strings simples)
    Mantida para compatibilidade
    """
    plano = {
        "30_dias": [
            "Implementar rotina diária de cobrança de recebíveis vencidos",
            "Renegociar dívidas de curto prazo com taxas elevadas",
            "Realizar inventário completo e identificar produtos de baixo giro",
            "Mapear despesas fixas e identificar 3 itens para renegociar"
        ],
        "60_dias": [
            "Revisar política de crédito e implementar análise de clientes novos",
            "Testar aumento de preços em 3-5% nos produtos de maior margem",
            "Negociar prazos de pagamento com 3 maiores fornecedores",
            "Implementar controle de caixa semanal automatizado"
        ],
        "90_dias": [
            "Reduzir estoque parado em 20% através de promoções direcionadas",
            "Buscar linha de capital de giro com taxa inferior a 1,5% ao mês",
            "Avaliar CAPEX para automação ou expansão com payback < 12 meses",
            "Implementar dashboard gerencial com KPIs acompanhados semanalmente"
        ]
    }
    
    # Personalizar baseado em situação crítica
    liquidez = kpis.get("nivel1", {}).get("liquidez_imediata", 1.0)
    if liquidez < 0.6:
        plano["30_dias"].insert(0, "URGENTE: Securitizar recebíveis ou buscar capital de curto prazo")
    
    ciclo = kpis.get("nivel2", {}).get("ciclo_financeiro", 0)
    if ciclo > 45:
        plano["60_dias"].insert(0, "Priorizar redução do ciclo financeiro - meta: -15 dias em 60 dias")
    
    return plano


# ============================================
# ✨ NOVA FUNÇÃO - PLANO ESTRUTURADO COM IA
# ============================================

def gerar_plano_30_60_90_inteligente(kpis: Dict) -> Dict[str, List[Dict]]:
    """
    Gera plano de ação 30-60-90 dias ESTRUTURADO (com objetos, não strings)
    Usa IA quando possível, fallback para plano padrão estruturado
    """
    try:
        # Tentar usar IA para gerar plano personalizado
        from app.services.plano_acao_generator import gerar_plano_acao_inteligente
        
        # Preparar indicadores
        nivel1 = kpis.get("nivel1", {})
        nivel2 = kpis.get("nivel2", {})
        nivel3 = kpis.get("nivel3", {})
        
        indicadores_dict = {
            'margem_bruta': nivel1.get('margem_bruta', 0),
            'liquidez_corrente': nivel1.get('liquidez_imediata', 0),
            'folego_caixa': nivel1.get('folego_caixa', 0),
            'prazo_medio_recebimento': nivel2.get('dso', 0) if nivel2 else 0,
            'prazo_medio_pagamento': nivel2.get('dpo', 0) if nivel2 else 0,
            'ciclo_caixa': nivel2.get('ciclo_financeiro', 0) if nivel2 else 0,
        }
        
        # Gerar diagnóstico simples
        diagnostico = []
        margem = nivel1.get('margem_bruta', 0)
        if margem < 20:
            diagnostico.append(f"Margem bruta crítica de {margem:.1f}%")
        elif margem < 30:
            diagnostico.append(f"Margem bruta moderada de {margem:.1f}%")
        else:
            diagnostico.append(f"Margem bruta saudável de {margem:.1f}%")
        
        # Gerar oportunidades simples
        oportunidades = []
        if nivel2:
            dso = nivel2.get('dso', 0)
            if dso > 30:
                oportunidades.append({
                    'descricao': f'Reduzir DSO de {dso:.0f} para 30 dias',
                    'impacto_r': 0,
                    'impacto_percentual': 0
                })
        
        # Chamar gerador inteligente
        plano = gerar_plano_acao_inteligente(
            indicadores=indicadores_dict,
            diagnostico=diagnostico,
            oportunidades=oportunidades
        )
        
        return plano
        
    except Exception as e:
        # Fallback: usar plano padrão estruturado
        print(f"Erro ao gerar plano inteligente, usando fallback: {e}")
        return gerar_plano_fallback_estruturado(kpis)


def gerar_plano_fallback_estruturado(kpis: Dict) -> Dict[str, List[Dict]]:
    """
    Plano padrão estruturado (objetos, não strings) - usado como fallback
    """
    plano_base = {
        "30_dias": [
            {
                "titulo": "Revisar Política de Cobrança",
                "descricao": "Implementar régua de cobrança com contato a cada 3 dias e oferecer 2% de desconto para pagamentos antecipados em até 10 dias.",
                "resultado_esperado": "Reduzir prazo médio de recebimento em 10 dias e liberar capital de giro",
                "prioridade": "Alta"
            },
            {
                "titulo": "Negociar Prazos com Fornecedores",
                "descricao": "Conversar com os 5 principais fornecedores para estender prazo de pagamento de 30 para 45 dias mantendo descontos por volume.",
                "resultado_esperado": "Melhorar ciclo de caixa em 15 dias e reduzir pressão sobre capital de giro",
                "prioridade": "Alta"
            },
            {
                "titulo": "Mapear Custos Variáveis",
                "descricao": "Levantar todos os custos ligados às vendas (comissões, frete, taxas) e identificar 3 oportunidades de redução imediata.",
                "resultado_esperado": "Reduzir custos variáveis em 5-8% e melhorar margem bruta",
                "prioridade": "Média"
            },
            {
                "titulo": "Implementar Controle Diário de Caixa",
                "descricao": "Criar rotina de fechamento diário com projeção de 7 dias e alertas automáticos para desvios maiores que 10%.",
                "resultado_esperado": "Aumentar previsibilidade de caixa e permitir decisões mais rápidas",
                "prioridade": "Alta"
            }
        ],
        "60_dias": [
            {
                "titulo": "Implementar Dashboard de KPIs",
                "descricao": "Automatizar cálculo semanal dos 10 principais indicadores financeiros com alertas visuais por e-mail toda segunda-feira.",
                "resultado_esperado": "Reduzir tempo de análise de 4h para 30min por semana",
                "prioridade": "Alta"
            },
            {
                "titulo": "Otimizar Giro de Estoque",
                "descricao": "Aplicar curva ABC, fazer promoção agressiva de itens parados há mais de 30 dias e ajustar ponto de pedido dos itens A.",
                "resultado_esperado": "Aumentar giro de estoque em 20% e liberar capital preso",
                "prioridade": "Média"
            },
            {
                "titulo": "Avaliar Rentabilidade por Canal",
                "descricao": "Calcular margem real de cada canal de venda (online, loja, marketplace) descontando TODOS os custos específicos.",
                "resultado_esperado": "Identificar canal com 30%+ de margem para concentrar esforços comerciais",
                "prioridade": "Alta"
            },
            {
                "titulo": "Revisar Despesas Fixas",
                "descricao": "Renegociar ou trocar fornecedores de serviços recorrentes (aluguel, energia, telefone, software, seguros).",
                "resultado_esperado": "Economizar 10-15% em despesas fixas mensais",
                "prioridade": "Média"
            }
        ],
        "90_dias": [
            {
                "titulo": "Estruturar Captação de Capital",
                "descricao": "Preparar demonstrativo financeiro completo dos últimos 12 meses e buscar investidor-anjo ou linha de crédito estratégica.",
                "resultado_esperado": "Captar capital para crescimento mantendo ROE acima de 15%",
                "prioridade": "Alta"
            },
            {
                "titulo": "Criar Reserva de Emergência",
                "descricao": "Separar 10% do lucro líquido mensal em conta exclusiva até atingir reserva equivalente a 3 meses de despesas fixas.",
                "resultado_esperado": "Garantir fôlego de caixa de 90 dias para imprevistos",
                "prioridade": "Alta"
            },
            {
                "titulo": "Desenvolver Plano de Crescimento",
                "descricao": "Definir metas de receita por canal para os próximos 12 meses com base em dados históricos e benchmarks do setor.",
                "resultado_esperado": "Estruturar crescimento de 20-30% anualizado de forma sustentável",
                "prioridade": "Média"
            },
            {
                "titulo": "Treinar Equipe em Gestão",
                "descricao": "Capacitar 3 pessoas-chave para entender os KPIs do negócio e propor melhorias mensalmente em reunião estruturada.",
                "resultado_esperado": "Reduzir dependência do gestor em 40% e aumentar engajamento",
                "prioridade": "Baixa"
            }
        ]
    }
    
    # Personalizar baseado em situação crítica
    nivel1 = kpis.get("nivel1", {})
    nivel2 = kpis.get("nivel2", {})
    
    liquidez = nivel1.get("liquidez_imediata", 1.0)
    if liquidez < 0.6:
        plano_base["30_dias"][0]["prioridade"] = "Alta"
        plano_base["30_dias"][0]["descricao"] = "URGENTE: " + plano_base["30_dias"][0]["descricao"]
    
    if nivel2:
        ciclo = nivel2.get("ciclo_financeiro", 0)
        if ciclo > 45:
            plano_base["60_dias"][1]["prioridade"] = "Alta"
    
    return plano_base