import { useState } from "react"
import "../style/crearobraform.css"

function CrearObraForm({crearObra}){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [calle, setCalle]=useState("")
    const [numero, setNumero]=useState("")
    const [codigoPostal, setCodigoPostal]=useState("")
    const [estado, setEstado]=useState("")
    const [municipio, setMunicipio]=useState("")

    return(
        <div className="obraFormContainer">
            <form onSubmit={(e)=>{
                e.preventDefault();
                crearObra({
                name:name,
                description:description,
                calle:calle,
                numero:numero,
                codigoPostal:codigoPostal,
                estado:estado,
                municipio:municipio})}} className="form-container">
                <label htmlFor="name">Obra:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <label htmlFor="description">Descripcion:</label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    className="form-input"
                    required
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="calle">Calle:</label>
                <br />
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    className="form-input"
                    required
                    onChange={(e) => setCalle(e.target.value)}
                    value={calle}
                />
                <br />
                <label htmlFor="numero">Número:</label>
                <br />
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    className="form-input"
                    required
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                />
                <br />

                <label htmlFor="codigoPostal">Código Postal:</label>
                <br />
                <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    className="form-input"
                    required
                    onChange={(e) => setCodigoPostal(e.target.value)}
                    value={codigoPostal}
                />
                <br />

                <label htmlFor="estado">Estado:</label>
                <br />
                <input
                    type="text"
                    id="estado"
                    name="estado"
                    className="form-input"
                    required
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                />
                <br />

                <label htmlFor="municipio">Municipio:</label>
                <br />
                <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    className="form-input"
                    required
                    onChange={(e) => setMunicipio(e.target.value)}
                    value={municipio}
                />
                <br />
                <button className="crearObra" type="submit"> Crear Obra</button>
            </form>


        </div>
    )
}

export default CrearObraForm