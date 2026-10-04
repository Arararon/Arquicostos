import { useEffect, useState } from "react"
import { CollapsableMenu, Menu, MenuItem } from "../components/Menu"
import api from "../api";
import Drawer from "../components/Drawer";
import PartidaForm from "../components/PartidaForm";
function CatalogoMenu({ obra,handeleNavigate }) {
    const [partidas, setPartidas] = useState([])
    
    useEffect(() => {
        getPartidas();
    }, []);

    const getPartidas = async () => {
        await api
            .get(`/api/obras/${obra}/listaPartidas/`)
            .then((res) => res.data)
            .then(data => {
                setPartidas(data)
                console.log(data)
            })
            .catch((err) => alert(err));
    }

    const createPartida = async (nombre,subpartida,parentId) => {
            await api
            .post('/api/partidas/', {
                nombre: nombre,
                obra:obra
            }).then(res => {
                if (res.status === 201) {
                    if (subpartida) {
                        api.post(`/api/obras/${obra}/partidas/`, {
                            partidaPadre: parentId,
                            partidaHijo: res.data.id,
                            obra:obra
                        })
                            .then((res) => {
                                if (res.status === 201) {
                                    alert("sub-partida Creada")
                                }
                                else alert("Fallo al vincular Partidas");
                            })
                    }
                    else {
                        alert("Partida Creada")
                    }
                getPartidas();
            }
            else alert("Falló al Crear Partida")
        })
            .catch((err) => alert(err)); 
        
        
    }
    
    return <Menu>
        <MenuItem title={"Home"} onMenuClick={e=>handeleNavigate("home") } />
        <MenuItem title={"Catálogo"} onMenuClick={e=>console.log(e) } />
        <CollapsableMenu title={"Insumos"}>
            <MenuItem title={"Materiales"} onMenuClick={e=>console.log(e) }/>
            <MenuItem title={"Mano de Obra"} onMenuClick={e => console.log(e)} />
            <MenuItem title={"Equipo y Herramienta"} onMenuClick={e => console.log(e)} />            
        </CollapsableMenu>
        <CollapsableMenu title={"Partidas"}>
            {partidas.map((partida) => (
                <CollapsableMenu key={`partidas${partida.id}`} title={partida.nombre} onMenuClick={e => console.log(`partida no:${partida.id}`)} >{
                    partida.hijos.map((subpartida) => (
                        <MenuItem key={`subpartida-${subpartida.id}`} title={subpartida.nombre} onMenuClick={e=>console.log(e) }/>
                    ))
                }
                    <Drawer
                        title={"Crear Sub-Partida"}
                        button={<MenuItem title={"+ Crear Sub-Partida"} onMenuClick={e => console.log(e)} />}>
                        
                        <PartidaForm method={"edit"} handlePartida={(e,nombre)=>createPartida(nombre,true,partida.id)  } />
                        
                    </Drawer>
                </CollapsableMenu>
            ))}
            <Drawer
                title={"Crear Partida"}
                button={<MenuItem title={"+ Crear Partida"} onMenuClick={e => console.log(e)} />}>
                
                <PartidaForm method={"create"} handlePartida={(e,nombre)=>createPartida(nombre,false,null)  } />
                
            </Drawer>
        </CollapsableMenu>
        
    </Menu>
}

export default CatalogoMenu