import React from 'react';
import { Card, CardBody, Tooltip } from "@nextui-org/react";

const defaultImage = "/images/miscanchas/noImagen.jpg";

const CardCancha = ({ cancha }) => {
    return (
        <Card className='cardMisCanchas'>
            <img src={cancha.imagen ? cancha.imagen : defaultImage} className='cardMisCanchasImagen opacity-100'/>
            <CardBody className='pt-2 px-2 pb-0'>
                <div className='MisCanchasCardBody'>
                    <h4 className='text-base m-0 MisCanchasTituloCard'>{cancha.nombre_cancha}</h4>
                    <p className='text-base m-0 MisCanchasTextoCard'>Techada: {cancha.techo ? 'si' : 'no'}</p>
                </div>
            </CardBody>
            <div className='accionesCardMisCanchas'>
                <Tooltip content="Editar cancha">
                    <button><i className="bi bi-pencil"></i></button>
                </Tooltip>
                <Tooltip content="Agregar nuevas fechas">
                    <button><i className="bi bi-calendar"></i></button>
                </Tooltip>
                <Tooltip content="Eliminar cancha">
                    <button><i className="bi bi-trash"></i></button>
                </Tooltip>
            </div>
        </Card>
    );
}

export default CardCancha;
