import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import { consultarBaseDeDatos } from '../utils/Funciones';
import ModalReservas from '../ModalReservas/ModalReservas';

const id_jugador = 4
const Complejo = () => {
  //Variable para obtener el id del complejo mediante la ruta
  const { id_complejo } = useParams();

  //Variable para poner los datos del complejo y sus canchas
  const [complejo, setComplejo] = useState(null);
  const [canchas, setCanchas] = useState([]);

  //Variable para obtener el equipo
  const [equipos, setEquipos] = useState([]);


  //Variables para manejar las fechas
  const [fechas, setFechas] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  //Variable para manejar el formulario de reserva
  const [nuevaReserva, setNuevaReserva] = useState({});
  const [showModal, setShowModal] = useState(false);
   
  useEffect(() => {
    if (Object.keys(nuevaReserva).length > 0) {
      setShowModal(true);
    }
  }, [nuevaReserva]);
  useEffect(() => {//Esta función trae los datos de un complejo, segun el id_complejo del use params
    //O sea, toma el paramtro 1 de la url, que es el id_complejo y la envia al back
    async function fetchComplejo(id_complejo) {
      console.log(id_complejo)
      const jsonDataComplejo = await consultarBaseDeDatos('../json/complejo.json');
      setComplejo(jsonDataComplejo);
    }

    async function fetchCanchas(id_complejo) { //Funcion para traer un json con las canchas segun el id_complejo
      console.log(id_complejo)
      const jsonDataCanchas = await consultarBaseDeDatos('../json/canchasDeUnComplejo.json');
      setCanchas(jsonDataCanchas);
    }

    async function fetchEquiposDelJugador(id_jugador) { //Funcion para traer un json con los equipos creados por un jugador
      console.log(id_jugador)
      const jsonDataEqipos = await consultarBaseDeDatos('../json/equiposDeUnJugador.json');
      setEquipos(jsonDataEqipos);
    }

    // Llamar a fetchFechas inicialmente para cargar fechas según la fecha seleccionada
    fetchComplejo(id_complejo);
    fetchCanchas(id_complejo);
    fetchEquiposDelJugador(id_jugador)
  }, [id_complejo]);

   // Función para obtener las fechas disponibles según la fecha seleccionada
   //Se tiene que enviar la variable fecha al back
   const fetchFechas = async (fecha) => {
    const jsonDataFechas = await consultarBaseDeDatos('../json/fechas.json');
    setFechas(jsonDataFechas);

    // Verificar si la fecha seleccionada es válida
    //Esto sirve para cuando el administrador no define una fecha, 
    //si el administrador no define una cierta fecha y el jugador quiere ver esa fecha no definida, me vas a enviar "fecha_seleccionada": null, entonces pongo que no está disponible
    const fechaSeleccionadaValida = fecha === jsonDataFechas.fecha_seleccionada;
    if (!fechaSeleccionadaValida) {
      // Mostrar mensaje de fecha no disponible y limpiar las fechas
      setFechas(null);
    }
  };


  // Función para manejar el cambio de fecha
  const handleFechaSeleccionada = async (fecha) => {
    setFechaSeleccionada(fecha);
    // Llamar a fetchFechas para actualizar las fechas según la nueva fecha seleccionada
    fetchFechas(fecha);
  };

  if (!complejo) {
    return <div>No existe el complejo seleccionado</div>;
  }

  const renderCell = (hora, cancha) => {
    const disponibles = fechas.horario_disponibilidad[hora]?.disponibles || [];
    const ocupadas = fechas.horario_disponibilidad[hora]?.ocupadas || [];

    if (disponibles.includes(cancha.id_cancha)) {
      return <Button onClick={() => handleReservaClick(hora, cancha)}>Reservar</Button>;
    } else if (ocupadas.includes(cancha.id_cancha)) {
      return "No disponible";
    } else {
      return ""; // Puedes ajustar esto según tus necesidades
    }
  };

  //Función para crear el formulario de reserva

  const handleReservaClick = (hora, cancha) => {
    const reserva = {
      id_jugador: id_jugador,
      id_complejo: complejo.id_complejo,
      nombre_complejo: complejo.nombre,
      direccion_complejo: complejo.direccion,
      telefono_complejo: complejo.telefono,
      id_cancha: cancha.id_cancha,
      nombre_cancha: cancha.nombre_cancha,
      fecha: fechaSeleccionada,
      hora: hora,
    };

    setNuevaReserva(reserva);
    console.log(nuevaReserva)
    setShowModal(true);
  };


  return (
    <div>
      <ModalReservas
          show={showModal}
          onHide={() => setShowModal(false)}
          nuevaReserva={nuevaReserva}
          equipos={equipos}
        />
      <div className='Complejo'>
        <h2>{complejo.nombre}</h2>
        <p>Dirección: {complejo.direccion}</p>
        <p>Teléfono: {complejo.telefono}</p>
        <p>Descripcion: {complejo.descripcion}</p>
      </div>
  
      <div>
        <label htmlFor="fecha">Seleccione una fecha:</label>
        <input type="date" id="fecha" onChange={(e) => handleFechaSeleccionada(e.target.value)} />
      </div>
  
      <div className='Grilla'>
      {fechas && (
        <Table>
          <TableHeader>
            <TableColumn>Horarios</TableColumn>
            {canchas.map((cancha) => (
              <TableColumn key={cancha.id_cancha}>{cancha.nombre_cancha}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {Object.keys(fechas.horario_disponibilidad).map((hora) => (
              <TableRow key={hora}>
                <TableCell>{hora}</TableCell>
                {canchas.map((cancha) => (
                  <TableCell key={`${hora}-${cancha.id_cancha}`}>
                    {renderCell(hora, cancha)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      </div>
    </div>
  );
};

export default Complejo;
