


from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.cart_model import CartItem
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.orm import selectinload

class CartRepository(BaseRepository[CartItem]):

    model = CartItem

    async def get_by_user_and_product(
        self,
        user_id: int,
        product_id: int,
    ) -> CartItem | None:
        result = await self.session.scalars(
            select(CartItem)
            .options(selectinload(CartItem.product))
            .where(
                CartItem.user_id == user_id,
                CartItem.product_id == product_id,
            )
        )
        return result.first()

    async def quantity_change(
        self,
        operand: bool,
        cart_id: int,
        user_id: int,
    ) -> CartItem | dict | None:
        result = await self.session.scalars(
            select(CartItem)
            .options(selectinload(CartItem.product))
            .where(CartItem.id == cart_id, CartItem.user_id == user_id)
        )
        cart = result.first()
        if cart is None:
            return None

        if not operand and cart.quantity <= 1:
            await self.session.delete(cart)
            return {
                'id': cart.id,
                'quantity': 0,
                'message': 'deleted'
            }

        cart.quantity += 1 if operand else -1
        await self.session.flush()
        return cart

    async def get_all_by_user(
        self,
        user_id: int
    ):
        carts = await self.session.scalars(
            select(CartItem)
            .options(
                selectinload(CartItem.product)
            )
            .where(CartItem.user_id == user_id)
        )

        return carts.all()
