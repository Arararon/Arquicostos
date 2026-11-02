import "../style/obracard.css"


function ObraCard({obra,handleVerMas,handleDuplicate,handleDelete,handleGrupos}){

    return(
        <div className="obraCard">
            <div className="obraImagen"/>
            <div className="obraInfo">
                <h3>{obra.name}</h3>
                <div>{obra.calle} {obra.numero}, {obra.municipio}, {obra.estado} C.P. {obra.codigoPostal}</div>
            </div>
            <div className="ObraButtonBar">
                <button onClick={()=>handleVerMas()} title="Ver Más"><i class="material-icons">open_in_new</i></button>
                <button onClick={()=>handleDuplicate()} title="Duplicar"><i class="material-icons">content_copy</i></button>
                <button onClick={() => handleDelete()} title="Eliminar"><i class="material-icons">delete</i></button>
                <button onClick={() => handleGrupos()} title="Manejar Grupos"><i class="material-icons">group</i></button>
            </div>

        </div>
    )

}

export default ObraCard