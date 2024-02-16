import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ModalAgregarFecha = ({ show, onHide }) => {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");

    // Función para manejar el guardado de las fechas
    const handleGuardarFechas = () => {
        // Verificar si los horarios están completos
        if (horaInicio && horaFin) {
            // Guardar los valores en un objeto
            const fechasGuardadas = {
                fechaInicio,
                fechaFin,
                horaInicio,
                horaFin,
            };
            // Mostrar el objeto en la consola
            console.log("Fechas guardadas:", fechasGuardadas);
            // Mostrar un mensaje con SweetAlert
            Swal.fire({
                icon: "success",
                title: "Los horarios se guardaron correctamente",
            });
            // Ocultar el modal
            onHide();
        } else {
            // Mostrar un mensaje de error si los horarios no están completos
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes completar los horarios antes de guardar",
            });
        }
        // Restablecer los valores de las variables de estado
        setFechaInicio("");
        setFechaFin("");
        setHoraInicio("");
        setHoraFin("");
    };

    const handleCancelar = () => {
        // Ocultar el modal
        onHide();
        // Restablecer los valores de las variables de estado
        setFechaInicio("");
        setFechaFin("");
        setHoraInicio("");
        setHoraFin("");
    };

    return (
        <div>
            <Modal show={show} onHide={onHide} centered size='lg'>
                <Modal.Body>
                    <h2 className='modalReservaTitulo'>
                        Agrega los disponibles de la cancha
                    </h2>

                    <div className='flex gap-2'>
                        <p>
                            <strong>Fecha:</strong>
                        </p>
                        <strong>
                            <p>Desde:</p>
                        </strong>
                        <input
                            type='date'
                            className='inputMisEquipos'
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            required
                        />
                        <strong>
                            <p>Hasta:</p>
                        </strong>
                        <input
                            type='date'
                            className='inputMisEquipos'
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex gap-2'>
                        <p>
                            <strong>Hora:</strong>
                        </p>
                        <strong>
                            <p>Desde:</p>
                        </strong>
                        <input
                            type='time'
                            className='inputMisEquipos'
                            value={horaInicio}
                            onChange={(e) => setHoraInicio(e.target.value)}
                            required
                        />

                        <strong>
                            <p>Hasta:</p>
                        </strong>
                        <input
                            type='time'
                            className='inputMisEquipos'
                            value={horaFin}
                            onChange={(e) => setHoraFin(e.target.value)}
                            required
                        />
                    </div>

                    <Button variant='primary' onClick={handleGuardarFechas}>
                        Guardar fechas
                    </Button>

                    <Button variant='danger' onClick={handleCancelar}>
                        Cancelar
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalAgregarFecha;
