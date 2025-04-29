import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DragDrop from './pages/DragDrop';
import SelectCorrectAnswer from './pages/SelectCorrectAnswer';
import SortElements from './pages/SortElements';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Arrastrar-Soltar' element={<DragDrop />} />
        <Route path='/Seleccionar-Respuesta' element={<SelectCorrectAnswer />} />
        <Route path='/Ordenar-Elementos' element={<SortElements />} />
      </Routes>
    </BrowserRouter>
  )
}
