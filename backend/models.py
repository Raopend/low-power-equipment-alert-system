from sqlalchemy import Column, Integer, Double
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class EquipmentState(Base):
    __tablename__ = "dnaq_history_data_2022"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer)
    Ia = Column(Double)
    Ib = Column(Double)
    Ic = Column(Double)
    Ua = Column(Double)
    Ub = Column(Double)
    Uc = Column(Double)
    elec_degree = Column(Double)
