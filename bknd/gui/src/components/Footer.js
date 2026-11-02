import '../styles/footer.css'

function Footer() {
    const currentYear = new Date().getFullYear();
    return <div className="footer-container">
        <div>Arquicostos ® Ikek {currentYear}</div>
    </div>    
}

export default Footer