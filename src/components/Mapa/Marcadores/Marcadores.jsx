import React, { useEffect, useState, useRef } from 'react';
import { Popup, Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const Marcadores = ({ position, customIcon, id_complejo, nombre, direccion, telefono, markerRefs }) => {
  const markerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    markerRefs.current[id_complejo] = markerRef.current;
  }, []);

  const pedirComplejo = () => {
    navigate(`/complejo/${id_complejo}`);
  };

  return (
    <div>
      <Marker position={position} icon={customIcon} ref={markerRef}>
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
