'use client';

import { useState } from 'react';
import { 
  MetaDados, 
  DadosNivel1, 
  DadosNivel2, 
  DadosNivel3, 
  AnaliseRequest,
  AnaliseResponse 
} from '@/types/analise';
import { enviarAnalise } from '@/utils/api';

export function useAnalise() {
  // Estado do nível atual
  const [nivelAtual, setNivelAtual] = useState<1 | 2 | 3>(1);
  
  // Estado de loading
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  
  // Dados dos formulários
  const [metaDados, setMetaDados] = useState<MetaDados | null>(null);
  const [dadosN1, setDadosN1] = useState<DadosNivel1 | null>(null);
  const [dadosN2, setDadosN2] = useState<DadosNivel2 | null>(null);
  const [dadosN3, setDadosN3] = useState<DadosNivel3 | null>(null);
  
  // Resultados da análise
  const [resultado, setResultado] = useState<AnaliseResponse | null>(null);

  // Submeter Nível 1
  const submeterNivel1 = async (meta: MetaDados, dados: DadosNivel1) => {
    setLoading(true);
    setErro(null);
    
    try {
      // Salvar dados
      setMetaDados(meta);
      setDadosN1(dados);
      
      // Montar requisição
      const requisicao: AnaliseRequest = {
        meta,
        nivel1: dados,
      };
      
      // Enviar para API
      const resposta = await enviarAnalise(requisicao);
      
      // Salvar resultado
      setResultado(resposta);
      
      return true;
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar análise');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Submeter Nível 2
  const submeterNivel2 = async (dados: DadosNivel2) => {
    if (!metaDados || !dadosN1) {
      setErro('Dados do Nível 1 não encontrados');
      return false;
    }
    
    setLoading(true);
    setErro(null);
    
    try {
      // Salvar dados
      setDadosN2(dados);
      
      // Atualizar meta com novo nível
      const metaAtualizada: MetaDados = {
        ...metaDados,
        nivel_maximo_preenchido: 2,
      };
      
      // Montar requisição
      const requisicao: AnaliseRequest = {
        meta: metaAtualizada,
        nivel1: dadosN1,
        nivel2: dados,
      };
      
      // Enviar para API
      const resposta = await enviarAnalise(requisicao);
      
      // Salvar resultado
      setResultado(resposta);
      
      return true;
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar análise');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Submeter Nível 3
  const submeterNivel3 = async (dados: DadosNivel3) => {
    if (!metaDados || !dadosN1 || !dadosN2) {
      setErro('Dados dos níveis anteriores não encontrados');
      return false;
    }
    
    setLoading(true);
    setErro(null);
    
    try {
      // Salvar dados
      setDadosN3(dados);
      
      // Atualizar meta com novo nível
      const metaAtualizada: MetaDados = {
        ...metaDados,
        nivel_maximo_preenchido: 3,
      };
      
      // Montar requisição
      const requisicao: AnaliseRequest = {
        meta: metaAtualizada,
        nivel1: dadosN1,
        nivel2: dadosN2,
        nivel3: dados,
      };
      
      // Enviar para API
      const resposta = await enviarAnalise(requisicao);
      
      // Salvar resultado
      setResultado(resposta);
      
      return true;
    } catch (error: any) {
      setErro(error.message || 'Erro ao processar análise');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Avançar para próximo nível
  const avancarNivel = () => {
    if (nivelAtual < 3) {
      setNivelAtual((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  // Voltar para nível anterior
  const voltarNivel = () => {
    if (nivelAtual > 1) {
      setNivelAtual((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // Resetar tudo
  const resetar = () => {
    setNivelAtual(1);
    setMetaDados(null);
    setDadosN1(null);
    setDadosN2(null);
    setDadosN3(null);
    setResultado(null);
    setErro(null);
  };

  return {
    // Estado
    nivelAtual,
    loading,
    erro,
    resultado,
    
    // Ações
    submeterNivel1,
    submeterNivel2,
    submeterNivel3,
    avancarNivel,
    voltarNivel,
    resetar,
    
    // Dados (para debug)
    metaDados,
    dadosN1,
    dadosN2,
    dadosN3,
  };
}