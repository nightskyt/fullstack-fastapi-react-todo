from pydantic import BaseModel


class TodoBase(BaseModel):
    title: str
    description: str


class TodoInDB(TodoBase):
    id: int
    completed: bool = False

    started_at: str = None
    ended_at: str = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(TodoBase):
    completed: bool
