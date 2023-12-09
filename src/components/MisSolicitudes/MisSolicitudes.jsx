import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { consultarBaseDeDatos } from '../utils/Funciones';
import JugadoresModal from '../JugadoresModal/JugadoresModal';
const MisSolicitudes = () => {
  const [solitudesRecibidasDeJugadores, setSolitudesRecibidasDeJugadores] = useState([]);
  const [solitudesRecibidasDeEquipos, setSolitudesRecibidasDeEquipos] = useState([]);
  const [solitudesEnviadasAJugadores, setSolitudesEnviadasAJugadores] = useState([]);
  const [solitudesEnviadasAEquipos, setSolitudesEnviadasAEquipos] = useState([]);
  const [showVerJugadoresModal, setShowVerJugadoresModal] = useState(false);
  const [jugadoresDelBack, setJugadoresDelBack] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {

    //Voy a necesitar todos estos json con el id jugador, cada uno representa un tipo de solicitud
    async function fetchSolitudesRecibidasDeJugadores() {
      const datos = await consultarBaseDeDatos('../json/solicitudesRecibidasPorJugadores.json');
      setSolitudesRecibidasDeJugadores(datos);
    }

    async function fetchSolitudesRecibidasDeEquipos() {
      const datos = await consultarBaseDeDatos('../json/solitudesRecibidasPorEquipos.json');
      setSolitudesRecibidasDeEquipos(datos);
    }

    async function fetchSolitudesEnviadasAJugadores() {
      const datos = await consultarBaseDeDatos('../json/solicitudesEnviadasAJugadores.json');
      setSolitudesEnviadasAJugadores(datos);
    }

    async function fetchSolitudesEnviadasAEquipos() {
      const datos = await consultarBaseDeDatos('../json/solicitudesEnviadasAEquipos.json');
      setSolitudesEnviadasAEquipos(datos);
    }

    // Ejecuta las funciones de obtención de datos
    fetchSolitudesRecibidasDeJugadores();
    fetchSolitudesRecibidasDeEquipos();
    fetchSolitudesEnviadasAJugadores();
    fetchSolitudesEnviadasAEquipos();
  }, [refreshPage]);

  //Envio rechazar o aceptar al back y el id_solicitud
  const handleAceptarRechazar = (idSolicitud, estado) => {
    console.log(`ID Solicitud: ${idSolicitud}, Estado: ${estado}`);
    setRefreshPage((prev) => !prev)
  };

  //Funcion para ver los jugadores de un equipo
  const fetchJugadores = async (idEquipo) => {
    const datos = await consultarBaseDeDatos(`../json/jugadoresParaBusqueda.json`);
    setJugadoresDelBack(datos);
    setShowVerJugadoresModal(true);
  };

  return (
    <div>
      <h2>Solicitudes Recibidas de Jugadores</h2>
      <Table aria-label="Solicitudes Recibidas de Jugadores">
        <TableHeader columns={[
          { key: "nombre", label: "Nombre" },
          { key: "apellido", label: "Apellido" },
          { key: "edad", label: "Edad" },
          { key: "sexo", label: "Sexo" },
          { key: "telefono", label: "Teléfono" },
          { key: "acciones", label: "Acciones" },
        ]}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={solitudesRecibidasDeJugadores}>
          {(item) => (
            <TableRow key={item.id_solicitud}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.apellido}</TableCell>
              <TableCell>{item.edad}</TableCell>
              <TableCell>{item.sexo}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell>
                <Button onClick={() => handleAceptarRechazar(item.id_solicitud, 'Aceptado')}>Aceptar</Button>
                <Button onClick={() => handleAceptarRechazar(item.id_solicitud, 'Rechazado')}>Rechazar</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Solicitudes Recibidas de Equipos</h2>
      <Table aria-label="Solicitudes Recibidas de Equipos">
        <TableHeader columns={[
          { key: "nombre_equipo", label: "Nombre del Equipo" },
          { key: "id_equipo", label: "Equipo" },
          { key: "acciones", label: "Acciones" },
        ]}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={solitudesRecibidasDeEquipos}>
          {(item) => (
            <TableRow key={item.id_solicitud}>
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
                <Button onClick={() => fetchJugadores(item.id_equipo)}>Ver Equipos</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleAceptarRechazar(item.id_solicitud, 'Aceptado')}>Aceptar</Button>
                <Button onClick={() => handleAceptarRechazar(item.id_solicitud, 'Rechazado')}>Rechazar</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Solicitudes Enviadas a Jugadores</h2>
      <Table aria-label="Solicitudes Enviadas a Jugadores">
        <TableHeader columns={[
          { key: "nombre", label: "Nombre" },
          { key: "apellido", label: "Apellido" },
          { key: "edad", label: "Edad" },
          { key: "sexo", label: "Sexo" },
          { key: "telefono", label: "Teléfono" },
          { key: "nombre_equipo", label: "Equipo a invitar" },
          { key: "estado", label: "Estado" },
        ]}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={solitudesEnviadasAJugadores}>
          {(item) => (
            <TableRow key={item.id_solicitud}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.apellido}</TableCell>
              <TableCell>{item.edad}</TableCell>
              <TableCell>{item.sexo}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
              {item.estado}
                {item.estado === "Pendiente" && (
                  <Button onClick={() => handleAceptarRechazar(item.id_solicitud, "Rechazado")}>Cancelar Solicitud</Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Solicitudes Enviadas a Equipos</h2>
      <Table aria-label="Solicitudes Enviadas a Equipos">
        <TableHeader columns={[
          { key: "nombre_equipo", label: "Nombre del Equipo" },
          { key: "id_equipo", label: "Equipo" },
          { key: "estado", label: "Estado" },
          { key: "acciones", label: "Acciones" },
        ]}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={solitudesEnviadasAEquipos}>
          {(item) => (
            <TableRow key={item.id_solicitud}>
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
                <Button onClick={() => fetchJugadores(item.id_equipo)}>Ver Equipos</Button>
              </TableCell>
              <TableCell>{item.estado}</TableCell>
              <TableCell>
                {item.estado === "Pendiente" && (
                  <Button onClick={() => handleAceptarRechazar(item.id_solicitud, "Rechazado")}>Cancelar Solicitud</Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <JugadoresModal
        jugadores={jugadoresDelBack}
        show={showVerJugadoresModal}
        onHide={() => setShowVerJugadoresModal(false)}
      />
    </div>
  );
};

export default MisSolicitudes;
