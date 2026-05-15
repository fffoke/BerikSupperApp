from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import app_settings
from fastapi.staticfiles import StaticFiles


from api.routes import (
    auth_route,
)
from api.routes.Food_delivery import (
    category,
    prdouct
)

import uvicorn

app = FastAPI(
    title='BerikSupperApp_Backend'
)

app.include_router(auth_route.router, prefix='/api/v1/auth', tags=['Auth'])
app.include_router(prdouct.app, prefix='/api/v1/product', tags=['Product'])
app.include_router(category.app, prefix='/api/v1/category', tags=['Category'])

app.add_middleware(
    CORSMiddleware,
    allow_origins=app_settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    '/static',
    StaticFiles(directory='static'),
    name='static'
)

if __name__ == "__main__":
    uvicorn.run(
        "api.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )