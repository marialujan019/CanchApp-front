import React from 'react';
import './Administrador.css'; // Asegúrate de importar tu archivo de estilos
import { Link} from 'react-router-dom';

const Canchas = ({idAdmin}) => {
  return (
      <div className="card">
        <img src="ruta-a-tu-imagen.jpg" alt="Imagen de Canchas" className="card-image" />
          <div className="card-content">
            <Link to={`/miscanchas/${idAdmin}`} className="nav-link"> Mis canchas</Link>
              {/* Agrega el contenido de esta sección aquí */}
          </div>
      </div>
  );
};

export default Canchas;
