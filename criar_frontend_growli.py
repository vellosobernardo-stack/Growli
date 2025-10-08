"""
🌱 GROWLI - MEGA SCRIPT FRONTEND COMPLETO
Cria todo o frontend Next.js + TypeScript + Tailwind

COMO USAR:
1. Salve como: criar_frontend_growli.py
2. Execute na pasta growli/: python criar_frontend_growli.py
3. Siga as instruções no final
"""
import os

def criar_pasta(caminho):
    os.makedirs(caminho, exist_ok=True)

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("""
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🌱 GROWLI - SETUP FRONTEND COMPLETO                  ║
║                                                              ║
║  Next.js 14 + TypeScript + Tailwind CSS                     ║
║  Tempo estimado: 15-20 segundos                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
""")

input("Pressione ENTER para criar o frontend...")

print("\n📁 Criando estrutura...\n")

# Estrutura de pastas
pastas = [
    "frontend/app",
    "frontend/app/analise",
    "frontend/app/resultado",
    "frontend/components/ui",
    "frontend/components/charts",
    "frontend/components/forms",
    "frontend/components/layout",
    "frontend/hooks",
    "frontend/utils",
    "frontend/types",
    "frontend/public/images"
]

for pasta in pastas:
    criar_pasta(pasta)

print("\n📝 Criando arquivos de configuração...\n")

# ============================================
# PACKAGE.JSON
# ============================================
package_json = """{
  "name": "growli-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0"
  }
}
"""
criar_arquivo("frontend/package.json", package_json)

# ============================================
# TSCONFIG.JSON
# ============================================
tsconfig = """{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"""
criar_arquivo("frontend/tsconfig.json", tsconfig)

# ============================================
# TAILWIND.CONFIG.TS
# ============================================
tailwind_config = """import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          500: '#737373',
          700: '#404040',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
"""
criar_arquivo("frontend/tailwind.config.ts", tailwind_config)

# ============================================
# NEXT.CONFIG.JS
# ============================================
next_config = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
"""
criar_arquivo("frontend/next.config.js", next_config)

# ============================================
# POSTCSS.CONFIG.JS
# ============================================
postcss = """module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"""
criar_arquivo("frontend/postcss.config.js", postcss)

# ============================================
# .ENV.LOCAL
# ============================================
env_local = """NEXT_PUBLIC_API_URL=http://localhost:8000
"""
criar_arquivo("frontend/.env.local", env_local)

print("\n⏳ Criando tipos TypeScript...\n")

# ============================================
# TYPES/INDEX.TS
# ============================================
types = """export type SetorEnum = 
  | 'comercio_varejo'
  | 'servicos'
  | 'industria'
  | 'tecnologia'
  | 'alimentacao'
  | 'saude'
  | 'educacao'
  | 'construcao'

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
  liquidez_seca: number
  liquidez_imediata: number
  margem_bruta: number
  margem_operacional: number
  margem_liquida: number
  endividamento_geral: number
  composicao_endividamento: number
  giro_estoque: number
  prazo_medio_recebimento: number
  capital_giro: number
  necessidade_capital_giro: number
}

export interface Cenario {
  tipo: 'otimista' | 'neutro' | 'pessimista'
  taxa_crescimento: number
  receita_projetada: number
  lucro_projetado: number
  necessidade_capital: number
  recomendacoes: string[]
}

export interface ResultadoAnalise {
  id_analise: string
  data_analise: string
  setor: SetorEnum
  dados_input: DadosFinanceiros
  indicadores: Indicadores
  cenarios: Cenario[]
  pontos_fortes: string[]
  pontos_atencao: string[]
  acoes_prioritarias: string[]
  saude_financeira_score: number
}
"""
criar_arquivo("frontend/types/index.ts", types)

print("\n⏳ Criando utilitários...\n")

# ============================================
# UTILS/FORMAT.TS
# ============================================
format_ts = """export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export const formatDias = (value: number): string => {
  return `${Math.round(value)} dias`
}

export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
"""
criar_arquivo("frontend/utils/format.ts", format_ts)

# ============================================
# UTILS/API.TS
# ============================================
api_ts = """const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 30000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, await response.text())
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new Error('Erro de conexão com o servidor')
  }
}

export async function uploadPDF(file: File, setor: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('setor', setor)

  const response = await fetchWithTimeout(`${API_URL}/api/v1/upload/pdf`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new ApiError(response.status, 'Erro ao fazer upload')
  }

  return await response.json()
}
"""
criar_arquivo("frontend/utils/api.ts", api_ts)

print("\n⏳ Criando hooks...\n")

# ============================================
# HOOKS/USEINDICATORS.TS
# ============================================
use_indicators = """'use client'
import { useState } from 'react'
import { apiCall } from '@/utils/api'
import { DadosFinanceiros, ResultadoAnalise } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useIndicators() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<ResultadoAnalise | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcular = async (dados: DadosFinanceiros) => {
    setStatus('loading')
    setError(null)
    
    try {
      const resultado = await apiCall<ResultadoAnalise>(
        '/api/v1/analysis/calculate',
        {
          method: 'POST',
          body: JSON.stringify(dados),
        }
      )
      
      setData(resultado)
      setStatus('success')
      return resultado
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao calcular'
      setError(message)
      setStatus('error')
      throw err
    }
  }

  const reset = () => {
    setStatus('idle')
    setData(null)
    setError(null)
  }

  return {
    calcular,
    reset,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
"""
criar_arquivo("frontend/hooks/useIndicators.ts", use_indicators)

# ============================================
# HOOKS/USEUPLOAD.TS
# ============================================
use_upload = """'use client'
import { useState } from 'react'
import { uploadPDF } from '@/utils/api'

type Status = 'idle' | 'uploading' | 'success' | 'error'

export function useUpload() {
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  const upload = async (file: File, setor: string) => {
    setStatus('uploading')
    setProgress(0)
    setError(null)

    try {
      // Simular progresso
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadPDF(file, setor)
      
      clearInterval(interval)
      setProgress(100)
      setData(result)
      setStatus('success')
      
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro no upload'
      setError(message)
      setStatus('error')
      throw err
    }
  }

  const reset = () => {
    setStatus('idle')
    setProgress(0)
    setError(null)
    setData(null)
  }

  return {
    upload,
    reset,
    status,
    progress,
    error,
    data,
    isUploading: status === 'uploading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
"""
criar_arquivo("frontend/hooks/useUpload.ts", use_upload)

print("\n⏳ Criando componentes UI base...\n")

# ============================================
# COMPONENTS/UI/CARD.TSX
# ============================================
card = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export function Card({ 
  children, 
  className, 
  padding = 'md',
  hover = false 
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-neutral-200',
        'shadow-sm',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
          'hover:shadow-md transition-shadow': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/Card.tsx", card)

# ============================================
# COMPONENTS/UI/BUTTON.TSX
# ============================================
button = """import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center',
        'font-medium rounded-lg',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200': variant === 'secondary',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
          'text-neutral-700 hover:bg-neutral-100': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
"""
criar_arquivo("frontend/components/ui/Button.tsx", button)

# ============================================
# COMPONENTS/UI/KPI.TSX
# ============================================
kpi = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface KPIProps {
  label: string
  value: string | number
  icon?: ReactNode
  status?: 'ok' | 'warning' | 'critical'
  subtitle?: string
  tooltip?: string
}

export function KPI({ label, value, icon, status, subtitle, tooltip }: KPIProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-l-4',
        {
          'border-primary-500 bg-primary-50': status === 'ok' || !status,
          'border-yellow-500 bg-yellow-50': status === 'warning',
          'border-red-500 bg-red-50': status === 'critical',
        }
      )}
      title={tooltip}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-neutral-900">{value}</div>
      {subtitle && (
        <div className="text-xs text-neutral-500 mt-1">{subtitle}</div>
      )}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/KPI.tsx", kpi)

# Continua na próxima parte devido ao limite de caracteres...

# Continua na próxima parte devido ao limite de caracteres...

# ============================================
# COMPONENTS/UI/INPUT.TSX
# ============================================
input_component = """import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error ? 'border-red-500' : 'border-neutral-300',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
"""
criar_arquivo("frontend/components/ui/Input.tsx", input_component)

# ============================================
# COMPONENTS/UI/SELECT.TSX
# ============================================
select_component = """import { SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary-500',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error ? 'border-red-500' : 'border-neutral-300',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
"""
criar_arquivo("frontend/components/ui/Select.tsx", select_component)

# ============================================
# COMPONENTS/UI/PILL.TSX
# ============================================
pill = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface PillProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export function Pill({ children, variant = 'default' }: PillProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-neutral-100 text-neutral-800': variant === 'default',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'error',
        }
      )}
    >
      {children}
    </span>
  )
}
"""
criar_arquivo("frontend/components/ui/Pill.tsx", pill)

# ============================================
# COMPONENTS/UI/STATUSBANNER.TSX
# ============================================
status_banner = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface StatusBannerProps {
  children: ReactNode
  type: 'info' | 'success' | 'warning' | 'error'
  onClose?: () => void
}

export function StatusBanner({ children, type, onClose }: StatusBannerProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-l-4 flex items-start justify-between',
        {
          'bg-blue-50 border-blue-500 text-blue-800': type === 'info',
          'bg-green-50 border-green-500 text-green-800': type === 'success',
          'bg-yellow-50 border-yellow-500 text-yellow-800': type === 'warning',
          'bg-red-50 border-red-500 text-red-800': type === 'error',
        }
      )}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-50 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/StatusBanner.tsx", status_banner)

# ============================================
# COMPONENTS/UI/GRID.TSX
# ============================================
grid = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Grid({ children, cols = 3, gap = 'md', className }: GridProps) {
  return (
    <div
      className={clsx(
        'grid',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
          'gap-4': gap === 'sm',
          'gap-6': gap === 'md',
          'gap-8': gap === 'lg',
        },
        className
      )}
    >
      {children}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/Grid.tsx", grid)

print("\n⏳ Criando componentes de charts...\n")

# ============================================
# COMPONENTS/CHARTS/CHARTREVENUESCENARIO.TSX
# ============================================
chart_revenue = """'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatBRL } from '@/utils/format'
import { Cenario } from '@/types'

interface ChartRevenueScenarioProps {
  cenarios: Cenario[]
  receitaAtual: number
}

export function ChartRevenueScenario({ cenarios, receitaAtual }: ChartRevenueScenarioProps) {
  const data = [
    {
      name: 'Atual',
      receita: receitaAtual,
    },
    ...cenarios.map(c => ({
      name: c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1),
      receita: c.receita_projetada,
    }))
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => formatBRL(value)} />
        <Tooltip formatter={(value: number) => formatBRL(value)} />
        <Legend />
        <Bar dataKey="receita" fill="#22c55e" name="Receita" />
      </BarChart>
    </ResponsiveContainer>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartRevenueScenario.tsx", chart_revenue)

# ============================================
# COMPONENTS/CHARTS/CHARTCCC.TSX
# ============================================
chart_ccc = """'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatDias } from '@/utils/format'

interface ChartCCCProps {
  pmr: number  // Prazo Médio Recebimento
  pme: number  // Prazo Médio Estoque
  pmp: number  // Prazo Médio Pagamento
}

export function ChartCCC({ pmr, pme, pmp }: ChartCCCProps) {
  const data = [
    { name: 'PMR', dias: pmr, color: '#3b82f6' },
    { name: 'PME', dias: pme, color: '#8b5cf6' },
    { name: 'PMP', dias: pmp, color: '#ef4444' },
  ]

  const ccc = pmr + pme - pmp

  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}d`} />
          <Tooltip formatter={(value: number) => formatDias(value)} />
          <Bar dataKey="dias" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600">Ciclo de Caixa</p>
        <p className="text-2xl font-bold text-neutral-900">{formatDias(ccc)}</p>
      </div>
    </div>
  )
}
"""
criar_arquivo("frontend/components/charts/ChartCCC.tsx", chart_ccc)

print("\n⏳ Criando componentes de formulários...\n")

# ============================================
# COMPONENTS/FORMS/UPLOADFORM.TSX
# ============================================
upload_form = """'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { StatusBanner } from '@/components/ui/StatusBanner'
import { useUpload } from '@/hooks/useUpload'

const SETORES = [
  { value: 'comercio_varejo', label: 'Comércio Varejista' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'construcao', label: 'Construção' },
]

interface UploadFormProps {
  onSuccess: (data: any) => void
}

export function UploadForm({ onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [setor, setSetor] = useState('comercio_varejo')
  const { upload, isUploading, progress, error } = useUpload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      const result = await upload(file, setor)
      onSuccess(result)
    } catch (err) {
      // Error já está no state
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <div className="text-4xl mb-4">📄</div>
          <p className="text-lg font-medium text-neutral-700 mb-2">
            {file ? file.name : 'Arraste seu PDF aqui'}
          </p>
          <p className="text-sm text-neutral-500">
            ou clique para selecionar
          </p>
        </label>
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-neutral-600 mt-2">{progress}%</p>
          </div>
        )}
      </div>

      <Select
        label="Setor de Atuação"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        options={SETORES}
        disabled={isUploading}
      />

      {error && (
        <StatusBanner type="error">
          {error}
        </StatusBanner>
      )}

      <Button
        type="submit"
        fullWidth
        disabled={!file || isUploading}
        loading={isUploading}
      >
        Analisar PDF
      </Button>
    </form>
  )
}
"""
criar_arquivo("frontend/components/forms/UploadForm.tsx", upload_form)

# ============================================
# COMPONENTS/FORMS/MANUALINPUTFORM.TSX (VERSÃO COMPACTA)
# ============================================
manual_form = """'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { DadosFinanceiros } from '@/types'

const SETORES = [
  { value: 'comercio_varejo', label: 'Comércio Varejista' },
  { value: 'servicos', label: 'Serviços' },
]

interface ManualInputFormProps {
  onSubmit: (data: DadosFinanceiros) => void
  isLoading?: boolean
}

export function ManualInputForm({ onSubmit, isLoading }: ManualInputFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DadosFinanceiros>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Balanço Patrimonial</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Caixa (R$)" type="number" step="0.01" {...register('caixa', { required: true, valueAsNumber: true })} />
          <Input label="Contas a Receber (R$)" type="number" step="0.01" {...register('contas_receber', { required: true, valueAsNumber: true })} />
          <Input label="Estoque (R$)" type="number" step="0.01" {...register('estoque', { required: true, valueAsNumber: true })} />
          <Input label="Imobilizado (R$)" type="number" step="0.01" {...register('imobilizado', { required: true, valueAsNumber: true })} />
          <Input label="Fornecedores (R$)" type="number" step="0.01" {...register('fornecedores', { required: true, valueAsNumber: true })} />
          <Input label="Empréstimos CP (R$)" type="number" step="0.01" {...register('emprestimos_cp', { required: true, valueAsNumber: true })} />
          <Input label="Impostos (R$)" type="number" step="0.01" {...register('impostos', { required: true, valueAsNumber: true })} />
          <Input label="Empréstimos LP (R$)" type="number" step="0.01" {...register('emprestimos_lp', { required: true, valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">DRE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Receita Bruta (R$)" type="number" step="0.01" {...register('receita_bruta', { required: true, valueAsNumber: true })} />
          <Input label="Custo das Vendas (R$)" type="number" step="0.01" {...register('custo_vendas', { required: true, valueAsNumber: true })} />
          <Input label="Despesas Operacionais (R$)" type="number" step="0.01" {...register('despesas_operacionais', { required: true, valueAsNumber: true })} />
          <Input label="Despesas Financeiras (R$)" type="number" step="0.01" {...register('despesas_financeiras', { required: true, valueAsNumber: true })} />
        </div>
      </div>

      <Select label="Setor" {...register('setor', { required: true })} options={SETORES} />
      <Input label="Período" placeholder="Ex: 2024-12" {...register('periodo_referencia', { required: true })} />

      <Button type="submit" fullWidth loading={isLoading}>
        Calcular Indicadores
      </Button>
    </form>
  )
}
"""
criar_arquivo("frontend/components/forms/ManualInputForm.tsx", manual_form)

print("\n⏳ Criando páginas...\n")

# ============================================
# APP/GLOBALS.CSS
# ============================================
globals_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

@layer base {
  html {
    @apply antialiased;
  }
  
  body {
    @apply bg-neutral-50 text-neutral-900;
  }
}

@layer utilities {
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
"""
criar_arquivo("frontend/app/globals.css", globals_css)

# ============================================
# APP/LAYOUT.TSX
# ============================================
layout = """import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Growli - Análise Financeira Inteligente',
  description: 'Análise financeira automatizada para micro e pequenos empreendedores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="bg-white border-b border-neutral-200">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary-600">🌱 Growli</h1>
              <nav className="space-x-4">
                <a href="/" className="text-neutral-600 hover:text-neutral-900">Início</a>
                <a href="/analise" className="text-neutral-600 hover:text-neutral-900">Análise</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-neutral-900 text-white py-8 mt-20">
          <div className="container-custom text-center">
            <p>© 2025 Growli - Fazendo seu negócio crescer</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
"""
criar_arquivo("frontend/app/layout.tsx", layout)

# ============================================
# APP/PAGE.TSX (HOME)
# ============================================
home_page = """import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="container-custom py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl font-bold text-neutral-900 mb-6">
          Análise Financeira Inteligente<br />
          para Seu Negócio Crescer 🌱
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Entenda seus números em 5 minutos.<br />
          Upload de PDF ou preenchimento manual.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/analise">
            <Button size="lg">📤 Upload de PDF</Button>
          </Link>
          <Link href="/analise?tab=manual">
            <Button variant="outline" size="lg">✏️ Preencher Manual</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <Card className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-semibold mb-2">12 Indicadores</h3>
          <p className="text-sm text-neutral-600">Liquidez, rentabilidade, endividamento</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="font-semibold mb-2">3 Cenários</h3>
          <p className="text-sm text-neutral-600">Otimista, neutro, pessimista</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="font-semibold mb-2">Benchmarks</h3>
          <p className="text-sm text-neutral-600">Compare com seu setor</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="font-semibold mb-2">Estratégias</h3>
          <p className="text-sm text-neutral-600">Ações práticas personalizadas</p>
        </Card>
      </div>
    </div>
  )
}
"""
criar_arquivo("frontend/app/page.tsx", home_page)

# ============================================
# APP/ANALISE/PAGE.TSX
# ============================================
analise_page = """'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { UploadForm } from '@/components/forms/UploadForm'
import { ManualInputForm } from '@/components/forms/ManualInputForm'
import { useIndicators } from '@/hooks/useIndicators'

export default function AnalisePage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload')
  const { calcular, isLoading } = useIndicators()
  const router = useRouter()

  const handleUploadSuccess = async (data: any) => {
    // Processar dados do PDF e calcular indicadores
    console.log('Upload success:', data)
    // router.push('/resultado')
  }

  const handleManualSubmit = async (data: any) => {
    try {
      const resultado = await calcular(data)
      // Salvar resultado no localStorage ou context
      localStorage.setItem('resultado', JSON.stringify(resultado))
      router.push('/resultado')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Nova Análise Financeira
        </h1>

        <Card>
          <div className="flex border-b border-neutral-200 mb-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              📤 Upload de PDF
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'manual'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              ✏️ Preenchimento Manual
            </button>
          </div>

          {activeTab === 'upload' ? (
            <UploadForm onSuccess={handleUploadSuccess} />
          ) : (
            <ManualInputForm onSubmit={handleManualSubmit} isLoading={isLoading} />
          )}
        </Card>
      </div>
    </div>
  )
}
"""
criar_arquivo("frontend/app/analise/page.tsx", analise_page)

# ============================================
# APP/RESULTADO/PAGE.TSX
# ============================================
resultado_page = """'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { KPI } from '@/components/ui/KPI'
import { Grid } from '@/components/ui/Grid'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { ChartRevenueScenario } from '@/components/charts/ChartRevenueScenario'
import { formatBRL, formatPercent } from '@/utils/format'
import { ResultadoAnalise } from '@/types'

export default function ResultadoPage() {
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('resultado')
    if (data) {
      setResultado(JSON.parse(data))
    } else {
      router.push('/analise')
    }
  }, [router])

  if (!resultado) {
    return (
      <div className="container-custom py-12">
        <p>Carregando...</p>
      </div>
    )
  }

  const { indicadores, cenarios, pontos_fortes, pontos_atencao, acoes_prioritarias, saude_financeira_score } = resultado

  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Análise Financeira</h1>
            <p className="text-neutral-600">Comércio Varejista | 12/2024</p>
          </div>
          <Button onClick={() => router.push('/analise')}>Nova Análise</Button>
        </div>

        {/* Score */}
        <Card>
          <div className="text-center">
            <div className="text-6xl font-bold text-primary-600 mb-2">
              {saude_financeira_score}/100
            </div>
            <p className="text-lg text-neutral-600">Score de Saúde Financeira</p>
            <Pill variant="success">Saudável</Pill>
          </div>
        </Card>

        {/* KPIs */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Indicadores Principais</h2>
          <Grid cols={4}>
            <KPI label="Liquidez Corrente" value={indicadores.liquidez_corrente} status="ok" />
            <KPI label="Margem Líquida" value={formatPercent(indicadores.margem_liquida)} status="ok" />
            <KPI label="Capital de Giro" value={formatBRL(indicadores.capital_giro)} status="ok" />
            <KPI label="Endividamento" value={formatPercent(indicadores.endividamento_geral)} status="warning" />
          </Grid>
        </div>

        {/* Cenários */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Cenários de Projeção</h2>
          <ChartRevenueScenario 
            cenarios={cenarios}
            receitaAtual={resultado.dados_input.receita_bruta}
          />
        </Card>

        {/* Pontos Fortes */}
        <Card>"""
"🌱 GROWLI - MEGA SCRIPT FRONTEND COMPLETO"
Cria todo o frontend Next.js + TypeScript + Tailwind

COMO USAR:
1. Salve como: criar_frontend_growli.py
2. Execute na pasta growli/: python criar_frontend_growli.py
3. Siga as instruções no final
"""
import os

def criar_pasta(caminho):
    os.makedirs(caminho, exist_ok=True)

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("""
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🌱 GROWLI - SETUP FRONTEND COMPLETO                  ║
║                                                              ║
║  Next.js 14 + TypeScript + Tailwind CSS                     ║
║  Tempo estimado: 15-20 segundos                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
""")

input("Pressione ENTER para criar o frontend...")

print("\n📁 Criando estrutura...\n")

# Estrutura de pastas
pastas = [
    "frontend/app",
    "frontend/app/analise",
    "frontend/app/resultado",
    "frontend/components/ui",
    "frontend/components/charts",
    "frontend/components/forms",
    "frontend/components/layout",
    "frontend/hooks",
    "frontend/utils",
    "frontend/types",
    "frontend/public/images"
]

for pasta in pastas:
    criar_pasta(pasta)

print("\n📝 Criando arquivos de configuração...\n")

# ============================================
# PACKAGE.JSON
# ============================================
package_json = """{
  "name": "growli-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
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
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0"
  }
}
"""
criar_arquivo("frontend/package.json", package_json)

# ============================================
# TSCONFIG.JSON
# ============================================
tsconfig = """{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"""
criar_arquivo("frontend/tsconfig.json", tsconfig)

# ============================================
# TAILWIND.CONFIG.TS
# ============================================
tailwind_config = """import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          500: '#737373',
          700: '#404040',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
"""
criar_arquivo("frontend/tailwind.config.ts", tailwind_config)

# ============================================
# NEXT.CONFIG.JS
# ============================================
next_config = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
"""
criar_arquivo("frontend/next.config.js", next_config)

# ============================================
# POSTCSS.CONFIG.JS
# ============================================
postcss = """module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"""
criar_arquivo("frontend/postcss.config.js", postcss)

# ============================================
# .ENV.LOCAL
# ============================================
env_local = """NEXT_PUBLIC_API_URL=http://localhost:8000
"""
criar_arquivo("frontend/.env.local", env_local)

print("\n⏳ Criando tipos TypeScript...\n")

# ============================================
# TYPES/INDEX.TS
# ============================================
types = """export type SetorEnum = 
  | 'comercio_varejo'
  | 'servicos'
  | 'industria'
  | 'tecnologia'
  | 'alimentacao'
  | 'saude'
  | 'educacao'
  | 'construcao'

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
  liquidez_seca: number
  liquidez_imediata: number
  margem_bruta: number
  margem_operacional: number
  margem_liquida: number
  endividamento_geral: number
  composicao_endividamento: number
  giro_estoque: number
  prazo_medio_recebimento: number
  capital_giro: number
  necessidade_capital_giro: number
}

export interface Cenario {
  tipo: 'otimista' | 'neutro' | 'pessimista'
  taxa_crescimento: number
  receita_projetada: number
  lucro_projetado: number
  necessidade_capital: number
  recomendacoes: string[]
}

export interface ResultadoAnalise {
  id_analise: string
  data_analise: string
  setor: SetorEnum
  dados_input: DadosFinanceiros
  indicadores: Indicadores
  cenarios: Cenario[]
  pontos_fortes: string[]
  pontos_atencao: string[]
  acoes_prioritarias: string[]
  saude_financeira_score: number
}
"""
criar_arquivo("frontend/types/index.ts", types)

print("\n⏳ Criando utilitários...\n")

# ============================================
# UTILS/FORMAT.TS
# ============================================
format_ts = """export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export const formatDias = (value: number): string => {
  return `${Math.round(value)} dias`
}

export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
"""
criar_arquivo("frontend/utils/format.ts", format_ts)

# ============================================
# UTILS/API.TS
# ============================================
api_ts = """const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 30000
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, await response.text())
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) throw error
    throw new Error('Erro de conexão com o servidor')
  }
}

export async function uploadPDF(file: File, setor: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('setor', setor)

  const response = await fetchWithTimeout(`${API_URL}/api/v1/upload/pdf`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new ApiError(response.status, 'Erro ao fazer upload')
  }

  return await response.json()
}
"""
criar_arquivo("frontend/utils/api.ts", api_ts)

print("\n⏳ Criando hooks...\n")

# ============================================
# HOOKS/USEINDICATORS.TS
# ============================================
use_indicators = """'use client'
import { useState } from 'react'
import { apiCall } from '@/utils/api'
import { DadosFinanceiros, ResultadoAnalise } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useIndicators() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<ResultadoAnalise | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcular = async (dados: DadosFinanceiros) => {
    setStatus('loading')
    setError(null)
    
    try {
      const resultado = await apiCall<ResultadoAnalise>(
        '/api/v1/analysis/calculate',
        {
          method: 'POST',
          body: JSON.stringify(dados),
        }
      )
      
      setData(resultado)
      setStatus('success')
      return resultado
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao calcular'
      setError(message)
      setStatus('error')
      throw err
    }
  }

  const reset = () => {
    setStatus('idle')
    setData(null)
    setError(null)
  }

  return {
    calcular,
    reset,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
"""
criar_arquivo("frontend/hooks/useIndicators.ts", use_indicators)

# ============================================
# HOOKS/USEUPLOAD.TS
# ============================================
use_upload = """'use client'
import { useState } from 'react'
import { uploadPDF } from '@/utils/api'

type Status = 'idle' | 'uploading' | 'success' | 'error'

export function useUpload() {
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  const upload = async (file: File, setor: string) => {
    setStatus('uploading')
    setProgress(0)
    setError(null)

    try {
      // Simular progresso
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadPDF(file, setor)
      
      clearInterval(interval)
      setProgress(100)
      setData(result)
      setStatus('success')
      
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro no upload'
      setError(message)
      setStatus('error')
      throw err
    }
  }

  const reset = () => {
    setStatus('idle')
    setProgress(0)
    setError(null)
    setData(null)
  }

  return {
    upload,
    reset,
    status,
    progress,
    error,
    data,
    isUploading: status === 'uploading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
"""
criar_arquivo("frontend/hooks/useUpload.ts", use_upload)

print("\n⏳ Criando componentes UI base...\n")

# ============================================
# COMPONENTS/UI/CARD.TSX
# ============================================
card = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export function Card({ 
  children, 
  className, 
  padding = 'md',
  hover = false 
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-neutral-200',
        'shadow-sm',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
          'hover:shadow-md transition-shadow': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/Card.tsx", card)

# ============================================
# COMPONENTS/UI/BUTTON.TSX
# ============================================
button = """import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center',
        'font-medium rounded-lg',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-200': variant === 'secondary',
          'border-2 border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
          'text-neutral-700 hover:bg-neutral-100': variant === 'ghost',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
"""
criar_arquivo("frontend/components/ui/Button.tsx", button)

# ============================================
# COMPONENTS/UI/KPI.TSX
# ============================================
kpi = """import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface KPIProps {
  label: string
  value: string | number
  icon?: ReactNode
  status?: 'ok' | 'warning' | 'critical'
  subtitle?: string
  tooltip?: string
}

export function KPI({ label, value, icon, status, subtitle, tooltip }: KPIProps) {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg border-l-4',
        {
          'border-primary-500 bg-primary-50': status === 'ok' || !status,
          'border-yellow-500 bg-yellow-50': status === 'warning',
          'border-red-500 bg-red-50': status === 'critical',
        }
      )}
      title={tooltip}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        {icon && <div className="text-neutral-400">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-neutral-900">{value}</div>
      {subtitle && (
        <div className="text-xs text-neutral-500 mt-1">{subtitle}</div>
      )}
    </div>
  )
}
"""
criar_arquivo("frontend/components/ui/KPI.tsx", kpi)

# Continua na próxima parte devido ao limite de caracteres...
