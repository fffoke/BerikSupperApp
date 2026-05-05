from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.config import db_settings


def create_engine():
    return create_async_engine(
        db_settings.url,
        echo=False,
        pool_size=db_settings.pool_size,
        max_overflow=db_settings.max_overflow,
        pool_pre_ping=True,
        pool_recycle=db_settings.pool_recycle,
        # Cancel queries that hang longer than 30 seconds
        connect_args={"command_timeout": 30},
    )


def create_session_factory(engine) -> async_sessionmaker[AsyncSession]:
    return async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
