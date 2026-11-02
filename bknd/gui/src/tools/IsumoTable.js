import { useEffect,useState,Fragment } from "react";
import { FaCirclePlus, FaCircleXmark,FaCopy } from "react-icons/fa6";
import api from "../api";
import "../styles/insumostable.css"

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

function ConceptosTable({obra,partida}){
const [conceptos, setConceptos] = useState([]);
const cols=["Operación","Clave","Descripción","Cantidad","Precio Unitario","Total"]
const [timerID, setTimerID] = useState(null);

useEffect(() => {
    getConceptos();
  }, [partida]);

const fieldUpdater = (tipo,itemID,field,value) => {
  clearTimeout(timerID);
  const id = setTimeout(() => {

    switch(tipo){
        case "Concepto":
            patchConcepto(itemID,field,value)
            break;
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


/*---------------Manejar Conceptos--------------------*/
const getConceptos= async ()=>{
    if (partida > 0) {
      api
        .get(`/api/obras/${obra}/conceptos/${partida}/`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setConceptos(data);
            const materialList = [];
            const manoObraList = [];
            const equipoHerramientaList = [];
            data.forEach((concepto) => {
            materialList.push(...concepto.materiales);
            manoObraList.push(...concepto.mano_obra);
            equipoHerramientaList.push(...concepto.equipo_herramienta);
            }
            );
        })
        .catch((err) => alert(err));
    }
}

  const createConcepto = () => {
    api
      .post(`/api/obras/${obra}/conceptos/${partida}/`, {
        concepto: "Nuevo Concepto",
        descripcion: "descripción",
        cantidad: 1,
        obra:obra,
        partida: partida,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Creado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
  }

  const updateConcepto=(conceptoID,field,value)=>{
    fieldUpdater("Concepto",conceptoID,field,value)
    let updatedConceptos = [...conceptos];
    updatedConceptos.forEach((concepto)=>{
        if(concepto.id===conceptoID){
            concepto[field]=value;
        }
    })
    setConceptos(updatedConceptos);
  }

  const deleteConcepto = (id) => {
    api
    
      .delete(`/api/obras/${id}/conceptos/delete/`)
      .then((res) => {
        if (res.status === 204) alert("concepto eliminado");
        else alert("Fallo en elimiar concepto")
        getConceptos();
      })
      .catch((error) => alert(error));
  }

  const duplicateConcepto = (concepto) => {
    api
      .post(`/api/obras/${obra}/conceptos/${partida}/`, {
        concepto: concepto.concepto,
        descripcion: concepto.descripcion,
        cantidad: concepto.cantidad,
        obra:obra,
        partida: partida,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Duplicado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
  }
const patchConcepto=(id,field,value)=>{
    let newValue=field==="cantidad"?parseInt(value):value

    api
      .patch(`/api/obras/${id}/conceptos/update/`, {
        [field]: newValue,
        obra:obra
      })
      .then((res3) => {
          if (res3.status === 200) {
              console.log("Concepto Actualizado")
          }
          else alert("Fallo al vincular Partidas");
      })

  }
/*---------------Manejar Insumos--------------------*/  
  const updateMaterial = (conceptoID, insumoID, field, value,ID) => {

    fieldUpdater("Material",ID,field,value)
    let updatedConceptos = [...conceptos];

    updatedConceptos.forEach((concepto)=>{
      if(concepto.id===conceptoID){
        concepto.materiales.forEach((material, j) => {
          if (field === "cantidad" && material.id === insumoID) {
            concepto.materiales[j].cantidad = value;
          }
          else if (material.id === insumoID) {
            concepto.materiales[j].material_detalle[field] = value;
          }
        });
      }
    })
    setConceptos(updatedConceptos);
  };
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

  const updateManoObra = (conceptoID, insumoID, field, value,ID) => {
    fieldUpdater("ManoObra",ID,field,value)
    let updatedConceptos = [...conceptos];
    updatedConceptos.forEach((concepto) => {
      if (concepto.id === conceptoID) {
        concepto.mano_obra.forEach((manoObra, j) => {
          if (field === "cantidad" && manoObra.id === insumoID) {
            concepto.mano_obra[j].cantidad = value;
          }
          else if (manoObra.id === insumoID) {
            concepto.mano_obra[j].mano_obra_detalle[field] = value;
          }
        });
      }
      
    });
    setConceptos(updatedConceptos);

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
  
  const updateEquipoHerramienta = (conceptoID, insumoID, field, value,ID) => {
    fieldUpdater("EquipoHerramienta",ID,field,value)
    let updatedConceptos = [...conceptos];
    updatedConceptos.forEach((concepto) => {
      if (concepto.id === conceptoID) {
        concepto.equipo_herramienta.forEach((equipoHerramienta, j) => {
          if (field === "cantidad" && equipoHerramienta.id === insumoID) {
            concepto.equipo_herramienta[j].cantidad = value;
          }
          else if (equipoHerramienta.id === insumoID) {
            concepto.equipo_herramienta[j].equipo_herramienta_detalle[field] = value;
          }
        }
        );
      }
      
    });
    setConceptos(updatedConceptos);

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

  const updateInsumo = (conceptoID, insumoID, field, value, type,ID) => {
    switch (type) {
      case "materiales":
        updateMaterial(conceptoID,insumoID, field, value,ID);
        break;
      case "mano_obra":
        updateManoObra(conceptoID,insumoID, field, value,ID);
        break;
      case "equipo_herramienta":
        updateEquipoHerramienta(conceptoID,insumoID, field, value,ID);
        break;
      default:
        break;
    }
  }

  const addInsumo=(tipo,conceptoID)=>{
    switch (tipo) {
      case "materiales":
        api
      .post(`/api/obras/${obra}/materiales/`, {
        clave: "Nuevo Material",
        descripcion: "descripción",
        unidad:"pza",
        costoUnitario:1.00,
        clasificacion:"a",
        colocado:true,
        obra:obra
      })
      .then((res3) => {
          if (res3.status === 201) {
            api
              .post(`/api/obras/${obra}/materiales_concepto/`, {
                "concepto": conceptoID,
                "material":res3.data.id,
                "cantidad":1
              })
              .then((res3) => {
                  if (res3.status === 201) {
                      alert("Material Creado")
                  }
                  else alert("Fallo al vincular Partidas");
              })


              alert("Material Creado")
              getConceptos()
              
          }
          else alert("Fallo al vincular Partidas");
      })
      break;     

      case "mano_obra":
        api
      .post(`/api/obras/${obra}/mano_obra/`, {
        clave: "Nueva Mano de Obra",
        descripcion: "descripción",
        unidad:"jornada",
        salario:1.00,
        categoria:"a",
        obra:obra
      })
      .then((res3) => {
          if (res3.status === 201) {
            api
              .post(`/api/obras/${obra}/mano_obra_concepto/`, {
                "concepto": conceptoID,
                "mano_obra":res3.data.id,
                "cantidad":1
              })
              .then((res3) => {
                  if (res3.status === 201) {
                      alert("Mano de Obra Creada")
                  }
                  else alert("Fallo al vincular Partidas");
              })


              alert("Mano de Obra Creada")
              getConceptos()
              
          }
          else alert("Fallo al vincular Partidas");
      })
      break;  
        
      case "equipo_herramienta":
        api
      .post(`/api/obras/${obra}/equipo_herramienta/`, {
        clave: "Nuevo equipo y Heramienta",
        descripcion: "descripción",
        unidad:"PZA",
        costoUnitario:1.00,
        clasificacion:"a",
        obra:obra
      })
      .then((res3) => {
          if (res3.status === 201) {
            api
              .post(`/api/obras/${obra}/equipo_herramienta_concepto/`, {
                "concepto": conceptoID,
                "equipo_herramienta":res3.data.id,
                "cantidad":1
              })
              .then((res3) => {
                  if (res3.status === 201) {
                      alert("Equipo y Herramienta Creado")
                  }
                  else alert("Fallo al vincular Partidas");
              })
              alert("Equipo y Herramienta Creado")
              getConceptos()
              
          }
          else alert("Fallo al vincular Partidas");
      })
      break;  
      default:
      break;  
      
    }
  }

  const deleteInsumo=(tipo,insumoID)=>{
    switch(tipo){
        case "material":
            api
            .delete(`/api/obras/${insumoID}/materiales/delete/`)
                .then((res) => {
                    if (res.status === 204) alert("material eliminado");
                    else alert("Fallo en elimiar concepto")
                    getConceptos();
                })
                .catch((error) => alert(error));
            break;
        case "mano_obra":
            api
            .delete(`/api/obras/${insumoID}/mano_obra/delete/`)
                .then((res) => {
                    if (res.status === 204) alert("mano de Obra eliminada");
                    else alert("Fallo en elimiar concepto")
                    getConceptos();
                })
                .catch((error) => alert(error));
            break;
        case "equipo_herramienta":
            api
            .delete(`/api/obras/${insumoID}/equipo_herramienta/delete/`)
                .then((res) => {
                    if (res.status === 204) alert("equipo y herramienta eliminado");
                    else alert("Fallo en elimiar concepto")
                    getConceptos();
                })
                .catch((error) => alert(error));
            break;
        default:
            break;
    }

  }

  const duplicateInsumo=(tipo,insumo,conceptoID)=>{
    switch(tipo){
        case "material":
        api
            .post(`/api/obras/${obra}/materiales/`, {
                clave: insumo.material_detalle.clave,
                descripcion: insumo.material_detalle.descripcion,
                unidad:insumo.material_detalle.unidad,
                costoUnitario:insumo.material_detalle.costoUnitario,
                clasificacion:insumo.material_detalle.clasificacion,
                colocado:insumo.material_detalle.colocado,
                obra:obra
            })
            .then((res3) => {
                if (res3.status === 201) {
                    api
                    .post(`/api/obras/${obra}/materiales_concepto/`, {
                        "concepto": conceptoID,
                        "material":res3.data.id,
                        "cantidad":insumo.cantidad
                    })
                    .then((res3) => {
                        if (res3.status === 201) {
                            alert("Material Creado")
                        }
                        else alert("Fallo al vincular Partidas");
                    })
                    
                    alert("Material Creado")
                    getConceptos()
                                    
                }
                else alert("Fallo al vincular Partidas");
            })

            break;
        case "mano_obra":
            api
                .post(`/api/obras/${obra}/mano_obra/`, {
                    clave: insumo.mano_obra_detalle.clave,
                    descripcion: insumo.mano_obra_detalle.descripcion,
                    unidad:insumo.mano_obra_detalle.unidad,
                    salario:insumo.mano_obra_detalle.salario,
                    categoria:insumo.mano_obra_detalle.categoria,
                    obra:obra
                })
                .then((res3) => {
                    if (res3.status === 201) {
                        api
                        .post(`/api/obras/${obra}/mano_obra_concepto/`, {
                            "concepto": conceptoID,
                            "mano_obra":res3.data.id,
                            "cantidad":insumo.cantidad
                        })
                        .then((res3) => {
                            if (res3.status === 201) {
                                alert("Mano de Obra Creada")

                            }
                            else alert("Fallo al vincular Partidas");
                        })


                        alert("Mano de Obra Creada")
                        getConceptos()
                        
                    }
                    else alert("Fallo al vincular Partidas");
                })
                
            break;
        case "equipo_herramienta":
            api
                .post(`/api/obras/${obra}/equipo_herramienta/`, {
                    clave: insumo.equipo_herramienta_detalle.clave,
                    descripcion: insumo.equipo_herramienta_detalle.descripcion,
                    unidad:insumo.equipo_herramienta_detalle.unidad,
                    costoUnitario:insumo.equipo_herramienta_detalle.costoUnitario,
                    clasificacion:insumo.equipo_herramienta_detalle.clasificacion,
                    obra:obra
                })
                .then((res3) => {
                    if (res3.status === 201) {
                        api
                        .post(`/api/obras/${obra}/equipo_herramienta_concepto/`, {
                            "concepto": conceptoID,
                            "equipo_herramienta":res3.data.id,
                            "cantidad":insumo.cantidad
                        })
                        .then((res3) => {
                            if (res3.status === 201) {
                                alert("Equipo y Herramienta Creado")
                            }
                            else alert("Fallo al vincular Partidas");
                        })
                        alert("Equipo y Herramienta Creado")
                        getConceptos()

                        
                    }
                    else alert("Fallo al vincular Partidas");
                })

            break;
        default:
            break;
         
    }
    
  }

return(
    <table className={"insumostable"}>
        <thead>
            <tr>
                {cols.map((col)=>(<th key={col}><strong>{col}</strong></th>))}
            </tr>
        </thead>
        <tbody>
            {conceptos.map((concepto)=>(
                <ConceptoRow key={concepto.id} 
                concepto={concepto} 
                onChange={(event,id,type,field,insumoID)=>{updateInsumo(concepto.id,id,field,event.target.value,type,insumoID)}}
                handleChange={(e,id,field,)=>{updateConcepto(id,field,e.target.value)}}
                deleteConcepto={(e)=>{deleteConcepto(e)}}
                duplicateConcepto={(e)=>{duplicateConcepto(e)}}
                agregarInsumo={(tipo,conceptoID)=>{addInsumo(tipo,conceptoID)}}
                deleteInsumo={(e,insumoID)=>{deleteInsumo(e,insumoID)}}
                duplicateInsumo={(e,insumo,conceptoID)=>{duplicateInsumo(e,insumo,conceptoID)}}
                     />)
            )}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={6}>
                    <button onClick={()=>{createConcepto()}}><FaCirclePlus/> Agregar concepto </button>
                </td>
            </tr>
        </tfoot>
    </table>
)
}

function ConceptoRow({concepto,onChange,
    handleChange,deleteConcepto,duplicateConcepto,
    agregarInsumo,deleteInsumo,duplicateInsumo}){
    const insumos=[
        {titulo:"Materiales",clave:"materiales", boton:"material"}, 
        {titulo:"Mano de Obra",clave:"mano_obra",boton:"mano de obra"},
        {titulo:"Equipo y Herramienta",clave:"equipo_herramienta",boton:"equipo y herramienta"}]
    const getCostoUnitarioConcepto =()=>{
        let totalMateriales = concepto.materiales.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
        let totalManoObra = concepto.mano_obra.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
        let totalEquipoHerramienta = concepto.equipo_herramienta.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
        return formatter.format((totalMateriales + totalManoObra + totalEquipoHerramienta).toFixed(2));
    }
    const getTotalConceptos =()=> {
        let totalMateriales = concepto.materiales.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
        let totalManoObra = concepto.mano_obra.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
        let totalEquipoHerramienta = concepto.equipo_herramienta.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
        return formatter.format(((totalMateriales + totalManoObra + totalEquipoHerramienta)*concepto.cantidad).toFixed(2));
    }
    const getInsumos=(insumo)=>{
        switch (insumo){
            case "Materiales":
                return concepto.materiales
            case "Mano de Obra":
                return concepto.mano_obra
            case "Equipo y Herramienta":
                return concepto.equipo_herramienta
            default:
                return []
        }
    }

    return(
        <Fragment>
            <tr className={"conceptoRow"}>
                <td>
                    <button onClick={()=>{deleteConcepto(concepto.id)}}><FaCircleXmark/> </button>
                    <button onClick={()=>{duplicateConcepto(concepto)}}><FaCopy/> </button>
                </td>
                <td><input value={concepto.concepto} onChange={(e)=>handleChange(e,concepto.id,"concepto")}/></td>
                <td><textarea value={concepto.descripcion} onChange={(e)=>handleChange(e,concepto.id,"descripcion")}/></td>
                <td><input value={concepto.cantidad} type="number" onChange={(e)=>handleChange(e,concepto.id,"cantidad")}/></td>
                <td>{getCostoUnitarioConcepto()}</td>
                <td>{getTotalConceptos()}</td>
            </tr>
            {insumos.map((insumo)=>(
                <tr key={`${insumo.clave}-${concepto.id}`}><td colSpan={6}>
                        <details>
                            <summary>{insumo.titulo}</summary>
                            <button onClick={()=>{agregarInsumo(insumo.clave,concepto.id)}}><FaCirclePlus/> Nuevo {insumo.boton} </button>
                            <InsumoTable tipo={insumo.clave} insumos={getInsumos(insumo.titulo)} 
                            onChange={(event,id,type,field,insumoID)=>{onChange(event,id,type,field,insumoID)}}
                            deleteInsumo={(e,insumoID)=>{deleteInsumo(e,insumoID)}}
                            duplicateInsumo={(e,insumo)=>{duplicateInsumo(e,insumo,concepto.id)}}/>
                        </details>
                    </td>
                </tr>
            ))}
        </Fragment>
    )
}


function InsumoTable({insumos,tipo,onChange,deleteInsumo,duplicateInsumo}){

    const columnas = {
        materiales: ["Operación","Clave", "Descripción", "Cantidad", "Unidad", "Costo Unitario", "Total"],
        mano_obra: ["Operación","Clave", "Descripción", "Cantidad", "Unidad", "Salario", "Total"],
        equipo_herramienta: ["Operación","Clave", "Descripción", "Cantidad", "Unidad","Costo Unitario", "Total"]
    };

    const handleChange = (event,id,type,field,insumoID) => {
    onChange(event,id,type,field,insumoID);
  };


     const selectInsumoRow = (tipo, row) => {
    switch (tipo) { 
      case "materiales":
        return <MaterialRow row={row} onChange={(e, id, type, field,insumoID) => { handleChange(e, id, type, field, insumoID) }} 
        deleteInsumo={(e,insumoID)=>{deleteInsumo(e,insumoID)}}
        duplicateInsumo={(e,insumo)=>{duplicateInsumo(e,insumo)}}/>;
      case "mano_obra":
        return <ManoObraRow row={row} onChange={(e, id, type, field,insumoID) => { handleChange(e, id, type, field, insumoID) }} 
        deleteInsumo={(e,insumoID)=>{deleteInsumo(e,insumoID)}}
        duplicateInsumo={(e,insumo)=>{duplicateInsumo(e,insumo)}}/>;
      case "equipo_herramienta":  
        return <EquipoHerramientaRow row={row} onChange={(e, id, type, field,insumoID) => { handleChange(e, id, type,field, insumoID) }} 
        deleteInsumo={(e,insumoID)=>{deleteInsumo(e,insumoID)}}
        duplicateInsumo={(e,insumo)=>{duplicateInsumo(e,insumo)}}/>;
      default:
        return null;
    }
  };

    return(
        <table>
            <thead>
                <tr>
                    {columnas[tipo].map((col) => (
                        <th key={col}> <strong>{col}</strong></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {insumos.map((row, i) => (
                    <tr key={i}>
                    {selectInsumoRow(tipo, row)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
       
}


function MaterialRow({row,onChange,deleteInsumo,duplicateInsumo}){

    const handleChange = (event,id,field,InsumoID) => {
        onChange(event,id,"materiales",field,InsumoID);
    };
    

    return(
        <Fragment>
            <td>
                <button onClick={(e)=>{deleteInsumo("material",row.material)}}><FaCircleXmark/> </button>
                <button onClick={(e)=>{duplicateInsumo("material",row)}}><FaCopy/> </button>
            </td>
            <td><input value={row.material_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave",row.material)}/></td>
            <td><textarea value={row.material_detalle.descripcion} onChange={(e)=>handleChange(e,row.id,"descripcion",row.material)}/></td>
            <td ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad",row.material)}/></td>
            <td ><input value={row.material_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad",row.material)}/></td>
            <td ><div className="costo-wrap"  onClick={(e)=>{console.log(row)}}>$<input value={(row.material_detalle.costoUnitario)} type="number" step="0.01" min="0" onChange={(e)=>handleChange(e,row.id,"costoUnitario",row.material)}/></div></td>
            <td>{formatter.format((row.cantidad * row.material_detalle.costoUnitario).toFixed(2))}</td>
        </Fragment>
    )

}



function ManoObraRow({row,onChange,deleteInsumo,duplicateInsumo}){
    
    const handleChange = (event, id, field,InsumoID) => {
        onChange(event, id, "mano_obra", field,InsumoID);
    };

    return(
        <Fragment>
            <td>
                <button onClick={(e)=>{deleteInsumo("mano_obra",row.mano_obra)}}><i className="material-icons">delete</i></button>
                <button onClick={(e)=>{duplicateInsumo("mano_obra",row)}}><i className="material-icons">content_copy</i></button>
            </td>
            <td><input value={row.mano_obra_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave",row.mano_obra)}/></td>
            <td><textarea value={row.mano_obra_detalle.descripcion} onChange={(e) => handleChange(e, row.id, "descripcion",row.mano_obra)} /></td>
            <td ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad",row.mano_obra)}/></td>
            <td ><input value={row.mano_obra_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad",row.mano_obra)} /></td>
            <td ><div className="costo-wrap">$<input value={(row.mano_obra_detalle.salario)} type="number" min="0" step="0.01" onChange={(e)=>handleChange(e,row.id,"salario",row.mano_obra)} /></div></td>
            <td >{formatter.format((row.cantidad * row.mano_obra_detalle.salario).toFixed(2))}</td>
        </Fragment>
    )

}


function EquipoHerramientaRow({row,onChange,deleteInsumo,duplicateInsumo}){

    const handleChange = (event, id, field,InsumoID) => {
        onChange(event, id, "equipo_herramienta", field,InsumoID);
    }

    return(
        <Fragment>

            <td>
                <button onClick={(e)=>{deleteInsumo("equipo_herramienta",row.equipo_herramienta)}}><i className="material-icons">delete</i></button>
                <button onClick={(e)=>{duplicateInsumo("equipo_herramienta",row)}}><i className="material-icons">content_copy</i></button>
            </td>
            <td><input value={row.equipo_herramienta_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave",row.equipo_herramienta)}/></td>
            <td><textarea value={row.equipo_herramienta_detalle.descripcion} onChange={(e) => handleChange(e, row.id, "descripcion",row.equipo_herramienta)} /></td>
            <td ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad",row.equipo_herramienta)}/></td>
            <td ><input value={row.equipo_herramienta_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad",row.equipo_herramienta)}/></td>
            <td ><div className="costo-wrap">$<input value={(row.equipo_herramienta_detalle.costoUnitario)} type="number" min="0" step="0.01" onChange={(e)=>handleChange(e,row.id,"costoUnitario",row.equipo_herramienta)} /></div></td>
            <td >{formatter.format((row.cantidad * row.equipo_herramienta_detalle.costoUnitario).toFixed(2))}</td>
        </Fragment>
    )

}

export default ConceptosTable