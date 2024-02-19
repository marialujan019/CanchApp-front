import React, { useEffect, useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@nextui-org/react";
import { consultarBaseDeDatos } from "../../utils/Funciones";
import ModalSolicitudReserva from "./ModalSolicitudReserva/ModalSolicitudReserva";
import "./calendario.css";
import { useNavigate } from "react-router-dom";

const Calendario = () => {
    const navigate = useNavigate();
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [canchas, setCanchas] = useState(null);
    const [fechas, setFechas] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reservaData, setReservaData] = useState(null);
    const [key, setKey] = useState(0);

    useEffect(() => {
        // Función para obtener las canchas de un complejo
        async function fetchCanchas() {
            const datosJson = await consultarBaseDeDatos(
                "./json/canchasDeUnComplejo.json"
            );
            setCanchas(datosJson);
        }

        // Función para obtener las fechas actuales al cargar la página
        async function fetchFechaActual() {
            const fechaActual = new Date().toISOString().split("T")[0];
            setFechaSeleccionada(fechaActual);
            await fetchFechas(fechaActual);
        }

        fetchCanchas();
        fetchFechaActual(); // Llamada para obtener la fecha actual al cargar la página
    }, []);

    // Función para obtener las fechas según la fecha obtenida en el input calendario
    const fetchFechas = async (fecha) => {
        const jsonDataFechas = await consultarBaseDeDatos("./json/fechas.json");
        setFechas(jsonDataFechas);
        const fechaSeleccionadaValida =
            fecha === jsonDataFechas.fecha_seleccionada;
        if (!fechaSeleccionadaValida) {
            setFechas(null);
        }
    };

    // Función para obtener las fechas del input calendario
    const handleFechaSeleccionada = async (fecha) => {
        setFechaSeleccionada(fecha);
        await fetchFechas(fecha);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const selectedDate = new Date(dateString);
        selectedDate.setDate(selectedDate.getDate() + 1);
        return selectedDate.toLocaleDateString(undefined, options);
    };

    const handleReservaClick = async (
        hora,
        cancha,
        id_equipo,
        fechaSeleccionada
    ) => {
        console.log(id_equipo);
        const datosJson = await consultarBaseDeDatos("./json/equipo.json");
        setReservaData({ hora, cancha, equipo: datosJson, fechaSeleccionada });
        setShowModal(true);
    };

    const updateParent = () => {
        setKey(key + 1);
    };

    const handleClick = () => {
        navigate("/misCanchas");
    };

    const tableContent = useMemo(() => {
        if (!canchas || !fechas || !fechas.horario_disponibilidad) {
            return (
                <div className='textoNoTablasContainer'>
                    <p className='tituloTextoNoTablasContainer'>
                        No tienes horarios disponibles para la fecha{" "}
                        {formatDate(fechaSeleccionada)}
                    </p>
                    <Button
                        className='botonTextoNoTablasContainer'
                        color='primary'
                        onClick={handleClick}
                    >
                        Agregar más horarios
                    </Button>
                </div>
            );
        }

        const renderCell = (hora, cancha) => {
            const horarioDisponibilidad = fechas.horario_disponibilidad || {};
            const peticiones = horarioDisponibilidad[hora]?.peticiones || [];
            const aceptados = horarioDisponibilidad[hora]?.aceptados || [];
            const reservaPendiente = peticiones.find(
                (peticion) => peticion.id_cancha === cancha.id_cancha
            );
            const reservaAceptada = aceptados.find(
                (aceptado) => aceptado.id_cancha === cancha.id_cancha
            );

            if (reservaPendiente) {
                return (
                    <button
                        className='complejoBotonReservar'
                        onClick={() =>
                            handleReservaClick(
                                hora,
                                cancha,
                                reservaPendiente.id_equipo,
                                fechaSeleccionada
                            )
                        }
                    >
                        Solicitud de reserva
                    </button>
                );
            } else if (reservaAceptada) {
                return (
                    <div>
                        <p>Aceptado</p>
                        <button
                            className='complejoBotonReservar'
                            onClick={() =>
                                console.log(
                                    "ID Equipo:",
                                    reservaAceptada.id_equipo
                                )
                            }
                        >
                            Ver equipo
                        </button>
                    </div>
                );
            } else {
                return "No reservado";
            }
        };

        return (
            <Table removeWrapper aria-label='Tabla de fechas' isCompact>
                <TableHeader isCompact className='rounded-none'>
                    <TableColumn className='headerTabla'>Horarios</TableColumn>
                    {canchas.map((cancha) => (
                        <TableColumn
                            key={cancha.id_cancha}
                            className='headerTabla '
                        >
                            {cancha.nombre_cancha}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {Object.keys(fechas.horario_disponibilidad).map((hora) => (
                        <TableRow key={hora} className='contenidoTabla'>
                            <TableCell className=''>{`${hora}`}</TableCell>
                            {canchas.map((cancha) => (
                                <TableCell key={`${hora}-${cancha.id_cancha}`}>
                                    {renderCell(hora, cancha)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }, [canchas, fechas, fechaSeleccionada]);

    return (
        <div>
            <div className='centradoDeTabla'>
                <div className='complejoAdminElegirFecha'>
                    <div>
                        <strong>
                            <label
                                htmlFor='fecha'
                                className='complejoAdminLabel'
                            >
                                Seleccione una fecha:
                            </label>
                        </strong>
                        <input
                            type='date'
                            id='fecha'
                            className='complejoAdminCalendario'
                            onChange={(e) =>
                                handleFechaSeleccionada(e.target.value)
                            }
                            value={fechaSeleccionada}
                        />
                    </div>
                </div>
                {tableContent && (
                    <div className='tablaContainer'>
                        <h3 className='tituloTabla'>
                            Fecha seleccionada {formatDate(fechaSeleccionada)}
                        </h3>
                        {tableContent}
                    </div>
                )}
            </div>

            <ModalSolicitudReserva
                show={showModal}
                onHide={() => setShowModal(false)}
                reservaData={reservaData}
                updateParent={updateParent}
            />
        </div>
    );
};

export default Calendario;
