import React from 'react';
import { Popup, Marker } from 'react-leaflet';


const Marcadores = ({ position, customIcon, idCancha, nombre, direccion, telefono }) => {
  return (
    <div>
      <Marker position={position} icon={customIcon}>
        <Popup>
          {idCancha}, {nombre}, {direccion}, {telefono}
        </Popup>
      </Marker>
    </div>
  );
};

export default Marcadores;
