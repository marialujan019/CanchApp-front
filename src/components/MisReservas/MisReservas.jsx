import React, { useEffect, useState } from 'react';
import { useReservasContext } from '../reservasContext';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import ModalReservas from '../ModalReservas/ModalReservas';
import { consultarBaseDeDatos } from '../utils/Funciones';
import { useUser } from '../UserContext';

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

  //Variable para continuar con la reserva
  const [showModal, setShowModal] = useState(false);
  const [continuarReserva, setContinuarReserva] = useState({});

  //Variable para recibir los equipos del jugador
  const [equipos, setEquipos] = useState([]);

  //Id del jugador
  const { user } = useUser();
  const id_jugador = user.id;

  // Se tiene que llamar a los equipos del jugador para que pueda elegir
  const fetchEquipos = async (id_jugador) => {
    console.log(id_jugador)
    const datos = await consultarBaseDeDatos(`../json/equiposDeUnJugador.json`);
    setEquipos(datos);
  };

  // Se envían estos datos al modalReservas para continuar con la reserva
  const handleContinuarReserva = (reserva) => {
    setShowModal(true);
    const nuevaReserva = {
      id_jugador: id_jugador,
      id_complejo: reserva.id_complejo,
      nombre_complejo: reserva.nombre_complejo,
      direccion_complejo: reserva.direccion,
      telefono_complejo: reserva.telefono,
      id_cancha: reserva.id_cancha,
      nombre_cancha: reserva.nombre_cancha,
      fecha: reserva.fecha,
      hora: reserva.hora,
    };
    fetchEquipos(nuevaReserva.id_jugador);
    setContinuarReserva(nuevaReserva);
  };

  const handleEliminarReserva = (idJugador, fecha, hora) => {
    eliminarReserva(idJugador, fecha, hora);
  };

  //Función que debe enviar el id_jugador y recibir las reservas ya hechas
  useEffect(() => {
    const fetchReservas = async () => {
      const datos = await consultarBaseDeDatos(`../json/reservas.json`);
      setReservasHechas(datos);
    };

    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas pendientes</h2>
      <Table aria-label="Mis Reservas">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={misReservas}>
          {(reserva) => (
            <TableRow key={`${id_jugador}-${reserva.fecha}-${reserva.hora}`}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "acciones" ? (
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
          )}
        </TableBody>
      </Table>

      <h2>Reservas hechas</h2>
      <Table aria-label="Reservas Hechas">
        <TableHeader columns={columns2}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={reservasHechas}>
          {(reserva) => (
          <TableRow key={`${reserva.id_reserva}-${reserva.fecha}-${reserva.hora}`}>
            {columns2.map((column) => (
              <TableCell key={column.key}>{reserva[column.key]}</TableCell>
            ))}
          </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalReservas 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        nuevaReserva={continuarReserva} 
        equipos={equipos} 
        origen={"complejo"} 
      />
    </div>
  );
};

export default MisReservas;
