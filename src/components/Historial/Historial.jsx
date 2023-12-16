import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import axios from 'axios';


const columns = [
  { key: "nombre_complejo", label: "Complejo" },
  { key: "nombre_cancha", label: "Cancha" },
  { key: "fechaYHora", label: "Fecha y Hora" },
  { key: "nombre_equipo", label: "Equipo" },
];

const Historial = () => {
  //sacarlo del context
  const id_jugador = 1;
  const [historialData, setHistorialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //id === id_jugador
        const data = await axios.get(`http://localhost:3001/reservas/historial/${id_jugador}`); 
        setHistorialData(data.data);
      } catch (error) {
        console.error('Error al obtener datos del historial', error);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date();

  // Filtra los datos según la fecha actual
  const partidosAJugar = historialData.filter(item => new Date(item.fechaYHora) > currentDate);
  const partidosJugados = historialData.filter(item => new Date(item.fechaYHora) <= currentDate);

  

  return (
    <div className='main centradoDeTabla'>

      <div className="tablaContainer">
        <h3 className='tituloTabla'>Partidos a Jugar</h3>
        <Table aria-label="Partidos a Jugar" removeWrapper>
          <TableHeader className='rounded-none'>
            {columns.map((column) => (
              <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {partidosAJugar.map((item) => (
              <TableRow key={item.id_reserva} className='py-0 px-0 contenidoTabla'>
                {columns.map((column) => (
                  <TableCell key={`${item.id_reserva}-${column.key}`} className='py-0 px-0'>
                    {getKeyValue(item, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="tablaContainer">
      <h3 className='tituloTabla'>Partidos Jugados</h3>
      <Table aria-label="Partidos Jugados" removeWrapper>
        <TableHeader className='rounded-none'>
          {columns.map((column) => (
            <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {partidosJugados.map((item) => (
            <TableRow key={item.id_reserva} className='py-0 px-0 contenidoTabla'>
              {columns.map((column) => (
                <TableCell key={`${item.id_reserva}-${column.key}`} className='py-0 px-0'>
                  {getKeyValue(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      
    </div>
  );
};

export default Historial;

