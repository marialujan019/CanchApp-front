import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import "../inicio.css";

const CardInicio = ({ imagenSrc, titulo, descripcion }) => {
  return (
    <Card className='cardInicio'>
      <img src={imagenSrc} alt={titulo} className='cardInicioImagen opacity-100'/>
        <CardBody className='p-2'>
          <div className='inicioCardBody'>
            <h4 className='text-base p-0 m-0 InicioTituloCard'>{titulo}</h4>
            <p className='text-base p-0 m-0 InicioTextoCard'>{descripcion}</p>
          </div>
         
        </CardBody>
    </Card>
  );
};

export default CardInicio;
