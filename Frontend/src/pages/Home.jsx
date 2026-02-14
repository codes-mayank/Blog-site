// import React, { useState ,  useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import CategoryStrip from '../components/CategoryStrip';
// import FeaturedPost from '../components/FeaturedPost';
// import PostCard from '../components/PostCard';

// const Home = () => {
//   const [post, setPost] = useState([]);
//   const [page, setPage] = useState(1);
//   const [category, setCategory] = useState('All');
//   const [hasMore, setHasMore] = useState(true);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const LIMIT = 6;

//   const searchTerm = searchParams.get('search');

//   // Reset category if searching, or handle interaction. 
//   // For now, if search term exists, we might want to ignore category or filter within category. 
//   // Let's assume search overrides category for simplicity, or we filter within category if user selected one.
//   // The user requirement is 'search using the title', usually global search.
  
//   useEffect(() => {
//     // If there's a search term, we might want to reset category visual or keep it 'All'
//     // But let's build the URL dynamically
//     const offset = (page - 1) * LIMIT;
//     let url = `http://localhost:8000/posts/?limit=${LIMIT}&offset=${offset}`;
    
//     if (searchTerm) {
//         url += `&search=${encodeURIComponent(searchTerm)}`;
//     } else if (category !== 'All') {
//         url += `&tag=${category}`;
//     }
    
//     fetch(url)
//       .then(res => res.json())
//       .then(data => {
//         setPost(data);
//         if (data.length < LIMIT) {
//           setHasMore(false);
//         } else {
//           setHasMore(true);
//         }
//       })
//       .catch(error => console.error("Fetch error:", error));
//   }, [page, category, searchTerm]);
  
//   // When search changes, reset page (handled by effect dependency on page? No, need to reset page explicitly if search changes)
//   useEffect(() => {
//      setPage(1);
//      if (searchTerm) {
//          setCategory('All'); // Clear category selection on search
//      }
//   }, [searchTerm]);

//   const handleCategoryChange = (newCategory) => {
//     if (newCategory === category) return;
//     setCategory(newCategory);
//     setPage(1);
//   };

//   const handlePrevious = () => {
//     setPage(prev => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setPage(prev => prev + 1);
//   };

//   return (
//     <div className="max-w-[1600px] mx-auto pt-32 px-6 pb-8 min-h-screen">
//       <CategoryStrip activeCategory={category} onCategoryChange={handleCategoryChange} />
      
//       <div className="mt-8">
//         <FeaturedPost />
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//            {post.map(p => (
//              <div key={p.id}>
//                  <PostCard {...p} />
//              </div>
//            ))}
//         </div>

//         <div className="flex justify-center items-center gap-6 mt-8 pb-8">
//           <button 
//             onClick={handlePrevious} 
//             disabled={page === 1}
//             className="cursor-pointer px-6 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary font-medium transition-all duration-150 shadow-sm hover:not-disabled:border-accent-primary hover:not-disabled:text-accent-primary hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-primary"
//           >
//             Previous
//           </button>
//           <span className="text-[0.95rem] text-text-secondary font-medium min-w-[80px] text-center">Page {page}</span>
//           <button 
//             onClick={handleNext}
//             disabled={!hasMore || post.length === 0}
//             className="cursor-pointer px-6 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary font-medium transition-all duration-150 shadow-sm hover:not-disabled:border-accent-primary hover:not-disabled:text-accent-primary hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-primary"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryStrip from '../components/CategoryStrip';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const LIMIT = 6;

  const searchTerm = searchParams.get('search');

  // Fetch posts whenever page, category, or search changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const offset = (page - 1) * LIMIT;
      let url = `http://localhost:8000/posts/?limit=${LIMIT}&offset=${offset}`;
      
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      } else if (category !== 'All') {
        url += `&tag=${encodeURIComponent(category)}`;
      }
      
      try {
        const res = await fetch(url, {
          credentials: 'include', // Important: Include cookies for authentication
        });
        const data = await res.json();
        
        setPosts(data);
        setHasMore(data.length === LIMIT);
      } catch (error) {
        console.error("Fetch error:", error);
        setPosts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category, searchTerm]);
  
  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
    if (searchTerm) {
      setCategory('All'); // Clear category selection when searching
    }
  }, [searchTerm]);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    setCategory(newCategory);
    setPage(1);
    setSearchParams({}); // Clear search when changing category
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (hasMore && posts.length > 0) {
      setPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pt-32 px-6 pb-8 min-h-screen">
      <CategoryStrip 
        activeCategory={category} 
        onCategoryChange={handleCategoryChange} 
      />
      
      <div className="mt-8">
        {!searchTerm && <FeaturedPost />}
        
        {/* Search Results Header */}
        {searchTerm && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Search results for: <span className="text-accent-primary">"{searchTerm}"</span>
            </h2>
            <button
              onClick={() => setSearchParams({})}
              className="mt-2 text-sm text-accent-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-text-secondary">Loading posts...</div>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                {...post}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-text-secondary mb-4">
              {searchTerm 
                ? `No posts found for "${searchTerm}"` 
                : 'No posts available'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchParams({})}
                className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                View all posts
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && posts.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-8 pb-8">
            <button 
              onClick={handlePrevious} 
              disabled={page === 1}
              className="cursor-pointer px-6 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary font-medium transition-all duration-150 shadow-sm hover:not-disabled:border-accent-primary hover:not-disabled:text-accent-primary hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-primary"
            >
              Previous
            </button>
            <span className="text-[0.95rem] text-text-secondary font-medium min-w-[80px] text-center">
              Page {page}
            </span>
            <button 
              onClick={handleNext}
              disabled={!hasMore || posts.length === 0}
              className="cursor-pointer px-6 py-3 bg-bg-secondary border border-border-color rounded-lg text-text-primary font-medium transition-all duration-150 shadow-sm hover:not-disabled:border-accent-primary hover:not-disabled:text-accent-primary hover:not-disabled:-translate-y-px active:not-disabled:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-primary"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;