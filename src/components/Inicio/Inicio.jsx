import React from 'react';
import "./inicio.css"

const Inicio = () => {
    return (
        <div className='inicio'>

            <section className='inicioSeccion1'>
                <div className='sombreado'>
                    <h1>Canch<span className='inicioColoreadoApp'>App</span></h1>
                    <p>Somos una app</p>
                    <p>Para fulvo</p>
                </div>
                
            </section>
            
            <section className='inicioSeccion2'>
                <h2 className='inicioSeccion2Titulo'>Conócenos</h2>
                <div>
                    <h4>¿Quiénes somos?</h4>
                    <p>Somos una plataforma dedicada a facilitar la reserva de canchas deportivas.</p>
                </div>
                <div>
                    <h4>Objetivos</h4>
                    <p>Brindar una experiencia cómoda y accesible tanto para los dueños de complejos como para los jugadores.</p>
                </div>
                <div>
                    <h4>Valores</h4>
                    <p>Nuestros valores se centran en la transparencia, confiabilidad y excelencia en el servicio.</p>
                </div>
 
            </section>

        </div>
    );
}

export default Inicio;
