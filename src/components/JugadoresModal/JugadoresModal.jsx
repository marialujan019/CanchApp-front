import React, {useCallback} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from '@nextui-org/react';
import "./jugadoresModal.css";
import { Link, useParams, useNavigate } from 'react-router-dom';

const columns = [
  { key: "nombre", label: "Jugador" },
  { key: "pie_habil", label: "Pie Hábil" },
  { key: "sexo", label: "Sexo" },
  { key: "posicion", label: "Posición" },
  { key: "telefono", label: "Teléfono" },
];

const JugadoresModal = ({ jugadores, show, onHide }) => {
  const navigate = useNavigate()

  const renderCell = useCallback((jugador, columnKey) => {
    const cellValue = jugador[columnKey];
  
    switch (columnKey) {
      case "nombre":
        return (
          <User
            avatarProps={{ radius: "lg", src: jugador.imagen }}
            description={`Edad: ${jugador.edad}`}
            name={`${jugador.nombre} ${jugador.apellido}`}
          >
            {jugador.email}
          </User>
        );
      case "edad":
      case "sexo":
      case "telefono":
        return cellValue;
      case "pie_habil":
      case "posicion":
        return cellValue || "Información privada";
      default:
        return cellValue;
    }
  }, []);
  

  const handleBuscarJugadores =() => {
    navigate('/buscarjugador')
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jugadores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table aria-label="Tabla de Jugadores">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} align="start">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={jugadores}>
            {(item) => (
              <TableRow key={item.id_jug}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="secondary" onClick={handleBuscarJugadores}>
          Invitar jugadores
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JugadoresModal;
