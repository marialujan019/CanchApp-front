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

                    <div className='imagenFooterContainer'>
                        <Link to={""}  target="_blank" className='imagenFooter'>Feibu</Link>
                        <Link to={""}  target="_blank" className='imagenFooter'>Ig</Link>
                        <Link to={""}  target="_blank" className='imagenFooter'>warap</Link>
                    </div> 
                </div>
        </footer>
    );
}

export default Footer;