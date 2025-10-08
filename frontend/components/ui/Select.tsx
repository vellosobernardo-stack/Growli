import { forwardRef, SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <select ref={ref} className="w-full px-3 py-2 border rounded-lg" {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
)
Select.displayName = 'Select'