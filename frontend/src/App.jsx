import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Catalogo from '../pages/Catalogo'
import MangaDetalle from '../pages/MangaDetalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/manga/:id" element={<MangaDetalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App