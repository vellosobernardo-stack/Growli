'use client';

interface AlertaErroProps {
  mensagem: string;
  onFechar?: () => void;
}

export default function AlertaErro({ mensagem, onFechar }: AlertaErroProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">❌</span>
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Erro ao processar análise</h3>
            <p className="text-red-700 text-sm">{mensagem}</p>
            <p className="text-red-600 text-xs mt-2">
              Verifique se o backend está rodando em http://localhost:8000
            </p>
          </div>
        </div>
        {onFechar && (
          <button
            onClick={onFechar}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}