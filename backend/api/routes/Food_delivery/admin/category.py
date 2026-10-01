from fastapi import APIRouter, HTTPException, status


from app.services.FoodDelivery.category_service import CategoryService
from api.schemes.Food_delivery.category import CategoryParentRequest, CategoryResponse
from api.dependencies import DbSession, CurrentAdmin

app = APIRouter()


@app.post('/category', response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(
    session: DbSession,
    admin: CurrentAdmin,
    body: CategoryParentRequest
): 
    svc = CategoryService(session)

    category = await svc.create(
        name = body.name,
        image_url = body.image_url,
        parent_id = body.parent_id  
    )

    return CategoryResponse(**category)

    
