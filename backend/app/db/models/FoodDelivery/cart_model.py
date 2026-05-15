
from app.db.base import IdMixin, Base
from sqlalchemy import ForeignKey, String, JSON, Float, Integer 
from sqlalchemy.orm import mapped_column, Mapped, relationship


class CartItem(Base, IdMixin):
    __tablename__ = "carttems"

    user_id = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )
    product_id = mapped_column(
        ForeignKey("products.id"),
        nullable=True
    )
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)




