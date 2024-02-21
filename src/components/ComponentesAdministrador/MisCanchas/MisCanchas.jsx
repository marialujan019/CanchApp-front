import React, { useState, useEffect } from "react";
import { consultarBaseDeDatos } from "../../utils/Funciones";
import { Card, CardBody } from "@nextui-org/react";
import CardCancha from "./CardCancha/CardCancha";
import "./misCanchas.css";
import ModalCrearCancha from "./ModalCrearCancha/ModalCrearCancha";

const MisCanchas = () => {
    const [canchas, setCanchas] = useState(null);
    const [canchasDuplicadas, setCanchasDuplicadas] = useState(null);
    const [showCrearCanchaModal, setShowCrearCanchaModal] = useState(false);

    useEffect(() => {
        async function fetchCanchas() {
            const datosJson = await consultarBaseDeDatos(
                "./json/canchasDeUnComplejo.json"
            );
            setCanchas(datosJson);
            setCanchasDuplicadas([...datosJson]);
        }

        fetchCanchas();
    }, []);

    useEffect(() => {
        // Actualizar canchasDuplicadas cuando cambie el estado de canchas
        if (canchas) {
            setCanchasDuplicadas([...canchas]);
        }
    }, [canchas]);

    return (
        <div>
            <div className='cardsContainerMisCanchas'>
                {canchasDuplicadas &&
                    canchasDuplicadas.map((cancha) => (
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
                setCanchas={setCanchas} // Pasar setCanchas como prop
            />
        </div>
    );
};

export default MisCanchas;
