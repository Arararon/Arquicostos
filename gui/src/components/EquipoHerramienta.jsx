import React from "react";
import "../styles/Note.css";
import { useNavigate,Link } from "react-router-dom";
function EquipoHerramienta({ equipoHerramienta, onDelete }) {
    
    const detalle=equipoHerramienta.equipo_herramienta_detalle

    return <div className="note-container">
        <p className="note-title">{detalle.clave}</p>
                <p className="note-content">descripción: {detalle.descripcion}</p>
                <p className="note-date">cantidad: {equipoHerramienta.cantidad}</p>
        <p className="note-date">Unidad: {detalle.unidad}</p>
        <p className="note-date">costo unitario: ${detalle.costoUnitario}</p>
        <p className="note-date">costo: ${detalle.costoUnitario * equipoHerramienta.cantidad}</p>      
        <p className="note-date">{detalle.categoria}</p>
                <button className="delete-button" onClick={() => onDelete(equipoHerramienta.id)}>Delete</button>
            </div>
}

export default EquipoHerramienta;