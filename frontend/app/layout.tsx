import './globals.css'

export const metadata = {
  title: 'Growli - Análise Financeira',
  description: 'Análise financeira inteligente'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-100">
        <header className="bg-white border-b p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Growli</h1>
            <nav className="space-x-4">
              <a href="/" className="text-neutral-600 hover:text-neutral-900">Início</a>
              <a href="/analise" className="text-neutral-600 hover:text-neutral-900">Análise</a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-neutral-900 text-white py-8 text-center">
          <p>© 2025 Growli</p>
        </footer>
      </body>
    </html>
  )
}