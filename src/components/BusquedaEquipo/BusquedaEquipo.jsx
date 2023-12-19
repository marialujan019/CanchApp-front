import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import JugadoresModal from '../JugadoresModal/JugadoresModal';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import {Input} from "@nextui-org/react";
import "./busquedaEquipo.css"

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
  const { id_jugador } = useParams();
  const [forceUpdate, setForceUpdate] = useState(false);

  //Estados para renderizar la selección de equipos
  const [jugadoresDeVerJugadores, setJugadoresDeVerJugadores] = useState([]);
  const [showJugadoresModal, setShowJugadoresModal] = useState(false);

  //Estados para el filtro
  const [filtroNombre, setFiltroNombre] = useState('');

  //Primer renderizado de la pagina
  useEffect(() => {
    const fetchEquipos = async () => {
      const datos = await axios.get(`http://localhost:3001/equipo/buscar/${id_jugador}`)
      console.log("BUSCAR: " + datos.data)
      setEquiposParaLaBusqueda(datos.data);
    };
  
    fetchEquipos();
  }, [forceUpdate]);
  

  //Esta función recibe el id_equipo el cual hay que mandarlo al back para recibir los datos
  //Los datos van a ser un arreglo de jugadores con el mismo id_equipo. Es decir, el arreglo de jugadores del equipo
  const fetchJugadores = async (idEquipo) => {
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresDeVerJugadores(datos.data);
    setShowJugadoresModal(true);
  };

  const forceComponentUpdate = async () => {
    setForceUpdate((prev) => !prev);
  };

  //Manejo de solicitudes
  //Lo que hago es enviarte el id del equipo al que le quiero enviar solicitud y mi id
  //Con esto, vos los agregar a la base de datos y deberias cambiar el estado del equipo
  const toggleSolicitudEnviar = async (equipo) => {
    try {
      await axios.post('http://localhost:3001/solicitudes', {
        id_jugador: id_jugador,
        id_equipo: equipo.id_equipo
      });
      setEquiposParaLaBusqueda((equipos) => {
        const updatedEquipos = equipos.map((e) =>
          e.id_equipo === equipo.id_equipo ? { ...e, estado: 'Pendiente' } : e
        );
        return updatedEquipos;
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const toggleSolicitudRechazar = async (equipo) => {
    try {
      await axios.delete(`http://localhost:3001/solicitudes/borrar/${id_jugador}/${equipo.id_equipo}`).then(
        setEquiposParaLaBusqueda((equipos) => {
          
          return equipos.map((e) =>
            e.id_equipo === equipo.id_equipo ? { ...e, estado: 'No enviado' } : e
          )
        })
      )
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  const renderButton = (equipo) => {
    if (equipo.estado === 'Ya perteneces a este equipo') {
      return <p className='m-0'>Ya perteneces a este equipo</p>;
    } else if (equipo.estado === 'Pendiente') {
      return (
        <button className='botonCancelarSolicitud' onClick={() => toggleSolicitudRechazar(equipo)} color='danger'>
          Cancelar solicitud
        </button>
      );
    } else if (equipo.estado === 'No enviado' || equipo.estado === 'Rechazado') {
      return (
        <button className="botonEnviarSolicitud" onClick={() => toggleSolicitudEnviar(equipo)} color='primary'>
          Enviar solicitud
        </button>
      );
    } else if (equipo.estado) {
      return <Button disabled color='success'> {equipo.estado} </Button>;
    }
  };


  //Filtro de nombre
  const handleNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };

  // Filtrar equipos por nombre
  const equiposFiltrados = equiposParaLaBusqueda.filter(equipo => equipo.nombre_equipo.toLowerCase().startsWith(filtroNombre.toLowerCase()));


  return (
    <div className='centradoDeTabla busquedaJugadorContainer'>
      <div className='busquedaEquipoFiltroNombre'>
        <Input
          className='busquedaEquipoFiltroNombre'
          type="text"
          placeholder="Busqueda por nombre"
          value={filtroNombre}
          onChange={handleNombreChange}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small"><i class="bi bi-search"></i></span>
            </div>
          }
        />
      </div>

      <div className="tablaContainer">
        <h3 className='tituloTabla'>Equipos disponibles</h3>
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
              <TableRow key={equipo.id_equipo} className='py-1 px-0 contenidoTabla'>
                {columns.map((column) => (
                  <TableCell key={`${equipo.id_equipo}-${column.key}`} className='py-1 px-0'>
                    {column.key === 'cant_jugadores' ? (
                      <>
                        <button className='botonVerJugadores' onClick={() => fetchJugadores(equipo.id_equipo)}>
                          <i className="bi bi-eye "></i> {equipo[column.key]}/{equipo.cant_max}
                        </button>
                      </>
                    ) : column.key === 'solicitud' ? (
                      renderButton(equipo)
                    ) : (
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