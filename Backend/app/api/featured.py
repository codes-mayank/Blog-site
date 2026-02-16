from sqlalchemy import func, case
from sqlalchemy.orm import Session
from typing import Optional, List
from fastapi import APIRouter, Depends
from app.database import get_db
from app.core.security import get_current_user_optional
from app.schemas import Token, BlogOutWithAuthor
from app.models import Blog, User, Like

router = APIRouter()

@router.get('/', response_model=List[BlogOutWithAuthor])
def get_most_liked_posts(
    limit: int = 3,
    db: Session = Depends(get_db),
    current_user: Optional[Token] = Depends(get_current_user_optional)
):
    """Get the most liked blog posts"""
    
    # Subquery to count active likes for each blog
    likes_subquery = (
        db.query(
            Like.blog_id,
            func.count(Like.id).label('likes_count')
        )
        .filter(Like.is_active == True)
        .group_by(Like.blog_id)
        .subquery()
    )
    
    # Main query with author details and likes count
    query = (
        db.query(
            Blog.id,
            Blog.slug,
            Blog.title,
            Blog.tag,
            Blog.body,
            Blog.created_at,
            Blog.featured_photo,
            Blog.author_id,
            User.full_name.label("author_fullname"),
            User.username.label("author_username"),
            func.coalesce(likes_subquery.c.likes_count, 0).label("likes_count")
        )
        .join(User, Blog.author_id == User.id)
        .outerjoin(likes_subquery, Blog.id == likes_subquery.c.blog_id)
        .filter(Blog.is_deleted == False)
        .order_by(func.coalesce(likes_subquery.c.likes_count, 0).desc(), Blog.created_at.desc())
        .limit(limit)
        .all()
    )
    
    # If user is logged in, check which posts they've liked
    if current_user:
        blog_ids = [b.id for b in query]
        user_id = current_user.user_id
        
        liked_blog_ids = set(
            row[0] for row in db.query(Like.blog_id)
            .filter(
                Like.blog_id.in_(blog_ids),
                Like.user_id == user_id,
                Like.is_active == True
            )
            .all()
        )
    else:
        liked_blog_ids = set()
    
    # Format the response
    return [
        {
            "id": b.id,
            "slug": b.slug,
            "title": b.title,
            "body": b.body,
            "created_at": b.created_at,
            "tag": b.tag,
            "featured_photo": b.featured_photo,
            "author_id": b.author_id,
            "author_fullname": b.author_fullname,
            "author_username": b.author_username,
            "is_liked": b.id in liked_blog_ids,
            "likes_count": b.likes_count,
        }
        for b in query
    ]