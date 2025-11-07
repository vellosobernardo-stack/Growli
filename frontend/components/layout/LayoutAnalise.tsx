'use client'
import { ArrowLeft, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

interface LayoutAnaliseProps {
  children: ReactNode
  titulo: string
  subtitulo: string
  nivelAtual: 1 | 2 | 3
}

export default function LayoutAnalise({ children, titulo, subtitulo, nivelAtual }: LayoutAnaliseProps) {
  const niveis = [
    { numero: 1, label: 'Básico', cor: 'bg-primary' },
    { numero: 2, label: 'Intermediário', cor: 'bg-secondary' },
    { numero: 3, label: 'Avançado', cor: 'bg-accent' }
  ]

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Voltar</span>
            </Link>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Leme</h2>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              {titulo}
            </h1>
            <p className="text-xl text-muted-foreground">
              {subtitulo}
            </p>
          </div>

          {/* Stepper - Indicador de Níveis */}
          <div className="flex items-center justify-center mb-12 animate-scale-in">
            <div className="flex items-center gap-4">
              {niveis.map((nivel, index) => (
                <div key={nivel.numero} className="flex items-center">
                  {/* Círculo do Nível */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        nivel.numero <= nivelAtual
                          ? `${nivel.cor} text-white shadow-medium`
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {nivel.numero}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        nivel.numero === nivelAtual ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {nivel.label}
                    </span>
                  </div>

                  {/* Linha Conectora */}
                  {index < niveis.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-2 transition-all duration-300 ${
                        nivel.numero < nivelAtual ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card Principal */}
          <div className="bg-card shadow-strong rounded-lg border border-border/50 animate-fade-in-up">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}