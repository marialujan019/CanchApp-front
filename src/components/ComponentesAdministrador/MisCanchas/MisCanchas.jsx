import React, { useState, useEffect } from "react";
import { consultarBaseDeDatos } from "../../utils/Funciones";
import { Card, CardBody } from "@nextui-org/react";
import CardCancha from "./CardCancha/CardCancha";
import "./misCanchas.css";
import ModalCrearCancha from "./ModalCrearCancha/ModalCrearCancha";

const MisCanchas = () => {
    const [canchas, setCanchas] = useState(null);
    const [showCrearCanchaModal, setShowCrearCanchaModal] = useState(false);

    // Funcion para traer las canchas
    useEffect(() => {
        async function fetchCanchas() {
            const datosJson = await consultarBaseDeDatos(
                "./json/canchasDeUnComplejo.json"
            );
            setCanchas(datosJson);
        }

        fetchCanchas();
    }, []);

    return (
        <div>
            <div className='cardsContainerMisCanchas'>
                {canchas &&
                    canchas.map((cancha) => (
                        <CardCancha key={cancha.id_cancha} cancha={cancha} />
                    ))}

                <button onClick={() => setShowCrearCanchaModal(true)}>
                    <Card className='cardAgregarCancha'>
                        <div className='cardAgregarCanchaImagenContainer'>
                            <img
                                src='/images/miscanchas/agregarCancha.png'
                                className='cardAgregarCanchaImagen opacity-100'
                            />
                        </div>
                        <CardBody className='p-2'>
                            <div className='CardBodyAgregarCancha'>
                                <h4 className='text-base p-0 m-0 cardAgregarCanchaTituloCard'>
                                    Agregar cancha
                                </h4>
                            </div>
                        </CardBody>
                    </Card>
                </button>
            </div>

            <ModalCrearCancha
                show={showCrearCanchaModal}
                onHide={() => setShowCrearCanchaModal(false)}
            />
        </div>
    );
};

export default MisCanchas;
