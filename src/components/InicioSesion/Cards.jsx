import React from 'react';
import './style.css'; // Importa tus estilos

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.image} alt={props.alt} />
      <div className="card-content">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Card;
