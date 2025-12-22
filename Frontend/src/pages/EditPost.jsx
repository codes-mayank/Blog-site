import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const EditPost = () => {
    const { slug } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postId, setPostId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${slug}`);
                const post = response.data;
                setTitle(post.title);
                setBody(post.body);
                setPostId(post.id);

                // Check authorization
                if (user && user.id !== post.author_id) {
                    setError("You are not authorized to edit this post.");
                }
            } catch (err) {
                setError('Failed to fetch post details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPost();
        } else {
            // Let the useEffect below handle redirect
            setLoading(false);
        }
    }, [slug, user]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/posts/${postId}`, { title, body });
            navigate(`/post/${slug}`);
        } catch (err) {
            setError('Failed to update post.');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) return (
        <>
            <Header />
            <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'red' }}>
                <h3>{error}</h3>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Header />
            <main className="page-transition">
                <div className="container" style={{ maxWidth: '800px', padding: '60px 24px' }}>
                    <h1 className="section-title">Edit Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ fontSize: '1.2rem', padding: '16px' }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="body">Content</label>
                            <textarea
                                id="body"
                                className="form-input"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                                style={{ minHeight: '400px', resize: 'vertical' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/post/${slug}`)}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Update Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default EditPost;
