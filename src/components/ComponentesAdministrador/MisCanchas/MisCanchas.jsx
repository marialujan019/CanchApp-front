import React, {useState, useEffect} from 'react';
import { consultarBaseDeDatos } from '../../utils/Funciones';
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import CardCancha from './CardCancha/CardCancha';
import "./misCanchas.css"
import Calendario from './Calendario/Calendario';

const MisCanchas = () => {
    const [canchas, setCanchas] = useState(null)
    const [fechas, setFechas] = useState(null)

    
    useEffect(() => {
        async function fetchCanchas() {
            const datosJson = await consultarBaseDeDatos('./json/canchasDeUnComplejo.json');
            setCanchas(datosJson);
        }

        async function fetchFechas() {
            const datosJson = await consultarBaseDeDatos('./json/fechas.json');
            setFechas(datosJson);
        }

        fetchCanchas();
        fetchFechas()
    }, []);

    console.log(fechas)


    return (
        <div>
            <div className='cardsContainerMisCanchas'>
                {canchas && canchas.map(cancha => (
                    <CardCancha key={cancha.id_cancha} cancha={cancha} />
                ))}
            </div>

        <button>
            <Card className='cardAgregarCancha'>
                <div className='cardAgregarCanchaImagenContainer'>
                    <img src="/images/miscanchas/agregarCancha.png" className='cardAgregarCanchaImagen opacity-100'/>
                </div>
            <CardBody className='p-2'>
                <div className='CardBodyAgregarCancha'>
                    <h4 className='text-base p-0 m-0 cardAgregarCanchaTituloCard'>Agregar cancha</h4>
                </div>
            </CardBody>
            </Card>
        </button>

        <Calendario 
            fechas={fechas}
            canchas={canchas}
        />
        
        
        </div>
    );
}

export default MisCanchas;
