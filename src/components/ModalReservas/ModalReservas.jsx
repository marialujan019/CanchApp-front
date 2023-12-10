import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useReservasContext } from '../reservasContext';

const ModalReservas = ({ show, onHide, nuevaReserva, equipos, origen }) => {
  const { agregarReserva } = useReservasContext(); // Mover esto aquí
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const navigate = useNavigate(); 

  const handleReservarClick = () => {
    if (selectedEquipo) {
      alert(
        `ID Jugador: ${nuevaReserva.id_jugador}\nID Complejo: ${nuevaReserva.id_complejo}\nID Cancha: ${nuevaReserva.id_cancha}\nFecha: ${nuevaReserva.fecha}\nHora: ${nuevaReserva.hora}\nID Equipo seleccionado: ${selectedEquipo}`
      );
    } else {
      alert('Selecciona un equipo antes de reservar.');
    }
  };

  const handleMisEquiposClick = () => {
    if (origen === "complejo") {
      Swal.fire({
        title: "¿Quieres guardar la reserva?",
        text: "Puedes continuar con ella en 'Mis reservas'",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar la reserva",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const reservaData = {
            id_jugador: nuevaReserva.id_jugador,
            id_complejo: nuevaReserva.id_complejo,
            id_cancha: nuevaReserva.id_cancha,
            nombre_complejo: nuevaReserva.nombre_complejo,
            direccion_complejo: nuevaReserva.direccion_complejo,
            telefono_complejo: nuevaReserva.telefono_complejo,
            nombre_cancha: nuevaReserva.nombre_cancha,
            fecha: nuevaReserva.fecha,
            hora: nuevaReserva.hora,
          };
          agregarReserva(reservaData);
          console.log(reservaData);
          Swal.fire({
            text: "Tu equipo se guardó en 'Mis reservas'",
            icon: "success",
          });
          navigate("/misReservas");
        } else {
          onHide();
        }
      });
    } else if (origen === "reservas") {
    }
  };


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
          <Button variant="primary" onClick={handleMisEquiposClick}>
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