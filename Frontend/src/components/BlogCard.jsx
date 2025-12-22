import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
        <article className="blog-card">
            <div className="card-image">
                <img src={post.image} alt={post.title} />
                <span className="card-category">{post.category}</span>
            </div>
            <div className="card-content">
                <div className="card-meta">
                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                    <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-excerpt">{post.excerpt}</p>
                <Link to={`/post/${post.slug}`} className="card-link">
                    Read Article <ArrowRight size={16} />
                </Link>
            </div>
        </article>
    );
};

export default BlogCard;
