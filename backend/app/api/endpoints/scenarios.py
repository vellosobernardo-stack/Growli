from fastapi import APIRouter, HTTPException
from app.models.schemas import DadosFinanceirosInput, Cenario, SuccessResponse
from app.services.scenario_generator import ScenarioGenerator
from app.services.financial_calc import FinancialCalculator
from app.services.sector_benchmarks import SectorBenchmarks
from typing import List

router = APIRouter()

@router.post("/generate", response_model=List[Cenario])
async def gerar_cenarios(dados: DadosFinanceirosInput):
    try:
        calculator = FinancialCalculator(dados)
        indicadores = calculator.calcular_indicadores()
        scenario_gen = ScenarioGenerator(dados, indicadores)
        return scenario_gen.gerar_cenarios()
    except Exception as e:
        raise HTTPException(500, f"Erro: {str(e)}")

@router.post("/custom", response_model=Cenario)
async def gerar_cenario_customizado(dados: DadosFinanceirosInput, taxa_crescimento: float):
    try:
        calculator = FinancialCalculator(dados)
        indicadores = calculator.calcular_indicadores()
        scenario_gen = ScenarioGenerator(dados, indicadores)
        return scenario_gen.gerar_cenario_customizado(taxa_crescimento)
    except Exception as e:
        raise HTTPException(500, f"Erro: {str(e)}")

@router.get("/strategies/{setor}")
async def obter_estrategias_setor(setor: str):
    try:
        estrategias = SectorBenchmarks.get_sector_strategies(setor)
        return SuccessResponse(message=f"Estratégias para {setor}", data={"strategies": estrategias})
    except ValueError as e:
        raise HTTPException(404, str(e))
