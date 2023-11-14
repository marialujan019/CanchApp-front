import React, {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from './Carousel';


const MisCanchas = () => {
    const { idAdmin } = useParams();

    const [cardsData, setCardsData] = useState([]);
    const [idComplejo, setIdComplejo] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:3001/search_canchas', {
      id_admin: idAdmin
    })
    .then(res => {
      if (res.data.Status === "Respuesta ok") {
        setCardsData(res.data.canchas);
        setIdComplejo(res.data.id_complejo);
      } else {
        alert(res.data.Message);
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
    });
  }, []); // El segundo argumento [] indica que esto se ejecutará solo una vez al montar el componente


    return (
        <div>
            <div className="card-content">
                <h2>Mis canchas</h2>
                {/* Agrega el contenido de esta sección aquí */}
                <Link to={`/crearcancha/${idComplejo}`} className="nav-link-canchas"> Crear cancha </Link>
               
            </div>
            <div>
            <Carousel cardsData={cardsData} />
            </div>
           
        </div>
    );
}

export default MisCanchas;