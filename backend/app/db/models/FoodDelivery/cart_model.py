
from app.db.base import IdMixin, Base
from sqlalchemy import ForeignKey, String, JSON, Float, Integer 
from sqlalchemy.orm import mapped_column, Mapped, relationship

from app.db.models.FoodDelivery.product_model import Product


class CartItem(Base, IdMixin):
    __tablename__ = "cartiems"

    user_id = mapped_column(
        ForeignKey('users.id'),
        nullable=False
    )
    product_id = mapped_column(
        ForeignKey("products.id"),
        nullable=True
    )
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)

    product: Mapped["Product"] = relationship()

