import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "edad", label: "Edad" },
  { key: "actions", label: "Acciones" },
];


const EditarEquipo = ({ jugadores, show, onHide, id_equipo, visibilidad, nombre_equipo, id_capitan, updateMisEquipos }) => {
    const [equipoNombre, setEquipoNombre] = useState(nombre_equipo);
    const [equipoVisibilidad, setEquipoVisibilidad] = useState(visibilidad);
    const [nuevoCapitan, setNuevoCapitan] = useState(null);
    const [nombreNuevoCapitan, setNombreNuevoCapitan] = useState("");
    const [arregloJugadores, setArregloJugadores] = useState(jugadores);
    const navigate = useNavigate()
    const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

    
    useEffect(() => {
        setEquipoNombre(nombre_equipo);
    }, [nombre_equipo]);
    
    useEffect(() => {
        setEquipoVisibilidad(visibilidad);
    }, [visibilidad]);
    
    useEffect(() => {
        setNuevoCapitan(null);
    }, []);
    
    useEffect(() => {
        setArregloJugadores(jugadores);
    }, [jugadores]);

    const handleNombreChange = (e) => {
        setEquipoNombre(e.target.value);
    };
      
    const handleVisibilidadChange = () => {
        setEquipoVisibilidad(!equipoVisibilidad);
    };

    const updateJugadoresEquipo = async (id) => {
        const updatedJugadores = await axios.post(`http://localhost:3001/jugadores/${id}/${id_equipo}`)
        setNuevoCapitan(null);
        setArregloJugadores(updatedJugadores.data);
    }

    const handleConfirmar = useCallback(async () => {
      const idsJugadores = arregloJugadores.map((jugador) => jugador.id_jug);
      await axios.post('http://localhost:3001/equipo/update', {
          nombre_equipo: equipoNombre,
          capitan: nuevoCapitan ? nuevoCapitan : id_capitan,
          id_jugadores: idsJugadores,
          publico: equipoVisibilidad,
          id_equipo: id_equipo
      })
      .then(updateMisEquipos())
      .then(onHide())
      .catch(error => {
          console.error("Error al actualizar equipo:", error);
      });
    }, [arregloJugadores, equipoNombre, equipoVisibilidad, id_capitan, id_equipo, nuevoCapitan, onHide, updateMisEquipos]);

    const askNuevoCapitan = (nombreJugador, nombreEquipo, id_jug) => {
      Swal.fire({
          title: `¿Seguro que quieres ascender a ${nombreJugador}?`,
          text: `Se eliminará a ${nombreEquipo} de tu lista de equipos creados?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: `Ascender a ${nombreJugador}`,
          cancelButtonText: "Cancelar",
      }).then((result) => {
          if (result.isConfirmed) {
              setNuevoCapitan(id_jug);
              setNombreNuevoCapitan(nombreJugador);
              setSweetAlertConfirmed(true);
          }
      });
    };

  useEffect(() => {
      if (sweetAlertConfirmed) {
          handleConfirmar();
          Swal.fire({
              text: `${nombre_equipo} ahora pertenece a ${nombreNuevoCapitan}?`,
              icon: "success",
          }).then(() => {
              setSweetAlertConfirmed(false);
          });
      }
  }, [sweetAlertConfirmed, nombre_equipo, nombreNuevoCapitan, onHide, handleConfirmar, updateMisEquipos]);

    const renderCell = useCallback((jugador, columnKey) => {
      const cellValue = jugador[columnKey];
  
      switch (columnKey) {
        case "nombre":
        case "apellido":
        case "edad":
          return cellValue;
        case "actions":
          if (id_capitan === jugador.id_jug) {
            return "Capitan del equipo";
          } else {
            return (
              <div className="flex items-center space-x-3 justify-center">
                <Tooltip content="Ascender jugador"> 
                  <button
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => askNuevoCapitan(jugador.nombre, nombre_equipo, jugador.id_jug)}
                  >
                    Ascender jugador
                  </button>
                </Tooltip>
                <Tooltip content="Eliminar jugador">
                  <button
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => updateJugadoresEquipo(jugador.id_jug)}
                  >
                    Eliminar jugador
                  </button>
                </Tooltip>
              </div>
            );
          }
  
        default:
          return cellValue;
      }
    }, [id_capitan, setNuevoCapitan, updateJugadoresEquipo]);
      
    
    

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar equipo</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>

            <div>
                <h5>Cambiar Nombre</h5>
                <input type="text" value={equipoNombre} onChange={handleNombreChange}/> 
            </div>
            
            <div>
                <h5>Cambiar visibilidad</h5>
                <input type="checkbox" checked={equipoVisibilidad} onChange={handleVisibilidadChange}/> {equipoVisibilidad ? 'Publico' : 'Privado'}
            </div>

            <div>
                <h5>Editar jugadores</h5>
                <Table aria-label="Tabla de Jugadores">
                    <TableHeader columns={columns} >
                        {(column) => <TableColumn key={column.key} style={{ textAlign: 'center' }}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={jugadores}>
                        {(jugador) => (
                            <TableRow key={jugador.id_jug}>
                                {(columnKey) => <TableCell>{renderCell(jugador, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cerrar</Button>  
            <Button variant="primary" onClick={handleConfirmar}> Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default EditarEquipo;