import { createContext, useContext, useState } from 'react';

const ReservasContext = createContext();

export const ReservasProvider = ({ children }) => {
  const [misReservas, setMisReservas] = useState([]);

  const agregarReserva = (reserva) => {
    setMisReservas([...misReservas, reserva]);
  };

  return (
    <ReservasContext.Provider value={{ misReservas, agregarReserva }}>
      {children}
    </ReservasContext.Provider>
  );
};

export const useReservasContext = () => {
  return useContext(ReservasContext);
};
