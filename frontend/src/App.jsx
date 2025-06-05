import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateQuestion from './pages/CreateQuestion';
import Preview from './pages/Preview';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home'
import QuestionManager from './pages/QuestionManager'
import ConfigureQuestion from './pages/ConfigureQuestion';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/questions' element={<QuestionManager />} />
        <Route path='/Create-question' element={<CreateQuestion />} />
        <Route path='/configure-question' element={<ConfigureQuestion />} />
        <Route path='/preview' element={<Preview />} />
      </Routes>
    </BrowserRouter>
  )
}
