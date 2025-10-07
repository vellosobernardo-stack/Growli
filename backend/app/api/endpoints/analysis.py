from fastapi import APIRouter, HTTPException
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
        calculator = FinancialCalculator(dados)
        indicadores = calculator.calcular_indicadores()
        benchmarks = SectorBenchmarks.get_benchmarks(dados.setor)
        diagnostico = calculator.gerar_diagnostico(indicadores, benchmarks)
        score = calculator.calcular_score_saude(indicadores, benchmarks)
        
        scenario_gen = ScenarioGenerator(dados, indicadores)
        cenarios = scenario_gen.gerar_cenarios()
        
        return ResultadoAnalise(
            id_analise=str(uuid.uuid4()),
            data_analise=datetime.now(),
            setor=dados.setor,
            dados_input=dados,
            indicadores=indicadores,
            cenarios=cenarios,
            pontos_fortes=diagnostico['pontos_fortes'],
            pontos_atencao=diagnostico['pontos_atencao'],
            acoes_prioritarias=diagnostico['acoes_prioritarias'],
            saude_financeira_score=score
        )
    except Exception as e:
        raise HTTPException(500, f"Erro: {str(e)}")

@router.get("/benchmarks/{setor}")
async def obter_benchmarks(setor: str):
    try:
        benchmarks = SectorBenchmarks.get_benchmarks(setor)
        return SuccessResponse(message=f"Benchmarks do setor {setor}", data=benchmarks)
    except ValueError as e:
        raise HTTPException(404, str(e))
