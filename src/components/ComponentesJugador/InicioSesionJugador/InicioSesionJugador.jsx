import React from 'react';
import CardInicio from '../../Inicio/cardInicio/CardInicio';
import { Link } from 'react-router-dom';
import "./inicioSesionJugador.css"

const InicioSesionJugador = ({nombre_usuario, id }) => {
    const cardData = [
        {
            id: 4,
            title: 'Buscar complejos',
            description: 'Busca un complejo acorde a las necesidades de tu equipo',
            image: '/images/inicioSesion/buscarCancha.jpg',
            wide: true, 
            link: "/mapa"
          },
          {
          title: 'Mis equipos',
          description: 'Acá podrás ver y editar tus equipos.',
          image: '/images/inicioSesion/misEquipos.jpg',
          link: "/misEquipos"
        },
        {
          title: 'Buscar equipo',
          description: 'Encontra el equipo ideal para unirte y jugar tus próximos partidos',
          image: '/images/inicioSesion/buscarEquipo.jpg',
          link: `/buscarequipo/${id}`
        },
        {
            title: 'Buscar jugadores',
            description: 'Encontra el jugador que te falta',
            image: '/images/inicioSesion/buscarJugador.jpg',
            link: "/buscarjugador"
          },
          {
            title: 'Mis solicitudes',
            description: 'Revisa el estado de las invitaciones que tienes',
            image: '/images/inicioSesion/misSolicitudes.jpg',
            link: "/misSolicitudes"
          },
          {
            title: 'Mis reservas',
            description: 'Revisa el estado de tus reservas para ver cuando es tu próximo partido',
            image: '/images/inicioSesion/misReservas.jpg',
            link: `/misReservas/${id}`
          },
          {
            title: 'Mi historial',
            description: 'Mirá los partidos que jugaste.',
            image: '/images/inicioSesion/miHistorial.jpg',
            link: "/historial"
          }
    ];
    
      return (
        <div className='inicioSesionContainer'> 
          <div className='inicioSeccionBienvenida'>
          <h1 className='inicioSesionTitulo'>¡Bienvenido a canchapp, {nombre_usuario}!</h1>
            <strong><p className='inicioSesionTextoBienvenida'>¿Qué quieres hacer hoy?</p></strong>
          </div>
          
        <div className="cardInicioSesionContainer">
          {cardData.map((card) => (
            <nav className='navCardInicioSesion'>
            <Link className='linkCardInicioSesion' to={`${card.link}`}>
            <CardInicio
              imagenSrc={card.image}
              titulo={card.title}
              descripcion={card.description}
              className="cardInicioSesion"
            /></Link></nav>
          ))}
        </div></div>
      );
    };

export default InicioSesionJugador;