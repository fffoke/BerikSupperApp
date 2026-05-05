from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base, IdMixin, TimestampMixin

class User(Base, IdMixin, TimestampMixin):

    __tablename__ = 'users'

    username: Mapped[str] = mapped_column(String(200), nullable=False)
    full_name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str | None] = mapped_column(String(200))
    password_hash: Mapped[str | None] = mapped_column(String(255))

    avatar_url: Mapped[str | None] = mapped_column(String(512), nullable=True)


