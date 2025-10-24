import { AnaliseRequest, AnaliseResponse } from '@/types/analise';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function enviarAnalise(dados: AnaliseRequest): Promise<AnaliseResponse> {
  try {
    const response = await fetch(`${API_URL}/api/analise`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Erro na API: ${response.status} ${response.statusText}`
      );
    }

    const resultado: AnaliseResponse = await response.json();
    return resultado;
  } catch (error) {
    console.error('Erro ao enviar análise:', error);
    throw error;
  }
}

export function verificarSaudeAPI(): Promise<boolean> {
  return fetch(`${API_URL}/health`)
    .then((response) => response.ok)
    .catch(() => false);
}