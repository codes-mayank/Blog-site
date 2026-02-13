from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Blog, Like
from app.schemas import  Token, LikeResponse
from app.core.security import get_current_user

router = APIRouter()

@router.post('/{id}')
def like(id: int, db: Session = Depends(get_db), token: Token = Depends(get_current_user)):
    """Like a blog post"""
    blog = db.query(Blog).filter(Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    existing_like = db.query(Like).filter(Like.blog_id == id, Like.user_id == token.user_id).first()
    if existing_like:
        existing_like.is_active = not existing_like.is_active
        db.commit()
        db.refresh(existing_like)
        return {'message': 'liked' if existing_like.is_active else 'unliked', 'blog_id': id, 'likes_count': blog.likes_count}
    
    new_like = Like(
        blog_id=id,
        user_id=token.user_id
    )
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    
    return {'message': 'liked', 'blog_id': id}

# @router.put('/{id}/unlike')
# def unlike(id: int, db: Session = Depends(get_db), token: Token = Depends(get_current_user):
#     """Unlike a blog post"""
#     blog = db.query(Blog).filter(Blog.id == id).first()
#     if not blog:
#         raise HTTPException(status_code=404, detail="Blog post not found")

#     if blog.likes_count > 0:
#         blog.likes_count -= 1
#         db.commit()
#         db.refresh(blog)
    
#     return {'message': 'unliked', 'likes_count': blog.likes_count}