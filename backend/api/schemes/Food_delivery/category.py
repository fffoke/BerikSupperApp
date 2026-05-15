from pydantic import BaseModel, ConfigDict


class CategoryRequest(BaseModel):

    image_url: str
    name: str
    


class CategoryParentRequest(CategoryRequest):
    
    parent_id: int | None 


class CategoryResponse(CategoryParentRequest):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    id: int 


class CategoryListResponse(BaseModel):
    categorys: list[CategoryResponse]