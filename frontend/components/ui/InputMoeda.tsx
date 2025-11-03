'use client';

import { forwardRef, useState } from 'react';
import { Info } from 'lucide-react';

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
    
    const [mostrarTooltip, setMostrarTooltip] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    
    const formatarParaExibicao = (valor: number): string => {
      if (valor === 0) return '';
      
      return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const handleMouseEnter = () => {
      // Limpa qualquer timeout existente
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setMostrarTooltip(true);
    };

    const handleMouseLeave = () => {
      // Adiciona um pequeno delay antes de esconder
      const id = setTimeout(() => {
        setMostrarTooltip(false);
      }, 200);
      setTimeoutId(id);
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
        <label 
          className="block text-sm font-medium" 
          style={{ color: 'hsl(215 25% 15%)' }}
        >
          {label}
          {opcional && (
            <span className="ml-1" style={{ color: 'hsl(215 15% 45%)' }}>
              (Opcional)
            </span>
          )}
          {!opcional && (
            <span className="ml-1" style={{ color: 'hsl(0 84.2% 60.2%)' }}>
              *
            </span>
          )}
          
          {/* Tooltip com ícone Info */}
          {tooltip && (
            <span className="relative inline-block ml-2">
              <button
                type="button"
                className="inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors"
                style={{ 
                  backgroundColor: mostrarTooltip ? 'hsl(142 70% 45%)' : 'hsl(210 15% 90%)',
                  color: mostrarTooltip ? 'white' : 'hsl(215 15% 45%)'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                onClick={(e) => {
                  e.preventDefault();
                  setMostrarTooltip(!mostrarTooltip);
                }}
              >
                <Info className="w-3 h-3" />
              </button>
              
              {/* Tooltip box */}
              {mostrarTooltip && (
                <div 
                  className="absolute left-1/2 bottom-full mb-2 z-50 animate-fade-in pointer-events-none"
                  style={{ 
                    transform: 'translateX(-50%)',
                    width: 'max-content',
                    maxWidth: '280px'
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div 
                    className="rounded-lg p-3 shadow-xl"
                    style={{ backgroundColor: 'hsl(215 25% 15%)' }}
                  >
                    <p className="text-xs text-white leading-relaxed whitespace-normal">
                      {tooltip}
                    </p>
                    {/* Seta do tooltip */}
                    <div 
                      className="absolute top-full left-1/2"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      <div 
                        className="border-8 border-transparent"
                        style={{ borderTopColor: 'hsl(215 25% 15%)' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </span>
          )}
        </label>

        <div className="relative">
          <span 
            className="absolute left-3 top-1/2 -translate-y-1/2 font-medium"
            style={{ color: 'hsl(215 15% 45%)' }}
          >
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
            className="w-full h-11 pl-12 pr-4 rounded-lg text-right font-mono transition-all focus:outline-none focus:ring-2"
            style={{
              border: '1px solid hsl(215 20% 88%)',
              backgroundColor: 'white'
            }}
          />
        </div>

        {valorExibicao && (
          <p className="text-xs text-right" style={{ color: 'hsl(215 15% 45%)' }}>
            = R$ {valorExibicao}
          </p>
        )}
      </div>
    );
  }
);

InputMoeda.displayName = 'InputMoeda';

export default InputMoeda;

