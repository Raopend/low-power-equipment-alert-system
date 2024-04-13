from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from routers import state
from models import EquipmentState
from dependencies import get_db_session

app = FastAPI()
app.include_router(state.router)


@app.get("/")
async def get_equipment_state(session: Session = Depends(get_db_session)):
    current_time = datetime.now() - relativedelta(years=2)
    fifteen_sec_ago = current_time - timedelta(seconds=15)
    data = (
        session.query(EquipmentState)
        .filter(EquipmentState.collection_time >= fifteen_sec_ago)
        .filter(EquipmentState.collection_time <= current_time)
        .limit(1)
        .all()
    )
    data = data[0].__dict__ if data else {}
    return data
