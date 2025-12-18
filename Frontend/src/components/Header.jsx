import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          The Daily Blog
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/articles" className="nav-link">Articles</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={{ color: 'var(--color-text-muted)', display: 'flex' }} aria-label="Search">
            <Search size={20} />
          </button>
          <button className="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
