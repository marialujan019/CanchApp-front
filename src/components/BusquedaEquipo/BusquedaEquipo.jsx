import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import JugadoresModal from '../JugadoresModal/JugadoresModal';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

const columns = [
  { key: "nombre_equipo", label: "Nombre del Equipo" },
  { key: "proximo_partido", label: "Fecha del proximo partido" },
  { key: "cant_jugadores", label: "Jugadores" },
  { key: "solicitud", label: "Solicitud" },
  { key: "estado", label: "Estado" },
];

const BusquedaEquipo = () => {

  //Estados para renderizar los equipos
  const [equiposParaLaBusqueda, setEquiposParaLaBusqueda] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { id_jugador } = useParams();

  //Estados para renderizar la selección de equipos
  const [jugadoresDeVerJugadores, setJugadoresDeVerJugadores] = useState([]);
  const [showJugadoresModal, setShowJugadoresModal] = useState(false);

  //Estados para el filtro
  const [filtroNombre, setFiltroNombre] = useState('');

  //Primer renderizado de la pagina, se renderiza cada vez que cambio el valor de refreshPage
  useEffect(() => {
    const fetchEquipos = async () => {
      const datos = await axios.get(`http://localhost:3001/equipo/buscar/${id_jugador}`)
      console.log("BUSCAR: " + datos.data)
      setEquiposParaLaBusqueda(datos.data);
    };
  
    fetchEquipos();
  }, [refreshPage]);


  //Esta función recibe el id_equipo el cual hay que mandarlo al back para recibir los datos
  //Los datos van a ser un arreglo de jugadores con el mismo id_equipo. Es decir, el arreglo de jugadores del equipo
  const fetchJugadores = async (idEquipo) => {
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresDeVerJugadores(datos.data);
    setShowJugadoresModal(true);
  };


  //Manejo de solicitudes
  //Lo que hago es enviarte el id del equipo al que le quiero enviar solicitud y mi id
  //Con esto, vos los agregar a la base de datos y deberias cambiar el estado del equipo
  const toggleSolicitudes = async (equipo) => {
    if (equipo.estado === 'Pendiente') {
      await axios.delete(`http://localhost:3001/solicitudes/borrar/${id_jugador}/${equipo.id_equipo}`)
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado') {
      axios.post('http://localhost:3001/solicitudes', {
        id_jugador: id_jugador,
        id_equipo: equipo.id_equipo
      })
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
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado' || equipo.estado === null) {
      return (
        <Button onClick={() => toggleSolicitudes(equipo)} color='primary'>
          Enviar solicitud
        </Button>
      );
    } else if(equipo.estado) {
      return <Button disabled color='success'> {equipo.estado} </Button>;

    }
  };


  //Filtro de nombre
  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  // Filtrar equipos por nombre
  const equiposFiltrados = equiposParaLaBusqueda.filter(equipo => equipo.nombre_equipo.toLowerCase().startsWith(filtroNombre.toLowerCase()));
  const jsonString = JSON.stringify(equiposFiltrados);

  console.log("Equipos filtrados: " + jsonString)

  return (
    <div className='centradoDeTabla'>
      <div className='busquedaEquipoFiltroNombre'>
        <h4>Búsqueda por nombre</h4>
        <input
          type='text'
          value={filtroNombre}
          onChange={handleNombreChange}
        />
      </div>

      <div className="tablaContainer">
        <h3 className='tituloTabla'>Jugadores disponibles</h3>
        <Table aria-label="Equipos" removeWrapper className="scrollable-table">
          <TableHeader className='rounded-none'>
            {columns.map((column) => (
              <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {equiposFiltrados.map((equipo) => (
              <TableRow key={equipo.id_equipo} className='py-0 px-0 contenidoTabla'>
                {columns.map((column) => (
                  <TableCell key={`${equipo.id_equipo}-${column.key}`} className='py-0 px-0'>
                    {column.key === 'cant_jugadores' ? (
                      <>
                        <Button onClick={() => fetchJugadores(equipo.id_equipo)}>
                          <i className="bi bi-eye"></i> {equipo[column.key]}/{equipo.cant_max}
                        </Button>
                      </>
                    ) : column.key === 'solicitud' ? (
                      renderButton(equipo)
                    ) : (
                      // Modificación aquí
                      column.key === 'proximo_partido' && equipo[column.key] === null ? (
                        "Este equipo no tiene próximos partidos"
                      ) : (
                        equipo[column.key]
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <JugadoresModal
        jugadores={jugadoresDeVerJugadores}
        show={showJugadoresModal}
        onHide={() => setShowJugadoresModal(false)}
      />
    </div>
  );
};

export default BusquedaEquipo;