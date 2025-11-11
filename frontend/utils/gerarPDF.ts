// utils/gerarPDF.ts
// Versão corrigida para Next.js (SSR-safe)

interface DadosRelatorio {
  empresa?: string;
  setor?: string;
  estado?: string;
  data: string;
  diagnostico: {
    visaoGeral: string;
    principais_oportunidades: Array<{
      titulo: string;
      descricao: string;
      prioridade: string;
    }>;
    pontos_de_atencao: Array<{
      indicador: string;
      valor_atual: string;
      comentario: string;
      nivel: string;
    }>;
  };
  planoAcao: {
    dias30: Array<{
      titulo: string;
      descricao: string;
      prioridade: string;
    }>;
    dias60: Array<{
      titulo: string;
      descricao: string;
      prioridade: string;
    }>;
    dias90: Array<{
      titulo: string;
      descricao: string;
      prioridade: string;
    }>;
  };
  kpis?: Array<{
    nome: string;
    valor: string;
    classificacao: string;
  }>;
}

export async function gerarRelatorioPDF(dados: DadosRelatorio) {
  // ✅ VERIFICAR SE ESTÁ NO BROWSER
  if (typeof window === 'undefined') {
    console.error('gerarRelatorioPDF só pode ser executado no browser');
    return { success: false, error: 'SSR não suportado' };
  }

  // ✅ IMPORT DINÂMICO (apenas no cliente)
  const html2pdf = (await import('html2pdf.js')).default;

  // HTML do relatório
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: white;
          padding: 40px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #10b981;
        }
        
        .header h1 {
          font-size: 32px;
          color: #10b981;
          margin-bottom: 10px;
        }
        
        .header p {
          font-size: 14px;
          color: #6b7280;
        }
        
        .badge {
          display: inline-block;
          padding: 8px 16px;
          background: #d1fae5;
          border: 2px solid #10b981;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #059669;
          margin: 20px 0;
        }
        
        .section {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 22px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .subsection-title {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin: 20px 0 15px 0;
        }
        
        .visao-geral {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        .visao-geral p {
          font-size: 14px;
          line-height: 1.8;
        }
        
        .oportunidade {
          background: #d1fae5;
          border-left: 4px solid #10b981;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 6px;
          page-break-inside: avoid;
        }
        
        .oportunidade-titulo {
          font-weight: 600;
          font-size: 15px;
          color: #047857;
          margin-bottom: 8px;
        }
        
        .oportunidade-desc {
          font-size: 13px;
          color: #374151;
          line-height: 1.6;
        }
        
        .badge-prioridade {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 10px;
        }
        
        .badge-alta {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .badge-media {
          background: #fef3c7;
          color: #92400e;
        }
        
        .badge-baixa {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .atencao {
          background: #fed7aa;
          border-left: 4px solid #ea580c;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 6px;
          page-break-inside: avoid;
        }
        
        .atencao-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .atencao-titulo {
          font-weight: 600;
          font-size: 14px;
          color: #9a3412;
        }
        
        .badge-nivel {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        
        .badge-critico {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .badge-atencao {
          background: #fef3c7;
          color: #92400e;
        }
        
        .atencao-desc {
          font-size: 13px;
          color: #374151;
          line-height: 1.6;
        }
        
        .plano-periodo {
          margin-bottom: 35px;
          page-break-inside: avoid;
        }
        
        .periodo-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 15px 20px;
          border-radius: 8px 8px 0 0;
          margin-bottom: 0;
        }
        
        .periodo-header.periodo-60 {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }
        
        .periodo-header.periodo-90 {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }
        
        .periodo-titulo {
          font-size: 20px;
          font-weight: bold;
        }
        
        .periodo-subtitulo {
          font-size: 14px;
          opacity: 0.9;
          margin-top: 5px;
        }
        
        .acoes-lista {
          background: white;
          border: 2px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 8px 8px;
          padding: 20px;
        }
        
        .acao-item {
          background: #f9fafb;
          padding: 15px;
          margin-bottom: 12px;
          border-radius: 6px;
          border-left: 3px solid #10b981;
          page-break-inside: avoid;
        }
        
        .acao-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .acao-titulo {
          font-weight: 600;
          font-size: 14px;
          color: #1f2937;
          flex: 1;
        }
        
        .acao-desc {
          font-size: 13px;
          color: #4b5563;
          line-height: 1.6;
        }
        
        .kpis-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 20px;
        }
        
        .kpi-card {
          background: #f9fafb;
          padding: 15px;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }
        
        .kpi-nome {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .kpi-valor {
          font-size: 20px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .kpi-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        
        .kpi-verde {
          background: #d1fae5;
          color: #047857;
        }
        
        .kpi-amarelo {
          background: #fef3c7;
          color: #92400e;
        }
        
        .kpi-vermelho {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        
        .page-break {
          page-break-before: always;
        }
      </style>
    </head>
    <body>
      <!-- HEADER -->
      <div class="header">
        <h1> Leme - Relatório de Análise Financeira</h1>
        ${dados.empresa ? `<p><strong>Empresa:</strong> ${dados.empresa}</p>` : ''}
        ${dados.setor ? `<p><strong>Setor:</strong> ${dados.setor}</p>` : ''}
        ${dados.estado ? `<p><strong>Estado:</strong> ${dados.estado}</p>` : ''}
        <p><strong>Data:</strong> ${dados.data}</p>
        <div class="badge">✅ Análise Completa Finalizada</div>
      </div>

      <!-- SEÇÃO: DIAGNÓSTICO -->
      <div class="section">
        <div class="section-title">🧠 Diagnóstico Inteligente</div>
        
        <!-- Visão Geral -->
        <div class="subsection-title">📊 Visão Geral</div>
        <div class="visao-geral">
          <p>${dados.diagnostico.visaoGeral}</p>
        </div>

        <!-- Principais Oportunidades -->
        <div class="subsection-title">⚡ Principais Oportunidades</div>
        ${dados.diagnostico.principais_oportunidades.map(op => `
          <div class="oportunidade">
            <div class="oportunidade-titulo">
              ${op.titulo}
              <span class="badge-prioridade ${
                op.prioridade === 'Alto' ? 'badge-alta' : 
                op.prioridade === 'Médio' ? 'badge-media' : 
                'badge-baixa'
              }">${op.prioridade}</span>
            </div>
            <div class="oportunidade-desc">${op.descricao}</div>
          </div>
        `).join('')}

        <!-- Pontos de Atenção -->
        ${dados.diagnostico.pontos_de_atencao.length > 0 ? `
          <div class="subsection-title">⚠️ Pontos de Atenção</div>
          ${dados.diagnostico.pontos_de_atencao.map(ponto => `
            <div class="atencao">
              <div class="atencao-header">
                <div class="atencao-titulo">
                  ${ponto.indicador} (${ponto.valor_atual})
                </div>
                <span class="badge-nivel ${
                  ponto.nivel === 'Crítico' ? 'badge-critico' : 'badge-atencao'
                }">${ponto.nivel}</span>
              </div>
              <div class="atencao-desc">${ponto.comentario}</div>
            </div>
          `).join('')}
        ` : ''}
      </div>

      <!-- QUEBRA DE PÁGINA -->
      <div class="page-break"></div>

      <!-- SEÇÃO: PLANO 30-60-90 -->
      <div class="section">
        <div class="section-title">🎯 Plano de Ação 30-60-90 Dias</div>
        
        <!-- 30 DIAS -->
        <div class="plano-periodo">
          <div class="periodo-header">
            <div class="periodo-titulo">30 dias</div>
            <div class="periodo-subtitulo">Fundamentos e Otimizações Rápidas</div>
          </div>
          <div class="acoes-lista">
            ${dados.planoAcao.dias30.map((acao, idx) => `
              <div class="acao-item">
                <div class="acao-header">
                  <div class="acao-titulo">${idx + 1}. ${acao.titulo}</div>
                  <span class="badge-prioridade ${
                    acao.prioridade === 'Alta' ? 'badge-alta' : 
                    acao.prioridade === 'Média' ? 'badge-media' : 
                    'badge-baixa'
                  }">${acao.prioridade}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 60 DIAS -->
        <div class="plano-periodo">
          <div class="periodo-header periodo-60">
            <div class="periodo-titulo">60 dias</div>
            <div class="periodo-subtitulo">Implementação e Expansão</div>
          </div>
          <div class="acoes-lista">
            ${dados.planoAcao.dias60.map((acao, idx) => `
              <div class="acao-item">
                <div class="acao-header">
                  <div class="acao-titulo">${idx + 1}. ${acao.titulo}</div>
                  <span class="badge-prioridade ${
                    acao.prioridade === 'Alta' ? 'badge-alta' : 
                    acao.prioridade === 'Média' ? 'badge-media' : 
                    'badge-baixa'
                  }">${acao.prioridade}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 90 DIAS -->
        <div class="plano-periodo">
          <div class="periodo-header periodo-90">
            <div class="periodo-titulo">90 dias</div>
            <div class="periodo-subtitulo">Consolidação e Crescimento</div>
          </div>
          <div class="acoes-lista">
            ${dados.planoAcao.dias90.map((acao, idx) => `
              <div class="acao-item">
                <div class="acao-header">
                  <div class="acao-titulo">${idx + 1}. ${acao.titulo}</div>
                  <span class="badge-prioridade ${
                    acao.prioridade === 'Alta' ? 'badge-alta' : 
                    acao.prioridade === 'Média' ? 'badge-media' : 
                    'badge-baixa'
                  }">${acao.prioridade}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SEÇÃO: KPIs (SE HOUVER) -->
      ${dados.kpis && dados.kpis.length > 0 ? `
        <div class="page-break"></div>
        <div class="section">
          <div class="section-title">📊 Indicadores Principais</div>
          <div class="kpis-grid">
            ${dados.kpis.map(kpi => `
              <div class="kpi-card">
                <div class="kpi-nome">${kpi.nome}</div>
                <div class="kpi-valor">${kpi.valor}</div>
                <span class="kpi-badge ${
                  kpi.classificacao === 'verde' ? 'kpi-verde' :
                  kpi.classificacao === 'amarelo' ? 'kpi-amarelo' :
                  'kpi-vermelho'
                }">
                  ${kpi.classificacao === 'verde' ? 'Saudável' :
                    kpi.classificacao === 'amarelo' ? 'Atenção' :
                    'Crítico'}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- FOOTER -->
      <div class="footer">
        <p>Relatório gerado por Leme - Análise Financeira Inteligente</p>
        <p>www.leme.app.br</p>
      </div>
    </body>
    </html>
  `;

  // Criar elemento temporário
  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  element.style.width = '210mm'; // A4 width
  element.style.minHeight = '297mm'; // A4 height

  // Configurações do PDF
  const options = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: `leme-relatorio-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Gerar e baixar PDF
  try {
    await html2pdf().set(options).from(element).save();
    return { success: true };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return { success: false, error };
  }
}