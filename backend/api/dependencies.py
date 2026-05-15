
from dataclasses import dataclass
from typing import Annotated, Any, AsyncGenerator


from fastapi import Depends, Header, HTTPException, Query, status  # noqa: E402
from sqlalchemy.ext.asyncio import AsyncSession  # noqa: E402

from api.routes.auth.jwt import decode_token  
from app.config import app_settings  
from app.db.engine import create_engine, create_session_factory  # noqa: E402
from app.db.models.user_model import   User


engine = create_engine()
session_factory = create_session_factory(engine)

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def get_current_user_jwt(
    authorization: Annotated[str | None, Header()] = None,
    session: AsyncSession = Depends(get_db_session),
) -> User:
   
    
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid Authorization header. Expected: Bearer <token>",
        )
    token = authorization[7:]
    try:
        user_id = decode_token(token, expected_type="access")
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

async def get_current_admin(
    user: Annotated[User, Depends(get_current_user_jwt)],
) -> User:
    if user.role not in ('admin'):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin required",
        )
    return user
    


DbSession = Annotated[AsyncSession, Depends(get_db_session)]
CurrentUser = Annotated[User, Depends(get_current_user_jwt)]
CurrentAdmin = Annotated[User, Depends(get_current_admin)]