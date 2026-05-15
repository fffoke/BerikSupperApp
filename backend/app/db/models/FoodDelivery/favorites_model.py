
from app.db.base import IdMixin, Base
from sqlalchemy import ForeignKey, String, JSON
from sqlalchemy.orm import mapped_column, Mapped, relationship


class Favorite(Base, IdMixin):
    __tablename__ = "favorites"

    user_id = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )

    product_id = mapped_column(
        ForeignKey("categories.id"),
        nullable=True
    )