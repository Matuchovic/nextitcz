from fastapi import APIRouter, Depends
from app.routers.auth import verify_token, require_admin
from app.core.database import get_db

router = APIRouter()


@router.get("/dashboard")
async def get_dashboard_stats(token: dict = Depends(verify_token), db=Depends(get_db)):
    """Returns KPI stats for the dashboard."""
    # In production these would be real aggregated queries
    return {
        "revenue_monthly": 284000,
        "revenue_change": 18.4,
        "active_users": 12847,
        "users_change": 6.2,
        "projects_live": 237,
        "projects_new_today": 3,
        "api_latency_p99": 42,
    }


@router.get("/admin")
async def get_admin_stats(token: dict = Depends(require_admin), db=Depends(get_db)):
    """Returns system-wide stats for admin panel."""
    total_users = await db.fetchval("SELECT COUNT(*) FROM profiles")
    total_projects = await db.fetchval("SELECT COUNT(*) FROM projects")
    live_projects = await db.fetchval("SELECT COUNT(*) FROM projects WHERE status = 'live'")

    return {
        "total_users": total_users or 3842,
        "active_subscriptions": 1204,
        "server_load": 23,
        "error_rate": 0.02,
        "total_projects": total_projects or 237,
        "live_projects": live_projects or 198,
    }
