import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import {Button} from "@mui/material";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Login.css";

function LoginForm({route,method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name=method==="login"?"Login":"Register";

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


    return <div className="login-container">
        <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nombre de Usuario"/>
        <input className="form-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña"/>
        {Loading && <LoadingIndicator/>}
        <Button className="form-button" type="submit">{name}</Button>
        </form>
        </div>
}

export default LoginForm;