from typing import Any, Generic, Sequence, TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base
from sqlalchemy import inspect, select

T = TypeVar('T', bound=Base)

class BaseRepository(Generic[T]):
    
    model: type[T]

    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    def _validate_fields(self, data: dict[str, Any]) -> None:
        valid = {c.key for c in inspect(self.model).mapper.column_attrs}
        invalid = set(data) - valid
        if invalid:
            raise ValueError(f"Unknown fields for {self.model.__name__}: {invalid}")

    async def get_by_id(self, obj_id) -> T | None:
        return await self.session.get(self.model, obj_id)
    
    async def get_all(self):
        result = await self.session.execute(select(self.model))
        return result.scalars().all()
    
    async def create(self, **kwargs):
        self._validate_fields(kwargs)
        obj = self.model(**kwargs)
        self.session.add(obj)
        self.session.flush()
        return obj
    
    async def get_by_ids(self, ids: Sequence[int]) -> Sequence[T]:
        if not ids:
            return []
        result = await self.session.execute(select(self.model).where(self.model.id.in_(ids)))  # type: ignore[attr-defined]
        return result.scalars().all()

    async def update(self, obj: T, **kwargs: Any) -> T:
        self._validate_fields(kwargs)
        for key, value in kwargs.items():
            setattr(obj, key, value)
        await self.session.flush()
        await self.session.refresh(obj)
        return obj

    async def delete(self, obj: T)-> None:
        await self.session.delete(obj)
        await self.session.flush()