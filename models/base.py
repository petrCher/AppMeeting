from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from settings import get_settings, Settings


settings: Settings = get_settings()

engine = create_engine("postgresql://postgres:Alpha2006@localhost:5432")
db_session: Session = sessionmaker(bind=engine)
Base = declarative_base()

def get_db():
    try:
        with db_session() as session:
            yield session
    finally:
        session.close()

