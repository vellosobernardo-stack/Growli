'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';

interface SelectProps {
  value: string | number;
  onChange: (value: string) => void;
  options: { value: string | number; label: string }[];
  label: string;
  placeholder?: string;
  tooltip?: string;
  opcional?: boolean;
  className?: string;
}

export default function Select({
  value,
  onChange,
  options,
  label,
  placeholder = "Selecione...",
  tooltip,
  opcional = false,
  className = ''
}: SelectProps) {
  
  const [mostrarTooltip, setMostrarTooltip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 appearance-none bg-white"
        style={{
          border: '1px solid hsl(215 20% 88%)',
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
