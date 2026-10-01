from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class OrderCreateRequest(BaseModel):
    delivery_address: str = Field(min_length=5, max_length=500)
    customer_phone: str = Field(min_length=5, max_length=30)
    delivery_window: str = Field(min_length=2, max_length=80)
    comment: str | None = Field(default=None, max_length=1000)


class OrderItemResponse(BaseModel):
    product_id: int
    name: str
    image_url: str | None
    volume: str
    quantity: int
    unit_price: float
    discount_percent: int


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: str
    delivery_address: str
    customer_phone: str
    delivery_window: str
    comment: str | None
    items: list[OrderItemResponse]
    subtotal: float
    discount_total: float
    delivery_fee: float
    total: float
    created_at: datetime
