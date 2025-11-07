'use client';
import { forwardRef } from 'react';
import { Info } from 'lucide-react';

interface InputNumeroProps {
  value: number | string;
  onChange: (value: number) => void;
  label: string;
  opcional?: boolean;
  tooltip?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  sufixo?: string;
  className?: string;
}

const InputNumero = forwardRef<HTMLInputElement, InputNumeroProps>(
  ({ 
    value, 
    onChange, 
    label, 
    opcional = false, 
    tooltip, 
    placeholder,
    min = 0,
    max,
    step = 1,
    sufixo,
    className = ''
  }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valor = e.target.value;
      
      // Permite campo vazio
      if (valor === '') {
        onChange(0);
        return;
      }
      
      // Converte para número
      const numero = parseFloat(valor);
      
      // Valida
      if (isNaN(numero)) {
        return;
      }
      
      // Aplica limites se existirem
      if (min !== undefined && numero < min) {
        onChange(min);
        return;
      }
      
      if (max !== undefined && numero > max) {
        onChange(max);
        return;
      }
      
      onChange(numero);
    };

    const valorExibicao = value === 0 ? '' : value;

    return (
      <div className={`space-y-2 ${className}`}>
        <label className="flex items-center text-sm font-medium text-gray-700">
          {label}
          {opcional && <span className="text-gray-400 ml-1">(Opcional)</span>}
          {!opcional && <span className="text-red-500 ml-1">*</span>}
          {tooltip && (
            <div className="group relative inline-block ml-2">
              <div className="p-1 bg-gray-200 rounded-full cursor-help">
                <Info className="w-3 h-3 text-gray-600" />
              </div>
              <div className="invisible group-hover:visible absolute z-10 w-64 p-3 text-sm bg-gray-900 text-white rounded-lg shadow-lg -top-2 left-8">
                {tooltip}
              </div>
            </div>
          )}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type="number"
            inputMode="decimal"
            value={valorExibicao}
            onChange={handleChange}
            placeholder={placeholder || "0"}
            min={min}
            max={max}
            step={step}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
          />
          {sufixo && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
              {sufixo}
            </span>
          )}
        </div>
      </div>
    );
  }
);

InputNumero.displayName = 'InputNumero';

export default InputNumero;