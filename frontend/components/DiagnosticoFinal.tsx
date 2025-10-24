'use client';

import { DiagnosticoEstrategia } from '@/types/analise';

interface DiagnosticoFinalProps {
  diagnostico: DiagnosticoEstrategia;
}

export default function DiagnosticoFinal({ diagnostico }: DiagnosticoFinalProps) {
  return (
    <div className="space-y-6">
      {/* Diagnóstico */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">🏥 Diagnóstico Geral</h2>
        <div className="space-y-3">
          {diagnostico.diagnostico.map((frase, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              <p className="text-lg">{frase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Oportunidades */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          💡 Oportunidades de Melhoria
        </h3>
        <div className="space-y-4">
          {diagnostico.oportunidades.map((oport, index) => (
            <div
              key={index}
              className="border-l-4 border-green-500 bg-green-50 p-4 rounded"
            >
              <h4 className="font-semibold text-green-900 mb-2">
                {oport.descricao}
              </h4>
              <div className="flex items-center gap-4 text-sm text-green-700">
                <span className="font-bold">
                  Impacto: {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(oport.impacto_r)}
                </span>
                <span className="bg-green-200 px-2 py-1 rounded">
                  {oport.impacto_percentual.toFixed(1)}%
                </span>
              </div>
              {oport.acao && (
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Como fazer:</strong> {oport.acao}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plano 30-60-90 - VERSÃO MELHORADA */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-lg shadow-lg border-2 border-indigo-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-indigo-900 mb-3">
            🎯 Seu Plano de Ação 30-60-90 Dias
          </h3>
          <p className="text-lg text-indigo-700">
            Siga este roteiro prático para transformar insights em resultados
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 30 dias */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-blue-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                30
              </div>
              <h4 className="font-bold text-blue-900 text-xl">
                Primeiros 30 dias
              </h4>
            </div>
            <p className="text-sm text-blue-600 font-semibold mb-4 uppercase">
              🚀 Ações Imediatas
            </p>
            <ul className="space-y-3">
              {diagnostico.plano_30_60_90['30_dias'].map((acao, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500 transition-colors">
                    <span className="text-blue-600 font-bold text-xs group-hover:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {acao}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 60 dias */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-purple-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                60
              </div>
              <h4 className="font-bold text-purple-900 text-xl">
                60 dias
              </h4>
            </div>
            <p className="text-sm text-purple-600 font-semibold mb-4 uppercase">
              🎯 Consolidação
            </p>
            <ul className="space-y-3">
              {diagnostico.plano_30_60_90['60_dias'].map((acao, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-500 transition-colors">
                    <span className="text-purple-600 font-bold text-xs group-hover:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {acao}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 90 dias */}
          <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-green-500 transform hover:scale-105 transition-transform">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                90
              </div>
              <h4 className="font-bold text-green-900 text-xl">
                90 dias
              </h4>
            </div>
            <p className="text-sm text-green-600 font-semibold mb-4 uppercase">
              🚀 Expansão
            </p>
            <ul className="space-y-3">
              {diagnostico.plano_30_60_90['90_dias'].map((acao, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-500 transition-colors">
                    <span className="text-green-600 font-bold text-xs group-hover:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {acao}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
          <p className="text-lg font-semibold">
            💡 Dica: Revise este plano semanalmente e ajuste conforme necessário!
          </p>
        </div>
      </div>
    </div>
  );
}