import React from "react";
import "../styles/Note.css";
import { useNavigate, Link } from "react-router-dom";
import Material from "./Material";
import ManoObra from "./ManoObra";
import EquipoHerramienta from "./EquipoHerramienta";
function Concepto({concepto,onDelete}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/obra/${concepto.obra}/concepto/${concepto.id}`);
    }

    const getCosto = () => {

        let costo = 0;
        if (concepto.materiales && concepto.materiales.length > 0) {
            concepto.materiales.forEach((material) => {
                costo += material.cantidad * material.material_detalle.costoUnitario;
            });
        }
        if (concepto.mano_obra && concepto.mano_obra.length > 0) {
            concepto.mano_obra.forEach((manoObra) => {
                costo += manoObra.cantidad * manoObra.mano_obra_detalle.salario;
            });
        }
        if (concepto.equipo_herramienta && concepto.equipo_herramienta.length > 0) {
            concepto.equipo_herramienta.forEach((equipoHerramienta) => {
                costo += equipoHerramienta.cantidad * equipoHerramienta.equipo_herramienta_detalle.costoUnitario;
            });
        }
        return costo;
    }

    return <div className="note-container">
        <p className="note-title" onClick={handleClick}>{concepto.concepto}</p>
                <p className="note-content">{concepto.descripcion}</p>
                <p className="note-date">{concepto.cantidad}</p>
                
                {concepto.materiales && concepto.materiales.length > 0 && (
                    <div><h3>Materiales</h3>
                        {concepto.materiales.map((material) => (<Material material={material} onDelete={""} key={material.id} />))
                        
                    }</div>)}
                

                {concepto.mano_obra && concepto.mano_obra.length > 0 && (
                    <div><h3>Mano de Obra</h3>
                        {concepto.mano_obra.map((manoObra) => (<ManoObra manoObra={manoObra} onDelete={""} key={manoObra.id} />))
                        
                    }</div>)}
                
                {concepto.equipo_herramienta && concepto.equipo_herramienta.length > 0 && (
                    <div><h3>Equipo y herramienta</h3>
                        {concepto.equipo_herramienta.map((equipo) => (<EquipoHerramienta equipoHerramienta={equipo} onDelete={""} key={equipo.id} />))
                        
                }</div>)}
        
            <p>Costo total del Concepto: ${getCosto()}</p>
        

                <button className="delete-button" onClick={() => onDelete(concepto.id)}>Delete</button>
            </div>
}

export default Concepto;