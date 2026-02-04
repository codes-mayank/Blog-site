import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.css';

const PostCard = ({ slug, title, created_at, tag, authorImg }) => {
  return (
    <Link to={`/posts/${slug}`} className="group bg-bg-secondary rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[180px] cursor-pointer border border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.25)] hover:border-accent-primary block no-underline">
      <div className={styles.innerContainer}>
        <h3 className="text-base font-medium text-text-primary mb-4 leading-snug">{title}</h3>
        
        <div className="flex items-center justify-between mt-auto">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-accent-secondary flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                {authorImg ? (
                    <img src={authorImg} alt="User" className="w-full h-full object-cover" />
                ) : (
                    title.charAt(0)
                )}
             </div>
             <span className="flex items-center gap-1 text-sm text-text-secondary font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(created_at).toLocaleDateString()}
             </span>
           </div>
           
           <span className="bg-[#eef2ff] text-accent-primary px-3 py-1 rounded-full text-xs font-semibold uppercase transition-colors group-hover:bg-accent-primary group-hover:text-white">{tag}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
