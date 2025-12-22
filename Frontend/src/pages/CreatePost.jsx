import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/posts/', { title, body });
            navigate('/');
        } catch (err) {
            setError('Failed to create post.');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <main className="page-transition">
                <div className="container" style={{ maxWidth: '800px', padding: '60px 24px' }}>
                    <h1 className="section-title">Write a New Post</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a captivating title..."
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
                                placeholder="Write your story..."
                                required
                                style={{ minHeight: '400px', resize: 'vertical' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Publish Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CreatePost;
