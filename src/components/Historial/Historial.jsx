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
    <div>

      {/* Partidos a Jugar */}
      <h2>Partidos a Jugar</h2>
      <Table aria-label="Partidos a Jugar">
        
        <TableHeader columns={columns} >
          {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={partidosAJugar}>
          {(item) => (
            <TableRow key={item.id_reserva}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Partidos Jugados */}
      <h2>Partidos Jugados</h2>
      <Table aria-label="Partidos Jugados">
        <TableHeader columns={columns} >
          {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={partidosJugados}>
          {(item) => (
            <TableRow key={item.id_reserva}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Historial;

