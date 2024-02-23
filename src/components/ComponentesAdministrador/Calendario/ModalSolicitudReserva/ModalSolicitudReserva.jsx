// Componente ModalSolicitudReserva.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { consultarBaseDeDatos } from "../../../utils/Funciones";
import { User, Chip } from "@nextui-org/react";

const ModalSolicitudReserva = ({ show, onHide, reservaData, updateParent }) => {
    const [jugadores, setJugadores] = useState([]);
    const [showModalJugadores, setShowModalJugadores] = useState(false);
    const [chipColor, setChipColor] = useState("success");

    const handleVerEquipoClick = async () => {
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
                updateParent("aceptar", reservaData);
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
                updateParent("eliminar", reservaData);
                onHide();
                Swal.fire({
                    icon: "error",
                    title: `Se ha eliminado correctamente la reserva de ${reservaData.equipo.nombre_equipo}, ${reservaData.equipo.id_equipo}`,
                });
            }
        });
    };

    if (!reservaData) {
        return <></>;
    }

    const [year, month, day] = reservaData.fechaSeleccionada.split("-");
    const fechaFormateada = `${day}/${month}/${year}`;

    return (
        <div>
            <Modal show={show} onHide={onHide} centered size='lg'>
                <Modal.Body className='modalSRContainer'>
                    <div>
                        <img
                            className='imagenRSModal'
                            src='/images/misEquipos/crearEquipo.jpg'
                            alt=''
                        />
                    </div>

                    <div className='modalParteDerechaContainer'>
                        <h2 className='modalRSTitulo'>
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
                        <div>
                            {" "}
                            <strong>Jugadores: </strong>
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
                                6/10{" "}
                                {chipColor === "danger" ? (
                                    <i className='bi bi-eye-slash'></i>
                                ) : (
                                    <i className='bi bi-eye'></i>
                                )}
                            </Chip>
                        </div>

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

                        <div className='botonesModalSolicitudReservaContainer'>
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
