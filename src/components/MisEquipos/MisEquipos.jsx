import React, { useEffect, useState } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import CrearEquipo from './CrearEquipo/CrearEquipo';

const MisEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [equipoEditando, setEquipoEditando] = useState(null);

  
  useEffect(() => {
    const fetchEquipos = async () => {
        const datos = await consultarBaseDeDatos('../json/equipos.json'); //Funcion para obtener los equipos del back
        setEquipos(datos);
    };

    fetchEquipos();
  }, []);

  const handleEditar = (equipo) => {
    setEquipoEditando(equipo);
  };

  const handleGuardarCambios = async (equipoActualizado) => { //Función para enviar el equipo editado al back
    const datosActualizados = await consultarBaseDeDatos('../json/equipo.json');
    setEquipos(datosActualizados);
    setEquipoEditando(null);
  };

  return (
    <div>
      <h2>Mis Equipos</h2>
      {equipos.map((equipo) => (
        <div key={equipo.id}>
            <div>
              <p>Nombre del Equipo: {equipo.nombreEquipo}</p>
              <p>¿Es público? {equipo.publico ? 'Sí' : 'No'}</p>
              <button onClick={() => handleEditar(equipo)}>Editar</button>
            </div>
        </div>
      ))}
      <CrearEquipo />
    </div>
  );
};

export default MisEquipos;
