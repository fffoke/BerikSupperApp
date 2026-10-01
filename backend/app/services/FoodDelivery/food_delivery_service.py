from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories.FoodDelivery.product_repo import ProductRepository
from app.db.repositories.FoodDelivery.category_repo import CategoryRepository
from app.db.repositories.FoodDelivery.cart_repo import CartRepository
from app.db.repositories.FoodDelivery.favorites_repo import FavoritesRepository
from api.schemes.Food_delivery.product import CategoryProductsResponse, ProductShortResponse
from app.db.models.FoodDelivery.category_model import Category
from app.db.models.FoodDelivery.product_model import Product
from sqlalchemy.orm import selectinload


class ProductService():

    def __init__(self, sessions: AsyncSession):
        self.product_repo = ProductRepository(sessions)
        self.category_repo = CategoryRepository(sessions)
        self.session = sessions

    async def get_product_by_slug(self, slug):
        
        category = await self.category_repo.get_by_slug(slug)

        products = await self.product_repo.get_by_category(category.id)

        return [
            ProductShortResponse(
                id = p.id,
                name=p.name,
                image_url=p.image_url,
                price=p.price
            )
            for p in products
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