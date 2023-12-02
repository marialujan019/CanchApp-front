import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./jugadoresModal.css"

const JugadoresModal = ({ jugadores, show, onHide }) => {

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Jugadores</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        {jugadores.map((jugador, index) => (
          <div key={index} className='jugadoresModalContainer'>
            <p>Nombre: {jugador.nombre}</p>
            <p>Apellido: {jugador.apellido}</p>
            <p>Edad: {jugador.edad}</p>
            <p>Pie habil: {jugador.pie_habil}</p>
            <p>Sexo: {jugador.sexo}</p>
            <p>Posicion: {jugador.posicion}</p>
            <p>Telefono: {jugador.telefono}</p>
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
