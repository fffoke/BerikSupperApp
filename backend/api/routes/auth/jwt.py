from datetime import datetime, timedelta, timezone


import jwt

from app.config import app_settings

_ALGORITHM = "HS256"


def create_access_token(user_id):
    expire = datetime.now(timezone.utc) + timedelta(minutes=app_settings.jwt_access_ttl_minutes)
    payload = {'sub': str(user_id), 'exp': expire, 'type': 'access'}
    return jwt.encode(payload, app_settings.jwt_secret_key, algorithm=_ALGORITHM)


def create_refresh_token(user_id):
    expire = datetime.now(timezone.utc) + timedelta(days=app_settings.jwt_refresh_ttl_days)
    payload = {'sub': str(user_id), 'exp': expire, 'type': 'refresh'}
    return jwt.encode(payload, app_settings.jwt_secret_key, algorithm=_ALGORITHM)


def decode_token(token: str, expected_type: str = "access") -> int:
    try:
        payload = jwt.decode(token, app_settings.jwt_secret_key, algorithms=[_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

    if payload.get("type") != expected_type:
        raise ValueError(f"Expected {expected_type} token")

    sub = payload.get("sub")
    if not sub:
        raise ValueError("Missing subject")

    return int(sub)
