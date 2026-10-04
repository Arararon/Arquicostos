import { useState } from "react";
import '../styles/nuevaobra.css'

function PartidaForm({method,partida,handlePartida}) {
    const [nombre, setNombre] = useState(partida?partida.nombre:"");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method) {
            handlePartida(e, nombre);    
            // eslint-disable-next-line default-case
            switch (method) {
                case "create":
                    setNombre("");
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
                <label>Nombre:</label>
                <input className="form-input"
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Partida"
                />
                <button className="form-button" type="submit">Crear Partida</button>
            </form>
        </div>
    )
}

export default PartidaForm