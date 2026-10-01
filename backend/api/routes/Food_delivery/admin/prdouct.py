from fastapi import APIRouter, HTTPException, status


from app.db.repositories.FoodDelivery.product_repo import ProductRepository
from api.schemes.Food_delivery.product import ProductResponse, ProductCreateRequest
from api.dependencies import DbSession, CurrentAdmin

app = APIRouter()


@app.post('/product', response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    body: ProductCreateRequest,
    session: DbSession,
    admin: CurrentAdmin,
):
    repo = ProductRepository(session)
    
    product = await repo.create(**body.model_dump())

    return ProductResponse.model_validate(product)

