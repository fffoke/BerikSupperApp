


from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.cart_model import CartItem
from typing import Sequence
from sqlalchemy import select
from sqlalchemy.orm import selectinload

class CartRepository(BaseRepository[CartItem]):

    model = CartItem

    async def quantity_change(self, operand: True, cart_id: int) -> CartItem | dict:
        cart = await self.get_by_id(cart_id)
        if operand:
            cart.quantity += 1
        else:
            cart.quantity -= 1
        if cart.quantity == 0:
            await self.session.delete(cart)
            return  {
                'message': 'deleted'
            }
        else:
            await self.session.flush()
            await self.session.refresh(cart)
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