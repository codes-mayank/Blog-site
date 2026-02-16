import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[1600px] z-50">
      <div className="bg-bg-secondary/80 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between gap-6 hover:shadow-xl transition-all duration-300">
        <Link to="/" onClick={() => setSearchQuery('')} className="text-2xl font-extrabold text-text-primary tracking-tighter flex items-baseline no-underline shrink-0">
          DevBlog<span className="text-accent-primary text-4xl leading-none ml-[2px]">.</span>
        </Link>

        <div className="flex-1 max-w-[600px] relative hidden md:block">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none opacity-60" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full py-2.5 px-5 bg-bg-primary border border-transparent rounded-full text-text-primary text-[0.95rem] transition-all duration-300 placeholder:text-text-secondary/70 focus:outline-none focus:bg-white focus:border-accent-primary focus:shadow-[0_0_0_4px_rgba(79,70,229,0.1)]"
          />
        </div>

        <div className="flex items-center gap-6 shrink-0">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-6 mr-2">
               <Link to="/write" className="font-medium text-text-secondary transition-colors duration-200 text-[0.95rem] hover:text-text-primary no-underline">Write</Link>
              </div>
              
              <div className="h-6 w-px bg-border-color hidden md:block"></div>

              <div className="flex items-center gap-3">
                <button onClick={logout} className="flex items-center justify-center w-10 h-10 rounded-full text-text-secondary bg-transparent transition-all hover:bg-bg-primary hover:text-red-500 cursor-pointer active:scale-95" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l-3-3m3 3H2.25" />
                  </svg>
                </button>

                <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white ring-2 ring-transparent transition-all hover:ring-accent-primary/20 cursor-pointer shadow-sm">
                   <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || user.email)}&background=random&color=fff`} alt="User" className="w-full h-full object-cover" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
                 <Link to="/login" className="px-5 py-2.5 rounded-full text-text-secondary font-medium hover:text-text-primary hover:bg-bg-primary transition-all text-[0.95rem] no-underline">
                  Log in
                </Link>
                <Link to="/signup" className="px-6 py-2.5 rounded-full bg-accent-primary text-white font-medium hover:bg-accent-hover transition-all shadow-md hover:shadow-lg text-[0.95rem] no-underline">
                  Sign up
                </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
