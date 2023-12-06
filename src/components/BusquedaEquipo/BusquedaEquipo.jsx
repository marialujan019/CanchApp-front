import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { consultarBaseDeDatos } from '../utils/Funciones';
import JugadoresModal from '../JugadoresModal/JugadoresModal';

const id_jugador = 1; //Esto hay que cambiar por el userConstext
const BusquedaEquipo = () => {
  const [equiposDeLaAPI, setEquiposDeLaAPI] = useState([]);
  const [filtros, setFiltros] = useState({ nombreBusqueda: '' });
  const [solicitudEnviadaPorEquipo, setSolicitudEnviadaPorEquipo] = useState({});
  const [jugadoresDeLaAPI, setJugadoresDeLaAPI] = useState([]);
  const [showJugadoresModal, setShowJugadoresModal] = useState(false);

  const filtrarPorNombre = useCallback((equipo) => {
    if (filtros.nombreBusqueda) {
      const nombreMinusculas = equipo.nombreEquipo.toLowerCase();
      const busquedaMinusculas = filtros.nombreBusqueda.toLowerCase();

      return nombreMinusculas.startsWith(busquedaMinusculas);
    }
    return true;
  }, [filtros.nombreBusqueda]);

  useEffect(() => {
    consultarBaseDeDatos('../json/equiposParaBusqueda.json')
      .then((listaEquiposObtenidos) => {
        const equiposFiltrados = listaEquiposObtenidos
          .filter(filtrarPorNombre);

        setEquiposDeLaAPI(equiposFiltrados);
      });
  }, [filtros, filtrarPorNombre]);

  const columns = [
    { key: "nombreEquipo", label: "Nombre del Equipo" },
    { key: "fecha", label: "Fecha" },
    { key: "cant_jug", label: "Jugadores" },
    { key: "solicitud", label: "Solicitud" },
    { key: "estado", label: "Estado" },
  ];

  //Acá se hace el manejo de solicitudes, envio el idEquipo al back y debo recibir una "solicitud recibida" para manejar los botones
  //Si se envió la solicitud correctamente, el botón de "Enviar solicitud" debe pasar a "Cancelar solicitud" y viceversa
  const toggleSolicitud = (idEquipo, id_jugador) => {
    if (solicitudEnviadaPorEquipo[idEquipo]) {
      cancelarSolicitud(idEquipo, id_jugador);
      setSolicitudEnviadaPorEquipo((prev) => ({ ...prev, [idEquipo]: false }));
    } else {
      enviarSolicitud(idEquipo, id_jugador);
      setSolicitudEnviadaPorEquipo((prev) => ({ ...prev, [idEquipo]: true }));
    }
  };

  //Esta función debe enviar una solicitud al back con el id_equipo cambiar el estado de una solicitud de un jugador
  const enviarSolicitud = (idEquipo, id_jugador) => {
    const solicitudEnviada = true; //Se envia esto al back junto con el id_jugador, para que se pueda eliminar de la tabla, la solicitud
    console.log(`Solicitud enviada por el jugador ${id_jugador} para el Equipo con ID: ${idEquipo}`);
  };

  const cancelarSolicitud = (idEquipo, id_jugador) => {
    const solicitudEnviada = false; //Se envia esto al back junto con el id_jugador, para que se pueda eliminar de la tabla, la solicitud
    console.log(`Solicitud cancelada por el jugador ${id_jugador} para el Equipo con ID: ${idEquipo}`);
  };

  
  //Esta función recibe el id_equipo el cual hay que mandarlo al back para recibir los datos
  //Los datos van a ser un arreglo de jugadores con el mismo id_equipo. Es decir, el arreglo de jugadores del equipo
  const fetchJugadores = async (idEquipo) => {
    const datos = await consultarBaseDeDatos(`../json/jugadoresDeUnEquipoDeLaBusqueda.json`);
    setJugadoresDeLaAPI(datos);
    setShowJugadoresModal(true);
  };

  

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

      <Table aria-label="Equipos">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {equiposDeLaAPI.map((equipo) => (
            <TableRow key={equipo.id_equipo}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === 'cant_jug' ? (
                    <>
                      {equipo[column.key]}
                      <button onClick={() => fetchJugadores(equipo.id_equipo)}>
                        Ver jugadores
                      </button>
                    </>
                  ) : column.key === 'solicitud' ? (
                    <Button
                      onClick={() => toggleSolicitud(equipo.id_equipo, id_jugador)}
                      color={solicitudEnviadaPorEquipo[equipo.id_equipo] ? "danger" : "primary"}
                    >
                      {solicitudEnviadaPorEquipo[equipo.id_equipo] ? "Cancelar solicitud" : "Enviar solicitud"}
                    </Button>
                  ) : (
                    equipo[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <JugadoresModal
        jugadores={jugadoresDeLaAPI}
        show={showJugadoresModal}
        onHide={() => setShowJugadoresModal(false)}
      />
    </div>
  );
};

export default BusquedaEquipo;

