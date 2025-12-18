import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="featured-badge">Featured</span>
                    <h1 className="hero-title">
                        The Future of Remote Work: Trends and Insights for 2025
                    </h1>
                    <p className="hero-description">
                        Discover how the workplace is evolving and what it means for teams, productivity, and work-life balance in the coming years.
                    </p>

                    <div className="hero-meta">
                        <div className="meta-item">
                            <Calendar size={18} />
                            <span>Dec 15, 2024</span>
                        </div>
                        <div className="meta-item">
                            <Clock size={18} />
                            <span>8 min read</span>
                        </div>
                    </div>

                    <button className="btn btn-primary">
                        Read Article
                    </button>
                </motion.div>

                <motion.div
                    className="hero-image-wrapper"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1547082299-bb196bcc449c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Remote Work Workspace"
                        className="hero-image"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
