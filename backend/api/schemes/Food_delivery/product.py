from pydantic import BaseModel, Field, ConfigDict
from decimal import Decimal


class ProductCreateRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=2, max_length=250)
    price: float = Field(gt=0)

    expiration: str
    conditions: str

    brand: str | None = None
    manufacturer: str | None = None

    calories: float | None = None
    proteins: float | None = None
    fats: float | None = None
    carbs: float | None = None

    img_url: str | None = None
    volume: str
    category_id: int

class ProductResponse(ProductCreateRequest):
    model_config = ConfigDict(from_attributes=True)

    id: int





class ProductShortResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    image_url: str | None
    price: float

class ProductListResponse(BaseModel):
    
    produtcs: list[ProductResponse]


class CategoryProductsResponse(BaseModel):
    category_name: str

    products: list[ProductShortResponse]