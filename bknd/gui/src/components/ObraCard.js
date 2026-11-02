import "../styles/obracard.css"
import Drawer from "./Drawer"
import { NuevaObraForm } from "./NuevaObra"

function ObraCard({ obra, handleVerMas, handleDuplicate, handleDelete,handleUpdate }) {

    const handleEditarObra = (e) => {
        handleUpdate(e)
        
    }

    return(
        <div className="obraCard">
            <div className="obraImagen"/>
            <div className="obraInfo">
                <h3>{obra.name}</h3>
                <div>{obra.calle} {obra.numero}, {obra.municipio}, {obra.estado} C.P. {obra.codigoPostal}</div>
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
                        handleEditarObra={(e) => handleEditarObra(e)} />
                </Drawer>
            </div>

        </div>  
    )

}

export default ObraCard