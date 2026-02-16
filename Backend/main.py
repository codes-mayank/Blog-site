from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import Base
from app.database import engine

from app.api.auth import router as auth_router
from app.api.blog import router as blog_router
from app.api.likes import router as likes_router
from app.api.featured import router as featured_router


app = FastAPI(title='blog app')
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get('/test')
def test():
    return {'message': 'Name is Mayank'}

app.include_router(auth_router, prefix='/auth', tags=['Auth'])
app.include_router(blog_router, prefix='/posts', tags=['Blogs'])
app.include_router(likes_router, prefix='/likes', tags=['Likes'])
app.include_router(featured_router, prefix='/featured', tags=['Featured'])

@app.get('/')
def root():
    return {'message': 'Welcome to the blog site'}

