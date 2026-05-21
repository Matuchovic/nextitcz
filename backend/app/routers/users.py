from fastapi import APIRouter, Depends
from app.routers.auth import verify_token, require_admin
from app.core.database import get_db

router = APIRouter()


@router.get("/")
async def list_users(token: dict = Depends(require_admin), db=Depends(get_db)):
    rows = await db.fetch(
        "SELECT id, email, name, role, company, created_at FROM profiles ORDER BY created_at DESC"
    )
    return [dict(r) for r in rows]


@router.get("/{user_id}")
async def get_user(user_id: str, token: dict = Depends(verify_token), db=Depends(get_db)):
    if token["sub"] != user_id and token.get("role") != "admin":
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Přístup odepřen")
    row = await db.fetchrow(
        "SELECT id, email, name, role, avatar_url, company, created_at FROM profiles WHERE id = $1",
        user_id,
    )
    if not row:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Uživatel nenalezen")
    return dict(row)
