import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useReservasContext } from '../reservasContext';
import axios from 'axios';
import { useUser } from '../UserContext';
import "./modalReservas.css"


const ModalReservas = ({ show, onHide, nuevaReserva, equipos, origen }) => {
  //Contexto de reserva
  const { agregarReserva } = useReservasContext();
  const { eliminarReserva } = useReservasContext();
  //Variables para manejar el botón de "Crear equipo"
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const navigate = useNavigate(); 
  //Id del jugador
  const { user } = useUser();
  const id_jugador = user.id;
  

  const handleReservarClick = () => {
    if (selectedEquipo) {
      const { id_jugador, fecha, hora } = nuevaReserva;
      eliminarReserva(parseInt(id_jugador), fecha, hora);
  
      alert(
        `ID Jugador: ${id_jugador}\nID Complejo: ${nuevaReserva.id_complejo}\nID Cancha: ${nuevaReserva.id_cancha}\nFecha: ${nuevaReserva.fecha}\nHora: ${nuevaReserva.hora}\nID Equipo seleccionado: ${selectedEquipo} \nID Agenda ${nuevaReserva.id_agenda}`
      );
      setReservas();
      navigate("/misEquipos");
    } else {
      alert('Selecciona un equipo antes de reservar.');
    }
  };
  

  const setReservas = () => {
    axios.post('http://localhost:3001/reservar', {
        id_agenda: nuevaReserva.id_agenda,
        id_equipo: selectedEquipo,
      })
  }

  //Esta función se usa cuando el jugador no tiene equipos, lo que hace es que le aparece el botón de "Crear equipo"
  //Al presionar ese botón aparece un mensaje en el cual permite guardar la reserva en mis reservas
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
            id_agenda: nuevaReserva.id_agendaDisponible
          };
          agregarReserva(reservaData);
          Swal.fire({
            text: "Tu equipo se guardó en 'Mis reservas'",
            icon: "success",
          });
          navigate("/misEquipos");
        } else {
          onHide();
        }
      });
    } else if (origen === "reservas") {
      navigate("/misEquipos");
    }
  };


  //Función para traer las reservas ya hechas por el usuario
  const renderEquiposSection = () => {
    
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">


      <Modal.Body className='modalReservaContainer'>
        <div className='modalReservaImgaenContainer'>
          <img className='modalReservaImgaen' src="/images/reserva/reserva.jpg" alt="" />
        </div>
        <div className='modalReservaTextoContainer'>
          <h3 className='modalReservaTitulo'>Finalizá tu reserva</h3>
          <div>
            <p className='px-1 m-0'><strong>Nombre del Complejo:</strong> {nuevaReserva.nombre_complejo}</p>
            <p className='px-1 m-0'><strong>Dirección del Complejo:</strong> {nuevaReserva.direccion_complejo}</p>
            <p className='px-1 m-0'><strong>Teléfono del Complejo:</strong> {nuevaReserva.telefono_complejo}</p>
            <p className='px-1 m-0'><strong>Nombre de la Cancha:</strong> {nuevaReserva.nombre_cancha}</p>
            <p className='px-1 m-0'><strong>Fecha de la Reserva:</strong> {nuevaReserva.fecha}</p>
            <p className='px-1 m-0'><strong>Hora de la Reserva:</strong> {nuevaReserva.hora}</p>
          </div>

          
          {equipos.length > 0 ? (
            <div className='noTienesEquipos'>
              <select className="elegirEquipoModalReserva" onChange={(e) => setSelectedEquipo(e.target.value)}>
                <option value="" defaultValue>Seleccione un equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id_equipo} value={equipo.id_equipo}>
                    {equipo.nombre_equipo}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <p className='noTienesEquipos'>No tienes equipos creados. ¿Deseas <button className='modalReservaBotonCrearEquipo' onClick={handleMisEquiposClick}>
              <u><strong>crear un equipo</strong></u>
              </button>?</p>
              
            </div>
          )}

          <div className='py-3 flex gap-3'>
            
            {equipos.length > 0 && (
              <Button variant="success" onClick={handleReservarClick}>
                Reservar
              </Button>
            )}
            <Button variant="danger" onClick={onHide}>
              Cancelar reserva
            </Button>
          </div>
        </div>

        
      </Modal.Body>


    </Modal>
  );
};

export default ModalReservas;