import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import JugadoresModal from './JugadoresModal/JugadoresModal';
import { consultarBaseDeDatos } from '../utils/Funciones';
import './plantillaEquipo.css';

const PlantillaEquipo = ({ equipo }) => {
  const [traerJugadores, setTraerJugadores] = useState([]);
  const [mostrarJugadores, setMostrarJugadores] = useState(false);

  useEffect(() => {
    const fetchJugadores = async () => {
      const datos = await consultarBaseDeDatos('../json/jugadoresParaBusqueda.json');
      setTraerJugadores(datos);
    };

    fetchJugadores();
  }, []); // Arreglo de dependencias vacío para cargar solo una vez

  const toggleMostrarJugadores = () => {
    setMostrarJugadores(!mostrarJugadores);
  };

  return (
    <div className="plantillaEquipoContainer">
      <p>{equipo.nombreEquipo}</p>
      <p>{equipo.cant_jug}</p>
      <div className="plantillaEquipoJugadoresContainer">
        <Button variant="primary" onClick={toggleMostrarJugadores}>
          Ver jugadores
        </Button>
        <JugadoresModal
          jugadores={traerJugadores}
          show={mostrarJugadores}
          onHide={toggleMostrarJugadores}
        />
      </div>
    </div>
  );
};

export default PlantillaEquipo;

