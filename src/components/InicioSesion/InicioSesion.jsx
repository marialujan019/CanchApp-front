import React from 'react';
import Card from './Cards';
//import imagenMisEquipos from '../../imagen/formarEquipos.png'
import { Link } from 'react-router-dom';

const InicioSesion = ({nombre_usuario, id }) => {
    const cardData = [
        {
            id: 4,
            title: 'Buscar complejos',
            description: 'Busca un complejo acorde a las necesidades de tu equipo',
            image: '',
            wide: true, 
            link: "/mapa"
          },
          {
          title: 'Mis equipos',
          description: 'Acá podrás ver y editar tus equipos.',
          image: '',
          link: "/misEquipos"
        },
        {
          title: 'Buscar equipo',
          description: 'Encontra el equipo ideal para unirte y jugar tus próximos partidos',
          image: '',
          link: `/buscarequipo/${id}`
        },
        {
            title: 'Buscar jugadores',
            description: 'Encontra el jugador que te falta',
            image: '',
            link: "/buscarjugador"
          },
          {
            title: 'Mis solicitudes',
            description: 'Revisa el estado de las invitaciones que tienes',
            image: '',
            link: "/misSolicitudes"
          },
          {
            title: 'Mis reservas',
            description: 'Revisa el estado de tus reservas para ver cuando es tu próximo partido',
            image: '',
            link: `/misReservas/${id}`
          },
          {
            title: 'Mi historial',
            description: 'Mirá los partidos que jugaste.',
            image: '',
            link: "/historial"
          }
    ];
    
      return (
        <div> <h1>Bienvenido, {nombre_usuario}</h1>
        <div className="app">
          {cardData.map((card, index) => (
            <nav>
            <Link to={`${card.link}`}>
            <Card
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              alt={card.alt}
              clickable
              className={card.wide ? 'card-wide' : 'card'}
            /></Link></nav>
          ))}
        </div></div>
      );
    };

export default InicioSesion;
