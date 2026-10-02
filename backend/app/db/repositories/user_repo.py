from sqlalchemy import func, select

from app.db.repositories.base import BaseRepository
from app.db.models.user_model import User

class UserRepository(BaseRepository[User]):
    model = User

    async def get_by_email(self, email: str) -> User | None:
        return await self.session.scalar(
            select(User).where(func.lower(User.email) == email.lower())
        )
