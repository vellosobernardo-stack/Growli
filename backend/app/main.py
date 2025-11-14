from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# ===== BANCO DE DADOS - NOVO =====
from app.models.database import engine, Base
from app.models.analysis_record import AnalysisRecord

# Criar tabelas no banco
Base.metadata.create_all(bind=engine)
# =================================

# Importar a rota de análise
from app.routes.analise import router as analise_router

# Inicializar aplicação
app = FastAPI(
    title="Leme - API de Análise Financeira",
    description="API para análise financeira de pequenas e microempresas",
    version="1.0.0"
)

# Configurar CORS para permitir requisições do frontend
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Endpoint de teste"""
    return {
        "message": "API Leme - Análise Financeira está funcionando!",
        "status": "online"
    }

@app.get("/health")
async def health_check():
    """Verificar saúde da API"""
    return {"status": "healthy"}

# Incluir rotas de análise
app.include_router(analise_router, prefix="/api", tags=["Análise Financeira"])