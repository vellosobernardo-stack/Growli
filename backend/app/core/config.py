from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Growli"
    
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "https://growli.com",
    ]
    
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024
    ALLOWED_EXTENSIONS: List[str] = [".pdf"]
    UPLOAD_DIR: str = "uploads"
    
    MIN_CONFIDENCE_SCORE: float = 0.7
    
    AVAILABLE_SECTORS: List[str] = [
        "comercio_varejo", "servicos", "industria", "tecnologia",
        "alimentacao", "saude", "educacao", "construcao"
    ]
    
    SCENARIO_OPTIMISTIC_GROWTH: float = 0.20
    SCENARIO_NEUTRAL_GROWTH: float = 0.05
    SCENARIO_PESSIMISTIC_GROWTH: float = -0.10
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
