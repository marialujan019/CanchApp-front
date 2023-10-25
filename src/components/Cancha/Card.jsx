// Card.js
import React from 'react';
import { Link } from 'react-router-dom';

import './card.css'; // Importa tu archivo de estilos para las tarjetas

const Card = ({ card }) => {
  console.log(card)
  return (
    <div className="card">
      <img src={card.urlPicture} alt="Imagen de la tarjeta" className="card-image" />
      <h2>{card.nombre_cancha}</h2>
      <Link to={`/cancha/${card.id_cancha}`} className="nav-link"> Ver cancha </Link>
    </div>
  );
};

export default Card;
