from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from app.models.database import Base

class AnalysisRecord(Base):
    __tablename__ = "analises"
    
    # ID automático (1, 2, 3...)
    id = Column(Integer, primary_key=True, index=True)
    
    # Dados do cliente
    email = Column(String, index=True, nullable=False)
    empresa = Column(String, nullable=True)
    
    # Dados financeiros que o cliente preencheu (tudo em JSON)
    dados_financeiros = Column(JSON, nullable=False)
    
    # Informações extras
    setor = Column(String, nullable=True)
    periodo_referencia = Column(String, nullable=True)
    
    # Data de criação automática
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f"<Análise #{self.id} - {self.email} - {self.empresa}>"