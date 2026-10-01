from fastapi import APIRouter, HTTPException, status


from app.services.FoodDelivery.cart_service import CartService
from api.schemes.Food_delivery.cart import CartCreateRequest, AllCartResponse, CartCreateResponse, QuantityChangeRequest, QuantityChangeResponse
from api.dependencies import DbSession, CurrentUser

app = APIRouter()

@app.post(
    '/', 
    response_model=CartCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary='Создание объекта корзины'
)
async def add_cart(
    session: DbSession,
    user: CurrentUser,
    body: CartCreateRequest
):
    svc = CartService(session)
    cart = await svc.create(user_id=user.id, product_id=body.product_id)
    if cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Product not found')
    return cart


@app.post(
    '/change_quantity',
    status_code=status.HTTP_200_OK,
    summary='Изменения количество продукта',
    response_model=QuantityChangeResponse
)
async def change_quantity(
    session: DbSession,
    user: CurrentUser,
    body: QuantityChangeRequest,
):
    svc = CartService(session)
    res = await svc.change_quantity(body.id, body.operand, user.id)
    if res is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Cart item not found')
    if isinstance(res, dict):
        return QuantityChangeResponse(**res)
    return QuantityChangeResponse(id=res.id, quantity=res.quantity)



@app.get(
    '/get_all',
    status_code=status.HTTP_200_OK,
    summary='Получить всю корзину юзера',
    response_model=AllCartResponse
)
async def get_all(
    session: DbSession,
    user: CurrentUser,
):
    svc = CartService(session)
    res = await svc.get_all_cart(user.id)

    return res


@app.delete('/clear', status_code=status.HTTP_204_NO_CONTENT)
async def clear_cart(
    session: DbSession,
    user: CurrentUser,
):
    svc = CartService(session)
    await svc.cart_repo.clear_by_user(user.id)
