import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const Calendario = ({fechas, canchas}) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState("2023-11-01");

    const handleReservaClick = (hora, cancha, disponibles) => {
        console.log("hola")
      };
      
      const renderCell = (hora, cancha) => {
        const horarioDisponibilidad = fechas.horario_disponibilidad || {};
        const disponibles = horarioDisponibilidad[hora]?.disponibles || [];
        const ocupadas = horarioDisponibilidad[hora]?.ocupadas || [];
      
        // Verifica si el id de la cancha actual está presente en el array de ocupadas
        const isOcupada = ocupadas.includes(cancha.id_cancha);
      
        if (isOcupada) {
          return (
            <button className='complejoBotonReservar' onClick={() => handleReservaClick(hora, cancha, ocupadas)}>
              No reservado
            </button>
          );
        } else if (disponibles.includes(cancha.id_cancha)) {
          return "No reservado";
        } else {
          return "";
        }
      };
      
    


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const selectedDate = new Date(dateString);
        selectedDate.setDate(selectedDate.getDate() + 1); // Sumar un día
        return selectedDate.toLocaleDateString(undefined, options);
    };

    const handleFechaSeleccionada = async (fecha) => {
        setFechaSeleccionada(fecha);
      };

    return (
        <div>

        <div className='complejoElegirFecha'>
          <div>
           <strong><label htmlFor="fecha" className='complejoLabel'>Seleccione una fecha:</label></strong>
            <input type="date" id="fecha" className="complejoCalendario" onChange={(e) => handleFechaSeleccionada(e.target.value)} />
          </div>
        </div>

        {fechas && (
          <div className='tablaContainer'>
            <h3 className='tituloTabla'>Fecha seleccionada {formatDate(fechaSeleccionada)}</h3>
            <Table removeWrapper aria-label="Tabla de fechas">
              <TableHeader isCompact className='rounded-none'>
                <TableColumn style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>Horarios</TableColumn>
                {canchas.map((cancha) => (
                  <TableColumn key={cancha.id_cancha} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>{cancha.nombre_cancha}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {Object.keys(fechas.horario_disponibilidad).map((hora) => (
                  <TableRow key={hora} className='py-0 px-0 contenidoTabla'>
                    <TableCell className='py-1 px-0'>{`${hora + ":00"}`}</TableCell>
                    {canchas.map((cancha) => (
                      <TableCell className='py-1 px-0' key={`${hora}-${cancha.id_cancha}`}>
                        {renderCell(hora, cancha)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
}

export default Calendario;
