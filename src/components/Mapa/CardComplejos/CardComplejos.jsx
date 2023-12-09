import React from 'react';
import "./cardComplejos.css"
const CardComplejos = ({ complejos }) => {
  return (
    <div className='complejoCardsContainer '>
      {complejos.map((complejo) => (
        <div key={complejo.id_complejo} className="cardComplejo">
            <div className='imagenCardComplejo'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGrVGyZIpSiyAcGPcfo1jzHWNXMzxmTV8aYmgDBCi1-A&s" alt={complejo.nombre}/>
            </div>
            <div className='text-left'>
                <h2>{complejo.nombre}</h2>
                <p>Dirección: {complejo.direccion}</p>
                <p>Teléfono: {complejo.telefono}</p>
            </div>

        </div>
      ))}
    </div>
  );
};

export default CardComplejos;
