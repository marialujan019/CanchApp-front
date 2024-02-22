import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const defaultImage = "/images/miscanchas/noImagen.jpg";

const ModalEditarCancha = ({ show, onHide, cancha, UpdateCancha }) => {
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoTecho, setNuevoTecho] = useState(false);
    const [nuevaImagen, setNuevaImagen] = useState(null);
    const [draggedImage, setDraggedImage] = useState(null);
    const [mostrarSubirImagen, setMostrarSubirImagen] = useState(false);
    const [botonSubirImagenText, setBotonSubirImagenText] =
        useState("Cambiar imagen");

    useEffect(() => {
        if (cancha && cancha.nombre_cancha) {
            setNuevoNombre(cancha.nombre_cancha);
        }
        if (cancha && cancha.imagen) {
            setNuevaImagen(cancha.imagen);
        } else setNuevaImagen(defaultImage);
    }, [cancha]);

    const handleNombreChange = (e) => {
        setNuevoNombre(e.target.value);
    };

    const handleTechoChange = () => {
        setNuevoTecho(!nuevoTecho);
    };

    const handleAceptar = () => {
        if (!cancha) {
            console.error(
                "Error: No se pudo obtener la información de la cancha."
            );
            return;
        }
        const canchaEditada = {
            id_cancha: cancha.id_cancha,
            nombre_cancha: nuevoNombre || cancha.nombre_cancha,
            techo: nuevoTecho || cancha.techo,
            imagen: draggedImage || cancha.imagen,
        };

        UpdateCancha(canchaEditada); // Actualizar la cancha en el estado global
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
        <Modal show={show} onHide={onHide} centered size='lg'>
            <Modal.Body className='modalEDContainer'>
                <div className='imagenEditarEquipoModalContainer'>
                    <img
                        className='imagenEditarEquipoModal'
                        src={draggedImage ? draggedImage : nuevaImagen}
                        alt=''
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                </div>

                <div className='modaltextoContainer'>
                    <h3 className='modalReservaTitulo'>Editar Cancha</h3>
                    <div className='flex gap-2'>
                        <strong>
                            <p>Cambiar nombre:</p>
                        </strong>
                        <input
                            type='text'
                            className='inputMisEquipos'
                            value={nuevoNombre}
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
                                checked={nuevoTecho}
                                onChange={handleTechoChange}
                            />
                            <span className='sliderEC round'></span>
                        </label>
                        {nuevoTecho ? "Si" : "No"}
                    </div>

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
                                    width: "100%",
                                    maxHeight: "200px",
                                    border: "2px dashed #ccc",
                                    textAlign: "center",
                                    lineHeight: "200px",
                                }}
                            >
                                {!draggedImage &&
                                    "Arrastra y suelta una imagen aquí"}
                                {draggedImage && (
                                    <div
                                        style={{
                                            maxHeight: "100%",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={draggedImage}
                                            alt='Imagen arrastrada'
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
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

export default ModalEditarCancha;
