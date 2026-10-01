from fastapi import APIRouter, HTTPException, status

from api.dependencies import CurrentUser, DbSession
from api.schemes.Food_delivery.order import OrderCreateRequest, OrderResponse
from app.services.FoodDelivery.order_service import OrderService


app = APIRouter()


@app.post('/', response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    session: DbSession,
    user: CurrentUser,
    body: OrderCreateRequest,
):
    service = OrderService(session)
    order = await service.create_from_cart(
        user_id=user.id,
        delivery_address=body.delivery_address,
        customer_phone=body.customer_phone,
        delivery_window=body.delivery_window,
        comment=body.comment,
    )
    if order is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Cart is empty')
    return order
