from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Blog
from app.schemas import  Token
from app.core.security import get_current_user

router = APIRouter()

@router.put('/{id}/like')
def like(id: int, db: Session = Depends(get_db), token: Token = Depends(get_current_user)):
    """Like a blog post"""
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    # 2. Check if user already liked
    like = db.query(Like).filter(
        Like.blog_id == blog_id,
        Like.user_id == current_user.id
    ).first()

    if like:
        # Toggle like
        like.is_active = not like.is_active
        message = "Liked" if like.is_active else "Unliked"
    else:
        # First time like
        like = Like(
            blog_id=blog_id,
            user_id=current_user.id,
            is_active=True
        )
        db.add(like)
        message = "Liked"

    db.commit()

    # 3. Updated likes count
    likes_count = db.query(Like).filter(
        Like.blog_id == blog_id,
        Like.is_active == True
    ).count()

    return {
        "message": message,
        "blog_id": blog_id,
        "likes_count": likes_count,
        "is_liked_by_me": like.is_active
    }

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