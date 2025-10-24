from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importar a rota de análise
from app.routes.analise import router as analise_router

# Inicializar aplicação
app = FastAPI(
    title="Growli - API de Análise Financeira",
    description="API para análise financeira de pequenas e microempresas",
    version="1.0.0"
)

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL do seu frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Endpoint de teste"""
    return {
        "message": "API Growli - Análise Financeira está funcionando!",
        "status": "online"
    }

@app.get("/health")
async def health_check():
    """Verificar saúde da API"""
    return {"status": "healthy"}

# Incluir rotas de análise
app.include_router(analise_router, prefix="/api", tags=["Análise Financeira"])
