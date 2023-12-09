import React, { useState, useEffect, useCallback } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import PlantillaEquipo from '../PlantillaEquipo/PlantillaEquipo';

const BusquedaEquipo = () => {
  const [datosDeLaAPI, setDatosDeLaAPI] = useState([]);
  const [filtros, setFiltros] = useState({nombreBusqueda: ''});

  const filtrarPorNombre = useCallback((equipo) => {
    if (filtros.nombreBusqueda) {
      const nombreMinusculas = equipo.nombreEquipo.toLowerCase();
      const busquedaMinusculas = filtros.nombreBusqueda.toLowerCase();
  
      return nombreMinusculas.startsWith(busquedaMinusculas);
    }
    return true;
  }, [filtros.nombreBusqueda]);
  

  useEffect(() => { //Esta es la funcion que me trae los jugadores de la base de datos
    consultarBaseDeDatos('../json/equiposParaBusqueda.json')
    .then((listaEquiposObtenidos) => {
      const equiposFiltrados = listaEquiposObtenidos
        .filter(filtrarPorNombre);

      console.log(filtros)
      //filtros es la variable que se envia al back, cada vez que se aplica un filtro, este objeto se modifica
      setDatosDeLaAPI(equiposFiltrados);
    });
  }, [filtros, filtrarPorNombre]);

  return (
    <div>
      <div className='busquedaEquipoFiltroNombre'>
        <h4>Búsqueda por nombre</h4>
        <input
          type='text'
          value={filtros.nombreBusqueda}
          onChange={(e) => setFiltros({ ...filtros, nombreBusqueda: e.target.value })}
        />
      </div>

      <div>
        {datosDeLaAPI.map((equipo) => (
          <PlantillaEquipo equipo={equipo} key={equipo.id_equipo}/>
        ))}
      </div>
    </div>
  );
};

export default BusquedaEquipo;