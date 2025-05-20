import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Preview from './pages/Preview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Preview' element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}
