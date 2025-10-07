# 🌱 Growli - Análise Financeira Inteligente

## 🚀 Como Rodar

### 1. Instalar Dependências
```bash
cd growli/backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Iniciar o Servidor
```bash
uvicorn app.main:app --reload
```

### 3. Acessar a API
- Swagger: http://localhost:8000/docs
- Health: http://localhost:8000/health

### 4. Testar
```bash
python test_api.py --health
python test_api.py --analysis
```

## 📊 Endpoints

- `POST /api/v1/analysis/calculate` - Análise completa
- `POST /api/v1/scenarios/generate` - Gerar cenários
- `POST /api/v1/upload/pdf` - Upload de PDF
- `GET /api/v1/analysis/benchmarks/{setor}` - Benchmarks

## 🎯 Setores Disponíveis

- comercio_varejo
- servicos
- industria
- tecnologia
- alimentacao
- saude
- educacao
- construcao

## 🔧 Stack

- FastAPI
- Python 3.11+
- Pydantic
- PDFPlumber
- Pandas
