from fastapi import APIRouter

from app.api.routes import todo

router = APIRouter()
router.include_router(todo.router, prefix="/todos", tags=["todos"])