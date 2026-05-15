


from pydantic import BaseModel, EmailStr, model_validator

class RegisterRequest(BaseModel):
    model_config = {"extra": "forbid"}

    email: EmailStr | None = None
    password: str
    full_name: str 
    phone: str | None = None
    avatar_url: str | None = None


    @model_validator(mode="after")
    def validate_password_length(self) -> "RegisterRequest":
        if len(self.password) < 5:
            raise ValueError("Password must be at least 8 characters")
        return self
    

class LoginRequest(BaseModel):
    model_config = {"extra": "forbid"}

    full_name: str
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
