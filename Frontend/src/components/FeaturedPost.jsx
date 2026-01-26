import React from 'react';
import './FeaturedPost.css';
import '../assets/Default.jpg';

const FeaturedPost = () => {
  return (
    <div className="featured-card">
      <div className="featured-image-container">
        {/* <img src="Default.jpg" alt="Featured Post" /> */}
      </div>
      
      <div className="featured-content">
        <span className="featured-tag">Featured</span>
        <h2 className="featured-title">The Evolution of Modern Frontend Architecture</h2>
        <p className="featured-description">
          The evolution of modern frontend architecture and the most sustainable modern approaches and implementing patterns.
        </p>
        
        <div className="featured-author">
           <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Author" className="author-img" />
           <div className="author-info">
             <span className="author-name">Arthur Denatia</span>
             <span className="post-time">Published 7 hours ago</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
