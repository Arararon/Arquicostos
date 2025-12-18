import React from "react";
import "../styles/Note.css";
import { useNavigate,Link } from "react-router-dom";
function Material({ material, onDelete }) {
    
    const detalle=material.material_detalle

    return <div className="note-container">
        <p className="note-title">{detalle.clave}</p>
                <p className="note-content">descripción: {detalle.descripcion}</p>
                <p className="note-date">cantidad: {material.cantidad}</p>
        <p className="note-date">Unidad: {detalle.unidad}</p>
        <p className="note-date">costo unitario: ${detalle.costoUnitario}</p>
        <p className="note-date">costo: ${detalle.costoUnitario * material.cantidad}</p>
        {detalle.colocado? <p className="note-date">colocado</p>:""}        
        <p className="note-date">{detalle.clasificacion}</p>
                <button className="delete-button" onClick={() => onDelete(material.id)}>Delete</button>
            </div>
}

export default Material;