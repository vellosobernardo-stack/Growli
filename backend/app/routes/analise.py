"""
Rotas de Análise Financeira
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from app.models.schemas import (
    AnaliseRequest, 
    AnaliseResponse, 
    ResultadoNivel,
    DiagnosticoEstrategia,
    KPI,
    GraficoBarras,
    GraficoLinha,
    Tabela
)
from app.services.validador import (
    aplicar_defaults_nivel1,
    aplicar_defaults_nivel2,
    aplicar_defaults_nivel3,
    validar_coerencia
)
from app.services.financial_calc import (
    # Nível 1
    calcular_margem_bruta,
    calcular_resultado_operacional,
    calcular_ponto_equilibrio,
    calcular_liquidez_imediata,
    calcular_folego_caixa,
    classificar_liquidez,
    # Nível 2
    calcular_dio,
    calcular_ciclo_operacional,
    calcular_ciclo_financeiro,
    calcular_ncg_estimada,
    calcular_alavancagem,
    calcular_cobertura_juros,
    calcular_produtividade,
    classificar_ciclo_financeiro,
    classificar_cobertura_juros,
    simular_reducao_dso,
    simular_aumento_dpo,
    # Nível 3
    calcular_tendencia_receita,
    projetar_cenarios,
    calcular_roa,
    calcular_roe,
    calcular_payback_capex,
)
from app.services.mensagens import (
    gerar_mensagem_nivel1,
    gerar_convite_nivel2,
    gerar_mensagem_nivel2,
    gerar_convite_nivel3,
    gerar_mensagem_nivel3,
    gerar_diagnostico_final,
    gerar_oportunidades,
    gerar_plano_30_60_90
)


router = APIRouter()


@router.post("/analise", response_model=AnaliseResponse)
async def processar_analise(request: AnaliseRequest):
    """
    Endpoint principal de análise financeira
    
    Recebe dados dos níveis preenchidos e retorna análise completa
    """
    try:
        # Extrair dados
        meta = request.meta.dict()
        setor = meta["setor"]
        nivel_maximo = meta["nivel_maximo_preenchido"]
        
        # Armazenar assumptions globais
        all_assumptions = []
        
        # ========== PROCESSAR NÍVEL 1 ==========
        dados_n1 = request.nivel1.dict()
        dados_n1, assumptions_n1 = aplicar_defaults_nivel1(dados_n1, setor)
        all_assumptions.extend(assumptions_n1)
        
        # Cálculos Nível 1
        disponibilidades = dados_n1["caixa"] + dados_n1["conta_corrente"]
        
        kpis_n1 = {
            "receita_bruta": dados_n1["receita_bruta_mensal"],
            "despesas_fixas": dados_n1["despesas_fixas_mensais"],
            "margem_bruta": calcular_margem_bruta(
                dados_n1["receita_bruta_mensal"],
                dados_n1["custo_vendas_mensal"]
            ),
            "resultado_operacional": calcular_resultado_operacional(
                dados_n1["receita_bruta_mensal"],
                dados_n1["custo_vendas_mensal"],
                dados_n1["despesas_fixas_mensais"]
            ),
            "ponto_equilibrio": calcular_ponto_equilibrio(
                dados_n1["despesas_fixas_mensais"],
                dados_n1["receita_bruta_mensal"],
                dados_n1["custo_vendas_mensal"]
            ),
            "liquidez_imediata": calcular_liquidez_imediata(
                disponibilidades,
                dados_n1["contas_a_pagar_30d"]
            ),
            "folego_caixa": calcular_folego_caixa(
                disponibilidades,
                dados_n1["contas_a_receber_30d"],
                dados_n1["contas_a_pagar_30d"],
                dados_n1["despesas_fixas_mensais"]
            )
        }
        
        # Montar resultado Nível 1
        resultado_n1 = montar_resultado_nivel1(kpis_n1, dados_n1, all_assumptions)
        
        # Inicializar resposta
        response_data = {
            "nivel1": resultado_n1,
            "nivel2": None,
            "nivel3": None,
            "diagnostico_estrategia": None,
            "status_validacao": {
                "assumptions": all_assumptions,
                "avisos": validar_coerencia({"nivel1": dados_n1})
            }
        }
        
        # ========== PROCESSAR NÍVEL 2 (se aplicável) ==========
        if nivel_maximo >= 2 and request.nivel2:
            dados_n2 = request.nivel2.dict()
            dados_n2, assumptions_n2 = aplicar_defaults_nivel2(dados_n2, setor)
            all_assumptions.extend(assumptions_n2)
            
            # Cálculos Nível 2
            dio = calcular_dio(dados_n2["estoque_custo"], dados_n1["custo_vendas_mensal"])
            ciclo_op = calcular_ciclo_operacional(dio, dados_n2["prazo_medio_recebimento_dias"])
            ciclo_fin = calcular_ciclo_financeiro(ciclo_op, dados_n2["prazo_medio_pagamento_dias"])
            
            kpis_n2 = {
                **kpis_n1,  # Inclui KPIs do nível 1
                "dso": dados_n2["prazo_medio_recebimento_dias"],
                "dpo": dados_n2["prazo_medio_pagamento_dias"],
                "dio": dio,
                "ciclo_operacional": ciclo_op,
                "ciclo_financeiro": ciclo_fin,
                "ncg_estimada": calcular_ncg_estimada(
                    dados_n2["estoque_custo"],
                    dados_n1["contas_a_receber_30d"],
                    dados_n1["contas_a_pagar_30d"]
                ),
                "alavancagem": calcular_alavancagem(
                    dados_n2["dividas_totais"],
                    dados_n1["receita_bruta_mensal"]
                ),
                "cobertura_juros": calcular_cobertura_juros(
                    kpis_n1["resultado_operacional"],
                    dados_n2["despesas_financeiras_mensais"]
                ),
                "produtividade": calcular_produtividade(
                    dados_n1["receita_bruta_mensal"],
                    dados_n2["numero_funcionarios"]
                ) if dados_n2["numero_funcionarios"] else None,
                "simulacao_reducao_dso": simular_reducao_dso(
                    dados_n1["receita_bruta_mensal"], 10
                ),
                "simulacao_aumento_dpo": simular_aumento_dpo(
                    dados_n1["custo_vendas_mensal"], 7
                )
            }
            
            response_data["nivel2"] = montar_resultado_nivel2(kpis_n2, all_assumptions)
        
        # ========== PROCESSAR NÍVEL 3 (se aplicável) ==========
        if nivel_maximo >= 3 and request.nivel3:
            dados_n3 = request.nivel3.dict()
            dados_n3, assumptions_n3 = aplicar_defaults_nivel3(dados_n3)
            all_assumptions.extend(assumptions_n3)
            
            # Cálculos Nível 3
            tendencia = calcular_tendencia_receita(dados_n3["receita_ultimos_3_meses"])
            
            # Preparar dados para projeção
            dados_n2 = request.nivel2.dict() if request.nivel2 else {}
            projecoes = projetar_cenarios(
                receita_base=dados_n1["receita_bruta_mensal"],
                custo_base=dados_n1["custo_vendas_mensal"],
                despesas_fixas=dados_n1["despesas_fixas_mensais"],
                despesas_variaveis_percentual=dados_n3["despesas_variaveis_percentual_receita"],
                impostos_mensais=dados_n2.get("impostos_mensais", 0),
                despesas_financeiras=dados_n2.get("despesas_financeiras_mensais", 0),
                dso_atual=dados_n2.get("prazo_medio_recebimento_dias", 30),
                dpo_atual=dados_n2.get("prazo_medio_pagamento_dias", 30),
                caixa_inicial=disponibilidades,
                meta_margem_bruta=dados_n3["meta_margem_bruta_percentual"],
                num_meses=6
            )
            
            # Calcular ROA, ROE, Payback
            ativos_totais = dados_n3["imobilizado"]
            if request.nivel2:
                ativos_totais += kpis_n2.get("ncg_estimada", 0)
            
            # Determinar base de KPIs (corrigido o erro de sintaxe)
            kpis_base = kpis_n2 if request.nivel2 else kpis_n1
            
            kpis_n3 = {
                **kpis_base,  # Agora funciona sem erro de sintaxe
                "tendencia": tendencia["tendencia"],
                "variacao_media": tendencia["variacao_percentual_media"],
                "projecoes": projecoes,
                "roa": calcular_roa(kpis_n1["resultado_operacional"], ativos_totais) if ativos_totais > 0 else None,
                "roe": calcular_roe(
                    kpis_n1["resultado_operacional"],
                    dados_n2.get("despesas_financeiras_mensais", 0) if request.nivel2 else 0,
                    dados_n2.get("impostos_mensais", 0) if request.nivel2 else 0,
                    dados_n3["patrimonio_liquido"]
                ) if dados_n3["patrimonio_liquido"] and dados_n3["patrimonio_liquido"] != 0 else None,
                "payback_capex": calcular_payback_capex(
                    dados_n3["capex_planejado_prox_6m"],
                    kpis_n1["resultado_operacional"] * 12 * 0.1
                ) if dados_n3["capex_planejado_prox_6m"] > 0 else None
            }
            
            response_data["nivel3"] = montar_resultado_nivel3(kpis_n3, tendencia, all_assumptions)
            
            # Diagnóstico e Estratégia (só no nível 3)
            kpis_completos = {
                "nivel1": kpis_n1,
                "nivel2": kpis_n2 if request.nivel2 else {},
                "nivel3": kpis_n3
            }
            
            response_data["diagnostico_estrategia"] = DiagnosticoEstrategia(
                diagnostico=gerar_diagnostico_final(kpis_completos),
                oportunidades=gerar_oportunidades(kpis_n2 if request.nivel2 else {}, dados_n1["receita_bruta_mensal"]),
                plano_30_60_90=gerar_plano_30_60_90(kpis_completos)
            )
        
        # Atualizar status de validação
        response_data["status_validacao"]["assumptions"] = all_assumptions
        
        return AnaliseResponse(**response_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar análise: {str(e)}")


def montar_resultado_nivel1(kpis: Dict, dados: Dict, assumptions: list) -> ResultadoNivel:
    """Monta o resultado formatado do Nível 1"""
    
    kpis_lista = [
        KPI(
            nome="Margem Bruta",
            valor=kpis["margem_bruta"],
            formato="percentual",
            classificacao="verde" if kpis["margem_bruta"] >= 30 else "amarelo" if kpis["margem_bruta"] >= 20 else "vermelho"
        ),
        KPI(
            nome="Resultado Operacional",
            valor=kpis["resultado_operacional"],
            formato="moeda",
            classificacao="verde" if kpis["resultado_operacional"] > 0 else "vermelho"
        ),
        KPI(
            nome="Fôlego de Caixa",
            valor=kpis["folego_caixa"],
            formato="dias",
            classificacao="verde" if kpis["folego_caixa"] >= 30 else "amarelo" if kpis["folego_caixa"] >= 10 else "vermelho"
        ),
        KPI(
            nome="Liquidez Imediata",
            valor=kpis["liquidez_imediata"],
            formato="numero",
            classificacao=classificar_liquidez(kpis["liquidez_imediata"])
        ),
    ]
    
    if kpis["ponto_equilibrio"]:
        kpis_lista.append(
            KPI(
                nome="Ponto de Equilíbrio",
                valor=kpis["ponto_equilibrio"],
                formato="moeda"
            )
        )
    
    # Gráfico de barras
    grafico_entradas_saidas = GraficoBarras(
        titulo="Entradas vs Saídas (R$)",
        labels=["Receita", "Custo das Vendas", "Despesas Fixas"],
        valores=[
            dados["receita_bruta_mensal"],
            dados["custo_vendas_mensal"],
            dados["despesas_fixas_mensais"]
        ],
        cores=["#10b981", "#ef4444", "#f59e0b"]
    )
    
    # Tabela resumo
    tabela_resumo = Tabela(
        titulo="Resumo Financeiro",
        colunas=["Item", "Valor (R$)"],
        linhas=[
            ["Receita Bruta", f"{dados['receita_bruta_mensal']:,.2f}"],
            ["Custo das Vendas", f"{dados['custo_vendas_mensal']:,.2f}"],
            ["Despesas Fixas", f"{dados['despesas_fixas_mensais']:,.2f}"],
            ["Disponibilidades", f"{dados['caixa'] + dados['conta_corrente']:,.2f}"],
            ["Contas a Receber (30d)", f"{dados['contas_a_receber_30d']:,.2f}"],
            ["Contas a Pagar (30d)", f"{dados['contas_a_pagar_30d']:,.2f}"],
        ]
    )
    
    return ResultadoNivel(
        kpis=kpis_lista,
        graficos=[grafico_entradas_saidas],
        tabelas=[tabela_resumo],
        mensagem=gerar_mensagem_nivel1(kpis),
        convite_proximo_nivel=gerar_convite_nivel2(),
        assumptions=assumptions,
        missing=[]
    )


def montar_resultado_nivel2(kpis: Dict, assumptions: list) -> ResultadoNivel:
    """Monta o resultado formatado do Nível 2"""
    
    kpis_lista = [
        KPI(
            nome="Ciclo Financeiro",
            valor=kpis["ciclo_financeiro"],
            formato="dias",
            classificacao=classificar_ciclo_financeiro(kpis["ciclo_financeiro"])
        ),
        KPI(
            nome="NCG Estimada",
            valor=kpis["ncg_estimada"],
            formato="moeda"
        ),
        KPI(
            nome="Alavancagem",
            valor=kpis["alavancagem"],
            formato="numero",
            classificacao="verde" if kpis["alavancagem"] < 1.0 else "amarelo" if kpis["alavancagem"] < 2.0 else "vermelho"
        ),
    ]
    
    if kpis["cobertura_juros"] is not None:
        kpis_lista.append(
            KPI(
                nome="Cobertura de Juros",
                valor=kpis["cobertura_juros"],
                formato="numero",
                classificacao=classificar_cobertura_juros(kpis["cobertura_juros"])
            )
        )
    
    if kpis["produtividade"] is not None:
        kpis_lista.append(
            KPI(
                nome="Receita por Funcionário",
                valor=kpis["produtividade"],
                formato="moeda"
            )
        )
    
    # Gráfico dos prazos
    labels_prazos = ["DSO", "DPO"]
    valores_prazos = [kpis["dso"], kpis["dpo"]]
    
    if kpis["dio"] is not None:
        labels_prazos.insert(1, "DIO")
        valores_prazos.insert(1, kpis["dio"])
    
    grafico_prazos = GraficoBarras(
        titulo="Prazos Operacionais (dias)",
        labels=labels_prazos,
        valores=valores_prazos,
        cores=["#3b82f6", "#8b5cf6", "#ec4899"]
    )
    
    # Tabela de simulações
    tabela_simulacoes = Tabela(
        titulo="Simulações de Impacto no Caixa",
        colunas=["Ação", "Impacto (R$)"],
        linhas=[
            ["Reduzir DSO em 10 dias", f"+{kpis['simulacao_reducao_dso']:,.2f}"],
            ["Aumentar DPO em 7 dias", f"+{kpis['simulacao_aumento_dpo']:,.2f}"],
            ["Total Potencial", f"+{kpis['simulacao_reducao_dso'] + kpis['simulacao_aumento_dpo']:,.2f}"]
        ]
    )
    
    return ResultadoNivel(
        kpis=kpis_lista,
        graficos=[grafico_prazos],
        tabelas=[tabela_simulacoes],
        mensagem=gerar_mensagem_nivel2(kpis),
        convite_proximo_nivel=gerar_convite_nivel3(),
        assumptions=assumptions,
        missing=[]
    )


def montar_resultado_nivel3(kpis: Dict, tendencia: Dict, assumptions: list) -> ResultadoNivel:
    """Monta o resultado formatado do Nível 3"""
    
    kpis_lista = []
    
    if kpis["roa"] is not None:
        kpis_lista.append(
            KPI(
                nome="ROA (Anual)",
                valor=kpis["roa"],
                formato="percentual",
                classificacao="verde" if kpis["roa"] >= 10 else "amarelo" if kpis["roa"] >= 5 else "vermelho"
            )
        )
    
    if kpis["roe"] is not None:
        kpis_lista.append(
            KPI(
                nome="ROE (Anual)",
                valor=kpis["roe"],
                formato="percentual",
                classificacao="verde" if kpis["roe"] >= 15 else "amarelo" if kpis["roe"] >= 8 else "vermelho"
            )
        )
    
    if kpis["payback_capex"] is not None:
        kpis_lista.append(
            KPI(
                nome="Payback CAPEX",
                valor=kpis["payback_capex"],
                formato="numero",
                classificacao="verde" if kpis["payback_capex"] <= 3 else "amarelo" if kpis["payback_capex"] <= 5 else "vermelho"
            )
        )
    
    # Gráfico de projeções
    projecoes = kpis["projecoes"]
    meses = [f"Mês {p['mes']}" for p in projecoes["neutro"]]
    
    grafico_projecoes = GraficoLinha(
        titulo="Projeção de Receita (6 meses)",
        labels=meses,
        series=[
            {
                "nome": "Otimista",
                "valores": [p["receita"] for p in projecoes["otimista"]],
                "cor": "#10b981"
            },
            {
                "nome": "Neutro",
                "valores": [p["receita"] for p in projecoes["neutro"]],
                "cor": "#3b82f6"
            },
            {
                "nome": "Pessimista",
                "valores": [p["receita"] for p in projecoes["pessimista"]],
                "cor": "#ef4444"
            }
        ]
    )
    
    return ResultadoNivel(
        kpis=kpis_lista,
        graficos=[grafico_projecoes],
        tabelas=[],
        mensagem=gerar_mensagem_nivel3(kpis, tendencia),
        convite_proximo_nivel=None,  # Último nível
        assumptions=assumptions,
        missing=[]
    )