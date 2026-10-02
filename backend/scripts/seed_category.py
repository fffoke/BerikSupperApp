"""Seed a small Lavka-inspired demo catalogue without duplicating existing rows."""

import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.engine import create_engine, create_session_factory
from app.db.models.FoodDelivery.category_model import Category
from app.db.models.FoodDelivery.product_model import Product
from app.services.FoodDelivery.category_service import generate_slug


# name, parent name, local image, old name from the original three-product demo
CATEGORY_SPECS = [
    ("Готовая еда", None, "categories/ready-food-icon.avif", None),
    ("Овощной прилавок", None, "categories/vegetables-icon.avif", None),
    ("Молочный прилавок", None, "categories/dairy-icon.avif", "Молочные напитки"),
    ("Булочная и кондитерская", None, "categories/bakery-icon.avif", None),
    ("Вода и напитки", None, "categories/drinks-icon.avif", "Напитки"),
    ("Сладкое и снеки", None, "categories/snacks-icon.avif", "Снеки"),
    ("Заморозка", None, "categories/frozen-icon.avif", None),
    ("Мясо, птица, рыба", None, "categories/meat-icon.avif", None),
    ("Сбалансированное питание", None, "categories/balanced-icon.avif", None),
    ("Бакалея", None, "categories/grocery-icon.avif", None),
    ("Для детей", None, "categories/kids-icon.avif", None),
    ("Есть горячее", "Готовая еда", "products/pizza-bavarian.avif", None),
    ("Из ресторанов", "Готовая еда", "categories/restaurants-banner.webp", None),
    ("Вся готовая еда", "Готовая еда", "categories/ready-food-banner.webp", None),
    ("Здоровый рацион", "Готовая еда", "categories/balanced-banner.webp", None),
    ("Сезонные новинки", "Есть горячее", "products/muffin-bacon.avif", None),
    ("Сеты и комбо", "Есть горячее", "products/combo-meat-olivier.avif", None),
    ("Основное меню", "Есть горячее", "products/pasta-carbonara.avif", None),
    ("Пицца", "Есть горячее", "products/pizza-pepperoni.avif", None),
    ("Бургеры", "Есть горячее", "products/cheeseburger.avif", None),
    ("Роллы", "Есть горячее", "products/roll-california.avif", None),
    ("Хот-доги", "Есть горячее", "products/hotdog-french.avif", None),
    ("Закуски", "Есть горячее", "products/potato-wedges.avif", None),
    ("Завтраки", "Есть горячее", "products/omelet-spinach.avif", None),
    ("Хачапури", "Есть горячее", "products/khachapuri.avif", None),
    ("Салаты", "Есть горячее", "products/salad-monastery.avif", None),
    ("Сырники и запеканки", "Вся готовая еда", "products/syrniki-large.avif", None),
    ("Молоко и сливки", "Молочный прилавок", "products/milk_yandex.jpeg", None),
    ("Газировка", "Вода и напитки", "products/cola_yandex.png", None),
    ("Чипсы", "Сладкое и снеки", "products/chips_yandex.png", None),
]


# name, price, volume, category, photo, discount, brand
PRODUCT_SPECS = [
    ("Английский маффин с беконом и яйцом", 356, "160 г", "Сезонные новинки", "muffin-bacon.avif", 5, None),
    ("Мясо по-французски с рисом и Оливье", 395, "400 г", "Сеты и комбо", "combo-meat-olivier.avif", 10, None),
    ("Отбивные из курицы с картофелем, Оливье и хлебом", 377, "425 г", "Сеты и комбо", "combo-chicken.avif", 30, None),
    ("Карбонара с беконом Из Лавки", 241, "235 г", "Основное меню", "pasta-carbonara.avif", 30, "Из Лавки"),
    ("Паста с томлёной говядиной", 307, "265 г", "Основное меню", "pasta-beef.avif", 30, None),
    ("Пицца Баварская мясная Zotman", 662, "465 г", "Пицца", "pizza-bavarian.avif", 15, "Zotman"),
    ("Пицца Из Лавки ветчина-грибы", 433, "360 г", "Пицца", "pizza-ham-mushrooms.avif", 30, "Из Лавки"),
    ("Пицца Из Лавки пепперони", 433, "365 г", "Пицца", "pizza-pepperoni.avif", 30, "Из Лавки"),
    ("Пицца Из Лавки четыре сыра", 433, "345 г", "Пицца", "pizza-four-cheese.avif", 30, "Из Лавки"),
    ("Пицца Маргарита Zotman", 447, "390 г", "Пицца", "pizza-margarita.avif", 30, "Zotman"),
    ("Пицца Из Лавки груша-горгонзола", 454, "370 г", "Пицца", "pizza-pear.avif", 30, "Из Лавки"),
    ("Чизбургер", 342, "155 г", "Бургеры", "cheeseburger.avif", 30, None),
    ("Чизбургер с говяжьей котлетой и сыром", 209, "125 г", "Бургеры", "burger-beef-cheese.avif", 30, None),
    ("Ролл Калифорния", 293, "215 г", "Роллы", "roll-california.avif", 30, None),
    ("Ролл фри с креветкой Из Лавки", 245, "180 г", "Роллы", "roll-shrimp.avif", 15, "Из Лавки"),
    ("Ролл Филадельфия лайт", 328, "235 г", "Роллы", "roll-philadelphia.avif", 30, None),
    ("Хот-дог Французский Грабли Box", 181, "115 г", "Хот-доги", "hotdog-french.avif", 30, "Грабли Box"),
    ("Брецель-дог с сосиской Из Лавки", 146, "180 г", "Хот-доги", "pretzel-dog.avif", 30, "Из Лавки"),
    ("Картофель по-деревенски с сырным соусом", 188, "170 г", "Закуски", "potato-wedges.avif", 30, None),
    ("Омлет с сыром и шпинатом", 199, "165 г", "Завтраки", "omelet-spinach.avif", 30, None),
    ("Омлет с рикоттой и грибами", 265, "205 г", "Завтраки", "omelet-mushrooms.avif", 30, None),
    ("Хачапури по-мегрельски", 237, "200 г", "Хачапури", "khachapuri.avif", 30, None),
    ("Салат Монастырский Из Лавки", 136, "150 г", "Салаты", "salad-monastery.avif", 30, "Из Лавки"),
    ("Оливье с говядиной Из Лавки", 192, "200 г", "Салаты", "salad-olivier.avif", 30, "Из Лавки"),
    ("Бургер классический с соусом BBQ", 356, "180 г", "Из ресторанов", "burger-bbq.avif", 30, None),
    ("Сырники большая порция Из Лавки", 269, "250 г", "Сырники и запеканки", "syrniki-large.avif", 30, "Из Лавки"),
    ("Сырники с малиной Из Лавки", 241, "210 г", "Сырники и запеканки", "syrniki-raspberry.avif", 30, "Из Лавки"),
    ("Сырники из творога без сахара", 279, "250 г", "Здоровый рацион", "syrniki-no-sugar.avif", 30, "Из Лавки"),
    ("Помидоры розовые Азербайджан", 132, "500 г", "Овощной прилавок", "tomatoes-pink.avif", 30, None),
    ("Сливовидные помидоры Россия", 111, "600 г", "Овощной прилавок", "tomatoes-plum.avif", 30, None),
    ("Круассан с миндальным кремом Братья Караваевы", 209, "120 г", "Булочная и кондитерская", "croissant-almond.avif", 30, "Братья Караваевы"),
    ("Круассан с шоколадной начинкой", 195, "90 г", "Булочная и кондитерская", "croissant-chocolate.avif", 30, None),
    ("Пельмени с говядиной Из Лавки", 286, "500 г", "Заморозка", "pelmeni-beef.avif", 30, "Из Лавки"),
    ("Пельмени из мраморной говядины Мираторг", 449, "700 г", "Заморозка", "pelmeni-miratorg.avif", 40, "Мираторг"),
    ("Филе цыплёнка-бройлера Троекурово", 349, "900 г", "Мясо, птица, рыба", "chicken-troekurovo.avif", 30, "Троекурово"),
    ("Филе грудки цыплёнка Петелинка", 363, "750 г", "Мясо, птица, рыба", "chicken-petelinka.avif", 30, "Петелинка"),
    ("Батончик протеиновый FitnessShock арахис", 111, "50 г", "Сбалансированное питание", "protein-fitnesshock.avif", 30, "FitnessShock"),
    ("Батончик протеиновый Bombbar чизкейк", 129, "60 г", "Сбалансированное питание", "protein-bombbar.avif", 30, "Bombbar"),
    ("Крупа гречневая Агро-Альянс", 104, "900 г", "Бакалея", "buckwheat-agro.avif", 20, "Агро-Альянс"),
    ("Крупа гречневая ядрица Из Лавки", 76, "900 г", "Бакалея", "buckwheat-lavka.avif", 30, "Из Лавки"),
    ("Пюре Агуша яблоко, ежевика, малина", 69, "90 мл", "Для детей", "puree-agusha.avif", 8, "Агуша"),
    ("Пюре Бабушкино лукошко индейка-овощи", 90, "100 г", "Для детей", "puree-babushkino.avif", 30, "Бабушкино лукошко"),
]


async def seed_categories(session: AsyncSession) -> None:
    existing = {category.name: category for category in (await session.scalars(select(Category))).all()}
    categories: dict[str, Category] = {}

    for name, parent_name, image, legacy_name in CATEGORY_SPECS:
        category = existing.get(name)
        if category is None and legacy_name:
            category = existing.get(legacy_name)
            if category is not None:
                category.name = name
                category.slug = generate_slug(name)
        if category is None:
            category = Category(name=name, slug=generate_slug(name))
            session.add(category)
        category.image_url = f"/static/{image}"
        category.parent = categories[parent_name] if parent_name else None
        categories[name] = category

    await session.flush()

    # Move the original three demo products into the new navigation tree.
    old_products = {
        "Coca Cola 1L": ("Газировка", "cola_yandex.png", 750, "1 л", "Coca Cola", "12 месяцев", 42, 0, 0, 10.6, 10),
        "Молоко Простоквашино": ("Молоко и сливки", "milk_yandex.jpeg", 560, "1 л", "Простоквашино", "7 дней", 60, 3, 3.2, 4.7, 0),
        "Lay's Рифлёные Паприка 140 г": ("Чипсы", "chips_yandex.png", 790, "140 г", "Lay's", "140 дней", 520, 6, 32, 53, 0),
    }
    for name, (category_name, image, price, volume, brand, expiration, calories, proteins, fats, carbs, discount) in old_products.items():
        product = await session.scalar(select(Product).where(Product.name == name))
        if product is None:
            product = Product(
                name=name,
                price=price,
                volume=volume,
                expiration=expiration,
                conditions="См. упаковку",
                brand=brand,
                manufacturer=None,
                calories=calories,
                proteins=proteins,
                fats=fats,
                carbs=carbs,
                discount=discount,
            )
            session.add(product)
        product.category = categories[category_name]
        product.image_url = f"/static/products/{image}"

    for name, price, volume, category_name, image, discount, brand in PRODUCT_SPECS:
        product = await session.scalar(select(Product).where(Product.name == name))
        if product is None:
            product = Product(
                name=name,
                price=price,
                volume=volume,
                expiration="См. упаковку",
                conditions="См. упаковку",
                brand=brand,
                manufacturer=None,
                calories=0,
                proteins=0,
                fats=0,
                carbs=0,
                discount=discount,
            )
            session.add(product)
        product.category = categories[category_name]
        product.image_url = f"/static/products/{image}"

    await session.commit()


async def main() -> None:
    engine = create_engine()
    session_factory = create_session_factory(engine)
    async with session_factory() as session:
        await seed_categories(session)
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
