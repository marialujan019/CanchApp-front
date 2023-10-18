import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./jugadoresModal.css"

const JugadoresModal = ({ equipo, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jugadores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {equipo.jugadores.map((jugador) => (
            <div key={jugador.id}  className='jugadoresModalContainer'>
              <img src={jugador.foto} alt="" />
              <p>Nombre: {jugador.nombre}</p>
              <p>Edad: {jugador.edad}</p>
              <p>Partidos Jugados: {jugador.partidosJugados}</p>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JugadoresModal;
