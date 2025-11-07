# 🌱 Leme - Análise Financeira Inteligente

Sistema completo de análise financeira para micro e pequenos empreendedores.

![Leme](https://img.shields.io/badge/Status-Ativo-success)
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
venv\Scripts\activate

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
Leme/
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
PROJECT_NAME=Leme
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

**Email:** suporte@leme.com
**Site:** https://leme.app.br (em breve)

---

## 🎯 Roadmap

- [ ] Dashboard com histórico de análises
- [ ] Exportar relatório PDF
- [ ] Integração com contabilidade
- [ ] App mobile (React Native)
- [ ] Análise com IA (GPT-4)

---

🌱 **Leme - Crescimento financeiro sustentável!**
