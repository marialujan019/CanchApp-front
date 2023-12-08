import React from 'react';
import { Popup, Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const Marcadores = ({ position, customIcon, id_complejo, nombre, direccion, telefono }) => {
  const navigate = useNavigate();

  //Esta función deberia tener un post, para el back, que pase el id_complejo
  const pedirComplejo = () => {
    navigate(`/complejo/${id_complejo}`);
  };
  

  return (
    <div>
      <Marker position={position} icon={customIcon}>
        <Popup>
          {nombre}, {direccion}, {telefono}
          <div>
            <button onClick={pedirComplejo}>Hola</button>
          </div>
        </Popup>
      </Marker>
    </div>
  );
};

export default Marcadores;
