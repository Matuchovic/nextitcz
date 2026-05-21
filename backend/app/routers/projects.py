from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from app.core.database import get_db
from app.routers.auth import verify_token, require_admin

router = APIRouter()


# ─── Schemas ─────────────────────────────────────────────────────
class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    tech_stack: List[str] = []
    deadline: Optional[datetime] = None


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    progress: Optional[int] = None
    deadline: Optional[datetime] = None


# ─── Endpoints ───────────────────────────────────────────────────
@router.get("/")
async def list_projects(
    status: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    offset = (page - 1) * limit
    user_id = token["sub"]
    role = token.get("role")

    if role == "admin":
        # Admins see all projects
        where = "WHERE 1=1"
        params = []
    else:
        where = "WHERE owner_id = $1"
        params = [user_id]

    if status:
        param_idx = len(params) + 1
        where += f" AND status = ${param_idx}"
        params.append(status)

    rows = await db.fetch(
        f"SELECT * FROM projects {where} ORDER BY created_at DESC LIMIT {limit} OFFSET {offset}",
        *params,
    )
    total = await db.fetchval(f"SELECT COUNT(*) FROM projects {where}", *params)

    return {
        "data": [dict(r) for r in rows],
        "total": total,
        "page": page,
        "limit": limit,
    }


@router.post("/", status_code=201)
async def create_project(
    data: ProjectCreate,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    project = await db.fetchrow(
        """
        INSERT INTO projects (id, name, description, tech_stack, deadline, owner_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        """,
        str(uuid.uuid4()), data.name, data.description,
        data.tech_stack, data.deadline, token["sub"],
    )
    return dict(project)


@router.get("/{project_id}")
async def get_project(
    project_id: str,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    project = await db.fetchrow(
        "SELECT * FROM projects WHERE id = $1", project_id
    )
    if not project:
        raise HTTPException(status_code=404, detail="Projekt nenalezen")

    # Only owner or admin can view
    if project["owner_id"] != token["sub"] and token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Přístup odepřen")

    return dict(project)


@router.patch("/{project_id}")
async def update_project(
    project_id: str,
    data: ProjectUpdate,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    project = await db.fetchrow(
        "SELECT * FROM projects WHERE id = $1", project_id
    )
    if not project:
        raise HTTPException(status_code=404, detail="Projekt nenalezen")

    if project["owner_id"] != token["sub"] and token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Přístup odepřen")

    updates = data.dict(exclude_unset=True)
    if not updates:
        return dict(project)

    set_clause = ", ".join(f"{k} = ${i+2}" for i, k in enumerate(updates))
    values = list(updates.values())

    updated = await db.fetchrow(
        f"UPDATE projects SET {set_clause}, updated_at = NOW() WHERE id = $1 RETURNING *",
        project_id, *values,
    )
    return dict(updated)


@router.delete("/{project_id}", status_code=204)
async def delete_project(
    project_id: str,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    project = await db.fetchrow(
        "SELECT owner_id FROM projects WHERE id = $1", project_id
    )
    if not project:
        raise HTTPException(status_code=404, detail="Projekt nenalezen")

    if project["owner_id"] != token["sub"] and token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Přístup odepřen")

    await db.execute("DELETE FROM projects WHERE id = $1", project_id)
