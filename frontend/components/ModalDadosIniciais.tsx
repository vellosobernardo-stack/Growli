'use client';

import { useState } from 'react';
import { Building2, Mail, X } from 'lucide-react';

interface ModalDadosIniciaisProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dados: { email: string; nomeEmpresa: string }) => void;
}

export default function ModalDadosIniciais({ isOpen, onClose, onSubmit }: ModalDadosIniciaisProps) {
  const [email, setEmail] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [erro, setErro] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validações
    if (!email || !nomeEmpresa) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro('Por favor, insira um e-mail válido.');
      return;
    }

    // Tudo OK - enviar dados
    onSubmit({ email, nomeEmpresa });
  };

  return (
    <>
      {/* Overlay/Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#112d4e20' }}
              >
                <Building2 
                  className="w-6 h-6" 
                  style={{ color: '#112d4e' }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Antes de começar
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Precisamos de algumas informações
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Erro */}
            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
                <p className="text-sm text-red-600">{erro}</p>
              </div>
            )}

            {/* Campo Nome da Empresa */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Nome da Empresa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                  placeholder="Ex: Minha Empresa Ltda"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#112d4e]/20 focus:border-[#112d4e] transition-all outline-none"
                />
              </div>
            </div>

            {/* Campo E-mail */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Seu E-mail <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#112d4e]/20 focus:border-[#112d4e] transition-all outline-none"
                />
              </div>
            </div>

            {/* Texto informativo */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800 leading-relaxed">
                <strong>💡 Por que precisamos disso?</strong><br />
                Usaremos seu e-mail para enviar o relatório completo da análise e insights personalizados.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 text-white font-semibold rounded-lg transition-all"
                style={{
                  backgroundColor: '#112d4e',
                  boxShadow: '0 4px 12px rgba(17, 45, 78, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0f2640';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#112d4e';
                }}
              >
                Iniciar Análise
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
