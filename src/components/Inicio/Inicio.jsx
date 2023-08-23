import React from 'react';
import "./inicio.css"

const Inicio = () => {
    return (
        <div className='inicio'>

            <section className='inicioSeccion1'>
                <div className='sombreado'>
                    <h1>CanchApp</h1>
                    <p>Somos una app</p>
                    <p>Para fulvo</p>
                </div>
                
            </section>
            
            <section className='inicioSeccion2'>
                <h2 className='inicioSeccion2Titulo'>Que ofrecemos</h2>

                <div className='inicioCardsContainer'>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                        <p>¿Quien chota sos?</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                            <p>Verificamos el numero telefonico de los jugadores, priorizando la comunicacion al ahora de reservar un turno</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                            <p>Verificamos el numero telefonico de los jugadores, priorizando la comunicacion al ahora de reservar un turno</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                            <p>Verificamos el numero telefonico de los jugadores, priorizando la comunicacion a l ahora de reservar un turno</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                            <p>Verificamos el numero telefonico de los jugadores, priorizando la comunicacion a l ahora de reservar un turno</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/card.jpg" alt="" />
                        <h3>verificacion de cuentas</h3>
                            <p>Verificamos el numero telefonico de los jugadores, priorizando la comunicacion a l ahora de reservar un turno</p>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Inicio;
