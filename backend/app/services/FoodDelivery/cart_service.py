
from app.db.repositories.FoodDelivery.cart_repo import CartRepository
from app.db.repositories.FoodDelivery.product_repo import ProductRepository
from sqlalchemy.ext.asyncio import AsyncSession
from api.schemes.Food_delivery.cart import CartCreateResponse, AllCartResponse
from api.schemes.Food_delivery.product import ProductShortResponse

class CartService():


    def __init__(self, session: AsyncSession):
        self.cart_repo = CartRepository(session)
        self.product_repo = ProductRepository(session)


    async def create(self, product_id, user_id):

        kwargs: dict =  {
            'product_id': product_id,
            'user_id': user_id,
            'quantity': 1
        }

        cart_item = await self.cart_repo.create(**kwargs)
        product = await self.product_repo.get_by_id(product_id)

        return CartCreateResponse(
            product_id = kwargs['product_id'],
            id = cart_item.id,
            quantity = kwargs['quantity'],
            product=ProductShortResponse.model_validate(product)
        )
    
    async def change_quantity(self, cart_id: int, operand: bool):
        result = await self.cart_repo.quantity_change(operand=operand, cart_id=cart_id)
        return result
    
    
    async def get_all_cart(self, user_id):
        carts = await self.cart_repo.get_all_by_user(user_id)

        return AllCartResponse(
            carts= [
                CartCreateResponse(
                    id=cart.id,
                    product_id=cart.product_id,
                    quantity=cart.quantity,
                    product=ProductShortResponse.model_validate(
                        cart.product
                    )
                )
                for cart in carts
            ] 
        )