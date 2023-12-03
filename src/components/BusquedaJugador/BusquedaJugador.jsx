import React, { useState, useEffect, useCallback } from 'react';
import { consultarBaseDeDatos } from '../utils/Funciones';
import './busquedaJugador.css';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, Accordion, AccordionItem } from "@nextui-org/react";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "edad", label: "Edad" },
  { key: "pie_habil", label: "Pie Hábil" },
  { key: "sexo", label: "Sexo" },
  { key: "telefono", label: "Teléfono" },
  { key: "posicion", label: "Posición" },
  { key: "solicitud", label: "Solicitud" },
  { key: "estado", label: "estado" },
];

const BusquedaJugador = () => {
  const [datosDeLaAPI, setDatosDeLaAPI] = useState([]);
  const [filtros, setFiltros] = useState({
    edadFiltro: null,
    sexoFiltro: null,
    pieHabilFiltro: null,
    posicionFiltro: null,
    nombreBusqueda: '',
  });
  const [solicitudEnviadaPorEquipo, setSolicitudEnviadaPorEquipo] = useState({});
  const [filtrosTitulos, setFiltrosTitulos] = useState({
    edadFiltro: 'Filtros por edad',
    sexoFiltro: 'Filtros por sexo',
    pieHabilFiltro: 'Filtros por pie hábil',
    posicionFiltro: 'Filtros por posición',
  });

  const toggleFiltro = (filtroName, valor) => {
    setFiltros((prevFiltros) => {
      const updatedFiltros = { ...prevFiltros };

      if (updatedFiltros[filtroName] === valor) {
        updatedFiltros[filtroName] = null;
        setFiltrosTitulos((prevTitulos) => ({ ...prevTitulos, [filtroName]: `Filtros por ${filtroName.replace('Filtro', '')}` }));
      } else {
        updatedFiltros[filtroName] = valor;
        setFiltrosTitulos((prevTitulos) => ({ ...prevTitulos, [filtroName]: valor }));
      }

      return updatedFiltros;
    });
  };

  const filtrarPorEdad = useCallback((jugador) => {
    if (filtros.edadFiltro) {
      if (filtros.edadFiltro === '5 a 13 años') {
        return jugador.edad >= 5 && jugador.edad <= 13;
      } else if (filtros.edadFiltro === '13 a 18 años') {
        return jugador.edad >= 13 && jugador.edad <= 18;
      } else if (filtros.edadFiltro === 'Mayores de 18 años') {
        return jugador.edad > 18;
      }
    }
    return true;
  }, [filtros.edadFiltro]);

  const filtrarPorSexo = useCallback((jugador) => {
    if (filtros.sexoFiltro) {
      return jugador.sexo === filtros.sexoFiltro;
    }
    return true;
  }, [filtros.sexoFiltro]);

  const filtrarPorPieHabil = useCallback((jugador) => {
    if (filtros.pieHabilFiltro) {
      return jugador.pie_habil === filtros.pieHabilFiltro;
    }
    return true;
  }, [filtros.pieHabilFiltro]);

  const filtrarPorPosicion = useCallback((jugador) => {
    if (filtros.posicionFiltro) {
      return jugador.posicion === filtros.posicionFiltro;
    }
    return true;
  }, [filtros.posicionFiltro]);

  const filtrarPorNombre = useCallback((jugador) => {
    if (filtros.nombreBusqueda) {
      const nombreMinusculas = jugador.nombre.toLowerCase();
      const busquedaMinusculas = filtros.nombreBusqueda.toLowerCase();

      return nombreMinusculas.startsWith(busquedaMinusculas);
    }
    return true;
  }, [filtros.nombreBusqueda]);

  const limpiarFiltros = () => {
    setFiltros({
      edadFiltro: null,
      sexoFiltro: null,
      pieHabilFiltro: null,
      posicionFiltro: null,
      nombreBusqueda: '',
    });

    setFiltrosTitulos({
      edadFiltro: 'Filtros por edad',
      sexoFiltro: 'Filtros por sexo',
      pieHabilFiltro: 'Filtros por pie hábil',
      posicionFiltro: 'Filtros por posición',
    });
  };


  const toggleSolicitud = (idJugador) => {
    if (solicitudEnviadaPorEquipo[idJugador]) {
      cancelarSolicitud(idJugador);
      setSolicitudEnviadaPorEquipo((prev) => ({ ...prev, [idJugador]: false }));
    } else {
      enviarSolicitud(idJugador);
      setSolicitudEnviadaPorEquipo((prev) => ({ ...prev, [idJugador]: true }));
    }
  };

  const enviarSolicitud = (idJugador) => {
    console.log(`Solicitud enviada al jugador con ID: ${idJugador}`);
  };

  const cancelarSolicitud = (idJugador) => {
    console.log(`Solicitud cancelada al jugador con ID: ${idJugador}`);
  };

  useEffect(() => { 
    consultarBaseDeDatos('../json/jugadoresParaBusqueda.json') //Esta es la funcion que me trae los jugadores de la base de datos
      .then((listaJugadoresObtenidos) => {
        const jugadoresFiltrados = listaJugadoresObtenidos
          .filter(filtrarPorEdad)
          .filter(filtrarPorSexo)
          .filter(filtrarPorPieHabil)
          .filter(filtrarPorPosicion)
          .filter(filtrarPorNombre);

        console.log(filtros); //filtros es la variable que se envia al back, cada vez que se aplica un filtro, este objeto se modifica
        //Ademas, filtros se debe enviar al back cada vez que se cambia
        setDatosDeLaAPI(jugadoresFiltrados);
      });
  }, [filtros, filtrarPorEdad, filtrarPorSexo, filtrarPorPieHabil, filtrarPorPosicion, filtrarPorNombre]);

  

  return (
    <div className='busquedaJugadorContainer'>
      <div className='busquedaJugadorFiltroNombre'>
        <h4>Búsqueda por nombre</h4>
        <input
          type='text'
          value={filtros.nombreBusqueda}
          onChange={(e) => setFiltros({ ...filtros, nombreBusqueda: e.target.value })}
        />
      </div>
      <div className='busquedaJugadorFiltros'>
        <h3>Filtros</h3>
        <Accordion>
          <AccordionItem key="1" aria-label={filtrosTitulos.edadFiltro} title={filtrosTitulos.edadFiltro}>
            <div className='busquedaJugadorFiltroEdad'>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.edadFiltro === '5 a 13 años'}
                  onChange={() => toggleFiltro('edadFiltro', '5 a 13 años')}
                />{' '}
                Edad 5-13
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.edadFiltro === '13 a 18 años'}
                  onChange={() => toggleFiltro('edadFiltro', '13 a 18 años')}
                />{' '}
                Edad 13-18
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.edadFiltro === 'Mayores de 18 años'}
                  onChange={() => toggleFiltro('edadFiltro', 'Mayores de 18 años')}
                />{' '}
                Mayores de 18
              </label>
            </div>
          </AccordionItem>

          <AccordionItem key="2" aria-label={filtrosTitulos.sexoFiltro} title={filtrosTitulos.sexoFiltro}>
            <div className='busquedaJugadorFiltroSexo'>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.sexoFiltro === 'Masculino'}
                  onChange={() => toggleFiltro('sexoFiltro', 'Masculino')}
                />{' '}
                Masculino
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.sexoFiltro === 'Femenino'}
                  onChange={() => toggleFiltro('sexoFiltro', 'Femenino')}
                />{' '}
                Femenino
              </label>
            </div>
          </AccordionItem>

          <AccordionItem key="3" aria-label={filtrosTitulos.pieHabilFiltro} title={filtrosTitulos.pieHabilFiltro}>
            <div className='busquedaJugadorFiltroPieHabil'>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.pieHabilFiltro === 'Derecho'}
                  onChange={() => toggleFiltro('pieHabilFiltro', 'Derecho')}
                />{' '}
                Derecho
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.pieHabilFiltro === 'Izquierdo'}
                  onChange={() => toggleFiltro('pieHabilFiltro', 'Izquierdo')}
                />{' '}
                Izquierdo
              </label>
            </div>
          </AccordionItem>

          <AccordionItem key="4" aria-label={filtrosTitulos.posicionFiltro} title={filtrosTitulos.posicionFiltro}>
            <div className='busquedaJugadorFiltroPosicion'>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.posicionFiltro === 'Arquero'}
                  onChange={() => toggleFiltro('posicionFiltro', 'Arquero')}
                />{' '}
                Arquero
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.posicionFiltro === 'Defensor'}
                  onChange={() => toggleFiltro('posicionFiltro', 'Defensor')}
                />{' '}
                Defensor
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.posicionFiltro === 'Mediocampista'}
                  onChange={() => toggleFiltro('posicionFiltro', 'Mediocampista')}
                />{' '}
                Mediocampista
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={filtros.posicionFiltro === 'Delantero'}
                  onChange={() => toggleFiltro('posicionFiltro', 'Delantero')}
                />{' '}
                Delantero
              </label>
            </div>
          </AccordionItem>
        </Accordion>

        <Button onClick={limpiarFiltros} color="primary">Eliminar Filtros</Button>
      </div>

      <div>
        <Table aria-label="Tabla con contenido dinámico">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            {datosDeLaAPI.map((jugador) => (
              <TableRow key={jugador.id_jugador}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.key !== "solicitud" ? (
                      jugador[column.key]
                    ) : (
                      <Button
                        onClick={() => toggleSolicitud(jugador.id_jugador)} //Se envia solo el id_jugaor al back
                        color={solicitudEnviadaPorEquipo[jugador.id_jugador] ? "danger" : "primary"}
                      >
                        {solicitudEnviadaPorEquipo[jugador.id_jugador] ? "Cancelar solicitud" : "Enviar solicitud"}
                      </Button>
                    )}
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

export default BusquedaJugador;
