import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { consultarBaseDeDatos } from '../../utils/Funciones';
import ModalSubirImagen from '../../ModalSubirImagen/ModalSubirImagen';
import "./miComplejo.css";
import { Button } from '@nextui-org/react';

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cancha_sintetica.jpg/1200px-Cancha_sintetica.jpg',
  'https://vallealto.mx/wp-content/uploads/2021/04/IMG_0181-scaled.jpg',
  'https://obs.ucr.ac.cr/wp-content/uploads/2022/09/Cancha-de-Futbol.png',
  'https://sport-12.com/wp-content/uploads/2022/02/Cancha-Chapultepec_cuadrado.jpg',
  'https://pastosinteticoprecio.com/wp-content/uploads/2018/02/Construccion-de-Canchas-de-Futbol-7-1024x609.jpg',
];

const id_complejo = 1;

const MiComplejo = () => {
  const [complejo, setComplejo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombreComplejo, setNombreComplejo] = useState("");
  const [direccionComplejo, setDireccionComplejo] = useState("");
  const [telefonoComplejo, setTelefonoComplejo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleEdit = () => {
    setModoEdicion(!modoEdicion);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nombre_complejo':
        setNombreComplejo(value);
        break;
      case 'direccion':
        setDireccionComplejo(value);
        break;
      case 'telefono':
        setTelefonoComplejo(value);
        break;
      default:
        break;
    }
  };

  const handleGuardarCambios = () => {
    const cambios = {
      id_complejo: id_complejo,
      nombreComplejo: nombreComplejo,
      direccionComplejo: direccionComplejo,
      telefonoComplejo: telefonoComplejo
    };
    console.log("Cambios guardados:", cambios);
    setModoEdicion(false);
  };

  const handleCancelarEdicion = () => {
    setNombreComplejo(complejo.nombre_complejo);
    setDireccionComplejo(complejo.direccion);
    setTelefonoComplejo(complejo.telefono);
    setModoEdicion(false);
  };

  useEffect(() => {
    async function fetchComplejo() {
      const datosJson = await consultarBaseDeDatos('./json/complejo.json');
      setComplejo(datosJson);
      setNombreComplejo(datosJson.nombre_complejo);
      setDireccionComplejo(datosJson.direccion);
      setTelefonoComplejo(datosJson.telefono);
    }
    fetchComplejo();
  }, []);

  // Renderizar solo si complejo está definido
  if (!complejo) {
    return <div>Cargando...</div>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  return (
    <div className='ComplejoContainer main'>

      <div className='complejoHeaderAdministrador'>
        <div>
          <h2 className='tituloComplejo text-left'>
            {modoEdicion ? (
              <>
                <input
                  type="text"
                  name="nombre_complejo"
                  value={nombreComplejo}
                  onChange={handleInputChange}
                  className=' edicionComplejoTexto'
                  size={complejo.nombre_complejo.length-2}
                />
                <i className="bi bi-pencil iconoEditarTituloComplejo"></i>
              </>
            ) : complejo.nombre_complejo}
          </h2>
          <div className='edicionDireccionComplejo complejoDireccion'>
            <i className="bi bi-geo-alt"></i>
            <p>
              {modoEdicion ? (
                <>
                  <input
                    type="text"
                    name="direccion"
                    value={direccionComplejo}
                    onChange={handleInputChange}
                    className='edicionComplejoTexto'
                  />
                  <i className="bi bi-pencil"></i>
                </>
              ) : complejo.direccion}
            </p>
          </div>
        </div>
        
        <div className='botonesEdicion'>
          {modoEdicion ? (
            <>
              <Button onClick={handleGuardarCambios} color='success' variant="ghost">
                Guardar Cambios
              </Button>
              <Button onClick={handleCancelarEdicion} color='danger' variant="ghost">
                Cancelar Edición
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} color="primary" variant="ghost">
              Editar
            </Button>
          )}
        </div>
      </div>

      <div className='complejoDatosContainer'>
        <div className='centradoDeCarrouselContainer'>
          <div className='carrouselContainer'>
            <Carousel>
              {images.length > 0 ? (
                images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 imageGallery"
                      src={image}
                      alt={""}
                      onClick={() => handleImageClick(index)}
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100 imageGallery"
                    src="/images/miComplejo/noImagen.png"
                    alt={"Default"}
                  />
                </Carousel.Item>
              )}
            </Carousel>
            {selectedImage && (
              <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modalGallery">
                  <img src={selectedImage} alt="Selected" />
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setShowModal(true)} className='botonSubirImagenComplejo'>Agregar imagen</button>

      </div>
      <div className='centradoDeComplejoDatos'>
        <div className='complejoDatos text-left'>
          <div className='complejoAdministrador'>
            <strong className='m-0'>Administrador nombre_administrador</strong>
            <p className='m-0'>Administrador iniciante: ¡Llevas 3 meses usando CanchApp!</p>
          </div>
          <div className='complejoDescripcion'>
            <p className='m-0'><strong>Descripcion:</strong></p>
            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem a, inventore ullam animi dolores similique error omnis iusto sapiente? Vero, alias in consequuntur ipsa autem facilis quas veniam dolorem nobis sunt, architecto asperiores distinctio enim quidem totam officia? Sit, in ducimus. Quibusdam omnis amet quia a iusto ipsum libero ipsa.</p>
          </div>
          <div className='complejoInfo'> 
            <p className='m-0'>
              <strong>Teléfono: </strong> 
              {modoEdicion ? (
                <>
                  <input
                    type="text"
                    name="telefono"
                    value={telefonoComplejo}
                    onChange={handleInputChange}
                    className='edicionComplejoTexto'
                  />
                  <i className="bi bi-pencil"></i>
                </>
              ) : complejo.telefono}
            </p>
            <p className='m-0'><strong>Horarios del club:</strong> horarios</p>
          </div>
        </div>
      </div>

      <ModalSubirImagen
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default MiComplejo;
