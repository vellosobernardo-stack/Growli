'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAnalise } from '@/hooks/useAnalise';
import FormularioNivel1 from '@/components/FormularioNivel1';
import FormularioNivel2 from '@/components/FormularioNivel2';
import FormularioNivel3 from '@/components/FormularioNivel3';
import ResultadosNivel1 from '@/components/ResultadosNivel1';
import ResultadosNivel2 from '@/components/ResultadosNivel2';
import ResultadosNivel3 from '@/components/ResultadosNivel3';
import ModalDadosIniciais from '@/components/ModalDadosIniciais';
// ❌ REMOVIDO: import DiagnosticoFinal from '@/components/DiagnosticoFinal';
import Loading from '@/components/ui/Loading';
import AlertaErro from '@/components/ui/AlertaErro';
import Avisos from '@/components/ui/Avisos';

export default function AnaliseFinanceira() {
  const router = useRouter();
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

  // Estados para o modal de dados iniciais
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState<{ email: string; nomeEmpresa: string } | null>(null);

  // Mostrar modal automaticamente quando chegar no nível 1 pela primeira vez
  useEffect(() => {
    if (nivelAtual === 1 && !resultado && !dadosUsuario) {
      setModalAberto(true);
    }
  }, [nivelAtual, resultado, dadosUsuario]);

  // Handler para quando o usuário preencher o modal
  const handleDadosIniciais = (dados: { email: string; nomeEmpresa: string }) => {
    setDadosUsuario(dados);
    setModalAberto(false);
    
    // Opcional: salvar no localStorage
    localStorage.setItem('leme_usuario', JSON.stringify(dados));
  };

  // Handler para submit do Nível 1
  const handleSubmitNivel1 = async (meta: any, dados: any) => {
      const metaCompleto = {
    ...meta,
    email: dadosUsuario?.email,
    empresa: dadosUsuario?.nomeEmpresa
  };
  await submeterNivel1(metaCompleto, dados);
};

  // Handler para submit do Nível 2
  const handleSubmitNivel2 = async (dados: any) => {
    await submeterNivel2(dados);
  };

  // Handler para submit do Nível 3
  const handleSubmitNivel3 = async (dados: any) => {
    await submeterNivel3(dados);
  };

  // Handler para avançar de nível
  const handleAvancar = () => {
    avancarNivel();
  };

  // Handler para voltar
  const handleVoltar = () => {
    if (resultado) {
      resetar();
    } else {
      router.push('/');
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, hsl(200 95% 97%) 0%, hsl(142 85% 97%) 100%)'
      }}
    >
      {/* Modal de Dados Iniciais */}
      <ModalDadosIniciais
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSubmit={handleDadosIniciais}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Botão Voltar */}
          <button
            onClick={handleVoltar}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#112d4e' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {/* Logo Leme */}
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.svg" 
              alt="Leme" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <span className="text-2xl font-bold text-gray-900">
              Leme
            </span>
          </div>
        </div>
      </header>

      {/* Container Principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Título Principal */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'hsl(215 25% 15%)' }}>
            Análise Financeira Leme
          </h1>
          <p className="text-lg" style={{ color: 'hsl(215 15% 45%)' }}>
            Transforme dados em decisões estratégicas
          </p>
        </div>

        {/* Stepper (Indicador de Progresso) */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-0">
            {/* Step 1 - Básico */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  nivelAtual >= 1
                    ? 'text-white animate-scale-in'
                    : 'text-gray-500'
                }`}
                style={{
                  backgroundColor: nivelAtual >= 1 ? '#112d4e' : 'hsl(210 15% 95%)',
                  boxShadow: nivelAtual >= 1 ? '0 10px 25px -5px rgba(17, 45, 78, 0.3), 0 8px 10px -6px rgba(17, 45, 78, 0.3)' : 'none'
                }}
              >
                1
              </div>
              <span 
                className={`mt-3 text-sm font-medium ${nivelAtual >= 1 ? 'font-semibold' : ''}`}
                style={{ color: nivelAtual >= 1 ? '#112d4e' : 'hsl(215 15% 65%)' }}
              >
                Básico
              </span>
            </div>

            {/* Conector 1 */}
            <div 
              className="w-20 h-1 rounded-full mx-2 transition-all"
              style={{ backgroundColor: nivelAtual >= 2 ? '#112d4e' : 'hsl(215 20% 88%)' }}
            />

            {/* Step 2 - Intermediário */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  nivelAtual >= 2
                    ? 'text-white animate-scale-in'
                    : 'text-gray-500'
                }`}
                style={{
                  backgroundColor: nivelAtual >= 2 ? '#112d4e' : 'hsl(210 15% 95%)',
                  boxShadow: nivelAtual >= 2 ? '0 10px 25px -5px rgba(17, 45, 78, 0.3), 0 8px 10px -6px rgba(17, 45, 78, 0.3)' : 'none'
                }}
              >
                2
              </div>
              <span 
                className={`mt-3 text-sm font-medium ${nivelAtual >= 2 ? 'font-semibold' : ''}`}
                style={{ color: nivelAtual >= 2 ? '#112d4e' : 'hsl(215 15% 65%)' }}
              >
                Intermediário
              </span>
            </div>

            {/* Conector 2 */}
            <div 
              className="w-20 h-1 rounded-full mx-2 transition-all"
              style={{ backgroundColor: nivelAtual >= 3 ? '#112d4e' : 'hsl(215 20% 88%)' }}
            />

            {/* Step 3 - Avançado */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  nivelAtual >= 3
                    ? 'text-white animate-scale-in'
                    : 'text-gray-500'
                }`}
                style={{
                  backgroundColor: nivelAtual >= 3 ? '#112d4e' : 'hsl(210 15% 95%)',
                  boxShadow: nivelAtual >= 3 ? '0 10px 25px -5px rgba(17, 45, 78, 0.3), 0 8px 10px -6px rgba(17, 45, 78, 0.3)' : 'none'
                }}
              >
                3
              </div>
              <span 
                className={`mt-3 text-sm font-medium ${nivelAtual >= 3 ? 'font-semibold' : ''}`}
                style={{ color: nivelAtual >= 3 ? '#112d4e' : 'hsl(215 15% 65%)' }}
              >
                Avançado
              </span>
            </div>
          </div>
        </div>

        {/* Erro (se houver) */}
        {erro && (
          <div className="mb-6 animate-fade-in">
            <AlertaErro mensagem={erro} onFechar={() => {}} />
          </div>
        )}

        {/* Avisos (se houver) */}
        {resultado?.status_validacao?.avisos && resultado.status_validacao.avisos.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <Avisos avisos={resultado.status_validacao.avisos} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div 
            className="bg-white rounded-lg p-8 animate-fade-in"
            style={{
              border: '1px solid hsl(215 20% 88% / 0.5)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Loading />
          </div>
        )}

        {/* Conteúdo principal */}
        {!loading && (
          <div className="space-y-8">
            
            {/* FORMULÁRIO NÍVEL 1 */}
            {nivelAtual === 1 && !resultado && (
              <div 
                className="bg-white rounded-lg p-8 animate-fade-in"
                style={{
                  border: '1px solid hsl(215 20% 88% / 0.5)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Dados do usuário */}
                {dadosUsuario && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Analisando para:</strong> {dadosUsuario.nomeEmpresa} • {dadosUsuario.email}
                    </p>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: 'hsl(215 25% 15%)' }}>
                    Análise Básica
                  </h2>
                  <p style={{ color: 'hsl(215 15% 45%)' }}>
                    Preencha as informações essenciais para começar sua análise financeira
                  </p>
                </div>
                <FormularioNivel1 
                  onSubmit={handleSubmitNivel1}
                  loading={loading}
                />
              </div>
            )}

            {/* RESULTADOS NÍVEL 1 */}
            {nivelAtual === 1 && resultado?.nivel1 && (
              <div className="animate-fade-in">
                <ResultadosNivel1
                  resultado={resultado.nivel1}
                  onAvancar={handleAvancar}
                />
              </div>
            )}

            {/* FORMULÁRIO NÍVEL 2 */}
            {nivelAtual === 2 && !resultado?.nivel2 && (
              <div 
                className="bg-white rounded-lg p-8 animate-fade-in"
                style={{
                  border: '1px solid hsl(215 20% 88% / 0.5)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <FormularioNivel2
                  onSubmit={handleSubmitNivel2}
                  onVoltar={voltarNivel}
                  loading={loading}
                />
              </div>
            )}

            {/* RESULTADOS NÍVEL 2 */}
            {nivelAtual === 2 && resultado?.nivel2 && (
              <div className="animate-fade-in">
                <ResultadosNivel2
                  resultado={resultado.nivel2}
                  onAvancar={handleAvancar}
                />
              </div>
            )}

            {/* FORMULÁRIO NÍVEL 3 */}
            {nivelAtual === 3 && !resultado?.nivel3 && (
              <div 
                className="bg-white rounded-lg p-8 animate-fade-in"
                style={{
                  border: '1px solid hsl(215 20% 88% / 0.5)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <FormularioNivel3
                  onSubmit={handleSubmitNivel3}
                  onVoltar={voltarNivel}
                  loading={loading}
                />
              </div>
            )}

            {/* ✅ RESULTADOS NÍVEL 3 - SIMPLIFICADO (SEM DiagnosticoFinal) */}
            {nivelAtual === 3 && resultado?.nivel3 && (
              <div className="animate-fade-in">
                {/* O ResultadosNivel3 já inclui TUDO:
                    - Resumo executivo
                    - Projeções
                    - Dashboard colapsado
                    - Diagnóstico destacado
                    - Plano de ação 30-60-90
                    - CTA final com botões
                */}
    <ResultadosNivel3 
      resultado={resultado.nivel3}
      nivel1={resultado.nivel1!}
      nivel2={resultado.nivel2!}
      diagnostico_estrategia={resultado.diagnostico_estrategia!}
      onNovaAnalise={resetar}
    />
  </div>
)}

          </div>
        )}

      </div>
    </div>
  );
}