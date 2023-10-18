import React, { useState } from 'react';
import './plantillaJugador.css';

const PlantillaJugador = ({ jugador }) => {
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  const handleEnviarSolicitud = () => {
    if (solicitudEnviada) {
      // Si la solicitud ya ha sido enviada, cancelar la solicitud
      setSolicitudEnviada(false);
    } else {
      // Si la solicitud no ha sido enviada, enviarla
      setSolicitudEnviada(true);
    }
  };

  return (
    <div className="plantillaJugadorContainer">
      <div className="plantillaJugadorInfo">
        <img src={jugador.foto} alt="" />
        <p>Nombre: {jugador.nombre}</p>
        <p>Ubicación: {jugador.ubicacion}</p>
        <p>Sexo: {jugador.sexo}</p>
        <p>Edad: {jugador.edad}</p>

        <div>
            <button onClick={handleEnviarSolicitud}>
            {solicitudEnviada ? 'Cancelar solicitud' : 'Enviar solicitud'}
            </button>
            {solicitudEnviada && <p>Solicitud enviada</p>}
        </div>
      </div>
    </div>
  );
};

export default PlantillaJugador;


//Hacer la notificación de solicitd enviada con Toastify

