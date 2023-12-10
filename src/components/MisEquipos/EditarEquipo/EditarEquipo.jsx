import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { async } from 'q';


const EditarEquipo = ({ jugadores, show, onHide, id_equipo, visibilidad, nombre_equipo, id_capitan, updateMisEquipos }) => {
    const [equipoNombre, setEquipoNombre] = useState(nombre_equipo);
    const [equipoVisibilidad, setEquipoVisibilidad] = useState(visibilidad);
    const [nuevoCapitan, setNuevoCapitan] = useState(null);
    const [arregloJugadores, setArregloJugadores] = useState(jugadores);
    const navigate = useNavigate()
    
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

    //Función que envia al back los datos del equipo editado
    //Si hay un nuevoCapitan, se debe eliminar este equipo
    //El id_capitan es el id proveniente del jugador que inició sesion
    const handleConfirmar = async () => {
        console.log({
          id_capitan,
          id_equipo,
          nombre_equipo: equipoNombre,
          publico: equipoVisibilidad,
          arregloJugadores,
          nuevoCapitan,
        });
        const idsJugadores = arregloJugadores.map((jugador) => jugador.id_jug);

        await axios.post('http://localhost:3001/equipo/update',{
          nombre_equipo: equipoNombre,
        //  cant_max: data.cant_max,
          capitan: nuevoCapitan ? nuevoCapitan : id_capitan,
          id_jugadores: idsJugadores,
          publico: equipoVisibilidad,
          id_equipo: id_equipo
        })
        onHide();
    };

    const updateJugadoresEquipo = async (id) => {
        const updatedJugadores = await axios.post(`http://localhost:3001/jugadores/${id}/${id_equipo}`)
        setNuevoCapitan(null);
        setArregloJugadores(updatedJugadores.data);
    }
    const renderCell = useCallback((jugador, columnKey) => {
        const cellValue = jugador[columnKey];
      
        switch (columnKey) {
          case "nombre":
          case "apellido":
          case "edad":
            return cellValue;
          case "actions":
            return (
              <div className="flex items-center space-x-3 justify-center">
                <Tooltip content="Ascender jugador">
                  <button
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => setNuevoCapitan(jugador.id_jug)}
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
      
          default:
            return cellValue;
        }
      }, [jugadores, setNuevoCapitan]);
      
    
    const columns = [
        {
            key: "nombre",
            label: "Nombre",
        },
        {
            key: "apellido",
            label: "Apellido",
        },
        {
            key: "edad",
            label: "Edad",
        },
        {
            key: "actions",
            label: "Acciones",
        },
    ];
    

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

            <Button variant="primary" onClick={handleConfirmar}> 
                Confirmar</Button>

        </Modal.Footer>
      </Modal>
    );
};

export default EditarEquipo;  