# backend/app/services/plano_acao_generator.py

from typing import List, Dict
import anthropic  # ou openai
import os
import json

class PlanoAcaoGenerator:
    """
    Gera plano de ação 30-60-90 dias baseado nos indicadores financeiros
    """
    
    def __init__(self):
        # Use Anthropic (Claude) ou OpenAI (GPT)
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        # ou: self.client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def gerar_plano(
        self, 
        indicadores: Dict,
        diagnostico: List[str],
        oportunidades: List[Dict]
    ) -> Dict[str, List[Dict]]:
        """
        Gera plano de ação personalizado baseado nos indicadores
        """
        
        # Montar contexto com os dados financeiros
        contexto = self._montar_contexto(indicadores, diagnostico, oportunidades)
        
        # Prompt estruturado
        prompt = f"""Você é um consultor financeiro especializado em PMEs brasileiras.

Baseado nos dados financeiros abaixo, gere um plano de ação 30-60-90 dias PERSONALIZADO:

{contexto}

INSTRUÇÕES:
1. Gere exatamente 4 ações para cada período (30, 60, 90 dias)
2. As ações devem ser ESPECÍFICAS para os números apresentados, não genéricas
3. Formato JSON rigoroso:

{{
  "30_dias": [
    {{
      "titulo": "Título acionável curto (5-7 palavras)",
      "descricao": "Explique COMO fazer em 1-2 frases práticas, SEM repetir o título",
      "resultado_esperado": "Métrica específica esperada (ex: 'Reduzir PMR em 10 dias')",
      "prioridade": "Alta/Média/Baixa"
    }}
  ],
  "60_dias": [...],
  "90_dias": [...]
}}

REGRAS DE PRIORIDADE:
- Alta: ROE < 0, Margem < 20%, Liquidez < 1.0, Fôlego < 15 dias
- Média: Margem 20-30%, Fôlego 15-30 dias, Liquidez 1.0-1.5
- Baixa: Indicadores saudáveis

FOCO POR PERÍODO:
- 30 dias: Caixa, cobrança, custos urgentes
- 60 dias: Estrutura, rentabilidade, processos
- 90 dias: Crescimento, estratégia, investimentos

RETORNE APENAS O JSON, sem explicações adicionais."""

        try:
            # Chamar API (Claude ou GPT)
            response = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=2000,
                temperature=0.7,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Extrair JSON da resposta
            texto_resposta = response.content[0].text
            plano = json.loads(texto_resposta)
            
            # Validar estrutura
            self._validar_plano(plano)
            
            return plano
            
        except Exception as e:
            print(f"Erro ao gerar plano com IA: {e}")
            # Fallback para plano padrão
            return self._gerar_plano_fallback(indicadores)
    
    def _montar_contexto(
        self, 
        indicadores: Dict,
        diagnostico: List[str],
        oportunidades: List[Dict]
    ) -> str:
        """
        Monta contexto estruturado para o prompt
        """
        
        # Extrair indicadores principais
        margem_bruta = indicadores.get('margem_bruta', 0)
        margem_liquida = indicadores.get('margem_liquida', 0)
        liquidez = indicadores.get('liquidez_corrente', 0)
        roe = indicadores.get('rentabilidade_patrimonio', 0)
        roa = indicadores.get('rentabilidade_ativo', 0)
        pmr = indicadores.get('prazo_medio_recebimento', 0)
        pmp = indicadores.get('prazo_medio_pagamento', 0)
        ciclo_caixa = indicadores.get('ciclo_caixa', 0)
        
        contexto = f"""
INDICADORES FINANCEIROS:
- Margem Bruta: {margem_bruta:.1f}%
- Margem Líquida: {margem_liquida:.1f}%
- Liquidez Corrente: {liquidez:.2f}
- ROE: {roe:.1f}%
- ROA: {roa:.1f}%
- Prazo Médio Recebimento: {pmr:.0f} dias
- Prazo Médio Pagamento: {pmp:.0f} dias
- Ciclo de Caixa: {ciclo_caixa:.0f} dias

DIAGNÓSTICO:
{' '.join(diagnostico)}

PRINCIPAIS OPORTUNIDADES:
{self._formatar_oportunidades(oportunidades)}
"""
        return contexto
    
    def _formatar_oportunidades(self, oportunidades: List[Dict]) -> str:
        """Formata oportunidades para o contexto"""
        if not oportunidades:
            return "Nenhuma oportunidade específica identificada."
        
        texto = ""
        for i, op in enumerate(oportunidades[:3], 1):
            texto += f"\n{i}. {op.get('descricao', '')} (Impacto: {op.get('impacto_percentual', 0):.1f}%)"
        
        return texto
    
    def _validar_plano(self, plano: Dict) -> bool:
        """Valida estrutura do plano gerado"""
        periodos = ['30_dias', '60_dias', '90_dias']
        campos = ['titulo', 'descricao', 'resultado_esperado', 'prioridade']
        
        for periodo in periodos:
            if periodo not in plano:
                raise ValueError(f"Período {periodo} não encontrado no plano")
            
            if len(plano[periodo]) != 4:
                raise ValueError(f"Período {periodo} deve ter exatamente 4 ações")
            
            for acao in plano[periodo]:
                for campo in campos:
                    if campo not in acao:
                        raise ValueError(f"Campo {campo} não encontrado na ação")
        
        return True
    
    def _gerar_plano_fallback(self, indicadores: Dict) -> Dict[str, List[Dict]]:
        """
        Plano padrão caso a IA falhe
        """
        return {
            "30_dias": [
                {
                    "titulo": "Revisar Política de Cobrança",
                    "descricao": "Implementar régua de cobrança com contato a cada 3 dias e desconto de 2% para pagamentos antecipados.",
                    "resultado_esperado": "Reduzir prazo médio de recebimento em 10 dias",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Negociar Prazos com Fornecedores",
                    "descricao": "Conversar com os 5 principais fornecedores para estender prazo de 30 para 45 dias mantendo descontos.",
                    "resultado_esperado": "Melhorar ciclo de caixa em 15 dias",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Mapear Custos Variáveis",
                    "descricao": "Levantar todos os custos ligados às vendas e identificar 3 oportunidades de redução imediata.",
                    "resultado_esperado": "Reduzir custos variáveis em 5-8%",
                    "prioridade": "Média"
                },
                {
                    "titulo": "Implementar Controle Diário de Caixa",
                    "descricao": "Criar rotina de fechamento diário com projeção de 7 dias e alertas para desvios.",
                    "resultado_esperado": "Previsibilidade de caixa e decisões mais rápidas",
                    "prioridade": "Alta"
                }
            ],
            "60_dias": [
                {
                    "titulo": "Implementar Dashboard de KPIs",
                    "descricao": "Automatizar cálculo semanal dos 10 principais indicadores com alertas visuais por e-mail.",
                    "resultado_esperado": "Reduzir tempo de análise de 4h para 30min por semana",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Otimizar Giro de Estoque",
                    "descricao": "Aplicar curva ABC, fazer promoção de itens parados >30 dias e ajustar ponto de pedido.",
                    "resultado_esperado": "Aumentar giro de estoque em 20%",
                    "prioridade": "Média"
                },
                {
                    "titulo": "Avaliar Rentabilidade por Canal",
                    "descricao": "Calcular margem real de cada canal descontando todos os custos específicos.",
                    "resultado_esperado": "Identificar canal com 30%+ de margem para foco",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Revisar Despesas Fixas",
                    "descricao": "Renegociar ou trocar fornecedores de serviços recorrentes (aluguel, energia, software).",
                    "resultado_esperado": "Economizar 10-15% em despesas fixas mensais",
                    "prioridade": "Média"
                }
            ],
            "90_dias": [
                {
                    "titulo": "Estruturar Captação de Capital",
                    "descricao": "Preparar demonstrativo completo e buscar investidor-anjo ou linha de crédito estratégica.",
                    "resultado_esperado": "Captar R$ X para crescimento com ROE >15%",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Criar Reserva de Emergência",
                    "descricao": "Separar 10% do lucro mensal em conta exclusiva até atingir 3 meses de despesas fixas.",
                    "resultado_esperado": "Fôlego de caixa de 90 dias para imprevistos",
                    "prioridade": "Alta"
                },
                {
                    "titulo": "Desenvolver Plano de Crescimento",
                    "descricao": "Definir metas de receita por canal com base em dados históricos e benchmarks setoriais.",
                    "resultado_esperado": "Crescimento de 20-30% anualizado sustentável",
                    "prioridade": "Média"
                },
                {
                    "titulo": "Treinar Equipe em Gestão",
                    "descricao": "Capacitar 3 pessoas-chave para entender KPIs e propor melhorias mensalmente.",
                    "resultado_esperado": "Reduzir dependência do gestor em 40%",
                    "prioridade": "Baixa"
                }
            ]
        }


# Função auxiliar para usar no endpoint
def gerar_plano_acao_inteligente(
    indicadores: Dict,
    diagnostico: List[str],
    oportunidades: List[Dict]
) -> Dict[str, List[Dict]]:
    """
    Wrapper para facilitar uso no endpoint
    """
    generator = PlanoAcaoGenerator()
    return generator.gerar_plano(indicadores, diagnostico, oportunidades)