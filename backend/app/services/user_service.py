from sqlalchemy.ext.asyncio import AsyncSession
from app.db.repositories.user_repo import UserRepository

class UserService():
    
    def __init__(self, session: AsyncSession):
        self.repo =  UserRepository(session)
        