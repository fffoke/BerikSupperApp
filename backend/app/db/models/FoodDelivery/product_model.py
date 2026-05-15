from app.db.base import IdMixin, Base
from sqlalchemy import Float, ForeignKey, String, Integer
from sqlalchemy.orm import mapped_column, Mapped, relationship




class Product(IdMixin, Base):

    __tablename__ = 'products'

    # Деф поля лол кек
    name: Mapped[str] = mapped_column(String(250), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    expiration: Mapped[str] = mapped_column(String(250), nullable=False)
    conditions: Mapped[str] = mapped_column(String(250), nullable=False)
    brand: Mapped[str] = mapped_column(String(250), nullable=True)
    manufacturer: Mapped[str] = mapped_column(String(250), nullable=True)
    volume: Mapped[str] = mapped_column(String(255), nullable=False)
    # КБЖУ
    calories: Mapped[float] = mapped_column(Float, nullable=False)
    proteins: Mapped[float] = mapped_column(Float, nullable=False)
    fats: Mapped[float] = mapped_column(Float, nullable=False)
    carbs: Mapped[float] = mapped_column(Float, nullable=False)

    category: Mapped["Category"] = relationship(
        back_populates="products"
    )
        
    image_url: Mapped[str] = mapped_column(String, nullable=True)

    discount: Mapped[int] = mapped_column(Integer, nullable=True)


    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id")
    )