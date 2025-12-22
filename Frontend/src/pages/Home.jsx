import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import api from '../services/api';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/');
            const data = response.data;

            // Transform API data to match BlogCard props
            const formattedPosts = data.map(post => ({
                id: post.id,
                slug: post.slug,
                title: post.title,
                excerpt: post.body ? post.body.substring(0, 120) + '...' : 'No content available',
                date: new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                readTime: '5 min read', // Placeholder logic
                category: 'Development', // Placeholder
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
            }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <main className="page-transition">
                <Hero />

                <section className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h2 className="section-title" style={{ fontSize: '2rem' }}>Latest Articles</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {/* Filters could go here */}
                        </div>
                    </div>

                    <div className="blog-grid">
                        {loading ? (
                            <p>Loading articles...</p>
                        ) : posts.length > 0 ? (
                            posts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                                <p>No posts found.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
