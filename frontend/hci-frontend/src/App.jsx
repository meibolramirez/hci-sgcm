import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Citas from './pages/Citas.jsx'
import Directorio from './pages/Directorio.jsx'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="*" element={<Home />} />
        <Route path="/directorio" element={<Directorio />} />
      </Routes>
    </>
  )
}
