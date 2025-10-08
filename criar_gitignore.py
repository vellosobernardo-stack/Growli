"""
📝 CRIAR .GITIGNORE PARA GROWLI
Salve como: criar_gitignore.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho}")

print("📝 Criando .gitignore...\n")

# ============================================
# .GITIGNORE PRINCIPAL (RAIZ DO PROJETO)
# ============================================
gitignore_raiz = """# ========================================
# GROWLI - Git Ignore
# ========================================

# ===== PYTHON (BACKEND) =====
backend/__pycache__/
backend/**/__pycache__/
backend/*.py[cod]
backend/*$py.class
backend/*.so
backend/.Python
backend/venv/
backend/env/
backend/ENV/
backend/.env
backend/*.db
backend/*.sqlite
backend/uploads/*
!backend/uploads/.gitkeep

# ===== NODE.JS (FRONTEND) =====
frontend/node_modules/
frontend/.next/
frontend/out/
frontend/build/
frontend/dist/
frontend/.env.local
frontend/.env.production.local
frontend/.vercel
frontend/*.tsbuildinfo
frontend/next-env.d.ts

# ===== IDEs =====
.vscode/
.idea/
*.swp
*.swo
*~

# ===== SISTEMA =====
.DS_Store
Thumbs.db
desktop.ini

# ===== LOGS =====
*.log
logs/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# ===== TESTES =====
.coverage
htmlcov/
.pytest_cache/
*.cover
.hypothesis/

# ===== OUTROS =====
*.bak
*.tmp
.cache/
"""
criar_arquivo(".gitignore", gitignore_raiz)

# ============================================
# .GITKEEP PARA PASTA UPLOADS
# ============================================
criar_arquivo("backend/uploads/.gitkeep", "")

# ============================================
# README.MD
# ============================================
readme = """# 🌱 Growli - Análise Financeira Inteligente

Sistema completo de análise financeira para micro e pequenos empreendedores.

![Growli](https://img.shields.io/badge/Status-Ativo-success)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## 📊 Funcionalidades

- ✅ **Análise Financeira Completa**: 17 indicadores essenciais
- ✅ **21 Setores CNAE**: Análise personalizada por setor
- ✅ **Cenários de Projeção**: Otimista, Neutro e Pessimista
- ✅ **Estratégias Personalizadas**: Recomendações baseadas nos seus dados
- ✅ **5 Gráficos Interativos**: Visualizações profissionais
- ✅ **Upload de PDF**: Extração automática de Balanço/DRE
- ✅ **Score de Saúde**: 0-100 baseado em múltiplos critérios

---

## 🚀 Como Rodar

### 1️⃣ Pré-requisitos

- Python 3.11+
- Node.js 18+
- Git

### 2️⃣ Backend (FastAPI)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\\Scripts\\activate

# Ativar (Mac/Linux)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Rodar servidor
uvicorn app.main:app --reload
```

✅ **Backend:** http://localhost:8000
📚 **Swagger:** http://localhost:8000/docs

### 3️⃣ Frontend (Next.js)

```bash
cd frontend

# Instalar dependências
npm install

# Rodar servidor
npm run dev
```

✅ **Frontend:** http://localhost:3000

---

## 🏗️ Estrutura do Projeto

```
growli/
├── backend/                 # API FastAPI + Python
│   ├── app/
│   │   ├── api/            # Endpoints
│   │   ├── core/           # Configurações
│   │   ├── models/         # Schemas Pydantic
│   │   └── services/       # Lógica de negócio
│   ├── uploads/            # PDFs enviados
│   └── requirements.txt
│
└── frontend/               # App Next.js + React
    ├── app/                # Páginas (App Router)
    ├── components/         # Componentes React
    ├── hooks/              # Custom hooks
    ├── utils/              # Helpers
    └── types/              # TypeScript types
```

---

## 📈 Indicadores Calculados

### Liquidez
- Liquidez Corrente
- Liquidez Seca
- Liquidez Imediata

### Rentabilidade
- Margem Bruta
- Margem Operacional
- Margem Líquida
- ROE (Return on Equity)
- ROA (Return on Assets)

### Endividamento
- Endividamento Geral
- Composição do Endividamento

### Atividade
- Giro de Estoque
- Prazo Médio de Recebimento (PMR)
- Prazo Médio de Pagamento (PMP)
- Ciclo de Caixa

### Capital
- Capital de Giro
- Necessidade de Capital de Giro (NCG)

---

## 🎨 Stack Tecnológico

### Backend
- **FastAPI** - Framework web moderno
- **Pydantic** - Validação de dados
- **PDFPlumber** - Extração de PDF
- **Pandas** - Processamento de dados

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos
- **React Hook Form** - Formulários

---

## 🧪 Dados de Teste

```json
{
  "caixa": 5000000,
  "contas_receber": 3000000,
  "estoque": 2000000,
  "imobilizado": 10000000,
  "fornecedores": 2500000,
  "emprestimos_cp": 1500000,
  "impostos": 500000,
  "emprestimos_lp": 3000000,
  "receita_bruta": 15000000,
  "custo_vendas": 8000000,
  "despesas_operacionais": 4000000,
  "despesas_financeiras": 500000,
  "setor": "informacao_comunicacao",
  "estado": "SP",
  "periodo_referencia": "2024-12"
}
```

**Score esperado:** ~75/100

---

## 🔧 Variáveis de Ambiente

### Backend: `.env`
```bash
DEBUG=True
API_V1_STR=/api/v1
PROJECT_NAME=Growli
```

### Frontend: `.env.local`
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📝 Endpoints da API

```
POST   /api/v1/analysis/calculate    # Calcular análise
POST   /api/v1/scenarios/generate    # Gerar cenários
POST   /api/v1/upload/pdf            # Upload de PDF
GET    /api/v1/analysis/benchmarks/:setor  # Benchmarks
GET    /health                        # Health check
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

## 📞 Contato

**Email:** suporte@growli.com
**Site:** https://growli.com (em breve)

---

## 🎯 Roadmap

- [ ] Dashboard com histórico de análises
- [ ] Exportar relatório PDF
- [ ] Integração com contabilidade
- [ ] App mobile (React Native)
- [ ] Análise com IA (GPT-4)

---

🌱 **Growli - Fazendo seu negócio crescer!**
"""
criar_arquivo("README.md", readme)

print("\n✅ ARQUIVOS CRIADOS!")
print("\n📋 Próximos passos:")
print("1. git init")
print("2. git add .")
print("3. git commit -m 'Initial commit'")
print("4. Criar repositório no GitHub")
print("5. git remote add origin URL_DO_REPOSITORIO")
print("6. git push -u origin main")