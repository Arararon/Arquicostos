import Header from "../components_legacy/Header"
import "../style/home.css"
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import FlexGrid from "../components_legacy/FlexGrid";
import CrearObraForm from "../components_legacy/CrearObraForm";

function HomeLegacy(){
    const [obras, setObras] = useState([]);
    const [obrasColaborativas, setObrasColaborativas]=useState([])
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
                                .post(`/api/obras/${obraID}/parentpartidas/`, 
                                    {partidaPadre:res.data.id,
                                    partidaHijo:res2.data.id,
                                    obra: obraID })
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

    const createObra = (e) => {
        api
            .post("/api/obras/", {name:e.name, 
                description:e.description,
                calle:e.calle,
                numero:e.numero,
                codigoPostal:e.codigoPostal,
                estado:e.estado,
                municipio:e.municipio })
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
            .post("/api/obras/", { name:duplicateName, 
                description:duplicateDesc,
                calle:duplicateCalle,
                numero:duplicateNumero,
                codigoPostal:duplicateCodigoPostal,
                estado:duplicateEstado,
                municipio:duplicateMunicipio })
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

    const handleVerMas = (id) => {
        console.log(`/Catalogo/${id}`)
        navigate(`/Catalogo/${id}`);
    }

    const handleGrupos = (id) => {
        
        console.log(`/Grupos/${id}`)
        navigate(`/Grupos/${id}`);
        
    }
    return(
        <section className="layout">
            <div className="header">
                <Header/>
            </div>
            <div className="leftSide"></div>
            <div className="body">

                {obras.length<1?
                <h3>No hay Obras Para Mostrar</h3>
                :
                <FlexGrid titulo={"Obras Propietarias"} obras={obras}
                    handleVerMas={(e)=>{handleVerMas(e)}}
                    handleDuplicate={(e)=>{handleDuplicate(e)}}
                    handleDelete={(e)=>{deleteObra(e)}}
                    handleGrupos={(e)=>{handleGrupos(e)}}/>}

               {obrasColaborativas.length<1?
                "":<FlexGrid titulo={"Obras Colaborativas"} obras={obrasColaborativas}/>}
                
                <h2>Crear Obra</h2>
                <CrearObraForm crearObra={(e)=>{createObra(e)}} />


                </div>

                
            <div className="rightSide"></div>
            <div className="footer"></div>
        </section>
    )
}
export default HomeLegacy