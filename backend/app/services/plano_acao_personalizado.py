"""
Gerador de Plano de Ação 30-60-90 Dias - PERSONALIZADO
Analisa indicadores reais e gera recomendações específicas SEM usar IA
"""
from typing import Dict, List
from app.services.formatadores import formatar_moeda_br, formatar_numero_br


class GeradorPlanoPersonalizado:
    """Gera planos de ação personalizados baseados nos indicadores financeiros"""
    
    def __init__(self, kpis: Dict, meta: Dict):
        """
        Args:
            kpis: Dicionário com todos os KPIs calculados (nivel1, nivel2, nivel3)
            meta: Metadados (setor, estado, etc)
        """
        self.kpis = kpis
        self.meta = meta
        self.setor = meta.get("setor", "")
        
        # Extrair indicadores principais
        self.nivel1 = kpis.get("nivel1", {})
        self.nivel2 = kpis.get("nivel2", {})
        self.nivel3 = kpis.get("nivel3", {})
        
        # Indicadores chave
        self.margem_bruta = self.nivel1.get("margem_bruta", 0)
        self.liquidez = self.nivel1.get("liquidez_imediata", 1.0)
        self.folego_caixa = self.nivel1.get("folego_caixa", 30)
        self.resultado_operacional = self.nivel1.get("resultado_operacional", 0)
        self.receita = self.nivel1.get("receita_bruta", 0)
        self.despesas_fixas = self.nivel1.get("despesas_fixas", 0)
        
        # Nível 2 (se disponível)
        self.pmr = self.nivel2.get("dso", 0) if self.nivel2 else 0
        self.pmp = self.nivel2.get("dpo", 0) if self.nivel2 else 0
        self.ciclo_financeiro = self.nivel2.get("ciclo_financeiro", 0) if self.nivel2 else 0
        self.alavancagem = self.nivel2.get("alavancagem", 0) if self.nivel2 else 0
        self.cobertura_juros = self.nivel2.get("cobertura_juros") if self.nivel2 else None
        
        # Benchmarks por setor (valores médios do mercado)
        self.benchmarks = self._get_benchmarks_setor()
    
    def _get_benchmarks_setor(self) -> Dict:
        """Retorna benchmarks médios do setor"""
        benchmarks_padrao = {
            "margem_bruta": 35.0,
            "pmr": 35,
            "pmp": 45,
            "ciclo_financeiro": 25,
            "liquidez": 1.5
        }
        
        # Ajustes por setor
        if "comercio" in self.setor or "varejo" in self.setor:
            benchmarks_padrao.update({
                "margem_bruta": 30.0,
                "pmr": 30,
                "pmp": 45,
                "ciclo_financeiro": 15
            })
        elif "transformacao" in self.setor or "industria" in self.setor:
            benchmarks_padrao.update({
                "margem_bruta": 40.0,
                "pmr": 45,
                "pmp": 60,
                "ciclo_financeiro": 30
            })
        elif "servicos" in self.setor:
            benchmarks_padrao.update({
                "margem_bruta": 50.0,
                "pmr": 30,
                "pmp": 30,
                "ciclo_financeiro": 10
            })
        
        return benchmarks_padrao
    
    def gerar_plano_completo(self) -> Dict[str, List[Dict]]:
        """Gera plano completo 30-60-90 dias personalizado"""
        
        # Identificar problemas críticos
        problemas = self._identificar_problemas()
        
        # Gerar ações por período
        acoes_30 = self._gerar_acoes_30_dias(problemas)
        acoes_60 = self._gerar_acoes_60_dias(problemas)
        acoes_90 = self._gerar_acoes_90_dias(problemas)
        
        return {
            "30_dias": acoes_30,
            "60_dias": acoes_60,
            "90_dias": acoes_90
        }
    
    def _identificar_problemas(self) -> Dict[str, Dict]:
        """Identifica os principais problemas financeiros e oportunidades"""
        problemas = {}
        
        # 1. LIQUIDEZ CRÍTICA
        if self.liquidez < 0.6:
            problemas["liquidez_critica"] = {
                "severidade": "CRÍTICA",
                "valor_atual": self.liquidez,
                "valor_ideal": 1.5,
                "gap": 1.5 - self.liquidez,
                "impacto_estimado": self.despesas_fixas * (1.5 - self.liquidez)
            }
        elif self.liquidez < 1.0:
            problemas["liquidez_baixa"] = {
                "severidade": "ALTA",
                "valor_atual": self.liquidez,
                "valor_ideal": 1.5,
                "gap": 1.5 - self.liquidez,
                "impacto_estimado": self.despesas_fixas * (1.5 - self.liquidez)
            }
        
        # 2. MARGEM BAIXA
        benchmark_margem = self.benchmarks["margem_bruta"]
        if self.margem_bruta < 20:
            problemas["margem_critica"] = {
                "severidade": "CRÍTICA",
                "valor_atual": self.margem_bruta,
                "valor_ideal": benchmark_margem,
                "gap": benchmark_margem - self.margem_bruta,
                "impacto_estimado": self.receita * (benchmark_margem - self.margem_bruta) / 100
            }
        elif self.margem_bruta < benchmark_margem:
            problemas["margem_baixa"] = {
                "severidade": "MÉDIA",
                "valor_atual": self.margem_bruta,
                "valor_ideal": benchmark_margem,
                "gap": benchmark_margem - self.margem_bruta,
                "impacto_estimado": self.receita * (benchmark_margem - self.margem_bruta) / 100
            }
        
        # 3. PMR ALTO (só se nível 2 disponível)
        if self.nivel2 and self.pmr > 0:
            benchmark_pmr = self.benchmarks["pmr"]
            if self.pmr > benchmark_pmr + 15:
                problemas["pmr_alto"] = {
                    "severidade": "ALTA",
                    "valor_atual": self.pmr,
                    "valor_ideal": benchmark_pmr,
                    "gap": self.pmr - benchmark_pmr,
                    "impacto_estimado": (self.receita / 30) * (self.pmr - benchmark_pmr)
                }
            elif self.pmr > benchmark_pmr:
                problemas["pmr_elevado"] = {
                    "severidade": "MÉDIA",
                    "valor_atual": self.pmr,
                    "valor_ideal": benchmark_pmr,
                    "gap": self.pmr - benchmark_pmr,
                    "impacto_estimado": (self.receita / 30) * (self.pmr - benchmark_pmr)
                }
        
        # 4. PMP BAIXO (oportunidade)
        if self.nivel2 and self.pmp > 0:
            benchmark_pmp = self.benchmarks["pmp"]
            if self.pmp < benchmark_pmp - 10:
                problemas["pmp_baixo"] = {
                    "severidade": "OPORTUNIDADE",
                    "valor_atual": self.pmp,
                    "valor_ideal": benchmark_pmp,
                    "gap": benchmark_pmp - self.pmp,
                    "impacto_estimado": (self.receita * 0.7 / 30) * (benchmark_pmp - self.pmp)
                }
        
        # 5. CICLO FINANCEIRO LONGO
        if self.nivel2 and self.ciclo_financeiro > 0:
            benchmark_ciclo = self.benchmarks["ciclo_financeiro"]
            if self.ciclo_financeiro > benchmark_ciclo + 20:
                problemas["ciclo_longo"] = {
                    "severidade": "ALTA",
                    "valor_atual": self.ciclo_financeiro,
                    "valor_ideal": benchmark_ciclo,
                    "gap": self.ciclo_financeiro - benchmark_ciclo,
                    "impacto_estimado": (self.receita / 30) * (self.ciclo_financeiro - benchmark_ciclo) * 0.6
                }
        
        # 6. FÔLEGO DE CAIXA CURTO
        if self.folego_caixa < 15:
            problemas["folego_critico"] = {
                "severidade": "CRÍTICA",
                "valor_atual": self.folego_caixa,
                "valor_ideal": 45,
                "gap": 45 - self.folego_caixa,
                "impacto_estimado": self.despesas_fixas * (45 - self.folego_caixa) / 30
            }
        elif self.folego_caixa < 30:
            problemas["folego_baixo"] = {
                "severidade": "MÉDIA",
                "valor_atual": self.folego_caixa,
                "valor_ideal": 45,
                "gap": 45 - self.folego_caixa,
                "impacto_estimado": self.despesas_fixas * (45 - self.folego_caixa) / 30
            }
        
        # 7. ENDIVIDAMENTO ALTO
        if self.nivel2 and self.alavancagem > 2.0:
            problemas["endividamento_alto"] = {
                "severidade": "ALTA",
                "valor_atual": self.alavancagem,
                "valor_ideal": 1.5,
                "gap": self.alavancagem - 1.5
            }
        
        # 8. COBERTURA DE JUROS BAIXA
        if self.cobertura_juros is not None and self.cobertura_juros < 2.0:
            problemas["cobertura_juros_baixa"] = {
                "severidade": "ALTA" if self.cobertura_juros < 1.5 else "MÉDIA",
                "valor_atual": self.cobertura_juros,
                "valor_ideal": 3.0,
                "gap": 3.0 - self.cobertura_juros
            }
        
        # 9. RESULTADO OPERACIONAL NEGATIVO
        if self.resultado_operacional < 0:
            problemas["resultado_negativo"] = {
                "severidade": "CRÍTICA",
                "valor_atual": self.resultado_operacional,
                "valor_ideal": self.despesas_fixas * 0.3,  # Meta: 30% acima dos custos fixos
                "gap": abs(self.resultado_operacional)
            }
        
        return problemas
    
    def _gerar_acoes_30_dias(self, problemas: Dict) -> List[Dict]:
        """Gera 4 ações prioritárias para 30 dias (URGÊNCIAS)"""
        acoes = []
        
        # Ação 1: Liquidez/Caixa (sempre prioritário se houver problema)
        if "liquidez_critica" in problemas or "folego_critico" in problemas:
            p = problemas.get("liquidez_critica") or problemas.get("folego_critico")
            acoes.append({
                "titulo": "URGENTE: Securitizar recebíveis ou buscar capital de curto prazo",
                "descricao": f"Sua liquidez atual ({p['valor_atual']:.2f}) está crítica. Considere antecipar recebíveis via factoring ou buscar linha de emergência para cobrir os próximos {int(self.folego_caixa)} dias de operação até normalizar o fluxo.",
                "resultado_esperado": f"Elevar liquidez para {p['valor_ideal']:.1f} e garantir {p['valor_ideal']:.0f} dias de fôlego",
                "prioridade": "Alta"
            })
        elif "pmr_alto" in problemas:
            p = problemas["pmr_alto"]
            dias_reduzir = min(15, int(p['gap']))
            acoes.append({
                "titulo": f"Reduzir prazo de recebimento de {int(p['valor_atual'])} para {int(p['valor_atual'] - dias_reduzir)} dias",
                "descricao": f"Seu prazo médio de recebimento ({int(p['valor_atual'])} dias) está {int(p['gap'])} dias acima do benchmark do setor ({int(p['valor_ideal'])} dias). Implemente régua de cobrança com contato a cada 3 dias e ofereça 2-3% de desconto para pagamentos em até 10 dias.",
                "resultado_esperado": f"Liberar aproximadamente {formatar_moeda_br(p['impacto_estimado'] * 0.5)} em capital de giro",
                "prioridade": "Alta"
            })
        else:
            # Ação padrão de controle
            acoes.append({
                "titulo": "Implementar controle diário de caixa e projeção semanal",
                "descricao": f"Com fôlego atual de {int(self.folego_caixa)} dias, criar rotina de fechamento diário com projeção de 7 dias. Configure alertas automáticos para quando o saldo projetado cair abaixo de {formatar_moeda_br(self.despesas_fixas)}.",
                "resultado_esperado": "Antecipar problemas de caixa com 7 dias de antecedência e evitar surpresas",
                "prioridade": "Alta"
            })
        
        # Ação 2: Margem/Custos
        if "margem_critica" in problemas or "margem_baixa" in problemas:
            p = problemas.get("margem_critica") or problemas.get("margem_baixa")
            acoes.append({
                "titulo": f"Aumentar margem bruta de {p['valor_atual']:.1f}% para {min(p['valor_atual'] + 5, p['valor_ideal']):.1f}%",
                "descricao": f"Sua margem ({p['valor_atual']:.1f}%) está {p['gap']:.1f} pontos abaixo do setor ({p['valor_ideal']:.1f}%). Ações imediatas: (1) Mapear os 3 produtos/serviços de menor margem e avaliar descontinuação ou reajuste de 8-12%, (2) Renegociar com fornecedor principal buscando 5% de desconto para pagamento em 15 dias.",
                "resultado_esperado": f"Incremento mensal de aproximadamente {formatar_moeda_br(p['impacto_estimado'] * 0.15)}",
                "prioridade": "Alta"
            })
        elif "resultado_negativo" in problemas:
            acoes.append({
                "titulo": "Reverter resultado operacional negativo com corte emergencial",
                "descricao": f"Resultado operacional negativo de {formatar_moeda_br(abs(self.resultado_operacional))}. Ação imediata: cortar ou suspender despesas não essenciais (consultorias, assinaturas, marketing não-performático) e congelar novas contratações até atingir break-even.",
                "resultado_esperado": "Zerar prejuízo operacional e criar margem de segurança mínima",
                "prioridade": "Alta"
            })
        else:
            acoes.append({
                "titulo": "Mapear e otimizar custos variáveis por produto/serviço",
                "descricao": "Mesmo com margem saudável, levantar TODOS os custos ligados às vendas (comissões, frete, embalagem, taxas) dos 5 principais produtos/serviços e identificar 2-3 oportunidades de redução imediata de 3-5%.",
                "resultado_esperado": f"Economia mensal estimada de {formatar_moeda_br(self.receita * 0.03)}",
                "prioridade": "Média"
            })
        
        # Ação 3: Fornecedores/PMP (se aplicável)
        if "pmp_baixo" in problemas:
            p = problemas["pmp_baixo"]
            dias_aumentar = min(15, int(p['gap']))
            acoes.append({
                "titulo": f"Negociar extensão de prazo de {int(p['valor_atual'])} para {int(p['valor_atual'] + dias_aumentar)} dias",
                "descricao": f"Seu prazo médio de pagamento ({int(p['valor_atual'])} dias) está abaixo do mercado ({int(p['valor_ideal'])} dias). Conversar com os 5 maiores fornecedores para estender {dias_aumentar} dias mantendo ou melhorando condições comerciais (descontos por volume).",
                "resultado_esperado": f"Liberar aproximadamente {formatar_moeda_br(p['impacto_estimado'] * 0.6)} em capital de giro",
                "prioridade": "Alta"
            })
        else:
            # Ação genérica de renegociação
            valor_economizado = self.receita * 0.02  # Estimativa conservadora de 2%
            acoes.append({
                "titulo": "Renegociar condições com principais fornecedores",
                "descricao": f"Mesmo sem urgência no prazo, revisar condições comerciais dos 3 maiores fornecedores. Buscar: (1) desconto adicional de 3-5% para pedidos consolidados, (2) bonificação por volume trimestral, ou (3) melhoria no mix de produtos incluídos.",
                "resultado_esperado": f"Economia estimada de {formatar_moeda_br(valor_economizado)} ao mês",
                "prioridade": "Média"
            })
        
        # Ação 4: Gestão/Processos
        if "cobertura_juros_baixa" in problemas:
            acoes.append({
                "titulo": "Reestruturar dívidas com alta taxa de juros",
                "descricao": f"Cobertura de juros de {self.cobertura_juros:.1f}x indica que despesas financeiras estão consumindo resultado operacional. Priorizar: (1) renegociar empréstimos com taxa >2,5% ao mês, (2) consolidar dívidas de cartão em linha mais barata, (3) analisar portabilidade de empréstimos.",
                "resultado_esperado": "Reduzir despesas financeiras em 20-30% nos próximos 2 meses",
                "prioridade": "Alta"
            })
        else:
            acoes.append({
                "titulo": "Padronizar processo de aprovação de despesas acima de limite",
                "descricao": f"Estabelecer alçada de aprovação: despesas acima de {formatar_moeda_br(self.despesas_fixas * 0.1)} precisam de aprovação com justificativa e ROI estimado. Criar checklist de 3 perguntas obrigatórias antes de qualquer novo gasto recorrente.",
                "resultado_esperado": "Evitar despesas desnecessárias e criar cultura de consciência financeira",
                "prioridade": "Média"
            })
        
        return acoes[:4]  # Garantir exatamente 4 ações
    
    def _gerar_acoes_60_dias(self, problemas: Dict) -> List[Dict]:
        """Gera 4 ações estruturantes para 60 dias (MELHORIAS)"""
        acoes = []
        
        # Ação 1: Dashboard/KPIs
        acoes.append({
            "titulo": "Automatizar cálculo e acompanhamento dos 12 principais KPIs",
            "descricao": f"Criar dashboard com atualização semanal automática dos indicadores críticos: liquidez ({self.liquidez:.2f}), margem bruta ({self.margem_bruta:.1f}%), fôlego de caixa ({int(self.folego_caixa)} dias), resultado operacional, ciclo financeiro e outros. Enviar relatório visual por email toda segunda-feira 8h com alertas para desvios >10%.",
            "resultado_esperado": "Reduzir tempo de análise de 3-4h para 30min por semana e detectar problemas com antecedência",
            "prioridade": "Alta"
        })
        
        # Ação 2: Ciclo/Capital de Giro
        if "ciclo_longo" in problemas:
            p = problemas["ciclo_longo"]
            acoes.append({
                "titulo": f"Reduzir ciclo financeiro de {int(p['valor_atual'])} para {int(p['valor_ideal'] + 5)} dias",
                "descricao": f"Ciclo atual ({int(p['valor_atual'])} dias) está {int(p['gap'])} dias acima do ideal ({int(p['valor_ideal'])} dias). Plano de ataque: (1) Implementar melhorias das ações de 30 dias em PMR e PMP, (2) Otimizar giro de estoque com curva ABC - promover itens parados >45 dias, (3) Ajustar ponto de pedido para evitar excesso.",
                "resultado_esperado": f"Liberar aproximadamente {formatar_moeda_br(p['impacto_estimado'] * 0.7)} em capital de giro preso",
                "prioridade": "Alta"
            })
        elif self.nivel2:
            # Otimização geral de capital de giro
            acoes.append({
                "titulo": "Otimizar capital de giro com foco em giro de estoque",
                "descricao": f"Aplicar curva ABC no estoque: (A) 20% dos itens = 80% do valor - manter giro de 45 dias, (B) 30% dos itens = 15% do valor - giro de 60 dias, (C) 50% dos itens = 5% do valor - liquidar em 30 dias com desconto progressivo. Ajustar ponto de pedido dos itens A para reduzir rupturas.",
                "resultado_esperado": "Aumentar giro de estoque em 15-25% e liberar capital preso",
                "prioridade": "Alta"
            })
        else:
            acoes.append({
                "titulo": "Estruturar controles de compras e estoque",
                "descricao": "Criar planilha de controle com: entrada, saída, saldo, ponto de pedido e fornecedor preferencial para os 20 principais itens. Definir rotina quinzenal de revisão e ajuste de pedidos baseado em venda real dos últimos 30 dias.",
                "resultado_esperado": "Visibilidade completa do estoque e redução de capital parado",
                "prioridade": "Alta"
            })
        
        # Ação 3: Rentabilidade/Canais
        setor_info = "produto" if "comercio" in self.setor or "industria" in self.setor else "serviço"
        acoes.append({
            "titulo": f"Calcular margem real por {setor_info} e canal de venda",
            "descricao": f"Ir além da margem bruta média ({self.margem_bruta:.1f}%). Calcular margem REAL de cada {setor_info} e canal (loja física, e-commerce, marketplace, B2B) descontando TODOS os custos específicos: frete, comissões, impostos, devoluções, embalagem. Identificar os 20% que geram 80% do lucro.",
            "resultado_esperado": f"Descobrir {setor_info}s/canais com margem real 30%+ para concentrar esforços comerciais",
            "prioridade": "Alta"
        })
        
        # Ação 4: Despesas Fixas
        acoes.append({
            "titulo": "Revisar e renegociar despesas fixas recorrentes",
            "descricao": f"Com despesas fixas de {formatar_moeda_br(self.despesas_fixas)}/mês, revisar: (1) Aluguel - buscar redução ou migração se representar >15% da receita, (2) Energia/Telecom - trocar fornecedor ou plano, (3) Software/Assinaturas - eliminar redundâncias e renegociar contratos anuais com desconto, (4) Seguros - cotar com 3 corretoras.",
            "resultado_esperado": f"Economizar 10-15% = {formatar_moeda_br(self.despesas_fixas * 0.125)} mensais",
            "prioridade": "Média"
        })
        
        return acoes[:4]
    
    def _gerar_acoes_90_dias(self, problemas: Dict) -> List[Dict]:
        """Gera 4 ações estratégicas para 90 dias (CRESCIMENTO)"""
        acoes = []
        
        # Ação 1: Captação/Estruturação Financeira
        if "liquidez_critica" in problemas or "folego_critico" in problemas or self.alavancagem > 1.5:
            acoes.append({
                "titulo": "Estruturar captação de capital ou reestruturação de dívidas",
                "descricao": f"Com indicadores atuais (liquidez {self.liquidez:.2f}, fôlego {int(self.folego_caixa)} dias), preparar apresentação executiva dos últimos 12 meses + projeção 12 meses à frente. Buscar: (1) Investidor-anjo ou sócio capitalista para aporte de {formatar_moeda_br(self.despesas_fixas * 6)}, ou (2) Linha de capital de giro de longo prazo com carência de 6 meses.",
                "resultado_esperado": "Capitalizar empresa e/ou reduzir custo de capital para taxa <1,8% ao mês",
                "prioridade": "Alta"
            })
        else:
            reserva_ideal = self.despesas_fixas * 3
            acoes.append({
                "titulo": "Criar reserva de emergência equivalente a 3 meses de operação",
                "descricao": f"Situação financeira permite construir colchão de segurança. Meta: {formatar_moeda_br(reserva_ideal)}. Plano: separar 10-15% do resultado operacional mensal em conta exclusiva até atingir o objetivo. Usar apenas para emergências genuínas (não para investimentos).",
                "resultado_esperado": "Garantir 90 dias de autonomia para imprevistos e crises",
                "prioridade": "Alta"
            })
        
        # Ação 2: Planejamento Estratégico
        if self.resultado_operacional > 0 and self.margem_bruta > 25:
            # Empresa saudável - foco em crescimento
            crescimento_target = 25  # 25% ao ano
            receita_meta = self.receita * 12 * 1.25
            acoes.append({
                "titulo": f"Desenvolver plano de crescimento de {crescimento_target}% anualizado",
                "descricao": f"Com base sólida (margem {self.margem_bruta:.1f}%, resultado operacional positivo), estruturar crescimento sustentável. Definir metas por canal para sair de {formatar_moeda_br(self.receita * 12)} para {formatar_moeda_br(receita_meta)} em receita anual. Alocar budget de marketing/vendas proporcional ao potencial de cada canal baseado em dados históricos.",
                "resultado_esperado": "Crescimento organizado de 20-30% ao ano com rentabilidade mantida",
                "prioridade": "Média"
            })
        else:
            # Empresa em recuperação - foco em estabilização
            acoes.append({
                "titulo": "Consolidar operação e construir base para crescimento futuro",
                "descricao": f"Antes de crescer, estabilizar: (1) Consolidar melhorias de margem e ciclo financeiro implementadas nos 60 dias anteriores, (2) Documentar processos críticos em 1 página cada (compras, vendas, financeiro, produção), (3) Treinar 2-3 pessoas-chave para reduzir dependência do gestor principal.",
                "resultado_esperado": "Operação estruturada e preparada para escalar com segurança",
                "prioridade": "Alta"
            })
        
        # Ação 3: CAPEX/Investimentos (se houver capacidade)
        if self.nivel3:
            payback = self.nivel3.get("payback_capex")
            if payback and payback < 18:
                acoes.append({
                    "titulo": f"Avaliar investimento em CAPEX com payback de {payback:.0f} meses",
                    "descricao": f"Análise preliminar indica potencial de investimento com retorno em {payback:.0f} meses. Refinar business case: (1) Detalhar desembolso mês a mês, (2) Projetar ganhos incrementais realistas (usar 70% do cenário otimista), (3) Definir indicadores de sucesso e momento de pivot/parada, (4) Simular impacto no fluxo de caixa dos próximos 24 meses.",
                    "resultado_esperado": "Decisão fundamentada sobre investimento estratégico",
                    "prioridade": "Média"
                })
            else:
                acoes.append({
                    "titulo": "Mapear oportunidades de automação ou ganho de escala",
                    "descricao": "Identificar gargalos operacionais que limitam crescimento: processos manuais repetitivos, falta de integração entre sistemas, retrabalho. Avaliar 2-3 melhorias com investimento de até 3 meses de lucro operacional e payback máximo de 12 meses.",
                    "resultado_esperado": "Pipeline de investimentos priorizados por ROI",
                    "prioridade": "Baixa"
                })
        else:
            acoes.append({
                "titulo": "Avaliar oportunidades de investimento em capacidade ou eficiência",
                "descricao": f"Com receita de {formatar_moeda_br(self.receita)}/mês, mapear investimentos que poderiam: (1) Aumentar capacidade produtiva/atendimento em 30%+, (2) Reduzir custos operacionais em 15%+, ou (3) Melhorar qualidade e reduzir devoluções/retrabalho. Priorizar opções com payback <12 meses.",
                "resultado_esperado": "Roadmap de investimentos para os próximos 6-12 meses",
                "prioridade": "Baixa"
            })
        
        # Ação 4: Pessoas/Gestão
        acoes.append({
            "titulo": "Capacitar equipe-chave em gestão financeira e KPIs",
            "descricao": f"Reduzir dependência do gestor: treinar 2-3 pessoas (gerente operacional, coordenador comercial, encarregado financeiro) para entender os {3 if self.nivel1 else 5 if self.nivel2 else 8} principais KPIs do negócio. Criar rotina mensal de 1h para revisar números e cada um propor 1 melhoria. Compartilhar metas financeiras e bonificar por atingimento.",
            "resultado_esperado": "Reduzir dependência do gestor em 40% e aumentar engajamento da equipe",
            "prioridade": "Baixa"
        })
        
        return acoes[:4]


def gerar_plano_personalizado(kpis: Dict, meta: Dict) -> Dict[str, List[Dict]]:
    """
    Função principal para gerar plano personalizado
    
    Args:
        kpis: Dict com indicadores (nivel1, nivel2, nivel3)
        meta: Dict com metadados (setor, estado, etc)
    
    Returns:
        Dict com plano 30-60-90 dias personalizado
    """
    gerador = GeradorPlanoPersonalizado(kpis, meta)
    return gerador.gerar_plano_completo()
