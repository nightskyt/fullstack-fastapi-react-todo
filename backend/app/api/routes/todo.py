from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.core.database import SessionLocal
from app.schemas import todo

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[todo.TodoInDB])
async def get_todos(db: Session = Depends(get_db)):
    db_todos = crud.get_todos(db)
    return db_todos


@router.get("/{todo_id}", response_model=todo.TodoInDB)
async def get_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )
    return db_todo


@router.post("/", response_model=todo.TodoInDB)
async def create_todo(todo: todo.TodoCreate, db: Session = Depends(get_db)):
    db_todo = crud.create_todo(db=db, todo=todo)
    return db_todo


@router.put("/{todo_id}", response_model=todo.TodoInDB)
async def update_todo(
    todo_id: int, todo: todo.TodoUpdate, db: Session = Depends(get_db)
):
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )
    db_todo = crud.update_todo(db=db, todo_id=todo_id, todo=todo)
    return db_todo


@router.delete("/{todo_id}")
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found"
        )

    return crud.delete_todo(db=db, todo_id=todo_id)
