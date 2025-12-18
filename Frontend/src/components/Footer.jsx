import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>DevBlog</h3>
                    <p>Building the web, one component at a time.</p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Content</h4>
                        <a href="#">Tutorials</a>
                        <a href="#">Articles</a>
                        <a href="#">Snippets</a>
                    </div>
                    <div className="link-group">
                        <h4>Community</h4>
                        <a href="#">Discord</a>
                        <a href="#">Twitter</a>
                        <a href="#">Newsletter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2024 DevBlog. All rights reserved.</p>
                    <div className="social-icons">
                        <a href="#"><Github size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
