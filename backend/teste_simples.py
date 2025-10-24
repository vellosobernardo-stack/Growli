"""
Teste simplificado - roda direto sem imports complexos
"""
import sys
sys.path.insert(0, '.')

def teste_basico():
    print("\n🧪 Testando imports básicos...\n")
    
    try:
        from app.services.financial_calc import calcular_margem_bruta
        print("✅ Import de financial_calc OK")
        
        margem = calcular_margem_bruta(100000, 65000)
        print(f"✅ Cálculo de margem OK: {margem}%")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False
    
    try:
        from app.services.validador import aplicar_defaults_nivel1
        print("✅ Import de validador OK")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False
    
    try:
        from app.services.mensagens import gerar_mensagem_nivel1
        print("✅ Import de mensagens OK")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False
    
    try:
        from app.models.schemas import AnaliseRequest
        print("✅ Import de schemas OK")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        return False
    
    print("\n🎉 Todos os imports funcionaram!\n")
    return True


def teste_api_online():
    print("\n🧪 Testando se API está online...\n")
    
    try:
        import requests
    except ImportError:
        print("❌ Biblioteca 'requests' não instalada")
        print("Execute: pip install requests --break-system-packages")
        return False
    
    try:
        response = requests.get("http://localhost:8000/health", timeout=3)
        if response.status_code == 200:
            print("✅ API está ONLINE e respondendo!")
            print(f"   Resposta: {response.json()}")
            return True
        else:
            print(f"⚠️  API respondeu mas com status: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ API não está rodando!")
        print("   Execute: uvicorn app.main:app --reload")
        return False
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")
        return False


if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 TESTE RÁPIDO DO BACKEND GROWLI")
    print("="*60)
    
    # Teste 1: Imports
    imports_ok = teste_basico()
    
    # Teste 2: API Online
    if imports_ok:
        api_ok = teste_api_online()
        
        if api_ok:
            print("\n✅ TUDO FUNCIONANDO! Backend está pronto!")
            print("   Acesse: http://localhost:8000/docs")
        else:
            print("\n⚠️  Imports OK, mas API precisa ser iniciada")
    else:
        print("\n❌ Corrija os erros de import primeiro")
    
    print("\n" + "="*60)