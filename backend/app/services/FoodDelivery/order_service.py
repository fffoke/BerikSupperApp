from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.db.models.FoodDelivery.cart_model import CartItem
from app.db.models.FoodDelivery.order_model import Order


class OrderService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_from_cart(
        self,
        *,
        user_id: int,
        delivery_address: str,
        customer_phone: str,
        delivery_window: str,
        comment: str | None,
    ) -> Order | None:
        result = await self.session.scalars(
            select(CartItem)
            .options(selectinload(CartItem.product))
            .where(CartItem.user_id == user_id)
        )
        cart_items = list(result.all())
        if not cart_items:
            return None

        items = []
        subtotal = 0.0
        discount_total = 0.0
        for cart in cart_items:
            product = cart.product
            if product is None:
                continue
            quantity = cart.quantity
            unit_price = float(product.price)
            discount_percent = int(product.discount or 0)
            old_unit_price = (
                round(unit_price / (1 - discount_percent / 100))
                if 0 < discount_percent < 100
                else unit_price
            )
            subtotal += old_unit_price * quantity
            discount_total += (old_unit_price - unit_price) * quantity
            items.append({
                "product_id": product.id,
                "name": product.name,
                "image_url": product.image_url,
                "volume": product.volume,
                "quantity": quantity,
                "unit_price": unit_price,
                "discount_percent": discount_percent,
            })

        if not items:
            return None

        delivery_fee = 0.0
        order = Order(
            user_id=user_id,
            status="created",
            delivery_address=delivery_address.strip(),
            customer_phone=customer_phone.strip(),
            delivery_window=delivery_window,
            comment=comment.strip() if comment else None,
            items=items,
            subtotal=round(subtotal, 2),
            discount_total=round(discount_total, 2),
            delivery_fee=delivery_fee,
            total=round(subtotal - discount_total + delivery_fee, 2),
        )
        self.session.add(order)
        for cart in cart_items:
            await self.session.delete(cart)
        await self.session.flush()
        return order
