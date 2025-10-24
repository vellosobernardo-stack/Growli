'use client';

import { forwardRef } from 'react';

interface SelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: { value: any; label: string }[];
  label: string;
  opcional?: boolean;
  placeholder?: string;
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onChange, options, label, opcional = false, placeholder, className = '' }, ref) => {
    
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {opcional && <span className="text-gray-400 ml-1">(Opcional)</span>}
          {!opcional && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;