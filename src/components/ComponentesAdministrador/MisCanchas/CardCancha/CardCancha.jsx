import React, { useState } from "react";
import { Card, CardBody, Tooltip, Modal } from "@nextui-org/react"; // Importa Modal de react-bootstrap
import ModalEditarCancha from "../ModalEditarCancha/ModalEditarCancha";
import ModalAgregarFecha from "../ModalAgregarFecha/ModalAgregarFecha"; // Importa tu componente ModalAgregarFecha
import Swal from "sweetalert2";

const defaultImage = "/images/miscanchas/noImagen.jpg";

const CardCancha = ({ cancha }) => {
    const [canchaAEditar, setCanchaAEditar] = useState(null);
    const [showEditarCanchaModal, setShowEditarCanchaModal] = useState(false);
    const [showAgregarFechaModal, setShowAgregarFechaModal] = useState(false); // Nuevo estado para el modal de agregar fecha

    const handleEditarCancha = () => {
        setCanchaAEditar(cancha);
        setShowEditarCanchaModal(true);
    };

    const handleEliminarCancha = () => {
        Swal.fire({
            icon: "question",
            title: `¿Quieres eliminar la cancha ${cancha.nombre_cancha}?`,
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: `Se ha eliminado correctamente la reserva la ${cancha.nombre_cancha}, ${cancha.id_cancha}`,
                });
            }
        });
    };

    return (
        <div>
            <Card className='cardMisCanchas'>
                <img
                    src={cancha.imagen ? cancha.imagen : defaultImage}
                    className='cardMisCanchasImagen opacity-100'
                />
                <CardBody className='pt-2 px-2 pb-0'>
                    <div className='MisCanchasCardBody'>
                        <h4 className='text-base m-0 MisCanchasTituloCard'>
                            {cancha.nombre_cancha}
                        </h4>
                        <p className='text-base m-0 MisCanchasTextoCard'>
                            Techada: {cancha.techo ? "si" : "no"}
                        </p>
                    </div>
                </CardBody>
                <div className='accionesCardMisCanchas'>
                    <Tooltip content='Editar cancha'>
                        <button onClick={handleEditarCancha}>
                            <i className='bi bi-pencil'></i>
                        </button>
                    </Tooltip>
                    <Tooltip content='Agregar nuevas fechas'>
                        <button onClick={() => setShowAgregarFechaModal(true)}>
                            {" "}
                            {/* Abrir el modal de agregar fecha */}
                            <i className='bi bi-calendar'></i>
                        </button>
                    </Tooltip>
                    <Tooltip content='Eliminar cancha'>
                        <button onClick={handleEliminarCancha}>
                            <i className='bi bi-trash'></i>
                        </button>
                    </Tooltip>
                </div>
            </Card>

            <ModalEditarCancha
                show={showEditarCanchaModal}
                onHide={() => setShowEditarCanchaModal(false)}
                cancha={canchaAEditar}
            />

            <ModalAgregarFecha
                show={showAgregarFechaModal}
                onHide={() => setShowAgregarFechaModal(false)}
            />
        </div>
    );
};

export default CardCancha;
