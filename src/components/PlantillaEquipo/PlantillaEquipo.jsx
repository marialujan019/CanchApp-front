import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Importa el botón de React-Bootstrap
import JugadoresModal from './JugadoresModal/JugadoresModal';
import './plantillaEquipo.css';

const PlantillaEquipo = ({ equipo }) => {
  const [mostrarJugadores, setMostrarJugadores] = useState(false);

  const toggleMostrarJugadores = () => {
    setMostrarJugadores(!mostrarJugadores);
  };

  return (
    <div className="plantillaEquipoContainer">
      <p>
        <Link to={`/reserva/${equipo.nombre}`}>{equipo.nombre}</Link>
      </p>
      <p>Ubicación: {equipo.ubicacion}</p>
      <p>Fecha: {equipo.fecha}</p>
      <p>Cantidad de jugadores: {equipo.jugadores.length}/10</p>
      <div className="plantillaEquipoJugadoresContainer">
        <Button variant="primary" onClick={toggleMostrarJugadores}>
          Ver jugadores
        </Button>
        <JugadoresModal
          equipo={equipo}
          show={mostrarJugadores}
          onHide={toggleMostrarJugadores}
        />
      </div>
    </div>
  );
};

export default PlantillaEquipo;
