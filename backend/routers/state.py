from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.websockets import WebSocket
from datetime import datetime
from dependencies import get_db_session

router = APIRouter()


@router.websocket("/ws/equipment_state")
async def get_equipment_state(websocket: WebSocket, session: Session = Depends(get_db_session())):
    current_datetime = datetime.now()
