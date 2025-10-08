import { ButtonHTMLAttributes } from 'react'

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
}