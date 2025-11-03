'use client';

interface TabelaResultadosProps {
  titulo: string;
  colunas: string[];
  linhas: any[][];
}

export default function TabelaResultados({ titulo, colunas, linhas }: TabelaResultadosProps) {
  
  // ✅ FORMATAÇÃO BRASILEIRA CORRIGIDA - Formata valores monetários
  const formatarValor = (valor: any, colunaIndex: number): string => {
    // Se é a primeira coluna (nome do item), retorna direto
    if (colunaIndex === 0) {
      return String(valor);
    }
    
    if (valor === null || valor === undefined) return '-';
    
    // Se já é número, formatar direto no padrão brasileiro
    if (typeof valor === 'number') {
      return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    // Se é string
    if (typeof valor === 'string') {
      // Se contém +/- no início, preservar o sinal
      const temSinal = valor.startsWith('+') || valor.startsWith('-');
      const sinal = temSinal ? valor[0] : '';
      const valorSemSinal = temSinal ? valor.substring(1) : valor;
      
      // Se já tem R$ formatado, extrair número e reformatar
      if (valorSemSinal.includes('R$')) {
        const numeroStr = valorSemSinal.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
        const numero = parseFloat(numeroStr);
        if (!isNaN(numero)) {
          return sinal + numero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
        return valor;
      }
      
      // Se tem % já formatado, retorna
      if (valorSemSinal.includes('%')) return valor;
      
      // Tentar converter string para número
      // Remove pontos de milhar e substitui vírgula por ponto
      const valorLimpo = valorSemSinal.replace(/\./g, '').replace(',', '.');
      const numero = parseFloat(valorLimpo);
      
      if (!isNaN(numero)) {
        return sinal + numero.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
      
      return valor;
    }
    
    return String(valor);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {titulo}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {colunas.map((coluna, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider"
                >
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {linhas.map((linha, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {linha.map((celula, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 whitespace-nowrap ${
                      cellIndex === 0 
                        ? 'text-base font-medium text-gray-900' 
                        : 'text-base text-gray-700 font-semibold'
                    }`}
                  >
                    {formatarValor(celula, cellIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
