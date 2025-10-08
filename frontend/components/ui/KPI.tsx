interface Props {
  label: string
  value: string | number
  status?: 'ok' | 'warning' | 'critical'
}

export function KPI({ label, value, status = 'ok' }: Props) {
  const colors = {
    ok: 'border-green-500 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50',
    critical: 'border-red-500 bg-red-50'
  }
  
  return (
    <div className={`p-4 rounded-lg border-l-4 ${colors[status]}`}>
      <div className="text-sm text-neutral-600 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}