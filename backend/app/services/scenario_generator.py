from app.models.schemas import DadosFinanceirosInput, IndicadoresFinanceiros, Cenario, TipoCenario
from app.core.config import settings
from typing import List

class ScenarioGenerator:
    def __init__(self, dados: DadosFinanceirosInput, indicadores: IndicadoresFinanceiros):
        self.dados = dados
        self.indicadores = indicadores
        self.lucro_atual = dados.receita_bruta - dados.custo_vendas - dados.despesas_operacionais - dados.despesas_financeiras
    
    def gerar_cenarios(self) -> List[Cenario]:
        return [
            self._gerar_cenario(settings.SCENARIO_OPTIMISTIC_GROWTH, TipoCenario.OTIMISTA, 
                ["Aproveite momento para ganhar mercado", "Invista em marketing", "Negocie com fornecedores"]),
            self._gerar_cenario(settings.SCENARIO_NEUTRAL_GROWTH, TipoCenario.NEUTRO,
                ["Mantenha foco na eficiência", "Busque melhorias incrementais", "Invista em clientes"]),
            self._gerar_cenario(settings.SCENARIO_PESSIMISTIC_GROWTH, TipoCenario.PESSIMISTA,
                ["PRIORIDADE: Preserve caixa", "Reduza custos fixos", "Renegocie contratos"])
        ]
    
    def _gerar_cenario(self, taxa: float, tipo: TipoCenario, recomendacoes: List[str]) -> Cenario:
        receita = self.dados.receita_bruta * (1 + taxa)
        lucro = self.lucro_atual * (1 + taxa * 1.5)
        capital = max(self.indicadores.necessidade_capital_giro * (1 + abs(taxa)) - self.indicadores.capital_giro, 0)
        return Cenario(tipo=tipo, taxa_crescimento=taxa, receita_projetada=round(receita, 2),
            lucro_projetado=round(lucro, 2), necessidade_capital=round(capital, 2), recomendacoes=recomendacoes)
    
    def gerar_cenario_customizado(self, taxa: float) -> Cenario:
        tipo = TipoCenario.OTIMISTA if taxa >= 0.15 else TipoCenario.PESSIMISTA if taxa <= -0.05 else TipoCenario.NEUTRO
        return self._gerar_cenario(taxa, tipo, [f"Cenário customizado com {taxa*100:+.1f}%", "Monitore indicadores mensalmente"])
