import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalSubirImagen = ({ showModal, setShowModal, handleAgregarImagen }) => {
    // Define las variables de estado para el modal
    const [draggedImage, setDraggedImage] = useState(null);

    // Define la función para manejar el evento 'dragOver'
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Define la función para manejar el evento 'drop'
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setDraggedImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubirImagenWrapper = () => {
        if (draggedImage) {
            handleAgregarImagen(draggedImage); // Agrega la imagen al arreglo
            setDraggedImage(null); // Elimina la imagen después de subirla
            setShowModal(false); // Cierra el modal después de subir la imagen
            alert("Imagen subida con éxito");
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {draggedImage ? "Previsualización" : "Subir imagen"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className='drag-drop-container'
                    style={{
                        width: "100%",
                        height: "200px",
                        border: "2px dashed #ccc",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {!draggedImage && "Arrastra y suelta una imagen aquí"}
                    {draggedImage && (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={draggedImage}
                                alt='Imagen arrastrada'
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover !important",
                                }}
                            />
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {draggedImage && ( // Muestra el botón solo si hay una imagen
                    <Button
                        onClick={handleSubirImagenWrapper}
                        variant='primary'
                    >
                        Subir imagen
                    </Button>
                )}
                <Button
                    onClick={() => {
                        setDraggedImage(null);
                        setShowModal(false);
                    }}
                    variant='danger'
                >
                    {draggedImage ? "Cancelar" : "Cerrar"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSubirImagen;
