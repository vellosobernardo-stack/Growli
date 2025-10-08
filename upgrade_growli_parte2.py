"""
🌱 GROWLI 2.0 - PARTE 2: Estratégias Personalizadas
Salve como: upgrade_growli_parte2.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🌱 GROWLI 2.0 - Parte 2: Sistema de estratégias avançado...\n")

# ============================================
# 1. FINANCIAL_CALC.PY - ATUALIZADO COM MAIS INDICADORES
# ============================================
financial_calc_v2 = """from app.models.schemas import DadosFinanceirosInput, IndicadoresFinanceiros
from typing import Dict, List

class FinancialCalculator:
    def __init__(self, dados: DadosFinanceirosInput):
        self.dados = dados
        self.ativo_circulante = dados.caixa + dados.contas_receber + dados.estoque
        self.ativo_total = self.ativo_circulante + dados.imobilizado
        self.passivo_circulante = dados.fornecedores + dados.emprestimos_cp + dados.impostos
        self.passivo_total = self.passivo_circulante + dados.emprestimos_lp
        self.patrimonio_liquido = self.ativo_total - self.passivo_total
        self.lucro_bruto = dados.receita_bruta - dados.custo_vendas
        self.lucro_operacional = self.lucro_bruto - dados.despesas_operacionais
        self.lucro_liquido = self.lucro_operacional - dados.despesas_financeiras
    
    def calcular_indicadores(self) -> IndicadoresFinanceiros:
        pmr = round((self.dados.contas_receber / self.dados.receita_bruta) * 360, 1) if self.dados.receita_bruta > 0 else 0
        pme = round(360 / (self.dados.custo_vendas / self.dados.estoque), 1) if self.dados.estoque > 0 else 0
        pmp = round((self.dados.fornecedores / self.dados.custo_vendas) * 360, 1) if self.dados.custo_vendas > 0 else 0
        
        return IndicadoresFinanceiros(
            liquidez_corrente=round(self.ativo_circulante / self.passivo_circulante, 2) if self.passivo_circulante > 0 else 999.99,
            liquidez_seca=round((self.ativo_circulante - self.dados.estoque) / self.passivo_circulante, 2) if self.passivo_circulante > 0 else 999.99,
            liquidez_imediata=round(self.dados.caixa / self.passivo_circulante, 2) if self.passivo_circulante > 0 else 999.99,
            margem_bruta=round((self.lucro_bruto / self.dados.receita_bruta) * 100, 2),
            margem_operacional=round((self.lucro_operacional / self.dados.receita_bruta) * 100, 2),
            margem_liquida=round((self.lucro_liquido / self.dados.receita_bruta) * 100, 2),
            endividamento_geral=round((self.passivo_total / self.ativo_total) * 100, 2) if self.ativo_total > 0 else 0,
            composicao_endividamento=round((self.passivo_circulante / self.passivo_total) * 100, 2) if self.passivo_total > 0 else 0,
            giro_estoque=round(self.dados.custo_vendas / self.dados.estoque, 2) if self.dados.estoque > 0 else 999.99,
            prazo_medio_recebimento=pmr,
            prazo_medio_pagamento=pmp,
            ciclo_operacional=round(pmr + pme, 1),
            ciclo_caixa=round(pmr + pme - pmp, 1),
            capital_giro=round(self.ativo_circulante - self.passivo_circulante, 2),
            necessidade_capital_giro=round(self.dados.contas_receber + self.dados.estoque - self.dados.fornecedores, 2),
            rentabilidade_patrimonio=round((self.lucro_liquido / self.patrimonio_liquido) * 100, 2) if self.patrimonio_liquido > 0 else 0,
            rentabilidade_ativo=round((self.lucro_liquido / self.ativo_total) * 100, 2) if self.ativo_total > 0 else 0
        )
    
    def gerar_estrategias_personalizadas(self, indicadores: IndicadoresFinanceiros, benchmarks: Dict) -> List[str]:
        estrategias = []
        
        # Liquidez
        if indicadores.liquidez_corrente < 1.0:
            estrategias.append("🚨 URGENTE: Liquidez crítica. Busque capital de giro imediatamente ou renegocie dívidas de curto prazo")
        elif indicadores.liquidez_corrente < benchmarks.get('liquidez_corrente', 1.5):
            estrategias.append("⚠️ LIQUIDEZ: Aumente o caixa com antecipação de recebíveis ou reduza prazos de recebimento")
        
        # Margens
        if indicadores.margem_liquida < 0:
            estrategias.append("🚨 CRÍTICO: Empresa operando com prejuízo. Revise estrutura de custos e precificação urgentemente")
        elif indicadores.margem_liquida < benchmarks.get('margem_liquida', 5):
            estrategias.append("📉 MARGEM: Aumente preços, reduza custos variáveis ou renegocie com fornecedores")
        else:
            estrategias.append("✅ RENTABILIDADE: Margem saudável. Reinvista em marketing e expansão")
        
        # Capital de Giro
        if indicadores.capital_giro < 0:
            estrategias.append("🚨 CAPITAL DE GIRO NEGATIVO: Busque empréstimo de longo prazo ou aporte de sócios")
        elif indicadores.necessidade_capital_giro > indicadores.capital_giro * 1.5:
            estrategias.append("⚠️ NCG ALTO: Reduza prazos de recebimento ou aumente prazo com fornecedores")
        
        # Ciclo de Caixa
        if indicadores.ciclo_caixa > benchmarks.get('ciclo_caixa', 60):
            estrategias.append(f"⏱️ CICLO LONGO ({indicadores.ciclo_caixa:.0f} dias): Acelere recebimentos e negocie prazos maiores com fornecedores")
        
        # Endividamento
        if indicadores.endividamento_geral > 70:
            estrategias.append("⚠️ ENDIVIDAMENTO ALTO: Evite novas dívidas. Priorize amortização ou capitalize a empresa")
        elif indicadores.endividamento_geral < 30:
            estrategias.append("💡 BAIXO ENDIVIDAMENTO: Pode alavancar com crédito para investimentos estratégicos")
        
        # Giro de Estoque
        if indicadores.giro_estoque < benchmarks.get('giro_estoque', 6):
            estrategias.append("📦 ESTOQUE PARADO: Faça promoções, reduza mix ou melhore compras baseadas em demanda")
        
        # Rentabilidade
        if indicadores.rentabilidade_patrimonio > 15:
            estrategias.append("🎯 ROE EXCELENTE: Empresa gerando ótimo retorno aos sócios. Continue o bom trabalho!")
        
        return estrategias[:7]  # Retorna no máximo 7 estratégias
    
    def gerar_diagnostico(self, indicadores: IndicadoresFinanceiros, benchmarks: Dict) -> Dict[str, List[str]]:
        pontos_fortes, pontos_atencao, acoes = [], [], []
        
        # Liquidez
        if indicadores.liquidez_corrente >= 1.5:
            pontos_fortes.append(f"Excelente liquidez corrente ({indicadores.liquidez_corrente:.2f})")
        elif indicadores.liquidez_corrente < 1.0:
            pontos_atencao.append(f"Liquidez corrente crítica ({indicadores.liquidez_corrente:.2f})")
            acoes.append("URGENTE: Aumentar caixa ou reduzir dívidas de curto prazo")
        
        # Margens
        if indicadores.margem_liquida >= benchmarks.get('margem_liquida', 5):
            pontos_fortes.append(f"Margem líquida saudável ({indicadores.margem_liquida:.1f}%)")
        elif indicadores.margem_liquida < 0:
            pontos_atencao.append("Empresa operando com prejuízo")
            acoes.append("Revisar estrutura de custos e precificação")
        
        # Capital de Giro
        if indicadores.capital_giro > 0:
            pontos_fortes.append(f"Capital de giro positivo (R$ {indicadores.capital_giro:,.2f})")
        else:
            pontos_atencao.append("Capital de giro negativo")
            acoes.append("CRÍTICO: Buscar capital de giro urgentemente")
        
        # Endividamento
        if indicadores.endividamento_geral <= 50:
            pontos_fortes.append(f"Endividamento controlado ({indicadores.endividamento_geral:.1f}%)")
        elif indicadores.endividamento_geral > 70:
            pontos_atencao.append(f"Alto endividamento ({indicadores.endividamento_geral:.1f}%)")
            acoes.append("Evitar novas dívidas e priorizar amortização")
        
        # Ciclo de Caixa
        if indicadores.ciclo_caixa < benchmarks.get('ciclo_caixa', 60):
            pontos_fortes.append(f"Ciclo de caixa eficiente ({indicadores.ciclo_caixa:.0f} dias)")
        
        return {'pontos_fortes': pontos_fortes, 'pontos_atencao': pontos_atencao, 'acoes_prioritarias': acoes}
    
    def calcular_score_saude(self, indicadores: IndicadoresFinanceiros, benchmarks: Dict) -> int:
        score = 0
        
        # Liquidez (25 pontos)
        if indicadores.liquidez_corrente >= 2.0: score += 25
        elif indicadores.liquidez_corrente >= 1.5: score += 20
        elif indicadores.liquidez_corrente >= 1.0: score += 10
        
        # Margem (30 pontos)
        if indicadores.margem_liquida >= 15: score += 30
        elif indicadores.margem_liquida >= 10: score += 25
        elif indicadores.margem_liquida >= 5: score += 15
        elif indicadores.margem_liquida >= 0: score += 5
        
        # Capital de Giro (20 pontos)
        if indicadores.capital_giro > indicadores.necessidade_capital_giro * 1.5: score += 20
        elif indicadores.capital_giro > 0: score += 15
        
        # Endividamento (15 pontos)
        if indicadores.endividamento_geral <= 40: score += 15
        elif indicadores.endividamento_geral <= 60: score += 10
        elif indicadores.endividamento_geral <= 80: score += 5
        
        # Rentabilidade (10 pontos)
        if indicadores.rentabilidade_patrimonio >= 20: score += 10
        elif indicadores.rentabilidade_patrimonio >= 10: score += 7
        elif indicadores.rentabilidade_patrimonio >= 5: score += 4
        
        return min(score, 100)
"""
criar_arquivo("backend/app/services/financial_calc.py", financial_calc_v2)

# ============================================
# 2. ANALYSIS.PY - INTEGRAR ESTRATÉGIAS PERSONALIZADAS
# ============================================
analysis_v2 = """from fastapi import APIRouter, HTTPException
from app.models.schemas import DadosFinanceirosInput, ResultadoAnalise, SuccessResponse
from app.services.financial_calc import FinancialCalculator
from app.services.sector_benchmarks import SectorBenchmarks
from app.services.scenario_generator import ScenarioGenerator
import uuid
from datetime import datetime

router = APIRouter()

@router.post("/calculate", response_model=ResultadoAnalise)
async def calcular_analise(dados: DadosFinanceirosInput):
    try:
        # Calcular indicadores
        calculator = FinancialCalculator(dados)
        indicadores = calculator.calcular_indicadores()
        
        # Obter benchmarks do setor
        benchmarks = SectorBenchmarks.get_benchmarks(dados.setor)
        
        # Gerar diagnóstico
        diagnostico = calculator.gerar_diagnostico(indicadores, benchmarks)
        
        # Calcular score de saúde
        score = calculator.calcular_score_saude(indicadores, benchmarks)
        
        # Gerar cenários
        scenario_gen = ScenarioGenerator(dados, indicadores)
        cenarios = scenario_gen.gerar_cenarios()
        
        # Gerar estratégias personalizadas
        estrategias_personalizadas = calculator.gerar_estrategias_personalizadas(indicadores, benchmarks)
        
        # Adicionar estratégias do setor
        estrategias_setor = SectorBenchmarks.get_sector_strategies(dados.setor)
        
        return ResultadoAnalise(
            id_analise=str(uuid.uuid4()),
            data_analise=datetime.now(),
            setor=dados.setor,
            estado=dados.estado,
            dados_input=dados,
            indicadores=indicadores,
            cenarios=cenarios,
            pontos_fortes=diagnostico['pontos_fortes'],
            pontos_atencao=diagnostico['pontos_atencao'],
            acoes_prioritarias=diagnostico['acoes_prioritarias'],
            estrategias_personalizadas=estrategias_personalizadas + estrategias_setor[:3],
            saude_financeira_score=score
        )
    except Exception as e:
        raise HTTPException(500, f"Erro na análise: {str(e)}")

@router.get("/benchmarks/{setor}")
async def obter_benchmarks(setor: str):
    try:
        benchmarks = SectorBenchmarks.get_benchmarks(setor)
        return SuccessResponse(message=f"Benchmarks do setor {setor}", data=benchmarks)
    except ValueError as e:
        raise HTTPException(404, str(e))
"""
criar_arquivo("backend/app/api/endpoints/analysis.py", analysis_v2)

print("\n✅ PARTE 2 CONCLUÍDA!")
print("\n📋 Melhorias implementadas:")
print("  ✅ Sistema de estratégias personalizadas")
print("  ✅ Novos indicadores: PMR, PMP, Ciclo de Caixa, ROE, ROA")
print("  ✅ Score de saúde mais robusto (5 critérios)")
print("  ✅ Estratégias contextualizadas por situação")
print("\n⏳ Reinicie o backend:")
print("  Ctrl+C no terminal")
print("  uvicorn app.main:app --reload")