import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Calendar, Clock, Edit, Trash2 } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/posts/${slug}`);
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Post not found");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            try {
                await api.delete(`/posts/${post.id}`);
                navigate('/');
            } catch (err) {
                console.error("Failed to delete post:", err);
                alert("Failed to delete post.");
            }
        }
    };

    if (loading) return (
        <>
            <Header />
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Loading...</div>
            <Footer />
        </>
    );

    if (error || !post) return (
        <>
            <Header />
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <h2>{error || "Post not found"}</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px' }}>Go Home</Link>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Header />
            <main className="page-transition">
                <article className="container" style={{ maxWidth: '800px', padding: '60px 24px' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: 'var(--color-text-muted)' }}>
                        <ArrowLeft size={20} /> Back to Home
                    </Link>

                    <header style={{ marginBottom: '40px' }}>
                        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                            <span className="featured-badge" style={{ margin: 0 }}>Development</span>
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '24px' }}>
                            {post.title}
                        </h1>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                <span className="meta-item">
                                    <User size={16} /> {post.author_fullname || post.author_username || 'Anonymous'}
                                </span>
                                <span className="meta-item">
                                    <Calendar size={16} /> {new Date(post.created_at).toLocaleDateString()}
                                </span>
                                <span className="meta-item">
                                    <Clock size={16} /> 5 min read
                                </span>
                            </div>

                            {user && user.id === post.author_id && (
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <Link to={`/edit/${slug}`} className="btn btn-secondary" style={{ padding: '8px 16px', gap: '8px' }}>
                                        <Edit size={16} /> Edit
                                    </Link>
                                    <button onClick={handleDelete} className="btn" style={{ padding: '8px 16px', gap: '8px', color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: '8px' }}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </header>

                    <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', aspectRatio: '16/9', background: '#e5e7eb' }}>
                        <img
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--color-text)' }}>
                        {post.body.split('\n').map((paragraph, idx) => (
                            <p key={idx} style={{ marginBottom: '24px' }}>{paragraph}</p>
                        ))}
                    </div>

                </article>
            </main>
            <Footer />
        </>
    );
};

export default BlogPost;
