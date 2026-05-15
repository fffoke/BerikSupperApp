from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.favorites_model import Favorite
from typing import Sequence
from sqlalchemy import select

class FavoritesRepository(BaseRepository[Favorite]):

    model = Favorite

    async def get_user_fav(self, user_id: int) -> Sequence[Favorite]:
        result = await self.session.scalars(
            select(Favorite).where(Favorite.user_id == user_id)
        )
        fav = result.all()
        return fav

    