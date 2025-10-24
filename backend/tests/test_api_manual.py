"""
Script para testar a API manualmente
"""
import requests
import json

API_URL = "http://localhost:8000/api/analise"

def carregar_dados_teste(caso: str = "nivel1_basico"):
    """Carrega dados de teste do JSON"""
    with open("tests/dados_teste.json", "r", encoding="utf-8") as f:
        dados = json.load(f)
    return dados[caso]


def testar_nivel1():
    """Testa análise Nível 1"""
    print("\n" + "="*60)
    print("🧪 TESTANDO NÍVEL 1 - BÁSICO")
    print("="*60)
    
    dados = carregar_dados_teste("nivel1_basico")
    
    try:
        response = requests.post(API_URL, json=dados)
        response.raise_for_status()
        
        resultado = response.json()
        
        print("\n✅ Resposta recebida com sucesso!")
        print(f"\n📊 KPIs calculados:")
        for kpi in resultado["nivel1"]["kpis"]:
            print(f"  • {kpi['nome']}: {kpi['valor']:.2f} ({kpi['formato']})")
        
        print(f"\n💬 Mensagem gerada:")
        print(f"  {resultado['nivel1']['mensagem'][:200]}...")
        
        print(f"\n🎯 Convite para próximo nível:")
        print(f"  {resultado['nivel1']['convite_proximo_nivel'][:100]}...")
        
        if resultado["status_validacao"]["assumptions"]:
            print(f"\n⚠️  Assumptions aplicadas:")
            for assumption in resultado["status_validacao"]["assumptions"]:
                print(f"  • {assumption}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Erro na requisição: {e}")
        return False
    except Exception as e:
        print(f"\n❌ Erro ao processar resposta: {e}")
        return False


def testar_nivel2():
    """Testa análise Nível 2"""
    print("\n" + "="*60)
    print("🧪 TESTANDO NÍVEL 2 - INTERMEDIÁRIO")
    print("="*60)
    
    dados = carregar_dados_teste("nivel2_intermediario")
    
    try:
        response = requests.post(API_URL, json=dados)
        response.raise_for_status()
        
        resultado = response.json()
        
        print("\n✅ Resposta recebida com sucesso!")
        print(f"\n📊 KPIs Nível 2:")
        for kpi in resultado["nivel2"]["kpis"]:
            print(f"  • {kpi['nome']}: {kpi['valor']:.2f} ({kpi['formato']})")
        
        print(f"\n💬 Mensagem Nível 2:")
        print(f"  {resultado['nivel2']['mensagem'][:200]}...")
        
        print(f"\n📈 Simulações encontradas:")
        for tabela in resultado["nivel2"]["tabelas"]:
            print(f"  {tabela['titulo']}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Erro na requisição: {e}")
        return False
    except Exception as e:
        print(f"\n❌ Erro ao processar resposta: {e}")
        return False


def testar_nivel3():
    """Testa análise Nível 3 completo"""
    print("\n" + "="*60)
    print("🧪 TESTANDO NÍVEL 3 - COMPLETO COM DIAGNÓSTICO")
    print("="*60)
    
    dados = carregar_dados_teste("nivel3_completo")
    
    try:
        response = requests.post(API_URL, json=dados)
        response.raise_for_status()
        
        resultado = response.json()
        
        print("\n✅ Resposta recebida com sucesso!")
        
        if resultado["nivel3"]:
            print(f"\n📊 KPIs Nível 3:")
            for kpi in resultado["nivel3"]["kpis"]:
                print(f"  • {kpi['nome']}: {kpi['valor']:.2f} ({kpi['formato']})")
        
        if resultado["diagnostico_estrategia"]:
            print(f"\n🏥 DIAGNÓSTICO:")
            for frase in resultado["diagnostico_estrategia"]["diagnostico"]:
                print(f"  • {frase}")
            
            print(f"\n💡 OPORTUNIDADES:")
            for oport in resultado["diagnostico_estrategia"]["oportunidades"]:
                print(f"  • {oport['descricao']}")
                print(f"    Impacto: R$ {oport['impacto_r']:,.2f} ({oport['impacto_percentual']:.1f}%)")
            
            print(f"\n📅 PLANO 30-60-90:")
            plano = resultado["diagnostico_estrategia"]["plano_30_60_90"]
            print(f"  30 dias: {len(plano['30_dias'])} ações")
            print(f"  60 dias: {len(plano['60_dias'])} ações")
            print(f"  90 dias: {len(plano['90_dias'])} ações")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Erro na requisição: {e}")
        return False
    except Exception as e:
        print(f"\n❌ Erro ao processar resposta: {e}")
        import traceback
        traceback.print_exc()
        return False


def testar_caso_critico():
    """Testa caso com valores críticos e campos faltando"""
    print("\n" + "="*60)
    print("🧪 TESTANDO CASO CRÍTICO (com defaults)")
    print("="*60)
    
    dados = carregar_dados_teste("caso_critico")
    
    try:
        response = requests.post(API_URL, json=dados)
        response.raise_for_status()
        
        resultado = response.json()
        
        print("\n✅ API lidou com campos ausentes corretamente!")
        
        print(f"\n⚠️  Assumptions aplicadas ({len(resultado['status_validacao']['assumptions'])}):")
        for assumption in resultado["status_validacao"]["assumptions"]:
            print(f"  • {assumption}")
        
        if resultado["status_validacao"]["avisos"]:
            print(f"\n⚠️  Avisos gerados:")
            for aviso in resultado["status_validacao"]["avisos"]:
                print(f"  • {aviso}")
        
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Erro na requisição: {e}")
        return False


def main():
    """Executa todos os testes"""
    print("\n" + "🚀 "*20)
    print("INICIANDO TESTES DA API GROWLI")
    print("🚀 "*20)
    
    # Verificar se API está rodando
    try:
        response = requests.get("http://localhost:8000/health")
        print("\n✅ API está online!\n")
    except:
        print("\n❌ ERRO: API não está rodando!")
        print("Execute: uvicorn app.main:app --reload")
        return
    
    # Executar testes
    resultados = {
        "Nível 1": testar_nivel1(),
        "Nível 2": testar_nivel2(),
        "Nível 3": testar_nivel3(),
        "Caso Crítico": testar_caso_critico(),
    }
    
    # Resumo
    print("\n" + "="*60)
    print("📊 RESUMO DOS TESTES")
    print("="*60)
    for nome, passou in resultados.items():
        status = "✅ PASSOU" if passou else "❌ FALHOU"
        print(f"{status} - {nome}")
    
    total = len(resultados)
    passou = sum(resultados.values())
    print(f"\nTotal: {passou}/{total} testes passaram")
    
    if passou == total:
        print("\n🎉 Todos os testes passaram! Backend está pronto!")
    else:
        print("\n⚠️  Alguns testes falharam. Verifique os erros acima.")


if __name__ == "__main__":
    main()