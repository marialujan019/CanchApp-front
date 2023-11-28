import React, { useState } from 'react';

const CrearEquipo = () => {
  const [equipo, setEquipo] = useState({
    nombreEquipo: '',
    publico: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setEquipo({
      ...equipo,
      [name]: inputValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Equipo creado:', equipo);
    // Puedes enviar el objeto a tu servidor o realizar la lógica necesaria aquí
  };

  return (
    <div>
      <h2>Crear Equipo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Equipo:
          <input
            type="text"
            name="nombreEquipo"
            value={equipo.nombreEquipo}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          ¿Es público?
          <input
            type="checkbox"
            name="publico"
            checked={equipo.publico}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Crear Equipo</button>
      </form>
    </div>
  );
};

export default CrearEquipo;
