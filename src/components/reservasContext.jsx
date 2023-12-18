import { createContext, useContext, useState } from 'react';

const ReservasContext = createContext();

export const ReservasProvider = ({ children }) => {
  const [misReservas, setMisReservas] = useState([]);

  const agregarReserva = (reserva) => {
    setMisReservas([...misReservas, reserva]);
  };

  const eliminarReserva = (idJugador, fecha, hora) => {
    setMisReservas((prevMisReservas) => {
      const nuevasReservas = prevMisReservas.filter(
        (reserva) => !(reserva.id_jugador === idJugador && reserva.fecha === fecha && reserva.hora === hora)
      );
      return nuevasReservas;
    });
  };

  return (
    <ReservasContext.Provider value={{ misReservas, agregarReserva, eliminarReserva  }}>
      {children}
    </ReservasContext.Provider>
  );
};

export const useReservasContext = () => {
  return useContext(ReservasContext);
};
