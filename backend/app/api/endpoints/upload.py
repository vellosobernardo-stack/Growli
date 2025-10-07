from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.models.schemas import SuccessResponse, SetorEnum
from app.services.pdf_parser import PDFParser
from app.core.config import settings
import os
import uuid

router = APIRouter()

@router.post("/pdf", response_model=SuccessResponse)
async def upload_pdf(file: UploadFile = File(...), setor: SetorEnum = Form(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(400, "Apenas PDFs permitidos")
    
    contents = await file.read()
    if len(contents) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(400, "Arquivo muito grande")
    
    try:
        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
        file_id = str(uuid.uuid4())
        file_path = os.path.join(settings.UPLOAD_DIR, f"{file_id}.pdf")
        
        with open(file_path, "wb") as f:
            f.write(contents)
        
        parser = PDFParser()
        extracted_data = parser.extract_financial_data(file_path)
        extracted_data['setor'] = setor
        
        return SuccessResponse(message="PDF processado", data={"file_id": file_id, "extracted_data": extracted_data})
    except Exception as e:
        if os.path.exists(file_path): os.remove(file_path)
        raise HTTPException(500, f"Erro: {str(e)}")
