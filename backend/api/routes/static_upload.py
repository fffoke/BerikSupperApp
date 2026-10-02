from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, UploadFile, File

from api.dependencies import CurrentAdmin, CurrentUser


router = APIRouter()

UPLOAD_DIR = Path("static/products")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/product")
async def upload_product_image(_admin: CurrentAdmin, file: UploadFile = File(...)):
    # расширение файла
    ext = file.filename.split(".")[-1]

    # уникальное имя
    filename = f"{uuid4()}.{ext}"

    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return {
        "image_url": f"/static/products/{filename}"
    }
@router.post("/category")
async def upload_category_image(_admin: CurrentAdmin, file: UploadFile = File(...)):
    # расширение файла
    ext = file.filename.split(".")[-1]

    # уникальное имя
    filename = f"{uuid4()}.{ext}"
    UPLOAD_DIR = Path("static/categories")
    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    return {
        "image_url": f"/static/categories/{filename}"
    }

@router.post("/avatar")
async def upload_avatar_image(
    _user: CurrentUser,
    file: UploadFile = File(...),
):
    # расширение файла
    ext = file.filename.split(".")[-1]

    # уникальное имя
    filename = f"{uuid4()}.{ext}"
    UPLOAD_DIR = Path("static/users")
    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)


    return {
        "image_url": f"/static/users/{filename}"
    }
