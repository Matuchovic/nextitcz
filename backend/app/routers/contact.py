from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid

from app.core.database import get_db

router = APIRouter()


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    project_type: str
    message: str
    company: Optional[str] = None
    budget: Optional[str] = None


@router.post("/", status_code=201)
async def submit_contact(data: ContactForm, db=Depends(get_db)):
    await db.execute(
        """
        INSERT INTO contact_submissions (id, name, email, project_type, message, company, budget)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        """,
        str(uuid.uuid4()), data.name, data.email,
        data.project_type, data.message, data.company, data.budget,
    )
    return {"message": "Zpráva odeslána. Ozveme se do 2 hodin."}
