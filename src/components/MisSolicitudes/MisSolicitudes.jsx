import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { consultarBaseDeDatos } from '../utils/Funciones';
import JugadoresModal from '../JugadoresModal/JugadoresModal';
import { useUser } from '../UserContext';
import axios from 'axios';

const MisSolicitudes = () => {
  const [solitudesRecibidasDeJugadores, setSolitudesRecibidasDeJugadores] = useState([]);
  const [solitudesRecibidasDeEquipos, setSolitudesRecibidasDeEquipos] = useState([]);
  const [solitudesEnviadasAJugadores, setSolitudesEnviadasAJugadores] = useState([]);
  const [solitudesEnviadasAEquipos, setSolitudesEnviadasAEquipos] = useState([]);
  const [showVerJugadoresModal, setShowVerJugadoresModal] = useState(false);
  const [jugadoresDelBack, setJugadoresDelBack] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { user } = useUser();

  const id_jugador = user.id;
  
  useEffect(() => {

    //Voy a necesitar todos estos json con el id jugador, cada uno representa un tipo de solicitud
    async function fetchSolitudesRecibidasDeJugadores() {
      //endpoin solicitudes./solicitudes/recibidas/
      const datos = await axios.get(`http://localhost:3001/solicitudes/recibidas/${id_jugador}`)
      setSolitudesRecibidasDeJugadores(datos.data);
    }

    async function fetchSolitudesRecibidasDeEquipos() {
      //endpoint invitaciones
      const datos = await axios.get(`http://localhost:3001/invitaciones/recibidas/${id_jugador}`)
      setSolitudesRecibidasDeEquipos(datos.data);
    }

    async function fetchSolitudesEnviadasAJugadores() {
      //endpoint invitaicones
      const datos = await axios.get(`http://localhost:3001/invitaciones/mis-invitaciones/${id_jugador}`)
      setSolitudesEnviadasAJugadores(datos.data);
    }

    async function fetchSolitudesEnviadasAEquipos() {
      //endpoint solicitudes, /solicitudes/mis-solicitudes/:id
      const datos = await axios.get(`http://localhost:3001/solicitudes/mis-solicitudes/${id_jugador}`)
      setSolitudesEnviadasAEquipos(datos.data);
    }

    // Ejecuta las funciones de obtención de datos
    fetchSolitudesRecibidasDeJugadores();
    fetchSolitudesRecibidasDeEquipos();
    fetchSolitudesEnviadasAJugadores();
    fetchSolitudesEnviadasAEquipos();
  }, [refreshPage]);

  //Funcion que envia rechazar o aceptar al back y el id_solicitud
  const handleAceptarRechazarSolicitud = (idSolicitud, estado) => {
    //falta endpoint
    axios.post('http://localhost:3001/solicitudes/update', {
      id_solicitud: idSolicitud,
      estado: estado
    })
    console.log(`ID Solicitud: ${idSolicitud}, Estado: ${estado}`);
    setRefreshPage((prev) => !prev)
  };

   //Funcion que envia rechazar o aceptar al back y el id_solicitud
   const handleAceptarRechazarInvitacion = (idInvitacion, estado) => {
    //falta endpoint
    axios.post('http://localhost:3001/invitaciones/update', {
      id_invitacion: idInvitacion,
      estado: estado
    })
    console.log(`ID Solicitud: ${idInvitacion}, Estado: ${estado}`);
    setRefreshPage((prev) => !prev)
  };

  //Funcion para ver los jugadores de un equipo
  const fetchJugadores = async (idEquipo) => {
    //endpoint jugadores/equipo
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresDelBack(datos.data);
    setShowVerJugadoresModal(true);
  };

  return (
    <div>
      <h2>Los siguientes jugadores quieren unirse a tus equipo: </h2>
      <Table aria-label="Solicitudes Recibidas de Jugadores">
        <TableHeader columns={[
          { key: "nombre", label: "Nombre" },
          { key: "apellido", label: "Apellido" },
          { key: "edad", label: "Edad" },
          { key: "sexo", label: "Sexo" },
          { key: "telefono", label: "Teléfono" },
          { key: "nombre_equipo", label: "Nombre equipo"},
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
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
                <Button onClick={() => handleAceptarRechazarSolicitud(item.id_solicitud, 'Aceptado')}>Aceptar</Button>
                <Button onClick={() => handleAceptarRechazarSolicitud(item.id_solicitud, 'Rechazado')}>Rechazar</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Los siguientes euqipos quieren que te unas a ellos: </h2>
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
            <TableRow key={item.id_invitacion}>
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
                <Button onClick={() => fetchJugadores(item.id_equipo)}>Ver Equipos</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleAceptarRechazarInvitacion(item.id_invitacion, 'Aceptado')}>Aceptar</Button>
                <Button onClick={() => handleAceptarRechazarInvitacion(item.id_invitacion, 'Rechazado')}>Rechazar</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Haz invitado a los siguientes jugadors a que se unan a tu equipo:</h2>
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
            <TableRow key={item.id_invitacion}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.apellido}</TableCell>
              <TableCell>{item.edad}</TableCell>
              <TableCell>{item.sexo}</TableCell>
              <TableCell>{item.telefono}</TableCell>
              <TableCell>{item.nombre_equipo}</TableCell>
              <TableCell>
              {item.estado}
                {item.estado === "Pendiente" && (
                  <Button onClick={() => handleAceptarRechazarInvitacion(item.id_invitacion, "Rechazado")}>Cancelar Solicitud</Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <h2>Equipos a los que quieres unirte: </h2>
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
                  <Button onClick={() => handleAceptarRechazarSolicitud(item.id_solicitud, "Rechazado")}>Cancelar Solicitud</Button>
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