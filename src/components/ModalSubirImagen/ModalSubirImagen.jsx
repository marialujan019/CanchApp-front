import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalSubirImagen = ({ showModal, setShowModal }) => {
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
      setShowModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubirImagenWrapper = () => {
    handleSubirImagen();
    setDraggedImage(null); // Elimina la imagen después de subirla
    setShowModal(false); // Cierra el modal después de subir la imagen
  };

  const handleSubirImagen=() => {
    setShowModal(false);
    alert("Imagen subida con éxito");
  }
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{draggedImage ? "Previsualización" : "Subir imagen"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="drag-drop-container"
          style={{ width: '100%', minHeight: '300px', border: '2px dashed #ccc', textAlign: 'center', lineHeight: '300px' }}
        >
          {!draggedImage && "Arrastra y suelta una imagen aquí"}
          {draggedImage && (
            <div style={{ maxHeight: '100%', overflow: 'hidden' }}>
              <img src={draggedImage} alt="Imagen arrastrada" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {draggedImage && ( // Muestra el botón solo si hay una imagen
          <Button onClick={handleSubirImagenWrapper} variant='primary'>Subir imagen</Button>
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
