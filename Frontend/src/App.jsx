import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import WriteBlog from './pages/WriteBlog'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<BlogPost />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/edit/:slug" element={<WriteBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;
