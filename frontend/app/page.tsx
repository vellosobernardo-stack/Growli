import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Análise Financeira Inteligente
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Entenda seus números em 5 minutos
        </p>
        <Link href="/analise">
          <Button className="text-lg px-8 py-3">Começar Análise</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-semibold mb-2">Indicadores</h3>
          <p className="text-sm text-neutral-600">12 indicadores essenciais</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="font-semibold mb-2">Cenários</h3>
          <p className="text-sm text-neutral-600">3 projeções automáticas</p>
        </Card>
        <Card className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="font-semibold mb-2">Estratégias</h3>
          <p className="text-sm text-neutral-600">Ações personalizadas</p>
        </Card>
      </div>
    </div>
  )
}