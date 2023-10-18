import React, { useState, useEffect } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import PlantillaJugador from '../PlantillaJugador/PlantillaJugador';
import "./busquedaJugador.css"

const BusquedaJugador = () => {
  const [datosDeLaAPI, setDatosDeLaAPI] = useState([]);
  const [filtros, setFiltros] = useState({
    edadFiltro: null,
    ubicacionFiltro: null,
    sexoFiltro: null,
  });

  useEffect(() => {
    consultarBaseDeDatos("../json/personas.json").then((listaJugadoresObtenidos) => {
      const jugadores = listaJugadoresObtenidos
        .filter((jugador) => {
          if (filtros.edadFiltro) {
            if (filtros.edadFiltro === '5-13') {
              return jugador.edad >= 5 && jugador.edad <= 13;
            } else if (filtros.edadFiltro === '13-18') {
              return jugador.edad >= 13 && jugador.edad <= 18;
            } else if (filtros.edadFiltro === 'mayores-18') {
              return jugador.edad > 18;
            }
          }
          return true;
        })
        .filter((jugador) => {
          if (filtros.ubicacionFiltro) {
            return jugador.ubicacion === filtros.ubicacionFiltro;
          }
          return true;
        })
        .filter((jugador) => {
          if (filtros.sexoFiltro) {
            return jugador.sexo === filtros.sexoFiltro;
          }
          return true;
        })
        .map((jugadorDevuelto) => (
          <PlantillaJugador jugador={jugadorDevuelto} key={jugadorDevuelto.id} />
        ));
      setDatosDeLaAPI(jugadores);
    });
  }, [filtros]);

  const toggleFiltro = (filtroName, valor) => {
    setFiltros((prevFiltros) => {
      const updatedFiltros = { ...prevFiltros };

      // Si el valor ya está seleccionado, desactívalo
      if (updatedFiltros[filtroName] === valor) {
        updatedFiltros[filtroName] = null;
      } else {
        // Si no, actívalo
        updatedFiltros[filtroName] = valor;
      }

      return updatedFiltros;
    });
  };

  const limpiarFiltros = () => {
    setFiltros({
      edadFiltro: null,
      ubicacionFiltro: null,
      sexoFiltro: null,
    });
  };

  return (
    <div className='busquedaJugadorContainer'>
      <div className='busquedaJugadorFiltros'>
        <h3>Filtros</h3>

        <div className='busquedaJugadorFiltroEdad'>
          <h4>Filtros por edad</h4>
          <label>
            <input
              type="checkbox"
              checked={filtros.edadFiltro === '5-13'}
              onChange={() => toggleFiltro('edadFiltro', '5-13')}
            /> Edad 5-13
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.edadFiltro === '13-18'}
              onChange={() => toggleFiltro('edadFiltro', '13-18')}
            /> Edad 13-18
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.edadFiltro === 'mayores-18'}
              onChange={() => toggleFiltro('edadFiltro', 'mayores-18')}
            /> Mayores de 18
          </label>
        </div>

        <div className='busquedaJugadorFiltroUbicacion'>
          <h4>Filtro por ubicación</h4>
          <label>
            <input
              type="checkbox"
              checked={filtros.ubicacionFiltro === 'Resistencia'}
              onChange={() => toggleFiltro('ubicacionFiltro', 'Resistencia')}
            /> Resistencia
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.ubicacionFiltro === 'Corrientes'}
              onChange={() => toggleFiltro('ubicacionFiltro', 'Corrientes')}
            /> Corrientes
          </label>
        </div>

        <div className='busquedaJugadorFiltroSexo'> 
          <h4>Filtro por sexo</h4>
          <label>
            <input
              type="checkbox"
              checked={filtros.sexoFiltro === 'Masculino'}
              onChange={() => toggleFiltro('sexoFiltro', 'Masculino')}
            /> Sexo Masculino
          </label>
          <label>
            <input
              type="checkbox"
              checked={filtros.sexoFiltro === 'Femenino'}
              onChange={() => toggleFiltro('sexoFiltro', 'Femenino')}
            /> Sexo Femenino
          </label>
        </div>
        <button onClick={limpiarFiltros}>Eliminar Filtros</button>
      
      </div>
        <div>
          {datosDeLaAPI}
        </div>
    </div>
  );
};

export default BusquedaJugador;
