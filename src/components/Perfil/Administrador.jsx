import React from 'react';
import Reservas from './Reservas';
import Canchas from './Canchas';
import Agenda from './Agenda';
import Titulo from './Titulo';

const Administrador = ({idAdmin}) => {
  return (
    <div>
        <div>
            <Titulo />
        </div>
        <div className="cards-container">
            <Reservas />
            <Canchas idAdmin={idAdmin} />
            <Agenda />
        </div>
    </div>
  );
};

export default Administrador;



