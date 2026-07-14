from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_connection_url = os.environ['MONGO_URL']
mongo_client = AsyncIOMotorClient(mongo_connection_url)
database = mongo_client[os.environ['DB_NAME']]
contact_message_cache = []

app = FastAPI()
api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

    @validator('name')
    def validate_name_length(cls, value):
        cleaned_name = value.strip()
        if len(cleaned_name) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if len(cleaned_name) > 100:
            raise ValueError('Name must be less than 100 characters')
        return cleaned_name

    @validator('subject')
    def validate_subject_length(cls, value):
        cleaned_subject = value.strip()
        if len(cleaned_subject) < 5:
            raise ValueError('Subject must be at least 5 characters long')
        if len(cleaned_subject) > 200:
            raise ValueError('Subject must be less than 200 characters')
        return cleaned_subject

    @validator('message')
    def validate_message_length(cls, value):
        cleaned_message = value.strip()
        if len(cleaned_message) < 10:
            raise ValueError('Message must be at least 10 characters long')
        if len(cleaned_message) > 2000:
            raise ValueError('Message must be less than 2000 characters')
        return cleaned_message

class ContactMessageRequest(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

    @validator('name')
    def validate_name_length(cls, value):
        cleaned_name = value.strip()
        if len(cleaned_name) < 2:
            raise ValueError('Name must be at least 2 characters long')
        if len(cleaned_name) > 100:
            raise ValueError('Name must be less than 100 characters')
        return cleaned_name

    @validator('subject')
    def validate_subject_length(cls, value):
        cleaned_subject = value.strip()
        if len(cleaned_subject) < 5:
            raise ValueError('Subject must be at least 5 characters long')
        if len(cleaned_subject) > 200:
            raise ValueError('Subject must be less than 200 characters')
        return cleaned_subject

    @validator('message')
    def validate_message_length(cls, value):
        cleaned_message = value.strip()
        if len(cleaned_message) < 10:
            raise ValueError('Message must be at least 10 characters long')
        if len(cleaned_message) > 2000:
            raise ValueError('Message must be less than 2000 characters')
        return cleaned_message

@api_router.get("/")
async def health_check():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(request_data: StatusCheckCreate):
    status_data = request_data.dict()
    status_record = StatusCheck(**status_data)
    await database.status_checks.insert_one(status_record.dict())
    return status_record

@api_router.get("/status", response_model=List[StatusCheck])
async def fetch_status_checks():
    status_records = await database.status_checks.find().to_list(1000)
    return [StatusCheck(**record) for record in status_records]

@api_router.post("/contact")
async def handle_contact_submission(contact_request: ContactMessageRequest):
    try:
        contact_record = ContactMessage(**contact_request.dict())

        try:
            insert_result = await database.contact_messages.insert_one(contact_record.dict())

            if not insert_result.inserted_id:
                raise RuntimeError("Failed to save message")
        except Exception:
            contact_message_cache.append(contact_record.dict())

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Thank you for your message! I'll get back to you soon.",
                "data": {"id": contact_record.id}
            }
        )
            
    except ValueError as validation_error:
        raise HTTPException(status_code=400, detail=str(validation_error))
    except Exception as server_error:
        logger.error(f"Contact form submission error: {str(server_error)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact/messages")
async def fetch_contact_messages():
    """Retrieve all contact messages for admin use"""
    try:
        try:
            message_records = await database.contact_messages.find({}, {"_id": 0}).sort("timestamp", -1).to_list(100)
        except Exception:
            message_records = list(contact_message_cache)
        
        for record in message_records:
            if "timestamp" in record and isinstance(record["timestamp"], datetime):
                record["timestamp"] = record["timestamp"].isoformat()
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": message_records
            }
        )
    except Exception as fetch_error:
        logger.error(f"Error retrieving contact messages: {str(fetch_error)}")
        raise HTTPException(status_code=500, detail="Internal server error")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def close_database_connection():
    mongo_client.close()