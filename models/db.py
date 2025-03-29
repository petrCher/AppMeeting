from models.base import Base
from sqlalchemy import Column, ForeignKey
from sqlalchemy.types import Integer, String, DateTime
from sqlalchemy.orm import relationship
import datetime

class Profile(Base):
    __tablename__ = "profile"
    id: int = Column(Integer, primary_key=True)
    name: str = Column(String, nullable=False)
    age: int = Column(Integer)
    gender: str = Column(String, nullable=False)
    description: str = Column(String)
    interests: str = Column(String)
    contact: str = Column(String, nullable=False)
    created_ts: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.now)
    updated_ts: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.now)

    comments = relationship("Comment", back_populates="profile")

class Comment(Base):
    __tablename__ = "comment"
    id: int = Column(Integer, primary_key=True)
    author_name: str = Column(String, nullable=False)
    content: str = Column(String, nullable=False)
    created_ts: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.now)
    updated_ts: datetime.datetime = Column(DateTime, nullable=False, default=datetime.datetime.now)
    profile_id: int = Column(Integer, ForeignKey("profile.id"))

    profile = relationship("Profile", back_populates="comments")