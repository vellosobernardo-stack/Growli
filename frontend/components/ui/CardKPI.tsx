'use client';

interface CardKPIProps {
  nome: string;
  valor: number;
  formato: 'moeda' | 'percentual' | 'numero' | 'dias';
  classificacao?: 'verde' | 'amarelo' | 'vermelho';
}

export default function CardKPI({ nome, valor, formato, classificacao }: CardKPIProps) {
  const formatarValor = () => {
    switch (formato) {
      case 'moeda':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(valor);
      case 'percentual':
        return `${valor.toFixed(1)}%`;
      case 'dias':
        return `${Math.round(valor)} dias`;
      case 'numero':
        return valor.toFixed(2);
      default:
        return valor.toString();
    }
  };

  const getCorFundo = () => {
    if (!classificacao) return 'bg-gray-50 border-gray-200';
    switch (classificacao) {
      case 'verde':
        return 'bg-green-50 border-green-200';
      case 'amarelo':
        return 'bg-yellow-50 border-yellow-200';
      case 'vermelho':
        return 'bg-red-50 border-red-200';
    }
  };

  const getCorTexto = () => {
    if (!classificacao) return 'text-gray-900';
    switch (classificacao) {
      case 'verde':
        return 'text-green-900';
      case 'amarelo':
        return 'text-yellow-900';
      case 'vermelho':
        return 'text-red-900';
    }
  };

  const getIcone = () => {
    if (!classificacao) return null;
    switch (classificacao) {
      case 'verde':
        return '✓';
      case 'amarelo':
        return '⚠';
      case 'vermelho':
        return '✕';
    }
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${getCorFundo()} transition-all hover:shadow-lg`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {nome}
        </h3>
        {classificacao && (
          <span className={`text-2xl ${getCorTexto()}`}>
            {getIcone()}
          </span>
        )}
      </div>
      <p className={`text-3xl font-bold ${getCorTexto()}`}>
        {formatarValor()}
      </p>
    </div>
  );
}