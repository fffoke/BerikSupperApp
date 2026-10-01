from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.category_model import Category
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.orm import selectinload

class CategoryRepository(BaseRepository[Category]):

    model = Category

    async def get_catalog(self) -> Sequence[Category]:
        result = await self.session.scalars(
            select(Category).where(Category.parent_id.is_(None))
        )
        return result.all()

    async def get_by_slug(self, slug: str) -> Category | None:
        result = await self.session.execute(
            select(Category).where(Category.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_by_parent(self, slug: str) -> Category | None:
        result = await self.session.scalar(
            select(Category)
            .options(selectinload(Category.children))
            .where(Category.slug == slug)
        )

        return result
    

    async def get_categories_with_products(
        self,
        slug: int
    ):
        category = await self.session.scalar(
            select(Category)
            .options(
                selectinload(Category.products),
                selectinload(Category.children).selectinload(Category.products),
            )
            .where(Category.slug == slug)
        )
        if category is None:
            return []

        categories = [category, *category.children]
        return [item for item in categories if item.products]
