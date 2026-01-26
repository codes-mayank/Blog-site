import React, { useEffect } from 'react';
import CategoryStrip from '../components/CategoryStrip';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';
import './Home.css';



const posts = [
  {
    id: 1,
    title: 'Understanding Asynchronous JavaScript',
    time: '13 min',
    tag: 'JS',
    authorImg: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    title: 'Mastering Tailwind CSS Grids',
    time: '14 min',
    tag: 'CSS',
    authorImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    title: 'Find C++ and Anverocing to an e quitt-note',
    time: '14 min',
    tag: 'CSS',
    authorImg: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    title: 'How to Endure Your ethnu Guide',
    time: '12 min',
    tag: 'JS',
    authorImg: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 5,
    title: 'Mastering Tailwind CSS Grids',
    time: '14 min',
    tag: 'CSS',
    authorImg: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 6,
    title: 'User Frenzide Design in Modern Apps',
    time: '14 min',
    tag: 'JS',
    authorImg: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const Home = () => {
  useEffect(() => {
    fetch('http://localhost:8000/posts/')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error("Fetch error:", error));
  }, [])

  return (
    <div className="home-container">
      <CategoryStrip />
      
      <div className="content-wrapper">
        <FeaturedPost />
        
        <div className="posts-grid">
           {posts.map(post => (
             <div key={post.id} className={''}>
                 <PostCard {...post} />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
