import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

const columns = [
  { key: "nombre_equipo", label: "Nombre del Equipo" },
  { key: "cant_jug", label: "Cantidad de Jugadores" },
  { key: "solicitud", label: "Solicitud" },
  { key: "estado", label: "Estado" },
];

const ModalSeleccionEquipo = ({ equipos, idJugadorAInvitar, id_capitan, refrescarEquipos, show, onHide }) => {
  const [modalKey, setModalKey] = useState(0);

  const toggleEnviarSolicitud = async (equipo) => {
    await axios.post('http://localhost:3001/invitaciones', {
      id_jugador: idJugadorAInvitar,
      id_equipo: equipo.id_equipo,
      id_capitan: id_capitan,
    });
    await refrescarEquipos(id_capitan, idJugadorAInvitar);
    setModalKey((prevKey) => prevKey + 1);
  };

  const toggleCancelarSolicitud = async (equipo) => {
    await axios.delete(`http://localhost:3001/invitaciones/borrar/${idJugadorAInvitar}/${equipo.id_equipo}`)
    .then(await refrescarEquipos(id_capitan, idJugadorAInvitar))
    .then(setModalKey((prevKey) => prevKey + 1))
  };

  const renderCell = (equipo, column) => {
    switch (column.key) {
      case 'cant_jug':
        return `${equipo.cant_jugadores}/${equipo.cant_max}`;
      case 'solicitud':
        if (equipo.estado === 'Aceptado') {
          return <Button disabled color='success'>Ya formas parte de este equipo</Button>;
        } else if (equipo.estado === 'Pendiente') {
          return (
            <Button onClick={() => toggleCancelarSolicitud(equipo)} color='danger'>
              Cancelar invitacion
            </Button>
          );
        } else if (equipo.estado === "Rechazado" || equipo.estado === "No enviado" || equipo.estado === 'Rechazado') {
          return (
            <Button onClick={() => toggleEnviarSolicitud(equipo)} color='primary'>
              Enviar invitacion
            </Button>
          );
        }
      case 'estado':
        return equipo.estado || 'No enviado';
      default:
        return equipo[column.key];
    }
  };

  return (
    <Modal show={show} key={modalKey} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Equipos Disponibles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {equipos.length === 0 || equipos === null ? (
          <p>No tienes equipos</p>
        ) : (
          <div>
            <Table aria-label="Equipos">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody>
                {equipos.map((equipo) => (
                  <TableRow key={equipo.id_equipo}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {renderCell(equipo, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSeleccionEquipo;
