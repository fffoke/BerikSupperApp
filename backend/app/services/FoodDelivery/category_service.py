from app.db.repositories.FoodDelivery.category_repo import CategoryRepository
from sqlalchemy.ext.asyncio import AsyncSession

import re
from unidecode import unidecode

def generate_slug(name: str) -> str:
    name = unidecode(name)  # кириллица → латиница
    name = name.lower()
    name = re.sub(r"[^a-z0-9]+", "-", name)
    return name.strip("-")


class CategoryService():



    def __init__(self, session: AsyncSession ):
        self.repo = CategoryRepository(session)

    async def create(self, name: str, image_url: str | None, parent_id: int | None):
        slug = generate_slug(name)
        kwargs: dict[str] = {
            "name": name,
            "slug": slug,
        }
        if image_url:
            kwargs['image_url'] = image_url
        if parent_id:
            kwargs['parent_id'] = parent_id
        category = await self.repo.create(**kwargs)
        return category
    
        