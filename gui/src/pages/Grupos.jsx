import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import "../styles/Home.css"
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "../styles/Login.css";


function Grupos() {
    const [obras, setObras] = useState([]);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [calle, setCalle]=useState("")
    const [numero, setNumero]=useState("")
    const [codigoPostal, setCodigoPostal]=useState("")
    const [estado, setEstado]=useState("")
    const [municipio, setMunicipio]=useState("")
    const navigate = useNavigate();

    useEffect(() => {
        getObras();
    }, []);

    const getObras = () => {
        api
            .get("/api/obras/")
            .then((res) => res.data)
            .then((data) => {
                setObras(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteObra = (id) => {
        api
            .delete(`/api/obras/${id}/delete/`)
            .then((res) => {
                if (res.status === 204) alert("obra eliminada");
                else alert("Failed to delete note.");
                getObras();
            })
            .catch((error) => alert(error));
    };

    const createPartida = (obraID) => {
        api
            .post(`/api/obras/${obraID}/partidas/`, { nombre: "Partida Inicial", obra: obraID })
            .then((res) => {
                if (res.status === 201) {
                    api
                        .post(`/api/obras/${obraID}/partidas/`, { nombre: "sub-Partida Inicial", obra: obraID })
                        .then((res2) => {
                            if (res2.status === 201) {
                                api
                                .post(`/api/obras/${obraID}/parentpartidas/`, {partidaPadre:res.data.id ,partidaHijo:res2.data.id , obra: obraID })
                                .then((res3) => {
                                    if (res3.status === 201) {
                                        alert("partida Creada") 
                                    }
                                    else alert("Fallo al vincular Partidas");
                                })
                            }
                            else alert("Fallo al Crear sub-partida inicial");
                        })
                }
                else alert("Fallo al Crear partida inicial");
            })
    }

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/obras/", { name, description,calle,numero,codigoPostal,estado,municipio })
            .then((res) => {
                if (res.status === 201) {

                    alert("obra creada");
                    createPartida(res.data.id);
                    

                }
                else alert("Failed to make note.");
                getObras();
            })  
            .catch((err) => alert(err));
    };

    const handleDuplicate = async (item) => {
        let duplicateName = item.name;
        let duplicateDesc = item.description;
        let duplicateCalle= item.calle;
        let duplicateNumero=item.numero;
        let duplicateCodigoPostal=item.codigoPostal;
        let duplicateEstado=item.estado;
        let duplicateMunicipio=item.municipio;
        api
            .post("/api/obras/", { name:duplicateName, description:duplicateDesc,calle:duplicateCalle,numero:duplicateNumero,codigoPostal:duplicateCodigoPostal,estado:duplicateEstado,municipio:duplicateMunicipio })
            .then((res) => {
                if (res.status === 201) {
                    
                    alert("obra creada");
                    createPartida(res.data.id);
                }
                else alert("Failed to make note.");
                getObras();
            })  
            .catch((err) => alert(err));
        
        
    }

    const handleClick = (id) => {
        
        console.log(`/Catalogo/${id}`)
        navigate(`/Catalogo/${id}`);
        
    }

    return (
        <div>
            <div>
                <h2>Grupos De trabajo</h2>
                
     
            </div>
        </div>
    );
}

export default Grupos;