'use client';

import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface CardKPIProps {
  nome: string;
  valor: number;
  formato: 'moeda' | 'percentual' | 'numero' | 'dias';
  classificacao?: 'verde' | 'amarelo' | 'vermelho' | 'bom' | 'alerta' | 'critico';
  icone?: React.ReactNode;
}

export default function CardKPI({ nome, valor, formato, classificacao, icone }: CardKPIProps) {
  
  // Normalizar classificação (backend pode enviar "bom"/"alerta"/"critico" ou "verde"/"amarelo"/"vermelho")
  const classificacaoNormalizada = 
    classificacao === 'bom' ? 'verde' :
    classificacao === 'alerta' ? 'amarelo' :
    classificacao === 'critico' ? 'vermelho' :
    classificacao || 'neutro';

  // Configurações de cores e texto baseado na classificação
  const getEstilo = () => {
    switch (classificacaoNormalizada) {
      case 'verde':
        return {
          borderColor: 'border-green-200',
          bgColor: 'bg-green-50',
          iconoBgColor: 'bg-green-100',
          statusColor: 'bg-green-500',
          statusTexto: 'Saudável',
          statusIcon: <CheckCircle className="w-4 h-4 text-green-600" />,
          valorColor: 'text-green-700'
        };
      case 'amarelo':
        return {
          borderColor: 'border-yellow-200',
          bgColor: 'bg-yellow-50',
          iconoBgColor: 'bg-yellow-100',
          statusColor: 'bg-yellow-500',
          statusTexto: 'Atenção',
          statusIcon: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
          valorColor: 'text-yellow-700'
        };
      case 'vermelho':
        return {
          borderColor: 'border-red-200',
          bgColor: 'bg-red-50',
          iconoBgColor: 'bg-red-100',
          statusColor: 'bg-red-500',
          statusTexto: 'Crítico',
          statusIcon: <XCircle className="w-4 h-4 text-red-600" />,
          valorColor: 'text-red-700'
        };
      default:
        return {
          borderColor: 'border-gray-200',
          bgColor: 'bg-white',
          iconoBgColor: 'bg-gray-100',
          statusColor: 'bg-gray-400',
          statusTexto: null,
          statusIcon: null,
          valorColor: 'text-gray-900'
        };
    }
  };

  const estilo = getEstilo();

  // Formatar valor conforme o tipo
  const formatarValor = () => {
    if (valor === null || valor === undefined) return '-';

    switch (formato) {
      case 'moeda':
        return `R$ ${valor.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
      case 'percentual':
        return `${valor.toFixed(0)}`;
      case 'numero':
        return valor.toFixed(1);
      case 'dias':
        return Math.round(valor).toString();
      default:
        return valor.toString();
    }
  };

  return (
    <div className={`relative border-2 ${estilo.borderColor} ${estilo.bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-lg`}>
      {/* Cabeçalho com ícone e nome */}
      <div className="flex items-center gap-3 mb-3">
        {icone && (
          <div className={`p-2 ${estilo.iconoBgColor} rounded-lg`}>
            {icone}
          </div>
        )}
        <h4 className="text-sm font-medium text-gray-700 leading-tight">
          {nome}
        </h4>
      </div>

      {/* Valor principal */}
      <div className="mb-2">
        <p className={`text-3xl font-bold ${estilo.valorColor} leading-none`}>
          {formatarValor()}
        </p>
      </div>

      {/* Status com bolinha e texto (só aparece se tiver classificação) */}
      {estilo.statusTexto && (
        <div className="flex items-center gap-2 mt-3">
          <div className={`w-2 h-2 rounded-full ${estilo.statusColor}`}></div>
          <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
            {estilo.statusIcon}
            {estilo.statusTexto}
          </span>
        </div>
      )}
    </div>
  );
}
