
from fastapi import APIRouter, HTTPException, status

from api.routes.auth.jwt import create_access_token, create_refresh_token, decode_token
from api.routes.auth.password import hash_password, verify_password
from api.schemes.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    RefreshRequest,
    MeResponse
)
from app.db.repositories.user_repo import UserRepository
from app.services.user_service import UserService
from api.dependencies import DbSession, CurrentUser


router = APIRouter()


@router.post('/register', response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(
    body: RegisterRequest,
    session: DbSession
) -> TokenResponse:
    
    repo = UserRepository(session)
    existing = await repo.get_by_fullname(body.full_name)

    if existing:
        raise HTTPException(status.HTTP_409_CONFLICT, "Fullname already registered")

    body_2 = body.model_dump()
    password = body_2.pop('password')
    body_2['password_hash'] = hash_password(password)

    user = await repo.create(**body_2)

    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id)
    )

@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, session: DbSession) -> TokenResponse:
    repo = UserRepository(session)
    user = await repo.get_by_fullname(body.full_name)
    if not user or not user.password_hash:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    if not verify_password(body.password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")
    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh(body: RefreshRequest, session: DbSession) -> TokenResponse:
    try:
        user_id = decode_token(body.refresh_token, expected_type="refresh")
    except ValueError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid refresh token")

    svc = UserService(session)
    user = await svc.repo.get_by_id(user_id)
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not found")

    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )


@router.get("/me", response_model=MeResponse)
async def me(user: CurrentUser) -> MeResponse:
    return MeResponse(
        id=user.id,
        email=user.email or "",
        full_name=user.full_name,
        avatar_url=user.avatar_url or '',
        role=user.role
    )
