from fastapi import APIRouter, Depends, HTTPException, Request
from typing import List, Optional
from sqlalchemy import update
from sqlalchemy.orm import Session, aliased
from app.models import Blog, User, Like
from app.database import get_db
from app.schemas import BlogBase, BlogCreate, BlogOut, BlogOutWithAuthor, BlogUpdate, Token
from app.core.security import get_current_user, verify_token
from app.utils.blog import create_slug
from sqlalchemy import case, and_, literal, func
from app.core.config import settings


router = APIRouter()




def get_current_user_optional(request: Request) -> Optional[Token]:
    """
    Get current user if logged in, otherwise return None.
    This doesn't raise an error if user is not authenticated.
    """
    token = request.cookies.get(settings.ACCESS_TOKEN_COOKIE_NAME)
    
    if not token:
        return None
    
    # try:
    #     token_data = verify_token(token)
    #     return token_data
    # except:
    #     return None
    print("\n\n\nToken from cookie:", token)  # Debugging line
    return verify_token(token)




# @router.get('/', response_model=List[BlogOutWithAuthor])
# def read_all_blogs(limit: int = 5, offset: int = 0, db: Session = Depends(get_db)):
#     """Read all blog posts with author details"""
    
#     blogs = (
#         db.query(
#             Blog.id,
#             Blog.slug,
#             Blog.title,
#             Blog.body,
#             Blog.author_id,
#             User.full_name.label("author_fullname"),
#             User.username.label("author_username"),
#         )
#         .join(User, Blog.author_id == User.id)
#         .filter(Blog.is_deleted == False)
#         .order_by(Blog.created_at.desc())
#         .limit(limit)
#         .offset(offset)
#         .all()
#     )
#     return blogs

# @router.get('/')
# def read_all_blogs(limit: int = 6, offset: int = 0, tag: str | None = None, search: str | None = None, db: Session = Depends(get_db)):
#     """Read all blog posts with author details"""

#     query = db.query(
#         Blog.id,
#         Blog.slug,
#         Blog.title,
#         Blog.tag,
#         Blog.body,
#         # Like.likes_count,
#         Blog.created_at,
#         Blog.featured_photo,
#         Blog.author_id,
#         User.full_name.label("author_fullname"),
#         User.username.label("author_username"),
#     ).join(User, Blog.author_id == User.id).filter(Blog.is_deleted.is_(False))

#     if tag and tag != 'All':
#         query = query.filter(Blog.tag == tag)
    
#     if search:
#         query = query.filter(Blog.title.like(f"%{search}%"))

#     blogs = (
#         query.order_by(Blog.created_at.desc())
#         .limit(limit)
#         .offset(offset)
#         .all()
#     )

#     return [
#         {
#             "id": b.id,
#             "slug": b.slug,
#             "title": b.title,
#             "body": b.body,
#             "created_at": b.created_at,
#             "tag": b.tag,
#             "featured_photo": b.featured_photo,
#             "author_id": b.author_id,
#             "author_fullname": b.author_fullname,
#             "author_username": b.author_username,
#             # "likes_count": b.likes_count,
#         }
#         for b in blogs
#     ]





@router.get('/', response_model=List[BlogOutWithAuthor])
def read_all_blogs(
    limit: int = 6, 
    offset: int = 0, 
    tag: str | None = None, 
    search: str | None = None,
    db: Session = Depends(get_db),
    current_user: Optional[Token] = Depends(get_current_user_optional)
):
    """Read all blog posts with author details and like status"""
    
    # Base query
    query = db.query(
        Blog.id,
        Blog.slug,
        Blog.title,
        Blog.tag,
        Blog.body,
        Blog.created_at,
        Blog.featured_photo,
        Blog.author_id,
        User.full_name.label("author_fullname"),
        User.username.label("author_username")
    ).join(User, Blog.author_id == User.id).filter(Blog.is_deleted.is_(False))
    
    if tag and tag != 'All':
        query = query.filter(Blog.tag == tag)
    
    if search:
        query = query.filter(Blog.title.like(f"%{search}%"))
    
    blogs = (
        query.order_by(Blog.created_at.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    
    
    # Prepare blog ids list (may be empty)
    blog_ids = [b.id for b in blogs]

    # Compute likes_count for each blog (only active likes)
    likes_count_map = {}
    if blog_ids:
        likes_data = (
            db.query(Like.blog_id, func.count(Like.id))
            .filter(Like.blog_id.in_(blog_ids), Like.is_active == True)
            .group_by(Like.blog_id)
            .all()
        )
        likes_count_map = {row[0]: row[1] for row in likes_data}

    # If user is logged in, check which blogs are liked by this user
    if current_user and blog_ids:
        user_id = current_user.user_id  # Extract user_id from Token model
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
            "likes_count": int(likes_count_map.get(b.id, 0)),
        }
        for b in blogs
    ]


# @router.get('/')
# def read_all_blogs(
#     limit: int = 6,
#     offset: int = 0,
#     tag: str | None = None,
#     search: str | None = None,
#     db: Session = Depends(get_db),
#     current_user: Optional[Token] = Depends(get_current_user_optional)
# ):
#     """Read all blog posts with author details and is_liked status (single query)"""
#     LikeAlias = aliased(Like)
#     user_id = current_user.user_id if current_user else None

#     # CASE expression for is_liked
#     if user_id:
#         is_liked_expr = case(
#             (
#                 and_(
#                     LikeAlias.id.isnot(None),
#                     LikeAlias.is_active == True
#                 ),
#                 True
#             ),
#             else_=False
#         ).label("is_liked")
#     else:
#         is_liked_expr = literal(False).label("is_liked")

#     query = (
#         db.query(
#             Blog.id,
#             Blog.slug,
#             Blog.title,
#             Blog.tag,
#             Blog.body,
#             Blog.created_at,
#             Blog.featured_photo,
#             Blog.author_id,
#             User.full_name.label("author_fullname"),
#             User.username.label("author_username"),
#             is_liked_expr
#         )
#         .join(User, Blog.author_id == User.id)
#         .outerjoin(
#             LikeAlias,
#             and_(
#                 LikeAlias.blog_id == Blog.id,
#                 LikeAlias.user_id == user_id
#             ) if user_id else LikeAlias.blog_id == Blog.id
#         )
#         .filter(Blog.is_deleted.is_(False))
#     )

#     if tag and tag != 'All':
#         query = query.filter(Blog.tag == tag)

#     if search:
#         query = query.filter(Blog.title.like(f"%{search}%"))

#     blogs = (
#         query.order_by(Blog.created_at.desc())
#         .limit(limit)
#         .offset(offset)
#         .all()
#     )

#     return [
#         {
#             "id": b.id,
#             "slug": b.slug,
#             "title": b.title,
#             "body": b.body,
#             "created_at": b.created_at,
#             "tag": b.tag,
#             "featured_photo": b.featured_photo,
#             "author_id": b.author_id,
#             "author_fullname": b.author_fullname,
#             "author_username": b.author_username,
#             "is_liked": b.is_liked,
#         }
#         for b in blogs
#     ]




@router.post('/', response_model=BlogOut)
def create_blogs(blog: BlogCreate, db: Session = Depends(get_db), token: Token = Depends(get_current_user)):
    """Create a new blog post"""
    new_blog = Blog(
        body=blog.body,
        title=blog.title,
        featured_photo=blog.featured_photo,
        tag=blog.tag,
        author_id=token.user_id,
        slug=create_slug(blog.title)
    )
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog


@router.get('/{slug}', response_model=BlogOutWithAuthor)
def read_blog(slug: str, db: Session = Depends(get_db)):
    """Read a single blog post by slug with author details"""
    blog = (
        db.query(
            Blog.id,
            Blog.slug,
            Blog.title,
            Blog.body,
            Blog.tag,
            # Like.likes_count,
            Blog.featured_photo,
            Blog.created_at,
            Blog.author_id,
            User.full_name.label("author_fullname"),
            User.username.label("author_username"),
        )
        .join(User, Blog.author_id == User.id)
        .filter(Blog.slug == slug, Blog.is_deleted.is_(False))
        .first()
    )
    if blog is None:
        return {'error': 'This blog post does not exist'}
    return blog


@router.delete('/{id}', response_model=dict)
def delete_blog(id: int, db: Session = Depends(get_db), token: Token = Depends(get_current_user)):
    """Delete a blog post by ID"""

    blog = db.query(Blog).filter(Blog.id == id, Blog.is_deleted == False).first()

    if blog is None:
        raise HTTPException(status_code=400, detail="Blog post not found")
    if blog.author_id != token.user_id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this blog post")
    
    delete_stmt = update(Blog).where(Blog.id == id).values(is_deleted=True)
    db.execute(delete_stmt)
    db.commit()
    db.refresh(blog)

    return {'message': 'This blog post has been deleted'}


@router.put('/{id}', response_model=BlogBase)
def update_blog(blog: BlogUpdate, id: int, db: Session = Depends(get_db), token: Token = Depends(get_current_user)):
    """Update a blog post by ID"""

    blog_db = db.query(Blog).filter(Blog.id == id, Blog.is_deleted == False).first()

    if blog_db is None:
        raise HTTPException(status_code=400, detail="Blog post not found")
    if blog_db.author_id != token.user_id:
        raise HTTPException(status_code=403, detail="You are not authorized to update this blog post")
    
    update_stmt = update(Blog).where(Blog.id == id).values(title=blog.title, body=blog.body, tag=blog.tag)
    db.execute(update_stmt)
    db.commit()
    db.refresh(blog_db)

    return blog_db



@router.get('/featured', response_model=List[BlogOutWithAuthor])
def get_featured_blogs(
    limit: int = 3,  # Get top 3 most liked
    db: Session = Depends(get_db),
    current_user: Optional[Token] = Depends(get_current_user_optional)
):
    """Get the most liked blog posts (featured posts)"""
    # Always return is_liked as False for featured list (not user-specific)
    is_liked_expr = literal(False).label("is_liked")

    # Subquery to count active likes per blog
    like_count_subquery = (
        db.query(
            Like.blog_id,
            func.count(Like.id).label('likes_count')
        )
        .filter(Like.is_active == True)
        .group_by(Like.blog_id)
        .subquery()
    )

    # Main query
    featured_blogs = (
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
            func.coalesce(like_count_subquery.c.likes_count, 0).label("likes_count"),
            is_liked_expr
        )
        .join(User, Blog.author_id == User.id)
        .outerjoin(like_count_subquery, Blog.id == like_count_subquery.c.blog_id)
        
        .filter(Blog.is_deleted.is_(False))
        .order_by(func.coalesce(like_count_subquery.c.likes_count, 0).desc())
        .limit(limit)
        .all()
    )

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
            "likes_count": int(b.likes_count),
            "is_liked": b.is_liked,
        }
        for b in featured_blogs
    ]
