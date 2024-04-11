from fastapi import FastAPI

from database import Database
from models import EquipmentState

app = FastAPI()

database = Database()
engine = database.get_db_connection()


@app.get("/")
async def read_all_users():
    session = database.get_db_session(engine)
    data = session.query(EquipmentState).limit(100).all()
    return data
