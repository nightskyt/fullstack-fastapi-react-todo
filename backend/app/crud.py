import datetime

from sqlalchemy.orm import Session

from app.schemas import todo as schemas
from app.models import todo as models


def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def get_todos(db: Session):
    return db.query(models.Todo).all()


def create_todo(db: Session, todo: schemas.TodoCreate):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    db_todo = models.Todo(**todo.model_dump(), started_at=now, ended_at='')
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def update_todo(db: Session, todo_id: int, todo: schemas.TodoUpdate):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        return

    db_todo.completed = todo.completed

    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        return

    db.delete(db_todo)
    db.commit()
    return {"message": "Todo deleted successfully"}

