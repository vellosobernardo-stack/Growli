"""
🌱 ADICIONAR UPLOAD DE PDF
Execute este script para adicionar funcionalidade de upload
Salve como: adicionar_upload_pdf.py
"""
import os

def criar_arquivo(caminho, conteudo):
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(conteudo)
    print(f"  ✅ {caminho.split('/')[-1]}")

print("📤 Adicionando Upload de PDF...\n")

# ============================================
# HOOK - useUpload
# ============================================
hook_upload = r"""'use client'
import { useState } from 'react'

export function useUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const upload = async (file: File, setor: string) => {
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('setor', setor)

      // Simular progresso
      const interval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 90))
      }, 200)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/pdf`, {
        method: 'POST',
        body: formData
      })

      clearInterval(interval)
      setProgress(100)

      if (!res.ok) throw new Error('Erro no upload')

      const data = await res.json()
      setUploading(false)
      return data
    } catch (e) {
      setError('Erro ao fazer upload')
      setUploading(false)
      throw e
    }
  }

  return { upload, uploading, progress, error }
}"""
criar_arquivo("frontend/hooks/useUpload.ts", hook_upload)

# ============================================
# COMPONENTE - UploadPDF
# ============================================
comp_upload = r"""'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { useUpload } from '@/hooks/useUpload'

const SETORES = [
  { value: 'comercio_varejo', label: 'Comércio Varejista' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'tecnologia', label: 'Tecnologia' }
]

export function UploadPDF({ onSuccess }: { onSuccess: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [setor, setSetor] = useState('comercio_varejo')
  const { upload, uploading, progress, error } = useUpload()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    try {
      const result = await upload(file, setor)
      onSuccess(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="text-4xl mb-4">📄</div>
          <p className="text-lg font-medium mb-2">
            {file ? file.name : 'Arraste seu PDF aqui'}
          </p>
          <p className="text-sm text-neutral-600">
            ou clique para selecionar
          </p>
        </label>

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-neutral-600 mt-2">{progress}%</p>
          </div>
        )}
      </div>

      <Select
        label="Setor de Atuação"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        options={SETORES}
        disabled={uploading}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={!file || uploading}
        loading={uploading}
      >
        Analisar PDF
      </Button>
    </form>
  )
}"""
criar_arquivo("frontend/components/forms/UploadPDF.tsx", comp_upload)

# ============================================
# ATUALIZAR PÁGINA DE ANÁLISE COM TABS
# ============================================
analise_tabs = r"""'use client'
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
}"""
criar_arquivo("frontend/app/analise/page.tsx", analise_tabs)

print("\n✅ Upload de PDF adicionado!")
print("\n🔄 Atualize a página no navegador (F5)")
print("📤 Agora você pode fazer upload de PDF ou preencher manual!")