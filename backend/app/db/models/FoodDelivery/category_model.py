from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, IdMixin


class Category(Base, IdMixin):
    __tablename__ = "categories"

    name: Mapped[str] = mapped_column(
        String,
        nullable=False,
        unique=True
    )

    image_url: Mapped[str | None] = mapped_column(
        String,
        nullable=True
    )

    slug: Mapped[str] = mapped_column(
        String(250),
        unique=True,
        index=True
    )

    parent_id: Mapped[int | None] = mapped_column(
        ForeignKey("categories.id"),
        nullable=True
    )

    parent: Mapped["Category"] = relationship(
        remote_side="Category.id",
        back_populates="children"
    )

    children: Mapped[list["Category"]] = relationship(
        back_populates="parent"
    )

    products: Mapped[list["Product"]] = relationship(
        back_populates="category"
    )