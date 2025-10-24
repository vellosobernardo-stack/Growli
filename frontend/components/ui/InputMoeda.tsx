'use client';

import { forwardRef } from 'react';

interface InputMoedaProps {
  value: string | number;
  onChange: (value: number) => void;
  label: string;
  opcional?: boolean;
  tooltip?: string;
  placeholder?: string;
  className?: string;
}

const InputMoeda = forwardRef<HTMLInputElement, InputMoedaProps>(
  ({ value, onChange, label, opcional = false, tooltip, placeholder, className = '' }, ref) => {
    
    const formatarParaExibicao = (valor: number): string => {
      if (valor === 0) return '';
      
      return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove tudo que não é número
      let numeros = e.target.value.replace(/\D/g, '');
      
      // Se vazio, retorna 0
      if (!numeros) {
        onChange(0);
        return;
      }
      
      // Converte para número (os últimos 2 dígitos são centavos)
      const valorNumerico = parseFloat(numeros) / 100;
      onChange(valorNumerico);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permitir: backspace, delete, tab, escape, enter
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
        return;
      }
      // Certificar que é um número
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    };

    const valorExibicao = typeof value === 'number' 
      ? formatarParaExibicao(value)
      : '';

    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {opcional && <span className="text-gray-400 ml-1">(Opcional)</span>}
          {!opcional && <span className="text-red-500 ml-1">*</span>}
          {tooltip && (
            <span 
              className="ml-2 text-xs text-gray-500 cursor-help" 
              title={tooltip}
            >
              ℹ️
            </span>
          )}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            R$
          </span>
          <input
            ref={ref}
            type="text"
            inputMode="numeric"
            value={valorExibicao}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "0,00"}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right font-mono"
          />
        </div>
        {valorExibicao && (
          <p className="text-xs text-gray-500 text-right">
            = R$ {valorExibicao}
          </p>
        )}
      </div>
    );
  }
);

InputMoeda.displayName = 'InputMoeda';

export default InputMoeda;