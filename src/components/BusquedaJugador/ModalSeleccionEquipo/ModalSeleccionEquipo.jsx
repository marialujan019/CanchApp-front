import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import { Modal } from 'react-bootstrap';

const columns = [
  { key: "nombre_equipo", label: "Nombre del Equipo" },
  { key: "cant_jug", label: "Cantidad de Jugadores" },
  { key: "solicitud", label: "Solicitud" },
  { key: "estado", label: "Estado" },
];

//Se trae el id del jugador al que le voy a enviar la solicitud y los equipos que tengo armados para agregar al jugador
const ModalSeleccionEquipo = ({ equipos, idJugadorAInvitar, id_capitan, refrescarEquipos, show, onHide }) => {

  //Esta fnción lo que hace es que, si el capitan cancela una solicitud que envió al jugador, envia el id_equipo y el id_jugadorAInVitar al back
  //Entonces, se elimina la solicitud, entonces el jugador deja de estar "Pendiente" para estar "No enviado"
  //Y si se envia solicitud, lo mismo
  //El refrescar equipo es es para que me regreses los jugadores con sus nuevos estados para cambiar los botones
  const toggleSolicitud = async (equipo) => {
    
    if (equipo.estado === 'Pendiente') {
      const palabraClave = "cancelar"
      console.log(`Se eliminó la solicitud del jugador ${idJugadorAInvitar} del equipo ${equipo.id_equipo}`);
      await refrescarEquipos(id_capitan, idJugadorAInvitar);
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado') {
      const palabraClave = "enviar"
      console.log(`Se envió la solicitud del jugador ${idJugadorAInvitar} al equipo ${equipo.id_equipo}`);
      await refrescarEquipos(id_capitan, idJugadorAInvitar);
    }
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
            <Button onClick={() => toggleSolicitud(equipo)} color='danger'>
              Cancelar solicitud
            </Button>
          );
        } else if (equipo.estado === null || equipo.estado === undefined || equipo.estado === 'Rechazado') {
          return (
            <Button onClick={() => toggleSolicitud(equipo)} color='primary'>
              {equipo.estado ? 'Reenviar solicitud' : 'Enviar solicitud'}
            </Button>
          );
        }
      case 'estado':
        return equipo.estado || 'No enviado'; // Renderiza el estado o 'No enviado' si es null o undefined
      default:
        return equipo[column.key];
    }
  };

  
//ACA IRIAN LAS INVITACIONES
  return (
    <Modal show={show} onHide={onHide} centered>
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

