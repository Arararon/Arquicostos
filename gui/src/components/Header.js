import { useNavigate } from 'react-router-dom'
import '../styles/header.css'



function Header() {

    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault()
        navigate("/logout")
    }
    return (
        <div className="header-container">
            <div className='logo-container'/>
            <h1>Arquicostos</h1>
            <div className='logout' onClick={handleLogOut}>Cerrar Sesión</div>
        </div>
        
    )
}

export default Header