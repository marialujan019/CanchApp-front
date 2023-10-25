import React, { useState, useEffect } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import PlantillaEquipo from '../PlantillaEquipo/PlantillaEquipo';

const BusquedaEquipo = () => {
  const [datosDeLaAPI, setDatosDeLaAPI] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(''); // Deja la ciudad en blanco para mostrar todos los equipos al principio

  useEffect(() => {
    consultarBaseDeDatos("../json/equipos.json").then((listaEquiposObtenidos) => {
      const filtrarEquipos = listaEquiposObtenidos.filter((equipo) =>
        equipo.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (ciudadSeleccionada === '' || equipo.ubicacion === ciudadSeleccionada)
      );
      const equiposFiltrados = filtrarEquipos.map((equipoDevuelto) => (
        <PlantillaEquipo equipo={equipoDevuelto} key={equipoDevuelto.id} />
      ));

      setDatosDeLaAPI(equiposFiltrados);
    });
  }, [busqueda, ciudadSeleccionada]);

  const handleFiltrarPorCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad);
  };

  const handleEliminarFiltro = () => {
    setCiudadSeleccionada('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={() => handleFiltrarPorCiudad('Resistencia')}>
        Filtrar por ciudad: Resistencia
      </button>
      <button onClick={() => handleFiltrarPorCiudad('Corrientes')}>
        Filtrar por ciudad: Corrientes
      </button>
      <button onClick={handleEliminarFiltro}>
        Eliminar Filtro
      </button>
      {datosDeLaAPI}
    </div>
  );
};

export default BusquedaEquipo;
