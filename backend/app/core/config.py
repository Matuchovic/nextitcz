from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "NEXTIT Technologies API"
    VERSION: str = "2.4.1"
    DEBUG: bool = False

    # Security
    SECRET_KEY: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080  # 7 days

    # Database
    DATABASE_URL: str

    # Supabase
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://nextit.tech",
        "https://nextit.vercel.app",
    ]

    ALLOWED_HOSTS: List[str] = [
        "localhost",
        "nextit.tech",
        "*.railway.app",
        "*.onrender.com",
    ]

    # Email
    RESEND_API_KEY: str = ""
    EMAIL_FROM: str = "noreply@nextit.tech"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
