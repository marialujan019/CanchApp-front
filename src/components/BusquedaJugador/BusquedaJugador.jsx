import React, { useState, useEffect  } from 'react';
import './busquedaJugador.css';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@nextui-org/react";
import ModalSeleccionEquipo from './ModalSeleccionEquipo/ModalSeleccionEquipo';
import axios from 'axios';
import { useUser } from '../UserContext';

const columns = [
  { key: "nombre_apellido", label: "Nombre y Apellido" },
  { key: "edad", label: "Edad" },
  { key: "pie_habil", label: "Pie Hábil" },
  { key: "sexo", label: "Sexo" },
  { key: "telefono", label: "Teléfono" },
  { key: "posicion", label: "Posición" },
  { key: "solicitud", label: "Solicitud" },
];


const BusquedaJugador = () => {
  //Estados para renderizar los jugadores
  const [jugadoresParaLaBusqueda, setJugadoresParaLaBusqueda] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const { user } = useUser();

  const id_capitan = user.id;
  // Estados para los filtros
  const [filtroEdad, setFiltroEdad] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");
  const [filtroPieHabil, setFiltroPieHabil] = useState("");
  const [filtroPosicion, setFiltroPosicion] = useState("");
  const [filtroNombre, setFiltroNombre] = useState('');

  //Estados para renderizar la selección de equipos
  const [equiposDelBack, setEquiposDelBack] = useState([])
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);  
  const [idJugadorAInvitar, setIdJugadorAInvitar] = useState();


  // Primer renderizado de la pagina
  useEffect(() => {
    const fetchJugadores = async () => {
      const datos = await axios.get(`http://localhost:3001/jugadores/${id_capitan}`);
      setJugadoresParaLaBusqueda(datos.data);
    };
  
    fetchJugadores();
  }, [refreshPage]);
  
  // Manejo de cambios en los filtros
  const handleFiltroEdadChange = (value) => {
    //NO HAY EDAD EN LA BASE DE DATOS
    setFiltroEdad(value);
    setRefreshPage((prev) => !prev); // Cambiar refreshPage para refrescar la página
  };
  
  const handleFiltroSexoChange = (value) => {
    const filtroSexo = jugadoresParaLaBusqueda.filter(item => item.sexo === value)
    setJugadoresParaLaBusqueda(filtroSexo)
    setFiltroSexo(value);
    setRefreshPage((prev) => !prev); // Cambiar refreshPage para refrescar la página
  };
  
  const handleFiltroPieHabilChange = (value) => {
    const filtroPieHabil = jugadoresParaLaBusqueda.filter(item => item.pie_habil === value)
    setJugadoresParaLaBusqueda(filtroPieHabil)
    setFiltroPieHabil(value);
    setRefreshPage((prev) => !prev); // Cambiar refreshPage para refrescar la página
  };
  
  const handleFiltroPosicionChange = (value) => {
    const filtroPosicion = jugadoresParaLaBusqueda.filter(item => item.posicion === value)
    setJugadoresParaLaBusqueda(filtroPosicion)
    setFiltroPosicion(value);
    setRefreshPage((prev) => !prev); // Cambiar refreshPage para refrescar la página
  };
  
  // Actualizar filtros y mostrar en consola
  useEffect(() => {
    const actualizarFiltros = async () => {
      const filtrosAEnviar = [filtroEdad, filtroSexo, filtroPieHabil, filtroPosicion].filter(Boolean).join(',');
      console.log(filtrosAEnviar); // Se envía esto al back y se vuelve a refrescar la página
    };
  
    actualizarFiltros();
  }, [refreshPage, filtroEdad, filtroSexo, filtroPieHabil, filtroPosicion]);
  
  // Restablecer filtros
  const handleLimpiarFiltros = () => {
    setFiltroEdad("");
    setFiltroSexo("");
    setFiltroPieHabil("");
    setFiltroPosicion("");
    setRefreshPage((prev) => !prev); // Cambiar refreshPage para refrescar la página
  };

  const handleNombreChange = (e) => {
    const input = e.target.value.toLowerCase();
    setFiltroNombre(input);
  };
  
  const jugadoresFiltrados = jugadoresParaLaBusqueda.filter(
    (jugador) =>
      jugador.nombre.toLowerCase().startsWith(filtroNombre.toLowerCase()) ||
      jugador.apellido.toLowerCase().startsWith(filtroNombre.toLowerCase()) ||
      `${jugador.nombre} ${jugador.apellido}`.toLowerCase().startsWith(filtroNombre.toLowerCase())
  );
  


  //Manejo de solicitudes
  //Función para recibir los equipos desde el back enviando el id_capitan
  const fetchEquipos = async (id_capitan, idJugadorAInvitar) => {
    const datos = await axios.get(`http://localhost:3001/equipo/mis_equipos/${id_capitan}`);
    setIdJugadorAInvitar(idJugadorAInvitar);
    setEquiposDelBack(datos.data);
    setShowSolicitudModal(true);
  };

  return (
    <div className='busquedaJugadorContainer main'>
      <div className='busquedaJugadorFiltroNombre'>
        <h4>Búsqueda por nombre o apellido</h4>
        <input
          type='text'
          value={filtroNombre}
          onChange={handleNombreChange}
        />
      </div>
      <div className='busquedaJugadorFiltros'>
        <h3>Filtros</h3>
        <div className='busquedaJugadorFiltroEdad'>
          <label>
            Edad:
            <select value={filtroEdad} onChange={(e) => handleFiltroEdadChange(e.target.value)}>
              <option value="">Filtro</option>
              <option value="5-13">5-13</option>
              <option value="13-18">13-18</option>
              <option value="mayores18">Mayores de 18</option>
            </select>
          </label>
        </div>

        <div className='busquedaJugadorFiltroSexo'>
          <label>
            Sexo:
            <select value={filtroSexo} onChange={(e) => handleFiltroSexoChange(e.target.value)}>
              <option value="">Filtro</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </label>
        </div>

        <div className='busquedaJugadorFiltroPieHabil'>
          <label>
            Pie Hábil:
            <select value={filtroPieHabil} onChange={(e) => handleFiltroPieHabilChange(e.target.value)}>
              <option value="">Filtro</option>
              <option value="derecho">Derecho</option>
              <option value="izquierdo">Izquierdo</option>
            </select>
          </label>
        </div>

        <div className='busquedaJugadorFiltroPosicion'>
          <label>
            Posición:
            <select value={filtroPosicion} onChange={(e) => handleFiltroPosicionChange(e.target.value)}>
              <option value="">Filtro</option>
              <option value="arquero">Arquero</option>
              <option value="defensor">Defensor</option>
              <option value="mediocampista">Mediocampista</option>
              <option value="delantero">Delantero</option>
            </select>
          </label>
        </div>

        <Button color="primary" onClick={handleLimpiarFiltros}>Eliminar Filtros</Button>
      </div>

      <div>
        <Table aria-label="Tabla con contenido dinámico">
         <TableHeader columns={columns}>
           {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
         </TableHeader>
         <TableBody>
            {jugadoresFiltrados.map((jugador) => (
              <TableRow key={jugador.id_jugador}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.key === "nombre_apellido" ? (
                      `${jugador["nombre"]} ${jugador["apellido"]}`
                    ) : column.key !== "solicitud" ? (
                      column.key === "pie_habil" || column.key === "posicion" ? (
                        jugador[column.key] == null ? "Información privada" : jugador[column.key]
                      ) : (
                        jugador[column.key]
                      )
                    ) : (
                      <Button color="primary" onClick={() => fetchEquipos(id_capitan, jugador.id_jugador)}> Ver solicitud </Button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ModalSeleccionEquipo
        equipos={equiposDelBack}
        show={showSolicitudModal}
        onHide={() => setShowSolicitudModal(false)}
        idJugadorAInvitar={idJugadorAInvitar}
        id_capitan = {id_capitan}
        refrescarEquipos = {fetchEquipos}
      />
      
    </div>
  );
}

export default BusquedaJugador;


