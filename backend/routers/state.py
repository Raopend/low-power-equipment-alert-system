import asyncio
import json

from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.websockets import WebSocket
from datetime import datetime, timedelta
from dependencies import get_db_session
from models import EquipmentState

router = APIRouter()


@router.websocket("/ws/equipment_state")
async def get_equipment_state(websocket: WebSocket, session: Session = Depends(get_db_session)):
    await websocket.accept()
    while True:
        ping = await websocket.receive_text()
        current_time = datetime.now() - relativedelta(years=2)
        fifteen_sec_ago = current_time - timedelta(seconds=15)
        data = (
            session.query(EquipmentState)
            .filter(EquipmentState.collection_time >= fifteen_sec_ago)
            .filter(EquipmentState.collection_time <= current_time)
            .limit(1)
            .all()
        )
        #  取出第一个，如果没有数据则返回空字典
        data = data[0].__dict__ if data else {}
        if data:
            data.pop("_sa_instance_state", None)
        await websocket.send_json({"data": data})
        await asyncio.sleep(10)
