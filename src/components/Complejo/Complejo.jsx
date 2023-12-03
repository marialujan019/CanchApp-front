import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import { consultarBaseDeDatos } from '../utils/Funciones';

const Complejo = () => {
  const { id_complejo } = useParams();
  const [complejo, setComplejo] = useState(null);
  const [canchas, setCanchas] = useState([]);
  const [fechas, setFechas] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

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

  useEffect(() => {
    async function fetchComplejo() {
      const jsonDataComplejo = await consultarBaseDeDatos('../json/complejo.json');
      setComplejo(jsonDataComplejo);
    }

    async function fetchCanchas() {
      const jsonDataCanchas = await consultarBaseDeDatos('../json/canchasDeUnComplejo.json');
      setCanchas(jsonDataCanchas);
    }

    // Llamar a fetchFechas inicialmente para cargar fechas según la fecha seleccionada
    fetchFechas();

    fetchComplejo();
    fetchCanchas();
  }, [id_complejo]);



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

  //Función para crear el formulario de reserva
  const handleReservaClick = (hora, canchas) => {
    const nuevaReserva = {
      id_complejo: complejo.id_complejo,
      nombre_complejo: complejo.nombre,
      direccion_complejo: complejo.direccion,
      telefono_complejo: complejo.telefono,
      id_cancha: canchas.id_cancha,
      nombre_cancha: canchas.nombre_cancha,
      fecha: fechaSeleccionada,
      hora: hora,
    };
    
    console.log(nuevaReserva)
    // Obtener las reservas existentes o inicializar un nuevo array
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
    // Verificar duplicados
    const esDuplicado = reservas.some(
      (reserva) =>
        reserva.id_complejo === nuevaReserva.id_complejo &&
        reserva.id_cancha === nuevaReserva.id_cancha &&
        reserva.fecha === nuevaReserva.fecha &&
        reserva.hora === nuevaReserva.hora
    );
  
    if (esDuplicado) {
      console.log('¡Reserva duplicada!');
      return;
    }
  
    // Verificar límite de reservas (10 reservas máximas)
    if (reservas.length >= 10) {
      console.log('¡Has alcanzado el límite de 10 reservas!');
      return;
    }
  
    // Agregar la nueva reserva al array
    reservas.push(nuevaReserva);
  
    // Guardar el array actualizado en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

  };


  const columns = [
    {
      key: "hora",
      label: "Horarios",
    },
    ...canchas.map(cancha => ({
      key: `cancha_${cancha.nombre_cancha}`,
      label: `Cancha ${cancha.nombre_cancha}`,
    })),
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

  return (
    <div>
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
        {fechas ? (
          <Table aria-label="Tabla de Disponibilidad">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.hora}>
                  {(columnKey) => (
                    <TableCell>
                      {item[columnKey] === "Disponible" ? (
                        <Button
                          onClick={() => handleReservaClick(item.hora, canchas.find(c => c.nombre_cancha === columnKey.slice(7)))}
                          color="primary"
                        >
                          Reservar
                        </Button>
                      ) : (
                        'No disponible'
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div>Fecha no disponible</div>
        )}
      </div>
    </div>
  );
};

export default Complejo;
