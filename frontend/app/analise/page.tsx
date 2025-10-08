'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FormularioManual } from '@/components/forms/FormularioManual'
import { UploadPDF } from '@/components/forms/UploadPDF'
import { useIndicators } from '@/hooks/useIndicators'

export default function AnalisePage() {
  const [tab, setTab] = useState<'upload' | 'manual'>('upload')
  const { calcular, loading } = useIndicators()
  const router = useRouter()

  const handleUploadSuccess = async (data: any) => {
    // Extrair dados do PDF e processar
    const extractedData = data.data?.extracted_data
    if (extractedData) {
      const result = await calcular(extractedData)
      localStorage.setItem('resultado', JSON.stringify(result))
      router.push('/resultado')
    }
  }

  const handleManualSubmit = async (data: any) => {
    const result = await calcular(data)
    localStorage.setItem('resultado', JSON.stringify(result))
    router.push('/resultado')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Nova Análise Financeira</h1>
      
      <Card>
        {/* TABS */}
        <div className="flex border-b border-neutral-200 mb-6">
          <button
            onClick={() => setTab('upload')}
            className={`px-6 py-3 font-medium transition-colors ${
              tab === 'upload'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            📤 Upload de PDF
          </button>
          <button
            onClick={() => setTab('manual')}
            className={`px-6 py-3 font-medium transition-colors ${
              tab === 'manual'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            ✏️ Preenchimento Manual
          </button>
        </div>

        {/* CONTEÚDO */}
        {tab === 'upload' ? (
          <UploadPDF onSuccess={handleUploadSuccess} />
        ) : (
          <FormularioManual onSubmit={handleManualSubmit} loading={loading} />
        )}
      </Card>
    </div>
  )
}