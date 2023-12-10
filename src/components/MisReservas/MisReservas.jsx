import React from 'react';
import { useReservasContext } from '../reservasContext';

const MisReservas = () => {
  const { misReservas } = useReservasContext();

  return (
    <div>
      <h2>Mis Reservas</h2>
      <ul>
        {misReservas.map((reserva, index) => (
          <li key={index}>
            <p>ID Jugador: {reserva.id_jugador}</p>
            <p>ID Complejo: {reserva.id_complejo}</p>
            <p>ID Cancha: {reserva.id_cancha}</p>
            <p>Nombre complejo: {reserva.nombre_complejo}</p>
            <p>Direccion: {reserva.direccion_complejo}</p>
            <p>Telefono: {reserva.telefono_complejo}</p>
            <p>Nombre cancha: {reserva.nombre_cancha}</p>
            <p>Fecha: {reserva.fecha}</p>
            <p>Hora : {reserva.hora}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisReservas;

