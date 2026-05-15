


from app.db.repositories.base import BaseRepository
from app.db.models.FoodDelivery.cart_model import CartItem
from typing import Sequence
from sqlalchemy import select

class CartRepository(BaseRepository[CartItem]):

    model = CartItem

    async def quantity_change(self, operand: True, cart: CartItem):
        if operand:
            cart.quantity += 1
        else:
            cart.quantity -= 1
        await self.session.flush()
        await self.session.refresh(cart)
        return cart
    
    