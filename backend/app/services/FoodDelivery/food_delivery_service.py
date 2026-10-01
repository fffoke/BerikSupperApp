from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories.FoodDelivery.product_repo import ProductRepository
from app.db.repositories.FoodDelivery.category_repo import CategoryRepository
from api.schemes.Food_delivery.product import CategoryProductsResponse, ProductShortResponse


class ProductService():

    def __init__(self, sessions: AsyncSession):
        self.product_repo = ProductRepository(sessions)
        self.category_repo = CategoryRepository(sessions)
        self.session = sessions

    async def get_product_by_slug(self, slug):
        category = await self.category_repo.get_by_slug(slug)
        if category is None:
            return None

        products = await self.product_repo.get_by_category(category.id)

        return [
            ProductShortResponse.model_validate(product)
            for product in products
        ]
    
    async def get_products_grouped_by_parent(self, slug: str):
        categories = await self.category_repo.get_categories_with_products(
            slug
        )
        return [
                    CategoryProductsResponse(
                        category_name=category.name,
                        products=[
                            ProductShortResponse.model_validate(product)
                            for product in category.products
                        ]
                    )
                    for category in categories
            ]
