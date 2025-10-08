import { forwardRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input 
        ref={ref}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" 
        {...props} 
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'