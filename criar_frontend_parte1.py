"""
🌱 GROWLI - FRONTEND PARTE 1
Base + Componentes UI
Salve como: criar_frontend_parte1.py
"""
import os

def criar_pasta(caminho):
    os.makedirs(caminho, exist_ok=True)

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("🌱 GROWLI - Criando Frontend Parte 1...\n")

# Criar pastas
pastas = [
    "frontend/app/analise",
    "frontend/app/resultado", 
    "frontend/components/ui",
    "frontend/components/charts",
    "frontend/components/forms",
    "frontend/hooks",
    "frontend/utils",
    "frontend/types"
]

for pasta in pastas:
    criar_pasta(pasta)

# ============================================
# PACKAGE.JSON
# ============================================
package = """{
  "name": "growli-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.49.3",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "recharts": "^2.10.3",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10"
  }
}"""
criar_arquivo("frontend/package.json", package)

# ============================================
# TSCONFIG
# ============================================
tsconfig = """{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "esnext"],
    "strict": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}"""
criar_arquivo("frontend/tsconfig.json", tsconfig)

# ============================================
# TAILWIND CONFIG
# ============================================
tailwind = """import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#22c55e', 600: '#16a34a', 700: '#15803d' },
        neutral: { 100: '#f5f5f5', 200: '#e5e5e5', 600: '#737373', 900: '#171717' }
      }
    }
  }
}
export default config"""
criar_arquivo("frontend/tailwind.config.ts", tailwind)

# ============================================
# NEXT CONFIG
# ============================================
nextconf = """module.exports = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000' }
}"""
criar_arquivo("frontend/next.config.js", nextconf)

# ============================================
# POSTCSS
# ============================================
postcss = """module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }"""
criar_arquivo("frontend/postcss.config.js", postcss)

# ============================================
# ENV
# ============================================
env = """NEXT_PUBLIC_API_URL=http://localhost:8000"""
criar_arquivo("frontend/.env.local", env)

# ============================================
# TYPES
# ============================================
types = """export type SetorEnum = 'comercio_varejo' | 'servicos' | 'industria' | 'tecnologia'

export interface DadosFinanceiros {
  caixa: number
  contas_receber: number
  estoque: number
  imobilizado: number
  fornecedores: number
  emprestimos_cp: number
  impostos: number
  emprestimos_lp: number
  receita_bruta: number
  custo_vendas: number
  despesas_operacionais: number
  despesas_financeiras: number
  setor: SetorEnum
  periodo_referencia: string
}

export interface Indicadores {
  liquidez_corrente: number
  margem_liquida: number
  capital_giro: number
  endividamento_geral: number
  giro_estoque: number
  prazo_medio_recebimento: number
}

export interface Cenario {
  tipo: 'otimista' | 'neutro' | 'pessimista'
  receita_projetada: number
  lucro_projetado: number
  recomendacoes: string[]
}

export interface ResultadoAnalise {
  id_analise: string
  setor: SetorEnum
  indicadores: Indicadores
  cenarios: Cenario[]
  pontos_fortes: string[]
  pontos_atencao: string[]
  acoes_prioritarias: string[]
  saude_financeira_score: number
}"""
criar_arquivo("frontend/types/index.ts", types)

# ============================================
# UTILS - FORMAT
# ============================================
format_ts = """export const formatBRL = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
export const formatPercent = (v: number) => `${v.toFixed(1)}%`
export const formatNumber = (v: number) => v.toFixed(2)"""
criar_arquivo("frontend/utils/format.ts", format_ts)

# ============================================
# UTILS - API
# ============================================
api = """const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  })
  if (!res.ok) throw new Error('API Error')
  return res.json()
}"""
criar_arquivo("frontend/utils/api.ts", api)

# ============================================
# HOOKS - useIndicators
# ============================================
hook = """'use client'
import { useState } from 'react'
import { apiCall } from '@/utils/api'
import { DadosFinanceiros, ResultadoAnalise } from '@/types'

export function useIndicators() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ResultadoAnalise | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcular = async (dados: DadosFinanceiros) => {
    setLoading(true)
    try {
      const res = await apiCall<ResultadoAnalise>('/api/v1/analysis/calculate', {
        method: 'POST',
        body: JSON.stringify(dados)
      })
      setData(res)
      setLoading(false)
      return res
    } catch (e) {
      setError('Erro ao calcular')
      setLoading(false)
      throw e
    }
  }

  return { calcular, loading, data, error }
}"""
criar_arquivo("frontend/hooks/useIndicators.ts", hook)

# ============================================
# COMPONENTES UI - Card
# ============================================
card = """import { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <div className={`bg-white rounded-lg border p-6 ${className}`}>{children}</div>
}"""
criar_arquivo("frontend/components/ui/Card.tsx", card)

# ============================================
# COMPONENTES UI - Button
# ============================================
button = """import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  loading?: boolean
}

export function Button({ children, variant = 'primary', loading, className = '', ...props }: Props) {
  const base = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
  }
  
  return (
    <button 
      className={`${base} ${variants[variant]} ${className}`} 
      disabled={loading} 
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}"""
criar_arquivo("frontend/components/ui/Button.tsx", button)

# ============================================
# COMPONENTES UI - Input
# ============================================
input_comp = """import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input 
        ref={ref}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" 
        {...props} 
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'"""
criar_arquivo("frontend/components/ui/Input.tsx", input_comp)

# ============================================
# COMPONENTES UI - Select
# ============================================
select = """import { forwardRef, SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <select ref={ref} className="w-full px-3 py-2 border rounded-lg" {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
)
Select.displayName = 'Select'"""
criar_arquivo("frontend/components/ui/Select.tsx", select)

# ============================================
# COMPONENTES UI - KPI
# ============================================
kpi = """interface Props {
  label: string
  value: string | number
  status?: 'ok' | 'warning' | 'critical'
}

export function KPI({ label, value, status = 'ok' }: Props) {
  const colors = {
    ok: 'border-green-500 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50',
    critical: 'border-red-500 bg-red-50'
  }
  
  return (
    <div className={`p-4 rounded-lg border-l-4 ${colors[status]}`}>
      <div className="text-sm text-neutral-600 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}"""
criar_arquivo("frontend/components/ui/KPI.tsx", kpi)

print("\n✅ PARTE 1 CONCLUÍDA!")
print("\n📝 Próximo: Execute criar_frontend_parte2.py")