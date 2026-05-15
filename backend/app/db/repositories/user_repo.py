from sqlalchemy import select

from app.db.repositories.base import BaseRepository
from app.db.models.user_model import User

class UserRepository(BaseRepository[User]):
    model = User
    
    async def get_by_fullname(self, full_name: str):
        result = await self.session.execute(
            select(User).where((User.full_name) == full_name)
        )
        return result.scalar_one_or_none()