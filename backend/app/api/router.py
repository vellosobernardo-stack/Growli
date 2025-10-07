from fastapi import APIRouter
from app.api.endpoints import upload, analysis, scenarios

api_router = APIRouter()

api_router.include_router(upload.router, prefix="/upload", tags=["Upload"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Análise Financeira"])
api_router.include_router(scenarios.router, prefix="/scenarios", tags=["Cenários e Estratégias"])
