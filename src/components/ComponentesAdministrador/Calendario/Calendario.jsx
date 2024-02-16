import React, { useEffect, useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { consultarBaseDeDatos } from "../../utils/Funciones";
import ModalSolicitudReserva from "./ModalSolicitudReserva/ModalSolicitudReserva";

const Calendario = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState("2023-11-01");
    const [canchas, setCanchas] = useState(null);
    const [fechas, setFechas] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reservaData, setReservaData] = useState(null);
    const [key, setKey] = useState(0);

    useEffect(() => {
        async function fetchCanchas() {
            const datosJson = await consultarBaseDeDatos(
                "./json/canchasDeUnComplejo.json"
            );
            setCanchas(datosJson);
        }

        async function fetchFechas() {
            const datosJson = await consultarBaseDeDatos("./json/fechas.json");
            setFechas(datosJson);
        }

        fetchCanchas();
        fetchFechas();
    }, []);

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
                            console.log("ID Equipo:", reservaAceptada.id_equipo)
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

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const selectedDate = new Date(dateString);
        selectedDate.setDate(selectedDate.getDate() + 1);
        return selectedDate.toLocaleDateString(undefined, options);
    };

    const handleFechaSeleccionada = async (fecha) => {
        setFechaSeleccionada(fecha);
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
        // Incrementar la clave para reiniciar el componente
        setKey(key + 1);
    };

    const tableContent = useMemo(() => {
        if (!canchas || !fechas) return null;
        return (
            <Table removeWrapper aria-label='Tabla de fechas'>
                <TableHeader isCompact className='rounded-none'>
                    <TableColumn
                        style={{ textAlign: "center" }}
                        className='headerTabla py-0 px-0'
                    >
                        Horarios
                    </TableColumn>
                    {canchas.map((cancha) => (
                        <TableColumn
                            key={cancha.id_cancha}
                            style={{ textAlign: "center" }}
                            className='headerTabla py-0 px-0'
                        >
                            {cancha.nombre_cancha}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {Object.keys(fechas.horario_disponibilidad).map((hora) => (
                        <TableRow
                            key={hora}
                            className='py-0 px-0 contenidoTabla'
                        >
                            <TableCell className='py-1 px-0'>{`${
                                hora + ":00"
                            }`}</TableCell>
                            {canchas.map((cancha) => (
                                <TableCell
                                    className='py-1 px-0'
                                    key={`${hora}-${cancha.id_cancha}`}
                                >
                                    {renderCell(hora, cancha)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }, [canchas, fechas]);

    return (
        <div>
            <div className='centradoDeTabla'>
                <div className='complejoElegirFecha'>
                    <div>
                        <strong>
                            <label htmlFor='fecha' className='complejoLabel'>
                                Seleccione una fecha:
                            </label>
                        </strong>
                        <input
                            type='date'
                            id='fecha'
                            className='complejoCalendario'
                            onChange={(e) =>
                                handleFechaSeleccionada(e.target.value)
                            }
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
