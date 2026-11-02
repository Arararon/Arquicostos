import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import api from "../api";


function Listados({obra,insumo}){
    const[materiales,setMateriales]=useState([]);
    const[manoObra,setManoObra]=useState([]);
    const[equipoHerramienta,setEquipoHerramienta]=useState([]);
    const [timerID, setTimerID] = useState(null);

    const columnas = {
        materiales: ["Clave", "Descripción", "Cantidad", "Unidad", "Costo Unitario", "Total"],
        mano_obra: ["Clave", "Descripción", "Cantidad", "Unidad", "Salario", "Total"],
        equipo_herramienta: ["Clave", "Descripción", "Cantidad", "Unidad","Costo Unitario", "Total"]
    };
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });


    useEffect(()=>{
        getListados();
    },[]);



    const fieldUpdater = (tipo,itemID,field,value) => {
        clearTimeout(timerID);
        const id = setTimeout(() => {

            switch(tipo){
                case "Material":
                    patchMaterial(itemID,field,value)
                    break;
                case "ManoObra":
                    patchManoObra(itemID,field,value)
                    break;
                case "EquipoHerramienta":
                    patchEquipoHerramienta(itemID,field,value)
                    break;
                default:
                    break;
            }

        }, 1200);
        setTimerID(id)
    }

    const patchMaterial=(id,field,value)=>{
        let newValue=field==="cantidad"?parseInt(value):value
        api
        .patch(`/api/obras/${id}/materiales/update/`, {
            [field]: newValue,
            obra:obra
        })
        .then((res3) => {
            if (res3.status === 200) {
                alert("Material Actualizado")
            }
            else alert("Fallo al vincular Partidas");
        })

    }

    const patchManoObra=(id,field,value)=>{
        let newValue=field==="cantidad"?parseInt(value):value
        api
        .patch(`/api/obras/${id}/mano_obra/update/`, {
            [field]: newValue,
            obra:obra
        })
        .then((res3) => {
            if (res3.status === 200) {
                alert("Mano de Obra Actualizada")
            }
            else alert("Fallo al vincular Partidas");
        })

    }

    const patchEquipoHerramienta=(id,field,value)=>{
        let newValue=field==="cantidad"?parseInt(value):value
        api
        .patch(`/api/obras/${id}/equipo_herramienta/update/`, {
            [field]: newValue,
            obra:obra
        })
        .then((res3) => {
            if (res3.status === 200) {
                alert("Equipo Y Herramienta Actualizado")
            }
            else alert("Fallo al vincular Partidas");
        })

    }

    const getListados=()=>{
        api
            .get(`/api/obras/${obra}/cuantificacion/`)
            .then((res)=>res.data)
            .then((data)=>{
                setMateriales(data.materiales);
                setManoObra(data.mano_obra);
                setEquipoHerramienta(data.equipo_herramienta);
                console.log(data)
            })
            .catch((err)=>{
                console.log("Error fetching Listados",err);
            });
    }

    const updateMateriales=(id,field,value)=>{
        fieldUpdater("Material",id,field,value)
        let updatedMateriales=[...materiales]

        updatedMateriales.forEach((material)=>{

            if (material.id===id){
                material[field]=value
            }
        })
        setMateriales(updatedMateriales)
    }

    const updateManoObra=(id,field,value)=>{
        fieldUpdater("ManoObra",id,field,value)
        let updatedManoObra=[...manoObra]

        updatedManoObra.forEach((manoO)=>{

            if (manoO.id===id){
                manoO[field]=value
            }
        })
        setManoObra(updatedManoObra)
    }

    const updateEquipoHerramienta=(id,field,value)=>{
        fieldUpdater("EquipoHerramienta",id,field,value)
        let updatedEquipoHerramienta=[...equipoHerramienta]

        updatedEquipoHerramienta.forEach((equipoH)=>{

            if (equipoH.id===id){
                equipoH[field]=value
            }
        })
        setEquipoHerramienta(updatedEquipoHerramienta)
    }


    const getInsumoTable =()=>{
        switch (insumo){
            case "materiales":
                return <table>
                            <thead>
                                <tr>
                                    {columnas.materiales.map((col) => (
                                        <th key={col}> <strong>{col}</strong></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    materiales.map((insumo, i) => (
                                        <tr key={i}>
                                            <td><input value={insumo.clave} onChange={(e)=>updateMateriales(insumo.id,"clave",e.target.value)}/></td>
                                            <td><textarea value={insumo.descripcion} onChange={(e)=>updateMateriales(insumo.id,"descripcion",e.target.value)}/></td>
                                            <td>{insumo.cantidad_total}</td>
                                            <td><input value={insumo.unidad} onChange={(e)=>updateMateriales(insumo.id,"unidad",e.target.value)}/></td>
                                            <td>$<input value={insumo.costoUnitario} onChange={(e)=>updateMateriales(insumo.id,"costoUnitario",e.target.value)} type="number" min="0"/></td>
                                            <td>{formatter.format((insumo.costoUnitario*insumo.cantidad_total).toFixed(2))}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
            case "mano_obra":
                return <table>
                            <thead>
                                <tr>
                                    {columnas.mano_obra.map((col) => (
                                        <th key={col}> <strong>{col}</strong></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    manoObra.map((insumo, i) => (
                                        <tr key={i}>
                                            <td><input value={insumo.clave} onChange={(e)=>updateManoObra(insumo.id,"clave",e.target.value)}/></td>
                                            <td><textarea value={insumo.descripcion} onChange={(e)=>updateManoObra(insumo.id,"descripcion",e.target.value)}/></td>
                                            <td>{insumo.cantidad_total}</td>
                                            <td><input value={insumo.unidad} onChange={(e)=>updateManoObra(insumo.id,"unidad",e.target.value)}/></td>
                                            <td>$<input value={insumo.salario} onChange={(e)=>updateManoObra(insumo.id,"salario",e.target.value)} type="number" min="0"/></td>
                                            <td>{formatter.format((insumo.salario*insumo.cantidad_total).toFixed(2))}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
            case "equipo_herramienta":
                return <table>
                            <thead>
                                <tr>
                                    {columnas.equipo_herramienta.map((col) => (
                                        <th key={col}> <strong>{col}</strong></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    equipoHerramienta.map((insumo, i) => (
                                        <tr key={i}>
                                            <td><input value={insumo.clave} onChange={(e)=>updateEquipoHerramienta(insumo.id,"clave",e.target.value)}/></td>
                                            <td><textarea value={insumo.descripcion} onChange={(e)=>updateEquipoHerramienta(insumo.id,"descripcion",e.target.value)}/></td>
                                            <td>{insumo.cantidad_total}</td>
                                            <td><input value={insumo.unidad} onChange={(e)=>updateEquipoHerramienta(insumo.id,"unidad",e.target.value)}/></td>
                                            <td>$<input value={insumo.costoUnitario} onChange={(e)=>updateEquipoHerramienta(insumo.id,"costoUnitario",e.target.value)} type="number" min="0"/></td>
                                            <td>{formatter.format((insumo.costoUnitario*insumo.cantidad_total).toFixed(2))}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>

        }
    }


    const getInsumoTitle=()=>{
        switch (insumo){
            case "materiales":
                return "Materiales"
            case "mano_obra":
                return "Mano de Obra"
            case "equipo_herramienta":
                return "Equipo & Herramienta"
        }
    }
    


    return(
        <div>
            <h2>{getInsumoTitle()}</h2>
            {getInsumoTable()}

            
        </div>

        

    
        
    )

}
export default Listados