import React, { useState, useEffect, useCallback } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import PlantillaJugador from '../PlantillaJugador/PlantillaJugador';
import './busquedaJugador.css';

const FILTRO_EDAD = {
  '5-13': 'Edad 5-13',
  '13-18': 'Edad 13-18',
  'mayores-18': 'Mayores de 18',
};

const FILTRO_SEXO = {
  M: 'Masculino',
  F: 'Femenino',
};

const BusquedaJugador = () => {
  const [datosDeLaAPI, setDatosDeLaAPI] = useState([]);
  const [filtros, setFiltros] = useState({
    edadFiltro: null,
    sexoFiltro: null,
    pieHabilFiltro: null,
    posicionFiltro: null,
    nombreBusqueda: '',
  });

  const filtrarPorEdad = useCallback((jugador) => {
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
  }, [filtros.edadFiltro]);

  const filtrarPorSexo = useCallback((jugador) => {
    if (filtros.sexoFiltro) {
      return jugador.sexo === filtros.sexoFiltro;
    }
    return true;
  }, [filtros.sexoFiltro]);

  const filtrarPorPieHabil = useCallback((jugador) => {
    if (filtros.pieHabilFiltro) {
      return jugador.pie_habil === filtros.pieHabilFiltro;
    }
    return true;
  }, [filtros.pieHabilFiltro]);

  const filtrarPorPosicion = useCallback((jugador) => {
    if (filtros.posicionFiltro) {
      return jugador.posicion === filtros.posicionFiltro;
    }
    return true;
  }, [filtros.posicionFiltro]);

  const filtrarPorNombre = useCallback((jugador) => {
    if (filtros.nombreBusqueda) {
      const nombreMinusculas = jugador.nombre.toLowerCase();
      const busquedaMinusculas = filtros.nombreBusqueda.toLowerCase();
  
      return nombreMinusculas.startsWith(busquedaMinusculas);
    }
    return true;
  }, [filtros.nombreBusqueda]);
  

  useEffect(() => { //Esta es la funcion que me trae los jugadores de la base de datos
    consultarBaseDeDatos('../json/jugadoresParaBusqueda.json')
    .then((listaJugadoresObtenidos) => {

      const jugadoresFiltrados = listaJugadoresObtenidos
        .filter(filtrarPorEdad)
        .filter(filtrarPorSexo)
        .filter(filtrarPorPieHabil)
        .filter(filtrarPorPosicion)
        .filter(filtrarPorNombre);
        
        console.log(filtros)
        //filtros es la variable que se envia al back, cada vez que se aplica un filtro, este objeto se modifica
      setDatosDeLaAPI(jugadoresFiltrados);

    })
  }, [filtros, filtrarPorEdad, filtrarPorSexo, filtrarPorPieHabil, filtrarPorPosicion, filtrarPorNombre]);

  const toggleFiltro = (filtroName, valor) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [filtroName]: prevFiltros[filtroName] === valor ? null : valor,
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      edadFiltro: null,
      sexoFiltro: null,
      pieHabilFiltro: null,
      posicionFiltro: null,
      nombreBusqueda: '',
    });
  };

  return (
    <div className='busquedaJugadorContainer'>
      <div className='busquedaJugadorFiltros'>
        <h3>Filtros</h3>

        <div className='busquedaJugadorFiltroEdad'>
          <h4>Filtros por edad</h4>
          {Object.entries(FILTRO_EDAD).map(([valor, label]) => (
            <label key={valor}>
              <input
                type='checkbox'
                checked={filtros.edadFiltro === valor}
                onChange={() => toggleFiltro('edadFiltro', valor)}
              />{' '}
              {label}
            </label>
          ))}
        </div>

        <div className='busquedaJugadorFiltroSexo'>
          <h4>Filtro por sexo</h4>
          {Object.entries(FILTRO_SEXO).map(([valor, label]) => (
            <label key={valor}>
              <input
                type='checkbox'
                checked={filtros.sexoFiltro === valor}
                onChange={() => toggleFiltro('sexoFiltro', valor)}
              />{' '}
              {label}
            </label>
          ))}
        </div>

        <div className='busquedaJugadorFiltroPieHabil'>
          <h4>Filtro por pie hábil</h4>
          <label>
            <input
              type='checkbox'
              checked={filtros.pieHabilFiltro === 'Derecho'}
              onChange={() => toggleFiltro('pieHabilFiltro', 'Derecho')}
            />{' '}
            Derecho
          </label>
          <label>
            <input
              type='checkbox'
              checked={filtros.pieHabilFiltro === 'Izquierdo'}
              onChange={() => toggleFiltro('pieHabilFiltro', 'Izquierdo')}
            />{' '}
            Izquierdo
          </label>
        </div>

        <div className='busquedaJugadorFiltroPosicion'>
          <h4>Filtro por posición</h4>
          <label>
            <input
              type='checkbox'
              checked={filtros.posicionFiltro === 'Arquero'}
              onChange={() => toggleFiltro('posicionFiltro', 'Arquero')}
            />{' '}
            Arquero
          </label>
          <label>
            <input
              type='checkbox'
              checked={filtros.posicionFiltro === 'Defensor'}
              onChange={() => toggleFiltro('posicionFiltro', 'Defensor')}
            />{' '}
            Defensor
          </label>
          <label>
            <input
              type='checkbox'
              checked={filtros.posicionFiltro === 'Mediocampista'}
              onChange={() => toggleFiltro('posicionFiltro', 'Mediocampista')}
            />{' '}
            Mediocampista
          </label>
          <label>
            <input
              type='checkbox'
              checked={filtros.posicionFiltro === 'Delantero'}
              onChange={() => toggleFiltro('posicionFiltro', 'Delantero')}
            />{' '}
            Delantero
          </label>
        </div>

        <div className='busquedaJugadorFiltroNombre'>
          <h4>Búsqueda por nombre</h4>
          <input
            type='text'
            value={filtros.nombreBusqueda}
            onChange={(e) => setFiltros({ ...filtros, nombreBusqueda: e.target.value })}
          />
        </div>

        <button onClick={limpiarFiltros}>Eliminar Filtros</button>
      </div>
      
      <div>
        {datosDeLaAPI.map((jugadorDevuelto) => (
          <PlantillaJugador jugador={jugadorDevuelto} key={jugadorDevuelto.id} />
        ))}
      </div>
    </div>
  );
};

export default BusquedaJugador;