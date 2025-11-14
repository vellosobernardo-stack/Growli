// utils/gerarPDF.ts
// Versão PROFISSIONAL v2 - Layout limpo baseado no mockup

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
  if (typeof window === 'undefined') {
    console.error('gerarRelatorioPDF só pode ser executado no browser');
    return { success: false, error: 'SSR não suportado' };
  }

  const html2pdf = (await import('html2pdf.js')).default;

  // SVG da âncora Leme
  const logoSVG = `<svg width="28" height="28" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <path fill="#112d4e" d="M633.9,463.9c0,0,0-0.1-0.5,0.1c-0.2,0.3-0.4,0.6-0.5,0.9c0,0,0-0.1-0.5,0.1c-0.2,0.3-0.4,0.6-0.5,0.9c0,0,0-0.1-0.5,0.1c0,0-0.3,0.4-0.8,0.7c-12.2,10.5-24,21.7-36.8,31.4c-19.5,14.8-39.8,28.5-60.3,42.9c-0.3,0.2-0.6,0.4-0.9,0.7c0,0-0.1,0-0.6,0.3c-1,0.7-2,1.4-2.9,2.1c0,0,0-0.1-0.7,0.2c-4.7,2.6-9.3,5.4-14.1,7.7c-1.9,0.9-4.3,0.6-6.6,0.8c0,0,0-0.1-0.4-0.7c-3.1-9.3-6.2-18.5-9.2-28.6c-0.6-2.4-1.3-4.8-1.8-7.2c-1.4-6-2.7-12-4.1-18c0,0,0.1,0,0-0.7c-0.4-5.4-0.9-10.8-1.2-17c-0.7-7.8-1.3-15.5-1.9-24.1c-0.1-1.1-0.2-2.2-0.2-3.9c-0.2-0.9-0.4-1.8-0.4-3.5c-0.1-2-0.2-4-0.2-6c-0.1-23.9-0.2-47.8-0.1-72.6c0.3-2.7,0.9-5.5,1-8.2c0.4-9.8,0.8-19.6,0.8-29.4c0.2-39.3,0.3-78.6,0.3-117.8c0-5.5-0.8-11.1-1.2-17.2c-0.8-0.9-1.5-1.9-2.4-2.8c0,0,0-0.1-0.5-0.6c-2-0.7-3.9-2-5.9-2c-17.2-0.5-34.4-0.9-51.7-0.8c-2.9,0-5.8,2.1-8.8,3.3c0,0-0.1,0.1-0.6,0.4c-0.4,0.6-0.8,1.3-1,2.1c0,0-0.1-0.2-0.7,0.2c-0.7,2.3-1.3,4.5-2.1,7.7c-0.1,29.7-0.1,59.4,0,89c0,0,0-0.1-0.7,0.2c-0.8,0.3-1.5,0.6-2.3,0.9c-14.6,5.4-29.3,10.7-44.6,16.1c-38.4,18.8-70,45.7-95.6,79.8c-22.6,30-37.8,63.3-45.8,100.8c-1.9,15.7-3.9,31.5-6,48.2c0,7,0.1,14,0,21.9c0.6,18.7,3.2,37.1,8,55.8c0,0.8,0,1.5-0.4,2.7c-0.3,0.5-0.6,0.9-0.8,1.4c0,0,0-0.2-0.8,0.3c-1.9,0.3-3.9,0.9-5.8,0.9c-8.6,0.1-17.2-0.1-25.9,0.2c-2.8,0.1-5.6,1.4-9,2.5c-1.1,2.8-3.2,5.6-3.3,8.5c-0.3,13.9-0.3,27.9,0.1,41.8c0.1,3.4,2.4,6.8,4,10.8c4.1,1.1,8.1,3.1,12.2,3.2c18.4,0.3,36.9,0,55.3,0.2c2.5,0,5,1.6,7.7,2.5c0,0,0.1,0.1,0.3,0.6c0.4,0.4,0.7,0.7,1.1,1c0,0-0.1,0.1,0,0.5c0.4,0.6,0.9,1.1,1.4,2c0,0,0.2,0.2,0.5,0.7c1,1.3,2.1,2.6,3.1,3.7c0,0-0.1,0.1,0.1,0.6c0.5,0.6,0.9,1.2,1.5,1.8c0,0,0.1,0.1,0.2,0.4c0.1,0.2,0.2,0.3,0.5,0.8c0,0,0.3,0.2,0.6,0.7c0.6,0.7,1.1,1.4,1.8,2c0,0-0.1,0.1,0.1,0.6c0.4,0.4,0.8,0.7,1.2,1c0,0-0.1,0,0.1,0.5c0.3,0.2,0.6,0.4,0.9,0.5c0,0-0.1,0,0.1,0.6c0.8,0.9,1.6,1.8,2.5,2.8c0,0,0,0.1,0.4,0.6c0.7,0.7,1.4,1.3,2.1,1.9c0,0-0.1,0,0.1,0.5c0.3,0.2,0.6,0.4,0.9,0.5c0,0-0.1,0.1,0.1,0.7c1.4,1.5,2.8,3.1,4.4,5c0,0,0.4,0.1,0.5,0.1c0,0,0.1,0.1,0.2,0.6c0.2,0.1,0.3,0.2,0.7,0.7c0.3,0.3,0.7,0.6,1.1,0.8c0,0-0.1,0,0.1,0.6c0.3,0.2,0.6,0.4,1,1c0.1,0.3,0.4,0.4,0.9,1c0.3,0.2,0.6,0.4,1,0.5c0,0-0.1,0,0.1,0.7c4.4,4.1,8.7,8.3,13,12.3c0,0-0.1,0,0.1,0.5c0.3,0.2,0.6,0.4,1,0.5c0,0-0.1,0,0.1,0.5c0.3,0.2,0.6,0.4,0.9,0.5c0,0-0.1,0,0.1,0.5c0.4,0.3,0.7,0.6,1.4,1.1c0,0,0.3,0.1,0.6,0.6c2,1.6,3.9,3.3,6,4.7c0,0-0.2,0.1,0.1,0.6c0.4,0.3,0.8,0.5,1.4,1.1c0,0,0.3,0.1,0.6,0.5c0.5,0.4,1,0.8,1.7,1.2c0,0,0,0.1,0.4,0.6c0.7,0.4,1.3,0.9,2.1,1.7c0.2,0.2,0.5,0.3,1.1,0.9c1.3,1,2.6,1.9,4.2,3.1c0,0,0.3,0.1,0.7,0.6c1,0.6,2,1.2,3,1.7c0,0-0.1,0.1,0.2,0.7c3.2,2.2,6.5,4.4,9.7,6.5c0,0-0.1,0,0.2,0.6c1.9,1.1,3.8,2.3,5.8,3.3c0,0-0.1,0.1,0.2,0.7c1.6,0.8,3.1,1.7,4.7,2.4c0,0-0.1,0,0.3,0.6c1.6,0.8,3.2,1.6,4.8,2.3c0,0-0.1,0,0.4,0.6c26.3,14.8,54.1,25.4,84.6,31.3c11.4,1.6,22.8,3.2,34.7,4.9c0.2,0,0.3-0.1,1.2,0c0.8,0,1.5,0,3.1,0.2c22.9,1.7,45.6,0.1,69-4.1c1.3-0.3,2.5-0.7,3.8-0.9c26.9-5.4,52.4-14.6,77-28.2c30-16.5,56-38,78.5-63.8c19.4-22.2,35.2-46.8,47.1-74.7c3.7-10.2,7.5-20.4,10.9-30.8c0.6-2,0.7-4.6-0.8-7.7c-0.8-3.2-0.6-6.6-0.8-9.9c0-0.1-0.1-0.1-0.8-0.3c-0.3-0.3-0.6-0.6-0.9-0.9c-4.3-4.2-8.6-8.4-13-12.5c0,0-0.1-0.1-0.6-0.2c-0.3-0.3-0.5-0.6-0.8-0.9c-0.7-0.7-1.5-1.3-2.2-2c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9l-0.3-0.3c0,0-0.5-0.1-0.6-0.2c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c-0.3-0.3-0.5-0.6-0.8-0.9c0,0-0.1,0-0.6-0.3c-0.3-0.3-0.5-0.6-0.8-0.9c0,0,0-0.1-0.5-0.2c0,0-0.1-0.1-0.2-0.5c-0.3-0.3-0.5-0.6-0.8-0.9c0,0,0-0.1-0.5-0.2c-0.3-0.3-0.5-0.6-0.8-0.9c0,0,0-0.1-0.5-0.2z"/>
  </svg>`;

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
        
        @page {
          margin: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.5;
          color: #081524;
          background: white;
        }
        
        /* ==================== CAPA ==================== */
        .cover {
          height: 297mm;
          background: linear-gradient(135deg, #112d4e 0%, #1a4578 100%);
          position: relative;
          page-break-after: always;
          padding: 60px;
        }
        
        .cover-pattern {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(245, 121, 59, 0.08) 35px,
            rgba(245, 121, 59, 0.08) 70px
          );
        }
        
        .cover-logo {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 100px;
        }
        
        .cover-logo-text {
          font-size: 28px;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
        }
        
        .cover-content {
          position: relative;
          z-index: 10;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }
        
        .cover-title {
          font-size: 48px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
          line-height: 1.2;
        }
        
        .cover-date {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 80px;
        }
        
        .cover-box {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .cover-item {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .cover-item:last-child {
          border-bottom: none;
        }
        
        .cover-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .cover-value {
          font-size: 16px;
          color: #112d4e;
          font-weight: 700;
        }
        
        /* ==================== PÁGINAS ==================== */
        .page {
          min-height: 297mm;
          padding: 40px 50px;
          page-break-after: always;
        }
        
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 3px solid #F5793B;
          margin-bottom: 32px;
        }
        
        .header-text {
          font-size: 20px;
          font-weight: 700;
          color: #112d4e;
          letter-spacing: 0.5px;
        }
        
        .page-num {
          margin-left: auto;
          font-size: 13px;
          color: #6b7280;
        }
        
        /* ==================== VISÃO GERAL ==================== */
        .visao-box {
          background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
          border-left: 5px solid #F5793B;
          border-radius: 12px;
          padding: 28px;
          margin-bottom: 36px;
        }
        
        .visao-title {
          font-size: 24px;
          font-weight: 700;
          color: #112d4e;
          margin-bottom: 12px;
        }
        
        .visao-text {
          font-size: 15px;
          color: #374151;
          line-height: 1.7;
        }
        
        /* ==================== SEÇÃO ==================== */
        .section-title {
          font-size: 26px;
          font-weight: 700;
          color: #112d4e;
          margin-bottom: 24px;
          margin-top: 12px;
        }
        
        /* ==================== CARDS ==================== */
        .card {
          background: #d1fae5;
          border-left: 4px solid #10b981;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 16px;
          page-break-inside: avoid;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .card-title {
          font-size: 16px;
          font-weight: 700;
          color: #112d4e;
          flex: 1;
        }
        
        .badge {
          padding: 5px 12px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .badge-alto, .badge-alta {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .badge-medio, .badge-média {
          background: #fef3c7;
          color: #92400e;
        }
        
        .badge-baixo, .badge-baixa {
          background: #dbeafe;
          color: #1e40af;
        }
        
        .badge-critico, .badge-crítico {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .badge-atencao, .badge-atenção {
          background: #fef3c7;
          color: #92400e;
        }
        
        .card-desc {
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }
        
        /* ==================== ATENÇÃO ==================== */
        .card-atencao {
          background: #fed7aa;
          border-left-color: #F5793B;
        }
        
        /* ==================== PLANO ==================== */
        .plano {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .plano-header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 20px 28px;
          border-radius: 12px 12px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .plano-header-60 {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }
        
        .plano-header-90 {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }
        
        .plano-title {
          font-size: 28px;
          font-weight: 800;
        }
        
        .plano-subtitle {
          font-size: 15px;
          opacity: 0.9;
          margin-top: 4px;
        }
        
        .plano-body {
          background: white;
          border: 2px solid #e5e7eb;
          border-top: none;
          border-radius: 0 0 12px 12px;
          padding: 24px;
        }
        
        .acao {
          background: #f9fafb;
          padding: 18px;
          margin-bottom: 12px;
          border-radius: 10px;
          border-left: 3px solid #10b981;
          page-break-inside: avoid;
        }
        
        .acao-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .acao-num {
          background: #112d4e;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        .acao-title {
          font-size: 15px;
          font-weight: 700;
          color: #112d4e;
          flex: 1;
        }
        
        .acao-desc {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          padding-left: 36px;
        }
        
        /* ==================== KPIs ==================== */
        .kpis-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 24px;
        }
        
        .kpi {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          text-align: center;
        }
        
        .kpi-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        
        .kpi-value {
          font-size: 28px;
          font-weight: 800;
          color: #112d4e;
          margin-bottom: 10px;
        }
        
        .kpi-status {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
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
        
        /* ==================== FOOTER ==================== */
        .footer {
          position: absolute;
          bottom: 30px;
          left: 50px;
          right: 50px;
          padding-top: 16px;
          border-top: 2px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <!-- CAPA -->
      <div class="cover">
        <div class="cover-pattern"></div>
        <div class="cover-logo">
          ${logoSVG}
          <span class="cover-logo-text">LEME</span>
        </div>
        <div class="cover-content">
          <h1 class="cover-title">Relatório de Análise<br>Financeira</h1>
          <p class="cover-date">${dados.data}</p>
          <div class="cover-box">
            ${dados.empresa ? `
              <div class="cover-item">
                <span class="cover-label">Empresa</span>
                <span class="cover-value">${dados.empresa}</span>
              </div>
            ` : ''}
            ${dados.setor ? `
              <div class="cover-item">
                <span class="cover-label">Setor</span>
                <span class="cover-value">${dados.setor}</span>
              </div>
            ` : ''}
            ${dados.estado ? `
              <div class="cover-item">
                <span class="cover-label">Estado</span>
                <span class="cover-value">${dados.estado}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- PÁGINA 2: DIAGNÓSTICO -->
      <div class="page">
        <div class="header">
          ${logoSVG}
          <span class="header-text">LEME</span>
          <span class="page-num">Página 2</span>
        </div>
        
        <div class="visao-box">
          <h2 class="visao-title">Visão Geral</h2>
          <p class="visao-text">${dados.diagnostico.visaoGeral}</p>
        </div>
        
        <h2 class="section-title">Principais Oportunidades</h2>
        ${dados.diagnostico.principais_oportunidades.map(op => `
          <div class="card">
            <div class="card-header">
              <div class="card-title">${op.titulo}</div>
              <span class="badge badge-${op.prioridade.toLowerCase()}">${op.prioridade.toUpperCase()}</span>
            </div>
            <div class="card-desc">${op.descricao}</div>
          </div>
        `).join('')}
        
        ${dados.diagnostico.pontos_de_atencao.length > 0 ? `
          <h2 class="section-title">Pontos de Atenção</h2>
          ${dados.diagnostico.pontos_de_atencao.map(ponto => `
            <div class="card card-atencao">
              <div class="card-header">
                <div class="card-title">${ponto.indicador} (${ponto.valor_atual})</div>
                <span class="badge badge-${ponto.nivel.toLowerCase()}">${ponto.nivel.toUpperCase()}</span>
              </div>
              <div class="card-desc">${ponto.comentario}</div>
            </div>
          `).join('')}
        ` : ''}
        
        <div class="footer">
          <div>${dados.empresa || 'Empresa'}</div>
          <div>${dados.data}</div>
        </div>
      </div>

      <!-- PÁGINA 3: PLANO 30-60 -->
      <div class="page">
        <div class="header">
          ${logoSVG}
          <span class="header-text">LEME</span>
          <span class="page-num">Página 3</span>
        </div>
        
        <h2 class="section-title">Plano de Ação 30-60-90 Dias</h2>
        
        <div class="plano">
          <div class="plano-header">
            <div>
              <div class="plano-title">30 dias</div>
              <div class="plano-subtitle">Fundamentos e Otimizações Rápidas</div>
            </div>
          </div>
          <div class="plano-body">
            ${dados.planoAcao.dias30.map((acao, i) => `
              <div class="acao">
                <div class="acao-header">
                  <div class="acao-title">
                    <span class="acao-num">${i + 1}</span>
                    ${acao.titulo}
                  </div>
                  <span class="badge badge-${acao.prioridade.toLowerCase()}">${acao.prioridade.toUpperCase()}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="plano">
          <div class="plano-header plano-header-60">
            <div>
              <div class="plano-title">60 dias</div>
              <div class="plano-subtitle">Implementação e Expansão</div>
            </div>
          </div>
          <div class="plano-body">
            ${dados.planoAcao.dias60.map((acao, i) => `
              <div class="acao">
                <div class="acao-header">
                  <div class="acao-title">
                    <span class="acao-num">${i + 1}</span>
                    ${acao.titulo}
                  </div>
                  <span class="badge badge-${acao.prioridade.toLowerCase()}">${acao.prioridade.toUpperCase()}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="footer">
          <div>${dados.empresa || 'Empresa'}</div>
          <div>${dados.data}</div>
        </div>
      </div>

      <!-- PÁGINA 4: PLANO 90 -->
      <div class="page">
        <div class="header">
          ${logoSVG}
          <span class="header-text">LEME</span>
          <span class="page-num">Página 4</span>
        </div>
        
        <div class="plano">
          <div class="plano-header plano-header-90">
            <div>
              <div class="plano-title">90 dias</div>
              <div class="plano-subtitle">Consolidação e Crescimento</div>
            </div>
          </div>
          <div class="plano-body">
            ${dados.planoAcao.dias90.map((acao, i) => `
              <div class="acao">
                <div class="acao-header">
                  <div class="acao-title">
                    <span class="acao-num">${i + 1}</span>
                    ${acao.titulo}
                  </div>
                  <span class="badge badge-${acao.prioridade.toLowerCase()}">${acao.prioridade.toUpperCase()}</span>
                </div>
                <div class="acao-desc">${acao.descricao}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        ${dados.kpis && dados.kpis.length > 0 ? `
          <h2 class="section-title">Indicadores Principais</h2>
          <div class="kpis-grid">
            ${dados.kpis.map(kpi => `
              <div class="kpi">
                <div class="kpi-label">${kpi.nome}</div>
                <div class="kpi-value">${kpi.valor}</div>
                <span class="kpi-status kpi-${kpi.classificacao}">
                  ${kpi.classificacao === 'verde' ? 'SAUDÁVEL' :
                    kpi.classificacao === 'amarelo' ? 'ATENÇÃO' : 'CRÍTICO'}
                </span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="footer">
          <div>${dados.empresa || 'Empresa'}</div>
          <div>${dados.data}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  element.style.width = '210mm';
  element.style.minHeight = '297mm';

  const options = {
    margin: 0,
    filename: `leme-analise-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' as const,
      compress: true,
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
    }
  };

  try {
    await html2pdf().set(options).from(element).save();
    return { success: true };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return { success: false, error };
  }
}