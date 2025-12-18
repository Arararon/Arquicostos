import React from "react";
import "../styles/Note.css";
import { useNavigate,Link } from "react-router-dom";
function ManoObra({ manoObra, onDelete }) {
    
    const detalle=manoObra.mano_obra_detalle

    return <div className="note-container">
        <p className="note-title">{detalle.clave}</p>
                <p className="note-content">descripción: {detalle.descripcion}</p>
                <p className="note-date">cantidad: {manoObra.cantidad}</p>
        <p className="note-date">Unidad: {detalle.unidad}</p>
        <p className="note-date">salario: ${detalle.salario}</p>
        <p className="note-date">costo: ${detalle.salario * manoObra.cantidad}</p>      
        <p className="note-date">{detalle.categoria}</p>
                <button className="delete-button" onClick={() => onDelete(manoObra.id)}>Delete</button>
            </div>
}

export default ManoObra;