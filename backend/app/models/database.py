from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Pega a URL do banco
DATABASE_URL = os.getenv("DATABASE_URL")

# Se não tiver DATABASE_URL (local), usa SQLite
if not DATABASE_URL:
    DATABASE_URL = "sqlite:///./leme_local.db"
else:
    # Railway usa postgres://, mas SQLAlchemy precisa de postgresql://
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://")

# Criar engine
# Para SQLite, precisa do check_same_thread=False
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# Criar sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

# Função para pegar sessão
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()