import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { consultarBaseDeDatos } from "../../utils/Funciones";
import ModalSubirImagen from "../../ModalSubirImagen/ModalSubirImagen";
import "./miComplejo.css";
import { Button } from "@nextui-org/react";

const id_complejo = 1;

const MiComplejo = () => {
    const [complejo, setComplejo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nuevoComplejo, setNuevoComplejo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState([
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cancha_sintetica.jpg/1200px-Cancha_sintetica.jpg",
        "https://vallealto.mx/wp-content/uploads/2021/04/IMG_0181-scaled.jpg",
        "https://obs.ucr.ac.cr/wp-content/uploads/2022/09/Cancha-de-Futbol.png",
        "https://sport-12.com/wp-content/uploads/2022/02/Cancha-Chapultepec_cuadrado.jpg",
        "https://pastosinteticoprecio.com/wp-content/uploads/2018/02/Construccion-de-Canchas-de-Futbol-7-1024x609.jpg",
    ]);

    useEffect(() => {
        async function fetchComplejo() {
            const datosJson = await consultarBaseDeDatos(
                "./json/complejo.json"
            );
            setComplejo(datosJson);
            setNuevoComplejo(datosJson);
            setLoading(false);
        }
        fetchComplejo();
    }, []);

    const handleEdit = () => {
        setModoEdicion(!modoEdicion);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNuevoComplejo({
            ...nuevoComplejo,
            [name]: value,
        });
    };

    const handleGuardarCambios = () => {
        setComplejo(nuevoComplejo);
        console.log("Cambios guardados:", nuevoComplejo);
        setModoEdicion(false);
    };

    const handleCancelarEdicion = () => {
        setNuevoComplejo(complejo);
        setModoEdicion(false);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    const handleAgregarImagen = (image) => {
        setImages([...images, image]);
    };

    return (
        <div className='ComplejoContainer main'>
            <div className='complejoHeaderAdministrador'>
                <div>
                    <h2 className='tituloComplejo text-left'>
                        {modoEdicion ? (
                            <>
                                <input
                                    type='text'
                                    name='nombre_complejo'
                                    value={nuevoComplejo.nombre_complejo}
                                    onChange={handleInputChange}
                                    className=' edicionComplejoTexto'
                                    size={complejo.nombre_complejo.length - 2}
                                />
                                <i className='bi bi-pencil iconoEditarTituloComplejo'></i>
                            </>
                        ) : (
                            complejo.nombre_complejo
                        )}
                    </h2>
                    <div className='edicionDireccionComplejo complejoDireccion'>
                        <i className='bi bi-geo-alt'></i>
                        <p>
                            {modoEdicion ? (
                                <>
                                    <input
                                        type='text'
                                        name='direccion'
                                        value={nuevoComplejo.direccion}
                                        onChange={handleInputChange}
                                        className='edicionComplejoTexto'
                                    />
                                    <i className='bi bi-pencil'></i>
                                </>
                            ) : (
                                complejo.direccion
                            )}
                        </p>
                    </div>
                </div>

                <div className='botonesEdicion'>
                    {modoEdicion ? (
                        <>
                            <Button
                                onClick={handleGuardarCambios}
                                color='success'
                                variant='ghost'
                            >
                                Guardar Cambios
                            </Button>
                            <Button
                                onClick={handleCancelarEdicion}
                                color='danger'
                                variant='ghost'
                            >
                                Cancelar Edición
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleEdit}
                            color='primary'
                            variant='ghost'
                        >
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
                                            className='d-block w-100 imageGallery'
                                            src={image}
                                            alt={""}
                                            onClick={() =>
                                                handleImageClick(index)
                                            }
                                        />
                                    </Carousel.Item>
                                ))
                            ) : (
                                <Carousel.Item>
                                    <img
                                        className='d-block w-100 imageGallery'
                                        src='/images/miComplejo/noImagen.png'
                                        alt={"Default"}
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                        {selectedImage && (
                            <div
                                className='modal-overlay'
                                onClick={handleCloseModal}
                            >
                                <div className='modalGallery'>
                                    <img src={selectedImage} alt='Selected' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className='botonSubirImagenComplejo'
                >
                    Agregar imagen
                </button>
            </div>
            <div className='centradoDeComplejoDatos'>
                <div className='complejoDatos text-left'>
                    <div className='complejoAdministrador'>
                        <strong className='m-0'>
                            Administrador nombre_administrador
                        </strong>
                        <p className='m-0'>
                            Administrador iniciante: ¡Llevas 3 meses usando
                            CanchApp!
                        </p>
                    </div>
                    <div className='complejoDescripcion'>
                        <p className='complejoDescripcion m-0'>
                            <strong>Descripcion: </strong>
                            {modoEdicion ? (
                                <>
                                    <input
                                        type='text'
                                        name='descripcion'
                                        value={nuevoComplejo.descripcion}
                                        onChange={handleInputChange}
                                        className='edicionComplejoTexto'
                                    />
                                    <i className='bi bi-pencil'></i>
                                </>
                            ) : (
                                complejo.descripcion
                            )}
                        </p>
                    </div>
                    <div className='complejoInfo'>
                        <p className='m-0'>
                            <strong>Teléfono: </strong>
                            {modoEdicion ? (
                                <>
                                    <input
                                        type='text'
                                        name='telefono'
                                        value={nuevoComplejo.telefono}
                                        onChange={handleInputChange}
                                        className='edicionComplejoTexto'
                                    />
                                    <i className='bi bi-pencil'></i>
                                </>
                            ) : (
                                complejo.telefono
                            )}
                        </p>
                        <p className='m-0'>
                            <strong>Horarios del club:</strong> de 8 am a 23
                        </p>
                    </div>
                </div>
            </div>

            <ModalSubirImagen
                showModal={showModal}
                setShowModal={setShowModal}
                handleAgregarImagen={handleAgregarImagen}
            />
        </div>
    );
};

export default MiComplejo;
