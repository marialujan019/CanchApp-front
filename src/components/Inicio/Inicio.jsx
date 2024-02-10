import "./inicio.css"
import CardInicio from './cardInicio/CardInicio';
import React, { useEffect, useRef } from 'react';

const Inicio = () => {
    const divRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Ajusta este valor según tus necesidades
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animado'); // Agrega una clase para activar la animación
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  
    return (
        <div className='inicio'>
            <section className='inicioSeccion1'>
                <div className='sombreado text-left'>
                    <h1 className="m-0">Canch<span className='inicioColoreadoApp'>App</span></h1>
                    <p className="inicioSeccion1Texto">El fútbol a un click de distancia.</p>
                </div>
            </section>
            <div className="inicioSeccion1Banner">
                <div className="inicioSeccion1BannerCard">
                    <i className="bi bi-person-vcard-fill inicioSeccion1BannerCardIncono"></i>
                    <p className="m-0 inicioSeccion1BannerCardTexto">123 Jugadores registrados</p>
                </div>
                <div className="inicioSeccion1BannerCard"> 
                    <i className="bi bi-calendar-fill inicioSeccion1BannerCardIncono"></i>
                    <p className="m-0 inicioSeccion1BannerCardTexto">32 Partidos jugados</p>
                </div>
                <div className="inicioSeccion1BannerCard">
                    <i className="bi bi-geo-alt-fill inicioSeccion1BannerCardIncono"></i>
                    <p className="m-0 inicioSeccion1BannerCardTexto">15 Canchas disponibles</p>
                </div>
                <div className="inicioSeccion1BannerCard">
                    <i className="bi bi-people-fill inicioSeccion1BannerCardIncono"></i>
                    <p className="m-0 inicioSeccion1BannerCardTexto">45 Equipos formados</p>
                </div>
            </div>

            <section className='inicioSeccion2'>
                <div className="inicioSeccion2ConocenosCentrado">
                    <div className='inicioSeccion2Conocenos'>
                        <div className="inicioSeccion2ConocenosTexto">
                            <h2 className='inicioSeccionTitulo'>Conócenos</h2>

                            <p data-aos="fade-up" className="text-left">En CanchApp, no solo creamos una aplicación; construimos un hogar para la comunidad apasionada de jugadores de fútbol 5. Nuestra historia se teje con la pasión por el deporte, la innovación y el deseo de hacer que cada momento en la cancha sea inolvidable. </p>
                            <p data-aos="fade-up" className="text-left">Somos un equipo diverso, fusionando habilidades técnicas con un amor compartido por el fútbol. Nos inspira la idea de simplificar la organización de partidos, conectar a jugadores de todas partes y brindarte una experiencia futbolística sin complicaciones.</p>
                            <p data-aos="fade-up" className="text-left">Creemos en la comunidad y en el poder de unirse a través del deporte. CanchApp no solo te ofrece una plataforma, sino un lugar donde puedes compartir experiencias, retos y éxitos con otros amantes del fútbol 5. Nos esforzamos por ser más que una aplicación; somos una familia virtual que comparte la misma pasión por el juego.</p>

                        </div>
                        <div className="inicioSeccion2ConocenosImagenContainer">
                            <img src="/images/inicio/conocenos.webp" alt="" className="inicioSeccion2ConocenosImagen"/>
                        </div>
                    </div>
                </div>
                
                
            </section>
            
            <section className='inicioSeccion3'>
                <h2 className='inicioSeccionTitulo'>Administradores de canchas</h2>
                <div className='inicioSeccionCardsContainer'>
                    <div data-aos="fade-up" data-aos-delay="50">
                        <CardInicio
                        imagenSrc="/images/inicio/1.webp"
                        titulo="Registra tu complejo"
                        descripcion="Pon tu complejo en el mapa y hazlo visible para jugadores de todas partes. Publica información sobre tus canchas, ubicación y horarios."
                        />
                    </div>
                    
                    <div data-aos="fade-up" data-aos-delay="100">
                        <CardInicio
                        imagenSrc="/images/inicio/2.webp"
                        titulo="Administra tus horarios"
                        descripcion="Pon tu complejo en el mapa y hazlo visible para jugadores de todas partes. Publica información sobre tus canchas, ubicación y horarios."
                        />
                    </div>
                    
                    <div data-aos="fade-up" data-aos-delay="150">
                        <CardInicio
                        imagenSrc="/images/inicio/3.webp"
                        titulo="Promociona tu complejo"
                        descripcion="Gana visibilidad y atrae a más jugadores promocionando tus instalaciones y servicios especiales."
                        />
                    </div>
                </div>
                <div className="inicioSeccionBanner">
                    <h3 className="inicioSeccionBannerTitulo">Registra tu complejo y forma parte de nuestra comunidad</h3>
                    <p className="inicioSeccionBannerTexto">No pierdas la oportunidad de dar a conocer tu complejo y llegar a nuevos clientes. Únete a nuestra plataforma y disfruta de los beneficios de formar parte de una comunidad deportiva en crecimiento.</p>
                </div>
                </section>

                <section className='inicioSeccion4'>
                    <h2 className='inicioSeccionTitulo'>Jugadores</h2>
                    <div className='flex justify-around items-stretch flex-wrap inicioSeccionCardsContainer'>
                        <div data-aos="fade-up" data-aos-delay="50">
                            <CardInicio
                            imagenSrc="/images/inicio/4.webp"
                            titulo="Busca y alquila canchas"
                            descripcion="Encuentra las canchas disponibles en tu zona y verifica la disponibilidad de las canchas en los complejos disponibles."
                            />
                        </div>
                        
                        <div data-aos="fade-up" data-aos-delay="100">
                            <CardInicio
                            imagenSrc="/images/inicio/5.webp"
                            titulo="Crea y únete a equipos"
                            descripcion="Forma parte de una comunidad deportiva, crea tu propio equipo o únete a uno existente para participar en torneos y partidos amistosos."
                            />
                        </div>
                        
                        <div data-aos="fade-up" data-aos-delay="150">
                            <CardInicio
                            imagenSrc="/images/inicio/6.webp"
                            titulo="Consulta y administra reservas"
                            descripcion="Mantente al tanto de tus reservas y adminístralas fácilmente. Accede a tu historial y organiza tus partidos de manera eficiente."
                            />
                        </div>
                        
                    </div>
                    <div className='inicioSeccionBanner'>
                        <h3 className='inicioSeccionBannerTitulo'>Únete a nuestra comunidad deportiva como jugador</h3>
                        <p className='inicioSeccionBannerTexto'>Explora nuevas oportunidades al unirte a CanchApp. Descubre canchas cercanas, forma equipos, y participa en vibrantes eventos deportivos. ¡Conéctate con otros apasionados del deporte y lleva tu experiencia a otro nivel!</p>
                        <button>Registrarse</button>
                    </div>
                </section>
        </div>
    );
}

export default Inicio;
