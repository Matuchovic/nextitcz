from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import jwt
import bcrypt

from app.core.config import settings
from app.core.database import get_db

router = APIRouter()
security = HTTPBearer()


# ─── Schemas ─────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    company: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: dict


# ─── JWT helpers ──────────────────────────────────────────────────
def create_token(user_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token vypršel")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Neplatný token")


def require_admin(token: dict = Depends(verify_token)) -> dict:
    if token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Přístup odepřen")
    return token


# ─── Endpoints ───────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db=Depends(get_db)):
    # Fetch user from DB
    user = await db.fetchrow(
        "SELECT * FROM profiles WHERE email = $1", data.email
    )
    if not user:
        raise HTTPException(status_code=401, detail="Nesprávné přihlašovací údaje")

    # Verify password
    if not bcrypt.checkpw(data.password.encode(), user["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Nesprávné přihlašovací údaje")

    token = create_token(str(user["id"]), user["role"])

    return TokenResponse(
        access_token=token,
        expires_in=settings.JWT_EXPIRE_MINUTES * 60,
        user={
            "id": str(user["id"]),
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "avatar_url": user["avatar_url"],
        },
    )


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db=Depends(get_db)):
    # Check if email exists
    existing = await db.fetchrow(
        "SELECT id FROM profiles WHERE email = $1", data.email
    )
    if existing:
        raise HTTPException(status_code=409, detail="Email je již zaregistrován")

    # Hash password
    password_hash = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt()).decode()

    # Create user
    user = await db.fetchrow(
        """
        INSERT INTO profiles (email, name, company, password_hash, role)
        VALUES ($1, $2, $3, $4, 'user')
        RETURNING *
        """,
        data.email, data.name, data.company, password_hash,
    )

    token = create_token(str(user["id"]), "user")

    return TokenResponse(
        access_token=token,
        expires_in=settings.JWT_EXPIRE_MINUTES * 60,
        user={
            "id": str(user["id"]),
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
        },
    )


@router.post("/logout")
async def logout(token: dict = Depends(verify_token)):
    # In a production app, add token to a blacklist in Redis
    return {"message": "Odhlášení úspěšné"}


@router.get("/me")
async def get_me(token: dict = Depends(verify_token), db=Depends(get_db)):
    user = await db.fetchrow(
        "SELECT id, email, name, role, avatar_url, company, created_at FROM profiles WHERE id = $1",
        token["sub"],
    )
    if not user:
        raise HTTPException(status_code=404, detail="Uživatel nenalezen")
    return dict(user)
