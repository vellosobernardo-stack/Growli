import pdfplumber
import re
from typing import Dict, List, Optional, Tuple

class PDFParser:
    MONEY_PATTERNS = [r'R?\$?\s*([\d.,]+)']
    
    KEYWORDS = {
        'caixa': ['caixa', 'disponibilidades', 'bancos'],
        'contas_receber': ['contas a receber', 'clientes', 'duplicatas a receber'],
        'estoque': ['estoque', 'estoques', 'mercadorias'],
        'imobilizado': ['imobilizado', 'ativo imobilizado', 'permanente'],
        'fornecedores': ['fornecedores', 'fornecedores a pagar'],
        'emprestimos_cp': ['empréstimos', 'financiamentos', 'empréstimos curto prazo'],
        'impostos': ['impostos', 'tributos', 'impostos a pagar'],
        'emprestimos_lp': ['empréstimos longo prazo', 'financiamentos longo prazo'],
        'receita_bruta': ['receita bruta', 'receitas', 'faturamento', 'vendas'],
        'custo_vendas': ['custo das vendas', 'custo dos produtos vendidos', 'cpv', 'cmv'],
        'despesas_operacionais': ['despesas operacionais', 'despesas administrativas'],
        'despesas_financeiras': ['despesas financeiras', 'juros', 'encargos financeiros']
    }
    
    def __init__(self):
        self.confidence_score = 0.0
        self.warnings = []
    
    def extract_financial_data(self, pdf_path: str) -> Dict:
        try:
            full_text = self._extract_text_from_pdf(pdf_path)
            if not full_text:
                return self._create_empty_response()
            
            extracted_data = {}
            campos_encontrados = 0
            
            for campo, keywords in self.KEYWORDS.items():
                valor = self._extract_value_by_keywords(full_text, keywords)
                extracted_data[campo] = valor if valor else 0.0
                if valor: campos_encontrados += 1
            
            self.confidence_score = campos_encontrados / len(self.KEYWORDS)
            extracted_data['confidence_score'] = self.confidence_score
            extracted_data['warnings'] = self.warnings
            extracted_data['campos_encontrados'] = campos_encontrados
            extracted_data['total_campos'] = len(self.KEYWORDS)
            
            return extracted_data
        except Exception as e:
            return self._create_empty_response()
    
    def _extract_text_from_pdf(self, pdf_path: str) -> str:
        try:
            with pdfplumber.open(pdf_path) as pdf:
                return "\n".join([page.extract_text() or "" for page in pdf.pages]).lower()
        except:
            return ""
    
    def _extract_value_by_keywords(self, text: str, keywords: List[str]) -> Optional[float]:
        for keyword in keywords:
            pattern = rf'{re.escape(keyword.lower())}[:\s]*([^\n]*)'
            for match in re.finditer(pattern, text, re.IGNORECASE):
                value = self._extract_money_value(match.group(1))
                if value and value > 0: return value
        return None
    
    def _extract_money_value(self, text: str) -> Optional[float]:
        for pattern in self.MONEY_PATTERNS:
            matches = re.findall(pattern, text)
            if matches:
                try:
                    value = float(matches[0].replace('.', '').replace(',', '.'))
                    if 0.01 <= value <= 1_000_000_000: return value
                except: pass
        return None
    
    def _create_empty_response(self) -> Dict:
        return {k: 0.0 for k in list(self.KEYWORDS.keys()) + ['confidence_score', 'campos_encontrados', 'total_campos']}
    
    def validate_extracted_data(self, data: Dict) -> Tuple[bool, List[str]]:
        errors = []
        if data.get('receita_bruta', 0) <= 0: errors.append("Receita deve ser maior que zero")
        return len(errors) == 0, errors
