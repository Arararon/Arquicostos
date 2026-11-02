import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import api from "../api";
import PartidasTree from "../components_legacy/PartidasTree";
import ConceptosTable from "../tools/IsumoTable";
import "../style/catalogo.css"



function Catalogo(props){

    const{obraId}=useParams();
    const[partidas,setPartidas]=useState([]);
    const [partidaActual, setPartidaActual] = useState(-1);

    useEffect(() => {
        getPartidas();
    }, []);

    const getPartidas = async () => {
        api
            .get(`/api/obras/${obraId}/listaPartidas/`)
            .then((res) => res.data)
            .then((data) => {
                setPartidas(data);
            })
            .catch((err) => {
                console.error("Error fetching partidas:", err);
            });
    };

    const crearSubPartida = (id) => {
        api
.post(`/api/obras/${obraId}/partidas/`, { nombre: "nueva sub-Partida", obra: obraId })
            .then((res) => {
                if (res.status === 201) {
                    api
                    .post(`/api/obras/${obraId}/parentpartidas/`, {partidaPadre:id,partidaHijo:res.data.id , obra: obraId })
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
    
    const crearPartida = () => {
    
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

    return(
        <section className="catalogolayout">
            <div className="sidebar">
                {partidas.length<1?"No hay partidas para mostrar":
                <PartidasTree partidas={partidas} 
                    selectPartida={(e)=>{setPartidaActual(e)}}
                    crearPartida={(e)=>{crearPartida()}}
                    crearSubPartida={(e)=>{crearSubPartida(e)}}/>}

                <h2>Opreaciones</h2>

                <a href={`/Listados/${obraId}`}>Listados</a>
            </div>
            <div className="catalogoBody">
                <h2>Catalogo</h2>

                {partidaActual<0?"":
                <ConceptosTable obraID={obraId} partidaID={partidaActual} />}
                </div>
        </section>

    )

}
export default Catalogo