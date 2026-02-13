import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'  //Added
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import WriteBlog from './pages/WriteBlog'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RichTextEditor from './components/RichTextEditor'
import InfoSection from './components/InfoSection'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID  //Added
console.log('Google Client ID:', GOOGLE_CLIENT_ID)

function App() {

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<BlogPost />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/edit/:slug" element={<WriteBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <InfoSection />
    </GoogleOAuthProvider>
  )
}

export default App;
