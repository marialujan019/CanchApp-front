import React, { useEffect, useState, useRef } from 'react';
import { Popup, Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import {Card, CardBody, Button} from "@nextui-org/react";
import "./marcadores.css"

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
        <Popup key={id_complejo} className="cardMarcador my-2">

            <img 
            className='marcadorCardImage'
              src="/images/complejos/complejo1.webp" 
              alt={nombre}
            />
            <div className='complejoCardDatos'>
              <div className='p-2'>
                  <strong><h2 className='p-0 m-0 cardComplejoTitulo'>{nombre}</h2></strong>
                  <p className='text-base p-0 m-0 cardComplejoTexto'>Dirección: {direccion}</p>
                  <p className='text-base p-0 m-0 cardComplejoTexto'>Teléfono: {telefono}</p>
              </div>
              <Button variant="bordered" size="sm" className="botonCardComplejo" onClick={()=> {pedirComplejo()}}>Reservar <i className="bi bi-clipboard-check"/></Button>
            </div>
            
        </Popup>
      </Marker>
    </div>
  );
};

export default Marcadores;
