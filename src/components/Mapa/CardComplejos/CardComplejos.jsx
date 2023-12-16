import React from 'react';
import "./cardComplejos.css"
import {Card, CardBody, Image, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const CardComplejos = ({ complejos, cambiarPosicionZoom }) => {
  const navigate = useNavigate(); 
  const pedirComplejo = (id_complejo) => {
    navigate(`/complejo/${id_complejo}`);
  };


  return (
    <div className='complejoCardsContainer'>
      {complejos.map((complejo) => (
        <Card key={complejo.id_complejo} className="cardComplejo my-2">
            <img 
            className='complejoCardImagen'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s" 
              alt={complejo.nombre}
            />
            <div className='complejoCardDatos'>
              <CardBody className='p-2'>
                  <h2 className='text-base p-0 m-0 cardComplejoTitulo'>{complejo.nombre_complejo}</h2>
                  <p className='text-base p-0 m-0 cardComplejoTexto'>Dirección: {complejo.direccion}</p>
                  <p className='text-base p-0 m-0 cardComplejoTexto'>Teléfono: {complejo.telefono}</p>
              </CardBody>
              <div className='botonesCardComplejos gap-2 pr-5'>
                <Button variant="bordered" size="sm" className="botonCardComplejo" onClick={() => {cambiarPosicionZoom(complejo.latitud, complejo.longitud, 15, complejo.id_complejo);}}>

                  Ver en mapa <i className="bi bi-eye" />
                </Button>
                <Button variant="bordered" size="sm" className="botonCardComplejo" onClick={()=> {pedirComplejo(complejo.id_complejo)}}>Reservar <i className="bi bi-clipboard-check"/></Button>
              </div>
            </div>
            
        </Card>
      ))}
    </div>
  );
};

export default CardComplejos;