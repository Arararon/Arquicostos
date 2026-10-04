import { useState } from "react"

import '../styles/nuevaobra.css'

export function NuevaObraButton() {
    return <div className="nueva-obra-card">
        <div>Crear Nueva Obra</div>
    </div>
}

export function NuevaObraForm({method,obra,handleCrearObra}) {
    const [nombre, setNombre] = useState(obra?obra.nombre:"");
    const [descripcion, setDescripcion] = useState(obra?obra.descripcion:"");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method) {
            handleCrearObra(e, nombre, descripcion);    
            // eslint-disable-next-line default-case
            switch (method) {
                case "create":
                    setNombre("");
                    setDescripcion("")
                    break;
            }   
        }
        else {
            alert("Método no definido")
        }
    
        
    }

    return (
        <div className="nueva-obra-container">
            <form onSubmit={handleSubmit} className="nueva-obra-form">
                <label htmlFor="nombre">Nombre:</label>
                <input className="form-input"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Nombre"
                />

                <label htmlFor="descripcion">Descripción:</label>
                <input className="form-input"
                    type="text"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                />
                <button className="form-button" type="submit">Crear Obra</button>
            </form>
        </div>
    )
}