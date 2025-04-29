import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import GameDoor from './pages/GameDoor.jsx'
import PipePuzzle from './pages/PipePuzzle.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/GameDoor' element={<GameDoor />} />
        <Route path='/PipePuzzle' element={<PipePuzzle />} />
      </Routes>
    </BrowserRouter>
  )
}
