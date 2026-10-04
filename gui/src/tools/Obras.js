import { useState, useEffect } from "react"
import api from '../api'
import ObraCard from "../components/ObraCard";
import '../styles/obras.css'
import Drawer from "../components/Drawer";
import { NuevaObraButton, NuevaObraForm } from "../components/NuevaObra";

function Obras({handleNavigateObra}) {
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

    const handleCrearObra = async(nombre,descripcion) => {
        await api.post('/api/obras/', { nombre, descripcion }).then(res => {
            if (res.status === 201) {
                alert("Obra Creada")
                getObras();
            }
            else alert("Falló al Crear Nota")
        })
            .catch((err) => alert(err));
    }

    const handleVerMas = (obra) => {
        handleNavigateObra(obra)  
    }

    const handleDuplicate = (obra) => {
        handleCrearObra(obra.nombre,obra.descripcion)
    }

    const handleDelete = async (obra) => {
        await api.delete(`/api/obras/${obra}/delete/`)
        getObras();
    }

    const handleUpdate = async (obra, nombre, descripcion) => {
        await api.patch(`/api/obras/${obra}/`,{
            obra: obra,
            nombre: nombre,
            descripcion:descripcion
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("Obra Actualizada");
                    getObras();
                }
                else alert("Fallo al actualizar Obra");
            })
        console.log(obra,nombre,descripcion)  
    }


    return <div className="obras-container">
        <h2>Lista De Obras</h2>
        {obras.length < 1 ?
            <Drawer
                    title={"Crear Nueva Obra"}
                    button={<NuevaObraButton />}
                >
                    <NuevaObraForm/>
                </Drawer>
            :
            <div className="flexgrid-layout">
                {obras.map((obra) => (
                    <ObraCard obra={obra} key={obra.id}
                        handleVerMas={()=>{handleVerMas(obra.id)}}
                        handleDuplicate={()=>{handleDuplicate(obra)}}
                        handleDelete={()=>{handleDelete(obra.id)}}
                        handleUpdate={(nombre, descripcion)=>{handleUpdate(obra.id,nombre, descripcion)}}/>
                ))}
                <Drawer
                    title={"Crear Nueva Obra"}
                    button={<NuevaObraButton />}
                >
                    <NuevaObraForm
                        method={"create"}
                        handleCrearObra={(e, nombre, descripcion) => handleCrearObra(nombre, descripcion)} />
                </Drawer>
                
            </div>
        }
        
    </div>
    
}

export default Obras