import "../style/partidasTree.css"
import { useState } from "react";

function PartidasTree({partidas,selectPartida,crearPartida,crearSubPartida}){

    return(
        <div>
            <h2>Partidas</h2>
            <ul className="partidasTree">
                {partidas.map((partida)=>(
                    <PartidasParent key={partida.id} partida={partida} 
                        selectPartida={selectPartida} 
                        crearSubPartida={(e)=>{crearSubPartida(partida.id)}}/>
                ))}
                <li onDoubleClick={(e)=>{crearPartida()}}>+ Crear Partida</li>
            </ul>
        </div>
    )
}

function PartidasParent({partida,selectPartida,crearSubPartida}){

    const [open,setOpen]=useState(false);


    const handleClick=()=>{
        setOpen(!open)
    }

    return(
        <li>
            <span className={open?"caret-down":"caret"} onClick={(e)=>{handleClick()}}>{partida.nombre}</span>
                <ul className={open?"active":"nested"}>
                    {partida.hijos.map((hijo)=>(
                        <li onClick={(e)=>{selectPartida(hijo.id)}} key={hijo.id}> {hijo.nombre}</li>
                    ))}
                    <li onDoubleClick={(e)=>{crearSubPartida()}}>+ Crear Sub-Partida</li>
                </ul>
        </li>

    )
}

export default PartidasTree;