from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.category_model import Category
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.orm import selectinload

class CategoryRepository(BaseRepository[Category]):

    model = Category

    async def get_catalog(self) -> Sequence[Category]:
        result = await self.session.scalars(
            select(Category).where(Category.parent_id == None)
        )
        return result.all()

    async def get_by_slug(self, slug: str) -> Category | None:
        result = await self.session.execute(
            select(Category).where(Category.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_by_parent(self, parent_id: int) -> Sequence[Category]:
        result = await self.session.scalars(
            select(Category).where(Category.parent_id == parent_id)
        )
        return result.all()
    

    async def get_categories_with_products(
        self,
        parent_id: int
    ):
        result = await self.session.scalars(
            select(Category)
            .options(
                selectinload(Category.products)
            )
            .where(Category.parent_id == parent_id)
        )

        return result.all()