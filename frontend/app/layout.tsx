import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leme - Análise Financeira Inteligente',
  description: 'Entenda as finanças da sua empresa sem complicação. Análises financeiras automáticas, cenários de desempenho e estratégias práticas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}