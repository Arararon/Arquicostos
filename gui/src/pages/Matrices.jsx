import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/Home.css"
import Material from "../components/Material";
import ManoObra from "../components/ManoObra";
import EquipoHerramienta from "../components/EquipoHerramienta";

function Matrices() {

    const [concepto, setConcepto] = useState([]);

    const [materiales, setMateriales] = useState([]);
    const [manoObra, setManoObra] = useState([]);
    const [equipoHerramienta, setConceptos] = useState([]);
    const [auxiliares, setAuxiliares] = useState([]);
    const [cuadrillas, setCuadrillas] = useState([]);


    const [claveMaterial, setClaveMaterial] = useState("");
    const [descripcionMaterial, setDescripcionMaterial] = useState("");
    const [unidadMaterial, setUnidadMaterial] = useState("");
    const [constoUnitarioMaterial, setCostoUnitarioMaterial] = useState(0);
    const [clasificacionMaterial, setClasificacionMaterial] = useState("");
    const [colocadoMaterial, setColocadoMaterial] = useState(false);
    const [cantidadMaterial, setCantidadMaterial] = useState(0);

    const [manoObraClave, setManoObraClave] = useState("");
    const [manoObraDescripcion, setManoObraDescripcion] = useState("");
    const [manoObraUnidad, setManoObraUnidad] = useState("");
    const [manoObraCategoria, setManoObraCategoria] = useState("");
    const [manoObraSalario, setManoObraSalario] = useState(0);
    const [manoObraCantidad, setManoObraCantidad] = useState(0);


    const [claveEquipo, setClaveEquipo] = useState("");
    const [descripcionEquipo, setDescripcionEquipo] = useState("");
    const [unidadEquipo, setUnidadEquipo] = useState("");
    const [costoUnitarioEquipo, setCostoUnitarioEquipo] = useState(0);
    const [clasificacionEquipo, setClasificacionEquipo] = useState("");
    const [cantidadEquipo, setCantidadEquipo] = useState(0);



    useEffect(() => {
        getConcepto();
    }, []);

    const { obraId, conceptoId } = useParams();

    const getConcepto = () => {
        api
            .get(`/api/obras/${obraId}/conceptos/${conceptoId}/`)
            .then((res) => res.data)
            .then((data) => {
                setConcepto(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };


    const deleteMaterial = (id) => {
        api
            .delete(`/api/obras/${obraId}/conceptos/${id}/delete/`)
            .then((res) => {
                if (res.status === 204) alert("concepto eliminado");
                else alert("Failed to delete note.");
                getConcepto();
            })
            .catch((error) => alert(error));
    };

    const createMaterial = (e) => {
        e.preventDefault();
        api
            .post(`/api/obras/${obraId}/materiales/`, {
                clave: claveMaterial,
                descripcion: descripcionMaterial,
                unidad: unidadMaterial,
                costoUnitario: constoUnitarioMaterial,
                clasificacion: clasificacionMaterial,
                colocado: colocadoMaterial,
                obra: obraId
            })
            .then((res) => {
                if (res.status === 201)
                {
                    alert("concepto creado");
                    
                    api
                    .post(`/api/obras/${obraId}/materiales_concepto/`, {
                        concepto: conceptoId,
                        material: res.data.id,
                        cantidad: cantidadMaterial
                    })  
                    .then((res) => {
                        if (res.status === 201) alert("material asociado a concepto");
                        else alert("Failed to create note.");})
                }
                
                
                else alert("Failed to make note.");
                getConcepto();
            })  
            .catch((err) => alert(err));
    };

    const createManoObra = (e) => {
        e.preventDefault();
        api
            .post(`/api/obras/${obraId}/mano_obra/`, {
                clave: manoObraClave,
                descripcion: manoObraDescripcion,
                unidad: manoObraUnidad,
                salario: manoObraSalario,
                categoria: manoObraCategoria,
                obra: obraId
            })
            .then((res) => {
                if (res.status === 201)
                {
                    alert("concepto creado");
                    
                    api
                    .post(`/api/obras/${obraId}/mano_obra_concepto/`, {
                        concepto: conceptoId,
                        mano_obra: res.data.id,
                        cantidad: manoObraCantidad
                    })  
                    .then((res) => {
                        if (res.status === 201) alert("Mano de asociado a concepto");
                        else alert("Failed to create note.");})
                }
                
                
                else alert("Failed to make note.");
                getConcepto();
            })  
            .catch((err) => alert(err));
    }

    const createEquipo = (e) => {
        e.preventDefault();
        api
            .post(`/api/obras/${obraId}/equipo_herramienta/`, {
                clave: claveEquipo,
                descripcion: descripcionEquipo,
                unidad: unidadEquipo,
                costoUnitario: costoUnitarioEquipo,
                clasificacion: clasificacionEquipo,
                obra: obraId
            })
            .then((res) => {
                if (res.status === 201)
                {
                    alert("concepto creado");
                    
                    api
                    .post(`/api/obras/${obraId}/equipo_herramienta_concepto/`, {
                        concepto: conceptoId,
                        equipo_herramienta: res.data.id,
                        cantidad: cantidadEquipo
                    })  
                    .then((res) => {
                        if (res.status === 201) alert("Equipo y Herramienta asociado a concepto");
                        else alert("Failed to create note.");})
                }
                
                
                else alert("Failed to make note.");
                getConcepto();
            })  
            .catch((err) => alert(err));
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


    return (
        <div>
            <div>
                <h2>Matrices</h2>
                <h3>{concepto.concepto}</h3>
                <p>{concepto.descripcion}</p>
                <p>{concepto.cantidad}</p>
                {concepto.materiales && concepto.materiales.length > 0 && (
                    <div><h3>Materiales</h3>
                        {concepto.materiales.map((material) => (<Material material={material} onDelete={deleteMaterial} key={material.id} />))
                        
                    }</div>)}
                

                {concepto.mano_obra && concepto.mano_obra.length > 0 && (
                    <div><h3>Mano de Obra</h3>
                        {concepto.mano_obra.map((manoObra) => (<ManoObra manoObra={manoObra} onDelete={deleteMaterial} key={manoObra.id} />))
                        
                    }</div>)}
                
                {concepto.equipo_herramienta && concepto.equipo_herramienta.length > 0 && (
                    <div><h3>Equipo y herramienta</h3>
                        {concepto.equipo_herramienta.map((equipo) => (<EquipoHerramienta equipoHerramienta={equipo} onDelete={deleteMaterial} key={equipo.id} />))
                        
                        }</div>)}
                
                <p>Costo total del Concepto: ${getCosto()}</p>
                
        
            
            </div>
            <h2>Crear un material</h2>
            <form onSubmit={createMaterial}>
                <label htmlFor="claveMaterial">Clave:</label>
                <br />
                <input
                    type="text"
                    id="claveMaterial"
                    name="claveMaterial"
                    required
                    onChange={(e) => setClaveMaterial(e.target.value)}
                    value={claveMaterial}
                />
                <label htmlFor="descripcionMaterial">Descripcion:</label>
                <br />
                <textarea
                    id="descripcionMaterial"
                    name="descripcionMaterial"
                    required
                    value={descripcionMaterial}
                    onChange={(e) => setDescripcionMaterial(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="name">Cantidad:</label>
                <br />
                <input
                    type="number"
                    id="cantidadMaterial"
                    name="cantidadMaterial"
                    required
                    onChange={(e) => setCantidadMaterial(e.target.value)}
                    value={cantidadMaterial}
                />

                <label htmlFor="unidadMaterial">Unidad:</label>
                <br />
                <input
                    type="text"
                    id="unidadMaterial"
                    name="unidadMaterial"
                    required
                    onChange={(e) => setUnidadMaterial(e.target.value)}
                    value={unidadMaterial}
                />

                <label htmlFor="constoUnitarioMaterial">Costo:</label>
                <br />
                <input
                    type="number"
                    id="constoUnitarioMaterial"
                    name="constoUnitarioMaterial"
                    min="0.00"
                    step="0.01"
                    required
                    onChange={(e) => setCostoUnitarioMaterial(e.target.value)}
                    value={constoUnitarioMaterial}
                />

                <label htmlFor="clasificacionMaterial">Clasificación:</label>
                <br />
                <input
                    type="text"
                    id="clasificacionMaterial"
                    name="clasificacionMaterial"
                    required
                    onChange={(e) => setClasificacionMaterial(e.target.value)}
                    value={clasificacionMaterial}
                />
                
                
                <label htmlFor="colocadoMaterial">Colocado:</label>
                <br />
                <input
                    type="checkbox"
                    id="colocadoMaterial"
                    name="colocadoMaterial"
                    required
                    onChange={(e) => setColocadoMaterial(e.target.value)}
                    value={colocadoMaterial}
                />

           
                
                <input type="submit" value="Submit"></input>
            </form>

            <h2>Crear mano de obra</h2>
            <form onSubmit={createManoObra}>
                <label htmlFor="manoObraClave">Clave:</label>
                <br />
                <input
                    type="text"
                    id="manoObraClave"
                    name="manoObraClave"
                    required
                    onChange={(e) => setManoObraClave(e.target.value)}
                    value={manoObraClave}
                />
                <label htmlFor="manoObraDescripcion">Descripcion:</label>
                <br />
                <textarea
                    id="manoObraDescripcion"
                    name="manoObraDescripcion"
                    required
                    value={manoObraDescripcion}
                    onChange={(e) => setManoObraDescripcion(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="name">Cantidad:</label>
                <br />
                <input
                    type="number"
                    id="manoObraCantidad"
                    name="manoObraCantidad"
                    required
                    onChange={(e) => setManoObraCantidad(e.target.value)}
                    value={manoObraCantidad}
                />

                <label htmlFor="manoObraUnidad">Unidad:</label>
                <br />
                <input
                    type="text"
                    id="manoObraUnidad"
                    name="manoObraUnidad"
                    required
                    onChange={(e) => setManoObraUnidad(e.target.value)}
                    value={manoObraUnidad}
                />

                <label htmlFor="manoObraSalario">Salario:</label>
                <br />
                <input
                    type="number"
                    id="manoObraSalario"
                    name="manoObraSalario"
                    min="0.00"
                    step="0.01"
                    required
                    onChange={(e) => setManoObraSalario(e.target.value)}
                    value={manoObraSalario}
                />

                <label htmlFor="manoObraCategoria">Categoria:</label>
                <br />
                <input
                    type="text"
                    id="manoObraCategoria"
                    name="manoObraCategoria"
                    required
                    onChange={(e) => setManoObraCategoria(e.target.value)}
                    value={manoObraCategoria}
                />

                <input type="submit" value="Submit"></input>
            </form>

            <h2>Crear Equipo y Herramienta</h2>
            <form onSubmit={createEquipo}>
                <label htmlFor="claveEquipo">Clave:</label>
                <br />
                <input
                    type="text"
                    id="claveEquipo"
                    name="claveEquipo"
                    required
                    onChange={(e) => setClaveEquipo(e.target.value)}
                    value={claveEquipo}
                />
                <label htmlFor="descripcionEquipo">Descripcion:</label>
                <br />
                <textarea
                    id="descripcionEquipo"
                    name="descripcionEquipo"
                    required
                    value={descripcionEquipo}
                    onChange={(e) => setDescripcionEquipo(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="cantidadEquipo">Cantidad:</label>
                <br />
                <input
                    type="number"
                    id="cantidadEquipo"
                    name="cantidadEquipo"
                    required
                    onChange={(e) => setCantidadEquipo(e.target.value)}
                    value={cantidadEquipo}
                />

                <label htmlFor="unidadEquipo">Unidad:</label>
                <br />
                <input
                    type="text"
                    id="unidadEquipo"
                    name="unidadEquipo"
                    required
                    onChange={(e) => setUnidadEquipo(e.target.value)}
                    value={unidadEquipo}
                />

                <label htmlFor="costoUnitarioEquipo">Costo:</label>
                <br />
                <input
                    type="number"
                    id="costoUnitarioEquipo"
                    name="costoUnitarioEquipo"
                    min="0.00"
                    step="0.01"
                    required
                    onChange={(e) => setCostoUnitarioEquipo(e.target.value)}
                    value={costoUnitarioEquipo}
                />

                <label htmlFor="clasificacionEquipo">Categoria:</label>
                <br />
                <input
                    type="text"
                    id="clasificacionEquipo"
                    name="clasificacionEquipo"
                    required
                    onChange={(e) => setClasificacionEquipo(e.target.value)}
                    value={clasificacionEquipo}
                />

                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Matrices;