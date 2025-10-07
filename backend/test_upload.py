"""
Script de Teste para Upload e Parsing de PDF
Use este arquivo para testar o sistema antes de integrar com a API
"""
import sys
import os

# Adicionar o diretório app ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

from services.pdf_parser import PDFParser


def test_local_pdf(pdf_path: str):
    """
    Testa o parser com um arquivo PDF local
    
    Como usar:
    python test_upload.py caminho/do/seu/arquivo.pdf
    """
    
    print("""
    ╔══════════════════════════════════════════════════════╗
    ║                                                      ║
    ║        🌱 GROWLI - TESTE DE UPLOAD PDF              ║
    ║                                                      ║
    ╚══════════════════════════════════════════════════════╝
    """)
    
    # Verificar se arquivo existe
    if not os.path.exists(pdf_path):
        print(f"❌ Erro: Arquivo não encontrado: {pdf_path}")
        return
    
    # Verificar extensão
    if not pdf_path.lower().endswith('.pdf'):
        print(f"❌ Erro: O arquivo deve ser um PDF")
        return
    
    print(f"📄 Arquivo: {os.path.basename(pdf_path)}")
    print(f"📁 Caminho: {os.path.abspath(pdf_path)}")
    print(f"📏 Tamanho: {os.path.getsize(pdf_path) / 1024:.2f} KB")
    
    print("\n🔍 Iniciando extração de dados...\n")
    
    # Criar parser e extrair dados
    parser = PDFParser()
    result = parser.extract_financial_data(pdf_path)
    
    # Exibir resultados
    print("\n" + "="*70)
    print("📊 RESULTADOS DA EXTRAÇÃO")
    print("="*70)
    
    # Score de confiança
    score = result.get('confidence_score', 0)
    score_emoji = "🟢" if score >= 0.7 else "🟡" if score >= 0.4 else "🔴"
    
    print(f"\n{score_emoji} Score de Confiança: {score:.2%}")
    print(f"✓ Campos Encontrados: {result['campos_encontrados']}/{result['total_campos']}")
    
    # Valores extraídos
    print("\n💰 BALANÇO PATRIMONIAL")
    print("-" * 70)
    print(f"  Caixa e Bancos:           R$ {result['caixa']:>15,.2f}")
    print(f"  Contas a Receber:         R$ {result['contas_receber']:>15,.2f}")
    print(f"  Estoque:                  R$ {result['estoque']:>15,.2f}")
    print(f"  Imobilizado:              R$ {result['imobilizado']:>15,.2f}")
    
    ativo_total = (result['caixa'] + result['contas_receber'] + 
                   result['estoque'] + result['imobilizado'])
    print(f"\n  {'ATIVO TOTAL:':<28} R$ {ativo_total:>15,.2f}")
    
    print("\n  Fornecedores:             R$ {0:>15,.2f}".format(result['fornecedores']))
    print(f"  Empréstimos Curto Prazo:  R$ {result['emprestimos_cp']:>15,.2f}")
    print(f"  Impostos a Pagar:         R$ {result['impostos']:>15,.2f}")
    print(f"  Empréstimos Longo Prazo:  R$ {result['emprestimos_lp']:>15,.2f}")
    
    passivo_total = (result['fornecedores'] + result['emprestimos_cp'] + 
                     result['impostos'] + result['emprestimos_lp'])
    print(f"\n  {'PASSIVO TOTAL:':<28} R$ {passivo_total:>15,.2f}")
    
    patrimonio = ativo_total - passivo_total
    print(f"  {'PATRIMÔNIO LÍQUIDO:':<28} R$ {patrimonio:>15,.2f}")
    
    # DRE
    print("\n💵 DEMONSTRAÇÃO DE RESULTADO (DRE)")
    print("-" * 70)
    print(f"  Receita Bruta:            R$ {result['receita_bruta']:>15,.2f}")
    print(f"  (-) Custo das Vendas:     R$ {result['custo_vendas']:>15,.2f}")
    
    lucro_bruto = result['receita_bruta'] - result['custo_vendas']
    print(f"  (=) Lucro Bruto:          R$ {lucro_bruto:>15,.2f}")
    
    print(f"  (-) Despesas Operacionais:R$ {result['despesas_operacionais']:>15,.2f}")
    
    lucro_operacional = lucro_bruto - result['despesas_operacionais']
    print(f"  (=) Lucro Operacional:    R$ {lucro_operacional:>15,.2f}")
    
    print(f"  (-) Despesas Financeiras: R$ {result['despesas_financeiras']:>15,.2f}")
    
    lucro_liquido = lucro_operacional - result['despesas_financeiras']
    print(f"  (=) Lucro Líquido:        R$ {lucro_liquido:>15,.2f}")
    
    # Avisos
    if result.get('warnings'):
        print("\n⚠️  AVISOS")
        print("-" * 70)
        for warning in result['warnings']:
            print(f"  • {warning}")
    
    # Validação
    print("\n🔍 VALIDAÇÃO DOS DADOS")
    print("-" * 70)
    
    is_valid, errors = parser.validate_extracted_data(result)
    
    if is_valid:
        print("  ✅ Dados validados com sucesso!")
    else:
        print("  ❌ Erros encontrados:")
        for error in errors:
            print(f"     • {error}")
    
    # Recomendações
    print("\n💡 RECOMENDAÇÕES")
    print("-" * 70)
    
    if score >= 0.7:
        print("  ✅ Extração bem-sucedida! Os dados podem ser usados com confiança.")
    elif score >= 0.4:
        print("  ⚠️  Extração parcial. Recomendamos revisar os campos não encontrados.")
    else:
        print("  ❌ Extração com baixa confiança. Recomendamos entrada manual dos dados.")
    
    if result['campos_encontrados'] < result['total_campos']:
        print(f"  💡 {result['total_campos'] - result['campos_encontrados']} campos não foram encontrados.")
        print("     Dica: Certifique-se de que o PDF contém os nomes das contas claramente.")
    
    print("\n" + "="*70 + "\n")
    
    return result


def create_sample_pdf_content():
    """
    Mostra um exemplo de como um PDF deve estar estruturado
    """
    print("""
    📝 EXEMPLO DE ESTRUTURA DE PDF IDEAL
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    BALANÇO PATRIMONIAL - Empresa XYZ Ltda
    Período: Dezembro/2024
    
    ATIVO
    ────────────────────────────────────
    Ativo Circulante
      Caixa e Bancos                    R$ 50.000,00
      Contas a Receber                  R$ 80.000,00
      Estoque                           R$ 120.000,00
    
    Ativo Não Circulante
      Imobilizado                       R$ 200.000,00
    
    TOTAL DO ATIVO                      R$ 450.000,00
    
    
    PASSIVO
    ────────────────────────────────────
    Passivo Circulante
      Fornecedores                      R$ 60.000,00
      Empréstimos Curto Prazo           R$ 30.000,00
      Impostos a Pagar                  R$ 15.000,00
    
    Passivo Não Circulante
      Empréstimos Longo Prazo           R$ 100.000,00
    
    TOTAL DO PASSIVO                    R$ 205.000,00
    
    PATRIMÔNIO LÍQUIDO                  R$ 245.000,00
    
    
    DEMONSTRAÇÃO DO RESULTADO DO EXERCÍCIO (DRE)
    ────────────────────────────────────
    Receita Bruta                       R$ 500.000,00
    (-) Custo das Vendas                R$ 300.000,00
    (=) Lucro Bruto                     R$ 200.000,00
    
    (-) Despesas Operacionais           R$ 120.000,00
    (=) Lucro Operacional               R$ 80.000,00
    
    (-) Despesas Financeiras            R$ 8.000,00
    (=) Lucro Líquido                   R$ 72.000,00
    
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    💡 DICAS PARA MELHORAR A EXTRAÇÃO:
    
    1. Use os nomes padrão das contas (Caixa, Contas a Receber, etc)
    2. Mantenha valores no formato: R$ 1.000,00
    3. Organize em seções claras (Ativo, Passivo, DRE)
    4. Evite tabelas muito complexas
    5. Use fonte legível (não use imagens de texto)
    
    """)


def main():
    """Função principal"""
    
    if len(sys.argv) < 2:
        print("""
    ╔══════════════════════════════════════════════════════╗
    ║                                                      ║
    ║        🌱 GROWLI - TESTE DE UPLOAD PDF              ║
    ║                                                      ║
    ╚══════════════════════════════════════════════════════╝
    
    ❌ Nenhum arquivo especificado!
    
    📖 COMO USAR:
    
    python test_upload.py caminho/do/arquivo.pdf
    
    Exemplos:
      python test_upload.py relatorio_financeiro.pdf
      python test_upload.py C:\\Users\\Usuario\\Desktop\\balanco.pdf
      python test_upload.py ../documentos/dre_2024.pdf
    
    ──────────────────────────────────────────────────────
    
    Quer ver um exemplo de PDF ideal?
    Digite: python test_upload.py --exemplo
        """)
        return
    
    # Mostrar exemplo
    if sys.argv[1] == "--exemplo" or sys.argv[1] == "-e":
        create_sample_pdf_content()
        return
    
    # Testar PDF
    pdf_path = sys.argv[1]
    test_local_pdf(pdf_path)


if __name__ == "__main__":
    main()        print(f"❌ Erro ao processar o PDF: {str(e)}")