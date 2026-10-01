from fastapi import APIRouter, HTTPException, status


from app.services.FoodDelivery.food_delivery_service import ProductService
from api.schemes.Food_delivery.product import CategoryProductsResponse, ProductResponse, ProductCreateRequest, ProductListResponse
from api.dependencies import DbSession

app = APIRouter()


@app.get('/{id}', response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def get_product_by_id(
    session: DbSession,
    id: int
):
    svc = ProductService(session)

    product = await svc.product_repo.get_by_id(id)

    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return ProductResponse(**product)

@app.get('/slug/{slug}', response_model=ProductListResponse, status_code=status.HTTP_200_OK)
async def get_products_by_slag(
    session: DbSession,
    slug: str
):
    svc = ProductService(session)

    products = await svc.get_product_by_slug(slug)
    
    if not products:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')

    return ProductListResponse(
           produtcs = [ProductResponse.model_validate(p) for p in products]
        )

@app.get(
    '/parent/{slug}',
    response_model=list[CategoryProductsResponse],
    status_code=status.HTTP_200_OK
)
async def get_all_parent_product(
    session: DbSession,
    slug: str
):
    svc = ProductService(session)

    return await svc.get_products_grouped_by_parent(
        slug
    )