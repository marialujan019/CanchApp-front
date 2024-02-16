import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { consultarBaseDeDatos } from "../../../utils/Funciones";
import { User, Tooltip, Chip } from "@nextui-org/react";
import "./modalSolicitudReserva.css";
const ModalSolicitudReserva = ({ show, onHide, reservaData, updateParent }) => {
    const [jugadores, setJugadores] = useState([]);
    const [showModalJugadores, setShowModalJugadores] = useState(false);
    const [chipColor, setChipColor] = useState("success");

    const handleVerEquipoClick = async () => {
        console.log("ID del equipo:", reservaData.equipo.id_equipo);
        const datosJugadores = await consultarBaseDeDatos(
            "../json/jugadoresDeUnEquipo.json"
        );
        setJugadores(datosJugadores);
        setShowModalJugadores(true);
        setChipColor("danger");
    };

    const handleOcultarEquipoClick = () => {
        setShowModalJugadores(false);
        setJugadores([]);
        setChipColor("success");
    };

    const handleAceptarReserva = () => {
        Swal.fire({
            icon: "question",
            title: `¿Quieres aceptar la reserva de ${reservaData.equipo.nombre_equipo}?`,
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                updateParent();
                onHide();
                Swal.fire({
                    icon: "success",
                    title: `Haz aceptado la reserva de ${reservaData.equipo.nombre_equipo}, ${reservaData.equipo.id_equipo}?`,
                    text: `El partido se jugará el ${fechaFormateada}, a las ${reservaData.hora}hs`,
                });
            }
        });
    };

    const handleEliminarReserva = () => {
        Swal.fire({
            icon: "question",
            title: `¿Quieres eliminar la reserva de ${reservaData.equipo.nombre_equipo}?`,
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                updateParent();
                onHide();
                Swal.fire({
                    icon: "error",
                    title: `Se ha eliminado correctamente la reserva de ${reservaData.equipo.nombre_equipo}, ${reservaData.equipo.id_equipo}`,
                });
            }
        });
    };

    if (!reservaData) {
        return <div>Cargando...</div>;
    }

    const [year, month, day] = reservaData.fechaSeleccionada.split("-");
    const fechaFormateada = `${day}/${month}/${year}`;

    return (
        <div>
            <Modal show={show} onHide={onHide} centered size='lg'>
                <Modal.Body className='modalEDContainer'>
                    <div className='imagenEditarEquipoModalContainer'>
                        <img
                            className='imagenEditarEquipoModal'
                            src='/images/misEquipos/crearEquipo.jpg'
                            alt=''
                        />
                    </div>
                    <div className='modaltextoContainer'>
                        <h2 className='modalReservaTitulo'>
                            El equipo {reservaData.equipo.nombre_equipo} quiere
                            reservar
                        </h2>

                        <p>
                            <strong> Fecha del partido:</strong>{" "}
                            {fechaFormateada}
                        </p>
                        <p>
                            <strong>Hora:</strong> {reservaData.hora}
                        </p>
                        <p>
                            <strong>Cancha:</strong>{" "}
                            {reservaData.cancha.nombre_cancha}
                        </p>
                        <p>
                            {" "}
                            <strong>Jugadores:</strong>
                            <Chip
                                className='ChipJugadores'
                                variant='flat'
                                color={chipColor}
                                onClick={
                                    showModalJugadores
                                        ? handleOcultarEquipoClick
                                        : handleVerEquipoClick
                                }
                            >
                                {reservaData.equipo.cant_jug}/
                                {reservaData.equipo.max_jug}{" "}
                                {chipColor === "danger" ? (
                                    <i class='bi bi-eye-slash'></i>
                                ) : (
                                    <i class='bi bi-eye'></i>
                                )}
                            </Chip>
                        </p>

                        {showModalJugadores && (
                            <div className='jugadoresDeUnEquipoPendienteContainer'>
                                {jugadores.map((jugador, index) => (
                                    <User
                                        key={index}
                                        avatarProps={{
                                            src: jugador.imagen,
                                            size: "lg",
                                        }}
                                        description={`Edad: ${jugador.edad}`}
                                        name={`${jugador.nombre} ${jugador.apellido}`}
                                    ></User>
                                ))}
                            </div>
                        )}

                        <div className='flex gap-3'>
                            <Button
                                variant='primary'
                                onClick={handleAceptarReserva}
                            >
                                Aceptar reserva
                            </Button>
                            <Button
                                variant='danger'
                                onClick={handleEliminarReserva}
                            >
                                Eliminar reserva
                            </Button>
                            <Button variant='secondary' onClick={onHide}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalSolicitudReserva;
