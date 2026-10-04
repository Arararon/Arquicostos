import "../styles/obracard.css"
import Drawer from "./Drawer"
import { NuevaObraForm } from "./NuevaObra"

function ObraCard({ obra, handleVerMas, handleDuplicate, handleDelete,handleUpdate }) {

    const handleEditarObra = (e, nombre, descripcion) => {
        e.preventDefault();
        handleUpdate(nombre, descripcion);
        
    }

    return(
        <div className="obraCard">
            <div className="obraImagen"/>
            <div className="obraInfo">
                <h3>{obra.nombre}</h3>
                <div>{obra.descripcion}</div>
            </div>
            <div className="ObraButtonBar">
                <button onClick={()=>handleVerMas()} title="Ver Más">Ver</button>
                <button onClick={()=>handleDuplicate()} title="Duplicar">Duplicar</button>
                <button onClick={() => handleDelete()} title="Eliminar">Borrar</button>
                <Drawer
                    title={"Editar Obra"}
                    button={<button>Editar</button>}
                >
                    <NuevaObraForm
                        obra={obra}
                        method={"edit"}
                        handleCrearObra={(e, nombre, descripcion) => handleEditarObra(e, nombre, descripcion)} />
                </Drawer>
            </div>

        </div>  
    )

}

export default ObraCard