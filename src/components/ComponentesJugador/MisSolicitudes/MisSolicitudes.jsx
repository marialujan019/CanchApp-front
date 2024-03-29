import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import ModalJugadores from '../ModalJugadores/ModalJugadores';
import { useUser } from '../../UserContext';
import axios from 'axios';
import "./misSolicitudes.css"

const MisSolicitudes = () => {
  const [solitudesRecibidasDeJugadores, setSolitudesRecibidasDeJugadores] = useState([]);
  const [solitudesRecibidasDeEquipos, setSolitudesRecibidasDeEquipos] = useState([]);
  const [solitudesEnviadasAJugadores, setSolitudesEnviadasAJugadores] = useState([]);
  const [solitudesEnviadasAEquipos, setSolitudesEnviadasAEquipos] = useState([]);
  const [showVerModalJugadores, setShowVerModalJugadores] = useState(false);
  const [jugadoresDelBack, setJugadoresDelBack] = useState([]);
  const { user } = useUser();
  const id_jugador = user.id;
  const [shouldReload, setShouldReload] = useState(false);

  
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
  }, [shouldReload]);

  //Funcion que envia rechazar o aceptar al back y el id_solicitud
  const handleAceptarSolicitud = (idSolicitud) => {
    axios.post('http://localhost:3001/solicitudes/update', {
      id_solicitud: idSolicitud,
      estado: 'Aceptado'
    }).then(() => setShouldReload(prev => !prev));
  };
  const handleRechazarSolicitud = (idSolicitud) => {
    axios.post('http://localhost:3001/solicitudes/update', {
      id_solicitud: idSolicitud,
      estado: 'Rechazado'
    }).then(() => setShouldReload(prev => !prev))
    
  };
  const handleAceptarInvitacion = (idInvitacion) => {
    axios.post('http://localhost:3001/invitaciones/update', {
      id_invitacion: idInvitacion,
      estado: 'Aceptado'
    }).then(() => setShouldReload(prev => !prev));
  };
  const handleRechazarInvitacion = (idInvitacion) => {
    axios.post('http://localhost:3001/invitaciones/update', {
      id_invitacion: idInvitacion,
      estado: 'Rechazado'
    }).then(() => setShouldReload(prev => !prev))
  };

  const handleCancelarInvitacion = (idInvitacion) => {
    axios.post('http://localhost:3001/invitaciones/update', {
      id_invitacion: idInvitacion,
      estado: 'No enviado'
    }).then(() => setShouldReload(prev => !prev))
  };

  //Funcion para ver los jugadores de un equipo
  const fetchJugadores = async (idEquipo) => {
    //endpoint jugadores/equipo
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresDelBack(datos.data);
    setShowVerModalJugadores(true);
  };

  return (
    <div className='main centradoDeTabla'>
      <div className="tablaContainer">
        <h3 className='tituloTabla'>Los siguientes jugadores quieren unirse a tu equipo: </h3>
        <Table aria-label="Solicitudes Recibidas de Jugadores" removeWrapper>
          <TableHeader className='rounded-none'>
            {[
              { key: "nombre", label: "Nombre" },
              { key: "apellido", label: "Apellido" },
              { key: "edad", label: "Edad" },
              { key: "sexo", label: "Sexo" },
              { key: "telefono", label: "Teléfono" },
              { key: "nombre_equipo", label: "Nombre equipo"},
              { key: "acciones", label: "Acciones" },
            ].map((column) => (
              <TableColumn style={{ textAlign: 'center' }} key={column.key} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {solitudesRecibidasDeJugadores.map((item) => (
              <TableRow key={item.id_solicitud} className='py-1 px-0 contenidoTabla'>
                <TableCell className='py-1 px-0'>{item.nombre}</TableCell>
                <TableCell className='py-1 px-0'>{item.apellido}</TableCell>
                <TableCell className='py-1 px-0'>{item.edad}</TableCell>
                <TableCell className='py-1 px-0'>{item.sexo}</TableCell>
                <TableCell className='py-1 px-0'>{item.telefono}</TableCell>
                <TableCell className='py-1 px-0'>{item.nombre_equipo}</TableCell>
                <TableCell className='py-1 px-0'>
                  <Button onClick={() => handleAceptarSolicitud(item.id_solicitud)}>Aceptar</Button>
                  <Button onClick={() => handleRechazarSolicitud(item.id_solicitud)}>Rechazar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      

      <div className="tablaContainer">
        <h3 className='tituloTabla'>Los siguientes equipos quieren que te unas a ellos: </h3>
        <Table aria-label="Solicitudes Recibidas de Equipos" removeWrapper>
          <TableHeader className='rounded-none'>
            {[
              { key: "nombre_equipo", label: "Nombre del Equipo" },
              { key: "id_equipo", label: "Equipo" },
              { key: "acciones", label: "Acciones" },
            ].map((column) => (
              <TableColumn style={{ textAlign: 'center' }} key={column.key} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {solitudesRecibidasDeEquipos.map((item) => (
              <TableRow key={item.id_invitacion} className='py-1 px-0 contenidoTabla'>
                <TableCell className='py-1 px-0'>{item.nombre_equipo}</TableCell>
                <TableCell className='py-1 px-0'>
                  <button onClick={() => fetchJugadores(item.id_equipo)} className='botonVerJugadores2'>Ver jugadores</button>
                </TableCell>
                <TableCell className='py-1 px-0 flex justify-center gap-3'>
                  <button onClick={() => handleAceptarInvitacion(item.id_invitacion)} className="botonAceptarSolicitud">Aceptar</button>
                  <button onClick={() => handleRechazarInvitacion(item.id_invitacion)} className='botonRechazarSolicitud'>Rechazar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="tablaContainer">
        <h3 className='tituloTabla'>Haz invitado a los siguientes jugadores a que se unan a tu equipo</h3>
        <Table aria-label="Solicitudes Enviadas a Jugadores" removeWrapper>
          <TableHeader className='rounded-none'>
            {[
              { key: "nombre", label: "Nombre" },
              { key: "apellido", label: "Apellido" },
              { key: "edad", label: "Edad" },
              { key: "sexo", label: "Sexo" },
              { key: "telefono", label: "Teléfono" },
              { key: "nombre_equipo", label: "Equipo a invitar" },
              { key: "estado", label: "Estado" },
            ].map((column) => (
              <TableColumn style={{ textAlign: 'center' }} key={column.key} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {solitudesEnviadasAJugadores.map((item) => (
              <TableRow key={item.id_invitacion} className='py-1 px-0 contenidoTabla'>
                <TableCell className='py-1 px-0'>{item.nombre}</TableCell>
                <TableCell className='py-1 px-0'>{item.apellido}</TableCell>
                <TableCell className='py-1 px-0'>{item.edad}</TableCell>
                <TableCell className='py-1 px-0'>{item.sexo}</TableCell>
                <TableCell className='py-1 px-0'>{item.telefono}</TableCell>
                <TableCell className='py-1 px-0'>{item.nombre_equipo}</TableCell>
                <TableCell className='py-1 px-0 flex gap-5 justify-center'>
                  {item.estado}
                  {item.estado === "Pendiente" && (
                    <button onClick={() => handleCancelarInvitacion(item.id_invitacion)} className='botonCancelarSolicitud'>Cancelar solicitud</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="tablaContainer">
        <h3 className='tituloTabla'>Equipos a los que quieres unirte</h3>
        <Table aria-label="Solicitudes Enviadas a Equipos" removeWrapper>
          <TableHeader className='rounded-none'>
            {[
              { key: "nombre_equipo", label: "Nombre del Equipo" },
              { key: "id_equipo", label: "Equipo" },
              { key: "estado", label: "Estado" },
              { key: "acciones", label: "Acciones" },
            ].map((column) => (
              <TableColumn style={{ textAlign: 'center' }} key={column.key} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {solitudesEnviadasAEquipos.map((item) => (
              <TableRow key={item.id_solicitud} className='py-1 px-0 contenidoTabla'>
                <TableCell className='py-1 px-0'>{item.nombre_equipo}</TableCell>
                <TableCell className='py-1 px-0'>
                  <button onClick={() => fetchJugadores(item.id_equipo)} className='botonVerJugadores2'>Ver jugadores</button>
                </TableCell>
                <TableCell className='py-1 px-0'>{item.estado}</TableCell>
                <TableCell className='py-1 px-0'>
                  {item.estado === "Pendiente" && (
                    <button onClick={() => handleRechazarSolicitud(item.id_solicitud)}  className='botonCancelarSolicitud'>Cancelar solicitud</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalJugadores
        jugadores={jugadoresDelBack}
        show={showVerModalJugadores}
        onHide={() => setShowVerModalJugadores(false)}
      />
    </div>
  );
};

export default MisSolicitudes;