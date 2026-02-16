// import React from 'react';
// import { Link } from 'react-router-dom';

// const InfoSection = () => {
//   return (
//     <footer className="bg-gradient-to-br from-black via-blue-950 to-black text-gray-100 border-t border-blue-800/40">
      
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
//           {/* About */}
//           <div className="space-y-5">
//             <h3 className="text-2xl font-bold text-white">DevBlog</h3>
//             <p className="text-lg text-gray-300 leading-relaxed">
//               A modern platform for developers and tech enthusiasts to share
//               tutorials, ideas, and knowledge. Join our growing tech community.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-5">
//             <h3 className="text-xl font-semibold text-white">Quick Links</h3>
//             <ul className="space-y-3 text-lg">
//               <li>
//                 <Link to="/" className="hover:text-blue-400 transition">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/write" className="hover:text-blue-400 transition">
//                   Write a Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="hover:text-blue-400 transition">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-blue-400 transition">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Categories */}
//           <div className="space-y-5">
//             <h3 className="text-xl font-semibold text-white">Categories</h3>
//             <ul className="space-y-3 text-lg">
//               <li className="hover:text-blue-400 transition cursor-pointer">Web Development</li>
//               <li className="hover:text-blue-400 transition cursor-pointer">Programming</li>
//               <li className="hover:text-blue-400 transition cursor-pointer">DevOps</li>
//               <li className="hover:text-blue-400 transition cursor-pointer">Data Science</li>
//               <li className="hover:text-blue-400 transition cursor-pointer">Cloud Computing</li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="space-y-5">
//             <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
//             <p className="text-lg text-gray-300">
//               Subscribe to receive the latest tech articles.
//             </p>
//             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-black border border-blue-700 rounded-lg text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-blue-900/40"></div>

//       {/* Bottom Section */}
//       <div className="max-w-7xl mx-auto px-8 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-lg">
          
//           <div className="text-center md:text-left space-y-2">
//             <div>© {new Date().getFullYear()} DevBlog. All rights reserved.</div>
//             <div className="text-blue-400 font-semibold">
//               Designed & Developed by Mayank Agrawal
//             </div>
//             <div className="text-gray-300">
//               Made with <span className="text-red-500">❤️</span> and lots of <span className="text-blue-400">☕</span>
//             </div>
//           </div>

//           <div className="flex gap-6">
//             <Link to="/privacy" className="hover:text-blue-400 transition">
//               Privacy Policy
//             </Link>
//             <Link to="/terms" className="hover:text-blue-400 transition">
//               Terms of Service
//             </Link>
//             <Link to="/cookies" className="hover:text-blue-400 transition">
//               Cookie Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default InfoSection;

import React from "react";

const InfoSection = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-blue-900/40">
      
      <div className="max-w-5xl mx-auto px-6 py-20 text-center space-y-10">
        
        {/* Brand */}
        <h2 className="text-4xl font-extrabold text-white tracking-wide">
          DevBlog
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
          A modern platform for developers and tech enthusiasts to share 
          tutorials, ideas, and knowledge. Join our growing tech community.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-8">
          
          {/* GitHub */}
          <a
            href="https://www.github.com/codes-mayank"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300 hover:scale-150"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.79-.26.79-.58v-2.02c-3.34.73-4.03-1.41-4.03-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.57C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mayankagrawal27?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300 hover:scale-150"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.13.92-2.06 2.06-2.06 1.13 0 2.06.93 2.06 2.06 0 1.14-.93 2.06-2.06 2.06zm15.11 13.02h-3.55v-5.6c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.69H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="YOUR_TWITTER_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300 hover:scale-150"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012.03 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mayankagrawal_27?igsh=MW85ZXQzZDBjYjAxaA=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition duration-300 hover:scale-150"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.76 5.76 0 0122 7.75v8.5A5.76 5.76 0 0116.25 22h-8.5A5.76 5.76 0 012 16.25v-8.5A5.76 5.76 0 017.75 2zm4.25 5.25A4.75 4.75 0 1016.75 12 4.76 4.76 0 0012 7.25zm6-1.75a1.25 1.25 0 11-1.25 1.25A1.25 1.25 0 0118 5.5z"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>

        {/* Footer Text */}
        <div className="space-y-3 text-lg">
          <p>© 2026 DevBlog. All rights reserved.</p>
          <p className="text-blue-400 font-semibold">
            Designed & Developed by Mayank Agrawal
          </p>
          <p>
            Made with <span className="text-red-500">❤️</span> and lots of{" "}
            <span className="text-blue-400">☕</span>
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-60"></div>
    </footer>
  );
};

export default InfoSection;


