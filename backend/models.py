from sqlalchemy import Column, Integer, Double, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class EquipmentState(Base):
    __tablename__ = "dnaq_15s_interval"

    id = Column(Integer, primary_key=True)
    Ia = Column(Double)
    Ib = Column(Double)
    Ic = Column(Double)
    Ua = Column(Double)
    Ub = Column(Double)
    Uc = Column(Double)
    elec_degree = Column(Double)
    P = Column(Double)
    COS = Column(Double)
    collection_time = Column(DateTime)
