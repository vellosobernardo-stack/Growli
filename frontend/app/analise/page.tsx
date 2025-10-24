'use client';

import { useAnalise } from '@/hooks/useAnalise';
import FormularioNivel1 from '@/components/FormularioNivel1';
import FormularioNivel2 from '@/components/FormularioNivel2';
import FormularioNivel3 from '@/components/FormularioNivel3';
import ResultadosNivel1 from '@/components/ResultadosNivel1';
import ResultadosNivel2 from '@/components/ResultadosNivel2';
import ResultadosNivel3 from '@/components/ResultadosNivel3';
import DiagnosticoFinal from '@/components/DiagnosticoFinal';
import Loading from '@/components/ui/Loading';
import AlertaErro from '@/components/ui/AlertaErro';
import Avisos from '@/components/ui/Avisos';

export default function AnaliseFinanceira() {
  const {
    nivelAtual,
    loading,
    erro,
    resultado,
    submeterNivel1,
    submeterNivel2,
    submeterNivel3,
    avancarNivel,
    voltarNivel,
    resetar,
  } = useAnalise();

  // Handler para submit do Nível 1
  const handleSubmitNivel1 = async (meta: any, dados: any) => {
    const sucesso = await submeterNivel1(meta, dados);
    // Não avança automaticamente - usuário vê resultados primeiro
  };

  // Handler para submit do Nível 2
  const handleSubmitNivel2 = async (dados: any) => {
    const sucesso = await submeterNivel2(dados);
    // Não avança automaticamente
  };

  // Handler para submit do Nível 3
  const handleSubmitNivel3 = async (dados: any) => {
    await submeterNivel3(dados);
    // Mostra resultados finais
  };

  // Handler para avançar de nível
  const handleAvancar = () => {
    avancarNivel();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Análise Financeira Growli
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Transforme dados em decisões estratégicas
          </p>
          {resultado && (
            <button
              onClick={resetar}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              ← Começar nova análise
            </button>
          )}
        </div>

        {/* Indicador de progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((nivel) => (
              <div key={nivel} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    nivelAtual >= nivel
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : 'bg-gray-300 text-gray-600'
                  } ${
                    nivelAtual === nivel ? 'ring-4 ring-blue-300' : ''
                  }`}
                >
                  {nivel}
                </div>
                {nivel < 3 && (
                  <div
                    className={`w-20 md:w-32 h-2 transition-all ${
                      nivelAtual > nivel ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-sm font-medium max-w-md mx-auto px-4">
            <span className={nivelAtual === 1 ? 'text-blue-600' : 'text-gray-600'}>
              Básico
            </span>
            <span className={nivelAtual === 2 ? 'text-blue-600' : 'text-gray-600'}>
              Intermediário
            </span>
            <span className={nivelAtual === 3 ? 'text-blue-600' : 'text-gray-600'}>
              Avançado
            </span>
          </div>
        </div>

        {/* Erro (se houver) */}
        {erro && (
          <div className="mb-6">
            <AlertaErro mensagem={erro} onFechar={() => {}} />
          </div>
        )}

        {/* Avisos (se houver) */}
        {resultado?.status_validacao?.avisos && resultado.status_validacao.avisos.length > 0 && (
          <div className="mb-6">
            <Avisos avisos={resultado.status_validacao.avisos} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Loading />
          </div>
        )}

        {/* Conteúdo principal */}
        {!loading && (
          <div className="space-y-8">
            
            {/* FORMULÁRIO NÍVEL 1 */}
            {nivelAtual === 1 && !resultado && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <FormularioNivel1 
                  onSubmit={handleSubmitNivel1}
                  loading={loading}
                />
              </div>
            )}

            {/* RESULTADOS NÍVEL 1 */}
            {nivelAtual === 1 && resultado?.nivel1 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <ResultadosNivel1
                  resultado={resultado.nivel1}
                  onAvancar={handleAvancar}
                />
              </div>
            )}

            {/* FORMULÁRIO NÍVEL 2 */}
            {nivelAtual === 2 && !resultado?.nivel2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <FormularioNivel2
                  onSubmit={handleSubmitNivel2}
                  onVoltar={voltarNivel}
                  loading={loading}
                />
              </div>
            )}

            {/* RESULTADOS NÍVEL 1 + 2 */}
            {nivelAtual === 2 && resultado?.nivel2 && (
              <div className="space-y-8">
                {/* Mostrar resumo do Nível 1 */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    📊 Resumo - Nível 1
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {resultado.nivel1.kpis.slice(0, 4).map((kpi, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">{kpi.nome}</p>
                        <p className="text-lg font-bold text-gray-900">
                          {kpi.formato === 'moeda' 
                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpi.valor)
                            : kpi.formato === 'percentual'
                            ? `${kpi.valor.toFixed(1)}%`
                            : kpi.formato === 'dias'
                            ? `${Math.round(kpi.valor)} dias`
                            : kpi.valor.toFixed(2)
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resultados do Nível 2 */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <ResultadosNivel2
                    resultado={resultado.nivel2}
                    onAvancar={handleAvancar}
                  />
                </div>
              </div>
            )}

            {/* FORMULÁRIO NÍVEL 3 */}
            {nivelAtual === 3 && !resultado?.nivel3 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <FormularioNivel3
                  onSubmit={handleSubmitNivel3}
                  onVoltar={voltarNivel}
                  loading={loading}
                />
              </div>
            )}

            {/* RESULTADOS COMPLETOS (NÍVEL 3) */}
            {nivelAtual === 3 && resultado?.nivel3 && (
              <div className="space-y-8">
                {/* Resumo dos níveis anteriores */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    📊 Resumo Geral
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* KPIs principais de todos os níveis */}
                    {resultado.nivel1.kpis.slice(0, 2).map((kpi, index) => (
                      <div key={`n1-${index}`} className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <p className="text-xs text-blue-600 mb-1">Nível 1</p>
                        <p className="text-sm text-gray-700 mb-1">{kpi.nome}</p>
                        <p className="text-lg font-bold text-blue-900">
                          {kpi.formato === 'moeda' 
                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(kpi.valor)
                            : kpi.formato === 'percentual'
                            ? `${kpi.valor.toFixed(1)}%`
                            : kpi.formato === 'dias'
                            ? `${Math.round(kpi.valor)} dias`
                            : kpi.valor.toFixed(2)
                          }
                        </p>
                      </div>
                    ))}
                    
                    {resultado.nivel2 && resultado.nivel2.kpis.slice(0, 2).map((kpi, index) => (
                      <div key={`n2-${index}`} className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                        <p className="text-xs text-purple-600 mb-1">Nível 2</p>
                        <p className="text-sm text-gray-700 mb-1">{kpi.nome}</p>
                        <p className="text-lg font-bold text-purple-900">
                          {kpi.formato === 'moeda' 
                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(kpi.valor)
                            : kpi.formato === 'percentual'
                            ? `${kpi.valor.toFixed(1)}%`
                            : kpi.formato === 'dias'
                            ? `${Math.round(kpi.valor)} dias`
                            : kpi.valor.toFixed(2)
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resultados do Nível 3 */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <ResultadosNivel3 resultado={resultado.nivel3} />
                </div>

                {/* Diagnóstico Final */}
                {resultado.diagnostico_estrategia && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <DiagnosticoFinal diagnostico={resultado.diagnostico_estrategia} />
                  </div>
                )}

                {/* Botão para baixar relatório (futuro) */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-lg text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">🎉 Análise Completa!</h3>
                  <p className="mb-4">
                    Você recebeu insights completos sobre a saúde financeira do seu negócio.
                  </p>
                  <button
                    onClick={resetar}
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Fazer Nova Análise
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}