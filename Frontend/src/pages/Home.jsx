import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/posts/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Transform API data to match BlogCard props
            const formattedPosts = data.map(post => ({
                id: post.id,
                title: post.title,
                excerpt: post.body ? post.body.substring(0, 120) + '...' : 'No content available',
                date: 'Dec 18, 2024', // Placeholder as API doesn't return date yet
                readTime: '5 min read',
                category: 'Development',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
            }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('Failed to fetch posts. Ensure backend is running.');
        }
    };

    return (
        <>
            <Header />
            <main className="page-transition">
                <Hero />

                <section className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h2 className="section-title" style={{ fontSize: '2rem' }}>Latest Articles</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="btn btn-primary"
                                onClick={fetchPosts}
                            >
                                Load Blogs
                            </button>
                            <button className="btn btn-secondary">View All</button>
                        </div>
                    </div>

                    <div className="blog-grid">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                                <p>Click "Load Blogs" to view the latest posts.</p>
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
