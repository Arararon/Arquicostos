import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import "../styles/Home.css"
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import "../styles/Login.css";


function Home() {
    const [obras, setObras] = useState([]);
    const [obrasColaborativas, setObrasColaborativas]=useState([])
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

     const getObras = async() => {
        api
            .get("/api/obras/")
            .then((res) => res.data)
            .then((data) => {
               setObras(data)

            })
            .catch((err) => alert(err));
        
        api
            .get("/api/obras/adicionales/")
            .then((res) => res.data)
            .then((data) => {
                
                setObrasColaborativas(data);
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

    const handleGrupos = (id) => {
        
        console.log(`/Grupos/${id}`)
        navigate(`/Grupos/${id}`);
        
    }

    return (
        <div>
            {obras.length<1?"":<div>
                
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

                <div>{item.calle} {item.numero}, {item.municipio}, {item.estado} C.P. {item.codigoPostal}</div>
                </CardContent>
                <CardActions>
                      <Button onClick={()=>handleClick(item.id)} size="small">Ver más</Button>
                      <Button onClick={()=>handleDuplicate(item)} size="small">Duplicar</Button>
                      <Button onClick={() => deleteObra(item.id)} size="small">Eliminar</Button>
                      <Button onClick={() => handleGrupos(item.id)} size="small">Grupos de trabajo</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
            </div>}


            {obrasColaborativas.length<1?"":<div>
                
                <h2>Obras Colaborativas</h2>
                
        <Grid container spacing={2}>
      {obrasColaborativas.map((item) => (
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

                <div>{item.calle} {item.numero}, {item.municipio}, {item.estado} C.P. {item.codigoPostal}</div>
                </CardContent>
                <CardActions>
                      <Button onClick={()=>handleClick(item.id)} size="small">Ver más</Button>
                      <Button onClick={()=>handleDuplicate(item)} size="small">Duplicar</Button>
                      <Button onClick={() => deleteObra(item.id)} size="small">Eliminar</Button>
                      <Button onClick={() => handleGrupos(item.id)} size="small">Grupos de trabajo</Button>
                </CardActions>
            </Card>
            </Grid>
        ))}
        </Grid>
            </div>}


            
            
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
                <label htmlFor="description">Descripcion:</label>
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
                <label htmlFor="calle">Calle:</label>
                <br />
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    className="form-input"
                    required
                    onChange={(e) => setCalle(e.target.value)}
                    value={calle}
                />
                <br />
                <label htmlFor="numero">Número:</label>
                <br />
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    className="form-input"
                    required
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                />
                <br />

                <label htmlFor="codigoPostal">Código Postal:</label>
                <br />
                <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    className="form-input"
                    required
                    onChange={(e) => setCodigoPostal(e.target.value)}
                    value={codigoPostal}
                />
                <br />

                <label htmlFor="estado">Estado:</label>
                <br />
                <input
                    type="text"
                    id="estado"
                    name="estado"
                    className="form-input"
                    required
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                />
                <br />

                <label htmlFor="municipio">Municipio:</label>
                <br />
                <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    className="form-input"
                    required
                    onChange={(e) => setMunicipio(e.target.value)}
                    value={municipio}
                />
                <br />
                <input className="crearObra" type="submit" value="Crear Obra"></input>
                </form>
                </div>
        </div>
    );
}

export default Home;