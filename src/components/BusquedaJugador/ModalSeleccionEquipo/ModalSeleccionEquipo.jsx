import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';



const ModalSeleccionEquipo = ({ equipos }) => {
  const columns = [
    {
      key: 'nombre_equipo',
      label: 'Nombre equipo',
    },
    {
      key: 'cant_jug',
      label: 'Cantidad de jugadores',
    },
    {
      key: 'seleccionar',
      label: 'Seleccionar',
    },
  ];

  return (
    <Table aria-label="Equipos">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={equipos}>
        {(equipo) => (
          <TableRow key={equipo.id_equipo}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === 'seleccionar' ? (
                  <button onClick={() => handleSeleccionarEquipo(equipo)}>Seleccionar</button>
                ) : (
                  equipo[columnKey]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

// Función para manejar la selección de un equipo (puedes implementarla según tus necesidades)
const handleSeleccionarEquipo = (equipo) => {
  console.log(`Equipo seleccionado: ${equipo.nombre_equipo}`);
};

export default ModalSeleccionEquipo;
