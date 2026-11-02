import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../style/loginForm.css"

function LoginForm({route,method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const titulo=method==="login"?"Iniciar Sesión":"Registrarse";

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

    const handleSwitch=async(e)=>{
        navigate(`/${method==="login"?"register":"login"}`);
    }


    return <div className="loginContainer">
        <form onSubmit={handleSubmit} >
            <div className="loginFormContainer">
                <h1>{titulo}</h1>
                <label htmlFor="username">Usuario:</label>
                <br />
                <input className="form-input" id="username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nombre de Usuario"/>
                <br />
                <label htmlFor="password">Contraseña:</label>
                <br />
                <input className="form-input" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña"/>
                
                {Loading && <LoadingIndicator/>}
            <br />
            <div className="loginButtonsContainer"> 
                <button type="submit">{titulo}</button>
                <a onClick={handleSwitch} className="LoginSwitch">{method==="login"?"Registrarse":"Iniciar Sesión"}</a></div></div>
            
        
        </form>
        </div>
}

export default LoginForm;