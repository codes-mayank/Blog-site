import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import RichTextEditor from '../components/RichTextEditor';

const categories = [
  'Engineering',
  'Productivity',
  'Modern',
  'Dreaming',
  'Guide',
  'Design',
  'Other'
];

const WriteBlog = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation();
  const { user, loading: authLoading } = useUser();
  const imageRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    featured_photo: '',
    body: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(null);

  const isEditMode = !!slug;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // useEffect(()=>{
  //   if(image === "") return;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);
  //   reader.onload = () =>{
  //     setFormData({
  //     ...formData,
  //     featured_photo: reader.result
  //   });
  //   };
  //   reader.onerror = (error) =>{
  //     console.error("Error: ", error);
  //   }
  // }, [image])

  useEffect(() => {
    if (isEditMode) {
      // Check if post data was passed via state
      if (location.state && location.state.post) {
        const post = location.state.post;
        setFormData({
          title: post.title,
          tag: post.tag || '',
          body: post.body
        });
        setPostId(post.id);
      } else {
        // Fetch post if not in state
        const fetchPost = async () => {
          try {
             setLoading(true);
             const response = await fetch(`http://localhost:8000/posts/${slug}`);
             if (!response.ok) throw new Error('Failed to fetch post');
             const data = await response.json();
             setFormData({
               title: data.title,
               tag: data.tag || '',
               body: data.body
             });
             setPostId(data.id);
             
             // Verify ownership
             if (user && data.author_id !== user.id) {
                 navigate('/'); // Not authorized
             }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchPost();
      }
    }
  }, [isEditMode, slug, location.state, user, navigate]);

  if (authLoading) {
    return <div className="min-h-screen pt-36 px-6 flex justify-center">Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlogBodyChange = (value) => {
    setFormData({
      ...formData,
      body: value
    });
  };

  // const handleImageChange = (e) =>{
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   console.log(file);
  //   console.log(reader);
  //   reader.readAsDataURL(file);
  //   reader.onload = () =>{
  //     setFormData({
  //     ...formData,
  //     featured_photo: reader.result
  //   });
  //   };
  //   reader.onerror = (error) =>{
  //     console.error("Error: ", error);
  //   }
  // }

  // const convertIntoBase64 = (file) =>{
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () =>{
  //     return reader.result;
  //   };
  //   reader.onerror = (error) =>{
  //     console.error("Error: ", error);
  //     return null;
  //   }
  // }

  const convertIntoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.featured_photo = await convertIntoBase64(imageRef.current.files[0]);
    setLoading(true);
    setError(null);

    const url = isEditMode 
        ? `http://localhost:8000/posts/${postId}`
        : 'http://localhost:8000/posts/';
    
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} post`);
      }

      const data = await response.json();
      // On update, backend returns the updated blog object. 
      // If slug changed, we should use the new slug. 
      // Backend update does not change slug usually unless title changes and logic updates slug?
      // Backend create_slug is used in create_blogs. update_blog logic:
      // update_stmt = values(title=blog.title...). It does NOT update slug. 
      // So slug remains same even if title changes.
      
      const redirectSlug = isEditMode ? slug : data.slug;
      navigate(`/posts/${redirectSlug}`); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto pt-36 px-6 pb-8 min-h-screen">
      <div className="bg-bg-secondary rounded-2xl shadow-sm p-8 border border-border-color">
        <h1 className="text-3xl font-bold text-text-primary mb-8 tracking-tight">
          {isEditMode ? 'Edit Story' : 'Write a New Story'}
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
              placeholder="Enter your title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-3">Tag (Category)</label>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFormData({ ...formData, tag: category })}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    formData.tag === category
                      ? 'bg-accent-primary text-white shadow-md'
                      : 'bg-bg-primary border border-border-color text-text-primary hover:border-accent-primary hover:bg-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="featured_photo" className="block text-sm font-medium text-text-secondary mb-2">Featured Photo</label>
              <input
                type="file"
                id="featured_photo"
                name="featured_photo"
                required
                ref={imageRef}
                // onChange={(e)=>{
                //   setImage(e.target.files[0]);
                // }}
                className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary placeholder:text-text-secondary/50"
                // placeholder="Upload your featured photo"
              />
            </div>
          </div>

          <RichTextEditor value={formData.body} onChange={handleBlogBodyChange} />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent-primary hover:bg-accent-hover text-white font-medium px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? 'Updating...' : 'Publishing...'}
                </>
              ) : (
                isEditMode ? 'Update Story' : 'Publish Story'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
