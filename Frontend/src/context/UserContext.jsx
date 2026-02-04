import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Optimistically load from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        // Verify with backend
        const response = await fetch('http://localhost:8000/auth/me', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // If verification fails, clear auth
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth verification failed', error);
        // Don't clear user on network error, keep optimistic state or handle gracefully
        // For now, doing nothing assumes optimistic state might be valid
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
        await fetch('http://localhost:8000/auth/logout', { method: 'POST' });
    } catch (error) {
        console.error('Logout failed', error);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
