from app.services.FoodDelivery.category_service import  generate_slug
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import asyncio
from app.db.models.FoodDelivery.category_model import Category
from app.db.models.FoodDelivery.product_model import Product
from app.db.engine import create_engine, create_session_factory


async def seed_categories(session: AsyncSession):
    categories_by_name = {
        "Напитки": ("/static/products/cola_yandex.png", None),
        "Молочные напитки": ("/static/products/milk_yandex.jpeg", "Напитки"),
        "Молоко и сливки": ("/static/products/milk_yandex.jpeg", "Молочные напитки"),
        "Снеки": ("/static/products/chips_yandex.png", None),
    }
    categories: dict[str, Category] = {}

    for name, (image_url, parent_name) in categories_by_name.items():
        category = await session.scalar(select(Category).where(Category.name == name))
        parent = categories.get(parent_name) if parent_name else None
        if category is None:
            category = Category(name=name, slug=generate_slug(name), image_url=image_url, parent=parent)
            session.add(category)
        else:
            category.image_url = image_url
            if parent is not None:
                category.parent = parent
        categories[name] = category

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
            image_url="/static/products/cola_yandex.png",
            discount=10,
            category_id=categories["Напитки"].id
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
            image_url="/static/products/milk_yandex.jpeg",
            discount=0,
            category_id=categories["Молоко и сливки"].id
        )
    ]

    products.append(
        Product(
            name="Lay's Рифлёные Паприка 140 г",
            price=790,
            expiration="140 дней",
            conditions="Хранить в сухом прохладном месте",
            brand="Lay's",
            manufacturer="PepsiCo",
            volume="140 г",
            calories=520,
            proteins=6,
            fats=32,
            carbs=53,
            image_url="/static/products/chips_yandex.png",
            discount=0,
            category_id=categories["Снеки"].id,
        )
    )

    for product in products:
        existing_product = await session.scalar(select(Product).where(Product.name == product.name))
        if existing_product is None:
            session.add(product)
        else:
            existing_product.image_url = product.image_url
            if product.name.startswith("Coca Cola") or product.name.startswith("Молоко Простоквашино"):
                existing_product.category_id = product.category_id

    await session.commit()



engine = create_engine()
session_factory = create_session_factory(engine)

async def main():
    async with session_factory() as session:
        await seed_categories(session)

asyncio.run(main())
