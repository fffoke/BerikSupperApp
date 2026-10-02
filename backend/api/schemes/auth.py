


from pydantic import BaseModel, EmailStr, Field

class RegisterRequest(BaseModel):
    model_config = {"extra": "forbid"}

    email: EmailStr = Field(max_length=200)
    password: str = Field(min_length=8)
    

class LoginRequest(BaseModel):
    model_config = {"extra": "forbid"}

    email: EmailStr
    password: str



class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class RefreshRequest(BaseModel):
    model_config = {"extra": "forbid"}

    refresh_token: str

class MeResponse(BaseModel):
    id: int 
    email: str
    full_name: str | None
    role: str
    avatar_url: str | None = None

    model_config = {"from_attributes": True}
