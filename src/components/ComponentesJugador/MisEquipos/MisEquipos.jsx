import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";
import ModalJugadores from '../ModalJugadores/ModalJugadores';
import EditarEquipo from './EditarEquipo/EditarEquipo';
import CrearEquipo from './CrearEquipo/CrearEquipo';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router';
import "./misEquipos.css"

const columns = [
  { key: "nombre_equipo", label: "Nombre del Equipo" },
  { key: "cant_jugadores", label: "Cantidad de Jugadores" },
  { key: "publico", label: "Estado" },
  { key: "actions", label: "Acciones" }
];

const columnsEquiposDeFuera = [
  { key: "nombre_equipo", label: "Nombre del Equipo" },
  { key: "cant_max", label: "Cantidad de Jugadores" },
  { key: "actions", label: "Acciones" }
];

const MisEquipos = () => {
  const { user } = useUser();
  const id_capitan = user.id;
  //Variables para mostrar equipos
  const [misEquipos, setMisEquipos] = useState([]);
  const [jugadoresDelBack, setJugadoresDelBack] = useState([]);
  const [equiposDeFuera, setEquiposDeFuera] = useState([]);
  //Variable para ver los jugadores del equipo de fuera
  const[jugadoresEquiposDeFuera, setJugadoresEquiposDeFuera] = useState([]);
  //Variable del ver jugadores
  const [showVerModalJugadores, setShowVerModalJugadores] = useState(false);
  const [showVerModalJugadores2, setShowVerModalJugadores2] = useState(false);
  //Variable del editar jugadores
  const [showEditarModalJugadores, setShowEditarModalJugadores] = useState(false);
  const [idEquipoAEnviar, setIdEquipoAEnviar] = useState (null)
  const [visibilidadEquipoAEnviar, setVisibilidadEquipoAEnviar] = useState (null)
  const [nombreEquipoAEnviar, setNombreEquipoAEnviar] = useState (null)
  //Variable del crear jugadores
  const [showCrearEquipoModal, setShowCrearEquipoModal] = useState(false);
  //Variable para ir a mis equipos
  const navigate = useNavigate(); 

  //Función para obtener los equipos de un jugador
  useEffect(() => {
    const fetchEquipos = async () => {
      const datos = await axios.get(`http://localhost:3001/equipo/soy_capitan/${id_capitan}`);
      setMisEquipos(datos.data);
    };

    const fetchEquiposDeFuera = async () => {
      const datos = await axios.get(`http://localhost:3001/equipo/no_soy_capitan/${id_capitan}`);
      setEquiposDeFuera(datos.data);
    };

    fetchEquiposDeFuera()
    fetchEquipos();
  }, []);

  
   //Funcion para ver los equipos
   //Acá cada vez que apreto el botón para ver o editar los jugadores, se hace una llamada al back, con el id_equipo
   //Los valores de visibilidad y nombre equipo se obtienen mediante las funciones del renderCell
   const fetchJugadores = async (idEquipo, visibilidad, nombre_equipo, accion) => {
    console.log("id_equipo: " + idEquipo)
    if(accion === "ver") {
      console.log("VER")
      const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
      console.log(datos.data)
      setJugadoresDelBack(datos.data);
      setShowVerModalJugadores(true);
    } else if (accion === "editar") {
      const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
      setIdEquipoAEnviar(idEquipo)
      setVisibilidadEquipoAEnviar(visibilidad)
      setNombreEquipoAEnviar(nombre_equipo)
      setJugadoresDelBack(datos.data);
      setShowEditarModalJugadores(true);
    }
  };

  //Funcion para eliminar el equipo
  const handleEliminarEquipo = async (id_equipo, nombre_equipo) => {
    try {
      // Puedes realizar aquí las operaciones necesarias para eliminar el equipo
      await axios.delete(`http://localhost:3001/equipo/borrar/${id_equipo}`);
      console.log(`Se ha eliminado el equipo ${nombre_equipo} ${id_equipo}`);
      
      // Después de eliminar el equipo, actualiza la lista de equipos
      await updateMisEquipos();
    } catch (error) {
      console.error("Error al eliminar el equipo:", error);
    }
  };
  

  //Funcion para renderizar nuevamente Mis Equipos
  const updateMisEquipos = async () => {
    const datos = await axios.get(`http://localhost:3001/equipo/soy_capitan/${id_capitan}`);
    setMisEquipos(datos.data);
  };

  const handleCrearEquipo = () => {
    setShowCrearEquipoModal(true)
  }

  //Función para renderizar los equipos creados por el usuario
  const renderCell = useCallback((equipo, columnKey) => {
    const cellValue = equipo[columnKey];
    switch (columnKey) {
      case "nombre_equipo":
        return cellValue
      case "cant_jugadores":
        return `${cellValue}/${equipo.cant_max}`;
      case "publico":
        if(cellValue==true) return "Público"
        else return "Privado";
      case "actions":
        return (
          <div className="flex items-center space-x-3 justify-center">
            <Tooltip content="Ver detalles">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => fetchJugadores(equipo.id_equipo, equipo.publico, equipo.nombre_equipo, "ver")}><i class="bi bi-eye"></i></button>
            </Tooltip>
            <Tooltip content="Editar equipo">
            <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => fetchJugadores(equipo.id_equipo, equipo.publico, equipo.nombre_equipo, "editar")}><i class="bi bi-pencil"></i></button>
            </Tooltip>
            <Tooltip content="Eliminar equipo">
              <button className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleEliminarEquipo(equipo.id_equipo, equipo.nombre_equipo)} ><i class="bi bi-trash"></i></button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  
  //Función para traer los equipos en los que está el usuario, según el id_capitan
  //Al ser el id_capitan lo mismo que el id_jugador del jugador te envio eso para que me traigas los equipos del back
  //Onda, yo envio el id_jugador del usuario al back y me tiene que traer los equipos en los que está anotado
  const fetchJugadoresDeFuera = async (id_capitan, idEquipo) => {
    console.log(id_capitan)
    const datos = await axios.get(`http://localhost:3001/equipo/jugadores/${idEquipo}`);
    setJugadoresEquiposDeFuera(datos.data)
    console.log(jugadoresEquiposDeFuera)
    setShowVerModalJugadores2(true);
  };

  //Función para traer los equipos en los que está el usuario
  const renderCellEquiposDeFuera = useCallback((equipo, columnKey) => {
    const cellValue = equipo[columnKey];
  
    switch (columnKey) {
      case "nombre_equipo":
        return cellValue;
      case "cant_max":
        return `${equipo.cant_jugadores}/${cellValue}`;
      case "actions":
        return (
          <div className="flex items-center space-x-3 justify-center">
            <Tooltip content="Ver detalles">
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => fetchJugadoresDeFuera(id_capitan, equipo.id_equipo)}><i class="bi bi-eye"></i></button>
            </Tooltip>
          </div>
        );
      
    }
  }, []);



  return (
    <div className='fondo'>

      <div className='centradoDeTabla'>
      <div className='tablaContainer agregadoDebotonATabla'>
            <h3 className='tituloTabla'>Mis equipos creados</h3>
            <Table isStriped removeWrapper aria-label="Tabla de equipos creados">
              <TableHeader className='rounded-none'>
                {columns.map((column) => (
                  <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
                    {column.label}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {misEquipos.map((equipo) => (
                  <TableRow key={equipo.id_equipo} className='py-0 px-0 contenidoTabla '>
                    {columns.map((column) => (
                      <TableCell key={`${equipo.id_equipo}-${column.key}`} className='py-0 px-0'>
                        {renderCell(equipo, column.key)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Tooltip content="Crear equipo">
            <button className='botonCrearEquipo' onClick={handleCrearEquipo}><i class="bi bi-plus-circle-fill"></i></button>
            </Tooltip>
          </div>
      <div>

    
      <div className="tablaContainer agregadoDebotonATabla">
        <h3 className='tituloTabla'>Equipos</h3>
        <Table aria-label="Tabla de Equipos" removeWrapper isStriped >
          <TableHeader className='rounded-none'>
            {columnsEquiposDeFuera.map((column) => (
              <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {equiposDeFuera.map((equipo) => (
              <TableRow key={equipo.id_equipo} className='py-0 px-0 contenidoTabla'>
                {columnsEquiposDeFuera.map((column) => (
                  <TableCell key={`${equipo.id_equipo}-${column.key}`} className='py-0 px-0'>
                    {renderCellEquiposDeFuera(equipo, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Tooltip content="Buscar equipo">
            <button className='botonCrearEquipo' onClick={()=>{navigate(`/buscarequipo/${id_capitan}`)}}><i class="bi bi-plus-circle-fill"></i></button>
        </Tooltip>
      </div>
      </div>

      <div>
          <CrearEquipo
            show={showCrearEquipoModal}
            onHide={() => setShowCrearEquipoModal(false)}
            updateMisEquipos={updateMisEquipos} // Pasa la función para renderizar Mis Equipos como prop
            equiposYaCreados={misEquipos}
          />
        </div>
      </div>                     

      <ModalJugadores
        jugadores={jugadoresDelBack}
        show={showVerModalJugadores}
        onHide={() => setShowVerModalJugadores(false)}
        invitarJugadores={true}
      />

      <ModalJugadores
        jugadores={jugadoresEquiposDeFuera}
        show={showVerModalJugadores2}
        onHide={() => setShowVerModalJugadores2(false)}
      />

      <EditarEquipo
        jugadores={jugadoresDelBack}
        show={showEditarModalJugadores}
        onHide={() => setShowEditarModalJugadores(false)}
        id_equipo={idEquipoAEnviar}
        visibilidad={visibilidadEquipoAEnviar}
        nombre_equipo={nombreEquipoAEnviar}
        id_capitan={id_capitan}
        updateMisEquipos={updateMisEquipos} // Pasa la función para renderizar Mis Equipos como prop
      />

    </div>
  );
};

export default MisEquipos;