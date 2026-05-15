from fastapi import APIRouter, HTTPException, status


from app.services.FoodDelivery.category_service import CategoryService
from api.schemes.Food_delivery.category import CategoryListResponse, CategoryResponse
from api.dependencies import DbSession, CurrentAdmin

app = APIRouter()


@app.get(
        '/get_catalog', 
        response_model=CategoryListResponse, 
        status_code=status.HTTP_200_OK,
        summary='Возврощаем все родительские категорий'
)
async def get_parent_category(
    session: DbSession
):
    svc = CategoryService(session)

    categorys = await svc.repo.get_catalog()
    print(categorys)
    return CategoryListResponse(
        categorys = [ CategoryResponse.model_validate(c) for c in categorys ]
    )


@app.get(
    '/get_category_parent/{id}', 
    response_model=CategoryListResponse, 
    status_code=status.HTTP_200_OK,
    summary='Возврощаем все подкатегорий от родителя'
)
async def get_parent_category(
    session: DbSession,
    id: int
):
    svc = CategoryService(session)

    categorys = await svc.repo.get_by_parent(id)

    return CategoryListResponse(
        categorys = [ CategoryResponse.model_validate(c) for c in categorys ]
    )

