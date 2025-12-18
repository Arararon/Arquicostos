import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import "../styles/Home.css"
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "../styles/Login.css";


function Home() {
    const [obras, setObras] = useState([]);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
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
            .post("/api/obras/", { name, description })
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
        api
            .post("/api/obras/", { name:duplicateName, description:duplicateDesc })
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
                <h2>Obras</h2>
                
        <Grid container spacing={2}>
      {obras.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: "100%",  width:"320px"}}>
                <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                </CardContent>
                <CardActions>
                      <Button onClick={()=>handleClick(item.id)} size="small">Ver más</Button>
                      <Button onClick={()=>handleDuplicate(item)} size="small">Duplicar</Button>
                      <Button onClick={() => deleteObra(item.id)} size="small">Eliminar</Button>
                      <Button size="small">Grupos de trabajo</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
            </div>
            <h2>Crear una Obra</h2>
            <div className="obraContainer">
            <form onSubmit={createNote} className="form-container">
                <label htmlFor="name">Obra:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label htmlFor="content">Descripcion:</label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    className="form-input"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Crear Obra"></input>
                </form>
                </div>
        </div>
    );
}

export default Home;