from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.product_model import Product
from sqlalchemy import select
from typing import Sequence

class ProductRepository(BaseRepository[Product]):

    model = Product

    async def get_by_category(self, category_id: int) -> Sequence[Product]:

        result = await self.session.scalars(
            select(Product).where(Product.category_id == category_id)
        )
        return result.all()

    
        
