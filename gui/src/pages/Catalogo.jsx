import React, {useEffect, Fragment,} from "react";
import api from "../api";
import {Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,

} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "../styles/catalog.css";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});


function getCostoUnitarioConcepto (concepto){
    let totalMateriales = concepto.materiales.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
    let totalManoObra = concepto.mano_obra.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
    let totalEquipoHerramienta = concepto.equipo_herramienta.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
    return formatter.format((totalMateriales + totalManoObra + totalEquipoHerramienta).toFixed(2));
}
  
function getTotalConceptos (concepto) {
    let totalMateriales = concepto.materiales.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
    let totalManoObra = concepto.mano_obra.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
    let totalEquipoHerramienta = concepto.equipo_herramienta.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
    return formatter.format(((totalMateriales + totalManoObra + totalEquipoHerramienta)*concepto.cantidad).toFixed(2));
}

function getsubtotal(insumo, concepto) {
    if (insumo === "materiales") {
      //debo volver el subtotal de materiales que es una suma de cantidades * costo unitario contenida en la lista concepto
      
      let subtotalMateriales = concepto.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
      return formatter.format(subtotalMateriales.toFixed(2));
      
    } else if (insumo === "mano_obra") {
      let subtotalManoObra = concepto.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
      return formatter.format(subtotalManoObra.toFixed(2));
    } else if (insumo === "equipo_herramienta") {
      let subtotalEquipoHerramienta = concepto.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
      return formatter.format(subtotalEquipoHerramienta.toFixed(2));
    }
    
    return formatter.format(0);
      
}

function Row(props) {
  const { row, onChange, onCopy,onDelete } = props;
  const [open, setOpen] = React.useState(false);
  const handleChange = (event,id,type,field) => {
    onChange(event,id,type,field);
  };
  const handleCopy = (event) => {
    event.preventDefault();
    onCopy(row);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(row.id);
  }


  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton variant="contained" color="secondary" onClick={handleCopy}><ContentCopyIcon/></IconButton>
          <IconButton variant="contained" color="error" onClick={handleDelete}>X</IconButton>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th">{row.concepto}</TableCell>
        <TableCell>{row.descripcion}</TableCell>
        <TableCell>{row.cantidad}</TableCell>
        <TableCell>{getCostoUnitarioConcepto(row)}</TableCell>
        <TableCell>{getTotalConceptos(row)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Materiales
              </Typography>
              <InsumoTable concepto={row} rows={row.materiales} tipo="materiales" onChange={(e,id,type,field)=>handleChange(e,id,type,field)} />
              <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: 2 }}>
                Mano de Obra
              </Typography>
              <InsumoTable concepto={row} rows={row.mano_obra} tipo="mano_obra" onChange={(e,id,type,field)=>handleChange(e,id,type,field)} />
              <Typography variant="h6" gutterBottom component="div" sx={{ marginTop: 2 }}>
                Equipo y Herramienta
              </Typography>
              <InsumoTable concepto={row} rows={row.equipo_herramienta} tipo="equipo_herramienta" onChange={(e,id,type,field)=>handleChange(e,id,type,field)}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>      
  );
}

function InsumoTable(props) {
  const { concepto,rows,tipo, onChange } = props;
  const columnas = {
    materiales: ["Operación","Clave", "Descripción", "Cantidad", "Unidad", "Costo Unitario", "Total"],
    mano_obra: ["Operación","Clave", "Descripción", "Cantidad", "Unidad", "Salario", "Total"],
    equipo_herramienta: ["Operación","Clave", "Descripción", "Cantidad", "Unidad","Costo Unitario", "Total"]
  };

  const handleChange = (event,id,type,field) => {
    onChange(event,id,type,field);
  };

  const selectInsumoRow = (tipo, row) => {
    switch (tipo) { 
      case "materiales":
        return <MaterialRow row={row} onChange={(e, id, type, field) => { handleChange(e, id, type, field) }} />;
      case "mano_obra":
        return <ManoObraRow row={row} onChange={(e, id, type, field) => { handleChange(e, id, type, field) }} />;
      case "equipo_herramienta":  
        return <EquipoHerramientaRow row={row} onChange={(e, id, type, field) => { handleChange(e, id, type, field) }} />;
      default:
        return null;
    }
  };

  const getTituloInsumo = (tipo) => {
    switch (tipo) {
      case "materiales":
        return "Materiales";
      case "mano_obra":
        return "Mano de Obra";
      case "equipo_herramienta":
        return "Equipo y Herramienta";
      default:
        return "";
    }
  };


  const addInsumo=(concepto)=>{
    switch (tipo) {
      case "materiales":
        api
      .post(`/api/obras/${concepto.obra}/materiales/`, {
        clave: "Nuevo Material",
        descripcion: "descripción",
        unidad:"pza",
        costoUnitario:1.00,
        clasificacion:"a",
        colocado:true,
        obra:concepto.obra
      })
      .then((res3) => {
          if (res3.status === 201) {
            api
              .post(`/api/obras/${concepto.obra}/materiales_concepto/`, {
                "concepto": concepto.id,
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
              
          }
          else alert("Fallo al vincular Partidas");
      })
      break;     



      case "mano_obra":
        api
      .post(`/api/obras/${obraId}/conceptos/${partidaId}/`, {
        concepto: "Nuevo Concepto",
        descripcion: "descripción",
        cantidad: 1,
        obra:obraId,
        partida: partidaId,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Creado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
      break;  
        


      case "equipo_herramienta":
        api
      .post(`/api/obras/${obraId}/conceptos/${partidaId}/`, {
        concepto: "Nuevo Concepto",
        descripcion: "descripción",
        cantidad: 1,
        obra:obraId,
        partida: partidaId,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Creado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
      break;  
      

      default:
      break;  
      
    }
  }

  return (
    <Fragment>
    <Table>
      <TableHead>
        <TableRow>  
          {columnas[tipo].map((col) => (
            <TableCell key={col}> <strong>{col}</strong></TableCell>
          ))}
        </TableRow>
      </TableHead>
        <TableBody >
          {rows.map((row, i) => (
            <TableRow key={i}>
              {selectInsumoRow(tipo, row)}
            </TableRow>
          ))}
          <TableRow>
          <TableCell colSpan={4} ><Button variant="contained" onClick={()=>{addInsumo(concepto)}} startIcon={<AddIcon />}>Agregar {getTituloInsumo(tipo)} </Button></TableCell>
          <TableCell colSpan={2}><strong>SubTotal {getTituloInsumo(tipo)}:</strong></TableCell>
          <TableCell>{getsubtotal(tipo,rows)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </Fragment>

  );

}

function MaterialRow(props) {
  const { row, onChange } = props;

  const handleChange = (event,id,field) => {
    onChange(event,id,"materiales",field);
  };

  return (
  <Fragment>
      <TableCell/>
      <TableCell><input value={row.material_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave")}/></TableCell>
      <TableCell><textarea value={row.material_detalle.descripcion} onChange={(e)=>handleChange(e,row.id,"descripcion")}/></TableCell>
      <TableCell ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad")}/></TableCell>
      <TableCell ><input value={row.material_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad")}/></TableCell>
      <TableCell ><div className="costo-wrap">$<input value={(row.material_detalle.costoUnitario)} type="number" step="0.01" min="0" onChange={(e)=>handleChange(e,row.id,"costoUnitario")}/></div></TableCell>
      <TableCell >{formatter.format((row.cantidad * row.material_detalle.costoUnitario).toFixed(2))}</TableCell>
    </Fragment>  
  );
}

function ManoObraRow(props) {
  const { row, onChange } = props;
  const handleChange = (event, id, field) => {
    onChange(event, id, "mano_obra", field);
  };
  return (
    <Fragment>
      <TableCell/>
      <TableCell><input value={row.mano_obra_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave")}/></TableCell>
      <TableCell><textarea value={row.mano_obra_detalle.descripcion} onChange={(e) => handleChange(e, row.id, "descripcion")} /></TableCell>
      <TableCell ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad")}/></TableCell>
      <TableCell ><input value={row.mano_obra_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad")} /></TableCell>
      <TableCell ><div className="costo-wrap">$<input value={(row.mano_obra_detalle.salario)} type="number" min="0" step="0.01" onChange={(e)=>handleChange(e,row.id,"salario")} /></div></TableCell>
      <TableCell >{formatter.format((row.cantidad * row.mano_obra_detalle.salario).toFixed(2))}</TableCell>
    </Fragment>
  );
}

function EquipoHerramientaRow(props) {
  const { row, onChange } = props;
  const handleChange = (event, id, field) => {
    onChange(event, id, "equipo_herramienta", field);
  }
  return (
    <Fragment>
      <TableCell/>
      <TableCell><input value={row.equipo_herramienta_detalle.clave} onChange={(e)=>handleChange(e,row.id,"clave")}/></TableCell>
      <TableCell><textarea value={row.equipo_herramienta_detalle.descripcion} onChange={(e) => handleChange(e, row.id, "descripcion")} /></TableCell>
      <TableCell ><input value={row.cantidad} type="number" min="0" onChange={(e)=>handleChange(e,row.id,"cantidad")}/></TableCell>
      <TableCell ><input value={row.equipo_herramienta_detalle.unidad} onChange={(e)=>handleChange(e,row.id,"unidad")}/></TableCell>
      <TableCell ><div className="costo-wrap">$<input value={(row.equipo_herramienta_detalle.costoUnitario)} type="number" min="0" step="0.01" onChange={(e)=>handleChange(e,row.id,"costoUnitario")} /></div></TableCell>
      <TableCell >{formatter.format((row.cantidad * row.equipo_herramienta_detalle.costoUnitario).toFixed(2))}</TableCell>
    </Fragment>
  );
}


function Catalogo(props)
{
  const { obraId, partidaId } = props;
  const [conceptos, setConceptos] = React.useState([]);
  const [materiales, setMateriales] = React.useState([]);
  const [manoObra, setManoObra] = React.useState([]);
  const [equipoHerramienta, setEquipoHerramienta] = React.useState([]);


  useEffect(() => {
    getConceptos();
  }, []);


useEffect(() => {
    getConceptos();
  }, [partidaId]);
  
  const getConceptos = () => {

    if (partidaId !== "") {
      api
            .get(`/api/obras/${obraId}/conceptos/${partidaId}/`)
            .then((res) => res.data)
            .then((data) => {
              setConceptos(data);
              console.log(data)
              const materialList = [];
              const manoObraList = [];
              const equipoHerramientaList = [];
              data.forEach((concepto) => {
                materialList.push(...concepto.materiales);
                manoObraList.push(...concepto.mano_obra);
                equipoHerramientaList.push(...concepto.equipo_herramienta);
              }
              );
              setMateriales(materialList);
              setManoObra(manoObraList);
              setEquipoHerramienta(equipoHerramientaList);
            })
            .catch((err) => alert(err));
    }        
  };
  

  const createConcepto = () => {
    api
      .post(`/api/obras/${obraId}/conceptos/${partidaId}/`, {
        concepto: "Nuevo Concepto",
        descripcion: "descripción",
        cantidad: 1,
        obra:obraId,
        partida: partidaId,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Creado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
  }


    const duplicateConcepto = (concepto) => {
    api
      .post(`/api/obras/${obraId}/conceptos/${partidaId}/`, {
        concepto: concepto.concepto,
        descripcion: concepto.descripcion,
        cantidad: concepto.cantidad,
        obra:obraId,
        partida: partidaId,
      })
      .then((res3) => {
          if (res3.status === 201) {
              alert("Concepto Duplicado")
              getConceptos();
          }
          else alert("Fallo al vincular Partidas");
      })
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



  const setInsumo = (tipo, lista) => {
    if (tipo === "material") {
      const listaMateriales = []
      lista.forEach((concepto) => {
        listaMateriales.push(...concepto.materiales);
      }
      );
      setMateriales(listaMateriales);
    } else if (tipo === "mano_obra") {
      const listaManoObra = []
      lista.forEach((concepto) => {
        listaManoObra.push(...concepto.mano_obra);
      } 
      );
      setManoObra(listaManoObra);
    }
    else if (tipo === "equipo_herramienta") {
      const listaEquipoHerramienta = []
      lista.forEach((concepto) => {
        listaEquipoHerramienta.push(...concepto.equipo_herramienta);
      }
      );
      setEquipoHerramienta(listaEquipoHerramienta);
    }   
  };
  
  const updateMaterial = (rowIndex, row, field, value) => {
    let updatedConceptos = [...conceptos];

    updatedConceptos.forEach((concepto)=>{
      if(concepto.id===rowIndex){
        concepto.materiales.forEach((material, j) => {
          if (field === "cantidad") {
            concepto.materiales[j].cantidad = value;
          }
          else if (material.id === row) {
            concepto.materiales[j].material_detalle[field] = value;
          }
        });
      }
    })
    setConceptos(updatedConceptos);
    setInsumo("material",updatedConceptos);
  };

  const updateManoObra = (rowIndex, row, field, value) => {
    let updatedConceptos = [...conceptos];
    updatedConceptos.forEach((concepto) => {
      if (concepto.id === rowIndex) {
        concepto.mano_obra.forEach((manoObra, j) => {
          if (field === "cantidad") {
            concepto.mano_obra[j].cantidad = value;
          }
          else if (manoObra.id === row) {
            concepto.mano_obra[j].mano_obra_detalle[field] = value;
          }
        });
      }
      
    });
    setConceptos(updatedConceptos);
    setInsumo("mano_obra",updatedConceptos);
  }
  
  const updateEquipoHerramienta = (rowIndex, row, field, value) => {
    let updatedConceptos = [...conceptos];
    updatedConceptos.forEach((concepto) => {
      if (concepto.id === rowIndex) {
        concepto.equipo_herramienta.forEach((equipoHerramienta, j) => {
          if (field === "cantidad") {
            concepto.equipo_herramienta[j].cantidad = value;
          }
          else if (equipoHerramienta.id === row) {
            concepto.equipo_herramienta[j].equipo_herramienta_detalle[field] = value;
          }
        }
        );
      }
      
    });
    setConceptos(updatedConceptos);
    setInsumo("equipo_herramienta",updatedConceptos);
  }

  const updateInsumo = (insumo, index, field, value, type) => {
    switch (type) {
      case "materiales":
        updateMaterial(insumo.id,index, field, value);
        break;
      case "mano_obra":
        updateManoObra(insumo.id,index, field, value);
        break;
      case "equipo_herramienta":
        updateEquipoHerramienta(insumo.id,index, field, value);
        break;
      default:
        break;
    }
  }

  const getTotalConceptos = () => {
    let total = 0;
    conceptos.forEach((concepto) => {
      let totalMateriales = concepto.materiales.reduce((sum, item) => sum + (item.cantidad * item.material_detalle.costoUnitario), 0);
      let totalManoObra = concepto.mano_obra.reduce((sum, item) => sum + (item.cantidad * item.mano_obra_detalle.salario), 0);
      let totalEquipoHerramienta = concepto.equipo_herramienta.reduce((sum, item) => sum + (item.cantidad * item.equipo_herramienta_detalle.costoUnitario), 0);
      total += (totalMateriales + totalManoObra + totalEquipoHerramienta) * concepto.cantidad;
    }
    );
    return formatter.format(total.toFixed(2));
  }
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Catálogo de Conceptos
      </Typography>
      <div style={{ width: "90%", margin: "auto", marginTop: "2rem" }}>
      
      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
            <TableCell ><strong>Operación</strong></TableCell>
            <TableCell><strong>Clave</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
            <TableCell><strong>Cantidad</strong></TableCell>
            <TableCell><strong>Precio Unitario</strong></TableCell>
            <TableCell ><strong>Total</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conceptos.map((row) => (
            <Row key={row.id} row={row} 
              onChange={(e, id, type, field) => { updateInsumo(row, id, field, e.target.value, type) }}

              onCopy={(row) => {
                duplicateConcepto(row)
              }}


              
              
              onDelete={(id) => {
                deleteConcepto(id)
              }}
            />
          ))}
              <TableRow>
          <TableCell colSpan={3} />
          <TableCell colSpan={2}><strong>Total Conceptos</strong></TableCell>
          <TableCell>{getTotalConceptos()}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
        </TableContainer>

        <Button variant="contained"
          startIcon={<AddIcon />}
          sx={{ mb: 1, marginTop: 2 }}
          onClick={() => {createConcepto()
          }
        }
        >Agregar Concepto</Button>
        </div>
    </div>
  ); 
}

export default Catalogo;
