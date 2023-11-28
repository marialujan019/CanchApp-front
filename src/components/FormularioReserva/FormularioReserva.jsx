import React from 'react';

const FormularioReserva = () => {
  // Obtener las reservas desde el localStorage
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

  return (
    <div>
      <h2>Lista de Reservas</h2>
      {reservas.length > 0 ? (
        <ul>
          {reservas.map((reserva, index) => (
            <li key={index}>
              <p>Complejo: {reserva.nombre_complejo}</p>
              <p>Cancha: {reserva.nombre_cancha}</p>
              <p>Fecha: {reserva.fecha}</p>
              <p>Hora: {reserva.hora}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay reservas disponibles.</p>
      )}
    </div>
  );
};

export default FormularioReserva;
