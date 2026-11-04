import { useState, useEffect } from "react"
import api from '../api'
import ObraCard from "../components/ObraCard";
import '../styles/obras.css'
import Drawer from "../components/Drawer";
import { NuevaObraButton, NuevaObraForm } from "../components/NuevaObra";

function ListadoObras({handleNavigateObra}) {
    const [obras, setObras] = useState([])

    useEffect(() => {
        getObras();
    }, []);

    const getObras = async() => {
        await api
            .get("/api/obras/")
            .then((res) => res.data)
            .then((data) => {
                setObras(data)
                console.log(data)
            })
            .catch((err) => alert(err));
    };

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

    const handleVerMas = (obra) => {
        handleNavigateObra(obra)  
    }

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

    const handleDelete = async (obra) => {
        await api.delete(`/api/obras/${obra}/delete/`)
        getObras();
    }

    const handleUpdate =async (obraID,obra) => {

        console.log(obraID,obra)
    }


    return <div className="obras-container">
        <h2>Lista De Obras</h2>
        {obras.length < 1 ?
            <Drawer
                    title={"Crear Nueva Obra"}
                    button={<NuevaObraButton />}
                >
                    <NuevaObraForm
                        method={"create"}
                        handleCrearObra={(e)=>{createObra(e)}} />
                </Drawer>
            :
            <div className="flexgrid-layout">
                {obras.map((obra) => (
                    <ObraCard obra={obra} key={obra.id}
                        handleVerMas={()=>{handleVerMas(obra.id)}}
                        handleDuplicate={()=>{handleDuplicate(obra.id,obra)}}
                        handleDelete={()=>{handleDelete(obra.id)}}
                        handleUpdate={(e)=>{handleUpdate(e)}}/>
                ))}
                <Drawer
                    title={"Crear Nueva Obra"}
                    button={<NuevaObraButton />}
                >
                    <NuevaObraForm
                        method={"create"}
                        handleCrearObra={(e)=>{createObra(e)}} />
                </Drawer>
                
            </div>
        }
        
    </div>
    
}

export default ListadoObras
