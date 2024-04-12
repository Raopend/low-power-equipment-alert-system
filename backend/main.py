from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from models import EquipmentState
from dependencies import get_db_session

app = FastAPI()


@app.get("/")
async def read_all_users(session: Session = Depends(get_db_session)):
    current_time = datetime.now() - relativedelta(years=2)
    print(current_time)
    seven_days_ago = current_time - timedelta(days=3)
    print(seven_days_ago)
    data = (
        session.query(EquipmentState)
        .filter(EquipmentState.collection_time >= seven_days_ago)
        .filter(EquipmentState.collection_time <= current_time)
        .limit(1000)
        .all()
    )
    return data
