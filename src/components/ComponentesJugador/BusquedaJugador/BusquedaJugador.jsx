import React, { useState, useEffect  } from 'react';
import './busquedaJugador.css';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button } from "@nextui-org/react";
import ModalSeleccionEquipo from './ModalSeleccionEquipo/ModalSeleccionEquipo';
import axios from 'axios';
import { useUser } from '../../UserContext';
import {Input} from "@nextui-org/react";
import { Select, SelectItem } from '@nextui-org/react';

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
  const [jugadoresOriginales, setJugadoresOriginales] = useState([]);


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
      setJugadoresOriginales(datos.data);
      setJugadoresParaLaBusqueda(datos.data);
    };
  
    fetchJugadores();
  }, [refreshPage]);

  
  // Manejo de cambios en los filtros
  // Manejo de cambios en los filtros
const handleFiltroEdadChange = (value) => {
  let filtroEdadResult = [];

  switch (value) {
    case "5-13":
      filtroEdadResult = jugadoresOriginales.filter((item) => item.edad >= 5 && item.edad <= 13);
      break;
    case "13-18":
      filtroEdadResult = jugadoresOriginales.filter((item) => item.edad >= 13 && item.edad <= 18);
      break;
    case "mayores18":
      filtroEdadResult = jugadoresOriginales.filter((item) => item.edad > 18);
      break;
    default:
      filtroEdadResult = jugadoresOriginales;
      break;
  }

  setJugadoresParaLaBusqueda(filtroEdadResult);
  setFiltroEdad(value);
};

const handleFiltroSexoChange = (value) => {
  const filtroSexo = jugadoresOriginales.filter((item) => item.sexo === value);
  setJugadoresParaLaBusqueda(filtroSexo);
  setFiltroSexo(value);
};

const handleFiltroPieHabilChange = (value) => {
  const filtroPieHabil = jugadoresOriginales.filter((item) => item.pie_habil === value);
  setJugadoresParaLaBusqueda(filtroPieHabil);
  setFiltroPieHabil(value);
};

const handleFiltroPosicionChange = (value) => {
  const filtroPosicion = jugadoresOriginales.filter((item) => item.posicion === value);
  setJugadoresParaLaBusqueda(filtroPosicion);
  setFiltroPosicion(value);
};


  
  // Restablecer filtros
  const handleLimpiarFiltros = () => {
    setFiltroEdad("");
    setFiltroSexo("");
    setFiltroPieHabil("");
    setFiltroPosicion("");
    setJugadoresParaLaBusqueda(jugadoresOriginales);
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
  


//son los equipos del capitan a los cuales se puede unir el jugador
  const fetchEquipos = async (id_capitan, idJugadorAInvitar) => {
    console.log("invitar jugador" + idJugadorAInvitar)
    const datos = await axios.get(`http://localhost:3001/equipo/buscar/${id_capitan}/${idJugadorAInvitar}`);
    setIdJugadorAInvitar(idJugadorAInvitar);
    setEquiposDelBack(datos.data);
    setShowSolicitudModal(true);
  };

  return (
    <div className='busquedaJugadorContainer main'>
      <div className='busquedaJugadorFiltroNombre'>
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
          endContent={
            <div className='busquedaJugadorFiltros'>
              <div className='busquedaJugadorFiltroEdad'>
                <label>
                  <select value={filtroEdad} onChange={(e) => handleFiltroEdadChange(e.target.value)}>
                    <option value="">Edad</option>
                    <option value="5-13">5-13</option>
                    <option value="13-18">13-18</option>
                    <option value="mayores18">Mayores de 18</option>
                  </select>
                </label>
              </div>

              <div className='busquedaJugadorFiltroSexo'>
                <label>
                  <select value={filtroSexo} onChange={(e) => handleFiltroSexoChange(e.target.value)}>
                    <option value="">Sexo</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </label>
              </div>

              <div className='busquedaJugadorFiltroPieHabil'>
                <label>
                  <select value={filtroPieHabil} onChange={(e) => handleFiltroPieHabilChange(e.target.value)}>
                    <option value="">Pié habil</option>
                    <option value="derecho">Derecho</option>
                    <option value="izquierdo">Izquierdo</option>
                  </select>
                </label>
              </div>

              <div className='busquedaJugadorFiltroPosicion'>
                <label className='busquedaJugadorLabel'>
                  <select value={filtroPosicion} onChange={(e) => handleFiltroPosicionChange(e.target.value)}>
                    <option value="">Posición</option>
                    <option value="arquero">Arquero</option>
                    <option value="defensor">Defensor</option>
                    <option value="mediocampista">Mediocampista</option>
                    <option value="delantero">Delantero</option>
                  </select>
                </label>
              </div>
              <button color="primary" onClick={handleLimpiarFiltros}>Eliminar Filtros</button>
            </div>
          }
        />
      </div>
      

      <div className='centradoDeTabla'>
        <div className="tablaContainer">
          <h3 className='tituloTabla'>Jugadores disponibles</h3>
          <Table aria-label="si" removeWrapper>
            <TableHeader className='rounded-none'>
              {columns.map((column) => (
                <TableColumn key={column.key} style={{ textAlign: 'center' }} className='headerTabla py-0 px-0'>
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {jugadoresFiltrados.map((jugador) => (
                <TableRow key={jugador.id_jug}  className='py-1 px-0 contenidoTabla'>
                  {columns.map((column) => (
                    <TableCell key={`${jugador.id_jug}-${column.key}`} style={{ textAlign: 'center' }} className='py-1 px-0'>
                      {column.key === 'nombre_apellido' ? (
                        `${jugador.nombre} ${jugador.apellido}`
                      ) : column.key !== 'solicitud' ? (
                        column.key === 'pie_habil' || column.key === 'posicion' ? (
                          jugador[column.key] == null ? "Información privada" : jugador[column.key]
                        ) : (
                          jugador[column.key]
                        )
                      ) : (
                        <button  className='botonVerSolicitud' onClick={() => fetchEquipos(id_capitan, jugador.id_jug)}> Ver solicitud </button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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


