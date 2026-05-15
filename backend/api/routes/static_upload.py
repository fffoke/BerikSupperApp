from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File

router = APIRouter()

UPLOAD_DIR = Path("media/products")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/product")
async def upload_image(file: UploadFile = File(...)):
    # расширение файла
    ext = file.filename.split(".")[-1]

    # уникальное имя
    filename = f"{uuid4()}.{ext}"

    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return {
        "image_url": f"/media/products/{filename}"
    }