import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PenSquare, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={{ color: 'var(--color-text-muted)', display: 'flex' }} aria-label="Search">
            <Search size={20} />
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/create" className="btn btn-primary" style={{ padding: '8px 16px', gap: '8px' }}>
                <PenSquare size={18} /> Write
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
                <User size={18} />
                {user.username}
              </div>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', border: 'none' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link to="/login" className="btn btn-secondary" style={{ border: 'none' }}>Log in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
