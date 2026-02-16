import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/posts/${slug}`);
        if (!response.ok) {
           if (response.status === 404) {
             throw new Error('Blog post not found');
           }
           throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:8000/posts/${post.id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
           navigate('/');
        } else {
           alert('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const handleEdit = () => {
     navigate(`/edit/${post.slug}`, { state: { post } });
  };

  const calculateReadTime = (text) => {
    const wpm = 200;
    const words = text ? text.trim().split(/\s+/).length : 0;
    const time = Math.ceil(words / wpm);
    return `${time} min read`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg-primary">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border-color border-t-accent-primary rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent-primary font-bold text-xs">
            L
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
        <div className="text-center max-w-lg w-full bg-white p-10 rounded-2xl shadow-xl border border-border-color">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Unavailable</h2>
          <p className="text-text-secondary mb-8">{error}</p>
          <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-accent-primary hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
        {/* Progress Bar (Simulated) */}
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
             <div className="h-full bg-accent-primary w-full origin-left transform scale-x-0 animate-progress"></div>
        </div>

      <article className="max-w-5xl mx-auto pt-32 px-6">
        {/* Featured Photo */}
        {post.featured_photo && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-lg border border-border-color animate-fade-in-up">
            <img 
              src={post.featured_photo} 
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {/* Header Section - Title */}
        <header className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-text-primary leading-[1.1] tracking-tight">
              {post.title}
            </h1>
        </header>

        {/* Meta Section - Profile, Read Time, Date, Tag in One Row */}
        <div className="mb-12 flex flex-wrap items-center justify-center md:justify-start gap-4 animate-fade-in-up">
          {/* Author Profile - No Border */}
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-secondary to-accent-primary text-white flex items-center justify-center text-lg font-bold shadow-md mr-3">
              {post.author_fullname ? post.author_fullname.charAt(0) : 'A'}
            </div>
            <div className="text-left">
              <div className="font-bold text-text-primary text-base leading-tight">
                {post.author_fullname || post.author_username}
              </div>
            </div>
          </div>

          {/* Read Time - No Border */}
          <span className="flex items-center text-text-secondary text-base font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {calculateReadTime(post.body)}
          </span>

          {/* Date of Upload - No Border */}
          <span className="text-text-secondary text-base font-medium">
            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>

          {/* Tag - With Rounded Box */}
          {post.tag && (
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-base font-bold shadow-md">
              {post.tag}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 mb-12 max-w-full overflow-hidden">
            <div 
              className="prose prose-lg max-w-none text-text-primary leading-relaxed break-words"
              dangerouslySetInnerHTML={{__html: post.body}}
              style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                fontSize: '1.3rem',
              }}
            >
            </div>
            
            <div className="mt-12 pt-8 border-t border-border-color flex items-center justify-end">
                <div className="flex items-center gap-4">
                  {user && user.id === post.author_id && (
                    <div className="flex items-center gap-3 mr-4">
                      <button 
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="text-text-secondary text-sm italic">
                      Thanks for reading
                  </div>
                </div>
            </div>
        </div>

        {/* Footer / Author Bio */}
        <div className="bg-gradient-to-br from-[#f8f9fa] to-[#eef2ff] -2xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md flex-shrink-0">
                <div className="w-full h-full rounded-full bg-accent-secondary flex items-center justify-center text-white text-5xl font-bold">
                    {post.author_fullname ? post.author_fullname.charAt(0) : 'A'}
                </div>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Written by {post.author_fullname || post.author_username}</h3>
                <p className="text-text-secondary mb-4 max-w-xl text-lg">
                    Passionate writer and contributor. Sharing insights on {post.tag || 'various topics'}. 
                    Follow for more updates and stories regarding technology and life.
                </p>
                <div className="flex justify-center md:justify-start gap-3">
                   {/* <button className="px-4 py-2 bg-text-primary text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">Follow</button>
                   <Link to="/" className="px-4 py-2 bg-white border border-border-color text-text-secondary text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">View all posts</Link> */}
                </div>
            </div>
        </div>

      </article>
    </div>
  );
};

export default BlogPost;
