import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/loginForm.css"
import Loader from "./Loader";

function LoginForm({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Iniciar Sesión" : "Registrarse"


    const handleSubmit = async (e) => {
        setLoading(true)

        e.preventDefault()
        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return <div className="loginContainer">
        <form onSubmit={handleSubmit} className="login-form-container">
            <h1>{name}</h1>
            <label htmlFor="username">Usuario:</label>
            <input className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
            />
            <label htmlFor="password">Contraseña:</label>
            <input className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
            />
            <button className="form-button" disabled={loading} type="submit">{loading?<Loader/>:name}</button>
        </form>
    </div>

}

export default LoginForm