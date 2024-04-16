from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from routers import state
from models import EquipmentState
from dependencies import get_db_session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(state.router)

