export const formatBRL = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
export const formatPercent = (v: number) => `${v.toFixed(1)}%`
export const formatNumber = (v: number) => v.toFixed(2)