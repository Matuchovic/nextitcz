from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.core.config import settings
from app.core.database import init_db
from app.routers import auth, users, projects, deployments, contact, analytics


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown
    pass


app = FastAPI(
    title="NEXTIT Technologies API",
    description="Backend API pro NEXTIT Technologies platformu",
    version="2.4.1",
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# ─── Middleware ───────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

if not settings.DEBUG:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.ALLOWED_HOSTS,
    )

# ─── Routers ─────────────────────────────────────────────────────
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(deployments.router, prefix="/api/deployments", tags=["Deployments"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "2.4.1",
        "service": "NEXTIT Technologies API",
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info",
    )
