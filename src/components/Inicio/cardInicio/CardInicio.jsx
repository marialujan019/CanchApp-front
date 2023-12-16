import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import "../inicio.css";

const CardInicio = ({ imagenSrc, titulo, descripcion }) => {
  return (
    <Card className='cardInicio'>
      <img src={imagenSrc} alt={titulo} className='cardInicioImagen opacity-100'/>
      <div className=''>
        <CardBody className='p-2'>
          <h4 className='text-base p-0 m-0 '>{titulo}</h4>
          <p className='text-base p-0 m-0'>{descripcion}</p>
        </CardBody>
      </div>
    </Card>
  );
};

export default CardInicio;
