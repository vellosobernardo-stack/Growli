'use client'
import { useState } from 'react'
import { apiCall } from '@/utils/api'
import { DadosFinanceiros, ResultadoAnalise } from '@/types'

export function useIndicators() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ResultadoAnalise | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calcular = async (dados: DadosFinanceiros) => {
    setLoading(true)
    try {
      const res = await apiCall<ResultadoAnalise>('/api/v1/analysis/calculate', {
        method: 'POST',
        body: JSON.stringify(dados)
      })
      setData(res)
      setLoading(false)
      return res
    } catch (e) {
      setError('Erro ao calcular')
      setLoading(false)
      throw e
    }
  }

  return { calcular, loading, data, error }
}