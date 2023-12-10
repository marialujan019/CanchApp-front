
import { useParams, useNavigate } from 'react-router-dom';

const PerfilJugador = ({id}) => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="card-content">
                <h2>Mi perfil</h2>               
            </div>
            <div>
            <button onClick={() => navigate('/misEquipos')} > Finalizar registro </button>

            </div>
           
        </div>
    ); 
}

export default PerfilJugador;