import React from 'react';
import './PostCard.css';

const PostCard = ({ title, time, tag, authorImg }) => {
  return (
    <div className="post-card">
      <div className="post-content">
        <h3 className="post-title">{title}</h3>
        
        <div className="post-meta">
           <div className="meta-left">
             <img src={authorImg || "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="User" className="post-author-img" />
             <span className="post-read-time">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="time-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {time}
             </span>
           </div>
           
           <span className="post-tag">{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
