import React, { useEffect, useState } from 'react';
import { useReservasContext } from '../reservasContext';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import ModalReservas from '../ModalReservas/ModalReservas';
import { useUser } from '../UserContext';
import "./misReservas.css"
import axios from 'axios';
import {  useParams } from 'react-router-dom';


const columns = [
  { key: "nombre_complejo", label: "Nombre Complejo" },
  { key: "direccion_complejo", label: "Dirección Complejo" },
  { key: "telefono_complejo", label: "Teléfono Complejo" },
  { key: "nombre_cancha", label: "Nombre Cancha" },
  { key: "fecha", label: "Fecha" },
  { key: "hora", label: "Hora" },
  { key: "acciones", label: "Acciones" },
];

const columns2 = [
  { key: "nombre_complejo", label: "Nombre Complejo" },
  { key: "direccion", label: "Dirección Complejo" },
  { key: "telefono", label: "Teléfono Complejo" },
  { key: "nombre_cancha", label: "Nombre Cancha" },
  { key: "fecha", label: "Fecha" },
  { key: "hora", label: "Hora" },
  { key: "nombre_equipo", label: "Equipo"},
  { key: "estado", label: "Estado" },
];

const MisReservas = () => {
  //Variables para manejar las reservas
  const { misReservas, eliminarReserva } = useReservasContext();
  const [reservasHechas, setReservasHechas] = useState([]);
  const { id_jugador } = useParams();

  //Variable para continuar con la reserva
  const [showModal, setShowModal] = useState(false);
  const [continuarReserva, setContinuarReserva] = useState({});

  //Variable para recibir los equipos del jugador
  const [equipos, setEquipos] = useState([]);

  // Se tiene que llamar a los equipos del jugador para que pueda elegir
  const fetchEquipos = async (id_jugador) => {
    try {
      const datos = await axios.get(`http://localhost:3001/equipo/soy_capitan/${id_jugador}`);
      setEquipos(datos.data);
    } catch (error) {
      console.error("Error al obtener equipos:", error);
    }
  };

  // Se envían estos datos al modalReservas para continuar con la reserva
  const handleContinuarReserva = (reserva) => {
    setShowModal(true);
    const nuevaReserva = {
      id_jugador: id_jugador,
      id_complejo: reserva.id_complejo,
      nombre_complejo: reserva.nombre_complejo,
      direccion_complejo: reserva.direccion_complejo,
      telefono_complejo: reserva.telefono_complejo,
      id_cancha: reserva.id_cancha,
      nombre_cancha: reserva.nombre_cancha,
      fecha: reserva.fecha,
      hora: reserva.hora,
    };
    fetchEquipos(nuevaReserva.id_jugador);
    setContinuarReserva(nuevaReserva);
  };

  const handleEliminarReserva = async (idJugador, fecha, hora) => {
    try {
      await eliminarReserva(parseInt(idJugador), fecha, hora);
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    };
  };

  //Función que debe enviar el id_jugador y recibir las reservas ya hechas
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const datos = await axios.get(`http://localhost:3001/reservas/mis-reservas/${id_jugador}`);
        setReservasHechas(datos.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservas();
  }, [id_jugador]); 

  return (
    <div className='main centradoDeTabla'>
      <div className="tablaContainer">
      <h3 className='tituloTabla'>Continuar reserva</h3>
      <Table aria-label="Mis Reservas" removeWrapper>
        <TableHeader className='rounded-none'>
          {columns.map((column) => (
            <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {misReservas.map((reserva) => (
            <TableRow key={`${id_jugador}-${reserva.fecha}-${reserva.hora}`} className='py-0 px-0 contenidoTabla'>
              {columns.map((column) => (
                <TableCell key={`${id_jugador}-${column.key}`} className='py-0 px-0'>
                  {column.key === 'acciones' ? (

                    <>
                      <Button onClick={() => handleContinuarReserva(reserva)}>Continuar reserva</Button>
                      <Button onClick={() => handleEliminarReserva(id_jugador, reserva.fecha, reserva.hora)}>
                        Eliminar reserva
                      </Button>
                    </>
                  ) : (
                    reserva[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

      <div className="tablaContainer">
      <h3 className='tituloTabla'>Reservas hechas</h3>
      <Table aria-label="Reservas Hechas" removeWrapper>
        <TableHeader className='rounded-none'>
          {columns2.map((column) => (
            <TableColumn key={column.key} className='headerTabla py-0 px-0' style={{ textAlign: 'center' }}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {reservasHechas.map((reserva) => (
            <TableRow key={`${reserva.id_reserva}-${reserva.fecha}-${reserva.hora}`} className='py-0 px-0 contenidoTabla'>
              {columns2.map((column) => (
                <TableCell key={`${reserva.id_reserva}-${column.key}`} className='py-0 px-0'>
                  {reserva[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      <ModalReservas 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        nuevaReserva={continuarReserva} 
        equipos={[]} 
        origen={"reservas"} 
      />
    </div>
  );
};

export default MisReservas;
