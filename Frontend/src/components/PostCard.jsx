import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ slug, title, created_at, tag, author_fullname, author_username, body, image }) => {
  
  // Calculate relative time
  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.max(0, Math.floor((now - date) / 1000));
    
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const timeAgo = getTimeAgo(created_at);

  // Generate excerpt from body (strip markdown/html if any effectively by taking text)
  // Assuming body is plain text or simple markdown.
  const getExcerpt = (text) => {
      if (!text) return "No description available.";
      // Simple strip of markdown chars like #, *, etc for cleaner view
      const cleanText = text.replace(/[#*`_]/g, '');
      return cleanText.length > 100 ? cleanText.substring(0, 100) + "..." : cleanText;
  };

  const excerpt = getExcerpt(body);

  // Use a placeholder image if none provided.
  // Using a consistent nature-themed image as visually similar to the prompt example
  const displayImage = image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <Link to={`/posts/${slug}`} className="block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
      {/* Title */}
      <h3 className="text-xl leading-snug text-text-primary font-serif font-bold mb-4 group-hover:text-accent-primary transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Main Content Area: Image + Excerpt */}
      {/* Main Content Area: Image + Excerpt */}
      <div className="flex flex-row gap-4 mb-4 flex-1">
        {/* Image */}
        <div className="w-28 h-28 rounded-lg overflow-hidden shrink-0 shadow-sm grow-0">
          <img 
            src={displayImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        {/* Excerpt Box */}
        <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white flex flex-col justify-start h-28 overflow-hidden">
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
             {excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
         {/* User Info */}
         <div className="flex items-center gap-2 pt-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
               <img 
                 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author_username || 'User')}&background=random&color=fff&size=128`} 
                 alt="Author" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-text-primary text-xs">
                   {author_username || "Unknown"}
                </span>
                <span className="text-text-secondary text-[10px] leading-none">
                    {timeAgo}
                </span>
            </div>
         </div>

         {/* Tag */}
         <div className="flex items-center gap-2 mt-2">
            <div className="px-3 py-1 rounded-md border border-accent-secondary/30 text-accent-primary font-bold text-xs bg-accent-secondary/5">
                {tag}
            </div>
            <div className="text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
         </div>
      </div>
    </Link>
  );
};

export default PostCard;
