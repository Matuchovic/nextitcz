import asyncpg
from app.core.config import settings

_pool = None


async def init_db():
    global _pool
    _pool = await asyncpg.create_pool(
        settings.DATABASE_URL,
        min_size=2,
        max_size=10,
        command_timeout=30,
    )


async def get_db():
    async with _pool.acquire() as conn:
        yield conn
