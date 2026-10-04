import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/home.css'
import HomeMenu from '../tools/HomeMenu'
import Obras from '../tools/Obras'
import CatalogoMenu from '../tools/CatalogoMenu'
import Catalogo from '../tools/Catalogo'


function Home() {
    const [isOpen, setIsOpen] = useState(true);
    const [currentView, setCurrentView] = useState('obras');
    const [currentObra, setCurrentObra] = useState(-1);

        
    useEffect(() => {
        if (currentObra > 0) setCurrentView("conceptos")
    }, [currentObra]);

    const handleContent = () => {
        switch (currentView) {
            case "conceptos":
                return <Catalogo/>
            case 'obras':
            default:
                return <Obras
                    handleNavigateObra={(obra) => {
                        console.log(obra)
                        setCurrentObra(obra)
                    }} />
        }
    }

    const handleMenu = () => {
        switch (currentView) {
            case "conceptos":
                return <CatalogoMenu
                    obra={currentObra}
                    handeleNavigate={(target) => {
                        handleMenuNavigate(target)
                    }} />
            case 'obras':
            default:
                return <HomeMenu/>
        }
    }

    const handleMenuNavigate = (target) => {
        switch (target) {
            case "home":
            default:
                setCurrentView('obras');
                setCurrentObra(-1);

        }
    }

    return <div
        className="parent"
        style={{
                gridTemplateColumns: isOpen?"250px auto":"20px 20px",
            }}>
        <div className="header">
            <Header/>
        </div>
        <div className="footer">
            <Footer/>
        </div>
        <div className="side"
            style={{
                gridTemplateColumns: isOpen?"230px auto":"0 auto",
            }}>
            <div className='menu-container'>{handleMenu()}</div>
            <div className='hide-button'
                onClick={(e) => {setIsOpen(!isOpen) }}>
                <div>{isOpen?"<":">"}</div>
            </div>
            
        </div>
        <div className="utilities">4</div>
        <div className="content">
            {handleContent()}
        </div>
    </div>
    
    
}

export default Home