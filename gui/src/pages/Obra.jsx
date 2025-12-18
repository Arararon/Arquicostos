import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Concepto from "../components/Concepto"
import "../styles/Home.css"

function Obra() {
    const [conceptos, setConceptos] = useState([]);
    const [descripcion, setDescripcion] = useState("");
    const [concepto, setConcepto] = useState("");
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        getConceptos();
    }, []);

    const { obraId } = useParams();

    const getConceptos = () => {
        api
            .get(`/api/obras/${obraId}/conceptos/`)
            .then((res) => res.data)
            .then((data) => {
                setConceptos(data);
                console.log(obraId);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteConcepto = (id) => {
        api
            .delete(`/api/obras/${obraId}/conceptos/${id}/delete/`)
            .then((res) => {
                if (res.status === 204) alert("concepto eliminado");
                else alert("Failed to delete note.");
                getConceptos();
            })
            .catch((error) => alert(error));
    };

    const createConcepto = (e) => {
        e.preventDefault();
        api
            .post(`/api/obras/${obraId}/conceptos/`, { concepto, descripcion, cantidad, obra: obraId })
            .then((res) => {
                if (res.status === 201) alert("concepto creado");
                else alert("Failed to make note.");
                getConceptos();
            })  
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Catalogo de Conceptos</h2>
                {conceptos.map((concepto) => (<Concepto concepto={concepto} onDelete={deleteConcepto} key={concepto.id}/>))}
            </div>
            <h2>Crear un Concepto</h2>
            <form onSubmit={createConcepto}>
                <label htmlFor="concepto">Concepto:</label>
                <br />
                <input
                    type="text"
                    id="concepto"
                    name="concepto"
                    required
                    onChange={(e) => setConcepto(e.target.value)}
                    value={concepto}
                />
                <label htmlFor="content">Descricpión:</label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    required
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="name">Cantidad:</label>
                <br />
                <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    required
                    onChange={(e) => setCantidad(e.target.value)}
                    value={cantidad}
                />
                
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Obra;