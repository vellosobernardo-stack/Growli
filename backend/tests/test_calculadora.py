"""
Testes unitários para as funções de cálculo
"""
from app.services.financial_calc import (
    calcular_margem_bruta,
    calcular_resultado_operacional,
    calcular_ponto_equilibrio,
    calcular_liquidez_imediata,
    calcular_folego_caixa,
    calcular_ciclo_financeiro,
    calcular_ncg_estimada,
)


def test_margem_bruta():
    """Testa cálculo de margem bruta"""
    # Caso normal
    margem = calcular_margem_bruta(receita=100000, custo=65000)
    assert margem == 35.0, f"Esperado 35.0, recebido {margem}"
    
    # Receita zero
    margem = calcular_margem_bruta(receita=0, custo=0)
    assert margem == 0.0, "Margem com receita zero deve ser 0"
    
    # Custo maior que receita (margem negativa)
    margem = calcular_margem_bruta(receita=100000, custo=120000)
    assert margem == -20.0, "Margem negativa deve ser calculada corretamente"
    
    print("✅ test_margem_bruta passou!")


def test_resultado_operacional():
    """Testa cálculo do resultado operacional"""
    resultado = calcular_resultado_operacional(
        receita=100000,
        custo=65000,
        despesas_fixas=25000
    )
    assert resultado == 10000, f"Esperado 10000, recebido {resultado}"
    
    # Resultado negativo
    resultado = calcular_resultado_operacional(
        receita=100000,
        custo=70000,
        despesas_fixas=40000
    )
    assert resultado == -10000, "Resultado negativo deve funcionar"
    
    print("✅ test_resultado_operacional passou!")


def test_ponto_equilibrio():
    """Testa cálculo do ponto de equilíbrio"""
    pe = calcular_ponto_equilibrio(
        despesas_fixas=25000,
        receita=100000,
        custo=65000
    )
    # PE = 25000 / (1 - 0.65) = 25000 / 0.35 = 71428.57
    assert abs(pe - 71428.57) < 1, f"Esperado ~71428.57, recebido {pe}"
    
    # Receita zero
    pe = calcular_ponto_equilibrio(despesas_fixas=25000, receita=0, custo=0)
    assert pe is None, "PE com receita zero deve ser None"
    
    # Custo maior que receita (sem margem)
    pe = calcular_ponto_equilibrio(despesas_fixas=25000, receita=100000, custo=120000)
    assert pe is None, "PE sem margem positiva deve ser None"
    
    print("✅ test_ponto_equilibrio passou!")


def test_liquidez_imediata():
    """Testa cálculo de liquidez imediata"""
    liquidez = calcular_liquidez_imediata(
        disponibilidades=50000,
        contas_a_pagar=50000
    )
    assert liquidez == 1.0, f"Esperado 1.0, recebido {liquidez}"
    
    # Liquidez alta
    liquidez = calcular_liquidez_imediata(
        disponibilidades=80000,
        contas_a_pagar=40000
    )
    assert liquidez == 2.0, "Liquidez 2x deve funcionar"
    
    # Sem contas a pagar
    liquidez = calcular_liquidez_imediata(
        disponibilidades=50000,
        contas_a_pagar=0
    )
    assert liquidez == 999.99, "Liquidez 'infinita' deve retornar 999.99"
    
    print("✅ test_liquidez_imediata passou!")


def test_folego_caixa():
    """Testa cálculo de fôlego de caixa"""
    folego = calcular_folego_caixa(
        disponibilidades=30000,
        contas_a_receber=20000,
        contas_a_pagar=10000,
        despesas_fixas=30000
    )
    # Caixa líquido = 30000 + 20000 - 10000 = 40000
    # Despesa diária = 30000 / 30 = 1000
    # Fôlego = 40000 / 1000 = 40 dias
    assert folego == 40.0, f"Esperado 40 dias, recebido {folego}"
    
    # Sem despesas fixas
    folego = calcular_folego_caixa(
        disponibilidades=30000,
        contas_a_receber=0,
        contas_a_pagar=0,
        despesas_fixas=0
    )
    assert folego == 999.0, "Fôlego sem despesas deve ser 'infinito'"
    
    print("✅ test_folego_caixa passou!")


def test_ciclo_financeiro():
    """Testa cálculo do ciclo financeiro"""
    from app.services.financial_calc import calcular_ciclo_operacional
    
    ciclo_op = calcular_ciclo_operacional(dio=15, dso=30)
    assert ciclo_op == 45, f"Ciclo operacional esperado 45, recebido {ciclo_op}"
    
    ciclo_fin = calcular_ciclo_financeiro(ciclo_operacional=45, dpo=30)
    assert ciclo_fin == 15, f"Ciclo financeiro esperado 15, recebido {ciclo_fin}"
    
    # Ciclo negativo (bom para empresa)
    ciclo_fin = calcular_ciclo_financeiro(ciclo_operacional=20, dpo=30)
    assert ciclo_fin == -10, "Ciclo negativo deve funcionar"
    
    print("✅ test_ciclo_financeiro passou!")


def test_ncg():
    """Testa cálculo da NCG"""
    ncg = calcular_ncg_estimada(
        estoque=30000,
        contas_a_receber=50000,
        contas_a_pagar=40000
    )
    # NCG = 30000 + 50000 - 40000 = 40000
    assert ncg == 40000, f"Esperado 40000, recebido {ncg}"
    
    # NCG negativa (bom para empresa)
    ncg = calcular_ncg_estimada(
        estoque=10000,
        contas_a_receber=20000,
        contas_a_pagar=50000
    )
    assert ncg == -20000, "NCG negativa deve funcionar"
    
    print("✅ test_ncg passou!")


def rodar_todos_testes():
    """Executa todos os testes"""
    print("\n🧪 Iniciando testes unitários...\n")
    
    test_margem_bruta()
    test_resultado_operacional()
    test_ponto_equilibrio()
    test_liquidez_imediata()
    test_folego_caixa()
    test_ciclo_financeiro()
    test_ncg()
    
    print("\n✅ Todos os testes passaram! 🎉\n")


if __name__ == "__main__":
    rodar_todos_testes()