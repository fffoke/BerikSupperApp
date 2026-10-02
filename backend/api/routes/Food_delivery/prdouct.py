from fastapi import APIRouter, HTTPException, Query, status
from sqlalchemy import select


from app.services.FoodDelivery.food_delivery_service import ProductService
from api.schemes.Food_delivery.product import CategoryProductsResponse, ProductResponse, ProductCreateRequest, ProductListResponse
from api.dependencies import DbSession
from app.db.models.FoodDelivery.product_model import Product

app = APIRouter()


@app.get('/search', response_model=ProductListResponse, status_code=status.HTTP_200_OK)
async def search_products(session: DbSession, q: str = Query(min_length=1, max_length=100)):
    query = q.strip()
    if not query:
        return ProductListResponse(products=[])
    products = await session.scalars(
        select(Product).where(Product.name.ilike(f'%{query}%')).order_by(Product.name).limit(60)
    )
    return ProductListResponse(products=list(products.all()))


@app.get('/{id}', response_model=ProductResponse, status_code=status.HTTP_200_OK)
async def get_product_by_id(
    session: DbSession,
    id: int
):
    svc = ProductService(session)

    product = await svc.product_repo.get_by_id(id)

    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return ProductResponse.model_validate(product)

@app.get('/slug/{slug}', response_model=ProductListResponse, status_code=status.HTTP_200_OK)
async def get_products_by_slag(
    session: DbSession,
    slug: str
):
    svc = ProductService(session)

    products = await svc.get_product_by_slug(slug)
    if products is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Category not found')

    return ProductListResponse(
        products=products
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
