import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import ModalReservas from '../ModalReservas/ModalReservas';
import axios from 'axios';
import { useUser } from '../UserContext';

const Complejo = () => {
  //Variable para obtener el id del complejo mediante la ruta
  const { id_complejo } = useParams();
  const { user } = useUser();
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
  
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    if (Object.keys(nuevaReserva).length > 0) {
      setShowModal(true);
    }
  }, [nuevaReserva]);
  useEffect(() => {//Esta función trae los datos de un complejo, segun el id_complejo del use params
    //O sea, toma el paramtro 1 de la url, que es el id_complejo y la envia al back

    async function fetchEquiposDelJugador(id_jugador) { //Funcion para traer un json con los equipos creados por un jugador
      console.log(id_jugador)
      //endpoint mis_equipos
      const jsonDataEqipos = await axios.get(`http://localhost:3001/equipo/mis_equipos/${id_jugador}`);
      console.log("ACAAAAA: " + id_jugador)
      setEquipos(jsonDataEqipos.data);
    }

    async function fetchComplejo() { //Función para obtener el JSON del complejo desde el back
      /*const jsonDataComplejo = await consultarBaseDeDatos('../json/complejo.json');
      const complejoSeleccionado = jsonDataComplejo.id_complejo === id_complejo;
      setComplejo(complejoSeleccionado ? jsonDataComplejo : null);*/
      axios.get(`http://localhost:3001/complejo/${id_complejo}`).then(
        res => {
          var complejo = res.data.complejo
          console.log(complejo)
          if(complejo) {
            setComplejo(complejo)
          } else {
              alert("Error al obtener los datos del complejo")
          }
        })
    }

    async function fetchCanchas(id_complejo) { //Funcion para traer un json con las canchas segun el id_complejo
      axios.get(`http://localhost:3001/complejo/canchas/${id_complejo}`).then(
        res => {
          var canchas = res.data.canchas
          if(canchas) {
            console.log(canchas)
              setCanchas(canchas)
          } else {
              alert("Error al obtener canchas del complejo")
          }
        }
      )
      //Revisar este set, ya que el BE va a la base de datos, a la tabla canchas, 
      //y ya trae todas las canchas del complejo seleccionado.
      //setCanchas(jsonDataCanchas.filter(cancha => cancha.id_complejo === id_complejo));
    }

    async function fetchFechas() { //Función para obtener el JSON de las fechas disponibles desde el back
      //Esto sería del complejo, no?
      const jsonDataFechas = await axios.get(`http://localhost:3001/complejo/agenda/turnos/${id_complejo}`);
      setFechas(jsonDataFechas);
    }

    // Llamar a fetchFechas inicialmente para cargar fechas según la fecha seleccionada
    fetchComplejo(id_complejo);
    fetchCanchas(id_complejo);
    fetchEquiposDelJugador(id_jugador)
  }, [id_complejo]);

   // Función para obtener las fechas disponibles según la fecha seleccionada
   //Se tiene que enviar la variable fecha al back
   const fetchFechas = async (fecha) => {
    const jsonDataFechas = await axios.get(`http://localhost:3001/complejo/agenda/turnos/${id_complejo}/${fecha}`);
    setFechas(jsonDataFechas.data);
    console.log(jsonDataFechas.data)
    // Verificar si la fecha seleccionada es válida
    //Esto sirve para cuando el administrador no define una fecha, 
    //si el administrador no define una cierta fecha y el jugador quiere ver esa fecha no definida, me vas a enviar "fecha_seleccionada": null, entonces pongo que no está disponible
    const fechaSeleccionadaValida = fecha === jsonDataFechas.data.fecha_seleccionada;
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

  // Renderizar solo si hay fechas disponibles
  const horarios = fechas?.horario_disponibilidad ? Object.keys(fechas.horario_disponibilidad) : [];
  const disponibilidadPorCancha = canchas.map(cancha => ({
    cancha: cancha.nombre_cancha,
    disponibilidad: horarios.map(hora => ({
      hora,
      disponible: fechas?.horario_disponibilidad[hora]?.disponibles.includes(Number(cancha.id_cancha)),
    })),
  }));

  //Renderizado de fechas
  const columns = [
    { key: "hora", label: "Horarios" },
    ...canchas.map(cancha => ({ key: `cancha_${cancha.nombre_cancha}`, label: `Cancha ${cancha.nombre_cancha}` })),
  ];

  const rows = horarios.map(hora => {
    const row = { hora };
    canchas.forEach(cancha => {
      row[`cancha_${cancha.nombre_cancha}`] = fechas?.horario_disponibilidad[hora]?.disponibles.includes(Number(cancha.id_cancha))
        ? "Disponible"
        : "Ocupada";
    });
    return row;
  });

  //Función para crear el formulario de reserva

  const handleReservaClick = (hora, cancha, id_agendaDisponible) => {
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
      id_agenda: id_agendaDisponible
    };

    setNuevaReserva(reserva);
    setShowModal(true);
  };


  return (
    <div>
      <ModalReservas
          show={showModal}
          onHide={() => setShowModal(false)}
          nuevaReserva={nuevaReserva}
          equipos={equipos}
          origen={"complejo"}
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