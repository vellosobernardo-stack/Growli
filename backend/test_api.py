import requests
import sys

class GrowliAPITester:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api/v1"
    
    def test_health(self):
        print("\n🏥 Testando Health Check...")
        try:
            response = requests.get(f"{self.base_url}/health")
            if response.status_code == 200:
                print("✅ API online!")
                print(f"   {response.json()}")
                return True
            return False
        except:
            print("❌ Erro: API não está rodando")
            print("   Execute: uvicorn app.main:app --reload")
            return False
    
    def test_analysis(self):
        print("\n📊 Testando Análise...")
        dados = {
            "caixa": 50000, "contas_receber": 80000, "estoque": 120000, "imobilizado": 200000,
            "fornecedores": 60000, "emprestimos_cp": 30000, "impostos": 15000, "emprestimos_lp": 100000,
            "receita_bruta": 500000, "custo_vendas": 300000, "despesas_operacionais": 120000,
            "despesas_financeiras": 8000, "setor": "comercio_varejo", "periodo_referencia": "2024-12"
        }
        try:
            response = requests.post(f"{self.api_url}/analysis/calculate", json=dados)
            if response.status_code == 200:
                result = response.json()
                print("✅ Análise concluída!")
                print(f"   Score: {result['saude_financeira_score']}/100")
                print(f"   Pontos Fortes: {len(result['pontos_fortes'])}")
                return True
        except Exception as e:
            print(f"❌ Erro: {e}")
        return False

def main():
    print("""
╔══════════════════════════════════════════════════════════╗
║          🌱 GROWLI - TESTE DA API                        ║
╚══════════════════════════════════════════════════════════╝
    """)
    
    tester = GrowliAPITester()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--health":
        tester.test_health()
    elif len(sys.argv) > 1 and sys.argv[1] == "--analysis":
        tester.test_analysis()
    else:
        if tester.test_health():
            tester.test_analysis()

if __name__ == "__main__":
    main()
