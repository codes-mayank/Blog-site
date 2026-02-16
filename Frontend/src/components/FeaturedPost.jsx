// import React from 'react';
// import DefaultImg from '../assets/Default.jpg';

// const FeaturedPost = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg mb-8 min-h-[360px] transition-shadow duration-300 hover:shadow-xl">
//       <div className="min-h-[200px] md:min-h-auto relative">
//         <img src={DefaultImg} alt="Featured Post" className="w-full h-full object-cover absolute inset-0" />
//       </div>
      
//       <div className="p-8 flex flex-col justify-center">
//         <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">Featured</span>
//         <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">The Evolution of Modern Frontend Architecture</h2>
//         <p className="text-text-secondary leading-relaxed mb-6 text-lg">
//           The evolution of modern frontend architecture and the most sustainable modern approaches and implementing patterns.
//         </p>
        
//         <div className="flex items-center gap-4">
//            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Author" className="w-12 h-12 rounded-full object-cover" />
//            <div className="flex flex-col">
//              <span className="font-semibold text-text-primary text-base">Arthur Denatia</span>
//              <span className="text-sm text-text-secondary">Published 7 hours ago</span>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedPost;


// import React, { useState, useEffect } from 'react';
// import DefaultImg from '../assets/Default.jpg';

// const FeaturedPost = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Sample featured posts data
//   const featuredPosts = [
//     {
//       id: 1,
//       image: DefaultImg,
//       title: "The Evolution of Modern Frontend Architecture",
//       excerpt: "The evolution of modern frontend architecture and the most sustainable modern approaches and implementing patterns.",
//       author: "Arthur Denatia",
//       authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "7 hours ago"
//     },
//     {
//       id: 2,
//       image: DefaultImg,
//       title: "Building Scalable Web Applications with React",
//       excerpt: "Learn how to build scalable and maintainable web applications using React and modern tooling.",
//       author: "Sarah Johnson",
//       authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "12 hours ago"
//     },
//     {
//       id: 3,
//       image: DefaultImg,
//       title: "The Future of Web Development in 2025",
//       excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
//       author: "Mike Chen",
//       authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "1 day ago"
//     }
//   ];

//   // Auto-advance carousel every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [featuredPosts.length]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const currentPost = featuredPosts[currentIndex];

//   return (
//     <div className="relative mb-8">
//       <div className="cursor-pointer grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px] transition-shadow duration-300 hover:shadow-xl">
//         <div className="min-h-[200px] md:min-h-auto relative">
//           <img 
//             src={currentPost.image} 
//             alt="Featured Post" 
//             className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500" 
//           />
//         </div>
        
//         <div className="p-8 flex flex-col justify-center">
//           <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">Featured</span>
//           <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">
//             {currentPost.title}
//           </h2>
//           <p className="text-text-secondary leading-relaxed mb-6 text-lg">
//             {currentPost.excerpt}
//           </p>
//           <div className="flex items-center gap-4">
//             <img 
//               src={currentPost.authorImage} 
//               alt="Author" 
//               className="w-12 h-12 rounded-full object-cover" 
//             />
//             <div className="flex flex-col">
//               <span className="font-semibold text-text-primary text-base">{currentPost.author}</span>
//               <span className="text-sm text-text-secondary">Published {currentPost.timeAgo}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={goToPrevious}
//         className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
//         aria-label="Previous slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={goToNext}
//         className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
//         aria-label="Next slide"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Dots Indicator */}
//       <div className="flex justify-center gap-2 mt-4">
//         {featuredPosts.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-300 ${
//               index === currentIndex 
//                 ? 'bg-accent-primary w-8' 
//                 : 'bg-gray-300 hover:bg-gray-400'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedPost;


// import React, { useState, useEffect } from 'react';
// import DefaultImg from '../assets/Default.jpg';

// const FeaturedPost = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Sample featured posts data
//   const featuredPosts = [
//     {
//       id: 1,
//       image: DefaultImg,
//       title: "The Evolution of Modern Frontend Architecture",
//       excerpt: "The evolution of modern frontend architecture and the most sustainable modern approaches and implementing patterns.",
//       author: "Arthur Denatia",
//       authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "7 hours ago"
//     },
//     {
//       id: 2,
//       image: DefaultImg,
//       title: "Building Scalable Web Applications with React",
//       excerpt: "Learn how to build scalable and maintainable web applications using React and modern tooling.",
//       author: "Sarah Johnson",
//       authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "12 hours ago"
//     },
//     {
//       id: 3,
//       image: DefaultImg,
//       title: "The Future of Web Development in 2025",
//       excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
//       author: "Mike Chen",
//       authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//       timeAgo: "1 day ago"
//     }
//   ];

//   // Auto-advance carousel every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [featuredPosts.length]);

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   const goToNext = () => {
//   setCurrentIndex((prev) => prev + 1);
// };

// const goToPrevious = () => {
//   setCurrentIndex((prev) =>
//     prev === 0 ? featuredPosts.length - 1 : prev - 1
//   );
// };


//   const currentPost = featuredPosts[currentIndex];


//   return (
//     <div className="relative mb-8 overflow-hidden">

//   <div
//     className="flex transition-transform duration-700 ease-in-out"
//     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//   >
//     {[...featuredPosts, featuredPosts[0]].map((post, index) => (
//       <div key={index} className="min-w-full">
//         <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">

//           {/* Image */}
//           <div className="relative min-h-[200px] md:min-h-auto">
//             <img
//               src={post.image}
//               alt={post.title}
//               className="w-full h-full object-cover absolute inset-0"
//             />
//           </div>

//           {/* Content */}
//           <div className="p-8 flex flex-col justify-center">
//             <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">
//               Featured
//             </span>

//             <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">
//               {post.title}
//             </h2>

//             <p className="text-text-secondary leading-relaxed mb-6 text-lg">
//               {post.excerpt}
//             </p>

//             <div className="flex items-center gap-4">
//               <img
//                 src={post.authorImage}
//                 alt={post.author}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div className="flex flex-col">
//                 <span className="font-semibold text-text-primary text-base">
//                   {post.author}
//                 </span>
//                 <span className="text-sm text-text-secondary">
//                   Published {post.timeAgo}
//                 </span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     ))}
//   </div>

//   {/* Previous Button */}
//   <button
//     onClick={goToPrevious}
//     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10"
//   >
//     ‹
//   </button>

//   {/* Next Button */}
//   <button
//     onClick={goToNext}
//     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10"
//   >
//     ›
//   </button>

//   {/* Dots */}
//   <div className="flex justify-center gap-2 mt-6">
//     {featuredPosts.map((_, index) => (
//       <button
//         key={index}
//         onClick={() => setCurrentIndex(index)}
//         className={`h-3 rounded-full transition-all duration-300 ${
//           currentIndex === index
//             ? "bg-accent-primary w-8"
//             : "bg-gray-300 w-3"
//         }`}
//       />
//     ))}
//   </div>

// </div>

//   );
// };

// export default FeaturedPost;



import React, { useState, useEffect } from "react";
import DefaultImg from "../assets/Default.jpg";

const FeaturedPost = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured posts from API
  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/featured", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transform API response to match component structure
        const transformedPosts = data.map((post) => ({
          id: post.id,
          slug: post.slug,
          image: post.featured_photo || DefaultImg,
          title: post.title,
          excerpt: extractExcerpt(post.body, 30),
          author: post.author_fullname,
          authorImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            post.author_fullname
          )}&background=random`,
          timeAgo: formatTimeAgo(post.created_at),
          likes_count: post.likes_count,
          is_liked: post.is_liked,
        }));

        setFeaturedPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching featured posts:", err);
        setError("Failed to load featured posts");
        setFeaturedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  // Format time ago helper function
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return "just now";
  };

  // Extract plain text from HTML and limit to word count
  const extractExcerpt = (htmlContent, wordLimit = 30) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    const words = plainText.trim().split(/\s+/);
    const excerpt = words.slice(0, wordLimit).join(" ");
    return excerpt + (words.length > wordLimit ? "..." : "");
  };

  // Auto Slide
  useEffect(() => {
    if (featuredPosts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts.length]);

  // Infinite loop handling
  useEffect(() => {
    if (featuredPosts.length === 0) return;

    if (currentIndex === featuredPosts.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // must match duration
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, featuredPosts.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(featuredPosts.length - 1);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative mb-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px] animate-pulse">
          <div className="bg-gray-300"></div>
          <div className="p-8 flex flex-col justify-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative mb-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
          <div className="col-span-full p-8 flex items-center justify-center">
            <p className="text-text-secondary text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No posts state
  if (featuredPosts.length === 0) {
    return (
      <div className="relative mb-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
          <div className="col-span-full p-8 flex items-center justify-center">
            <p className="text-text-secondary text-lg">No featured posts available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Slides Wrapper */}
      <div
        className={`flex ${
          isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {[...featuredPosts, featuredPosts[0]].map((post, index) => (
          <div key={index} className="min-w-full">
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
              {/* Image */}
              <div className="relative min-h-[200px] md:min-h-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Like count badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
                  <svg
                    className={`w-5 h-5 ${
                      post.is_liked
                        ? "fill-red-500 text-red-500"
                        : "fill-none text-gray-600"
                    }`}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="font-semibold text-gray-700">
                    {post.likes_count}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">
                  Featured
                </span>

                <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">
                  {post.title}
                </h2>

                <p className="text-text-secondary leading-relaxed mb-6 text-lg line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-text-primary text-base">
                      {post.author}
                    </span>
                    <span className="text-sm text-text-secondary">
                      Published {post.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      {featuredPosts.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors"
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}

      {/* Next Button */}
      {featuredPosts.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors"
          aria-label="Next slide"
        >
          ›
        </button>
      )}

      {/* Dots */}
      {featuredPosts.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {featuredPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex % featuredPosts.length === index
                  ? "bg-accent-primary w-8"
                  : "bg-gray-300 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPost;


// import React, { useState, useEffect } from "react";
// import DefaultImg from "../assets/Default.jpg";

// const FeaturedPost = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const [featuredPosts, setFeaturedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch featured posts from API
//   useEffect(() => {
//     const fetchFeaturedPosts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:8000/posts/featured?limit=3", {
//           method: "GET",
//           credentials: "include", // Include cookies for authentication
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         // Transform API response to match component structure
//         const transformedPosts = data.map((post) => ({
//           id: post.id,
//           slug: post.slug,
//           image: post.featured_photo || DefaultImg,
//           title: post.title,
//           excerpt: post.body.substring(0, 150) + "...", // First 150 chars
//           author: post.author_fullname,
//           authorImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_fullname)}&background=random`, // Placeholder avatar
//           timeAgo: formatTimeAgo(post.created_at),
//           likeCount: post.like_count,
//           isLiked: post.is_liked,
//         }));
        
//         setFeaturedPosts(transformedPosts);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching featured posts:", err);
//         setError("Failed to load featured posts");
//         // Fallback to empty array
//         setFeaturedPosts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedPosts();
//   }, []);

//   // Format time ago helper function
//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const seconds = Math.floor((now - date) / 1000);
    
//     const intervals = {
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//     };
    
//     for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//       const interval = Math.floor(seconds / secondsInUnit);
//       if (interval >= 1) {
//         return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
//       }
//     }
    
//     return "just now";
//   };

//   // Auto Slide
//   useEffect(() => {
//     if (featuredPosts.length === 0) return;
    
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => prev + 1);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, [featuredPosts.length]);

//   // Infinite loop handling
//   useEffect(() => {
//     if (featuredPosts.length === 0) return;
    
//     if (currentIndex === featuredPosts.length) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(0);
//       }, 700);
//     } else {
//       setIsTransitioning(true);
//     }
//   }, [currentIndex, featuredPosts.length]);

//   const goToNext = () => {
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const goToPrevious = () => {
//     if (currentIndex === 0) {
//       setIsTransitioning(false);
//       setCurrentIndex(featuredPosts.length - 1);
//     } else {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="relative mb-8 overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px] animate-pulse">
//           <div className="bg-gray-300"></div>
//           <div className="p-8 flex flex-col justify-center gap-4">
//             <div className="h-4 bg-gray-300 rounded w-20"></div>
//             <div className="h-8 bg-gray-300 rounded w-3/4"></div>
//             <div className="h-4 bg-gray-300 rounded w-full"></div>
//             <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="relative mb-8 overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
//           <div className="col-span-full p-8 flex items-center justify-center">
//             <p className="text-text-secondary text-lg">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No posts state
//   if (featuredPosts.length === 0) {
//     return (
//       <div className="relative mb-8 overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
//           <div className="col-span-full p-8 flex items-center justify-center">
//             <p className="text-text-secondary text-lg">No featured posts available</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative mb-8 overflow-hidden">
//       {/* Slides Wrapper */}
//       <div
//         className={`flex ${
//           isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
//         }`}
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {[...featuredPosts, featuredPosts[0]].map((post, index) => (
//           <div key={index} className="min-w-full">
//             <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] bg-bg-secondary rounded-2xl overflow-hidden shadow-lg min-h-[360px]">
//               {/* Image */}
//               <div className="relative min-h-[200px] md:min-h-auto">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-full object-cover absolute inset-0"
//                 />
//                 {/* Like count badge */}
//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
//                   <svg
//                     className={`w-5 h-5 ${post.isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'}`}
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//                   </svg>
//                   <span className="font-semibold text-gray-700">{post.likeCount}</span>
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-8 flex flex-col justify-center">
//                 <span className="text-accent-primary font-semibold text-sm mb-2 inline-block">
//                   Featured
//                 </span>

//                 <h2 className="text-3xl font-semibold leading-tight mb-4 text-text-primary tracking-tight">
//                   {post.title}
//                 </h2>

//                 <p className="text-text-secondary leading-relaxed mb-6 text-lg line-clamp-3">
//                   {post.excerpt}
//                 </p>

//                 <div className="flex items-center gap-4">
//                   <img
//                     src={post.authorImage}
//                     alt={post.author}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-text-primary text-base">
//                       {post.author}
//                     </span>
//                     <span className="text-sm text-text-secondary">
//                       Published {post.timeAgo}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Previous Button */}
//       {featuredPosts.length > 1 && (
//         <button
//           onClick={goToPrevious}
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors"
//           aria-label="Previous slide"
//         >
//           ‹
//         </button>
//       )}

//       {/* Next Button */}
//       {featuredPosts.length > 1 && (
//         <button
//           onClick={goToNext}
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-colors"
//           aria-label="Next slide"
//         >
//           ›
//         </button>
//       )}

//       {/* Dots */}
//       {featuredPosts.length > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           {featuredPosts.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`h-3 rounded-full transition-all duration-300 ${
//                 currentIndex % featuredPosts.length === index
//                   ? "bg-accent-primary w-8"
//                   : "bg-gray-300 w-3"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeaturedPost;