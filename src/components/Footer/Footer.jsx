import './footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='footer'>
                <div className='derechosFooter'>
                    @Copyright 2023. Todos los derechos reservados
                </div>
                <div className='redesFooter'>
                    <p>¡Seguinos en nuestras redes!</p>

                    <div className='redesFooterContainer'>
                        <Link to={""}  target="_blank" className='iconoFooter'><i className="bi bi-facebook"></i></Link>
                        <Link to={""}  target="_blank" className='iconoFooter'><i className="bi bi-whatsapp"></i></Link>
                        <Link to={""}  target="_blank" className='iconoFooter'><i className="bi bi-instagram"></i></Link>
                    </div> 
                </div>
        </footer>
    );
}

export default Footer;