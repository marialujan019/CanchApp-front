import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const defaultImage = "/images/miscanchas/noImagen.jpg";

const ModalCrearCancha = ({ show, onHide }) => {
    const [nombre, setNombre] = useState("");
    const [techo, setTecho] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [draggedImage, setDraggedImage] = useState(null);
    const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);
    const [botonSubirImagenText, setBotonSubirImagenText] =
        useState("Agregar imagen");

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleTechoChange = () => {
        setTecho(!techo);
    };

    const handleAceptar = () => {
        const nuevaCancha = {
            nombre_cancha: nombre,
            techo: techo,
            imagen: draggedImage || defaultImage,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
        };
        console.log("Nuevo objeto:", nuevaCancha);
        onHide();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setDraggedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const toggleSubirImagen = () => {
        setMostrarSubirImagen(!mostrarSubirImagen);
        if (!mostrarSubirImagen) {
            setBotonSubirImagenText("Cancelar");
        } else {
            setBotonSubirImagenText("Cambiar imagen");
            setDraggedImage(null);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size='xl'>
            <Modal.Body className='modalEDContainer' style={{ height: "80vh" }}>
                <div className='imagenEditarEquipoModalContainer'>
                    <img
                        className='imagenEditarEquipoModal'
                        src={draggedImage ? draggedImage : defaultImage}
                        alt=''
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                </div>

                <div className='modaltextoContainer'>
                    <h3 className='modalReservaTitulo'>Crear cancha</h3>
                    <div className='flex gap-2'>
                        <strong>
                            <p>Nombre de la cancha:</p>
                        </strong>
                        <input
                            type='text'
                            className='inputMisEquipos'
                            onChange={handleNombreChange}
                        />
                    </div>

                    <div className='flex gap-2'>
                        <strong>
                            <p>¿Tiene techo?</p>
                        </strong>
                        <label className='switchEC'>
                            <input
                                type='checkbox'
                                onChange={handleTechoChange}
                            />
                            <span className='sliderEC round'></span>
                        </label>
                        {techo ? "Si" : "No"}
                    </div>

                    <p>Agrega los disponbles de la cancha (opcional)</p>

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
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                        <strong>
                            <p>Hasta:</p>
                        </strong>
                        <input
                            type='date'
                            className='inputMisEquipos'
                            onChange={(e) => setFechaFin(e.target.value)}
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
                            onChange={(e) => setHoraInicio(e.target.value)}
                        />

                        <strong>
                            <p>Hasta:</p>
                        </strong>
                        <input
                            type='time'
                            className='inputMisEquipos'
                            onChange={(e) => setHoraFin(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-2'></div>

                    <p>Agregue una nueva imagen de la cancha (opcional)</p>
                    <Button
                        onClick={toggleSubirImagen}
                        variant={mostrarSubirImagen ? "danger" : "primary"}
                    >
                        {botonSubirImagenText}
                    </Button>
                    <div>
                        {mostrarSubirImagen && (
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className='drag-drop-container'
                                style={{
                                    maxHeight: "200px",
                                    border: "2px dashed #ccc",
                                    lineHeight: "200px",
                                    textAlign: "center",
                                    overflow: "hidden", // Añadimos overflow: hidden aquí
                                }}
                            >
                                {!draggedImage &&
                                    "Arrastra y suelta una imagen aquí"}
                                {draggedImage && (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <img
                                            src={draggedImage}
                                            alt='Imagen arrastrada'
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='py-3 flex justify-center'>
                        <Button variant='primary' onClick={handleAceptar}>
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

export default ModalCrearCancha;
