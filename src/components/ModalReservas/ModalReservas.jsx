import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalReservas = ({ show, onHide, nuevaReserva, equipos }) => {
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const navigate = useNavigate()

  const handleReservarClick = () => {
    // Verificar si se ha seleccionado un equipo
    if (selectedEquipo) {
      // Mostrar alert con los datos
      alert(
        `ID Jugador: ${nuevaReserva.id_jugador}\nID Complejo: ${nuevaReserva.id_complejo}\nID Cancha: ${nuevaReserva.id_cancha}\nFecha: ${nuevaReserva.fecha}\nHora: ${nuevaReserva.hora}\nID Equipo seleccionado: ${selectedEquipo}`
      );
      setReservas();
      navigate("/misEquipos");
    } else {
      // Si no se ha seleccionado un equipo, mostrar un mensaje
      alert('Selecciona un equipo antes de reservar.');
    }
  };

  const setReservas = () => {
    axios.post('http://localhost:3001/reservar', {
        id_agenda: nuevaReserva.id_agenda,
        id_equipo: selectedEquipo,
      })
  }

  const renderEquiposSection = () => {
    if (equipos.length > 0) {
      return (
        <div>
          <p>Selecciona un equipo:</p>
          <select onChange={(e) => setSelectedEquipo(e.target.value)}>
            <option value="" defaultValue>
              Seleccione un equipo
            </option>
            {equipos.map((equipo) => (
              <option key={equipo.id_equipo} value={equipo.id_equipo}>
                {equipo.nombre_equipo}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div>
          <p>No tienes equipos creados.</p>
          <Button variant="primary"  onClick={() => navigate('/misEquipos')}>
            Crea un equipo
          </Button>
        </div>
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Reserva</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Nombre del Complejo: {nuevaReserva.nombre_complejo}</p>
        <p>Dirección del Complejo: {nuevaReserva.direccion_complejo}</p>
        <p>Teléfono del Complejo: {nuevaReserva.telefono_complejo}</p>
        <p>Nombre de la Cancha: {nuevaReserva.nombre_cancha}</p>
        <p>Fecha de la Reserva: {nuevaReserva.fecha}</p>
        <p>Hora de la Reserva: {nuevaReserva.hora}</p>

        {renderEquiposSection()}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancelar reserva
        </Button>
        {equipos.length > 0 && (
          <Button variant="primary" onClick={handleReservarClick}>
            Reservar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReservas;
