from sqlalchemy import Boolean, Column, Integer, String

from app.core.database import Base


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    started_at = Column(String, nullable=False)
    ended_at = Column(String, nullable=True)
