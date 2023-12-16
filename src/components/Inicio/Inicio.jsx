import React from 'react';
import "./inicio.css"
import CardInicio from './cardInicio/CardInicio';
const Inicio = () => {
    return (
        <div className='inicio'>
            <section className='inicioSeccion1'>
                <div className='sombreado'>
                    <h1>Canch<span className='inicioColoreadoApp'>App</span></h1>
                    <p>Somos una aplicación dedicada a facilitar la reserva de canchas deportivas.</p>
                </div>
            </section>

            <section className='inicioSeccion2'>
                <h2 className='inicioSeccionTitulo'>Conócenos</h2>
                <div>
                    <div>
                        <h4>¿Quiénes somos?</h4>
                        <p>En CanchApp, somos la plataforma líder que simplifica la reserva de canchas deportivas. Con pasión por el deporte y un compromiso inquebrantable, conectamos de manera efectiva a los dueños de complejos con los apasionados jugadores.</p>
                    </div>
                    <div>
                        <h4>Objetivo</h4>
                        <p>Nuestro compromiso es facilitar una experiencia fluida y eficiente, conectando dueños de complejos y jugadores con soluciones innovadoras que enriquezcan la pasión por el deporte, la camaradería y la comunicación.</p>
                    </div>
                    <div>
                        <h4>Valores</h4>
                        <p>
                        Transparencia: Fomentamos la apertura y honestidad en todas nuestras interacciones, construyendo relaciones de confianza.
                        <br />
                        Confiabilidad: Ofrecemos una plataforma sólida y segura en la que tanto dueños como jugadores pueden depender para gestionar reservas de manera eficiente.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className='inicioSeccion3'>
                <h2 className='inicioSeccionTitulo'>Dueños</h2>
                <div className='flex justify-around align-middle'>
                    <CardInicio
                    imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                    titulo="Registra tu complejo"
                    descripcion="Pon tu complejo en el mapa y hazlo visible para jugadores de todas partes. Publica información sobre tus canchas, ubicación y horarios."
                    />
                    <CardInicio
                    imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                    titulo="Administra tus horarios"
                    descripcion="Pon tu complejo en el mapa y hazlo visible para jugadores de todas partes. Publica información sobre tus canchas, ubicación y horarios."
                    />
                    <CardInicio
                    imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                    titulo="Promociona tu complejo"
                    descripcion="Gana visibilidad y atrae a más jugadores promocionando tus instalaciones y servicios especiales."
                    />
                </div>

                <div>
                    <h3>Registra tu complejo y forma parte de nuestra comunidad</h3>
                    <p>No pierdas la oportunidad de dar a conocer tu complejo y llegar a nuevos clientes. Únete a nuestra plataforma y disfruta de los beneficios de formar parte de una comunidad deportiva en crecimiento.</p>
                </div>
                </section>

                <section className='inicioSeccion4'>
                    <h2 className='inicioSeccionTitulo'>Jugadores</h2>
                    <div className='flex justify-around'>
                        <CardInicio
                        imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                        titulo="Busca y alquila canchas"
                        descripcion="Encuentra las canchas disponibles en tu zona y verifica la disponibilidad de las canchas en los complejos disponibles."
                        />
                        <CardInicio
                        imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                        titulo="Crea y únete a equipos"
                        descripcion="Forma parte de una comunidad deportiva, crea tu propio equipo o únete a uno existente para participar en torneos y partidos amistosos."
                        />
                        <CardInicio
                        imagenSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s"
                        titulo="Consulta y administra reservas"
                        descripcion="Mantente al tanto de tus reservas y adminístralas fácilmente. Accede a tu historial y organiza tus partidos de manera eficiente."
                        />
                    </div>

                    <div>
                        <h3>Únete a nuestra comunidad deportiva como jugador</h3>
                        <p>Explora nuevas oportunidades al unirte a CanchApp. Descubre canchas cercanas, forma equipos, y participa en vibrantes eventos deportivos. ¡Conéctate con otros apasionados del deporte y lleva tu experiencia a otro nivel!</p>
                    </div>
                    </section>
        </div>
    );
}

export default Inicio;
