import React, { useEffect, useState, useCallback } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button } from "@nextui-org/react";
import JugadoresModal from '../JugadoresModal/JugadoresModal';
import EditarEquipo from './EditarEquipo/EditarEquipo';
import CrearEquipo from './CrearEquipo/CrearEquipo';

const id_capitan = 23;
const MisEquipos = () => {

  const [misEquipos, setMisEquipos] = useState([]);
  const [jugadoresDelBack, setJugadoresDelBack] = useState([]);
  //Variable del ver jugadores
  const [showVerJugadoresModal, setShowVerJugadoresModal] = useState(false);
  //Variable del editar jugadores
  const [showEditarJugadoresModal, setShowEditarJugadoresModal] = useState(false);
  const [idEquipoAEnviar, setIdEquipoAEnviar] = useState (null)
  const [visibilidadEquipoAEnviar, setVisibilidadEquipoAEnviar] = useState (null)
  const [nombreEquipoAEnviar, setNombreEquipoAEnviar] = useState (null)
  //Variable del crear jugadores
  const [showCrearEquipoModal, setShowCrearEquipoModal] = useState(false);



  //Función para obtener los equipos de un jugador
  useEffect(() => {
    const fetchEquipos = async () => {
      const datos = await consultarBaseDeDatos('../json/equiposDeUnJugador.json');
      setMisEquipos(datos);
    };

    fetchEquipos();
  }, []);

  
   //Funcion para ver los equipos
   //Acá cada vez que apreto el botón para ver o editar los jugadores, se hace una llamada al back, con el id_equipo
   //Los valores de visibilidad y nombre equipo se obtienen mediante las funciones del renderCell
   const fetchJugadores = async (idEquipo, visibilidad, nombre_equipo, accion) => {
    if(accion === "ver") {
      const datos = await consultarBaseDeDatos(`../json/jugadoresDeUnEquipo.json`);
      setJugadoresDelBack(datos);
      setShowVerJugadoresModal(true);
    } else if (accion === "editar") {
      const datos = await consultarBaseDeDatos(`../json/jugadoresDeUnEquipo.json`);
      setIdEquipoAEnviar(idEquipo)
      setVisibilidadEquipoAEnviar(visibilidad)
      setNombreEquipoAEnviar(nombre_equipo)
      setJugadoresDelBack(datos);
      setShowEditarJugadoresModal(true);
    }
  };

  //Funcion para eliminar el equipo
  const handleEliminarEquipo = (id_equipo, nombre_equipo) => {
    // Puedes realizar aquí las operaciones necesarias para eliminar el equipo
    console.log(`Se ha eliminado el equipo ${nombre_equipo} ${id_equipo}`);
  };

  //Funcion para renderizar nuevamente Mis Equipos
  //Basicamente envio esta funcion al editarEquipos para que, cuando se confirmen los cambios, se refresque la pagina
  const updateMisEquipos = async () => {
    const datos = await consultarBaseDeDatos('../json/equiposDeUnJugador.json');
    setMisEquipos(datos);
  };

  const handleCrearEquipo = (id_capitan) => {
    setShowCrearEquipoModal(true)
  }

  
  const renderCell = useCallback((equipo, columnKey) => {
    const cellValue = equipo[columnKey];

    switch (columnKey) {
      case "nombre_equipo":
        return cellValue
      case "cant_jug":
        return `${cellValue}/${equipo.max_jug}`;
      case "publico":
        if(cellValue==true) return "Público"
        else return "Privado";
      case "actions":
        return (
          <div className="flex items-center space-x-3 justify-center">
            <Tooltip content="Ver detalles">
              {/* En este boton se llama al back para que me devuelva el arreglo de jugadres pertenecientes al equipo con el id_seleccionado */}
              {/* O sea, este botón está en una fila donde hay un equipo obtenido del back, tomo el id_equipo de ese equipo y lo paso como parametro, junto con la visibilidad y el nombre */}
              <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => fetchJugadores(equipo.id_equipo, equipo.publico, equipo.nombre_equipo, "ver")}><i class="bi bi-eye"></i></button>
            </Tooltip>
            <Tooltip content="Editar equipo">
              {/* En este boton se llama al back para que me devuelva el arreglo de jugadres pertenecientes al equipo con el id_seleccionado */}
            <button className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => fetchJugadores(equipo.id_equipo, equipo.publico, equipo.nombre_equipo, "editar")}><i class="bi bi-pencil"></i></button>
            </Tooltip>
            <Tooltip content="Eliminar equipo">
              {/* En este boton se envia al back el id_del equipo y el nombre lo uso para un mensaje */}
              <button className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleEliminarEquipo(equipo.id_equipo, equipo.nombre_equipo)} ><i class="bi bi-trash"></i></button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns = [
    {
      key: "nombre_equipo",
      label: "Nombre del Equipo",
    },
    {
      key: "cant_jug",
      label: "Cantidad de Jugadores",
    },
    {
      key: "publico",
      label: "Estado",
    },
    {
      key: "actions",
      label: "Acciones",
    },
  ];

  return (
    <div>
      <h2>Mis Equipos</h2>

      {((misEquipos.length === 0) || misEquipos === null )? (
        <p>No tienes equipos</p>
      ) : (
        <div>
          <Table aria-label="Tabla de Equipos">
         
          <TableHeader columns={columns} >
            {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={misEquipos}>
            {(equipo) => (
              <TableRow key={equipo.id_equipo}>
                {(columnKey) => <TableCell>{renderCell(equipo, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
          </Table>
        </div>
      )}

      <Button onClick={handleCrearEquipo}>Crear equipo</Button>
      <div>
        
      </div>


      <div>
        <CrearEquipo
          show={showCrearEquipoModal}
          onHide={() => setShowCrearEquipoModal(false)}
          updateMisEquipos={updateMisEquipos} // Pasa la función para renderizar Mis Equipos como prop
          equiposYaCreados={misEquipos}
        />
      </div>


      <JugadoresModal
        jugadores={jugadoresDelBack}
        show={showVerJugadoresModal}
        onHide={() => setShowVerJugadoresModal(false)}
      />

      <EditarEquipo
        jugadores={jugadoresDelBack}
        show={showEditarJugadoresModal}
        onHide={() => setShowEditarJugadoresModal(false)}
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