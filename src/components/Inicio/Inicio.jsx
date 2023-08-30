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
                <h2 className='inicioSeccion2Titulo'>Que ofrecemos</h2>

                <div className='inicioCardsContainer'>

                    <div className='inicioCard'>
                        <img src="/images/inicio/busqueda.png" alt="" />
                        <h3>Encuentra canchas rápidamente</h3>
                        <p>Busca canchas de fútbol disponibles en tu ciudad en cuestión de segundos. Visualiza los horarios libres y realiza reservas de manera sencilla desde la app.</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/inicio/reserva.png" alt="" />
                        <h3>Reserva Turnos con Facilidad</h3>
                        <p>Asegura un turno en la cancha que elijas. La reserva la realiza el líder del equipo, quien debe garantizar que el equipo esté presente y el pago se complete.</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/inicio/formarEquipos.png" alt="" />
                        <h3>Encuentra Compañeros de Equipo</h3>
                        <p>Nuestra función de formación de equipos te conecta con otros jugadores interesados. Explora perfiles, evalúa habilidades y posiciones. Invita a jugadores a unirse a tu equipo o acepta invitaciones de otros.</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/inicio/infoBasada.png" alt="" />
                        <h3>Información Basada en Experiencias Reales</h3>
                        <p>Toma decisiones informadas al leer reseñas y calificaciones de canchas, jugadores y capitanes. Obtén una visión real antes de tomar cualquier decisión.</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/inicio/gestionarEquipo.png" alt="" />
                        <h3>Gestiona tu Equipo con Eficacia</h3>
                        <p>Capitanes, asuman el control. Utiliza la app para administrar a tu equipo y comunicarte a través de grupos en WhatsApp o Telegram, creados automáticamente.</p>
                    </div>

                    <div className='inicioCard'>
                        <img src="/images/inicio/copa.png" alt="" />
                        <h3>Explora Torneos Locales</h3>
                        <p>Forma parte de la acción en torneos cercanos. Capitanes, regístrate en torneos a través de la app. Encuentra detalles clave como fechas y condiciones.</p>
                    </div>
                    
                </div>
            </section>

        </div>
    );
}

export default Inicio;
