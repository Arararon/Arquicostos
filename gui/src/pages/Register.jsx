import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {Button} from "@mui/material";
import LoadingIndicator from "../components/LoadingIndicator";
import "../styles/Login.css";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const route = "/api/user/register/"
    const method = "register"

    const handleSubmit= async(e)=>{
        setLoading(true);
        e.preventDefault();

        try{
            const response= await api.post(route,{username,password});
            if(method =="login"){
                localStorage.setItem(ACCESS_TOKEN,response.data.access);
                localStorage.setItem(REFRESH_TOKEN,response.data.refresh);
                navigate("/");
            }else{
                navigate("/login");
            }

        }
        catch(error){
            alert(error);
            console.error(error);
        }finally{
            setLoading(false);
        }

    }


    return <div>
        <div className="loginContainer">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <input className="form-input" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nombre de Usuario"/>
                <input className="form-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña"/>
                {Loading && <LoadingIndicator/>}
                <Button type="submit"
                    variant="contained"
                    sx={{ mb: 1, marginTop: 2, width:"80%", margin:"auto" }}
                >Iniciar Sesión</Button>
            </form>

        </div>
    </div>
}

export default Register;