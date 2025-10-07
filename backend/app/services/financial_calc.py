from app.models.schemas import DadosFinanceirosInput, IndicadoresFinanceiros
from typing import Dict, List

class FinancialCalculator:
    def __init__(self, dados: DadosFinanceirosInput):
        self.dados = dados
        self.ativo_circulante = dados.caixa + dados.contas_receber + dados.estoque
        self.ativo_total = self.ativo_circulante + dados.imobilizado
        self.passivo_circulante = dados.fornecedores + dados.emprestimos_cp + dados.impostos
        self.passivo_total = self.passivo_circulante + dados.emprestimos_lp
        self.lucro_bruto = dados.receita_bruta - dados.custo_vendas
        self.lucro_operacional = self.lucro_bruto - dados.despesas_operacionais
        self.lucro_liquido = self.lucro_operacional - dados.despesas_financeiras
    
    def calcular_indicadores(self) -> IndicadoresFinanceiros:
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
            prazo_medio_recebimento=round((self.dados.contas_receber / self.dados.receita_bruta) * 360, 1),
            capital_giro=round(self.ativo_circulante - self.passivo_circulante, 2),
            necessidade_capital_giro=round(self.dados.contas_receber + self.dados.estoque - self.dados.fornecedores, 2)
        )
    
    def gerar_diagnostico(self, indicadores: IndicadoresFinanceiros, benchmarks: Dict) -> Dict[str, List[str]]:
        pontos_fortes, pontos_atencao, acoes = [], [], []
        
        if indicadores.liquidez_corrente >= 1.5:
            pontos_fortes.append(f"Excelente liquidez corrente ({indicadores.liquidez_corrente:.2f})")
        elif indicadores.liquidez_corrente < 1.0:
            pontos_atencao.append(f"Liquidez corrente baixa ({indicadores.liquidez_corrente:.2f})")
            acoes.append("URGENTE: Aumentar caixa e reduzir dívidas")
        
        if indicadores.margem_liquida >= 5:
            pontos_fortes.append(f"Margem líquida saudável ({indicadores.margem_liquida:.1f}%)")
        elif indicadores.margem_liquida < 0:
            pontos_atencao.append("Empresa operando com prejuízo")
            acoes.append("Revisar estrutura de custos imediatamente")
        
        if indicadores.capital_giro > 0:
            pontos_fortes.append(f"Capital de giro positivo (R$ {indicadores.capital_giro:,.2f})")
        else:
            pontos_atencao.append("Capital de giro negativo")
            acoes.append("CRÍTICO: Buscar capital de giro urgentemente")
        
        return {'pontos_fortes': pontos_fortes, 'pontos_atencao': pontos_atencao, 'acoes_prioritarias': acoes}
    
    def calcular_score_saude(self, indicadores: IndicadoresFinanceiros, benchmarks: Dict) -> int:
        score = 0
        if indicadores.liquidez_corrente >= 1.5: score += 15
        if indicadores.liquidez_seca >= 1.0: score += 15
        if indicadores.margem_liquida >= 10: score += 20
        elif indicadores.margem_liquida >= 5: score += 15
        if indicadores.endividamento_geral <= 40: score += 15
        if indicadores.capital_giro > 0: score += 20
        return min(score, 100)
