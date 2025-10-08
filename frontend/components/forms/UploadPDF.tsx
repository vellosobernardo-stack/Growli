'use client'
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
}