from pydantic import BaseModel, ConfigDict, Field


class CategoryRequest(BaseModel):

    image_url: str
    name: str
    


class CategoryParentRequest(CategoryRequest):
    
    parent_id: int | None 


class CategoryResponse(CategoryParentRequest):
    model_config = ConfigDict(from_attributes=True)
    image_url: str | None = None
    parent_id: int | None = None
    slug: str
    id: int 
    children: list["CategoryResponse"] = Field(default_factory=list)


class CategoryListResponse(BaseModel):
    categorys: list[CategoryResponse]
