import { useState } from "react"

import '../styles/nuevaobra.css'

export function NuevaObraButton() {
    return <div className="nueva-obra-card">
        <div>Crear Nueva Obra</div>
    </div>
}

export function NuevaObraForm({method,obra,handleCrearObra,handleEditarObra}) {
    const [name, setName] = useState(obra?obra.name:"");
    const [description, setDescription] = useState(obra?obra.description:"");
    const [calle, setCalle]=useState(obra?obra.calle:"")
    const [numero, setNumero]=useState(obra?obra.numero:"")
    const [codigoPostal, setCodigoPostal]=useState(obra?obra.codigoPostal:"")
    const [estado, setEstado]=useState(obra?obra.estado:"")
    const [municipio, setMunicipio]=useState(obra?obra.municipio:"")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method) {    
            switch (method) {
                case "create":
                    handleCrearObra({
                        name:name,
                        description:description,
                        calle:calle,
                        numero:numero,
                        codigoPostal:codigoPostal,
                        estado:estado,
                        municipio:municipio});
                    break;
                case "edit":
                    handleEditarObra({
                        name:name,
                        description:description,
                        calle:calle,
                        numero:numero,
                        codigoPostal:codigoPostal,
                        estado:estado,
                        municipio:municipio});
            }   
        }
        else {
            alert("Método no definido")
        }
    
        
    }

    return (
        <div className="nueva-obra-container">
            <form onSubmit={handleSubmit} className="nueva-obra-form">
                <label htmlFor="name">Obra:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Nombre"
                />

                <label htmlFor="description">Descripcion:</label>
                <textarea
                    id="description"
                    name="description"
                    className="form-input"
                    required
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
                ></textarea>

                <label htmlFor="calle">Calle:</label>
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    className="form-input"
                    required
                    onChange={(e) => setCalle(e.target.value)}
                    value={calle}
                    placeholder="Calle"
                />

                <label htmlFor="numero">Número:</label>
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    className="form-input"
                    required
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                    placeholder="Número"
                />

                <label htmlFor="codigoPostal">Código Postal:</label>
                <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    className="form-input"
                    required
                    onChange={(e) => setCodigoPostal(e.target.value)}
                    value={codigoPostal}
                    placeholder="Código Postal"
                />

                <label htmlFor="estado">Estado:</label>
                <input
                    type="text"
                    id="estado"
                    name="estado"
                    className="form-input"
                    required
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                    placeholder="Estado"
                />

                <label htmlFor="municipio">Municipio:</label>
                <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    className="form-input"
                    required
                    onChange={(e) => setMunicipio(e.target.value)}
                    value={municipio}
                    placeholder="Municipio"
                />
                <button className="form-button" type="submit">{obra?"Actualizar Obra":"Crear Obra"}</button>
            </form>
        </div>
    )
}