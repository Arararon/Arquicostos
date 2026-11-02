import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Catalogo from "./layouts/Catalogo"
import Login from "./layouts/Login"


import NotFound from "./layouts/NotFound"
import ProtectedRoute from "./components_legacy/ProtectedRoute"
import Obra from "./layouts/Obra"
import Matrices from "./page_legacy/Matrices"

import Grupos from "./page_legacy/Grupos"
import "./styles/global.css"
import Listados from "./tools/Listados"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Login method={"register"} route = {"/api/user/register/"} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/Grupos/:obraId" element={<ProtectedRoute><Grupos /></ProtectedRoute>} />
        <Route path="/login" element={<Login method={"login"} route = {"/api/token/"}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/obra/:obraId" element={<ProtectedRoute><Obra /></ProtectedRoute>} />
        <Route path="/obra/:obraId/concepto/:conceptoId" element={<ProtectedRoute><Matrices /></ProtectedRoute>} />
        <Route path="/catalogo/:obraId" element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
        <Route path="/listados/:obraId" element={<ProtectedRoute><Listados /></ProtectedRoute>}></Route>
        <Route path="*" element={<NotFound />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App