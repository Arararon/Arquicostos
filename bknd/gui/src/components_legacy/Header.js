import "../style/header.css"

function Header(){
    return(
        <section className="headerlayout">
            <div><h1>Arquicostos</h1></div>
            <div className="marginLeft"><a href="">Cuenta</a></div>
            <div><a href="/logout"><button>Salir</button></a></div>
        </section>
    )
}
export default Header