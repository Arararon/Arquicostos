import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import api from "../api";
import ConceptosTable from "./IsumoTable";

import '../styles/catalogo.css'
function Catalogo({obra, partida}) {
    return (
        <div className="catalogo-container">
            <h2>Catalogo de Conceptos</h2>
            <h3>Obra id:{obra}</h3>
            <h3>Subpartida: {partida}</h3>
            {partida<0?"":
                <ConceptosTable obra={obra} partida={partida} />}
        </div>
    )
}

export default Catalogo