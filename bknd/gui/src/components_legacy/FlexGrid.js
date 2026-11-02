import "../style/flexgrid.css"
import ObraCard from "./ObraCard"

function FlexGrid({titulo,obras,handleVerMas,handleDuplicate,handleDelete,handleGrupos}){
    return(
        <div>
            <h2>{titulo}</h2>
                <section className="flexgrid-layout">
                    {obras.map((obra)=>(
                        <ObraCard obra={obra} key={obra.id}
                        handleVerMas={()=>{handleVerMas(obra.id)}}
                        handleDuplicate={()=>{handleDuplicate(obra)}}
                        handleDelete={()=>{handleDelete(obra.id)}}
                        handleGrupos={()=>{handleGrupos(obra.id)}}/>
                    ))}
                </section>
        </div>
    )
}
export default FlexGrid