import React from 'react';
import DefaultImg from '../assets/Default.jpg';

const FeaturedPost = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg mb-8 min-h-[360px] transition-shadow duration-300 hover:shadow-xl">
      <div className="min-h-[200px] md:min-h-auto relative">
        <img src={DefaultImg} alt="Featured Post" className="w-full h-full object-cover absolute inset-0" />
      </div>
      
      <div className="p-8 flex flex-col justify-center">
        <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">Featured</span>
        <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">The Evolution of Modern Frontend Architecture</h2>
        <p className="text-text-secondary leading-relaxed mb-6 text-lg">
          The evolution of modern frontend architecture and the most sustainable modern approaches and implementing patterns.
        </p>
        
        <div className="flex items-center gap-4">
           <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Author" className="w-12 h-12 rounded-full object-cover" />
           <div className="flex flex-col">
             <span className="font-semibold text-text-primary text-base">Arthur Denatia</span>
             <span className="text-sm text-text-secondary">Published 7 hours ago</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
