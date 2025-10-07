from typing import Dict, List

class SectorBenchmarks:
    BENCHMARKS = {
        "comercio_varejo": {"nome": "Comércio Varejista", "liquidez_corrente": 1.3, "margem_liquida": 4.0, "endividamento_geral": 55.0},
        "servicos": {"nome": "Serviços", "liquidez_corrente": 1.5, "margem_liquida": 8.0, "endividamento_geral": 45.0},
        "industria": {"nome": "Indústria", "liquidez_corrente": 1.6, "margem_liquida": 6.0, "endividamento_geral": 50.0},
        "tecnologia": {"nome": "Tecnologia", "liquidez_corrente": 2.0, "margem_liquida": 15.0, "endividamento_geral": 35.0},
        "alimentacao": {"nome": "Alimentação", "liquidez_corrente": 1.2, "margem_liquida": 5.0, "endividamento_geral": 50.0},
        "saude": {"nome": "Saúde", "liquidez_corrente": 1.7, "margem_liquida": 10.0, "endividamento_geral": 40.0},
        "educacao": {"nome": "Educação", "liquidez_corrente": 1.8, "margem_liquida": 12.0, "endividamento_geral": 40.0},
        "construcao": {"nome": "Construção", "liquidez_corrente": 1.4, "margem_liquida": 5.0, "endividamento_geral": 60.0}
    }
    
    STRATEGIES = {
        "comercio_varejo": ["Foque em alto giro de estoque", "Negocie prazos com fornecedores", "Otimize mix de produtos"],
        "servicos": ["Precifique adequadamente", "Invista em capacitação", "Busque contratos recorrentes"],
        "industria": ["Otimize processo produtivo", "Negocie volume com fornecedores", "Invista em tecnologia"],
        "tecnologia": ["Invista em inovação", "Busque modelo recorrente", "Controle burn rate"],
        "alimentacao": ["Controle validade e perdas", "Negocie compras à vista", "Otimize cardápio"],
        "saude": ["Invista em qualidade", "Negocie com convênios", "Otimize agenda"],
        "educacao": ["Reduza inadimplência", "Invista em qualidade", "Diversifique receitas"],
        "construcao": ["Controle custos de obra", "Negocie prazos", "Mantenha capital de giro"]
    }
    
    @classmethod
    def get_benchmarks(cls, setor: str) -> Dict:
        if setor.lower() not in cls.BENCHMARKS:
            raise ValueError(f"Setor '{setor}' não encontrado")
        return cls.BENCHMARKS[setor.lower()].copy()
    
    @classmethod
    def get_sector_strategies(cls, setor: str) -> List[str]:
        return cls.STRATEGIES.get(setor.lower(), ["Mantenha controle do fluxo de caixa", "Invista em diferenciação"])
