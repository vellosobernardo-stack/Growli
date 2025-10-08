'use client'
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
}