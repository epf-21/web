import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Preview from './pages/Preview';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Preview' element={<Preview />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
