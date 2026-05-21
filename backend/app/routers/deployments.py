from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid

from app.core.database import get_db
from app.routers.auth import verify_token

router = APIRouter()


class DeploymentCreate(BaseModel):
    project_id: str
    version: str
    environment: str = "preview"


@router.get("/")
async def list_deployments(
    project_id: Optional[str] = None,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    if project_id:
        rows = await db.fetch(
            "SELECT * FROM deployments WHERE project_id = $1 ORDER BY created_at DESC LIMIT 50",
            project_id,
        )
    else:
        rows = await db.fetch(
            "SELECT * FROM deployments WHERE deployed_by = $1 ORDER BY created_at DESC LIMIT 50",
            token["sub"],
        )
    return [dict(r) for r in rows]


@router.post("/", status_code=201)
async def create_deployment(
    data: DeploymentCreate,
    token: dict = Depends(verify_token),
    db=Depends(get_db),
):
    # Verify project ownership
    project = await db.fetchrow("SELECT owner_id FROM projects WHERE id = $1", data.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Projekt nenalezen")
    if project["owner_id"] != token["sub"] and token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Přístup odepřen")

    deployment = await db.fetchrow(
        """
        INSERT INTO deployments (id, project_id, version, environment, deployed_by)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        """,
        str(uuid.uuid4()), data.project_id, data.version,
        data.environment, token["sub"],
    )
    return dict(deployment)
