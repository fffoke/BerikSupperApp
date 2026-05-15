from app.services.FoodDelivery.category_service import  generate_slug
from sqlalchemy.ext.asyncio import AsyncSession
import asyncio
from app.db.models.FoodDelivery.category_model import Category
from app.db.models.FoodDelivery.product_model import Product
from app.db.engine import create_engine, create_session_factory


async def seed_categories(session: AsyncSession):
    drinks = Category(
        name="Напитки",
        slug=generate_slug("Напитки"),
        image_url="/static/categories/drinks.png"
    )

    milk = Category(
        name="Молочные напитки",
        slug=generate_slug("Молочные напитки"),
        parent=drinks,
        image_url="/static/categories/milk.png"
    )

    snacks = Category(
        name="Снеки",
        slug=generate_slug("Снеки"),
        image_url="/static/categories/snacks.png"
    )

    session.add_all([
        drinks,
        milk,
        snacks
    ])

    await session.flush()

    products = [
        Product(
            name="Coca Cola 1L",
            price=750,
            expiration="12 месяцев",
            conditions="Хранить при температуре от 0 до +25",
            brand="Coca Cola",
            manufacturer="Coca Cola Company",
            volume="1л",
            calories=42,
            proteins=0,
            fats=0,
            carbs=10.6,
            image_url="/static/products/cola.png",
            discount=10,
            category_id=drinks.id
        ),

        Product(
            name="Молоко Простоквашино",
            price=560,
            expiration="7 дней",
            conditions="Хранить в холодильнике",
            brand="Простоквашино",
            manufacturer="Danone",
            volume="1л",
            calories=60,
            proteins=3,
            fats=3.2,
            carbs=4.7,
            image_url="/static/products/milk_prosto.png",
            discount=0,
            category_id=milk.id
        )
    ]

    session.add_all(products)

    await session.commit()



engine = create_engine()
session_factory = create_session_factory(engine)

async def main():
    async with session_factory() as session:
        await seed_categories(session)

asyncio.run(main())