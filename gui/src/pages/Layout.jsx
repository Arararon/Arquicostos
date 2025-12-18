import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import api from "../api";
import Catalogo from "./Catalogo";

function MainLayout() {
    
    const { obraId } = useParams();
    const [treeData, setTreeData] = useState([]);
    const [currentPartida, setCurrentPartida] = useState(-1);

  // Cargar datos desde la API
useEffect(() => {
    getPartidas();
}, []);
    
    const getPartidas = async () => {
        api
            .get(`/api/obras/${obraId}/listaPartidas/`)
            .then((res) => res.data)
            .then((data) => {
                console.log("Partidas fetched:", data);
                setTreeData(data);
            })
            .catch((err) => {
                console.error("Error fetching partidas:", err);
            });
    };

    const handleDoubleClick = (e, id) => {
    
        api
                        .post(`/api/obras/${obraId}/partidas/`, { nombre: "nueva sub-Partida", obra: obraId })
                        .then((res) => {
                            if (res.status === 201) {
                                api
                                .post(`/api/obras/${obraId}/parentpartidas/`, {partidaPadre:id ,partidaHijo:res.data.id , obra: obraId })
                                .then((res3) => {
                                    if (res3.status === 201) {
                                        alert("sub-partida Creada")
                                        getPartidas();
                                    }
                                    else alert("Fallo al vincular Partidas");
                                })
                            }
                            else alert("Fallo al Crear sub-partida inicial");
                        })
    }
    

    const handleCrearPartida = (e) => {
    
        api
                        .post(`/api/obras/${obraId}/partidas/`, { nombre: "nueva Partida", obra: obraId })
                        .then((res) => {
                            if (res.status === 201) {
                                alert("Partida Creada")
                                getPartidas();
                            }
                            else alert("Fallo al Crear sub-partida inicial");
                        })
}

return (
    <Grid container sx={{ height: "100vh" }}>
    <Grid
        item
        xs={4}
        sx={{
            borderRight: "1px solid #ccc",
            backgroundColor: "#fafafa",
            p: 2,
        }}
>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Partidas
        </Typography>
            <SimpleTreeView>
                {treeData.map((partida) => (
                    <TreeItem key={partida.id} itemId={partida.id.toString()} label={partida.nombre} onClick={()=>console.log(currentPartida)}>
                        {partida.hijos && partida.hijos.map((hijo) => (
                            <TreeItem key={hijo.id} itemId={hijo.id.toString()} label={`${hijo.id} - ${hijo.nombre}`} onClick={()=>setCurrentPartida(hijo.id)}/>
                        ))}
                        <TreeItem key={`addSub${partida.id}`} itemId={`addSub${partida.id}`} label={"+ Añadir Sub-partida"} onDoubleClick={(e) => handleDoubleClick(e, partida.id)}/>
                    </TreeItem>
                ))}
                <TreeItem key={"add"} itemId={"add"} label={"+ Añadir Partida"} onDoubleClick={(e) => handleCrearPartida(e)}/>
            </SimpleTreeView>
        </Grid>

      {/* PANEL DERECHO (CONTENIDO VARIADO) */}
      
        {currentPartida<0?"":<Catalogo obraId={obraId} partidaId={currentPartida} />}
      
    </Grid>
  );
}

export default MainLayout;
