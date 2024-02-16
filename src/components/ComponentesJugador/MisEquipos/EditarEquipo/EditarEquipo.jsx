import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Switch,
} from "@nextui-org/react";
import axios from "axios";
import Swal from "sweetalert2";
import "./editarEquipo.css";

const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "apellido", label: "Apellido" },
    { key: "edad", label: "Edad" },
    { key: "actions", label: "Acciones" },
];

const EditarEquipo = ({
    jugadores,
    show,
    onHide,
    id_equipo,
    visibilidad,
    nombre_equipo,
    id_capitan,
    updateMisEquipos,
}) => {
    const [equipoNombre, setEquipoNombre] = useState(nombre_equipo);
    const [equipoVisibilidad, setEquipoVisibilidad] = useState(visibilidad);
    const [nuevoCapitan, setNuevoCapitan] = useState(null);
    const [nombreNuevoCapitan, setNombreNuevoCapitan] = useState("");
    const [arregloJugadores, setArregloJugadores] = useState(jugadores);
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
        const updatedJugadores = await axios.post(
            `http://localhost:3001/jugadores/${id}/${id_equipo}`
        );
        setNuevoCapitan(null);
        setArregloJugadores(updatedJugadores.data);
    };

    const handleConfirmar = useCallback(async () => {
        const idsJugadores = arregloJugadores.map((jugador) => jugador.id_jug);
        await axios
            .post("http://localhost:3001/equipo/update", {
                nombre_equipo: equipoNombre,
                capitan: nuevoCapitan ? nuevoCapitan : id_capitan,
                id_jugadores: idsJugadores,
                publico: equipoVisibilidad,
                id_equipo: id_equipo,
            })
            .then(updateMisEquipos())
            .then(onHide())
            .catch((error) => {
                console.error("Error al actualizar equipo:", error);
            });
    }, [
        arregloJugadores,
        equipoNombre,
        equipoVisibilidad,
        id_capitan,
        id_equipo,
        nuevoCapitan,
        onHide,
        updateMisEquipos,
    ]);

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
    }, [
        sweetAlertConfirmed,
        nombre_equipo,
        nombreNuevoCapitan,
        onHide,
        handleConfirmar,
        updateMisEquipos,
    ]);

    const renderCell = useCallback(
        (jugador, columnKey) => {
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
                            <div className='flex items-center space-x-3 justify-center'>
                                <Tooltip content='Ascender jugador'>
                                    <button
                                        className='text-lg text-default-400 cursor-pointer active:opacity-50'
                                        onClick={() =>
                                            askNuevoCapitan(
                                                jugador.nombre,
                                                nombre_equipo,
                                                jugador.id_jug
                                            )
                                        }
                                    >
                                        <i class='bi bi-person-fill-up'></i>
                                    </button>
                                </Tooltip>
                                <Tooltip content='Eliminar jugador'>
                                    <button
                                        className='text-lg text-danger cursor-pointer active:opacity-50'
                                        onClick={() =>
                                            updateJugadoresEquipo(
                                                jugador.id_jug
                                            )
                                        }
                                    >
                                        <i class='bi bi-trash'></i>
                                    </button>
                                </Tooltip>
                            </div>
                        );
                    }

                default:
                    return cellValue;
            }
        },
        [id_capitan, setNuevoCapitan, updateJugadoresEquipo]
    );

    return (
        <Modal show={show} onHide={onHide} centered size='lg'>
            <Modal.Body className='modalEDContainer'>
                <div className='imagenEditarEquipoModalContainer'>
                    <img
                        className='imagenEditarEquipoModal'
                        src='/images/misEquipos/editarEquipo.jpg'
                        alt=''
                    />
                </div>

                <div className='modaltextoContainer'>
                    <h3 className='modalReservaTitulo'>Editar equipo</h3>
                    <div className='flex gap-2'>
                        <strong>
                            <p>Cambiar nombre:</p>
                        </strong>
                        <input
                            type='text'
                            className='inputMisEquipos'
                            value={equipoNombre}
                            onChange={handleNombreChange}
                        />
                    </div>

                    <div className='flex gap-2'>
                        <strong>
                            <p>Cambiar visibilidad</p>
                        </strong>
                        <label className='switchED'>
                            <input
                                type='checkbox'
                                checked={equipoVisibilidad}
                                onChange={handleVisibilidadChange}
                            />
                            <span className='sliderED'></span>
                        </label>
                        {equipoVisibilidad ? "Publico" : "Privado"}
                    </div>

                    <div className='tablaContainer'>
                        <h3 className='tituloTabla2'>Jugadores</h3>
                        <Table aria-label='Tabla de Jugadores' removeWrapper>
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn
                                        key={column.key}
                                        style={{ textAlign: "center" }}
                                        className='headerTabla py-0 px-0'
                                    >
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody
                                items={jugadores}
                                style={{ textAlign: "center" }}
                            >
                                {(jugador) => (
                                    <TableRow
                                        key={jugador.id_jug}
                                        className='py-0 px-0 contenidoTabla text'
                                    >
                                        {(columnKey) => (
                                            <TableCell className='py-0 px-0'>
                                                {renderCell(jugador, columnKey)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className='py-3 flex gap-3 justify-end'>
                        <Button variant='primary' onClick={handleConfirmar}>
                            {" "}
                            Confirmar
                        </Button>
                        <Button variant='danger' onClick={onHide}>
                            Cerrar
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditarEquipo;
