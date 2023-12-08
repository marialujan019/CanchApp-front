import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { consultarBaseDeDatos } from '../utils/Funciones';
import JugadoresModal from '../JugadoresModal/JugadoresModal';
import axios from 'axios';

const id_jugador = 1; //Esto hay que cambiar por el userConstext
const columns = [
  { key: "nombreEquipo", label: "Nombre del Equipo" },
  { key: "fecha", label: "Fecha del proximo partido" },
  { key: "cant_jug", label: "Jugadores" },
  { key: "solicitud", label: "Solicitud" },
  { key: "estado", label: "Estado" },
];

const BusquedaEquipo = () => {

  //Estados para renderizar los equipos
  const [equiposParaLaBusqueda, setEquiposParaLaBusqueda] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  //Estados para renderizar la selección de equipos
  const [jugadoresDeVerJugadores, setJugadoresDeVerJugadores] = useState([]);
  const [showJugadoresModal, setShowJugadoresModal] = useState(false);

  //Estados para el filtro
  const [filtroNombre, setFiltroNombre] = useState('');

  //Primer renderizado de la pagina, se renderiza cada vez que cambio el valor de refreshPage
  useEffect(() => {
    const fetchEquipos = async () => {
      const datos = await consultarBaseDeDatos('../json/equiposParaBusqueda.json');
      setEquiposParaLaBusqueda(datos);
    };
  
    fetchEquipos();
  }, [refreshPage]);


  //Esta función recibe el id_equipo el cual hay que mandarlo al back para recibir los datos
  //Los datos van a ser un arreglo de jugadores con el mismo id_equipo. Es decir, el arreglo de jugadores del equipo
  const fetchJugadores = async (idEquipo) => {
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresDeVerJugadores(datos);
    setShowJugadoresModal(true);
  };


  //Manejo de solicitudes
  //Lo que hago es enviarte el id del equipo al que le quiero enviar solicitud y mi id
  //Con esto, vos los agregar a la base de datos y deberias cambiar el estado del equipo
  const toggleSolicitudes = async (equipo) => {
    const palabraClave = "cancelar"
    if (equipo.estado === 'Pendiente') {
      console.log(`Se canceló la solicitud del jugador ${id_jugador} del equipo ${equipo.id_equipo}`);
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado') {
      const palabraClave = "enviar"
      console.log(`Se envió la solicitud del jugador ${id_jugador} al equipo ${equipo.id_equipo}`);
    }
    setRefreshPage((prev) => !prev)
  };

  const renderButton = (equipo) => {
    if (equipo.estado === 'Aceptado') {
      return <Button disabled color='success'>Aceptado</Button>;
    } else if (equipo.estado === 'Pendiente') {
      return (
        <Button onClick={() => toggleSolicitudes(equipo)} color='danger'>
          Cancelar solicitud
        </Button>
      );
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado') {
      return (
        <Button onClick={() => toggleSolicitudes(equipo)} color='primary'>
          Enviar solicitud
        </Button>
      );
    }
  };


  //Filtro de nombre
  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  // Filtrar equipos por nombre
  const equiposFiltrados = equiposParaLaBusqueda.filter(equipo => equipo.nombreEquipo.toLowerCase().startsWith(filtroNombre.toLowerCase()));
 

  return (
    <div>
      <div className='busquedaEquipoFiltroNombre'>
        <h4>Búsqueda por nombre</h4>
        <input
          type='text'
          value={filtroNombre}
          onChange={handleNombreChange}
        />
      </div>

      <Table aria-label="Equipos">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {equiposFiltrados.map((equipo) => (
            <TableRow key={equipo.id_equipo}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === 'cant_jug' ? (
                    <>
                      <div>
                        {equipo[column.key]}/{equipo.max_jug}
                      </div>
                      <Button onClick={() => fetchJugadores(equipo.id_equipo)}>
                        Ver jugadores
                      </Button>
                    </>
                  ) : column.key === 'solicitud' ? (
                    renderButton(equipo)
                  ) : (
                    equipo[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <JugadoresModal
        jugadores={jugadoresDeVerJugadores}
        show={showJugadoresModal}
        onHide={() => setShowJugadoresModal(false)}
      />
    </div>
  );
};

export default BusquedaEquipo;