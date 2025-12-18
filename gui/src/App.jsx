import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Obra from "./pages/Obra"
import Matrices from "./pages/Matrices"
import MainLayout from "./pages/Layout"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/obra/:obraId" element={<ProtectedRoute><Obra /></ProtectedRoute>} />
        <Route path="/obra/:obraId/concepto/:conceptoId" element={<ProtectedRoute><Matrices /></ProtectedRoute>} />
        <Route path="/catalogo/:obraId" element={<ProtectedRoute><MainLayout /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App