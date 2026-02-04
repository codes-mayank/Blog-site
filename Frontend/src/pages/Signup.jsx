import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Signup failed');
      }

      login(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border-color">
        <h1 className="text-3xl font-bold text-text-primary mb-2 text-center">Create Account</h1>
        <p className="text-text-secondary text-center mb-8">Join our community of writers today</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-transparent focus:bg-white focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/10 outline-none transition-all text-text-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-primary hover:bg-accent-hover text-white font-medium py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-text-secondary text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-primary font-medium hover:text-accent-hover transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
