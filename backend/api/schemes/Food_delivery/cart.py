from pydantic import BaseModel, ConfigDict

from app.db.models.user_model import User
from api.schemes.Food_delivery.product import ProductShortResponse

class CartCreateRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    product_id: int


class CartCreateResponse(CartCreateRequest):
    id: int
    quantity: int
    product: ProductShortResponse


class AllCartResponse(BaseModel):
    carts: list[CartCreateResponse]


class QuantityChangeRequest(BaseModel):
    id: int
    operand: bool


class QuantityChangeResponse(BaseModel):
    id: int | None = None
    quantity: int | None = None
    message: str | None = None