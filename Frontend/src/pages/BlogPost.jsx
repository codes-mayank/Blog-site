import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPost = () => {
    const { id } = useParams();

    // In a real app, fetch data based on ID
    const post = {
        title: 'The Future of AI in Software Engineering',
        date: 'Dec 18, 2024',
        content: `
      <p>Artificial Intelligence is reshaping the landscape of software engineering...</p>
      <p>From automated code generation to intelligent debugging, the possibilities are endless.</p>
    `,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
    };

    return (
        <>
            <Header />
            <main className="container page-transition" style={{ marginTop: '40px' }}>
                <article className="glass-panel" style={{ padding: '40px' }}>
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '32px' }}
                    />
                    <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: '1.2' }}>{post.title}</h1>
                    <div style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>Published on {post.date}</div>

                    <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </main>
            <Footer />
        </>
    );
};

export default BlogPost;
