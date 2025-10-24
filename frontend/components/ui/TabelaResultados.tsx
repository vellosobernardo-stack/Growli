'use client';

interface TabelaResultadosProps {
  titulo: string;
  colunas: string[];
  linhas: any[][];
}

export default function TabelaResultados({ titulo, colunas, linhas }: TabelaResultadosProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {colunas.map((coluna, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {linhas.map((linha, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {linha.map((celula, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {celula}
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